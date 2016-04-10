package;

import haxe.macro.Context;
import haxe.macro.Expr;

// Code completion for HTML files, based on the macro by Nicolas Cannasse: http://code.haxe.org/category/macros/completion-from-url.html
class CodeCompletion {
	public static function buildUrl(url:String) {
		var h = haxe.Http.requestUrl(url);
		return build(h);
	}
	
	public static function buildLocalFile(path:String) {
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