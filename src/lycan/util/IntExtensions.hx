package lycan.util;

// Extension methods for ints
class IntExtensions {	
	inline public static function abs(v:Int):Int {
		if (v < 0) {
			return -v;
		}
		return v;
	}
	
	inline public static function clamp(v:Int, min:Int, max:Int):Int {
		if (v < min) {
			return min;
		}
		if (v > max) {
			return max;
		}
		return v;
	}
	
	inline public static function clampSym(v:Int, bound:Int):Int {
		return clamp(v, bound, bound);
	}
	
	inline public static function even(v:Int):Bool {
		return v % 2 == 0;
	}
	
	inline public static function odd(v:Int):Bool {
		return v % 2 != 0;
	}
	
	inline public static function max(a:Int, b:Int):Int {
		if (a > b) {
			return a;
		}
		return b;
	}
	
	inline public static function min(a:Int, b:Int):Int {
		if (a < b) {
			return a;
		}
		return b;
	}
	
	inline public static function toBool(v:Int):Bool {
		return v != 0;
	}
	
	inline public static function isPow2(v:Int):Bool {
		return (v > 0) && ((v & (v - 1)) == 0); 
	}
	
	inline public static function sign(x:Float):Int {
		return x > 0 ? 1 : x < 0 ? -1 : 0;
	}
}