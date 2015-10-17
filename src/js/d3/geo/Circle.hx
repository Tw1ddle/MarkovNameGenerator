package js.d3.geo;

/**
 * ...
 * @author Mike Almond - https://github.com/mikedotalmond
 */

extern class Circle {

	@:overload(function():Array<Float>{})
	@:overload(function(values:Dynamic->Array<Float>):Circle{})
	@:overload(function(values:Void->Array<Float>):Circle{})
	public function origin(values:Array<Float>):Circle;
	
	@:overload(function():Float{})
	public function angle(value:Float):Circle;
	
	@:overload(function():Float{})
	public function precision(value:Float):Circle;
	
	public function clip(feature:Dynamic, ?index:Int):Circle;
	
}