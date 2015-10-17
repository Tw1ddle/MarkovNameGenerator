package lycan.util.namegen;

import lycan.util.namegen.Names.Name;

using StringTools;
using lycan.util.StringExtensions;

class NameGenerator extends Generator {	
	public function new(data:Array<Name>, order:Int, smoothing:Float) {
		var names = new Array<String>();
		for (name in data) {
			names.push(name.name.toLowerCase());
		}
		super(names, order, smoothing);
	}
	
	// NOTE this can fail to generate a name within the constraints, if it fails it will return a generated name
	public function generateName(minLength:Int, maxLength:Int, includes:String, excludes:String, maxAttempts:Int = 100):String {
		var name = "";
		var attempts:Int = 0;
		while (attempts < maxAttempts) {
			name = generate();
			name = name.replace("#", "");
			if (name.length >= minLength && name.length <= maxLength && name.contains(includes) && name.contains(excludes)) {
				return name;
			}
			attempts++;
		}
		
		return name;
	}
	
	public function generateNames(n:Int, minLength:Int, maxLength:Int, includes:String, excludes:String, maxAttempts:Int = 100):Array<String> {
		var names = new Array<String>();
		for (i in 0...n) {
			names.push(generateName(minLength, maxLength, includes, excludes, maxAttempts));
		}
		return names;
	}
}