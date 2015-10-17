package js.d3.arrays;


/**
 * ...
 * @author Mike Almond, Ruben Weijers
 */
extern class Nest<A,B> {
	public function key<C>(fn:B->C):Nest<C,B>;
	public function sortKeys(fn:A->A->Int) : Nest<A,B>;
	public function sortValues(fn:B->B->Int) : Nest<A,B>;
	public function rollup<C>(fn:B->C):Nest<A,C>;
	public function map<T>(mapType:Void->Dynamic,arr:Array<T>,dept:Int):Nest<A,T>;
	public function entries<T>(arr:Array<T>, depth:Int):Array<{key:A, values:Array<Dynamic>}>;
}