package markov.util;

/**
 * Extension methods for ints.
 */
class IntExtensions {
	/**
	 * Clamps a value between min and max.
	 * @param	v	The value to clamp.
	 * @param	min	The minimum allowed value.
	 * @param	max	The maximum allowed value.
	 * @return	The value clamped to the range [min, max].
	 */
	inline public static function clamp(v:Int, min:Int, max:Int):Int {
		if (v < min) {
			return min;
		}
		if (v > max) {
			return max;
		}
		return v;
	}
	
	/**
	 * Returns the smaller of the two integers.
	 * @param	a	The first integer.
	 * @param	b	The second integer.
	 * @return	The smaller of the two integers.
	 */
	inline public static function min(a:Int, b:Int):Int {
		if (a < b) {
			return a;
		}
		return b;
	}
}