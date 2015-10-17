package js.d3.svg;
 import js.d3.format.Format;
 import js.d3.selection.Selection;
 import js.d3.transition.Transition;
 import haxe.extern.EitherType;

/**
 * ...
 * @author Mike Almond - https://github.com/mikedotalmond
 */


typedef PointArr       = Array<Float>;
typedef PointObj       = {x:Float,y:Float};
typedef SvgInterpolate = EitherType<String,Array<PointArr>->String>;
typedef SvgCoordinate  = EitherType<Float, EitherType<Dynamic->Float, Dynamic->Int->Float>>;
typedef SvgPointArg    = EitherType<PointArr,PointArr->Float>;
typedef SvgSelection   = EitherType<Selection,Transition>;


@:native("d3.svg")
extern class SVG {

	@:overload(function():Dynamic->?Int->Line{})
	public function line(?settings:Dynamic):Line;

	@:overload(function():Dynamic->?Int->Area{})
	public function area(?settings:Dynamic):Area;

	@:overload(function():Dynamic->?Int->Arc{})
	public function arc(?settings:Dynamic):Arc;

	@:overload(function():Dynamic->?Int->Symbol{})
	public function symbol():Symbol;

	public var symbolTypes : Array<String>;

	@:overload(function():Dynamic->?Int->Chord{})
	public function chord():Chord;

	@:overload(function():Dynamic->?Int->Diagonal{})
	public function diagonal():Diagonal;

	@:overload(function():SvgSelection->Axis{})
	public function axis():Axis;

	@:overload(function():SvgSelection->Brush{})
	public function brush():Brush;
}

@:native("d3.svg.line")
extern class Line {
	@:overload(function():SvgCoordinate{})
	public function x(x:SvgCoordinate):Line;

	@:overload(function():SvgCoordinate{})
	public function y(y:SvgCoordinate):Line;

	@:overload(function():SvgInterpolate {})
	public function interpolate(interpolate:SvgInterpolate):Line;

	@:overload(function():Float {})
	public function tension(tension:Float):Line;

	@:overload(function():Dynamic->Bool{})
	public function defined(defined:PointArr->Bool):Line;

	public function radial():Line;

	@:overload(function():SvgPointArg{})
	public function radius(radius:SvgPointArg):Line;

	@:overload(function():SvgPointArg{})
	public function angle(angle:SvgPointArg):Line;
}

@:native("d3.svg.area")
extern class Area {

	@:overload(function():SvgCoordinate{})
	public function x(x:SvgCoordinate):Area;

	@:overload(function():SvgCoordinate{})
	public function x0(x:SvgCoordinate):Area;

	@:overload(function():SvgCoordinate{})
	public function x1(x:SvgCoordinate):Area;

	@:overload(function():SvgCoordinate{})
	public function y(y:SvgCoordinate):Area;

	@:overload(function():SvgCoordinate{})
	public function y0(y:SvgCoordinate):Area;

	@:overload(function():SvgCoordinate{})
	public function y1(y:SvgCoordinate):Area;

	@:overload(function():SvgInterpolate {})
	public function interpolate(interpolate:SvgInterpolate):Area;

	@:overload(function():Float {})
	public function tension(?tension:Float):Area;

	@:overload(function():Dynamic->Bool{})
	public function defined(defined:PointArr->Bool):Area;

	public function radial():Area;

	@:overload(function():SvgPointArg{})
	public function radius(radius:SvgPointArg):Line;

	@:overload(function():SvgPointArg{})
	public function innerRadius(radius:SvgPointArg):Line;

	@:overload(function():SvgPointArg{})
	public function angle(angle:SvgPointArg):Line;

	@:overload(function():SvgPointArg{})
	public function startAngle(angle:SvgPointArg):Line;

	@:overload(function():SvgPointArg{})
	public function endAngle(angle:SvgPointArg):Line;
}

typedef SvgArcRadius = EitherType<Float,Float->Float->Float>;

@:native("d3.svg.arc")
extern class Arc {

	@:overload(function():SvgCoordinate{})
	public function innerRadius(?radius:SvgCoordinate):Arc;

	@:overload(function():SvgCoordinate{})
	public function outerRadius(?radius:SvgCoordinate):Arc;

	@:overload(function():SvgArcRadius{})
	public function cornerRadius(?radius:SvgArcRadius):Arc;

	@:overload(function():SvgArcRadius{})
	public function padRadius(?radius:SvgArcRadius):Arc;

	@:overload(function():SvgCoordinate{})
	public function startAngle(angle:SvgCoordinate):Arc;

	@:overload(function():SvgCoordinate{})
	public function endAngle(angle:SvgCoordinate):Arc;

	@:overload(function():SvgCoordinate{})
	public function padAngle(angle:SvgCoordinate):Arc;

	public function centroid(datum:Dynamic, ?index:Int):Dynamic;
}


typedef SvgTypeArg = EitherType<String,Dynamic->String>;

@:native("d3.svg.symbol")
extern class Symbol {
	@:overload(function():SvgTypeArg{})
	public function type(type:SvgTypeArg):Symbol;

	@:overload(function():SvgCoordinate{})
	public function size(size:SvgCoordinate):Symbol;
}


typedef SvgSourceArg = EitherType<Dynamic,Dynamic->Dynamic>;

@:native("d3.svg.chord")
extern class Chord {
	@:overload(function():SvgSourceArg{})
	public function source(source:SvgSourceArg):Chord;

	@:overload(function():SvgSourceArg{})
	public function target(target:SvgSourceArg):Chord;

	@:overload(function():SvgCoordinate{})
	public function radius(radius:SvgCoordinate):Chord;

	@:overload(function():SvgCoordinate{})
	public function startAngle(angle:SvgCoordinate):Chord;

	@:overload(function():SvgCoordinate{})
	public function endAngle(angle:SvgCoordinate):Chord;
}


typedef SvgSourceArg2 = EitherType<PointObj,Dynamic->PointObj>;
typedef SvgProjectionArg = PointObj->PointArr;

@:native("d3.svg.diagonal")
extern class Diagonal {

	@:overload(function():SvgSourceArg2{})
	public function source(source:SvgSourceArg2):Diagonal;

	@:overload(function():SvgSourceArg2{})
	public function target(target:SvgSourceArg2):Diagonal;

	@:overload(function():SvgProjectionArg{})
	public function projection(projection:SvgProjectionArg):Diagonal;

	public function radial():Diagonal;
}

@:native("d3.svg.axis")
extern class Axis {
	@:overload(function():Dynamic{})
	public function scale(s:Dynamic):Axis;

	@:overload(function():String{})
	public function orient(value:String):Axis;

	@:overload(function():Dynamic{})
	@:overload(function(ticks:Int):Axis{})
	public function ticks(fb:Dynamic, i:Int):Axis;

	@:overload(function():Null<Array<Dynamic>>{})
	public function tickValues(?values:Array<Dynamic>):Axis;

	@:overload(function():Float{})
	public function tickSize(inner:Float, ?outer:Float):Axis;

	@:overload(function():Float{})
	public function innerTickSize(inner:Float):Axis;

	@:overload(function():Float{})
	public function outerTickSize(outer:Float):Axis;

	@:overload(function():Float{})
	public function tickPadding(padding:Float):Axis;

	@:overload(function():Format{})
	public function tickFormat(format:Format):Axis;
}

typedef SvgExtent = EitherType<PointArr, Array<PointArr>>;
typedef SvgClamp = EitherType<PointArr, Bool>;

@:native("d3.svg.brush")
extern class Brush {

	@:overload(function():Float{})
	public function x(scale:Float):Brush;

	@:overload(function():Float{})
	public function y(scale:Float):Brush;

	@:overload(function():SvgExtent{})
	public function extent(values:SvgExtent):Brush;

	@:overload(function():SvgClamp{})
	public function clamp(clamp:SvgClamp):Brush;

	public function clear():Brush;
	public function empty():Bool;

	public function on(type:String, ?cb:Dynamic):Brush;

}
