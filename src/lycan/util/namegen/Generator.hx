package lycan.util.namegen;

import lycan.util.ArraySet;

using lycan.util.StringExtensions;

// Procedural generation of names with high-order Markov chains
// Uses Katz's back-off model - chooses the next character based on conditional probability given the last n-characters (where model order = n)
class Generator {
	public var order(default, null):Int;
	public var smoothing(default, null):Float;
	private var models:Array<Model>;
	
	public function new(data:Array<String>, order:Int, smoothing:Float) {
		Sure.sure(data != null);
		Sure.sure(order >= 1);
		
		this.order = order;
		this.smoothing = smoothing;
		
		models = new Array<Model>();
		
		var letters = ArraySet.create();
		
		for (d in data) {
			for (i in 0...d.length) {
				letters.add(d.charAt(i));
			}
		}
		
		letters.sort(function(a:String, b:String) {
			if (a < b) {
				return -1;
			}
			if (a > b) {
				return 1;
			}
			return 0;
		});
		
		var domain:Array<String> = letters.toArray();
		domain.insert(0, "#");
		
		for (i in 0...order) {
			models.push(new Model(data.copy(), order - i, smoothing, domain));
		}
	}
	
	public function generate():String {
		var name = "#".repeat(order);
		var letter = getLetter(name);
		while (letter != "#") {
			if(letter != null) {
				name += letter;
			}
			letter = getLetter(name);
		}
		return name;
	}
	
	private function getLetter(name:String):String {
		var letter:String = null;
		var context:String = name.substring(name.length - order, name.length);
		for (model in models) {
			letter = model.generate(context);
			//trace("made " + letter + " for context " + context + " where name is " + name);
			if (letter == null) {
				context = context.substring(1);
			} else {
				break;
			}
		}
		return letter;
	}
}