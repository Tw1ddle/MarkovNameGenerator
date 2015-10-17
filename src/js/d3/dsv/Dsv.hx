package js.d3.dsv;

typedef DsvRow<T> = Array<T>;
typedef DsvRows<T> = Array<DsvRow<T>>;
typedef DsvCallback<T> = Dynamic->DsvRows<T>->Void;
typedef DsvRowAccessor<T> = DsvRow<String>->Int->DsvRow<T>;

@:native('d3.dsv')
extern class Dsv {
    public static function parseRows<T>(text:String, ?accessor:DsvRowAccessor<T>):DsvRows<T>;
    public static function parse<T>(text:String, ?accessor:Dynamic->T):Array<T>;
    public static function format<T>(rows:DsvRows<T>):String;
    public static function formatRows(rows:DsvRows<String>):String;
}
