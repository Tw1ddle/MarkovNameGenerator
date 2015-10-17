package lycan.util.namegen;

import haxe.ds.StringMap;

using lycan.util.ArrayExtensions;
using lycan.util.StringExtensions;

class Model {
	private var order:Int; // The order of the model i.e. how many steps it looks back
	private var smoothing:Float; // Dirichlet prior, increases the probability of all items being picked which "smoothes" out the distribution of items picked
	private var domain:Array<String>; // The alphabet (domain of the data)
	private var observations:StringMap<Array<String>>;
	private var chains:StringMap<Array<Float>>;
	
	public function new(data:Array<String>, order:Int, smoothing:Float, domain:Array<String>) {
		Sure.sure(domain != null && data != null);
		Sure.sure(domain.length > 0 && data.length > 0);
		Sure.sure(smoothing >= 0 && smoothing <= 1);
		Sure.sure(order > 0);
		
		this.order = order;
		this.smoothing = smoothing;
		this.domain = domain;
		
		observations = new StringMap<Array<String>>();		
		train(data);
		rebuildChains();
		
		//trace(observations.toString());
		//trace(chains.toString());
	}
	
	public function retrain(data:Array<String>):Void {
		Sure.sure(data != null);
		train(data);
		rebuildChains();
	}
	
	private function train(data:Array<String>):Void {
		while (data.length != 0) {
			var d:String = data.pop();
			d = ("#".repeat(order)) + d + "#";
			for (i in 0...(d.length - order)) {
				var key = d.substring(i, i + order);
				//trace(key);
				var value = observations.get(key);
				if (value == null) {
					value = new Array<String>();
					observations.set(key, value);
				}
				value.push(d.charAt(i + order));
				//trace(d.charAt(i + order));
			}
		}
	}
	
	private function rebuildChains():Void {
		chains = new StringMap<Array<Float>>();
		
		for (context in observations.keys()) {
			for (prediction in domain) {
				var value = chains.get(context);
				if (value == null) {
					value = new Array<Float>();
					chains.set(context, value);
				}
				value.push(smoothing + countMatches(observations.get(context), prediction));
				//trace(context + " -> " + (smoothing + countMatches(observations.get(context), prediction)));
			}
		}
	}
	
	public function generate(context:String):String {
		Sure.sure(context != null);
		var chain = chains.get(context);
		if (chain == null) {
			return null;
		} else {
			Sure.sure(chain.length > 0);
			return domain[selectIndex(chain)];
		}
	}
	
	private inline function countMatches(arr:Array<String>, v:String):Int {
		if (arr == null) {
			return 0;
		}
		
		var i:Int = 0;
		for (s in arr) {
			if (s == v) {
				i++;
			}
		}
		return i;
	}
	
	private function selectIndex(chain:Array<Float>):Int {
		var totals = new Array<Float>();
		var accumulator:Float = 0;
		
		for (weight in chain) {
			accumulator += weight;
			totals.push(accumulator);
		}
		
		// Get a random index
		// Since the totals array is sorted in increasing order we use binary search
		/*
		var index:Int = totals.binarySearch(Math.random() * accumulator, 0, totals.length - 1);
		if (index < 0) {
			index = -index;
		}
		return index;
		*/
		
		var rand = Math.random() * accumulator;
		for (i in 0...totals.length) {
			if (rand < totals[i]) {
				return i;
			}
		}
		
		return 0;
	}
}