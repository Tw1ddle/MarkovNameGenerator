package markov.util;

import haxe.macro.Context;

#if macro
import sys.FileSystem;
import sys.io.File;
#end

using StringTools;
using Lambda;

/**
 * Helper macros for embedding text files into code at compile time.
 */
class FileReader {
    /**
     * Macro that reads a file into a string at compile time.
     * @param   filePath    File path to the asset to be made into a string.
     * @return  String expression of the stringified file.
     */
    macro public static function readFileAsString(filePath:String):ExprOf<String> {
        var content = loadFileAsString(filePath);
        return toExpr(content);
    }

    /**
     * Reads a file into an array of strings at compile time.
     * @param   filePath    File path to the asset to be made into a string array.
     * @param   splitter    Regex for splitting deciding how to split the string. Defaults to newline splitting if the splitter is null.
     * @return  String array expression of the split file.
     */
    macro public static function readFileAsStringArray(filePath:String, ?splitter:EReg):ExprOf<Array<String>> {
        var content = loadFileAsStringArray(filePath, splitter);
        return toExpr(content);
    }

    #if macro
    static function toExpr(v:Dynamic) {
        return Context.makeExpr(v, Context.currentPos());
    }

    static private function loadFileAsString(filePath:String) {
        try {
            var p = Context.resolvePath(filePath);
            Context.registerModuleDependency(Context.getLocalModule(),p);
            return sys.io.File.getContent(p);
        }
        catch(e:Dynamic) {
            return haxe.macro.Context.error('Failed to load file $filePath: $e', Context.currentPos());
        }
    }

    static private function loadFileAsStringArray(filePath:String, ?splitter:EReg) {
        if (splitter == null) {
            splitter = new EReg("[\r\n]", "g");
        }

        try {
            var p = Context.resolvePath(filePath);
            Context.registerModuleDependency(Context.getLocalModule(), p);
            var arr = splitter.split(sys.io.File.getContent(p));
            return arr;
        }
        catch(e:Dynamic) {
            return haxe.macro.Context.error('Failed to load file $filePath: $e', Context.currentPos());
        }
    }
    #end
}