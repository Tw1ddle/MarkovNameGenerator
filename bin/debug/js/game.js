(function (console) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Main = function() {
	window.onload = $bind(this,this.onWindowLoaded);
};
Main.__name__ = true;
Main.main = function() {
	var main = new Main();
};
Main.prototype = {
	onWindowLoaded: function() {
		window.document.addEventListener("resize",function(event) {
		},false);
		window.document.addEventListener("contextmenu",function(event1) {
			event1.preventDefault();
		},true);
	}
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var js_d3__$D3_InitPriority = function() { };
js_d3__$D3_InitPriority.__name__ = true;
var lycan_util_ArrayExtensions = function() { };
lycan_util_ArrayExtensions.__name__ = true;
lycan_util_ArrayExtensions.randomElementFromArrays = function(arrays) {
	if(!(arrays != null && arrays.length != 0)) throw new js__$Boot_HaxeError("FAIL: arrays != null && arrays.length != 0");
	var totalLength = 0;
	var lengths = [];
	var _g = 0;
	while(_g < arrays.length) {
		var array = arrays[_g];
		++_g;
		if(!(array != null && array.length != 0)) throw new js__$Boot_HaxeError("FAIL: array != null && array.length != 0");
		totalLength += array.length;
		lengths.push(totalLength);
	}
	var n = Math.random() * totalLength;
	var i = 0;
	while(i < lengths.length) {
		if(n < lengths[i]) return lycan_util_ArrayExtensions.randomElement(arrays[i]);
		i++;
	}
	throw new js__$Boot_HaxeError("Failed to get random element");
};
lycan_util_ArrayExtensions.randomElement = function(array) {
	if(!(array != null && array.length != 0)) throw new js__$Boot_HaxeError("FAIL: array != null && array.length != 0");
	return array[Std.random(array.length)];
};
lycan_util_ArrayExtensions.noNulls = function(array) {
	var _g = 0;
	while(_g < array.length) {
		var e = array[_g];
		++_g;
		if(e == null) return false;
	}
	return true;
};
lycan_util_ArrayExtensions.binarySearchCmp = function(a,x,min,max,comparator) {
	if(!(a != null)) throw new js__$Boot_HaxeError("FAIL: a != null");
	if(!(min >= 0 && min < a.length)) throw new js__$Boot_HaxeError("FAIL: min >= 0 && min < a.length");
	if(!(max >= 0 && max < a.length)) throw new js__$Boot_HaxeError("FAIL: max >= 0 && max < a.length");
	if(!(comparator != null)) throw new js__$Boot_HaxeError("FAIL: comparator != null");
	var low = min;
	var high = max + 1;
	var middle;
	while(low < high) {
		middle = low + (high - low >> 1);
		if(comparator(a[middle],x) < 0) low = middle + 1; else high = middle;
	}
	if(low <= max && comparator(a[low],x) == 0) return low; else return ~low;
};
lycan_util_ArrayExtensions.binarySearch = function(a,x,min,max) {
	if(!(a != null)) throw new js__$Boot_HaxeError("FAIL: a != null");
	if(!(min >= 0 && min < a.length)) throw new js__$Boot_HaxeError("FAIL: min >= 0 && min < a.length");
	if(!(max >= 0 && max < a.length)) throw new js__$Boot_HaxeError("FAIL: max >= 0 && max < a.length");
	var low = min;
	var high = max + 1;
	var middle;
	while(low < high) {
		middle = low + (high - low >> 1);
		if(a[middle] < x) low = middle + 1; else high = middle;
	}
	if(low <= max && a[low] == x) return low; else return ~low;
};
var lycan_util__$ArraySet_ArraySet_$Impl_$ = {};
lycan_util__$ArraySet_ArraySet_$Impl_$.__name__ = true;
lycan_util__$ArraySet_ArraySet_$Impl_$._new = function(array) {
	return array;
};
lycan_util__$ArraySet_ArraySet_$Impl_$.create = function(array) {
	if(array == null) return [];
	return lycan_util__$ArraySet_ArraySet_$Impl_$.toSet(array);
};
lycan_util__$ArraySet_ArraySet_$Impl_$.intersection = function(this1,set) {
	var result = [];
	var _g = 0;
	while(_g < this1.length) {
		var item = this1[_g];
		++_g;
		if(lycan_util__$ArraySet_ArraySet_$Impl_$.contains(set,item)) result.push(item);
	}
	return result;
};
lycan_util__$ArraySet_ArraySet_$Impl_$.union = function(this1,set) {
	return lycan_util__$ArraySet_ArraySet_$Impl_$.toSet(this1.concat(lycan_util__$ArraySet_ArraySet_$Impl_$.toArray(set)));
};
lycan_util__$ArraySet_ArraySet_$Impl_$.unionArray = function(this1,set) {
	return lycan_util__$ArraySet_ArraySet_$Impl_$.toSet(this1.concat(set));
};
lycan_util__$ArraySet_ArraySet_$Impl_$.difference = function(this1,set) {
	var result;
	var array = this1.slice();
	result = array;
	var $it0 = HxOverrides.iter(set);
	while( $it0.hasNext() ) {
		var item = $it0.next();
		HxOverrides.remove(result,item);
	}
	var array1 = lycan_util__$ArraySet_ArraySet_$Impl_$.toArray(result);
	return array1;
};
lycan_util__$ArraySet_ArraySet_$Impl_$.add = function(this1,v) {
	if(lycan_util__$ArraySet_ArraySet_$Impl_$.contains(this1,v)) return false;
	this1.push(v);
	return true;
};
lycan_util__$ArraySet_ArraySet_$Impl_$.copy = function(this1) {
	var array = this1.slice();
	return array;
};
lycan_util__$ArraySet_ArraySet_$Impl_$.contains = function(this1,v) {
	var _g = 0;
	while(_g < this1.length) {
		var item = this1[_g];
		++_g;
		if(item == v) return true;
	}
	return false;
};
lycan_util__$ArraySet_ArraySet_$Impl_$.slice = function(this1,pos,end) {
	var array = this1.slice(pos,end);
	return array;
};
lycan_util__$ArraySet_ArraySet_$Impl_$.splice = function(this1,pos,len) {
	var array = this1.splice(pos,len);
	return array;
};
lycan_util__$ArraySet_ArraySet_$Impl_$.toArray = function(this1) {
	return this1.slice();
};
lycan_util__$ArraySet_ArraySet_$Impl_$.toSet = function(array) {
	var set = [];
	var _g = 0;
	while(_g < array.length) {
		var v = array[_g];
		++_g;
		lycan_util__$ArraySet_ArraySet_$Impl_$.add(set,v);
	}
	return set;
};
var lycan_util_EditDistanceMetrics = function() { };
lycan_util_EditDistanceMetrics.__name__ = true;
lycan_util_EditDistanceMetrics.levenshtein = function(source,target) {
	if(!(source != null && target != null)) throw new js__$Boot_HaxeError("FAIL: source != null && target != null");
	var slen = source.length;
	var tlen = target.length;
	if(slen == 0) return tlen;
	if(tlen == 0) return slen;
	var costs;
	var this1;
	this1 = new Array(tlen + 1);
	costs = this1;
	var _g1 = 0;
	var _g = costs.length;
	while(_g1 < _g) {
		var i = _g1++;
		costs[i] = i;
	}
	var s = 0;
	while(s < source.length) {
		costs[0] = s + 1;
		var corner = s;
		var t = 0;
		while(t < target.length) {
			var upper = costs[t + 1];
			if(source.charAt(s) == target.charAt(t)) costs[t + 1] = corner; else {
				var tc;
				if(upper < corner) tc = upper; else tc = corner;
				costs[t + 1] = (costs[t] < tc?costs[t]:tc) + 1;
			}
			corner = upper;
			t++;
		}
		s++;
	}
	return costs[costs.length - 1];
};
lycan_util_EditDistanceMetrics.damerauLevenshteinMatrix = function(source,target,enableTransposition) {
	if(enableTransposition == null) enableTransposition = true;
	if(!(source != null && target != null)) throw new js__$Boot_HaxeError("FAIL: source != null && target != null");
	var w = source.length;
	var h = target.length;
	if(w == 0 || h == 0) {
		var this1;
		this1 = new Array(0);
		return this1;
	}
	w += 1;
	h += 1;
	var costs;
	var this2;
	this2 = new Array(w * h);
	costs = this2;
	var _g = 0;
	while(_g < w) {
		var i = _g++;
		costs[i] = i;
	}
	var _g1 = 1;
	while(_g1 < h) {
		var j = _g1++;
		costs[j * w] = j;
	}
	var cost = 0;
	var _g2 = 1;
	while(_g2 < w) {
		var x = _g2++;
		var _g11 = 1;
		while(_g11 < h) {
			var y = _g11++;
			if(source.charAt(x - 1) == target.charAt(y - 1)) cost = 0; else cost = 1;
			var val = lycan_util_IntExtensions.min(costs[x - 1 + y * w] + 1,lycan_util_IntExtensions.min(costs[x + (y - 1) * w] + 1,costs[x - 1 + (y - 1) * w] + cost));
			costs[x + y * w] = val;
			if(enableTransposition && x > 1 && y > 1 && source.charAt(x) == target.charAt(y - 1) && source.charAt(x - 1) == target.charAt(y)) {
				var val1 = lycan_util_IntExtensions.min(costs[x + y * w],costs[x - 2 + (y - 2) * w] + cost);
				costs[x + y * w] = val1;
			}
		}
	}
	return costs;
};
lycan_util_EditDistanceMetrics.damerauLevenshtein = function(source,target,enableTransposition) {
	if(enableTransposition == null) enableTransposition = true;
	if(source.length == 0) return target.length;
	if(target.length == 0) return source.length;
	var table = lycan_util_EditDistanceMetrics.damerauLevenshteinMatrix(source,target,enableTransposition);
	return table[table.length - 1];
};
lycan_util_EditDistanceMetrics.jaro = function(first,second) {
	var f = first.length;
	var s = second.length;
	if(f == 0) if(s == 0) return 1.0; else return 0.0;
	var fMatches;
	var this1;
	this1 = new Array(f);
	fMatches = this1;
	var _g = 0;
	while(_g < f) {
		var i = _g++;
		fMatches[i] = false;
	}
	var sMatches;
	var this2;
	this2 = new Array(s);
	sMatches = this2;
	var _g1 = 0;
	while(_g1 < s) {
		var i1 = _g1++;
		sMatches[i1] = false;
	}
	var matchDistance;
	matchDistance = (f > s?f:s) / 2 - 1 | 0;
	var matches = 0;
	var transpositions = 0;
	var _g2 = 0;
	while(_g2 < f) {
		var i2 = _g2++;
		var start = lycan_util_IntExtensions.max(0,i2 - matchDistance);
		var end = lycan_util_IntExtensions.min(i2 + matchDistance + 1,s);
		var _g11 = start;
		while(_g11 < end) {
			var j = _g11++;
			if(sMatches[j]) continue;
			if(first.charAt(i2) != second.charAt(j)) continue;
			fMatches[i2] = true;
			sMatches[j] = true;
			matches++;
			break;
		}
	}
	if(matches == 0) return 0.0;
	var k = 0;
	var _g3 = 0;
	while(_g3 < f) {
		var i3 = _g3++;
		if(!fMatches[i3]) continue;
		while(!sMatches[k]) k++;
		if(first.charAt(i3) != second.charAt(k)) transpositions++;
		k++;
	}
	transpositions *= 0.5;
	var jaro = (matches / f + matches / s + (matches - transpositions) / matches) / 3.0;
	return jaro;
};
lycan_util_EditDistanceMetrics.jaroWinkler = function(first,second,maxPrefixLength) {
	if(maxPrefixLength == null) maxPrefixLength = 4;
	var jaroSimilarity = lycan_util_EditDistanceMetrics.jaro(first,second);
	var prefixLength = 0;
	if(first.length != 0 && second.length != 0) {
		var minLen = lycan_util_IntExtensions.min(first.length,second.length);
		var _g = 0;
		while(_g < minLen) {
			var i = _g++;
			if(first.charAt(i) == second.charAt(i)) {
				prefixLength++;
				if(prefixLength >= maxPrefixLength) break;
			} else break;
		}
	}
	return jaroSimilarity + prefixLength * 0.1 * (1 - jaroSimilarity);
};
lycan_util_EditDistanceMetrics.mongeElkan = function(first,second,similarityMeasure,delimiter) {
	if(delimiter == null) delimiter = " ";
	if(first.length == 0 && second.length == 0) return 1;
	var fTokens = first.split(delimiter);
	var sTokens = second.split(delimiter);
	if(fTokens.length == 0 || sTokens.length == 0) return 0;
	var sum = 0;
	var _g = 0;
	while(_g < fTokens.length) {
		var f = fTokens[_g];
		++_g;
		var max = 0;
		var _g1 = 0;
		while(_g1 < sTokens.length) {
			var s = sTokens[_g1];
			++_g1;
			max = Math.max(max,similarityMeasure(first,second));
		}
		sum += max;
	}
	return sum / fTokens.length;
};
lycan_util_EditDistanceMetrics.diceCoefficient = function(first,second) {
	return 0;
};
lycan_util_EditDistanceMetrics.jaccard = function(first,second) {
	return 0;
};
var lycan_util_FileReader = function() { };
lycan_util_FileReader.__name__ = true;
var lycan_util_IntExtensions = function() { };
lycan_util_IntExtensions.__name__ = true;
lycan_util_IntExtensions.abs = function(v) {
	if(v < 0) return -v;
	return v;
};
lycan_util_IntExtensions.clamp = function(v,min,max) {
	if(v < min) return min;
	if(v > max) return max;
	return v;
};
lycan_util_IntExtensions.clampSym = function(v,bound) {
	if(v < bound) return bound; else if(v > bound) return bound; else return v;
};
lycan_util_IntExtensions.even = function(v) {
	return v % 2 == 0;
};
lycan_util_IntExtensions.odd = function(v) {
	return v % 2 != 0;
};
lycan_util_IntExtensions.max = function(a,b) {
	if(a > b) return a;
	return b;
};
lycan_util_IntExtensions.min = function(a,b) {
	if(a < b) return a;
	return b;
};
lycan_util_IntExtensions.toBool = function(v) {
	return v != 0;
};
lycan_util_IntExtensions.isPow2 = function(v) {
	return v > 0 && (v & v - 1) == 0;
};
lycan_util_IntExtensions.sign = function(x) {
	if(x > 0) return 1; else if(x < 0) return -1; else return 0;
};
var lycan_util_StringExtensions = function() { };
lycan_util_StringExtensions.__name__ = true;
lycan_util_StringExtensions.reverse = function(s) {
	if(!(s != null)) throw new js__$Boot_HaxeError("FAIL: s != null");
	var arr = s.split("");
	arr.reverse();
	return arr.join("");
};
lycan_util_StringExtensions.repeat = function(s,times) {
	if(!(s != null)) throw new js__$Boot_HaxeError("FAIL: s != null");
	if(!(times >= 1)) throw new js__$Boot_HaxeError("FAIL: times >= 1");
	var output = "";
	var _g = 0;
	while(_g < times) {
		var i = _g++;
		output += s;
	}
	return output;
};
lycan_util_StringExtensions.contains = function(s,substr) {
	return s.indexOf(substr) >= 0;
};
var lycan_util_namegen_Generator = function(data,order,smoothing) {
	if(!(data != null)) throw new js__$Boot_HaxeError("FAIL: data != null");
	if(!(order >= 1)) throw new js__$Boot_HaxeError("FAIL: order >= 1");
	this.order = order;
	this.smoothing = smoothing;
	this.models = [];
	var letters = lycan_util__$ArraySet_ArraySet_$Impl_$.create();
	var _g = 0;
	while(_g < data.length) {
		var d = data[_g];
		++_g;
		var _g2 = 0;
		var _g1 = d.length;
		while(_g2 < _g1) {
			var i = _g2++;
			lycan_util__$ArraySet_ArraySet_$Impl_$.add(letters,d.charAt(i));
		}
	}
	letters.sort(function(a,b) {
		if(a < b) return -1;
		if(a > b) return 1;
		return 0;
	});
	var domain = lycan_util__$ArraySet_ArraySet_$Impl_$.toArray(letters);
	domain.splice(0,0,"#");
	var _g3 = 0;
	while(_g3 < order) {
		var i1 = _g3++;
		this.models.push(new lycan_util_namegen_Model(data.slice(),order - i1,smoothing,domain));
	}
};
lycan_util_namegen_Generator.__name__ = true;
lycan_util_namegen_Generator.prototype = {
	generate: function() {
		var name = lycan_util_StringExtensions.repeat("#",this.order);
		var letter = this.getLetter(name);
		while(letter != "#") {
			if(letter != null) name += letter;
			letter = this.getLetter(name);
		}
		return name;
	}
	,getLetter: function(name) {
		var letter = null;
		var context = name.substring(name.length - this.order,name.length);
		var _g = 0;
		var _g1 = this.models;
		while(_g < _g1.length) {
			var model = _g1[_g];
			++_g;
			letter = model.generate(context);
			if(letter == null) context = context.substring(1); else break;
		}
		return letter;
	}
};
var lycan_util_namegen_Model = function(data,order,smoothing,domain) {
	if(!(domain != null && data != null)) throw new js__$Boot_HaxeError("FAIL: domain != null && data != null");
	if(!(domain.length > 0 && data.length > 0)) throw new js__$Boot_HaxeError("FAIL: domain.length > 0 && data.length > 0");
	if(!(smoothing >= 0 && smoothing <= 1)) throw new js__$Boot_HaxeError("FAIL: smoothing >= 0 && smoothing <= 1");
	if(!(order > 0)) throw new js__$Boot_HaxeError("FAIL: order > 0");
	this.order = order;
	this.smoothing = smoothing;
	this.domain = domain;
	this.observations = new haxe_ds_StringMap();
	this.train(data);
	this.rebuildChains();
};
lycan_util_namegen_Model.__name__ = true;
lycan_util_namegen_Model.prototype = {
	retrain: function(data) {
		if(!(data != null)) throw new js__$Boot_HaxeError("FAIL: data != null");
		this.train(data);
		this.rebuildChains();
	}
	,train: function(data) {
		while(data.length != 0) {
			var d = data.pop();
			d = lycan_util_StringExtensions.repeat("#",this.order) + d + "#";
			var _g1 = 0;
			var _g = d.length - this.order;
			while(_g1 < _g) {
				var i = _g1++;
				var key = d.substring(i,i + this.order);
				var value = this.observations.get(key);
				if(value == null) {
					value = [];
					this.observations.set(key,value);
				}
				value.push(d.charAt(i + this.order));
			}
		}
	}
	,rebuildChains: function() {
		this.chains = new haxe_ds_StringMap();
		var $it0 = this.observations.keys();
		while( $it0.hasNext() ) {
			var context = $it0.next();
			var _g = 0;
			var _g1 = this.domain;
			while(_g < _g1.length) {
				var prediction = _g1[_g];
				++_g;
				var value = this.chains.get(context);
				if(value == null) {
					value = [];
					this.chains.set(context,value);
				}
				value.push(this.smoothing + this.countMatches(this.observations.get(context),prediction));
			}
		}
	}
	,generate: function(context) {
		if(!(context != null)) throw new js__$Boot_HaxeError("FAIL: context != null");
		var chain = this.chains.get(context);
		if(chain == null) return null; else {
			if(!(chain.length > 0)) throw new js__$Boot_HaxeError("FAIL: chain.length > 0");
			return this.domain[this.selectIndex(chain)];
		}
	}
	,countMatches: function(arr,v) {
		if(arr == null) return 0;
		var i = 0;
		var _g = 0;
		while(_g < arr.length) {
			var s = arr[_g];
			++_g;
			if(s == v) i++;
		}
		return i;
	}
	,selectIndex: function(chain) {
		var totals = [];
		var accumulator = 0;
		var _g = 0;
		while(_g < chain.length) {
			var weight = chain[_g];
			++_g;
			accumulator += weight;
			totals.push(accumulator);
		}
		var rand = Math.random() * accumulator;
		var _g1 = 0;
		var _g2 = totals.length;
		while(_g1 < _g2) {
			var i = _g1++;
			if(rand < totals[i]) return i;
		}
		return 0;
	}
};
var lycan_util_namegen_NameGenerator = function(data,order,smoothing) {
	var names = [];
	var _g = 0;
	while(_g < data.length) {
		var name = data[_g];
		++_g;
		names.push(name.name.toLowerCase());
	}
	lycan_util_namegen_Generator.call(this,names,order,smoothing);
};
lycan_util_namegen_NameGenerator.__name__ = true;
lycan_util_namegen_NameGenerator.__super__ = lycan_util_namegen_Generator;
lycan_util_namegen_NameGenerator.prototype = $extend(lycan_util_namegen_Generator.prototype,{
	generateName: function(minLength,maxLength,includes,excludes,maxAttempts) {
		if(maxAttempts == null) maxAttempts = 100;
		var name = "";
		var attempts = 0;
		while(attempts < maxAttempts) {
			name = this.generate();
			name = StringTools.replace(name,"#","");
			if(name.length >= minLength && name.length <= maxLength && name.indexOf(includes) >= 0 && name.indexOf(excludes) >= 0) return name;
			attempts++;
		}
		return name;
	}
	,generateNames: function(n,minLength,maxLength,includes,excludes,maxAttempts) {
		if(maxAttempts == null) maxAttempts = 100;
		var names = [];
		var _g = 0;
		while(_g < n) {
			var i = _g++;
			names.push(this.generateName(minLength,maxLength,includes,excludes,maxAttempts));
		}
		return names;
	}
});
var lycan_util_namegen_Tag = { __ename__ : true, __constructs__ : ["VAMPIRES","FUNNY","BRITISH","CHINESE","JAPANESE","INDIAN","AUSTRALIAN","RUSSIAN","ITALIAN","CHRISTMAS","EGYPTIAN","FRENCH","CHRISTIAN","RICH","POOR","MILITARY"] };
lycan_util_namegen_Tag.VAMPIRES = ["VAMPIRES",0];
lycan_util_namegen_Tag.VAMPIRES.toString = $estr;
lycan_util_namegen_Tag.VAMPIRES.__enum__ = lycan_util_namegen_Tag;
lycan_util_namegen_Tag.FUNNY = ["FUNNY",1];
lycan_util_namegen_Tag.FUNNY.toString = $estr;
lycan_util_namegen_Tag.FUNNY.__enum__ = lycan_util_namegen_Tag;
lycan_util_namegen_Tag.BRITISH = ["BRITISH",2];
lycan_util_namegen_Tag.BRITISH.toString = $estr;
lycan_util_namegen_Tag.BRITISH.__enum__ = lycan_util_namegen_Tag;
lycan_util_namegen_Tag.CHINESE = ["CHINESE",3];
lycan_util_namegen_Tag.CHINESE.toString = $estr;
lycan_util_namegen_Tag.CHINESE.__enum__ = lycan_util_namegen_Tag;
lycan_util_namegen_Tag.JAPANESE = ["JAPANESE",4];
lycan_util_namegen_Tag.JAPANESE.toString = $estr;
lycan_util_namegen_Tag.JAPANESE.__enum__ = lycan_util_namegen_Tag;
lycan_util_namegen_Tag.INDIAN = ["INDIAN",5];
lycan_util_namegen_Tag.INDIAN.toString = $estr;
lycan_util_namegen_Tag.INDIAN.__enum__ = lycan_util_namegen_Tag;
lycan_util_namegen_Tag.AUSTRALIAN = ["AUSTRALIAN",6];
lycan_util_namegen_Tag.AUSTRALIAN.toString = $estr;
lycan_util_namegen_Tag.AUSTRALIAN.__enum__ = lycan_util_namegen_Tag;
lycan_util_namegen_Tag.RUSSIAN = ["RUSSIAN",7];
lycan_util_namegen_Tag.RUSSIAN.toString = $estr;
lycan_util_namegen_Tag.RUSSIAN.__enum__ = lycan_util_namegen_Tag;
lycan_util_namegen_Tag.ITALIAN = ["ITALIAN",8];
lycan_util_namegen_Tag.ITALIAN.toString = $estr;
lycan_util_namegen_Tag.ITALIAN.__enum__ = lycan_util_namegen_Tag;
lycan_util_namegen_Tag.CHRISTMAS = ["CHRISTMAS",9];
lycan_util_namegen_Tag.CHRISTMAS.toString = $estr;
lycan_util_namegen_Tag.CHRISTMAS.__enum__ = lycan_util_namegen_Tag;
lycan_util_namegen_Tag.EGYPTIAN = ["EGYPTIAN",10];
lycan_util_namegen_Tag.EGYPTIAN.toString = $estr;
lycan_util_namegen_Tag.EGYPTIAN.__enum__ = lycan_util_namegen_Tag;
lycan_util_namegen_Tag.FRENCH = ["FRENCH",11];
lycan_util_namegen_Tag.FRENCH.toString = $estr;
lycan_util_namegen_Tag.FRENCH.__enum__ = lycan_util_namegen_Tag;
lycan_util_namegen_Tag.CHRISTIAN = ["CHRISTIAN",12];
lycan_util_namegen_Tag.CHRISTIAN.toString = $estr;
lycan_util_namegen_Tag.CHRISTIAN.__enum__ = lycan_util_namegen_Tag;
lycan_util_namegen_Tag.RICH = ["RICH",13];
lycan_util_namegen_Tag.RICH.toString = $estr;
lycan_util_namegen_Tag.RICH.__enum__ = lycan_util_namegen_Tag;
lycan_util_namegen_Tag.POOR = ["POOR",14];
lycan_util_namegen_Tag.POOR.toString = $estr;
lycan_util_namegen_Tag.POOR.__enum__ = lycan_util_namegen_Tag;
lycan_util_namegen_Tag.MILITARY = ["MILITARY",15];
lycan_util_namegen_Tag.MILITARY.toString = $estr;
lycan_util_namegen_Tag.MILITARY.__enum__ = lycan_util_namegen_Tag;
var lycan_util_namegen_Gender = { __ename__ : true, __constructs__ : ["MASCULINE","FEMININE","NEUTER"] };
lycan_util_namegen_Gender.MASCULINE = ["MASCULINE",0];
lycan_util_namegen_Gender.MASCULINE.toString = $estr;
lycan_util_namegen_Gender.MASCULINE.__enum__ = lycan_util_namegen_Gender;
lycan_util_namegen_Gender.FEMININE = ["FEMININE",1];
lycan_util_namegen_Gender.FEMININE.toString = $estr;
lycan_util_namegen_Gender.FEMININE.__enum__ = lycan_util_namegen_Gender;
lycan_util_namegen_Gender.NEUTER = ["NEUTER",2];
lycan_util_namegen_Gender.NEUTER.toString = $estr;
lycan_util_namegen_Gender.NEUTER.__enum__ = lycan_util_namegen_Gender;
var lycan_util_namegen_Names = function() { };
lycan_util_namegen_Names.__name__ = true;
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.__name__ = true;
Array.__name__ = true;
var __map_reserved = {}
Main.REPO_URL = "https://github.com/Tw1ddle/MarkovNameGenerator";
Main.TWITTER_URL = "https://twitter.com/Sam_Twidale";
Main.WEBSITE_URL = "http://samcodes.co.uk/";
Main.HAXE_URL = "http://haxe.org/";
js_d3__$D3_InitPriority.important = "important";
lycan_util_namegen_Names.titles = [{ name : "Mr", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Mrs", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Miss", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Archpriest", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Bishop", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Vicar", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Baron", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Baroness", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Count", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Corporal", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Private", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Field Marshal", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Governor", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Lady", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Lord", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Professor", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Reverend", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Sergeant", gender : lycan_util_namegen_Gender.NEUTER}];
lycan_util_namegen_Names.vampireForenames = [{ name : "Bella", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Edward", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Jacob", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Carlisle", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Emmett", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Nessie", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Armand", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Claudia", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Louis", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Lestat", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Mina", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Akasha", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Angel", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Dusk", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Eli", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Eric", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Irina", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Lilith", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Mekare", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Priscilla", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Remilia", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Santiago", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Thistle", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Vladimir", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Yaksha", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Alucard", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "D", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Eli", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Ivan", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Judas", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Karin", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Magister", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Mina", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Arcueid", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Carmilla", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Harkon", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Sion", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Nora", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Rakshasa", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Alessandro", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Ambrogio", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Selene", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Celeste", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Vincent", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Winter", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Blade", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Spike", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Caine", gender : lycan_util_namegen_Gender.MASCULINE}];
lycan_util_namegen_Names.vampireSurnames = [{ name : "Swan", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Cullen", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Northman", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Scarlet", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Blackbourne", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Waldorf", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Barlow", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Salem", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Blake", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Night", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Fitzroy", gender : lycan_util_namegen_Gender.NEUTER},{ name : "deLioncourt", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Blackthorn", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Souen", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Tod", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Lafitte", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Damaskinos", gender : lycan_util_namegen_Gender.NEUTER},{ name : "LaCroix", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Valentine", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Bathory", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Sanguina", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Giovanni", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Brunestud", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Lecarde", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Bernhard", gender : lycan_util_namegen_Gender.NEUTER}];
lycan_util_namegen_Names.armyForenames = [{ name : "Ace", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Bravo", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Gunnar", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Lance", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Mace", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Stryker", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Victor", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Lightning Joe", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Little Mac", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Chick", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Birdy", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Blondie", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Fuzzy", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Armee", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Delta", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Grace", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Justice", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Knox", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Cannon", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Garrison", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Gunther", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Abrams", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Claymore", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Barrett", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Cadence", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Vittoria", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Bradley", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Sloane", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Cadette", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Navy", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Harlow", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Wolfgang", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Wyatt", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Balder", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Lionheart", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Marshall", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Scout", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Ryder", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Gatlen", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Miles", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Hunter", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Chase", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Maverick", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Jett", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Beretta", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Blaze", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Danger", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Steele", gender : lycan_util_namegen_Gender.FEMININE}];
lycan_util_namegen_Names.armySurnames = [{ name : "Sargent", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Knight", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Hartman", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Brandt", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Ritter", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Wehrman", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Stal", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Krieger", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Major", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Hauptmann", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Brannigan", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Armstrong", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Anderson", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Hoffman", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Roediger", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Warner", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Wesse", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Custer", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Sharpe", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Pratt", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Havelock", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Richthofen", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Petraeus", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Nelson", gender : lycan_util_namegen_Gender.NEUTER},{ name : "MacArthur", gender : lycan_util_namegen_Gender.NEUTER}];
lycan_util_namegen_Names.journoForenames = [{ name : "Jake", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Charles", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Glenn", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Megyn", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Walter", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Bill", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Sean", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Andrew", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Nick", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Ann", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Rachel", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Mary", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Evan", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Laura", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Jon", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Evan", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Anderson", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Ezra", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Chuck", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Arianna", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Chris", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Paul", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Wolf", gender : lycan_util_namegen_Gender.MASCULINE}];
lycan_util_namegen_Names.journoSurnames = [{ name : "Cronkite", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Blitzer", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Cooper", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Huffington", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Theroux", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Woolf", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Hannity", gender : lycan_util_namegen_Gender.NEUTER},{ name : "OReilly", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Limbaugh", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Beck", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Robinson", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Marr", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Davis", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Neil", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Snow", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Maddow", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Stephanopoulos", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Hayes", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Kelly", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Todd", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Klein", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Tapper", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Woodward", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Malcolm", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Napolitano", gender : lycan_util_namegen_Gender.NEUTER}];
lycan_util_namegen_Names.alienForenames = [{ name : "Spock", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Mork", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Alf", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Worf", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Clark", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Seven", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Kryton", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Elim", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Kang", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Kodos", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Zim", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Zaphod", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Zeebo", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "JeanLuc", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Beldar", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Q", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Diana", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Klaatu", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Chiana", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Gorn", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Rygel", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Oola", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Xev", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Gaila", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Leeloo", gender : lycan_util_namegen_Gender.FEMININE}];
lycan_util_namegen_Names.alienSurnames = [{ name : "Beeblebrox", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Kaypax", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Catbug", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Grey", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Green", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Auton", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Vogan", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Adric", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Kent", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Oddworld", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Roswell", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Gravemind", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Vortigaunt", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Qwark", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Gwoth", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Ranzz", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Celes", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Borg", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Sarlacc", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Vulcan", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Zerg", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Protoss", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Dokachin", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Frobisher", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Zoidberg", gender : lycan_util_namegen_Gender.NEUTER}];
lycan_util_namegen_Names.richForenames = [{ name : "Verity", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Octavia", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Araminta", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Concetta", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Genevieve", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Ulysses", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Alexandra", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Vivienne", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Victoria", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Olivia", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Franchesca", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Isabelle", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Eleanor", gender : lycan_util_namegen_Gender.FEMININE},{ name : "JeanLuc", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Penelope", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Phoebe", gender : lycan_util_namegen_Gender.FEMININE},{ name : "Abraham", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Franklin", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Herbert", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Carson", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Sterling", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Montahue", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Sebastian", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Demitrius", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Lawrence", gender : lycan_util_namegen_Gender.MASCULINE}];
lycan_util_namegen_Names.richSurnames = [{ name : "Gates", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Slim", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Buffett", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Ortega", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Ellison", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Koch", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Walton", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Bettencourt", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Bezos", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Zuckerberg", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Kamprad", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Page", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Bloomberg", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Ballmer", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Paulson", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Baldwin", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Goldberg", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Archibald", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Livingston", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Montgomery", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Trump", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Richmond", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Billings", gender : lycan_util_namegen_Gender.NEUTER},{ name : "Hillaire", gender : lycan_util_namegen_Gender.NEUTER},{ name : "DuPont", gender : lycan_util_namegen_Gender.NEUTER}];
lycan_util_namegen_Names.elfForenames = [{ name : "Amras", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Celebrian", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Curufin", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Eol", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Ecthelion", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Indis", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Llewelyn", gender : lycan_util_namegen_Gender.MASCULINE},{ name : "Methild", gender : lycan_util_namegen_Gender.MASCULINE}];
lycan_util_namegen_Names.elfSurnames = [];
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});

//# sourceMappingURL=game.js.map