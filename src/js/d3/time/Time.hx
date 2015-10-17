package js.d3.time;
 import js.d3.locale.TimeFormat;
 import js.d3.time.Interval;
 import js.d3.time.Scale;
 import haxe.extern.EitherType;


typedef TimeRange = Date->Date->?Int->Array<Date>;

/**
 * ...
 * @author Mike Almond - https://github.com/mikedotalmond
 * @author Ruben Weijers
 */

@:native("d3.time")
extern class Time {
	public var scale     : EitherType<Scale, ?Dynamic->Scale>;

	public var format    : EitherType<String->TimeFormatter, EitherType<String->(Date->String), TimeFormat>>;

	public var interval  : EitherType<Interval, Date->Date>;
	public var second    : Interval;
	public var minute    : Interval;
	public var hour      : Interval;
	public var day       : Interval;
	public var week      : Interval;
	public var sunday    : Interval;
	public var monday    : Interval;
	public var tuesday   : Interval;
	public var wednesday : Interval;
	public var thursday  : Interval;
	public var friday    : Interval;
	public var saturday  : Interval;
	public var month     : Interval;
	public var year      : Interval;

	public var seconds   : TimeRange;
	public var minutes   : TimeRange;
	public var hours     : TimeRange;
	public var days      : TimeRange;
	public var weeks     : TimeRange;
	public var sundays   : TimeRange;
	public var mondays   : TimeRange;
	public var tuesdays  : TimeRange;
	public var wednesdays: TimeRange;
	public var thursdays : TimeRange;
	public var fridays   : TimeRange;
	public var saturdays : TimeRange;
	public var months    : TimeRange;
	public var years     : TimeRange;

	public function dayOfYear       (date:Date) : Int;
	public function weekOfYear      (date:Date) : Int;
	public function sundayOfYear    (date:Date) : Int;
	public function mondayOfYear    (date:Date) : Int;
	public function tuesdayOfYear   (date:Date) : Int;
	public function wednesdayOfYear (date:Date) : Int;
	public function thursdayOfYear  (date:Date) : Int;
	public function fridayOfYear    (date:Date) : Int;
	public function saturdayOfYear  (date:Date) : Int;
}
