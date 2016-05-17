package markov.namegen;

using markov.util.StringExtensions;

using StringTools;

/**
 * An example class that facilitates simple name generation, building on the basic word generator class.
 * Note, it may be necessary to rewrite the basic word Generator class to accommodate assumptions and characteristics of their design.
 */
class NameGenerator extends Generator {
	/**
	 * Creates a new procedural name generator.
	 * @param	data	Training data for the generator, an array of words.
	 * @param	order	Highest order of model to use - models 1 to order will be generated.
	 * @param	prior	The dirichlet prior/additive smoothing "randomness" factor.
	 */
	public function new(data:Array<String>, order:Int, smoothing:Float) {
		super(data, order, smoothing);
	}
	
	/**
	 * Creates a word within the given constraints.
	 * If the generated word does not meet the constraints, this returns null.
	 * @param	minLength	The minimum length of the word.
	 * @param	maxLength	The maximum length of the word.
	 * @param	startsWith	The text the word must start with.
	 * @param	endsWith	The text the word must end with.
	 * @param	includes	The text the word must include.
	 * @param	excludes	The text the word must exclude.
	 * @return	The word that meets the specified constraints, or null if the generated word did not meet the constraints.
	 */
	public function generateName(minLength:Int, maxLength:Int, startsWith:String, endsWith:String, includes:String, excludes:String):String {		
		var name = "";
		
		name = generate();
		name = name.replace("#", "");
		if (name.length >= minLength && name.length <= maxLength && name.startsWith(startsWith) && name.endsWith(endsWith) && (includes.length == 0 || name.contains(includes)) && (excludes.length == 0 || !name.contains(excludes))) {
			return name;
		}
		
		return null;
	}
	
	/**
	 * Attempts to generate "n" names that meet the given constraints within an alotted time.
	 * @param	n	The number of names to generate.
	 * @param	minLength	The minimum length of the word.
	 * @param	maxLength	The maximum length of the word.
	 * @param	startsWith	The text the word must start with.
	 * @param	endsWith	The text the word must end with.
	 * @param	includes	The text the word must include.
	 * @param	excludes	The text the word must exclude.
	 * @param	maxTimePerName	The maximum time in seconds to spend generating each name.
	 * @return	The word that meets the specified constraints, or null if no word was generated in the time alotted.
	 */
	public function generateNames(n:Int, minLength:Int, maxLength:Int, startsWith:String, endsWith:String, includes:String, excludes:String, maxTimePerName:Float = 0.02):Array<String> {
		var names = new Array<String>();
		
		var startTime = Date.now().getTime();
		var currentTime = Date.now().getTime();
		
		while (names.length < n && currentTime > startTime + (maxTimePerName * n)) {
			var name = generateName(minLength, maxLength, startsWith, endsWith, includes, excludes);
			if (name != null) {
				names.push(name);
			}
			
			currentTime = Date.now().getTime();
		}
		
		return names;
	}
}