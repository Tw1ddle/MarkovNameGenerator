package js.d3.event;


@:native("d3.dispatch")
extern class Dispatch {
  public function on(type:String, listener:Dynamic):Dispatch;
}