package markov.util;

import haxe.Utf8;

using StringTools;

/**
 * Extension methods for strings.
 */
class StringExtensions {
    /**
     * Creates a reversed copy of the given string.
     * @param   str The string to copy.
     * @return  A reversed copy of the given string.
     */
    public static inline function reverse(str:String):String {
        Sure.sure(str != null);
        var arr:Array<String> = str.split("");
        arr.reverse();
        return arr.join("");
    }

    /**
     * Repeats the given string the specified number of times i.e. repeat("foo", 3) => "foofoofoo".
     * @param   str The string to repeat.
     * @param   times   The number of times to repeat the string.
     * @return  The repeated string.
     */
    public static inline function repeat(str:String, times:Int):String {
        Sure.sure(str != null);
        Sure.sure(times >= 1);
        var output:String = "";
        for (i in 0...times) {
            output += str;
        }
        return output;
    }

    /**
     * Searches a string for a substring.
     * @param   str The string to search.
     * @param   substr  The substring to check for.
     * @return  True if the string contains the substring, false if not.
     */
    public static inline function contains(str:String, substr:String):Bool {
        Sure.sure(str != null);
        Sure.sure(substr != null);

        #if php
        return test == "" || str.indexOf(substr) >= 0;
        #else
        return str.indexOf(substr) >= 0;
        #end
    }

    /**
     * Creates a capitalized version of a string.
     * @param   str The string to capitalize.
     * @return  A capitalized copy of the string.
     */
    public static inline function capitalize(str:String):String {
        Sure.sure(str != null);
        return Utf8.sub(str, 0, 1).toUpperCase() + Utf8.sub(str, 1, Utf8.length(str) - 1);
    }
}