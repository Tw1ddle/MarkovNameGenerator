package markov.util;

import haxe.Utf8;

using StringTools;

// Extension methods for Strings
class StringExtensions {
	public static inline function reverse(s:String):String {
		Sure.sure(s != null);
		var arr:Array<String> = s.split("");
		arr.reverse();
		return arr.join("");
	}
	
	public static inline function repeat(s:String, times:Int):String {
		Sure.sure(s != null);
		Sure.sure(times >= 1);
		var output:String = "";
		for (i in 0...times) {
			output += s;
		}
		return output;
	}
	
	public static inline function contains(s:String, substr:String):Bool {
		#if php
		return test == "" || s.indexOf(substr) >= 0;
		#else
		return s.indexOf(substr) >= 0;
		#end
	}
	
	public static inline function capitalize(s:String) {
		return Utf8.sub(s, 0, 1).toUpperCase() + Utf8.sub(s, 1, Utf8.length(s) - 1);
	}
}