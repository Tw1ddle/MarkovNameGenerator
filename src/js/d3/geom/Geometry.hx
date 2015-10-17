package js.d3.geom;

/**
 * limited api docs here....
 * @author Mike Almond - https://github.com/mikedotalmond
 * @author Ruben Weijers
 */

private typedef Point    = {x:Float, y:Float};
private typedef Node     = {> Point, nodes:Array<Node>, leaf:Bool, point:Point};
private typedef RootNode = {> Node, add:Point->Void, visit:Dynamic->Void, find:Point->Point};

@:native("d3.geom")
extern class Geometry {

	@:overload(function(data:Array<Dynamic>):Array<Polygon>{})
	public function voronoi():Voronoi;

	@:overload(function(points:Array<Point>):RootNode{})
	public function quadtree():Quadtree;

	public function polygon(vertices:Array<Dynamic>):Array<Polygon>;

	@:overload(function(vertices:Array<Dynamic>):Hull{})
	public function hull():Hull;
}


@:native("d3.geom.polygon")
extern class Polygon {
	public function area():Dynamic;
	public function centroid():Dynamic;
	public function clip(subject:Polygon):Dynamic;
}


@:native("d3.geom.voronoi")
extern class Voronoi {
	@:overload(function():Dynamic->Float {})
	public function x(x:Dynamic->Float):Voronoi;

	@:overload(function():Dynamic->Float {})
	public function y(y:Dynamic->Float):Voronoi;

	@:overload(function():Null<Array<Array<Float>>> {})
	public function extent(extent:Null<Array<Array<Float>>>):Voronoi;

	public function links (data:Array<Dynamic>):Array<{source:Dynamic, target:Dynamic}>;
	public function triangles(data:Array<Dynamic>):Array<Array<Dynamic>>;
}


@:native("d3.geom.quadtree")
extern class Quadtree {
	@:overload(function():Dynamic->Float {})
	public function x(x:Dynamic->Float):Quadtree;

	@:overload(function():Dynamic->Float {})
	public function y(y:Dynamic->Float):Quadtree;

	@:overload(function():Null<Array<Array<Float>>> {})
	public function extent(extent:Null<Array<Array<Float>>>):Quadtree;
}


@:native("d3.geom.hull")
extern class Hull {
	@:overload(function():Dynamic->Float {})
	public function x(x:Dynamic->Float):Hull;

	@:overload(function():Dynamic->Float {})
	public function y(y:Dynamic->Float):Hull;
}
