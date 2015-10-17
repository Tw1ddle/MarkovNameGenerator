package js.d3.color;

/**
 * ...
 * @author Ruben Weijers
 */

@:native("d3.hcl")
extern class HCL extends Color {
  public static function brighter(?k:Float):HCL;
  public static function darker(?k:Float):HCL;
  public static function rgb():RGB;
}