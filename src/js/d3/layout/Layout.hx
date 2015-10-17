package js.d3.layout;
 import haxe.extern.EitherType;

/**
 * ...
 * @author Mike Almond - https://github.com/mikedotalmond
 */

typedef LayoutLink = {source:Dynamic, target:Dynamic};
typedef LayoutNode = {parent:Dynamic,children:Array<LayoutNode>, depth:Int, x:Float, y:Float};
typedef LayoutChild = Dynamic;


@:native("d3.layout")
extern class Layout {
	/*https://github.com/mbostock/d3/wiki/Layouts*/

	@:overload(function(links:Array<Dynamic>):Dynamic{})

	public function bundle():Bundle;
	public function chord():Chord;
	public function cluster():Cluster;
	public function force():Force;
	public function hierarchy():Hierarchy<Hierarchy<Dynamic>>;

	@:overload(function():Array<Dynamic>->?Int->Histogram{})
	@:overload(function():Histogram{})
	public function histogram():Dynamic;

	public function pack():Pack;
	public function partition():Partition;

	@:overload(function():Array<Dynamic>->?Int->Pie{})
	@:overload(function():Pie {})
	public function pie():Dynamic;

	@:overload(function():Array<Dynamic>->?Int->Stack{})
	@:overload(function():Stack {})
	public function stack():Dynamic;

	public function tree():Tree;
	public function treemap():Treemap;
}

typedef Matrix     = Array<Array<Int>>;
typedef Comparator = Null<Dynamic->Dynamic->Int>;
typedef ChordObj   = {index:Int, subIndex:Int, startAngle:Float, endAngle:Float, value:Dynamic};
typedef ChordElm   = {source:ChordObj, target:ChordObj};
typedef GroupObj   = {index:Int, startAngle:Float, endAngle:Float, value:Dynamic};

@:native("d3.layout.chord")
extern class Chord implements ArrayAccess<Dynamic>{
	/*https://github.com/mbostock/d3/wiki/Chord-Layout*/
	@:overload(function():Matrix{})
	public function matrix(matrix:Matrix):Chord;

	@:overload(function():Float{})
	public function padding(value:Float):Chord;

	@:overload(function():Comparator{})
	public function sortGroups(comparator:Comparator):Chord;

	@:overload(function():Comparator{})
	public function sortSubgroups(comparator:Comparator):Chord;

	@:overload(function():Comparator{})
	public function sortChords(comparator:Comparator):Chord;

	public function chords():Array<ChordElm>;
	public function groups():Array<GroupObj>;
}


typedef ForceNode = {index:Int, x:Float, y:Float, px:Float, py:Float, fixed:Bool, weight:Float};
typedef ForceLinkArg = EitherType<Float, EitherType<Void->Float, EitherType<Dynamic->Float, Dynamic->Int->Float>>>;

@:native("d3.layout.force")
extern class Force implements ArrayAccess<Dynamic> {
	/*https://github.com/mbostock/d3/wiki/Force-Layout*/

	@:overload(function():Array<Float>{})
	public function size(size:Array<Float>):Force;

	@:overload(function():ForceLinkArg{})
	public function linkDistance(distance:ForceLinkArg):Force;

	@:overload(function():ForceLinkArg{})
	public function linkStrength(strength:ForceLinkArg):Force;

	@:overload(function():Float{})
	public function friction(friction:Float):Force;

	@:overload(function():ForceLinkArg {})
	public function charge(charge:ForceLinkArg):Force;

	@:overload(function():Float {})
	public function chargeDistance(chargeDistance:Float):Force;

	@:overload(function():Float{})
	public function theta(theta:Float):Force;

	@:overload(function():Float{})
	public function gravity(gravity:Float):Force;

	// using ForceNode type is not required here, but migt be used as initial value
	@:overload(function<T>():Array<T>{})
	public function nodes<T>(nodes:Array<T>):Force;

	@:overload(function():Array<LayoutLink>{})
	public function links(nodes:Array<LayoutLink>):Force;

	@:overload(function():Float{})
	public function alpha(value:Float):Force;

	public function on(type:String, listener:Dynamic):Force;

	public function drag():Void;
	public function start():Void;
	public function stop():Void;
	public function resume():Void;
	public function tick():Void;
}


typedef AngleArg = ForceLinkArg;

@:native("d3.layout.pie")
extern class Pie implements ArrayAccess<Dynamic> {

	/*https://github.com/mbostock/d3/wiki/Pie-Layout*/
	@:overload(function():Dynamic->?Int->Dynamic{})
	public function value(value:Dynamic->?Int->Dynamic):Pie;

	@:overload(function():Comparator{})
	public function sort(comparator:Comparator):Pie;

	@:overload(function():AngleArg{})
	public function startAngle(value:AngleArg):Pie;

	@:overload(function():AngleArg{})
	public function endAngle(value:AngleArg):Pie;

	@:overload(function():AngleArg{})
	public function padAngle(value:AngleArg):Pie;

}

typedef StackOffset = EitherType<String, Array<Array<Float>>->Array<Float>>;
typedef StackAccessor = EitherType<Dynamic->Float, Dynamic->Int->Float>;

@:native("d3.layout.stack")
extern class Stack implements ArrayAccess<Dynamic> {
	/*https://github.com/mbostock/d3/wiki/Stack-Layout*/

	@:overload(function():Dynamic->Dynamic{})
	public function values(accessor:Dynamic->Dynamic):Stack;

	@:overload(function():StackOffset{})
	public function offset(offset:StackOffset):Stack;

	@:overload(function():StackOffset{})
	public function order(order:StackOffset):Stack;

	@:overload(function():StackAccessor{})
	public function x(accessor:StackAccessor):Stack;

	@:overload(function():StackAccessor{})
	public function y(accessor:StackAccessor):Stack;

	@:overload(function():Dynamic->Float->Float->Void{})
	public function out(setter:Dynamic->Float->Float->Void):Stack;
}


typedef Range = Array<Float>;
typedef Tresholds = Range;
typedef HistogramRange = EitherType<Range, EitherType<Array<Dynamic>->Range, Array<Dynamic>->Int->Range>>;
typedef HistogramBins  = EitherType<Float, EitherType<Tresholds, Range->Tresholds>>;
typedef HistogramBin   = {x:Float, y:Float, dx:Float};

@:native("d3.layout.histogram")
extern class Histogram implements ArrayAccess<Dynamic>{
	/*https://github.com/mbostock/d3/wiki/Histogram-Layout*/

	@:overload(function():Dynamic->Dynamic{})
	public function value(accessor:Dynamic->Dynamic):Histogram;

	@:overload(function():HistogramRange{})
	public function range(range:HistogramRange):Histogram;

	@:overload(function():HistogramBins{})
	public function bins(bins:HistogramBins):Array<EitherType<HistogramBin, Array<Float>>>; // Dynamic is an array with keys and 3 properties: dx,x,y

	@:overload(function():Bool{})
	public function frequency(frequency:Bool):Histogram;

}

@:native("d3.layout.bundle")
extern class Bundle {
	/*https://github.com/mbostock/d3/wiki/Bundle-Layout*/
}

@:native("d3.layout.hierarchy")
extern class Hierarchy<T> implements ArrayAccess<Dynamic> {
	/*https://github.com/mbostock/d3/wiki/Hierarchy-Layout*/

	public function links(nodes:Array<Dynamic>):Array<LayoutLink>;

	@:overload(function():Dynamic->Array<LayoutChild> {})
	public function children(accessor:Dynamic->Array<LayoutChild>):T;

	@:overload(function():Dynamic{})
	public function sort(comparator:Dynamic->Dynamic->Int):T;

	@:overload(function():Array<Float>{})
	public function size(size:Array<Float>):T;

	@:overload(function():Dynamic->Float{})
	public function value(value:Dynamic->Dynamic):T;

	public function revalue(root:Dynamic):T;
}

@:native("d3.layout.cluster")
extern class Cluster extends Hierarchy<Cluster> {
	/*https://github.com/mbostock/d3/wiki/Cluster-Layout*/
	@:overload(function():LayoutNode->LayoutNode->Float{})
	public function separation(separation:LayoutNode->LayoutNode->Float):Cluster;

	public function nodes(root:Dynamic):Array<LayoutNode>;
}

typedef PackNode = {> LayoutNode, r:Float};

@:native("d3.layout.pack")
extern class Pack extends Hierarchy<Pack> {
	/*https://github.com/mbostock/d3/wiki/Pack-Layout*/
	public function nodes(root:Dynamic):Array<PackNode>;

	@:overload(function():EitherType<Null<Float>,Dynamic->Float> {})
	public function radius(radius:EitherType<Null<Float>,Dynamic->Float>):Pack;

	@:overload(function():Float {})
	public function padding(padding:Float):Pack;
}

typedef PartitionNode = {> LayoutNode, dx:Float, dy:Float};

@:native("d3.layout.partition")
extern class Partition extends Hierarchy<Partition> {
	/*https://github.com/mbostock/d3/wiki/Partition-Layout*/
	public function nodes(root:Dynamic):Array<PartitionNode>;
}

@:native("d3.layout.tree")
extern class Tree extends Hierarchy<Tree> {
	@:overload(function():LayoutNode->LayoutNode->Float{})
	public function separation(separation:LayoutNode->LayoutNode->Float):Tree;

	public function nodes(root:Dynamic):Array<LayoutNode>;

	@:overload(function():Array<Float> {})
	public function nodeSize(nodeSize:Array<Float>):Tree;
}

typedef LayoutPadding = EitherType<Null<Float>, Array<Float>>;
typedef LayoutPaddingParam = EitherType<LayoutPadding, PartitionNode->LayoutPadding>;

@:native("d3.layout.treemap")
extern class Treemap extends Hierarchy<Treemap> {
	/*https://github.com/mbostock/d3/wiki/Treemap-Layout*/

	@:overload(function():LayoutPaddingParam{})
	public function padding(padding:LayoutPaddingParam):Treemap;

	@:overload(function():Bool{})
	public function round(round:Bool):Treemap;

	@:overload(function():Bool{})
	public function sticky(sticky:Bool):Treemap;

	@:overload(function():String{})
	public function mode(mode:String):Treemap;

	@:overload(function():Float{})
	public function ratio(mode:Float):Treemap;

	public function nodes(root:Dynamic):Array<PartitionNode>;
}
