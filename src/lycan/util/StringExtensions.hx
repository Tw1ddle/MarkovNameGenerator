package lycan.util;

using StringTools;

class StringExtensions {	
	// NOTE this will be slow
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
}