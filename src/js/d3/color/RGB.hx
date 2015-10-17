package js.d3.color;

/**
 * ...
 * @author Mike Almond - https://github.com/mikedotalmond
 */

@:native("d3.rgb")
extern class RGB extends Color {
	public static function brighter(?k:Float):RGB;
	public static function darker(?k:Float):RGB;
	public static function hsl():HSL;
}