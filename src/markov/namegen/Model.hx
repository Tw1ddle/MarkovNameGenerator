package markov.namegen;

import haxe.ds.StringMap;

using markov.util.StringExtensions;

// Encapsulates a Markov model
class Model {
	private var order:Int; // The order of the model i.e. how many steps it looks back
	private var smoothing:Float; // Dirichlet prior, like additive smoothing, increases the probability of any item being picked
	private var alphabet:Array<String>; // The alphabet of the data
	private var observations:StringMap<Array<String>>;
	private var chains:StringMap<Array<Float>>;
	
	/*
	 * @param data - training data for the generator, array of words
	 * @param order - number of models to use, will be of orders up to and including "order"
	 * @params smoothing - the dirichlet prior/additive smoothing "randomness" factor
	 * @params alphabet - the alphabet of the training data (array of all the symbols used in the training data)
	 */
	public function new(data:Array<String>, order:Int, smoothing:Float, alphabet:Array<String>) {
		Sure.sure(alphabet != null && data != null);
		Sure.sure(alphabet.length > 0 && data.length > 0);
		Sure.sure(smoothing >= 0 && smoothing <= 1);
		Sure.sure(order > 0);
		
		this.order = order;
		this.smoothing = smoothing;
		this.alphabet = alphabet;
		
		observations = new StringMap<Array<String>>();		
		train(data);
		buildChains();
		
		//trace(observations.toString());
		//trace(chains.toString());
	}
	
	/*
	 * Attempts to generate the next letter given the context (the n previous letters)
	 * May return null, be sure to check against that
	 */
	public function generate(context:String):String {
		Sure.sure(context != null);
		var chain = chains.get(context);
		if (chain == null) {
			return null;
		} else {
			Sure.sure(chain.length > 0);
			return alphabet[selectIndex(chain)];
		}
	}
	
	/*
	 * Helper function, regenerates the markov chains
	 */ 
	public function retrain(data:Array<String>):Void {
		Sure.sure(data != null);
		train(data);
		buildChains();
	}
	
	/*
	 * Trains the model on the provided training data
	 */
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
	
	private function buildChains():Void {
		chains = new StringMap<Array<Float>>();
		
		for (context in observations.keys()) {
			for (prediction in alphabet) {
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
		
		var rand = Math.random() * accumulator;
		for (i in 0...totals.length) {
			if (rand < totals[i]) {
				return i;
			}
		}
		
		return 0;
	}
}