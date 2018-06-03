import haxe.macro.Context;
import haxe.macro.Expr.Access.APublic;
import haxe.macro.Expr.Access.AStatic;
import haxe.macro.Expr.Field;
import haxe.macro.Expr.FieldType.FVar;
import markov.util.FileReader;
import sys.FileSystem;

using StringTools;

/**
 * Build macro for reading training data at compile time
 */
@:access(markov.util.FileReader)
class TrainingDataBuilder {
	/**
	 * Reads all the files in a directory, and builds a type full of static arrays of training data populated by the files in that directory at compile time.
	 * @param directoryPath   File path to the directory to be scanned.
	 * @return Array of string array fields containing the contents of the files in the directory.
	 */
	public static function build(directoryPath:String):Array<Field> {
		var fields = Context.getBuildFields();
		
		var splitter = new EReg("[\r\n]", "g");
		
		try {
			var files = FileSystem.readDirectory(directoryPath);
			for (i in 0...files.length) {
				var data = FileReader.loadFileAsString(directoryPath + "/" + files[i]);
				
				var file = files[i];
				
				// Take a filename e.g. cooking_utensils.txt, remove the extension and underscores and capitalize first letter of each word i.e. Cooking Utensils
				var nameParts = file.split(".")[0].split("_");
				var name = "";
				for (i in 0...nameParts.length) {
					var part = nameParts[i].charAt(0).toUpperCase() + nameParts[i].substring(1);
					name += part;
					if (i != nameParts.length - 1) {
						name += " ";
					}
				}
				
				var words = splitter.split(data);

				var field = {
					name: name,
					doc: file,
					meta: [],
					access: [APublic, AStatic],
					kind: FVar(macro:Array<String>, macro $v{words}),
					pos: Context.currentPos()
				};
				
				fields.push(field);
			}
		} catch (e:Dynamic) {
			Context.error('Failed to find directory $directoryPath: $e', Context.currentPos());
		}
		
		return fields;
	}
}