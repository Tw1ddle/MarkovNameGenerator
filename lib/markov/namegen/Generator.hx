package markov.namegen;

import markov.util.ArraySet;

using markov.util.StringExtensions;

/**
 * A word generator that procedurally generates words using high-order Markov chains build from training data.
 * Uses Katz's back-off model - chooses the next character based on conditional probability given the last n-characters (where model order = n) and backs down to lower order models when higher models fail.
 * Uses a Dirichlet prior, which is like additive smoothing and raises the chances of a "random" letter being picked instead of one that's trained in.
 * More information: https://github.com/Tw1ddle/MarkovNameGenerator
 */
class Generator {
	/**
	 * The highest order used by this generator.
	 * Generators have models from 1 to "order".
	 * Models with a given order look back up to "order" characters when choosing the next character.
	 */
	public var order(default, null):UInt;
	
	/**
	 * Dirichlet prior, acts as an additive smoothing factor.
	 * It is an additional constant probability that a random letter is picked from the alphabet.
	 */
	public var prior(default, null):Float;
	
	/**
	 * The array of Markov models used by this generator, starting from highest order to lowest order.
	 */
	private var models:Array<Model>;
	
	/**
	 * Creates a new procedural word Generator.
	 * @param	data	Training data for the generator, an array of words.
	 * @param	order	Highest order of model to use - models 1 to order will be generated.
	 * @param	prior	The dirichlet prior/additive smoothing "randomness" factor.
	 */
	public function new(data:Array<String>, order:UInt, prior:Float) {
		Sure.sure(data != null);
		Sure.sure(order >= 1);
		Sure.sure(prior >= 0);
		
		this.order = order;
		this.prior = prior;
		
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
		models = new Array<Model>();
		for (i in 0...order) {
			models.push(new Model(data.copy(), order - i, prior, domain));
		}
	}
	
	/**
	 * Generates a word.
	 * @return The generated word.
	 */
	public function generate():String {
		var word = "#".repeat(order);
		var letter = getLetter(word);
		while (letter != "#") {
			if(letter != null) {
				word += letter;
			}
			letter = getLetter(word);
		}
		return word;
	}
	
	/**
	 * Generates the next letter.
	 * @param	context	The context of the 
	 * @return	
	 */
	private function getLetter(context:String):String {
		var letter:String = null;
		var context:String = context.substring(context.length - order, context.length);
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
