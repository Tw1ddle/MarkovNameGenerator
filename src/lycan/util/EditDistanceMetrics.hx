package lycan.util;

import haxe.ds.Vector;

using lycan.util.IntExtensions;

// TODO put these together as a big string similarity Haxelib?

class EditDistanceMetrics {
	// Returns the number of single-character edits (insertions, deletions and replacements) needed to transform the source into the target
	// Fast iterative method that doesn't create a whole distance table up front
	public static function levenshtein(source:String, target:String):Int {
		Sure.sure(source != null && target != null);
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
	
	// Like levenshtein distance, but may also transpose adjacent symbols
	// Returns the distance table for finding optimal sequences
	public static function damerauLevenshteinMatrix(source:String, target:String, enableTransposition:Bool = true):Vector<Int> {
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
				
				if (enableTransposition && x > 1 && y > 1 && source.charAt(x) == target.charAt(y - 1) && source.charAt(x - 1) == target.charAt(y)) {
					costs[x + y * w] = IntExtensions.min(costs[x + y * w], costs[x - 2 + ((y - 2) * w)] + cost); // Transposition
				}
			}
		}
		
		return costs;
	}
	
	// Like levenshtein distance, but also transposes adjacent symbols
	public static inline function damerauLevenshtein(source:String, target:String, enableTransposition:Bool = true):Int {
		if (source.length == 0) {
			return target.length;
		} 
		if (target.length == 0) {
			return source.length;
		}
		var table = damerauLevenshteinMatrix(source, target, enableTransposition);
		return table[table.length - 1];
	}
	
	// Returns the Jaro similarity between the strings, 1 is perfect match, 0 is no match
	public static function jaro(first:String, second:String):Float {
		var f:Int = first.length;
		var s:Int = second.length;
		
		// If both are empty, match, if only one empty, mismatch
		if (f == 0) {
			return s == 0 ? 1.0 : 0.0;
		}
		
		var fMatches = new Vector<Bool>(f);
		for (i in 0...f) {
			fMatches[i] = false;
		}
		var sMatches = new Vector<Bool>(s);
		for (i in 0...s) {
			sMatches[i] = false;
		}
		
		var matchDistance:Int = Std.int(IntExtensions.max(f, s) / 2 - 1);
		var matches:Float = 0;
		var transpositions:Float = 0;
		
		for (i in 0...f) {
			var start:Int = IntExtensions.max(0, i - matchDistance);
			var end:Int = IntExtensions.min(i + matchDistance + 1, s);
			
			for (j in start...end) {
				if (sMatches[j]) {
					continue;
				}
				
				if (first.charAt(i) != second.charAt(j)) {
					continue;
				}
				
				fMatches[i] = true;
				sMatches[j] = true;
				matches++;
				break;
			}
		}
		
		if (matches == 0) {
			return 0.0;
		}
		
		var k:Int = 0;
		for (i in 0...f) {
			if (!fMatches[i]) {
				continue;
			}
			while (!sMatches[k]) {
				k++;
			}
			if (first.charAt(i) != second.charAt(k)) {
				transpositions++;
			}
			k++;
		}
		
		transpositions *= 0.5;
		
		var jaro:Float = ((matches / f) + (matches / s) + (matches - transpositions) / matches) / 3.0;
		return jaro;
	}
	
	// Returns the Jaro-Winkler similarity between the strings, 1 is perfect match, 0 is no match
	// Winkler modification makes mismatches at the ends more significant
	public static function jaroWinkler(first:String, second:String, maxPrefixLength:Int = 4):Float {
		var jaroSimilarity:Float = jaro(first, second);
		var prefixLength:Int = 0;
		if (first.length != 0 && second.length != 0) {
			var minLen = IntExtensions.min(first.length, second.length);
			for (i in 0...minLen) {
				if (first.charAt(i) == second.charAt(i)) {
					prefixLength++;
					
					if (prefixLength >= maxPrefixLength) {
						break;
					}
				} else {
					break;
				}
			}
		}
		
		//if (jaroDistance < 0.7) { // 0.7 is the "boost threshold" Winkler used
		//	return jaroDistance;
		//} else {
		// ...
		//}
		
		return (jaroSimilarity + prefixLength * 0.1 * (1 - jaroSimilarity));
	}
	
	// Returns the Monge-Elkan similarity between the strings, 1 is perfect match, 0 is no match
	// Uses Jaro as the inner similarity method. Useful for comparing similarities of sets, maybe full names
	public static function mongeElkan(first:String, second:String, similarityMeasure:String->String->Float, delimiter:String = " "):Float {
		if (first.length == 0 && second.length == 0) {
			return 1;
		}
		
		var fTokens = first.split(delimiter);
		var sTokens = second.split(delimiter);
		
		if (fTokens.length == 0 || sTokens.length == 0) {
			return 0;
		}
		
		var sum:Float = 0;
		for (f in fTokens) {
			var max:Float = 0;
			for (s in sTokens) {
				max = Math.max(max, similarityMeasure(first, second));
			}
			sum += max;
		}
		
		return sum / fTokens.length;
	}
	
	// Returns the Dice coefficient for the strings
	// Measure of set similarity, also good lexical association of two words
	public static function diceCoefficient(first:String, second:String):Float {
		return 0;
	}
	
	public static function jaccard(first:String, second:String):Float {
		return 0;
	}
	
	//public static function soundex
}