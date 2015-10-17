package js.d3.geo;
 import haxe.extern.EitherType;
 import haxe.extern.Rest;

/**
 * ...
 * @author Mike Almond - https://github.com/mikedotalmond
 * @author Ruben Weijers
 */

@:native("d3.geo")
extern class Geography {
	/*https://github.com/mbostock/d3/wiki/Geo*/

	// geo-paths
	@:overload(function():Dynamic->Int->Path{})
	@:overload(function():Dynamic->Path{})
	public function path():Path;

	@:overload(function():Void->LineString{}) //FIXME, not sure whether it returns the coordinates property as Array<Float> or as Array<LineString>
	public function graticule():Graticule;

	@:overload(function():Rest<Dynamic>->Polygon{})
	public function circle():Circle;

	public function area(feature:Dynamic):Float;
	public function bounds(feature:Dynamic):Array<Coordinate>;
	public function distance(a:Coordinate, b:Coordinate):Float;
	public function length(feature:Dynamic):Float;
	public function interpolate(source:Coordinate, target:Coordinate):?Float->Coordinate;

	@:overload(function():Coordinate->Coordinate{})
	public function rotation(rotate:Array<Float>):Rotation;

	// projections...
	@:overload(function(raw:Float->Float->Coordinate):Coordinate->Coordinate {})
	public function projection(raw:Float->Float->Coordinate):Projection;

	public function projectionMutator(raw:Dynamic):Dynamic;

	public function albers():Conic;
	public function albersUsa():Projection;
	public function azimuthalEqualArea():Projection;
	public function azimuthalEquidistant():Projection;
	public function conicConformal():Conic;
	public function conicEqualArea():Conic;
	public function conicEquidistant():Conic;
	public function equirectangular():Projection;
	public function gnomonic():Projection;
	public function mercator():Projection;
	public function orthographic():Projection;
	public function stereographic():Projection;
	public function transverseMercator():Projection;

	// stream transforms
	public function transform(methods:Dynamic):TransformStream;
	public function clipExtent():Dynamic;
}


/*https://github.com/mbostock/d3/wiki/Geo-Paths*/

private typedef Coordinate = Array<Float>;
private typedef PathContext = {
	public function beginPath():Void;
	public function closePath():Void;
	public function moveTo(x:Float, y:Float):Void;
	public function lineTo(x:Float, y:Float):Void;
	public function arc(x:Float, y:Float,radius:Float,startAngle:Float,endAngle:Float):Void;
};

@:native("d3.geo.path")
extern class Path {

	@:overload(function():Coordinate->Coordinate{})
	public function projection(projection:Coordinate->Coordinate):Path;

	@:overload(function():PathContext{})
	public function context(context:PathContext):Path;

	public function area(feature:Dynamic):Float;
	public function centroid(feature:Dynamic):Coordinate;
	public function bounds(feature:Dynamic):Array<Coordinate>;

	@:overload(function():Dynamic{})
	@:overload(function (radius:Dynamic):Path{})
	public function pointRadius(radius:Float):Path;
}



private typedef LineString = {type:String, coordinates:Coordinate};
private typedef Polygon = {type:String, coordinates:Array<Coordinate>};

@:native("d3.geo.graticule")
extern class Graticule {
	public function lines () : Array<LineString>;
	public function outline () : Polygon;

	@:overload(function ():Array<Coordinate> {})
	public function extent (extent:Array<Coordinate>) : Graticule;

	@:overload(function ():Array<Coordinate> {})
	public function majorExtent(extent:Array<Coordinate>) : Graticule;

	@:overload(function ():Array<Coordinate> {})
	public function minorExtent(extent:Array<Coordinate>) : Graticule;

	@:overload(function():Coordinate {})
	public function step (step:Coordinate) : Graticule;

	@:overload(function():Coordinate {})
	public function majorStep (step:Coordinate) : Graticule;

	@:overload(function():Coordinate {})
	public function minorStep (step:Coordinate) : Graticule;

	@:overload(function () : Float {})
	public function precission (precission:Float) : Graticule;
}



typedef CircleOrigin = EitherType<Coordinate, Rest<Dynamic>->Coordinate>;

@:native("d3.geo.circle")
extern class Circle {
	@:overload(function():CircleOrigin {})
	public function origin (origin:CircleOrigin) : Circle;

	@:overload(function():Float {})
	public function angle (x:Float) : Circle;

	@:overload(function () : Float {})
	public function precission (precission:Float) : Circle;
}


@:native("d3.geo.rotation")
extern class Rotation {
	public function invert(location:Coordinate):Coordinate;
}



/*https://github.com/mbostock/d3/wiki/Geo-Projections*/
@:native("d3.geo.projection")
extern class Projection {
	public function invert(point:Coordinate):Coordinate;

	@:overload(function():Coordinate {})
	public function rotate(rotation:Coordinate):Projection;

	@:overload(function():Coordinate {})
	public function center(location:Coordinate):Projection;

	@:overload(function():Coordinate {})
	public function translate(point:Coordinate):Projection;

	@:overload(function():Float {})
	public function scale(scale:Float):Projection;


	@:overload(function():Null<Float> {})
	public function clipAngle(angle:Null<Float>):Projection;

	@:overload(function():Null<Array<Coordinate>> {})
	public function clipExtent(extent:Null<Array<Coordinate>>):Projection;

	public function precission(precission:Float):Projection;

	public function stream (output:Dynamic):Dynamic;
	public var raw : Dynamic;
}


@:native("d3.geo.conic")
extern class Conic extends Projection {
	@:overload(function():Array<Float> {})
	public function parallels (parallels:Array<Float>):Conic;
}

@:native("d3.geo.albers-usa")
extern class AlbersUsa {
	public function invert(point:Coordinate):Coordinate;

	@:overload(function():Coordinate {})
	public function rotate(rotation:Coordinate):AlbersUsa;

	@:overload(function():Coordinate {})
	public function center(location:Coordinate):AlbersUsa;

	@:overload(function():Coordinate {})
	public function translate(point:Coordinate):AlbersUsa;

	@:overload(function():Float {})
	public function scale(scale:Float):AlbersUsa;

	public function precission(precission:Float):AlbersUsa;

	public function stream (output:Dynamic):Dynamic;
}


/*https://github.com/mbostock/d3/wiki/Geo-Streams*/

typedef TransformStream = {stream:Stream->Stream};

@:native("d3.geo.transform")
extern class Stream {
	public var stream : Stream;
	public function point(x:Float, y:Float):Void;
	public function sphere():Void;
  	public function lineStart():Void;
  	public function lineEnd():Void;
  	public function polygonStart():Void;
  	public function polygonEnd():Void;
}
