package markov.namegen;

import markov.util.ArraySet;

using markov.util.StringExtensions;

// Provides procedural generation of words using high-order Markov chains
// Uses Katz's back-off model - chooses the next character based on conditional probability given the last n-characters (where model order = n) and backs down to lower order models when higher models fail
// Uses a Dirichlet prior, which is like additive smoothing and raises the chances of a "random" letter being picked instead of one that's trained in
class Generator {
	public var order(default, null):Int;
	public var smoothing(default, null):Float;
	private var models:Array<Model>;
	
	/*
	 * @param data - training data for the generator, array of words
	 * @param order - number of models to use, will be of orders up to and including "order"
	 * @param smoothing - the dirichlet prior/additive smoothing "randomness" factor
	 */
	public function new(data:Array<String>, order:Int, smoothing:Float) {
		Sure.sure(data != null);
		Sure.sure(order >= 1);
		
		this.order = order;
		this.smoothing = smoothing;
		
		models = new Array<Model>();
		
		// Identify and sort the alphabet used in the training data
		var letters = ArraySet.create();
		for (word in data) {
			for (i in 0...word.length) {
				letters.add(word.charAt(i));
			}
		}
		letters.sort(function(a:String, b:String) {
			if (a < b) {
				return -1;
			}
			if (a > b) {
				return 1;
			}
			return 0;
		});
		var domain:Array<String> = letters.toArray();
		domain.insert(0, "#");
		
		// Create models
		for (i in 0...order) {
			models.push(new Model(data.copy(), order - i, smoothing, domain));
		}
	}
	
	/*
	 * Generates a word
	 */
	public function generate():String {
		var name = "#".repeat(order);
		var letter = getLetter(name);
		while (letter != "#") {
			if(letter != null) {
				name += letter;
			}
			letter = getLetter(name);
		}
		return name;
	}
	
	/*
	 * Generates a single letter 
	 */
	private function getLetter(name:String):String {
		var letter:String = null;
		var context:String = name.substring(name.length - order, name.length);
		for (model in models) {
			letter = model.generate(context);
			if (letter == null) {
				context = context.substring(1);
			} else {
				break;
			}
		}
		return letter;
	}
}
