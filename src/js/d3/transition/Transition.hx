package js.d3.transition;

import js.d3.selection.Selection;

/**
 * ...
 * @author Mike Almond - https://github.com/mikedotalmond
 */
extern class Transition extends Selection {
	
	@:overload(function(fn:Dynamic->Int->Int):Transition{})
	public function delay(ms:Int):Transition;
	
	@:overload(function(fn:Dynamic->Int->Int):Transition{})
	public function duration(ms:Int):Transition;
	
	public function ease(value:Dynamic):Transition;
	
	public function attrTween(name:String, tween:Dynamic):Transition;
	
	public function styleTween(name:String, tween:Dynamic, ?priority:String):Transition;
	
	public function tween(name:String, factory:Dynamic):Transition;
	
	
}