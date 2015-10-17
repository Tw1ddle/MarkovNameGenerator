package js.d3.arrays;


/**
 * ...
 * @author Ruben Weijers
 */
@:native("d3.set")
extern class Set<T> {
	public function has(key:T):Bool;
	public function add(key:T):T;
	public function remove(key:T):T;
	public function values():Array<T>;
	public function forEach(f:T->Void):Void;
	public function empty():Bool;
	public function size():Int;
}