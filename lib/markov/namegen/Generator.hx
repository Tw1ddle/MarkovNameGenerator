package markov.namegen;

import markov.util.ArraySet;

using markov.util.StringExtensions;

/**
 * A procedural word generator that uses Markov chains built from a user-provided array of words.
 *
 * This uses Katz's back-off model, which is an approach that uses high-order models. It looks for the next letter based on the last "n" letters, backing down to lower order models when higher models fail.
 *
 * This also uses a Dirichlet prior, which acts as an additive smoothing factor, introducing a chance for random letters to be be picked.
 *
 * @see http://www.samcodes.co.uk/project/markov-namegen/
 * @see https://en.wikipedia.org/wiki/Katz%27s_back-off_model
 * @see https://en.wikipedia.org/wiki/Additive_smoothing
 */
class Generator {
    /**
     * The highest order model used by this generator.
     *
     * Generators own models of order 1 through order "n".
     * Generators of order "n" look back up to "n" characters when choosing the next character.
     */
    public var order(default, null):UInt;

    /**
     * Dirichlet prior, acts as an additive smoothing factor.
     *
     * The prior adds a constant probability that a random letter is picked from the alphabet when generating a new letter.
     */
    public var prior(default, null):Float;

    /**
     * The array of Markov models used by this generator, starting from highest order to lowest order.
     */
    private var models:Array<Model>;

    /**
     * Creates a new procedural word Generator.
     * @param   data    Training data for the generator, an array of words.
     * @param   order   Highest order of model to use - models 1 to order will be generated.
     * @param   prior   The dirichlet prior/additive smoothing "randomness" factor.
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
     * Generates the next letter in a word.
     * @param   context The context the model will use for generating the next letter.
     * @return  The generated letter, or null if no model could generate one.
     */
    private function getLetter(context:String):String {
        Sure.sure(context != null);
        Sure.sure(context.length > 0);

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
