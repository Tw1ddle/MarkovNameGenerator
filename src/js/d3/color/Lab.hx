package js.d3.color;

/**
 * ...
 * @author Ruben Weijers
 */

@:native("d3.lab")
extern class LAB extends Color {
  public static function brighter(?k:Float):LAB;
  public static function darker(?k:Float):LAB;
  public static function rgb():RGB;
}