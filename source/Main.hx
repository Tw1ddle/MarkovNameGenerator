package;

import js.Browser;
import js.html.DataListElement;
import js.html.Element;
import js.html.InputElement;
import js.html.SelectElement;
import js.nouislider.NoUiSlider;
import js.wNumb.WNumb;
import markov.namegen.NameGenerator;
import markov.util.EditDistanceMetrics;
import markov.util.PrefixTrie;

using markov.util.StringExtensions;
using StringTools;

// Automatic HTML code completion, you need to point these to your HTML
@:build(CodeCompletion.buildLocalFile("../bin/index.html"))
//@:build(CodeCompletion.buildUrl("http://www.samcodes.co.uk/project/markov-namegen/"))
class ID {}

class Main {
	public static inline var WEBSITE_URL:String = "https://www.samcodes.co.uk/project/markov-namegen/"; // Hosted demo URL used for building custom query string when sharing results

	private static inline function getElement(id:String):Dynamic {
		return Browser.document.getElementById(id); // Helper to get references to page elements
	}
	private var nameDataPresetListElement:SelectElement = getElement(ID.trainingdatalist);
	private var nameDataSearchBoxElement:InputElement = getElement(ID.trainingdatasearchbox);
	private var nameDataDataListElement:DataListElement = getElement(ID.namedatapresetslist);
	private var trainingDataTextEdit:InputElement = getElement(ID.trainingdataedit);
	private var orderElement:Element = getElement(ID.order);
	private var priorElement:Element = getElement(ID.prior);
	private var maxWordsToGenerateElement:Element = getElement(ID.maxwordstogenerate);
	private var maxProcessingTimeElement:Element = getElement(ID.maxtime);
	private var noNamesFoundElement:Element = getElement(ID.nonamesfound);
	private var currentNamesElement:Element = getElement(ID.currentnames);
	private var generateElement:Element = getElement(ID.generate);
	private var randomThemeElement:Element = getElement(ID.random);
	private var namesTitleElement:Element = getElement(ID.namestitle);
	private var lengthElement:InputElement = getElement(ID.minmaxlength);
	private var startsWithElement:InputElement = getElement(ID.startswith);
	private var endsWithElement:InputElement = getElement(ID.endswith);
	private var includesElement:InputElement = getElement(ID.includes);
	private var excludesElement:InputElement = getElement(ID.excludes);
	private var similarElement:InputElement = getElement(ID.similar);
	private var regexMatchElement:InputElement = getElement(ID.regexmatch);
	private var shareResultsAndSettingsElement:Element = getElement(ID.shareresultsandsettings);
	private var shareResultsOnlyElement:Element = getElement(ID.shareresultsonly);
	private var shareLinkTextEdit:InputElement = getElement(ID.shareedit);

	private var generator:NameGenerator; // The Markov-chain based name generator
	private var duplicateTrie:PrefixTrie; // Prefix trie to avoid displaying duplicate generated words
	private var topicSearchTrie:PrefixTrie; // Prefix trie for finding matching topic when the user searches for them in the search text box

	private var lastGeneratedNames:Array<String> = []; // The last lot of generated names
	private var trainingDataId(get, set):String; // The currently selected training data id/field name

	private var maxWordsToGenerate:Int; // Number of names to try to generate
	private var minLength:Int; // Minimum name length
	private var maxLength:Int; // Maximum name length
	private var order:Int; // Maximum order model that the name generator should use
	private var prior:Float; // Value of the Dirichlet prior that the name generator should use
	private var maxProcessingTime:Int; // Maximum time the name generator should spend generating a batch of names
	private var startsWith(get, set):String; // String that names must start with
	private var endsWith(get, set):String; // String that names must end with
	private var includes(get, set):String; // String that names must include
	private var excludes(get, set):String; // String that names must include
	private var similar(get, set):String; // String that names are sorted by their similarity to
	private var regexMatch(get, set):String; // Regex string that names must match

	private static inline function main():Void {
		var main = new Main();
	}

	private inline function new() {
		Browser.window.onload = onWindowLoaded; // Wait for the window to load before creating the sliders, listening for input etc
	}

	private inline function onWindowLoaded():Void {
		buildTrainingDataList();
		applySettings();
		createSliders();
		addEventListeners();
	}

	/*
	 * Generates the HTML training data selection list
	 */
	private inline function buildTrainingDataList():Void {
		// Add custom preset if there are custom settings (in the query string)
		if (!ShareResults.isQueryStringEmpty()) {
			Reflect.setField(TrainingData, "custom", new Array<String>());
		}
		
		var fields = Type.getClassFields(TrainingData);

		// Alphabetically sort the internal training data fields by their (lowercased) display names
		fields.sort((a:String, b:String)-> {
			var first = trainingDataFieldToDisplayName(a).toLowerCase();
			var second = trainingDataFieldToDisplayName(b).toLowerCase();
			if (first < second) {
				return -1;
			} else if (first > second) {
				return 1;
			}
			return 0;
		});

		// Create the data list items and insert them into the topic trie
		topicSearchTrie = new PrefixTrie();
		for (field in fields) {
			var displayName = trainingDataFieldToDisplayName(field);

			var makeOption = ()-> {
				var option = Browser.document.createOptionElement();
				option.appendChild(Browser.document.createTextNode(displayName));
				option.value = displayName;
				return option;
			}
			nameDataPresetListElement.appendChild(makeOption());
			nameDataDataListElement.appendChild(makeOption());
			topicSearchTrie.insert(displayName);
		}
	}

	private inline function applySettings():Void {
		// Apply the default settings for name generation, filtering, sorting etc
		Sure.sure(Reflect.hasField(TrainingData, "animals"));
		trainingDataId = "Animals";
		maxWordsToGenerate = 100;
		minLength = 5;
		maxLength = 11;
		order = 3;
		prior = 0.0;
		maxProcessingTime = 800;
		startsWith = "";
		endsWith = "";
		includes = "";
		excludes = "";
		similar = "";
		regexMatch = "";

		// Apply any settings embedded in the page URL/query string
		ShareResults.applySettings(this);
	}

	/*
	 * Create the settings sliders that go on the page
	 */
	private inline function createSliders():Void {
		NoUiSlider.create(orderElement, {
			start: [ order ],
			connect: 'lower',
			range: {
				'min': [ 1, 1 ],
				'max': [ 9 ]
			},
			pips: {
				mode: 'range',
				density: 10,
			}
		});
		createTooltips(orderElement);
		untyped orderElement.noUiSlider.on(UiSliderEvent.CHANGE, (values:Array<Float>, handle:Int, rawValues:Array<Float>)-> {
			order = Std.int(values[handle]);
		});
		untyped orderElement.noUiSlider.on(UiSliderEvent.UPDATE, (values:Array<Float>, handle:Int, rawValues:Array<Float>)-> {
			updateTooltips(orderElement, handle, Std.int(values[handle]));
		});

		NoUiSlider.create(priorElement, {
			start: [ prior ],
			connect: 'lower',
			range: {
				'min': 0.001,
				'50%': 0.025,
				'max': 0.05
			},
			pips: {
				mode: 'range',
				density: 10,
				format: new WNumb( {
					decimals: 3
				})
			}
		});
		createTooltips(priorElement);
		untyped priorElement.noUiSlider.on(UiSliderEvent.CHANGE, (values:Array<Float>, handle:Int, rawValues:Array<Float>)-> {
			prior = Std.parseFloat(untyped values[handle]);
		});
		untyped priorElement.noUiSlider.on(UiSliderEvent.UPDATE, (values:Array<Float>, handle:Int, rawValues:Array<Float>)-> {
			updateTooltips(priorElement, handle, values[handle]);
		});
		
		NoUiSlider.create(maxWordsToGenerateElement, {
			start: [ 100 ],
			connect: 'lower',
			range: {
				'min': 20,
				'max': 1000
			},
			pips: {
				mode: 'range',
				density: 10,
				format: new WNumb( {
					decimals: 0
				})
			}
		});
		createTooltips(maxWordsToGenerateElement);
		untyped maxWordsToGenerateElement.noUiSlider.on(UiSliderEvent.CHANGE, (values:Array<Float>, handle:Int, rawValues:Array<Float>)-> {
			maxWordsToGenerate = Std.parseFloat(untyped values[handle]);
		});
		untyped maxWordsToGenerateElement.noUiSlider.on(UiSliderEvent.UPDATE, (values:Array<Float>, handle:Int, rawValues:Array<Float>)-> {
			updateTooltips(maxWordsToGenerateElement, handle, Std.int(values[handle]));
		});

		NoUiSlider.create(maxProcessingTimeElement, {
			start: [ maxProcessingTime ],
			connect: 'lower',
			range: {
				'min': 50,
				'max': 5000
			},
			pips: {
				mode: 'range',
				density: 10,
				format: new WNumb( {
					decimals: 0
				})
			}
		});
		createTooltips(maxProcessingTimeElement);
		untyped maxProcessingTimeElement.noUiSlider.on(UiSliderEvent.CHANGE, (values:Array<Float>, handle:Int, rawValues:Array<Float>)-> {
			maxProcessingTime = Std.parseFloat(untyped values[handle]);
		});
		untyped maxProcessingTimeElement.noUiSlider.on(UiSliderEvent.UPDATE, (values:Array<Float>, handle:Int, rawValues:Array<Float>)-> {
			updateTooltips(maxProcessingTimeElement, handle, Std.int(values[handle]));
		});

		NoUiSlider.create(lengthElement, {
			start: [ minLength, maxLength ],
			connect: true,
			range: {
				'min': [ 3, 1 ],
				'max': 21
			},
			pips: {
				mode: 'range',
				density: 10,
			}
		});
		createTooltips(lengthElement);
		untyped lengthElement.noUiSlider.on(UiSliderEvent.CHANGE, (values:Array<Float>, handle:Int, rawValues:Array<Float>)-> {
			if (handle == 0) {
				minLength = Std.int(values[handle]);
			} else if (handle == 1) {
				maxLength = Std.int(values[handle]);
			}
		});
		untyped lengthElement.noUiSlider.on(UiSliderEvent.UPDATE, (values:Array<Float>, handle:Int, rawValues:Array<Float>)-> {
			updateTooltips(lengthElement, handle, Std.int(values[handle]));
		});
	}

	/*
	 * Helper method to create tooltips on the sliders
	 */
	private function createTooltips(slider:Element):Void {
		var tipHandles = slider.getElementsByClassName("noUi-handle");
		for (i in 0...tipHandles.length) {
			var div = js.Browser.document.createElement('div');
			div.className += "tooltip";
			tipHandles[i].appendChild(div);
			updateTooltips(slider, i, 0);
		}
	}

	/*
	 * Helper method to update the tooltips on the sliders
	 */
	private function updateTooltips(slider:Element, handleIdx:Int, value:Float):Void {
		var tipHandles = slider.getElementsByClassName("noUi-handle");
		tipHandles[handleIdx].innerHTML = "<span class='tooltip'>" + Std.string(value) + "</span>";
	}

	/*
	 * Add event listeners to the input elements, in order to update the values we feed the model when "generate" is pressed
	 */
	private inline function addEventListeners():Void {
		nameDataPresetListElement.addEventListener("change", ()-> {
			trainingDataId = nameDataPresetListElement.value;
		}, false);

		nameDataSearchBoxElement.addEventListener("change", ()-> {
			if (topicSearchTrie.find(nameDataSearchBoxElement.value)) {
				trainingDataId = nameDataSearchBoxElement.value;
			}
		}, false);
		nameDataSearchBoxElement.addEventListener("input", ()-> {
			if (topicSearchTrie.find(nameDataSearchBoxElement.value)) {
				trainingDataId = nameDataSearchBoxElement.value;
			}
		}, false);

		trainingDataTextEdit.addEventListener("change", ()-> {
			generateForCurrentSettings();
		}, false);

		generateElement.addEventListener("click", ()-> {
			generateForCurrentSettings();
		}, false);

		randomThemeElement.addEventListener("click", ()-> {
			generateForRandomPreset();
		}, false);

		startsWithElement.addEventListener("change", ()-> {
			if (startsWithElement.value != null) {
				startsWith = startsWithElement.value.toLowerCase();
			}
		}, false);

		endsWithElement.addEventListener("change", ()-> {
			if (endsWithElement.value != null) {
				endsWith = endsWithElement.value.toLowerCase();
			}
		}, false);

		includesElement.addEventListener("change", ()-> {
			if (includesElement.value != null) {
				includes = includesElement.value.toLowerCase();
			}
		}, false);

		excludesElement.addEventListener("change", ()-> {
			if (excludesElement.value != null) {
				excludes = excludesElement.value.toLowerCase();
			}
		}, false);

		similarElement.addEventListener("change", ()-> {
			if (similarElement.value != null) {
				similar = similarElement.value.toLowerCase();
			}
		}, false);

		regexMatchElement.addEventListener("change", ()-> {
			if (regexMatchElement.value != null) {
				regexMatch = regexMatchElement.value;
			}
		}, false);

		shareResultsAndSettingsElement.addEventListener("click", ()-> {
			shareLinkTextEdit.value = ShareResults.makeCustomQueryString(this, ShareResults.CustomQueryStringOption.EVERYTHING);
			shareLinkTextEdit.style.display = "block";
		}, false);

		shareResultsOnlyElement.addEventListener("click", ()-> {
			shareLinkTextEdit.value = ShareResults.makeCustomQueryString(this, ShareResults.CustomQueryStringOption.NO_TRAINING_DATA);
			shareLinkTextEdit.style.display = "block";
		}, false);
	}

	/*
	 * Runs the name generator, creating a new batch of names and puts the new names in the "names" section
	 */
	private inline function generate(presetName:String, data:Array<String>):Void {
		namesTitleElement.innerHTML = presetName;

		duplicateTrie = new PrefixTrie();
		for (name in data) {
			duplicateTrie.insert(name);
		}

		generator = new NameGenerator(data, order, prior);
		var names = new Array<String>();
		var startTime = Date.now().getTime();
		var currentTime = Date.now().getTime();

		var regex:EReg = regexMatch == "" ? null : new EReg(regexMatch, "i");

		while (names.length < maxWordsToGenerate && currentTime < startTime + maxProcessingTime) {
			var name = generator.generateName(minLength, maxLength, startsWith, endsWith, includes, excludes, regex);
			if (name != null && !duplicateTrie.find(name)) {
				names.push(name);
				duplicateTrie.insert(name);
			}
			currentTime = Date.now().getTime();
		}

		setNames(names);
	}

	/**
	 * Helper method that runs the "generate" method for one of the random preset set of training data
	 */
	private inline function generateForRandomPreset():Void {
		var topics = Type.getClassFields(TrainingData);
		var topic = topics[Std.random(topics.length)];
		trainingDataId = topic;

		var data = trainingDataTextEdit.value;
		if (data == null || data.length == 0) {
			return;
		}
		var arr = data.split(" ");
		if(arr.length > 0) {
			generate(trainingDataId, arr);
		}
	}

	/**
	 * Helper method that runs the "generate" method using the current name generation settings
	 */
	private inline function generateForCurrentSettings():Void {
		var data = trainingDataTextEdit.value;
		if (data == null || data.length == 0) {
			return;
		}
		var arr = data.split(" ");
		if(arr.length > 0) {
			generate(trainingDataId, arr);
		}
	}

	/*
	 * Helper method to set the generated names in the "names" section of the page
	 */
	private inline function setNames(names:Array<String>):Void {
		lastGeneratedNames = names;

		if(similar.length > 0) {
			names.sort((x:String, y:String)-> {
				var xSimilarity:Float = EditDistanceMetrics.damerauLevenshtein(x, similar);
				var ySimilarity:Float = EditDistanceMetrics.damerauLevenshtein(y, similar);

				if (xSimilarity > ySimilarity) {
					return 1;
				} else if (xSimilarity < ySimilarity) {
					return -1;
				} else {
					return 0;
				}
			});
		}

		noNamesFoundElement.innerHTML = "";
		currentNamesElement.innerHTML = "";
		if (names.length == 0) {
			noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
		}

		for (name in names) {
			var li = Browser.document.createLIElement();
			li.textContent = name.capitalize();
			currentNamesElement.appendChild(li);
		}
	}

	/*
	 * Converts the name of a training data field into something for display to the end user
	 */
	private inline function trainingDataFieldToDisplayName(field:String):String {
		return field.replace("_", " ").capitalizeWords().trim();
	}

	/*
	 * Converts the display name of a training data field to a fieldname
	 */
	private inline function displayNameToTrainingDataField(name:String):String {
		return name.lowercaseWords().trim().replace(" ", "_");
	}

	private function get_trainingDataId():String {
		return nameDataPresetListElement.value;
	}
	/*
	 * Updates the selected preset item when the training data key is changed programatically
	 */
	private function set_trainingDataId(key:String):String {
		nameDataPresetListElement.value = trainingDataFieldToDisplayName(key);
		nameDataSearchBoxElement.value = trainingDataFieldToDisplayName(key);

		var id:String = displayNameToTrainingDataField(key);
		var data:Array<String> = Reflect.field(TrainingData, id);
		var s:String = "";
		for (i in data) {
			s += i + " ";
		}
		s = s.rtrim();
		trainingDataTextEdit.value = s;

		return nameDataPresetListElement.value;
	}

	/*
	 * Misc HTML element accessors
	 */
	private function get_startsWith():String {
		return startsWithElement.value.toLowerCase();
	}
	private function set_startsWith(s:String):String {
		return startsWithElement.value = s.toLowerCase();
	}
	private function get_endsWith():String {
		return endsWithElement.value.toLowerCase();
	}
	private function set_endsWith(s:String):String {
		return endsWithElement.value = s.toLowerCase();
	}
	private function get_includes():String {
		return includesElement.value.toLowerCase();
	}
	private function set_includes(s:String):String {
		return includesElement.value = s.toLowerCase();
	}
	private function get_excludes():String {
		return excludesElement.value.toLowerCase();
	}
	private function set_excludes(s:String):String {
		return excludesElement.value = s.toLowerCase();
	}
	private function get_similar():String {
		return similarElement.value.toLowerCase();
	}
	private function set_similar(s:String):String {
		return similarElement.value = s.toLowerCase();
	}
	private function get_regexMatch():String {
		return regexMatchElement.value;
	}
	private function set_regexMatch(s:String):String {
		return regexMatchElement.value = s;
	}
}