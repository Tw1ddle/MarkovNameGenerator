package markov.util;

/**
 * A collection that contains no duplicate elements. The underlying data structure is a Haxe Array.
 *
 * Elements are compared using the standard equality operator.
 */
@:forward(indexOf, iterator, lastIndexOf, length, map, pop, remove, reverse, shift, sort)
abstract ArraySet<T>(Array<T>) {
    /**
     * Creates a set from an Array.
     * @param   array   The Array to convert to a set.
     * @return  The new ArraySet.
     */
    public static function create<T>(?array:Array<T>):ArraySet<T> {
        if (array == null) {
            return new ArraySet<T>([]);
        }
        return toSet(array);
    }

    /**
     * Returns a new set containing the intersection of two sets.
     * i.e. intersect([A, B, C], [B, C, D]) => [B, C].
     * @param   set The set to intersect with this set.
     * @return  The intersection of this set and the given set.
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
     * i.e. union([A, B, C], [B, C, D]) => [A, B, C, D].
     * @param   set The set to unify with this set.
     * @return  The union of this set and the given set.
     */
    @:op(A+B) public inline function union(set:ArraySet<T>):ArraySet<T> {
        return toSet(this.concat(set.toArray()));
    }

    /**
     * Returns a new set containing the union of the set and array.
     * i.e. union([A, B, C], [B, C, D]) => [A, B, C, D].
     * @param   array   The array to unify with this set.
     * @return  The union of this set and the given Array.
     */
    @:op(A+B) public inline function unionArray(array:Array<T>):ArraySet<T> {
        return toSet(this.concat(array));
    }

    /**
     * Returns a new set containing the difference of two sets.
     * i.e. difference([A, B, C], [B, C, D]) => [A, D].
     * @param   set The set to difference with this set.
     * @return  The difference of this set and the given set.
     */
    @:op(A-B) public inline function difference(set:ArraySet<T>):ArraySet<T> {
        var result = copy();
        for(element in set) {
            result.remove(element);
        }
        return new ArraySet(result);
    }

    /**
     * Attempts to add an element to the set. The added element must not be null.
     * Succeeds if the element is not already in the set, fails if it was in the set.
     * @param   element The element to add to the set.
     * @return  True if the element was not present, false if it was already present.
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
     * Checks if an element is contained within the set.
     * @param   element The element to search the set for. The element must not be null.
     * @return  True if the element is present, false it is not present.
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
     * Copies the set. Analogous to Array.copy().
     * @return  A shallow copy of the original set.
     */
    public inline function copy():ArraySet<T> {
        return new ArraySet(this.copy());
    }

    /**
     * Wraps the Array.slice method, returns an ArraySet instead of an Array.
     * @param   position    The inclusive start index of the slice operation.
     * @param   end The exclusive end index of the slice operation.
     * @return  The requested slice of the ArraySet.
     */
    public inline function slice(position:Int, ?end:Int):ArraySet<T> {
        return new ArraySet(this.slice(position, end));
    }

    /**
     * Wraps the Array.splice method, returns an ArraySet instead of an Array.
     * @param   position    The inclusive start index of the slice operation.
     * @param   length  The number of elements to remove.
     * @return  The requested section of the ArraySet.
     */
    public inline function splice(position:Int, length:Int):ArraySet<T> {
        return new ArraySet(this.splice(position, length));
    }

    /**
     * Converts the set into an Array.
     * @return  A shallow copy of the set as an Array.
     */
    @:to public function toArray():Array<T> {
        return this.copy();
    }

    /**
     * Converts an Array to a set, removing all duplicated values.
     * @param   array   The Array to convert to a set.
     * @return  The newly created ArraySet.
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
     * @param   An array of unique elements.
     */
    private inline function new(array:Array<T>) {
        this = array;
    }
}