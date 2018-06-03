package js.nouislider;

import js.html.Element;

@:enum abstract UiSliderEvent(String) from String to String {
	var UPDATE = "update";
	var SLIDE = "slide";
	var SET = "set";
	var CHANGE = "change";
}

extern class UiSlider {
	public function on(event:UiSliderEvent, cb:Array<Float>->Int->Array<Float>->Void):Void;
	public function off(event:UiSliderEvent):Void;
	public function set(values:Array<Null<Float>>):Void;
	public function get():Dynamic;
}

@:native("noUiSlider")
extern class NoUiSlider {
	// Adds a noUiSlider property to the element
	public static function create(slider:Element, params:Dynamic):UiSlider;
}