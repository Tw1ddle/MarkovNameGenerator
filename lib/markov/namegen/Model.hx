package markov.namegen;

import haxe.ds.StringMap;

using markov.util.StringExtensions;

/**
 * A Markov model built using string training data.
 */
class Model {
    /**
     * The order of the model i.e. how many characters this model looks back.
     */
    private var order:UInt;

    /**
     * Dirichlet prior, like additive smoothing, increases the probability of any item being picked.
     */
    private var prior:Float;

    /**
     * The alphabet of the training data.
     */
    private var alphabet:Array<String>;

    /**
     * The observations.
     */
    private var observations:StringMap<Array<String>>;

    /**
     * The Markov chains.
     */
    private var chains:StringMap<Array<Float>>;

    /**
     * Creates a new Markov model.
     * @param   data    The training data for the model, an array of words.
     * @param   order   The order of model to use, models of order "n" will look back "n" characters within their context when determining the next letter.
     * @param   prior   The dirichlet prior, an additive smoothing "randomness" factor. Must be in the range 0 to 1.
     * @param   alphabet    The alphabet of the training data i.e. the set of unique symbols used in the training data.
     */
    public function new(data:Array<String>, order:UInt, prior:Float, alphabet:Array<String>) {
        Sure.sure(alphabet != null && data != null);
        Sure.sure(alphabet.length > 0 && data.length > 0);
        Sure.sure(prior >= 0 && prior <= 1);

        this.order = order;
        this.prior = prior;
        this.alphabet = alphabet;

        observations = new StringMap<Array<String>>();
        train(data);
        buildChains();

        // Debug trace
        //trace(observations.toString());
        //trace(chains.toString());
    }

    /**
     * Attempts to generate the next letter in the word given the context (the previous "order" letters).
     * @param   context The previous "order" letters in the word.
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

    /**
     * Retrains the model on the newly supplied data, regenerating the Markov chains.
     * @param   data    The new training data.
     */
    public function retrain(data:Array<String>):Void {
        Sure.sure(data != null);
        train(data);
        buildChains();
    }

    /**
     * Trains the model on the given training data.
     * @param   data    The training data.
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

                // Debug trace
                //trace(d.charAt(i + order));
            }
        }
    }

    /**
     * Builds the Markov chains for the model.
     */
    private function buildChains():Void {
        chains = new StringMap<Array<Float>>();

        for (context in observations.keys()) {
            for (prediction in alphabet) {
                var value = chains.get(context);
                if (value == null) {
                    value = new Array<Float>();
                    chains.set(context, value);
                }
                value.push(prior + countMatches(observations.get(context), prediction));

                // Debug trace
                //trace(context + " -> " + (smoothing + countMatches(observations.get(context), prediction)));
            }
        }
    }

    private inline static function countMatches(arr:Array<String>, v:String):Int {
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

    private static function selectIndex(chain:Array<Float>):Int {
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