package markov.util;

/**
 * A collection that contains no duplicate elements.
 * Element are compared using the "==" operator.
 * The underlying data structure is a Haxe array.
 */
@:forward(indexOf, iterator, lastIndexOf, length, map, pop, remove, reverse, shift, sort)
abstract ArraySet<T>(Array<T>) {
	/**
	 * Creates a set from an array.
	 * @param	array	The array to convert to a set.
	 * @return	The new ArraySet.
	 */
	public static function create<T>(?array:Array<T>):ArraySet<T> {
		if (array == null) {
			return new ArraySet<T>([]);
		}
		return toSet(array);
	}
	
	/**
	 * Returns a new set containing the intersection of two sets.
	 * For example: intersect([A, B, C], [B, C, D]) => [B, C]. 
	 * @param	set	The set to intersect with this set.
	 * @return	The intersection of this set and the given set.
	 */
	public inline function intersection(set:ArraySet<T>):ArraySet<T> {
		var result = [];
		for(element in this) {
			if(set.contains(element)) {
				result.push(element);
			}
		}
		return new ArraySet(result);
	}
	
	/**
	 * Returns a new set containing the union of two sets.
	 * For example: union([A, B, C], [B, C, D]) => [A, B, C, D].
	 * @param	set The set to unify with this set.
	 * @return	The union of this set and the given set.
	 */
	@:op(A+B) public inline function union(set:ArraySet<T>):ArraySet<T> {
		return toSet(this.concat(set.toArray()));
	}
	
	/**
	 * Returns a new set containing the union of the set and array.
	 * For example: union([A, B, C], [B, C, D]) => [A, B, C, D].
	 * @param	The array to unify with this set.
	 * @return	The union of this set and the given array.
	 */
	@:op(A+B) public inline function unionArray(arr:Array<T>):ArraySet<T> {
		return toSet(this.concat(arr));
	}
	
	/**
	 * Returns a new set containing the difference of two sets.
	 * For example: difference([A, B, C], [B, C, D]) => [A, D].
	 * @param	The set to difference with this set.
	 * @return	The difference of this set and the given set.
	 */ 
	@:op(A-B) public inline function difference(set:ArraySet<T>):ArraySet<T> {
		var result = copy();
		for(element in set) {
			result.remove(element);
		}
		return new ArraySet(result);
	}

	/**
	 * Adds an element to the set, provided that the element is not already present.
	 * The element must not be null.
	 * @param	element	The element to add to the set.
	 * @return	True if the element was not already present, false if it was present.
	 */
	public function add(element:T):Bool {
		Sure.sure(element != null);
		if (contains(element)) {
			return false;
		}
		this.push(element);
		return true;
	}
	
	/**
	 * Checks whether an element is contained within the set.
	 * The element must not be null.
	 * @param	element	The element to check for.
	 * @return	True if the element is present, false it is not present.
	 */
	public function contains(element:T):Bool {
		for (i in this) {
			if (i == element) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Clones the set.
	 * @return 	A clone of the original set.
	 */
	public inline function copy():ArraySet<T> {
		return new ArraySet(this.copy());
	}

	/**
	 * Array.slice method, but returning an ArraySet instead.
	 * @param	pos	The inclusive start index of the slice operation.
	 * @param	end	The exclusive end index of the slice operation.
	 * @return	The requested slice of the ArraySet.
	 */
	public inline function slice(pos:Int, ?end:Int):ArraySet<T> {
		return new ArraySet(this.slice(pos, end));
	}

	/**
	 * Array.splice method, but returning an ArraySet instead.
	 * @param	pos	The inclusive start index of the slice operation.
	 * @param	len	The number of elements to remove.
	 * @return	The requested section of the ArraySet.
	 */
	public inline function splice(pos:Int, len:Int):ArraySet<T> {
		return new ArraySet(this.splice(pos, len));
	}
	
	/**
	 * Converts the set into an array.
	 * @return	A copy of the underlying array.
	 */
	@:to public function toArray():Array<T> {
		return this.copy();
	}
	
	/**
	 * Converts an array to a set, removing all duplicated values.
	 * @param	array	The array to convert to a set.
	 * @return	The newly created ArraySet.
	 */
	@:from public static function toSet<T>(array:Array<T>):ArraySet<T> {
		var set = new ArraySet([]);
		for(v in array) {
			set.add(v);
		}
		return set;
	}
	
	/**
	 * Private constructor, used internally in places where elements are known to be unique to a set.
	 * @param	An array of unique elements.
	 */
	private inline function new(array:Array<T>) {
		this = array;
	}
}