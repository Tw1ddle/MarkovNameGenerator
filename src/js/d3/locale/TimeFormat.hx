package js.d3.locale;
 import haxe.extern.EitherType;


extern class TimeFormatter {
	public function parse(specifier:String) : Null<Date>;
	public function multi(formats:Array<Array<Dynamic>>):Date->String;
	public function toString() : String;
}

typedef DateParser = Date->String;
typedef D3Time = EitherType<TimeFormatter,Date->String>;


/**
 * ...
 * @author Mike Almond - https://github.com/mikedotalmond
 * @author Ruben Weijers
 */

 @:native("d3.time.format")
extern class TimeFormat extends TimeFormatter {
	public function utc(specifier:String):D3Time;
	public function iso(specifier:String):D3Time;
}