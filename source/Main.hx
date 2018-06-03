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

// Automatically reads training data from files into corresponding static arrays of strings in this class
@:build(TrainingDataBuilder.build("../embed"))
@:keep
class TrainingDatas {}

// A set of name training data
private class TrainingData {
	public var value(default, null):String; // The "value" field in the select element
	public var displayName(default, null):String; // The display name in the select element
	public var data:Array<String>; // The training data itself

	public inline function new(value:String, displayName:String, data:Array<String>) {
		this.value = value;
		this.displayName = displayName;
		this.data = data;
	}
}

// The keys for reading/writing preset settings in a URL query string
// These settings keys concern the name generator parameters and result filtering
@:enum abstract GeneratorSettingKey(String) from String to String {
	var PRESET_WORD_KEY = "w";
	var RESULT_WORD_KEY = "r";
	var NAME_DATA_PRESET = "name_data_preset";
	var NUMBER_TO_GENERATE = "number_to_generate";
	var LENGTH_RANGE_MIN = "length_range_min";
	var LENGTH_RANGE_MAX = "length_range_max";
	var ORDER = "order";
	var PRIOR = "prior";
	var MAX_WORDS = "max_words";
	var MAX_PROCESSING_TIME = "max_processing_time";
	var STARTS_WITH = "starts_with";
	var ENDS_WITH = "ends_width";
	var INCLUDES = "includes";
	var EXCLUDES = "excludes";
	var SIMILAR_TO = "similar_to";
	var REGEX_MATCH = "regex_match";
}

// The data that should be saved into the custom query string
// Note, should really use bitset/flags if more options are added
private enum CustomQueryStringOption {
	EVERYTHING;
	NO_TRAINING_DATA;
}

class Main {
	private static inline var WEBSITE_URL:String = "http://www.samcodes.co.uk/project/markov-namegen/"; // Hosted demo URL for building the custom query string

	private var generator:NameGenerator; // The Markov name generator
	private var duplicateTrie:PrefixTrie; // Prefix trie for catching duplicate generated words

	private var trainingData:Array<TrainingData>; // The training data
	private var trainingDataTopicTrie:PrefixTrie; // Prefix trie for finding matching topic when the user searches for them in the search text box

	private static inline function getElement(id:String):Dynamic {
		return Browser.document.getElementById(id);
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

	private static function main():Void {
		var main = new Main();
	}

	private inline function addTrainingData(displayName:String, data:Array<String>):Void {
		trainingData.push(new TrainingData(displayName, displayName, data));
	}

	private inline function new() {
		// Read in the training data
		trainingData = new Array<TrainingData>();
		for (name in Type.getClassFields(TrainingDatas)) {
			var data = Reflect.field(TrainingDatas, name);
			addTrainingData(name, data);
		}
		if(!isQueryStringEmpty()) {
			addTrainingData("Custom", []);
		}

		// Wait for the window to load before creating the sliders, listening for input etc
		Browser.window.onload = onWindowLoaded;
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
		// Alphabetically sort the internal training data
		trainingData.sort(function(a:TrainingData, b:TrainingData):Int {
			var left = a.displayName.toLowerCase();
			var right = b.displayName.toLowerCase();
			if (left < right) {
				return -1;
			}
			if (left > right) {
				return 1;
			}
			return 0;
		});

		trainingDataTopicTrie = new PrefixTrie();
		
		// Create the data list items and insert them into the topic trie
		for (data in trainingData) {
			var makeOption = function() {
				var option = Browser.document.createOptionElement();
				option.appendChild(Browser.document.createTextNode(data.displayName));
				option.value = data.value;
				return option;
			}
			nameDataPresetListElement.appendChild(makeOption());
			nameDataDataListElement.appendChild(makeOption());
			
			trainingDataTopicTrie.insert(data.displayName);
		}
	}

	private var lastNames:Array<String> = []; // The last set of generated names

	private var trainingDataKey(get, set):String; // The selected training data key
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

	private inline function isQueryStringEmpty():Bool {
		var params = Browser.window.location.search.substring(1);
		if (params == null || params == "") {
			return true;
		}
		return false;
	}

	/*
	 * Applies default settings, then any custom settings encoded in the query string
	 */
	private inline function applySettings():Void {
		// Apply the default settings for name generation, filtering, sorting etc
		Sure.sure(Reflect.hasField(TrainingDatas, "Animals"));
		trainingDataKey = "Animals";
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

		// Apply custom settings
		if (isQueryStringEmpty()) {
			return;
		}
		var params = Browser.window.location.search.substring(1);
		var splitParams = params.split("&");
		var customTrainingData = new Array<String>();
		var sharedResultData = new Array<String>();
		for (param in splitParams) {
			var kv = param.split("=");
			if (kv.length < 2) {
				continue;
			}

			var k = kv[0].urlDecode();
			var v = kv[1].urlDecode();

			switch(k) {
				case GeneratorSettingKey.RESULT_WORD_KEY:
					sharedResultData.push(v);
				case GeneratorSettingKey.PRESET_WORD_KEY:
					customTrainingData.push(v);
				case GeneratorSettingKey.LENGTH_RANGE_MIN:
					minLength = Std.parseInt(v);
				case GeneratorSettingKey.LENGTH_RANGE_MAX:
					maxLength = Std.parseInt(v);
				case GeneratorSettingKey.ORDER:
					order = Std.parseInt(v);
				case GeneratorSettingKey.PRIOR:
					prior = Std.parseFloat(v);
				case GeneratorSettingKey.MAX_WORDS:
					maxWordsToGenerate = Std.parseInt(v);
				case GeneratorSettingKey.MAX_PROCESSING_TIME:
					maxProcessingTime = Std.parseInt(v);
				case GeneratorSettingKey.STARTS_WITH:
					startsWith = v;
				case GeneratorSettingKey.ENDS_WITH:
					endsWith = v;
				case GeneratorSettingKey.INCLUDES:
					includes = v;
				case GeneratorSettingKey.EXCLUDES:
					excludes = v;
				case GeneratorSettingKey.SIMILAR_TO:
					similar = v;
				case GeneratorSettingKey.REGEX_MATCH:
					regexMatch = v;
			}
		}

		if (sharedResultData.length > 0) {
			lastNames = sharedResultData;
			setNames(lastNames);
		}

		if (customTrainingData.length > 3) { // Arbitrary minimum, just in case something goes a bit wrong when reading the query string
			var data = getTrainingDataForKey("Custom");
			data.data = customTrainingData;
			trainingDataKey = "Custom";
		}
	}

	/*
	 * Creates a settings query string for the current settings
	 */
	private function makeCustomQueryString(mode:CustomQueryStringOption):String {
		var s:String = WEBSITE_URL;

		var appendKv = function(k:String, v:String, sep = "&") {
			if (k == null || k.length == 0 || v == null || v.length == 0) {
				return;
			}
			s += (sep + k.urlEncode() + "=" + v.urlEncode());
		}

		appendKv(GeneratorSettingKey.LENGTH_RANGE_MIN, Std.string(minLength), "?");
		appendKv(GeneratorSettingKey.LENGTH_RANGE_MAX, Std.string(maxLength));
		appendKv(GeneratorSettingKey.ORDER, Std.string(order));
		appendKv(GeneratorSettingKey.PRIOR, Std.string(prior));
		appendKv(GeneratorSettingKey.MAX_WORDS, Std.string(maxWordsToGenerate));
		appendKv(GeneratorSettingKey.MAX_PROCESSING_TIME, Std.string(maxProcessingTime));
		appendKv(GeneratorSettingKey.STARTS_WITH, startsWith);
		appendKv(GeneratorSettingKey.ENDS_WITH, endsWith);
		appendKv(GeneratorSettingKey.INCLUDES, includes);
		appendKv(GeneratorSettingKey.EXCLUDES, excludes);
		appendKv(GeneratorSettingKey.SIMILAR_TO, similar);
		appendKv(GeneratorSettingKey.REGEX_MATCH, regexMatch);

		if(mode != CustomQueryStringOption.NO_TRAINING_DATA) {
			var data = trainingDataTextEdit.value.split(" ");
			if (data.length > 1) {
				for (word in data) {
					if (word != null && word.length != 0) {
						appendKv(GeneratorSettingKey.PRESET_WORD_KEY, word);
					}
				}
			}
		}

		if(lastNames.length > 0) {
			for (name in lastNames) {
				if (name != null && name.length != 0) {
					appendKv(GeneratorSettingKey.RESULT_WORD_KEY, name);
				}
			}
		}

		return s;
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
		untyped orderElement.noUiSlider.on(UiSliderEvent.CHANGE, function(values:Array<Float>, handle:Int, rawValues:Array<Float>):Void {
			order = Std.int(values[handle]);
		});
		untyped orderElement.noUiSlider.on(UiSliderEvent.UPDATE, function(values:Array<Float>, handle:Int, rawValues:Array<Float>):Void {
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
		untyped priorElement.noUiSlider.on(UiSliderEvent.CHANGE, function(values:Array<Float>, handle:Int, rawValues:Array<Float>):Void {
			prior = Std.parseFloat(untyped values[handle]);
		});
		untyped priorElement.noUiSlider.on(UiSliderEvent.UPDATE, function(values:Array<Float>, handle:Int, rawValues:Array<Float>):Void {
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
		untyped maxWordsToGenerateElement.noUiSlider.on(UiSliderEvent.CHANGE, function(values:Array<Float>, handle:Int, rawValues:Array<Float>):Void {
			maxWordsToGenerate = Std.parseFloat(untyped values[handle]);
		});
		untyped maxWordsToGenerateElement.noUiSlider.on(UiSliderEvent.UPDATE, function(values:Array<Float>, handle:Int, rawValues:Array<Float>):Void {
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
		untyped maxProcessingTimeElement.noUiSlider.on(UiSliderEvent.CHANGE, function(values:Array<Float>, handle:Int, rawValues:Array<Float>):Void {
			maxProcessingTime = Std.parseFloat(untyped values[handle]);
		});
		untyped maxProcessingTimeElement.noUiSlider.on(UiSliderEvent.UPDATE, function(values:Array<Float>, handle:Int, rawValues:Array<Float>):Void {
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
		untyped lengthElement.noUiSlider.on(UiSliderEvent.CHANGE, function(values:Array<Float>, handle:Int, rawValues:Array<Float>):Void {
			if (handle == 0) {
				minLength = Std.int(values[handle]);
			} else if (handle == 1) {
				maxLength = Std.int(values[handle]);
			}
		});
		untyped lengthElement.noUiSlider.on(UiSliderEvent.UPDATE, function(values:Array<Float>, handle:Int, rawValues:Array<Float>):Void {
			updateTooltips(lengthElement, handle, Std.int(values[handle]));
		});
	}

	/*
	 * Add event listeners to the input elements, in order to update the values we feed the model when "generate" is pressed
	 */
	private inline function addEventListeners():Void {
		nameDataPresetListElement.addEventListener("change", function() {
			trainingDataKey = nameDataPresetListElement.value;
		}, false);
		
		nameDataSearchBoxElement.addEventListener("change", function() {
			if (trainingDataTopicTrie.find(nameDataSearchBoxElement.value)) {
				trainingDataKey = nameDataSearchBoxElement.value;
			}
		}, false);
		nameDataSearchBoxElement.addEventListener("input", function() {
			if (trainingDataTopicTrie.find(nameDataSearchBoxElement.value)) {
				trainingDataKey = nameDataSearchBoxElement.value;
			}
		}, false);

		trainingDataTextEdit.addEventListener("change", function() {
			generateForCurrentSettings();
		}, false);

		generateElement.addEventListener("click", function() {
			generateForCurrentSettings();
		}, false);

		randomThemeElement.addEventListener("click", function() {
			generateForRandomPreset();
		}, false);

		startsWithElement.addEventListener("change", function() {
			if (startsWithElement.value != null) {
				startsWith = startsWithElement.value.toLowerCase();
			}
		}, false);

		endsWithElement.addEventListener("change", function() {
			if (endsWithElement.value != null) {
				endsWith = endsWithElement.value.toLowerCase();
			}
		}, false);

		includesElement.addEventListener("change", function() {
			if (includesElement.value != null) {
				includes = includesElement.value.toLowerCase();
			}
		}, false);

		excludesElement.addEventListener("change", function() {
			if (excludesElement.value != null) {
				excludes = excludesElement.value.toLowerCase();
			}
		}, false);

		similarElement.addEventListener("change", function() {
			if (similarElement.value != null) {
				similar = similarElement.value.toLowerCase();
			}
		}, false);
		
		regexMatchElement.addEventListener("change", function() {
			if (regexMatchElement.value != null) {
				regexMatch = regexMatchElement.value;
			}
		}, false);

		shareResultsAndSettingsElement.addEventListener("click", function() {
			shareLinkTextEdit.value = makeCustomQueryString(CustomQueryStringOption.EVERYTHING);
			shareLinkTextEdit.style.display = "block";
		}, false);

		shareResultsOnlyElement.addEventListener("click", function() {
			shareLinkTextEdit.value = makeCustomQueryString(CustomQueryStringOption.NO_TRAINING_DATA);
			shareLinkTextEdit.style.display = "block";
		}, false);
	}

	private function onNameDataPresetSelectionChanged(key:String):Void {
		var data = getTrainingDataForKey(key);
		var s:String = "";
		for (i in data.data) {
			s += i + " ";
		}
		s = s.rtrim();
		trainingDataTextEdit.value = s;
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
		var topics = Type.getClassFields(TrainingDatas);
		var topic = topics[Std.random(topics.length)];
		trainingDataKey = topic;
		
		var data = trainingDataTextEdit.value;
		if (data == null || data.length == 0) {
			return;
		}
		var arr = data.split(" ");
		if(arr.length > 0) {
			generate(trainingDataKey, arr);
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
			generate(trainingDataKey, arr);
		}
	}

	/*
	 * Helper method to set the generated names in the "names" section of the page
	 */
	private inline function setNames(names:Array<String>):Void {
		lastNames = names;

		if(similar.length > 0) {
			names.sort(function(x:String, y:String):Int {
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
	 * Helper method to search the training data array for a particular set of training data
	 */
	private function getTrainingDataForKey(key:String):TrainingData {
		for (data in trainingData) {
			if (data.value == key) {
				return data;
			}
		}
		return null;
	}

	private function get_trainingDataKey():String {
		return nameDataPresetListElement.value;
	}

	/*
	 * Updates the selected preset item when the training data key is changed programatically
	 */
	private function set_trainingDataKey(key:String):String {
		nameDataPresetListElement.value = key;
		nameDataSearchBoxElement.value = key;
		onNameDataPresetSelectionChanged(key);
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