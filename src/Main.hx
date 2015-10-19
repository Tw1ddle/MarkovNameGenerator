package;

import haxe.ds.StringMap;
import js.Browser;
import js.d3.D3;
import js.html.Element;
import js.html.InputElement;
import js.html.SelectElement;
import js.nouislider.NoUiSlider;
import js.wNumb.WNumb;
import lycan.util.EditDistanceMetrics;
import lycan.util.FileReader;
import lycan.namegen.NameGenerator;
import lycan.util.PrefixTrie;

class Main {
	private var generator:NameGenerator;
	private var duplicateTrie:PrefixTrie;
	
	private var trainingDataKey:String = "tolkienesque_forenames";
	private var numToGenerate:Int = 100;
	private var minLength:Int = 7;
	private var maxLength:Int = 10;
	private var order:Int = 3;
	private var prior:Float = 0.01;
	private var maxProcessingTime:Float = 500;
	private var startsWith:String = "a";
	private var endsWith:String = "";
	private var includes:String = "l";
	private var excludes:String = "z";
	private var similar:String = "alina";
	
	private var trainingDataElement:SelectElement;
	private var orderElement:Element;
	private var priorElement:Element;
	private var maxProcessingTimeElement:Element;
	
	private var currentNamesElement:Element;
	private var generateElement:Element;
	
	private var lengthElement:InputElement;
	private var startsWithElement:InputElement;
	private var endsWithElement:InputElement;
	private var includesElement:InputElement;
	private var excludesElement:InputElement;
	private var similarElement:InputElement;
	
	private var trainingData:StringMap<Array<String>>;
	
	private var d3trie:TrieForceGraph;
	
    private static function main():Void {
		var main = new Main();
	}
	
	private inline function new() {
		trainingData = new StringMap<Array<String>>();
		
		trainingData.set("us_forenames", FileReader.readFile("embed/usforenames.txt").split("\n"));
		trainingData.set("tolkienesque_forenames", FileReader.readFile("embed/tolkienesqueforenames.txt").split("\n"));
		trainingData.set("werewolf_forenames", FileReader.readFile("embed/werewolfforenames.txt").split("\n"));
		trainingData.set("romandeity_forenames", FileReader.readFile("embed/romandeityforenames.txt").split("\n"));
		trainingData.set("norsedeity_forenames", FileReader.readFile("embed/norsedeityforenames.txt").split("\n"));
		trainingData.set("swedish_forenames", FileReader.readFile("embed/swedishforenames.txt").split("\n"));
		trainingData.set("english_towns", FileReader.readFile("embed/englishtowns.txt").split("\n"));
		trainingData.set("theological_demons", FileReader.readFile("embed/theologicaldemons.txt").split("\n"));
		trainingData.set("scottish_surnames", FileReader.readFile("embed/scottishsurnames.txt").split("\n"));
		trainingData.set("irish_forenames", FileReader.readFile("embed/irishforenames.txt").split("\n"));
		trainingData.set("icelandic_forenames", FileReader.readFile("embed/icelandicforenames.txt").split("\n"));
		
		Browser.window.onload = onWindowLoaded;
	}
	
	private inline function onWindowLoaded():Void {
		//var numToGenerateSlider:NoUiSlider = NoUiSlider.create(getElementById("numToGenerateSlider"));
		//var lengthSlider:NoUiSlider = NoUiSlider.create(Browser.document.getElementById("lengthSlider"));
		
		trainingDataElement = cast Browser.document.getElementById("trainingdatalist");
		
		orderElement = cast Browser.document.getElementById("order");		
		priorElement = cast Browser.document.getElementById("prior");
		maxProcessingTimeElement = cast Browser.document.getElementById("maxtime");
		
		var addSliderTooltips = function(slider:Element):Void {
			var handles = slider.getElementsByClassName('noUi-handle');
			var tooltips = [];
			
			for (i in 0...handles.length) {
				var tooltip = Browser.document.createElement('div');
				tooltip.className = "tooltip";
				tooltip.innerHTML = "<strong>Value: </strong><span></span>";
				tooltips.push(tooltip);
				handles[i].appendChild(tooltip);
			}
		}
		
		NoUiSlider.create(orderElement, {
			start: [ 3 ],
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
		//addSliderTooltips(orderElement);
		untyped orderElement.noUiSlider.on(UiSliderEvent.CHANGE, function(values:Array<Float>, handle:Int, rawValues:Array<Float>):Void {
			order = Std.int(values[handle]);
		});
		
		NoUiSlider.create(priorElement, {
			start: [ 0.01 ],
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
		//addSliderTooltips(priorElement);
		untyped priorElement.noUiSlider.on(UiSliderEvent.CHANGE, function(values:Array<Float>, handle:Int, rawValues:Array<Float>):Void {			
			prior = Std.parseFloat(untyped values[handle]);
		});
		
		NoUiSlider.create(maxProcessingTimeElement, {
			start: [ 500 ],
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
		//addSliderTooltips(maxProcessingTimeElement);
		untyped maxProcessingTimeElement.noUiSlider.on(UiSliderEvent.CHANGE, function(values:Array<Float>, handle:Int, rawValues:Array<Float>):Void {
			maxProcessingTime = Std.parseFloat(untyped values[handle]);
		});
		
		currentNamesElement = cast Browser.document.getElementById("currentnames");
		generateElement = cast Browser.document.getElementById("generate");
		lengthElement = cast Browser.document.getElementById("minmaxlength");
		
		NoUiSlider.create(lengthElement, {
			start: [ 4, 11 ],
			connect: true,
			range: {
				'min': [ 3, 1 ],
				'max': 18
			},
			pips: {
				mode: 'range',
				density: 10,
			}
		});
		//addSliderTooltips(lengthElement);
		untyped lengthElement.noUiSlider.on(UiSliderEvent.CHANGE, function(values:Array<Float>, handle:Int, rawValues:Array<Float>):Void {
			if (handle == 0) {
				minLength = values[handle];
			} else if (handle == 1) {
				maxLength = values[handle];
			}
		});
		
		startsWithElement = cast Browser.document.getElementById("startswith");
		endsWithElement = cast Browser.document.getElementById("endswith");
		includesElement = cast Browser.document.getElementById("includes");
		excludesElement = cast Browser.document.getElementById("excludes");
		similarElement = cast Browser.document.getElementById("similar");
		
		setDefaults();
		
		trainingDataElement.addEventListener("change", function() {
			if (trainingDataElement.value != null) {
				trainingDataKey = trainingDataElement.value;
			}
			
			trace(trainingData.get(trainingDataKey));
		}, false);
		
		generateElement.addEventListener("click", function() {
			var data = trainingData.get(trainingDataKey);
			Sure.sure(data != null);
			
			generate(data);
		}, false);
		
		startsWithElement.addEventListener("change", function() {
			if (startsWithElement.value != null) {
				startsWith = startsWithElement.value;
			}
		}, false);
		
		endsWithElement.addEventListener("change", function() {
			if (endsWithElement.value != null) {
				endsWith = endsWithElement.value;
			}
		}, false);
		
		includesElement.addEventListener("change", function() {
			if (includesElement.value != null) {
				includes = includesElement.value;
			}
		}, false);
		
		excludesElement.addEventListener("change", function() {
			if (excludesElement.value != null) {
				excludes = excludesElement.value;
			}
		}, false);
		
		similarElement.addEventListener("change", function() {
			if (similarElement.value != null) {
				similar = similarElement.value;
			}
		}, false);
		
		d3trie = new TrieForceGraph();
		D3.select("#triegraph").append("svg:svg").text(function() {
			return "d3 select thing seemed to work";
		}).style("background-color", "black");
		
		js.Browser.window.setInterval(function() {
			// Update d3 trie
			
			trace("Updating");
		}, 250);
	}
	
	private function generate(data:Array<String>):Void {
		duplicateTrie = new PrefixTrie();
		for (name in data) {
			duplicateTrie.insert(name);
		}
		
		trace(prior);
		
		generator = new NameGenerator(data, order, prior);
		var names = new Array<String>();
		var startTime = Date.now().getTime();
		var currentTime = Date.now().getTime();
		
		while (names.length < numToGenerate && currentTime < startTime + 2000) {
			var name = generator.generateName(minLength, maxLength, startsWith, endsWith, includes, excludes);
			if (name != null && !duplicateTrie.find(name)) {
				names.push(name);
				duplicateTrie.insert(name);
			}
			currentTime = Date.now().getTime();
		}
		
		trace(duplicateTrie.getWords());
		
		appendNames(names);
	}
	
	private function appendNames(names:Array<String>):Void {
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
		
		currentNamesElement.innerHTML = "";
		if (names.length == 0) {
			var li = Browser.document.createLIElement();
			li.textContent = "No names found, check your filters or try again.";
			currentNamesElement.appendChild(li);
		}
		
		for (name in names) {
			var li = Browser.document.createLIElement();
			li.textContent = name;
			currentNamesElement.appendChild(li);
		}
	}
	
	private function setDefaults():Void {
		numToGenerate = 100;	
		
		minLength = 7;
		maxLength = 10;
		
		order = 3;
		prior = 0.01;
		
		startsWith = "a";
		startsWithElement.value = startsWith;
		
		endsWith = "";
		endsWithElement.value = endsWith;
		
		includes = "l";
		includesElement.value = includes;
		
		excludes = "z";
		excludesElement.value = excludes;
		
		similar = "alina";
		similarElement.value = similar;
	}
}