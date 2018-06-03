package;

import haxe.macro.Context;
import haxe.macro.Expr;

/**
 * Code completion helper macros that gather ids from HTML files for autocompletion when working with such files in Haxe.
 * These are based on the macro by Nicolas Cannasse: http://code.haxe.org/category/macros/completion-from-url.html
 */
class CodeCompletion {
    /**
     * Scrapes the element ids from the HTML file at the supplied URL.
     * @param   url The HTTP URL to the HTML file.
     * @return  An array of fields containing the element ids from the HTML file.
     */
    public static function buildUrl(url:String):Array<Field> {
        var h = haxe.Http.requestUrl(url);
        return build(h);
    }

    /**
     * Scrapes the element ids from the HTML file at the local file path.
     * @param   path    The local file path to the HTML file.
     * @return  An array of fields containing the element ids from the HTML file.
     */
    public static function buildLocalFile(path:String):Array<Field> {
        try {
            var p = Context.resolvePath(path);
            Context.registerModuleDependency(Context.getLocalModule(), p);
            return build(sys.io.File.getContent(p));
        }
        catch(e:Dynamic) {
            return haxe.macro.Context.error('Failed to load file $path: $e', Context.currentPos());
        }
    }

    private static function build(s:String):Array<Field> {
        var r = ~/id=["']([A-Za-z0-9]+)["']/;
        var ids = [];

        while (r.match(s)) {
            var id = r.matched(1);
            ids.remove(id);
            ids.push(id);
            s = r.matchedRight();
        }

        var fields = Context.getBuildFields();

        for(id in ids) {
            var gid:Field = {
                name : id,
                pos : Context.currentPos(),
                kind : FVar(macro:String, macro $v{id}),
                access : [AStatic, AInline, APublic],
            };
            fields.push(gid);
        }

        return fields;
    }
}