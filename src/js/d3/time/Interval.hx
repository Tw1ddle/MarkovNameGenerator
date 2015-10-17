package js.d3.time;

/**
 * @author Ruben Weijers
 */
@:native("d3.time.interval")
extern class Interval extends Date {
    public function floor  (date:Date):Date;
    public function round  (date:Date):Date;
    public function ceil   (date:Date):Date;
    public function range  (start:Date, stop:Date, ?step:Int):Array<Date>;
    public function offset (date:Date, offset:Int):Date;

    public var utc : Interval;

}
