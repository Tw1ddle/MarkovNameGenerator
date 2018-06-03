package markov.namegen;

using markov.util.StringExtensions;

using StringTools;

/**
 * An example name generator that builds upon the Generator class. This should be sufficient for most simple name generation scenarios.
 *
 * For complex name generators, modifying the Generator class to your specifications may be more appropriate or performant than extending this approach.
 */
class NameGenerator {
    /**
     * The underlying word generator.
     */
    private var generator:Generator;

    /**
     * Creates a new procedural name generator.
     * @param   data    Training data for the generator, an array of words.
     * @param   order   Highest order of model to use - models 1 to order will be generated.
     * @param   prior   The dirichlet prior/additive smoothing "randomness" factor.
     */
    public function new(data:Array<String>, order:Int, prior:Float) {
        generator = new Generator(data, order, prior);
    }

    /**
     * Creates a word within the given constraints.
     * If the generated word does not meet the constraints, this returns null.
     * @param   minLength   The minimum length of the word.
     * @param   maxLength   The maximum length of the word.
     * @param   startsWith  The text the word must start with.
     * @param   endsWith    The text the word must end with.
     * @param   includes    The text the word must include.
     * @param   excludes    The text the word must exclude.
     * @return  A word that meets the specified constraints, or null if the generated word did not meet the constraints.
     */
    public function generateName(minLength:Int, maxLength:Int, startsWith:String, endsWith:String, includes:String, excludes:String, regexMatch:EReg = null):String {
        var name = "";

        name = generator.generate();
        name = name.replace("#", "");
        if (name.length >= minLength && name.length <= maxLength
        && name.startsWith(startsWith) && name.endsWith(endsWith)
        && (includes.length == 0 || name.contains(includes))
        && (excludes.length == 0 || !name.contains(excludes))
        && (regexMatch == null || regexMatch.match(name))) {
            return name;
        }

        return null;
    }

    /**
     * Attempts to generate "n" names that meet the given constraints within an alotted time.
     * @param   n   The number of names to generate.
     * @param   minLength   The minimum length of the word.
     * @param   maxLength   The maximum length of the word.
     * @param   startsWith  The text the word must start with.
     * @param   endsWith    The text the word must end with.
     * @param   includes    The text the word must include.
     * @param   excludes    The text the word must exclude.
     * @param   maxTimePerName  The maximum time in seconds to spend generating each name.
     * @return  A word that meets the specified constraints, or null if no word that met the constraints was generated in the time alotted.
     */
    public function generateNames(n:Int, minLength:Int, maxLength:Int, startsWith:String, endsWith:String, includes:String, excludes:String, maxTimePerName:Float = 0.02, regexMatch:EReg = null):Array<String> {
        var names = new Array<String>();

        var startTime = Date.now().getTime();
        var currentTime = Date.now().getTime();

        while (names.length < n && currentTime > startTime + (maxTimePerName * n)) {
            var name = generateName(minLength, maxLength, startsWith, endsWith, includes, excludes, regexMatch);
            if (name != null) {
                names.push(name);
            }

            currentTime = Date.now().getTime();
        }

        return names;
    }
}