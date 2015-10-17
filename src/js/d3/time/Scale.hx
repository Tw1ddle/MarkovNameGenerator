package js.d3.time;
 import js.d3.locale.TimeFormat;
 import js.d3.time.Interval;

/**
 * ...
 * @author Mike Almond - https://github.com/mikedotalmond
 */

@:native("d3.time.scale")
extern class Scale {

	public function utc():Scale;
	public function invert(y:Array<Dynamic>):Date;

	@:overload(function():Array<Date> {})
	public function domain(dates:Array<Date>):Scale;

	@:overload(function(?count:Int):Scale {})
	public function nice(?interval:Int, ?step:Int):Scale;

	@:overload(function():Array<Dynamic> {})
	public function range(values:Array<Dynamic>):Scale;

	@:overload(function():Array<Dynamic> {})
	public function rangeRound(values:Array<Dynamic>):Scale;

	@:overload(function():Array<Dynamic> {})
	public function interpolate(factory:Array<Dynamic>):Scale;

	@:overload(function():Bool {})
	public function clamp(boolean:Bool):Scale;

	@:overload(function(?count:Int):Array<Date> {})
	public function ticks(interval:Interval, ?step:Int):Array<Date>;

	public function tickFormat(count:Int):TimeFormat;
	public function copy():Scale;

}
