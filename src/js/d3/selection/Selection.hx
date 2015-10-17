package js.d3.selection;
 import js.d3.D3;
 import js.d3.transition.Transition;
 import js.html.Element;
 import haxe.extern.EitherType;
 import haxe.extern.Rest;


/**
 * @see https://github.com/mbostock/d3/wiki/Selections
 * @author Mike Almond - https://github.com/mikedotalmond
 */
extern class Selection implements ArrayAccess<Element> {

	// --------------------------
	// Content
	// --------------------------

	/**
	 *
	 * @param	name
	 * @param	value
	 * @return
	 */
	@:overload(function(name:String, value:Dynamic):Selection{})
	@:overload(function(name:String, value:Int):Selection{})
	@:overload(function(name:String, value:Void->String):Selection{})
	@:overload(function(name:String, value:Dynamic->String):Selection{})
	@:overload(function(name:String, value:Dynamic->Int->String):Selection{})
	public function attr(name:String, value:String):Selection;


	/**
	*
	* @param	name
	* @param	value
	* @return
	*/
	@:overload(function(name:Dynamic):Selection {})
	@:overload(function(name:String):Bool {})
	public function classed(name:String, value:Dynamic):Selection;


	/**
	 *
	 * @param	name
	 * @param	value
	 * @param	?priority
	 * @return
	 */
	@:overload(function(name:Dynamic):Selection{})
	@:overload(function(name:String):Dynamic{})
	@:overload(function(name:String, value:Null<Dynamic>):Selection{})
	@:overload(function(name:String, value:Void->String, ?priority:Priority):Selection{})
	@:overload(function(name:String, value:Dynamic->String, ?priority:Priority):Selection{})
	@:overload(function(name:String, value:Dynamic->Int->String, ?priority:Priority):Selection{})
	@:overload(function(name:String, value:Null<Dynamic>):Selection{})
	public function style(name:String, value:String, ?priority:Priority):Selection;


	/**
	 *
	 * @param	name
	 * @param	value
	 * @return
	 */
	@:overload(function(name:String):Dynamic{})
	@:overload(function(name:String, value:Null<String>):Selection{})
	@:overload(function(name:String, value:String):Selection{})
	@:overload(function(name:String, value:Void->String):Selection{})
	@:overload(function(name:String, value:Dynamic->String):Selection{})
	@:overload(function(name:String, value:Dynamic->Int->String):Selection{})
	public function property(name:String, value:String):Selection;


	/**
	 *
	 * @param	value
	 * @return
	 */
	@:overload(function():String{})
	@:overload(function(value:Void->String):Selection{})
	@:overload(function(value:Dynamic->String):Selection{})
	@:overload(function(value:Dynamic->Int->String):Selection{})
	public function text(value:EitherType<String,Dynamic->Dynamic>) : Selection;


	/**
	 *
	 * @param	value
	 * @return
	 */
	@:overload(function():String{})
	@:overload(function(value:Void->String):Selection{})
	@:overload(function(value:Dynamic->String):Selection{})
	@:overload(function(value:Dynamic->Int->String):Selection{})
	public function html(value:String):Selection;

	/**
	 *
	 * @param	name
	 * @return
	 */
	public function append(name:EitherType<String, Void->Element>) : Selection;

	/**
	 *
	 * @param	name
	 * @param	before
	 * @return
	 */
	public function insert(name:EitherType<String, Void->Element>, before:EitherType<String, Void->String->Element>) : Selection;

	/**
	 *
	 * @return
	 */
	public function remove():Selection;




	// --------------------------
	// Data
	// --------------------------

	/**
	 *
	 * @param	values
	 * @param	?key
	 * @return
	 */
	@:overload(function():Dynamic{})
	@:overload(function(value:Dynamic,?key:Dynamic):Selection{})
	public function data(value:EitherType<Array<Dynamic>, Dynamic->Int->Array<Dynamic>>,
						 ?key:EitherType<Dynamic->Int->Dynamic, Dynamic->Dynamic>):Selection;


	/**
	 *
	 * @return
	 */
	public function enter(?selection:Selection):Selection;


	/**
	 *
	 * @return
	 */
	public function exit():Selection;


	/**
	 *
	 * @param	selector
	 * @return
	 */
	@:overload(function(selector:Dynamic->Int->Bool):Selection{})
	@:overload(function(selector:Dynamic->Bool):Selection{})
	public function filter(selector:String):Selection;


	/**
	 *
	 * @param	?value
	 * @return
	 */
	public function datum(?value:Dynamic):Dynamic;


	/**
	 *
	 * @param	comparator
	 * @return
	 */
	public function sort(?comparator:Dynamic->Dynamic->Int):Selection;


	/**
	 *
	 * @return
	 */
	public function order():Selection;


	public function size ():Int;




	// --------------------------
	// Animation and Interaction
	// --------------------------

	/**
	 * Adds or removes an event listener to each element in the current selection, for the specified type
	 * @param	type
	 * @param	?listener
	 * @param	?capture
	 * @return
	 */
	//@:overload(function(type:Dynamic, ?capture:Bool):Selection {})
	@:overload(function(type:String, ?listener:Dynamic->Void, ?capture:Bool):Selection {})
	public function on(type:String, ?listener:Dynamic->Int->Void, ?capture:Bool):Selection;


	/**
	 * Starts a transition for the current selection.
	 * Transitions behave much like selections, except operators animate smoothly over time rather than applying instantaneously.
	 */
	public function transition(?name:Null<String>):Transition;




	// --------------------------
	// Subselections
	// --------------------------

	/**
	 *
	 * @param	selector
	 * @return
	 */
	@:overload(function(selector:Dynamic->Int->Selection):Selection{})
	public function select(selector:String):Selection;


	 /**
	 * @param	selector
	 * @return
	 */
	@:overload(function(selector:Dynamic->Int->Array<Selection>):Selection{})
	public function selectAll(selector:String):Selection;




	// --------------------------
	// Control
	// --------------------------

	/**
	 *
	 * @param	fn
	 * @return
	 */
	public function each(fn:EitherType<Dynamic->Void,
							EitherType<Dynamic->Int->Void,
									   Dynamic->Int->Int->Void>>):Selection;


	/**
	 *
	 * @param	fn
	 * @param	?arg1
	 * @param	?arg2
	 * @param	?arg3
	 * @return
	 */
	public function call(fn:Dynamic, r:Rest<Dynamic>):Selection;


	/**
	 * @return true if the current selection is empty; a selection is empty if it contains no non-null elements.
	 */
	public function empty():Bool;


	/**
	 * @return the first non-null element in the current selection. If the selection is empty, returns null.
	*/
	public function node():Null<Element>;
}
