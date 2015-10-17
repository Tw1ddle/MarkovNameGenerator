package js.d3.ns;

/**
 * ...
 * @author Mike Almond - https://github.com/mikedotalmond
 */

@:native("d3.ns")
extern class Namespaces {
	public static var prefix:Dynamic;
	public static function qualify(name:String):Dynamic;
}