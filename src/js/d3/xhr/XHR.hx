package js.d3.xhr;
 import js.html.ArrayBuffer;
 import js.html.ArrayBufferView;
 import js.html.Blob;
 import js.html.FormData;
 import js.html.HTMLDocument;
 import js.html.XMLHttpRequest;
 import js.html.XMLHttpRequestResponseType;
 import haxe.extern.EitherType;

typedef XHRCallback = Dynamic->Dynamic->Void;

typedef XHRData = EitherType<ArrayBuffer,
				  EitherType<ArrayBufferView,
				  EitherType<Blob,
				  EitherType<HTMLDocument,
				  EitherType<String,
				  EitherType<FormData, Dynamic>>>>>>;

/**
 * ...
 * @author Ruben Weijers
 */
@:native("d3.xhr")
extern class XHR {
  public var request : XMLHttpRequest;
  private var headers : Dynamic;
  public function header (name:String, ?value:String):XHR;
  public function mimeType (?value:String):XHR;
  public function respondType (value:XMLHttpRequestResponseType):XHR;
  public function response(value:Dynamic):XHR;

  public function on(type:String, ?listener:XMLHttpRequest->Void):Void;

  @:overload(function(method:String, ?callback:XHRCallback):XHR {})
  public function send(method:String, data:XHRData, ?callback:XHRCallback):XHR;

  @:overload(function(?callback:XHRCallback):XHR {})
  public function post(data:XHRData, ?callback:XHRCallback):XHR;

  @:overload(function(?callback:XHRCallback):XHR {})
  public function get(data:XHRData, ?callback:XHRCallback):XHR;

  public function abort():XHR;
}