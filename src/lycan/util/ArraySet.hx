package lycan.util;

// A collection that contains no duplicate elements
// Underlying data structure is an array
@:forward(indexOf, iterator, lastIndexOf, length, map, pop, remove, reverse, shift, sort)
abstract ArraySet<T>(Array<T>) {
	private inline function new(array:Array<T>) {
		this = array;
	}
	
	// Creates the set from an array
	public static function create<T>(?array:Array<T>):ArraySet<T> {
		if (array == null) {
			return new ArraySet<T>([]);
		}
		
		return toSet(array);
	}
	
	// Returns a new set containing the intersection of two sets
	public inline function intersection(set:ArraySet<T>):ArraySet<T> {
		var result = [];
		
		for(item in this) {
			if(set.contains(item)) {
				result.push(item);
			}
		}
		
		return new ArraySet(result);
	}
	
	// Returns a new set containing the union of two sets
	@:op(A+B) public inline function union(set:ArraySet<T>):ArraySet<T> {
		return toSet(this.concat(set.toArray()));
	}
	
	// Returns a new set containing the union of the set and array
	@:op(A+B) public inline function unionArray(set:Array<T>):ArraySet<T> {
		return toSet(this.concat(set));
	}
	
	// Returns a new set containing the difference of two sets
	@:op(A-B) public inline function difference(set:ArraySet<T>):ArraySet<T> {
		var result = copy();
		
		for(item in set) {
			result.remove(item);
		}
		
		return new ArraySet(result);
	}

	// Pushes a value to the end of the set if the value was not already present
	// Returns true if the value was not already present, false if it was
	public function add(v:T):Bool {
		if (contains(v)) {
			return false;
		}
		
		this.push(v);
		return true;
	}

	// Returns a clone of the original set
	public inline function copy():ArraySet<T> {
		return new ArraySet(this.copy());
	}

	// Returns true if the set contains v
	public function contains(v:T):Bool {
		for (item in this) {
			if (item == v) {
				return true;
			}
		}
		
		return false;
	}

	// Like array.slice but returns an ArraySet instead
	public inline function slice(pos:Int, ?end:Int):ArraySet<T> {
		return new ArraySet(this.slice(pos, end));
	}

	// Like array.splice but returns an ArraySet instead
	public inline function splice(pos:Int, len:Int):ArraySet<T> {
		return new ArraySet(this.splice(pos, len));
	}
	
	// Converts the set into an array.
	// The returned array is a copy of the underlying array
	@:to public function toArray():Array<T> {
		return this.copy();
	}
	
	// Converts array to a set, removing all duplicated values
	@:from public static function toSet<T>(array:Array<T>):ArraySet<T> {
		var set = new ArraySet([]);
		
		for(v in array) {
			set.add(v);
		}
		
		return set;
	}
}