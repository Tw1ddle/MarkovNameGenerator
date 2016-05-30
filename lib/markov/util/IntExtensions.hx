package markov.util;

/**
 * Extension methods for ints.
 */
class IntExtensions {
    /**
     * Clamps a value between min and max inclusive.
     * @param   value   The value to clamp.
     * @param   min The minimum allowed value.
     * @param   max The maximum allowed value.
     * @return  The value clamped to the range [min, max].
     */
    inline public static function clamp(value:Int, min:Int, max:Int):Int {
        if (value < min) {
            return min;
        }
        if (value > max) {
            return max;
        }
        return value;
    }

    /**
     * Returns the smaller of two integers.
     * @param   a   The first integer.
     * @param   b   The second integer.
     * @return  The smaller of the two integers.
     */
    inline public static function min(a:Int, b:Int):Int {
        if (a < b) {
            return a;
        }
        return b;
    }
}