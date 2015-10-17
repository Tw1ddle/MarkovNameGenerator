package js.d3.math;

/**
 * ...
 * @author Mike Almond - https://github.com/mikedotalmond
 */
@:native("d3.random")
extern class Random {
	public function normal(?mean:Float, ?deviation:Float):Void->Float;
  public function logNormal() : Void->Float;
  public function bates (m:Int) : Void->Float;
  public function irwinHall (m:Int) : Void->Float;
}