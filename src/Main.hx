package;

import js.Browser;
import js.html.Element;
import js.html.InputElement;
import js.html.SelectElement;
import js.nouislider.NoUiSlider;
import js.wNumb.WNumb;
import markov.namegen.NameGenerator;
import markov.util.EditDistanceMetrics;
import markov.util.FileReader;
import markov.util.PrefixTrie;

using StringTools;
using markov.util.StringExtensions;

class Main {
	private var generator:NameGenerator; // The Markov name generator
	private var duplicateTrie:PrefixTrie; // Prefix trie for catching duplicates
	private var trainingData:Array<TrainingData>; // The training data
	/*
	private var trieGraph:TrieForceGraph;
	private var markovGraph:MarkovGraph;
	*/
	
    private static function main():Void {
		var main = new Main();
	}
	
	private inline function new() {
		// Builds a lookup table for the training data, matching the presets in the HTML
		trainingData = new Array<TrainingData>();
		
		var addTrainingData = function(value:String, display:String, data:Array<String>):Void {
			trainingData.push(new TrainingData(value, display, data));
		}
		
		var addCustomTrainingData = function(value:String, display:String) {
			trainingData.push(new TrainingData(value, "Custom", getCustomTrainingData()));
		};
		
		addTrainingData("us_forenames", "American Forenames", FileReader.readFile("embed/usforenames.txt").split("\n"));
		addTrainingData("tolkienesque_forenames", "Tolkienesque Forenames", FileReader.readFile("embed/tolkienesqueforenames.txt").split("\n"));
		addTrainingData("werewolf_forenames", "Werewolf Forenames", FileReader.readFile("embed/werewolfforenames.txt").split("\n"));
		addTrainingData("romandeity_forenames", "Roman Deity Forenames", FileReader.readFile("embed/romandeityforenames.txt").split("\n"));
		addTrainingData("norsedeity_forenames", "Norse Deity Forenames", FileReader.readFile("embed/norsedeityforenames.txt").split("\n"));
		addTrainingData("swedish_forenames", "Swedish Forenames", FileReader.readFile("embed/swedishforenames.txt").split("\n"));
		addTrainingData("english_towns", "English Towns", FileReader.readFile("embed/englishtowns.txt").split("\n"));
		addTrainingData("theological_demons", "Theological Demons", FileReader.readFile("embed/theologicaldemons.txt").split("\n"));
		addTrainingData("scottish_surnames", "Scottish Surnames", FileReader.readFile("embed/scottishsurnames.txt").split("\n"));
		addTrainingData("irish_forenames", "Irish Forenames", FileReader.readFile("embed/irishforenames.txt").split("\n"));
		addTrainingData("icelandic_forenames", "Icelandic Forenames", FileReader.readFile("embed/icelandicforenames.txt").split("\n"));
		addTrainingData("theological_angels", "Theological Angels", FileReader.readFile("embed/theologicalangels.txt").split("\n"));
		addTrainingData("japanese_forenames", "Japanese Forenames", FileReader.readFile("embed/japaneseforenames.txt").split("\n"));
		addTrainingData("french_forenames", "French Forenames", FileReader.readFile("embed/frenchforenames.txt").split("\n"));
		addTrainingData("german_towns", "German Towns", FileReader.readFile("embed/germantowns.txt").split("\n"));
		addTrainingData("animals", "Animals", FileReader.readFile("embed/animals.txt").split("\n"));
		addTrainingData("pokemon", "Pokemon", FileReader.readFile("embed/pokemon.txt").split("\n"));
		addTrainingData("fish", "Fish", FileReader.readFile("embed/fish.txt").split("\n"));
		addTrainingData("plantscommon", "Plants (Common Names)", FileReader.readFile("embed/plantscommon.txt").split("\n"));
		addTrainingData("countries", "Countries", FileReader.readFile("embed/countries.txt").split("\n"));
		addTrainingData("clothing", "Clothing", FileReader.readFile("embed/clothing.txt").split("\n"));
		//addTrainingData("profanity_filter", "Profanity", FileReader.readFile("embed/profanityfilter.txt").split("\n")); // Skipping this one for SEO and paranoia reasons
		addCustomTrainingData("custom", "Custom");
		
		// Alphabetically sort the training data list items
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
		
		// Wait for the window to load before creating the sliders, listening for input etc
		Browser.window.onload = onWindowLoaded;
	}
	
	private inline function onWindowLoaded():Void {
		getElementReferences();
		buildTrainingDataList();
		setDefaults();
		createSliders();
		addEventListeners();
		
		trainingDataElementSelectionChanged();
	}
	
	private var trainingDataListElement:SelectElement;
	private var trainingDataTextEdit:InputElement;
	private var orderElement:Element;
	private var priorElement:Element;
	private var maxProcessingTimeElement:Element;
	private var noNamesFoundElement:Element;
	private var currentNamesElement:Element;
	private var generateElement:Element;
	private var lengthElement:InputElement;
	private var startsWithElement:InputElement;
	private var endsWithElement:InputElement;
	private var includesElement:InputElement;
	private var excludesElement:InputElement;
	private var similarElement:InputElement;
	/*
	private var generateTrieVisualizationElement:Element;
	private var generateMarkovVisualizationElement:Element;
	private var markovVisualizationPElement:Element;
	*/
	
	/*
	 * Get references to the input elements on the webpage
	 */
	private inline function getElementReferences():Void {
		trainingDataListElement = cast Browser.document.getElementById("trainingdatalist");
		trainingDataTextEdit = cast Browser.document.getElementById("trainingdataedit");
		orderElement = cast Browser.document.getElementById("order");		
		priorElement = cast Browser.document.getElementById("prior");
		maxProcessingTimeElement = cast Browser.document.getElementById("maxtime");
		noNamesFoundElement = cast Browser.document.getElementById("nonamesfound");
		currentNamesElement = cast Browser.document.getElementById("currentnames");
		generateElement = cast Browser.document.getElementById("generate");
		lengthElement = cast Browser.document.getElementById("minmaxlength");
		startsWithElement = cast Browser.document.getElementById("startswith");
		endsWithElement = cast Browser.document.getElementById("endswith");
		includesElement = cast Browser.document.getElementById("includes");
		excludesElement = cast Browser.document.getElementById("excludes");
		similarElement = cast Browser.document.getElementById("similar");
		/*
		generateTrieVisualizationElement = cast Browser.document.getElementById("generatetriegraph");
		generateMarkovVisualizationElement = cast Browser.document.getElementById("generatemarkovgraph");
		markovVisualizationPElement = cast Browser.document.getElementById("markovp");
		*/
	}
	
	/*
	 * Generates the HTML training data selection list
	 */
	private inline function buildTrainingDataList():Void {
		for (data in trainingData) {
			var option = Browser.document.createOptionElement();
			option.appendChild(Browser.document.createTextNode(data.displayName));
			option.value = data.value;
			trainingDataListElement.appendChild(option);
		}
	}
	
	/*
	 * Try to take custom training data from "w" parameters in the URL
	 */
	private inline function getCustomTrainingData():Array<String> {
		var params = Browser.window.location.search.substring(1);
		
		if (params == null || params == "") {
			return [];
		}
		
		var splitParams = params.split("&");
		var trainingData = new Array<String>();
		for (param in splitParams) {
			var kv = param.split("=");
			if (kv.length < 2) {
				continue;
			}
			
			if (kv[0] == "w") {
				trainingData.push(kv[1]);
			}
		}
		
		return trainingData;
	}
	
	private var trainingDataKey(default, set):String; // The selected training data key
	private var numToGenerate:Int; // Number of names to try to generate
	private var minLength:Int; // Minimum name length
	private var maxLength:Int; // Maximum name length
	private var order:Int; // Maximum order model that the name generator should use
	private var prior:Float; // Value of the Dirichlet prior that the name generator should use
	private var maxProcessingTime:Float; // Maximum time the name generator should spend generating a batch of names
	private var startsWith:String; // String that names must start with
	private var endsWith:String; // String that names must end with
	private var includes:String; // String that names must include
	private var excludes:String; // String that names must include
	private var similar:String; // String that names are sorted by their similarity to
	/*
	private var generateTrieVisualization:Bool = false; // Generate a graph of the duplicate trie
	private var generateMarkovVisualization:Bool = false; // Generate a graph of one of the markov models
	private var markovVisualizationMinP:Float = 0.01; // Minimum p value required to draw one of the markov model edges
	*/
	
	/*
	 * Set the default values for name generation, filtering and sorting
	 */
	private inline function setDefaults():Void {
		// Optionally set custom data via a query string in the URL		
		var data = findTrainingDataForKey("custom");
		if (data != null && data.length > 0) {
			trainingDataKey = "custom";
		} else {
			trainingDataKey = "animals";
		}
		
		numToGenerate = 100;
		minLength = 5;
		maxLength = 11;
		order = 3;
		prior = 0.005;
		maxProcessingTime = 800;
		startsWith = "";
		startsWithElement.value = startsWith;
		endsWith = "";
		endsWithElement.value = endsWith;
		includes = "";
		includesElement.value = includes;
		excludes = "";
		excludesElement.value = excludes;
		similar = "";
		similarElement.value = similar;
		
		/*
		markovVisualizationMinP = 0.01;
		generateTrieVisualization = false;
		generateMarkovVisualization = false;
		*/
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
				'50%': 0.15,
				'max': 0.3
			},
			pips: {
				mode: 'range',
				density: 10,
				format: new WNumb( {
					decimals: 2
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
		
		/*
		NoUiSlider.create(generateTrieVisualizationElement, {
			orientation: "vertical",
			connect: 'lower',
			start: generateTrieVisualization ? 1 : 0,
			range: {
				'min': [0, 1],
				'max': 1
			},
			format: new WNumb( {
				decimals: 0
			})
		});
		untyped generateTrieVisualizationElement.noUiSlider.on(UiSliderEvent.CHANGE, function(values:Array<Float>, handle:Int, rawValues:Array<Float>):Void {
			generateTrieVisualization = Std.int(values[handle]) == 1 ? true : false;
		});
		
		NoUiSlider.create(generateMarkovVisualizationElement, {
			orientation: "vertical",
			connect: 'lower',
			start: 1,
			range: {
				'min': [0, 1],
				'max': 1
			},
			format: new WNumb( {
				decimals: 0
			})
		});
		untyped generateMarkovVisualizationElement.noUiSlider.on(UiSliderEvent.CHANGE, function(values:Array<Float>, handle:Int, rawValues:Array<Float>):Void {
			generateMarkovVisualization = Std.int(values[handle]) == 1 ? true : false;
		});
		
		NoUiSlider.create(markovVisualizationPElement, {
			connect: 'lower',
			start: 0.01,
			range: {
				'min': [0.001, 0.001],
				'max': 1
			},
			format: new WNumb( {
				decimals: 4
			}),
			pips: {
				mode: 'range',
				density: 10,
			}
		});
		createTooltips(markovVisualizationPElement);
		untyped markovVisualizationPElement.noUiSlider.on(UiSliderEvent.CHANGE, function(values:Array<Float>, handle:Int, rawValues:Array<Float>):Void {
			markovVisualizationMinP = values[handle];
		});
		untyped markovVisualizationPElement.noUiSlider.on(UiSliderEvent.UPDATE, function(values:Array<Float>, handle:Int, rawValues:Array<Float>):Void {
			updateTooltips(markovVisualizationPElement, handle, values[handle]);
		});
		*/
	}
	
	/*
	 * Add event listeners to the input elements, in order to update the values we feed the model when "generate" is pressed
	 */ 
	private inline function addEventListeners():Void {
		trainingDataListElement.addEventListener("change", function() {
			trainingDataElementSelectionChanged();
		}, false);
		
		trainingDataTextEdit.addEventListener("change", function() {
			
		}, false);
		
		generateElement.addEventListener("click", function() {
			var data = trainingDataTextEdit.value;
			if (data == null || data.length == 0) {
				return;
			}
			var arr = data.split(" ");
			if(arr.length > 0) {
				generate(arr);
			}
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
	}
	
	private function trainingDataElementSelectionChanged():Void {
		if (trainingDataListElement.value != null) {
			trainingDataKey = trainingDataListElement.value;
			var data = findTrainingDataForKey(trainingDataKey);
			if (data != null) {
				var s:String = "";
				for (i in data) {
					s += i + " ";
				}
				s = s.rtrim();
				trainingDataTextEdit.value = s;
			}
		}
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
	 * Runs when the "generate" button is pressed, creates a new batch of names and puts the new names in the "names" section
	 */
	private inline function generate(data:Array<String>):Void {
		duplicateTrie = new PrefixTrie();
		for (name in data) {
			duplicateTrie.insert(name);
		}
		
		generator = new NameGenerator(data, order, prior);
		var names = new Array<String>();
		var startTime = Date.now().getTime();
		var currentTime = Date.now().getTime();
		
		while (names.length < numToGenerate && currentTime < startTime + maxProcessingTime) {
			var name = generator.generateName(minLength, maxLength, startsWith, endsWith, includes, excludes);
			if (name != null && !duplicateTrie.find(name)) {
				names.push(name);
				duplicateTrie.insert(name);
			}
			currentTime = Date.now().getTime();
		}
		
		setNames(names);
		
		/*
		if(generateTrieVisualization) {
			trieGraph = new TrieForceGraph(duplicateTrie, "#triegraph", 400, 500);
		} else {
			D3.select("svg").remove();
		}
		
		if (generateMarkovVisualization) {
			markovGraph = new MarkovGraph(generator, 1, "#markovgraph", 400, 500, markovVisualizationMinP);
		} else {
			D3.select("svg").remove();
		}
		*/
	}
	
	/*
	 * Helper method to set the generated names in the "names" section of the page
	 */
	private inline function setNames(names:Array<String>):Void {
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
			noNamesFoundElement.textContent = "No names found, try again or change the settings.";
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
	private function findTrainingDataForKey(key:String):Array<String> {
		for (data in trainingData) {
			if (data.value == key) {
				return data.data;
			}
		}
		return null;
	}
	
	/*
	 * Updates the selected preset item when the training data key is changed programatically
	 */ 
	private function set_trainingDataKey(key:String):String {
		if (trainingDataListElement != null) {
			trainingDataListElement.value = key;
		}
		return this.trainingDataKey = key;
	}
}

// A set of name training data
private class TrainingData {
	public var value(default, null):String; // The "value" field in the select element
	public var displayName(default, null):String; // The display name in the select element
	public var data(default, null):Array<String>; // The training data itself
	
	public inline function new(value:String, displayName:String, data:Array<String>) {
		this.value = value;
		this.displayName = displayName;
		this.data = data;
	}
}