package js.wNumb;

@:native("wNumb")
extern class WNumb {
	public function new(params:Dynamic);
	
	public function to(num:Float):String;
	public function from(str:String):Float;
}