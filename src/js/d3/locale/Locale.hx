package js.d3.locale;


typedef ValueParser = String->Float;
typedef NumberFormat = String->ValueParser;

@:native("d3.locale")
typedef Locale = {
	var numberFormat : NumberFormat;
	var timeFormat : TimeFormat;
}