package markov.util;

import haxe.Utf8;

using StringTools;

/**
 * Extension methods for strings.
 */
class StringExtensions {
	/**
	 * Creates a reversed copy of the given string.
	 * @param	s	The string to copy.
	 * @return	A reversed copy of the given string.
	 */
	public static inline function reverse(s:String):String {
		Sure.sure(s != null);
		var arr:Array<String> = s.split("");
		arr.reverse();
		return arr.join("");
	}
	
	/**
	 * Repeats the given string the specified number of times.
	 * For example repeat("foo", 3) => "foofoofoo".
	 * @param	s	The string to repeat.
	 * @param	times	The number of times to repeat the string.
	 * @return	The repeated string.
	 */
	public static inline function repeat(s:String, times:Int):String {
		Sure.sure(s != null);
		Sure.sure(times >= 1);
		var output:String = "";
		for (i in 0...times) {
			output += s;
		}
		return output;
	}
	
	/**
	 * Searches a string for a substring.
	 * @param	s	The string to search.
	 * @param	substr	The substring to check for.
	 * @return	True if the string contains the substring, false if not.
	 */
	public static inline function contains(s:String, substr:String):Bool {
		Sure.sure(s != null);
		Sure.sure(substr != null);
		
		#if php
		return test == "" || s.indexOf(substr) >= 0;
		#else
		return s.indexOf(substr) >= 0;
		#end
	}
	
	/**
	 * Creates a capitalized version of a string.
	 * @param	s	The string to capitalize.
	 * @return	A capitalized copy of the string.
	 */
	public static inline function capitalize(s:String):String {
		Sure.sure(s != null);
		return Utf8.sub(s, 0, 1).toUpperCase() + Utf8.sub(s, 1, Utf8.length(s) - 1);
	}
}