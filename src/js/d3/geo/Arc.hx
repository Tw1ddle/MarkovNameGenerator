package js.d3.geo;

/**
 * ...
 * @author Mike Almond - https://github.com/mikedotalmond
 */

extern class Arc {

	@:overload(function():Float{})
	public function distance(values:Dynamic):Float;
	
	@:overload(function():Dynamic{})
	public function source(source:Dynamic):Arc;
	
	@:overload(function():Dynamic{})
	public function target():Arc;
	
	@:overload(function():Float{})
	public function precision(value:Float):Arc;
}