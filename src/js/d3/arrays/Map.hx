package js.d3.arrays;


/**
 * ...
 * @author Ruben Weijers
 */
@:native("d3.map")
extern class Map<T> {
	public function has(key:String):Bool;
	public function get(key:String):T;
	public function set(key:String, value:T):T;
	public function remove(key:String):T;
	public function keys():Array<String>;
	public function values():Array<T>;
	public function entries():Array<{key:String,value:T}>;
	public function forEach(f:String->T->Void):Void;
	public function empty():Bool;
	public function size():Int;
}