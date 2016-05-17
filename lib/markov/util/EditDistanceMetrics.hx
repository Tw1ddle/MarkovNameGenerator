package markov.util;

import haxe.ds.Vector;

using markov.util.IntExtensions;

/**
 * Algorithms that calculate the edit distances between strings.
 */
class EditDistanceMetrics {
	/**
	 * Calculates the number of single-character edits (insertions, deletions and replacements) required to transform the source into the target, known as the Levenshtein distance.
	 * This is a fast, iterative method that doesn't create a whole distance table up front.
	 * The source and target may not be null.
	 * @param	source	The source string.
	 * @param	target	The target string.
	 * @param	The number of single-character edits needed to transform the source into the target.
	 */
	public static function levenshtein(source:String, target:String):Int {
		Sure.sure(source != null);
		Sure.sure(target != null);
		var slen:Int = source.length;
		var tlen:Int = target.length;
		
		if (slen == 0) {
			return tlen;
		}
		if (tlen == 0) {
			return slen;
		}
		
		var costs:Vector<Int> = new Vector(tlen + 1);
		for (i in 0...costs.length) {
			costs[i] = i;
		}
		
		var s:Int = 0;
		while (s < source.length) {
			costs[0] = s + 1;
			var corner:Int = s;
			var t:Int = 0;
			while (t < target.length) {
				var upper:Int = costs[t + 1];
				if (source.charAt(s) == target.charAt(t)) {
					costs[t + 1] = corner;
				} else {
					var tc:Int = upper < corner ? upper : corner;
					costs[t + 1] = (costs[t] < tc ? costs[t] : tc) + 1;
				}
				corner = upper;
				t++;
			}
			s++;
		}
		
		return costs[costs.length - 1];
	}
	
	/**
	 * Calculates the number of character edits (insertions, deletions, replacements and transpositions) required to transform the source into the target, known as the Damerau-Levenshtein distance.
	 * @param	source	The source string.
	 * @param	target	The target string.
	 * @return	The number of character edits needed to transform the source into the target.
	 */
	public static inline function damerauLevenshtein(source:String, target:String):Int {
		if (source.length == 0) {
			return target.length;
		} 
		if (target.length == 0) {
			return source.length;
		}
		var table = damerauLevenshteinMatrix(source, target, true);
		return table[table.length - 1];
	}
	
	/**
	 * Calculates the distance table for single-character edits (insertions, deletions and replacements) that transform the source into the target.
	 * Damerau-Levenshtein is like the Levenshtein distance, but also allows for transposition of adjacent symbols.
	 * The source and target may not be null.
	 * @param	source	The source string.
	 * @param	target	The target string.
	 * @param	enableTransposition	Whether to allow adjacent symbols to be transposed i.e. swapped.
	 * @return	The distance table, which can be queried to obtain sequences of operations to transform the source to the target.
	 */
	public static function damerauLevenshteinMatrix(source:String, target:String, enableTranspositions:Bool = true):Vector<Int> {
		Sure.sure(source != null && target != null);
		var w:Int = source.length;
		var h:Int = target.length;
		
		if (w == 0 || h == 0) {
			return new Vector<Int>(0);
		}
		
		w += 1;
		h += 1;
		var costs:Vector<Int> = new Vector(w * h);
		for (i in 0...w) {
			costs[i] = i;
		}
		for (j in 1...h) {
			costs[j * w] = j;
		}
		
		var cost:Int = 0;
		for (x in 1...w) {
			for (y in 1...h) {
				if (source.charAt(x - 1) == target.charAt(y - 1)) {
					cost = 0;
				} else {
					cost = 1;
				}
				
				costs[x + y * w] = IntExtensions.min(costs[(x - 1) + ((y) * w)] + 1,
								   IntExtensions.min(costs[(x) + ((y - 1) * w)] + 1,
													 costs[(x - 1) + ((y - 1) * w)] + cost)); // Deletion, insertion, substitution
				
				if (enableTranspositions && x > 1 && y > 1 && source.charAt(x) == target.charAt(y - 1) && source.charAt(x - 1) == target.charAt(y)) {
					costs[x + y * w] = IntExtensions.min(costs[x + y * w], costs[x - 2 + ((y - 2) * w)] + cost); // Transposition
				}
			}
		}
		
		return costs;
	}
}