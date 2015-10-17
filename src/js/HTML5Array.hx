package js;
/**
  If you're using D3, you have a modern JS (> 1.8) runtime, and have some extra
  array methods by default.  Try "using" this class to enable them.
 **/
extern class HTML5Array{
	public static function splice<T>(arr:Array<T>,index:Int, howMany:Int, ?arg1:T, ?arg2:T, ?arg3:T, ?arg4:T, ?arg5:T): Array<T>;
	public static function indexOf<T>(arr:Array<T>,searchElement:T, ?fromIndex:Int):Int;
	public static function lastIndexOf<T>(arr:Array<T>,searchElement:T, ?fromIndex:Int):Int;
	public static function forEach<T>(arr:Array<T>,cb:T->Dynamic, ?thisArg:Dynamic):Void;
	public static function every<T>(arr:Array<T>,cb:T->Bool, ?thisObject:Dynamic):Bool;
	public static function some<T>(arr:Array<T>,cb:T->Bool, ?thisObject:Dynamic):Bool;
	public static function reduce<T,A>(arr:Array<T>,cb:T->A->Int->Array<T>, ?initialValue:A):A;	
	public static function reduceRight<T,A>(arr:Array<T>,cb:T->A->Int->Array<T>, ?initialValue:A):A;
}
