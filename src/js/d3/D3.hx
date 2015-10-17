package js.d3;

import js.d3.arrays.Map;
import js.d3.arrays.Set;
import js.d3.arrays.Nest;
import js.d3.behavior.Behaviors;
import js.d3.color.HCL;
import js.d3.color.HSL;
import js.d3.color.LAB;
import js.d3.color.RGB;
import js.d3.dsv.Dsv;
import js.d3.event.Dispatch;
import js.d3.format.Format;
import js.d3.geo.Geography;
import js.d3.geom.Geometry;
import js.d3.layout.Layout;
import js.d3.locale.Locale;
import js.d3.math.Random;
import js.d3.math.Transform;
import js.d3.scale.Scale;
import js.d3.selection.Selection;
import js.d3.svg.SVG;
import js.d3.time.Time;
import js.d3.transition.Transition;
import js.d3.xhr.XHR;
import js.html.Element;
import js.html.Event;
import js.html.TouchList;
import haxe.extern.EitherType;
import haxe.extern.Rest;


@:native("d3")
extern class D3
{

	/*https://github.com/mbostock/d3/wiki/Selections*/
	@:overload(function(selector:Element):Selection{})
	public static function select(selector:String):Selection;

	@:overload(function(selector:Array<Element>):Selection{})
	public static function selectAll(selector:String):Selection;

	/*Returns the root selection, equivalent to d3.select(document.documentElement)*/
	public static function selection():Selection;

	/** Stores the current event, if any.
	 * This global is during an event listener callback registered with the on operator.
	 * The current event is reset after the listener is notified in a finally block.
	 * This allows the listener function to have the same form as other operator functions, being passed the current datum d and index i.
	 */
	public static var event:Event;


	/**
	 * Returns the x and y coordinates of the current d3.event, relative to the specified container.
	 * The container may be an HTML or SVG container element, such as an svg:g or svg:svg.
	 * The coordinates are returned as a two-element array [x, y].
	 */
	public static function mouse(container:Element):Array<Int>;


	/**
	 * Returns the x and y coordinates of each touch associated with the current d3.event, based on the touches attribute, relative to the specified container.
	 * The container may be an HTML or SVG container element, such as an svg:g or svg:svg.
	 * The coordinates are returned as an array of two-element arrays [ [x1, y1], [x2, y2], … ].
	 */
	public static function touches(container:Element, ?touches:TouchList):Array<Array<Int>>;

	@:overload(function(container:Element, identifier:String):Array<Array<Int>>{})
	public static function touch(container:Element, touches:TouchList, identifier:String):Array<Array<Int>>;


	public static var scale		:Scale;
	public static var time		:Time;
	public static var svg		:SVG;
	public static var random	:Random;
	public static var layout	:Layout;
	public static var geo		:Geography;
	public static var geom		:Geometry;
	public static var behavior	:Behaviors;


	public static function ease(name:String, r:Rest<Dynamic>):Float->Float;


	@:overload(function(a:Array<Dynamic>, b:Array<Dynamic>):Array<Dynamic>->Array<Dynamic>{})
	@:overload(function(a:String, b:String):Float->Float{})
	@:overload(function(a:Float, b:Float):Float->Float{})
	@:overload(function(a:Dynamic, b:Dynamic):Dynamic->Dynamic{})
	public static function interpolate(a:Dynamic, b:Dynamic):Float->String;

	public static function interpolateNumber(a:Float, b:Float):Float->String;
	public static function interpolateRound(a:Float, b:Float):Float->String;
	public static function interpolateString(a:String, b:String):Float->String;
	public static function interpolateRgb(a:Dynamic, b:Dynamic):Float->String;
	public static function interpolateHsl(a:Dynamic, b:Dynamic):Float->String;
	public static function interpolateLab(a:Dynamic, b:Dynamic):Float->String;
	public static function interpolateHcl(a:Dynamic, b:Dynamic):Float->String;
	public static function interpolateArray(a:Array<Dynamic>, b:Array<Dynamic>):Float->Array<String>;
	public static function interpolateObject(a:Dynamic, b:Dynamic):Float->Dynamic;
	public static function interpolateTransform(a:Transform, b:Transform):Float->String;
	public static function interpolateZoom(p0:Array<Int>, p1:Array<Int>):Float->Array<Float>;

	public static var interpolators:Array<Dynamic>;

	public static function transform(name:String):Transform;
	public static function transition(?selection:Selection, ?name:String):Transition;

	public static function timer(fn:EitherType<Void->Bool, Dynamic->Bool>, ?delay:Int, ?time:Int):Void;

	/* sorting helpers */
	public static function ascending<T>(a:T, b:T):Int;
	public static function descending<T>(a:T, b:T):Int;

	/* Array/Math Extensions*/
	public static function min<T>(arr:Array<T>,?accessor:T->Float):Float;
	public static function max<T>(arr:Array<T>,?accessor:T->Float):Float;

	public static function extend<T>(arr:Array<T>,?accessor:T->T):Array<T>;
	public static function sum(arr:Array<Float>,?accessor:Float->Float):Float;
	public static function mean(arr:Array<Float>,?accessor:Float->Float):Null<Float>;
	public static function median(arr:Array<Float>,?accessor:Float->Float):Null<Float>;
	public static function quantile(arr:Array<Float>,p:Float):Float;
	public static function variance(arr:Array<Float>,?accessor:Float->Float):Null<Float>;
	public static function deviation(arr:Array<Float>,?accessor:Float->Float):Float;
	public static function bisectLeft<T>(arr:Array<T>,x:T, ?lo:Int, ?hi:Int):Int;
	public static function bisect<T>(arr:Array<T>,x:T, ?lo:Int, ?hi:Int):Int;
	public static function bisectRight<T>(arr:Array<T>,x:T, ?lo:Int, ?hi:Int):Int;
	public static function bisector<T>(arr:EitherType<Array<T>, T->T->T>):Int;
	public static function shuffle(arr:Array<Dynamic>, ?i0:Int, ?i1:Int):Array<Dynamic>;

	/* Obj Extensions */
	public static function keys(obj:Dynamic):Array<String>;
	public static function values(obj:Dynamic):Array<Dynamic>;
	public static function entries(obj:Dynamic):Array<{key:String, value:Dynamic}>;

	/* Maps/Sets */
	public static function map<T>(obj:T, ?f:T->String):Map<T>;
	public static function set<T>(arr:Array<T>):Set<T>;

	/* Array/Op Extensions */
	public static function merge<T>(arr:Array<Array<T>>):Array<T>;

	@:overload(function(?start:Float, ?stop:Float, ?step:Float):Array<Float>{})
	public static function range(?start:Float, ?stop:Float, ?step:Float):Dynamic;

	public static function permute<T>(arr:Array<T>, indexes:Array<Int>):Array<T>;
	public static function zip<T>(arrays:Rest<Array<T>>):Array<Array<T>>;
	public static function transpose<T>(matrix:Array<Array<T>>):Array<Array<T>>;
	public static function pairs<T>(array:Array<T>):Array<Array<T>>;

	/* Nests */
	public static function nest():Nest<Dynamic,Dynamic>;


	/* Loading External Resources */
	public static function json(url:String, ?cb:XHRCallback):XHR;
	public static function html(url:String, ?cb:XHRCallback):XHR;

	@:overload(function (url:String, ?cb:XHRCallback):XHR{})
	public static function xml(url:String, mime:String, ?cb:XHRCallback):XHR;

	@:overload(function (url:String, ?cb:XHRCallback):XHR{})
	public static function text(url:String, mime:String, ?cb:XHRCallback):XHR;

	@:overload(function (url:String, ?cb:XHRCallback):XHR{})
	public static function xhr(url:String, mime:String, ?cb:XHRCallback):XHR;


	/* Number Formatting */
	public static function format(specifier:String):NumberFormat;
	public static function formatPrefix(value:Float, ?precission:Int):Format;
	public static function round(x:Float, ?n:Int):Float;

	/* String Formatting */
	public static function requote(s:String):String;


	/* CSV/TSV/DSV Formatting */
	public static function csv<T>(url:String, ?accessor:DsvRowAccessor<T>, ?callback:DsvCallback<T>):XHR;
	public static function tsv<T>(url:String, ?accessor:DsvRowAccessor<T>, ?callback:DsvCallback<T>):XHR;
	public static function dsv<T>(delimiter:String, mimeType:String):Dsv;


	/* Colors */
	@:overload(function(color:String):RGB{})
	public static function rgb(r:Int, g:Int, b:Int):RGB;

	@:overload(function(color:String):HSL{})
	public static function hsl(h:Float, s:Float, l:Float):HSL;

	@:overload(function(color:String):HCL{})
	public static function hcl(h:Float, c:Float, l:Float):HCL;

	@:overload(function(color:String):LAB{})
	public static function lab(l:Float, a:Float, b:Float):LAB;

	/* internals */
	public static function functor(value:Dynamic):Dynamic;
	public static function rebind(target:Dynamic, source:Dynamic, names:String):Dynamic;
	public static function dispatch(types:Rest<String>):Dispatch;
}


@fakeEnum(String) @:native("js.d3._D3.InitPriority")
extern enum Priority{ important; }

private class InitPriority{ static var important = 'important'; }
