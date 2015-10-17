package js.d3.behavior;
 import js.d3.selection.Selection;

/**
 * ...
 * @author Mike Almond - https://github.com/mikedotalmond
 */

@:native("d3.behavior")
extern class Behaviors {
	/*https://github.com/mbostock/d3/wiki/Behaviors*/
	public function drag():Drag;

    @:overload(function (selection:Selection):Zoom {})
	public function zoom():Zoom;

}

@:native("d3.behaviour.drag")
extern class Drag {
    /*https://github.com/mbostock/d3/wiki/Drag-Behavior*/
    public function on(type:String, listener:Dynamic):Drag;

    @:overload(function ():Null<Dynamic->?Int->Dynamic> {})
    public function origin(origin:Null<Dynamic->?Int->Dynamic>):Drag;
}

@:native("d3.behaviour.zoom")
extern class Zoom {
	/*https://github.com/mbostock/d3/wiki/Zoom-Behavior*/
    @:overload(function():Array<Float> {})
    public function translate(translate:Array<Float>):Zoom;

    @:overload(function():Float {})
    public function scale(scale:Float):Zoom;

    @:overload(function():Array<Float> {})
    public function scaleExtent(scaleExtent:Array<Float>):Zoom;

    @:overload(function():Array<Float> {})
    public function center(center:Array<Float>):Zoom;

    @:overload(function():Array<Float> {})
    public function size(size:Array<Float>):Zoom;

    @:overload(function():Dynamic {})
    public function x(x:Dynamic):Zoom;

    @:overload(function():Dynamic {})
    public function y(y:Dynamic):Zoom;

	public function on(type:String, listener:Dynamic):Zoom;
}
