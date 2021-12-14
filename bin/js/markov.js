(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.now = function() {
	return Date.now();
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.fold = function(it,f,first) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		first = f(x1,first);
	}
	return first;
};
var ID = function() { };
ID.__name__ = true;
var Main = function() {
	this.lastGeneratedNames = [];
	this.shareLinkTextEdit = window.document.getElementById("shareedit");
	this.shareResultsOnlyElement = window.document.getElementById("shareresultsonly");
	this.shareResultsAndSettingsElement = window.document.getElementById("shareresultsandsettings");
	this.regexMatchElement = window.document.getElementById("regexmatch");
	this.similarElement = window.document.getElementById("similar");
	this.excludesElement = window.document.getElementById("excludes");
	this.includesElement = window.document.getElementById("includes");
	this.endsWithElement = window.document.getElementById("endswith");
	this.startsWithElement = window.document.getElementById("startswith");
	this.lengthElement = window.document.getElementById("minmaxlength");
	this.namesTitleElement = window.document.getElementById("namestitle");
	this.doubleRandomThemeElement = window.document.getElementById("randomthemetwo");
	this.singleRandomThemeElement = window.document.getElementById("randomthemeone");
	this.generateElement = window.document.getElementById("generate");
	this.currentNamesElement = window.document.getElementById("currentnames");
	this.noNamesFoundElement = window.document.getElementById("nonamesfound");
	this.maxProcessingTimeElement = window.document.getElementById("maxtime");
	this.maxWordsToGenerateElement = window.document.getElementById("maxwordstogenerate");
	this.backoffElement = window.document.getElementById("backoff");
	this.priorElement = window.document.getElementById("prior");
	this.orderElement = window.document.getElementById("order");
	this.trainingDataTextEdit = window.document.getElementById("trainingdataedit");
	this.nameDataPresetCheckboxElements = [];
	this.nameDataPresetCheckboxContainer = window.document.getElementById("trainingdataselectioncheckboxes");
	this.nameDataDataListElement = window.document.getElementById("namedatapresetslist");
	this.nameDataCombinationModeListElement = window.document.getElementById("trainingdatacombinationmodelist");
	this.nameDataSearchBoxElement = window.document.getElementById("trainingdatasearchbox");
	this.nameDataPresetListElement = window.document.getElementById("trainingdatalist");
	window.onload = $bind(this,this.onWindowLoaded);
};
Main.__name__ = true;
Main.getElement = function(id) {
	return window.document.getElementById(id);
};
Main.main = function() {
	var main = new Main();
};
Main.prototype = {
	onWindowLoaded: function() {
		var makeOption = function(displayName) {
			var option = window.document.createElement("option");
			option.appendChild(window.document.createTextNode(displayName));
			option.value = displayName;
			return option;
		};
		this.nameDataCombinationModeListElement.appendChild(makeOption("Append Entire Datasets"));
		this.nameDataCombinationModeListElement.appendChild(makeOption("Join Individual Words"));
		var params = window.location.search.substring(1);
		if(!(params == null || params == "")) {
			TrainingData["custom"] = [];
		}
		var fields = Type.getClassFields(TrainingData);
		fields.sort(function(a,b) {
			var str = StringTools.replace(a,"_"," ");
			if(str == null) {
				throw haxe_Exception.thrown("FAIL: str != null");
			}
			var parts = str.split(" ");
			var results = "";
			var _g = 0;
			var _g1 = parts.length;
			while(_g < _g1) {
				var i = _g++;
				var str = parts[i];
				if(!(str != null && str.length > 0)) {
					throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
				}
				results += HxOverrides.substr(str,0,1).toUpperCase() + HxOverrides.substr(str,1,str.length - 1);
				if(i <= parts.length - 1) {
					results += " ";
				}
			}
			var first = StringTools.trim(results).toLowerCase();
			var str = StringTools.replace(b,"_"," ");
			if(str == null) {
				throw haxe_Exception.thrown("FAIL: str != null");
			}
			var parts = str.split(" ");
			var results = "";
			var _g = 0;
			var _g1 = parts.length;
			while(_g < _g1) {
				var i = _g++;
				var str = parts[i];
				if(!(str != null && str.length > 0)) {
					throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
				}
				results += HxOverrides.substr(str,0,1).toUpperCase() + HxOverrides.substr(str,1,str.length - 1);
				if(i <= parts.length - 1) {
					results += " ";
				}
			}
			var second = StringTools.trim(results).toLowerCase();
			if(first < second) {
				return -1;
			} else if(first > second) {
				return 1;
			}
			return 0;
		});
		this.topicSearchTrie = new markov_util_PrefixTrie();
		var _g = 0;
		while(_g < fields.length) {
			var field = fields[_g];
			++_g;
			var str = StringTools.replace(field,"_"," ");
			if(str == null) {
				throw haxe_Exception.thrown("FAIL: str != null");
			}
			var parts = str.split(" ");
			var results = "";
			var _g1 = 0;
			var _g11 = parts.length;
			while(_g1 < _g11) {
				var i = _g1++;
				var str1 = parts[i];
				if(!(str1 != null && str1.length > 0)) {
					throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
				}
				results += HxOverrides.substr(str1,0,1).toUpperCase() + HxOverrides.substr(str1,1,str1.length - 1);
				if(i <= parts.length - 1) {
					results += " ";
				}
			}
			var displayName = [StringTools.trim(results)];
			var makeOption = (function(displayName) {
				return function() {
					var option = window.document.createElement("option");
					option.appendChild(window.document.createTextNode(displayName[0]));
					option.value = displayName[0];
					return option;
				};
			})(displayName);
			this.nameDataPresetListElement.appendChild(makeOption());
			this.nameDataDataListElement.appendChild(makeOption());
			this.addTrainingDataSelectionCheckboxes(displayName[0]);
			this.topicSearchTrie.insert(displayName[0]);
		}
		this.set_trainingDataKeys(["Animals"]);
		this.maxWordsToGenerate = 100;
		this.minLength = 5;
		this.maxLength = 11;
		this.order = 3;
		this.prior = 0.0;
		this.backoff = 0;
		this.maxProcessingTime = 800;
		this.set_startsWith("");
		this.set_endsWith("");
		this.set_includes("");
		this.set_excludes("");
		this.set_similar("");
		this.set_regexMatch("");
		ShareResults.applySettings(this);
		var _gthis = this;
		noUiSlider.create(this.lengthElement,{ start : [this.minLength,this.maxLength], connect : true, range : { "min" : [2,1], "max" : 25}, pips : { mode : "range", density : 10}});
		this.createTooltips(this.lengthElement);
		this.lengthElement.noUiSlider.on("change",function(values,handle,rawValues) {
			if(handle == 0) {
				_gthis.minLength = values[handle] | 0;
			} else if(handle == 1) {
				_gthis.maxLength = values[handle] | 0;
			}
		});
		this.lengthElement.noUiSlider.on("update",function(values,handle,rawValues) {
			_gthis.updateTooltips(_gthis.lengthElement,handle,values[handle] | 0);
		});
		noUiSlider.create(this.orderElement,{ start : [this.order], connect : "lower", range : { "min" : [1,1], "max" : [9]}, pips : { mode : "range", density : 10}});
		this.createTooltips(this.orderElement);
		this.orderElement.noUiSlider.on("change",function(values,handle,rawValues) {
			return _gthis.order = values[handle] | 0;
		});
		this.orderElement.noUiSlider.on("update",function(values,handle,rawValues) {
			_gthis.updateTooltips(_gthis.orderElement,handle,values[handle] | 0);
		});
		noUiSlider.create(this.priorElement,{ start : [this.prior], connect : "lower", range : { "min" : 0.001, "50%" : 0.025, "max" : 0.05}, pips : { mode : "range", density : 10, format : new wNumb({ decimals : 3})}});
		this.createTooltips(this.priorElement);
		this.priorElement.noUiSlider.on("change",function(values,handle,rawValues) {
			return _gthis.prior = parseFloat(values[handle]);
		});
		this.priorElement.noUiSlider.on("update",function(values,handle,rawValues) {
			_gthis.updateTooltips(_gthis.priorElement,handle,values[handle]);
		});
		noUiSlider.create(this.backoffElement,{ start : [this.backoff], connect : "lower", range : { "min" : [0,1], "max" : [1]}, format : new wNumb({ decimals : 0})});
		this.createTooltips(this.backoffElement);
		this.backoffElement.noUiSlider.on("change",function(values,handle,rawValues) {
			return _gthis.backoff = Std.parseInt(values[handle]);
		});
		this.backoffElement.noUiSlider.on("update",function(values,handle,rawValues) {
			_gthis.updateTooltips(_gthis.backoffElement,handle,values[handle]);
		});
		noUiSlider.create(this.maxWordsToGenerateElement,{ start : [100], connect : "lower", range : { "min" : 20, "max" : 1000}, pips : { mode : "range", density : 10, format : new wNumb({ decimals : 0})}});
		this.createTooltips(this.maxWordsToGenerateElement);
		this.maxWordsToGenerateElement.noUiSlider.on("change",function(values,handle,rawValues) {
			return _gthis.maxWordsToGenerate = Std.parseInt(values[handle]);
		});
		this.maxWordsToGenerateElement.noUiSlider.on("update",function(values,handle,rawValues) {
			_gthis.updateTooltips(_gthis.maxWordsToGenerateElement,handle,values[handle] | 0);
		});
		noUiSlider.create(this.maxProcessingTimeElement,{ start : [this.maxProcessingTime], connect : "lower", range : { "min" : 50, "max" : 5000}, pips : { mode : "range", density : 10, format : new wNumb({ decimals : 0})}});
		this.createTooltips(this.maxProcessingTimeElement);
		this.maxProcessingTimeElement.noUiSlider.on("change",function(values,handle,rawValues) {
			return _gthis.maxProcessingTime = Std.parseInt(values[handle]);
		});
		this.maxProcessingTimeElement.noUiSlider.on("update",function(values,handle,rawValues) {
			_gthis.updateTooltips(_gthis.maxProcessingTimeElement,handle,values[handle] | 0);
		});
		var _gthis1 = this;
		this.nameDataPresetListElement.addEventListener("change",function() {
			_gthis1.set_trainingDataKeys([_gthis1.nameDataPresetListElement.value]);
		},false);
		this.nameDataSearchBoxElement.addEventListener("change",function() {
			if(_gthis1.topicSearchTrie.find(_gthis1.nameDataSearchBoxElement.value)) {
				_gthis1.set_trainingDataKeys([_gthis1.nameDataSearchBoxElement.value]);
			}
		},false);
		this.nameDataSearchBoxElement.addEventListener("input",function() {
			if(_gthis1.topicSearchTrie.find(_gthis1.nameDataSearchBoxElement.value)) {
				_gthis1.set_trainingDataKeys([_gthis1.nameDataSearchBoxElement.value]);
			}
		},false);
		this.nameDataCombinationModeListElement.addEventListener("change",function() {
			_gthis1.set_trainingDataKeys(_gthis1.get_trainingDataKeys());
		},false);
		var _g = 0;
		var _g1 = this.nameDataPresetCheckboxElements;
		while(_g < _g1.length) {
			var nameDataPresetCheckbox = _g1[_g];
			++_g;
			nameDataPresetCheckbox.addEventListener("change",function() {
				_gthis1.set_trainingDataKeys(_gthis1.get_trainingDataKeys());
			},false);
		}
		this.trainingDataTextEdit.addEventListener("change",function() {
			var arr = StringTools.replace(StringTools.replace(_gthis1.trainingDataTextEdit.value,"\r\n"," "),"\n"," ").split(" ");
			if(!(arr == null || arr.length == 0)) {
				var presetNames = _gthis1.get_trainingDataKeys();
				var title = "";
				var _g = 0;
				var _g1 = presetNames.length;
				while(_g < _g1) {
					var i = _g++;
					title += presetNames[i];
					if(presetNames.length != 1 && i != presetNames.length - 1) {
						title += " & ";
					}
				}
				_gthis1.namesTitleElement.innerHTML = title;
				var dataSets = new haxe_ds_IntMap();
				var dataSetCount = 0;
				var _g = 0;
				while(_g < arr.length) {
					var item = arr[_g];
					++_g;
					var parts = item.split("_");
					var _g1 = 0;
					var _g2 = parts.length;
					while(_g1 < _g2) {
						var i = _g1++;
						if(!dataSets.h.hasOwnProperty(i)) {
							var value = markov_util_ArraySet.create();
							dataSets.h[i] = value;
							++dataSetCount;
						}
						markov_util_ArraySet.add(dataSets.h[i],parts[i]);
					}
				}
				var processingTimePerSet = dataSetCount > 0 ? _gthis1.maxProcessingTime / dataSetCount : 0;
				var generatedNameSets = [];
				var dataSet = dataSets.iterator();
				while(dataSet.hasNext()) {
					var dataSet1 = dataSet.next();
					var data = markov_util_ArraySet.toArray(dataSet1);
					var tmp;
					if(data == null || data.length == 0) {
						tmp = [];
					} else {
						var duplicateTrie = new markov_util_PrefixTrie();
						var _g = 0;
						while(_g < data.length) {
							var name = data[_g];
							++_g;
							duplicateTrie.insert(name);
						}
						var generator = new markov_namegen_NameGenerator(data,_gthis1.order,_gthis1.prior,_gthis1.backoff == 0 ? false : true);
						var names = [];
						var startTime = new Date().getTime();
						var currentTime = new Date().getTime();
						var regex = _gthis1.get_regexMatch() == "" ? null : new EReg(_gthis1.get_regexMatch(),"i");
						while(names.length < _gthis1.maxWordsToGenerate && currentTime < startTime + processingTimePerSet) {
							var name1 = generator.generateName(_gthis1.minLength,_gthis1.maxLength,_gthis1.get_startsWith(),_gthis1.get_endsWith(),_gthis1.get_includes(),_gthis1.get_excludes(),regex);
							if(name1 != null && !duplicateTrie.find(name1)) {
								names.push(name1);
								duplicateTrie.insert(name1);
							}
							currentTime = new Date().getTime();
						}
						tmp = names;
					}
					generatedNameSets.push(tmp);
				}
				if(generatedNameSets.length == 1) {
					var names = generatedNameSets[0];
					var _gthis = _gthis1;
					_gthis1.lastGeneratedNames = names;
					if(_gthis1.get_similar().length > 0) {
						names.sort(function(x,y) {
							var target = _gthis.get_similar();
							if(x == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var xSimilarity;
							if(x.length == 0) {
								xSimilarity = target.length;
							} else if(target.length == 0) {
								xSimilarity = x.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
								xSimilarity = table[table.length - 1];
							}
							var target = _gthis.get_similar();
							if(y == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var ySimilarity;
							if(y.length == 0) {
								ySimilarity = target.length;
							} else if(target.length == 0) {
								ySimilarity = y.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
								ySimilarity = table[table.length - 1];
							}
							if(xSimilarity > ySimilarity) {
								return 1;
							} else if(xSimilarity < ySimilarity) {
								return -1;
							} else {
								return 0;
							}
						});
					}
					_gthis1.noNamesFoundElement.innerHTML = "";
					_gthis1.currentNamesElement.innerHTML = "";
					if(names.length == 0) {
						_gthis1.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
					}
					var _g = 0;
					while(_g < names.length) {
						var name = names[_g];
						++_g;
						var li = window.document.createElement("li");
						if(!(name != null && name.length > 0)) {
							throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
						}
						li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
						_gthis1.currentNamesElement.appendChild(li);
					}
				} else {
					var recombinedNames = [];
					var _g = 0;
					var _g1 = _gthis1.maxWordsToGenerate;
					while(_g < _g1) {
						var wordIdx = _g++;
						var name = "";
						var _g2 = 0;
						while(_g2 < generatedNameSets.length) {
							var set = generatedNameSets[_g2];
							++_g2;
							if(wordIdx < set.length) {
								name += set[wordIdx];
								name += " ";
							}
						}
						name = StringTools.trim(name);
						if(name.length > 0) {
							recombinedNames.push(name);
						}
					}
					var _gthis2 = _gthis1;
					_gthis1.lastGeneratedNames = recombinedNames;
					if(_gthis1.get_similar().length > 0) {
						recombinedNames.sort(function(x,y) {
							var target = _gthis2.get_similar();
							if(x == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var xSimilarity;
							if(x.length == 0) {
								xSimilarity = target.length;
							} else if(target.length == 0) {
								xSimilarity = x.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
								xSimilarity = table[table.length - 1];
							}
							var target = _gthis2.get_similar();
							if(y == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var ySimilarity;
							if(y.length == 0) {
								ySimilarity = target.length;
							} else if(target.length == 0) {
								ySimilarity = y.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
								ySimilarity = table[table.length - 1];
							}
							if(xSimilarity > ySimilarity) {
								return 1;
							} else if(xSimilarity < ySimilarity) {
								return -1;
							} else {
								return 0;
							}
						});
					}
					_gthis1.noNamesFoundElement.innerHTML = "";
					_gthis1.currentNamesElement.innerHTML = "";
					if(recombinedNames.length == 0) {
						_gthis1.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
					}
					var _g = 0;
					while(_g < recombinedNames.length) {
						var name = recombinedNames[_g];
						++_g;
						var li = window.document.createElement("li");
						if(!(name != null && name.length > 0)) {
							throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
						}
						li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
						_gthis1.currentNamesElement.appendChild(li);
					}
				}
			}
		},false);
		this.generateElement.addEventListener("click",function() {
			var arr = StringTools.replace(StringTools.replace(_gthis1.trainingDataTextEdit.value,"\r\n"," "),"\n"," ").split(" ");
			if(!(arr == null || arr.length == 0)) {
				var presetNames = _gthis1.get_trainingDataKeys();
				var title = "";
				var _g = 0;
				var _g1 = presetNames.length;
				while(_g < _g1) {
					var i = _g++;
					title += presetNames[i];
					if(presetNames.length != 1 && i != presetNames.length - 1) {
						title += " & ";
					}
				}
				_gthis1.namesTitleElement.innerHTML = title;
				var dataSets = new haxe_ds_IntMap();
				var dataSetCount = 0;
				var _g = 0;
				while(_g < arr.length) {
					var item = arr[_g];
					++_g;
					var parts = item.split("_");
					var _g1 = 0;
					var _g2 = parts.length;
					while(_g1 < _g2) {
						var i = _g1++;
						if(!dataSets.h.hasOwnProperty(i)) {
							var value = markov_util_ArraySet.create();
							dataSets.h[i] = value;
							++dataSetCount;
						}
						markov_util_ArraySet.add(dataSets.h[i],parts[i]);
					}
				}
				var processingTimePerSet = dataSetCount > 0 ? _gthis1.maxProcessingTime / dataSetCount : 0;
				var generatedNameSets = [];
				var dataSet = dataSets.iterator();
				while(dataSet.hasNext()) {
					var dataSet1 = dataSet.next();
					var data = markov_util_ArraySet.toArray(dataSet1);
					var tmp;
					if(data == null || data.length == 0) {
						tmp = [];
					} else {
						var duplicateTrie = new markov_util_PrefixTrie();
						var _g = 0;
						while(_g < data.length) {
							var name = data[_g];
							++_g;
							duplicateTrie.insert(name);
						}
						var generator = new markov_namegen_NameGenerator(data,_gthis1.order,_gthis1.prior,_gthis1.backoff == 0 ? false : true);
						var names = [];
						var startTime = new Date().getTime();
						var currentTime = new Date().getTime();
						var regex = _gthis1.get_regexMatch() == "" ? null : new EReg(_gthis1.get_regexMatch(),"i");
						while(names.length < _gthis1.maxWordsToGenerate && currentTime < startTime + processingTimePerSet) {
							var name1 = generator.generateName(_gthis1.minLength,_gthis1.maxLength,_gthis1.get_startsWith(),_gthis1.get_endsWith(),_gthis1.get_includes(),_gthis1.get_excludes(),regex);
							if(name1 != null && !duplicateTrie.find(name1)) {
								names.push(name1);
								duplicateTrie.insert(name1);
							}
							currentTime = new Date().getTime();
						}
						tmp = names;
					}
					generatedNameSets.push(tmp);
				}
				if(generatedNameSets.length == 1) {
					var names = generatedNameSets[0];
					var _gthis = _gthis1;
					_gthis1.lastGeneratedNames = names;
					if(_gthis1.get_similar().length > 0) {
						names.sort(function(x,y) {
							var target = _gthis.get_similar();
							if(x == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var xSimilarity;
							if(x.length == 0) {
								xSimilarity = target.length;
							} else if(target.length == 0) {
								xSimilarity = x.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
								xSimilarity = table[table.length - 1];
							}
							var target = _gthis.get_similar();
							if(y == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var ySimilarity;
							if(y.length == 0) {
								ySimilarity = target.length;
							} else if(target.length == 0) {
								ySimilarity = y.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
								ySimilarity = table[table.length - 1];
							}
							if(xSimilarity > ySimilarity) {
								return 1;
							} else if(xSimilarity < ySimilarity) {
								return -1;
							} else {
								return 0;
							}
						});
					}
					_gthis1.noNamesFoundElement.innerHTML = "";
					_gthis1.currentNamesElement.innerHTML = "";
					if(names.length == 0) {
						_gthis1.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
					}
					var _g = 0;
					while(_g < names.length) {
						var name = names[_g];
						++_g;
						var li = window.document.createElement("li");
						if(!(name != null && name.length > 0)) {
							throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
						}
						li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
						_gthis1.currentNamesElement.appendChild(li);
					}
				} else {
					var recombinedNames = [];
					var _g = 0;
					var _g1 = _gthis1.maxWordsToGenerate;
					while(_g < _g1) {
						var wordIdx = _g++;
						var name = "";
						var _g2 = 0;
						while(_g2 < generatedNameSets.length) {
							var set = generatedNameSets[_g2];
							++_g2;
							if(wordIdx < set.length) {
								name += set[wordIdx];
								name += " ";
							}
						}
						name = StringTools.trim(name);
						if(name.length > 0) {
							recombinedNames.push(name);
						}
					}
					var _gthis2 = _gthis1;
					_gthis1.lastGeneratedNames = recombinedNames;
					if(_gthis1.get_similar().length > 0) {
						recombinedNames.sort(function(x,y) {
							var target = _gthis2.get_similar();
							if(x == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var xSimilarity;
							if(x.length == 0) {
								xSimilarity = target.length;
							} else if(target.length == 0) {
								xSimilarity = x.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
								xSimilarity = table[table.length - 1];
							}
							var target = _gthis2.get_similar();
							if(y == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var ySimilarity;
							if(y.length == 0) {
								ySimilarity = target.length;
							} else if(target.length == 0) {
								ySimilarity = y.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
								ySimilarity = table[table.length - 1];
							}
							if(xSimilarity > ySimilarity) {
								return 1;
							} else if(xSimilarity < ySimilarity) {
								return -1;
							} else {
								return 0;
							}
						});
					}
					_gthis1.noNamesFoundElement.innerHTML = "";
					_gthis1.currentNamesElement.innerHTML = "";
					if(recombinedNames.length == 0) {
						_gthis1.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
					}
					var _g = 0;
					while(_g < recombinedNames.length) {
						var name = recombinedNames[_g];
						++_g;
						var li = window.document.createElement("li");
						if(!(name != null && name.length > 0)) {
							throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
						}
						li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
						_gthis1.currentNamesElement.appendChild(li);
					}
				}
			}
		},false);
		this.singleRandomThemeElement.addEventListener("click",function() {
			var topics = Type.getClassFields(TrainingData);
			var keys = [];
			var _g = 0;
			var _g1 = 1;
			while(_g < _g1) {
				var i = _g++;
				var str = StringTools.replace(topics[Std.random(topics.length)],"_"," ");
				if(str == null) {
					throw haxe_Exception.thrown("FAIL: str != null");
				}
				var parts = str.split(" ");
				var results = "";
				var _g2 = 0;
				var _g11 = parts.length;
				while(_g2 < _g11) {
					var i1 = _g2++;
					var str1 = parts[i1];
					if(!(str1 != null && str1.length > 0)) {
						throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
					}
					results += HxOverrides.substr(str1,0,1).toUpperCase() + HxOverrides.substr(str1,1,str1.length - 1);
					if(i1 <= parts.length - 1) {
						results += " ";
					}
				}
				keys.push(StringTools.trim(results));
			}
			_gthis1.set_trainingDataKeys(keys);
			var arr = StringTools.replace(StringTools.replace(_gthis1.trainingDataTextEdit.value,"\r\n"," "),"\n"," ").split(" ");
			if(!(arr == null || arr.length == 0)) {
				var presetNames = _gthis1.get_trainingDataKeys();
				var title = "";
				var _g = 0;
				var _g1 = presetNames.length;
				while(_g < _g1) {
					var i = _g++;
					title += presetNames[i];
					if(presetNames.length != 1 && i != presetNames.length - 1) {
						title += " & ";
					}
				}
				_gthis1.namesTitleElement.innerHTML = title;
				var dataSets = new haxe_ds_IntMap();
				var dataSetCount = 0;
				var _g = 0;
				while(_g < arr.length) {
					var item = arr[_g];
					++_g;
					var parts = item.split("_");
					var _g1 = 0;
					var _g2 = parts.length;
					while(_g1 < _g2) {
						var i = _g1++;
						if(!dataSets.h.hasOwnProperty(i)) {
							var value = markov_util_ArraySet.create();
							dataSets.h[i] = value;
							++dataSetCount;
						}
						markov_util_ArraySet.add(dataSets.h[i],parts[i]);
					}
				}
				var processingTimePerSet = dataSetCount > 0 ? _gthis1.maxProcessingTime / dataSetCount : 0;
				var generatedNameSets = [];
				var dataSet = dataSets.iterator();
				while(dataSet.hasNext()) {
					var dataSet1 = dataSet.next();
					var data = markov_util_ArraySet.toArray(dataSet1);
					var tmp;
					if(data == null || data.length == 0) {
						tmp = [];
					} else {
						var duplicateTrie = new markov_util_PrefixTrie();
						var _g = 0;
						while(_g < data.length) {
							var name = data[_g];
							++_g;
							duplicateTrie.insert(name);
						}
						var generator = new markov_namegen_NameGenerator(data,_gthis1.order,_gthis1.prior,_gthis1.backoff == 0 ? false : true);
						var names = [];
						var startTime = new Date().getTime();
						var currentTime = new Date().getTime();
						var regex = _gthis1.get_regexMatch() == "" ? null : new EReg(_gthis1.get_regexMatch(),"i");
						while(names.length < _gthis1.maxWordsToGenerate && currentTime < startTime + processingTimePerSet) {
							var name1 = generator.generateName(_gthis1.minLength,_gthis1.maxLength,_gthis1.get_startsWith(),_gthis1.get_endsWith(),_gthis1.get_includes(),_gthis1.get_excludes(),regex);
							if(name1 != null && !duplicateTrie.find(name1)) {
								names.push(name1);
								duplicateTrie.insert(name1);
							}
							currentTime = new Date().getTime();
						}
						tmp = names;
					}
					generatedNameSets.push(tmp);
				}
				if(generatedNameSets.length == 1) {
					var names = generatedNameSets[0];
					var _gthis = _gthis1;
					_gthis1.lastGeneratedNames = names;
					if(_gthis1.get_similar().length > 0) {
						names.sort(function(x,y) {
							var target = _gthis.get_similar();
							if(x == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var xSimilarity;
							if(x.length == 0) {
								xSimilarity = target.length;
							} else if(target.length == 0) {
								xSimilarity = x.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
								xSimilarity = table[table.length - 1];
							}
							var target = _gthis.get_similar();
							if(y == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var ySimilarity;
							if(y.length == 0) {
								ySimilarity = target.length;
							} else if(target.length == 0) {
								ySimilarity = y.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
								ySimilarity = table[table.length - 1];
							}
							if(xSimilarity > ySimilarity) {
								return 1;
							} else if(xSimilarity < ySimilarity) {
								return -1;
							} else {
								return 0;
							}
						});
					}
					_gthis1.noNamesFoundElement.innerHTML = "";
					_gthis1.currentNamesElement.innerHTML = "";
					if(names.length == 0) {
						_gthis1.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
					}
					var _g = 0;
					while(_g < names.length) {
						var name = names[_g];
						++_g;
						var li = window.document.createElement("li");
						if(!(name != null && name.length > 0)) {
							throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
						}
						li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
						_gthis1.currentNamesElement.appendChild(li);
					}
				} else {
					var recombinedNames = [];
					var _g = 0;
					var _g1 = _gthis1.maxWordsToGenerate;
					while(_g < _g1) {
						var wordIdx = _g++;
						var name = "";
						var _g2 = 0;
						while(_g2 < generatedNameSets.length) {
							var set = generatedNameSets[_g2];
							++_g2;
							if(wordIdx < set.length) {
								name += set[wordIdx];
								name += " ";
							}
						}
						name = StringTools.trim(name);
						if(name.length > 0) {
							recombinedNames.push(name);
						}
					}
					var _gthis2 = _gthis1;
					_gthis1.lastGeneratedNames = recombinedNames;
					if(_gthis1.get_similar().length > 0) {
						recombinedNames.sort(function(x,y) {
							var target = _gthis2.get_similar();
							if(x == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var xSimilarity;
							if(x.length == 0) {
								xSimilarity = target.length;
							} else if(target.length == 0) {
								xSimilarity = x.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
								xSimilarity = table[table.length - 1];
							}
							var target = _gthis2.get_similar();
							if(y == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var ySimilarity;
							if(y.length == 0) {
								ySimilarity = target.length;
							} else if(target.length == 0) {
								ySimilarity = y.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
								ySimilarity = table[table.length - 1];
							}
							if(xSimilarity > ySimilarity) {
								return 1;
							} else if(xSimilarity < ySimilarity) {
								return -1;
							} else {
								return 0;
							}
						});
					}
					_gthis1.noNamesFoundElement.innerHTML = "";
					_gthis1.currentNamesElement.innerHTML = "";
					if(recombinedNames.length == 0) {
						_gthis1.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
					}
					var _g = 0;
					while(_g < recombinedNames.length) {
						var name = recombinedNames[_g];
						++_g;
						var li = window.document.createElement("li");
						if(!(name != null && name.length > 0)) {
							throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
						}
						li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
						_gthis1.currentNamesElement.appendChild(li);
					}
				}
			}
		},false);
		this.doubleRandomThemeElement.addEventListener("click",function() {
			var topics = Type.getClassFields(TrainingData);
			var keys = [];
			var _g = 0;
			var _g1 = 2;
			while(_g < _g1) {
				var i = _g++;
				var str = StringTools.replace(topics[Std.random(topics.length)],"_"," ");
				if(str == null) {
					throw haxe_Exception.thrown("FAIL: str != null");
				}
				var parts = str.split(" ");
				var results = "";
				var _g2 = 0;
				var _g11 = parts.length;
				while(_g2 < _g11) {
					var i1 = _g2++;
					var str1 = parts[i1];
					if(!(str1 != null && str1.length > 0)) {
						throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
					}
					results += HxOverrides.substr(str1,0,1).toUpperCase() + HxOverrides.substr(str1,1,str1.length - 1);
					if(i1 <= parts.length - 1) {
						results += " ";
					}
				}
				keys.push(StringTools.trim(results));
			}
			_gthis1.set_trainingDataKeys(keys);
			var arr = StringTools.replace(StringTools.replace(_gthis1.trainingDataTextEdit.value,"\r\n"," "),"\n"," ").split(" ");
			if(!(arr == null || arr.length == 0)) {
				var presetNames = _gthis1.get_trainingDataKeys();
				var title = "";
				var _g = 0;
				var _g1 = presetNames.length;
				while(_g < _g1) {
					var i = _g++;
					title += presetNames[i];
					if(presetNames.length != 1 && i != presetNames.length - 1) {
						title += " & ";
					}
				}
				_gthis1.namesTitleElement.innerHTML = title;
				var dataSets = new haxe_ds_IntMap();
				var dataSetCount = 0;
				var _g = 0;
				while(_g < arr.length) {
					var item = arr[_g];
					++_g;
					var parts = item.split("_");
					var _g1 = 0;
					var _g2 = parts.length;
					while(_g1 < _g2) {
						var i = _g1++;
						if(!dataSets.h.hasOwnProperty(i)) {
							var value = markov_util_ArraySet.create();
							dataSets.h[i] = value;
							++dataSetCount;
						}
						markov_util_ArraySet.add(dataSets.h[i],parts[i]);
					}
				}
				var processingTimePerSet = dataSetCount > 0 ? _gthis1.maxProcessingTime / dataSetCount : 0;
				var generatedNameSets = [];
				var dataSet = dataSets.iterator();
				while(dataSet.hasNext()) {
					var dataSet1 = dataSet.next();
					var data = markov_util_ArraySet.toArray(dataSet1);
					var tmp;
					if(data == null || data.length == 0) {
						tmp = [];
					} else {
						var duplicateTrie = new markov_util_PrefixTrie();
						var _g = 0;
						while(_g < data.length) {
							var name = data[_g];
							++_g;
							duplicateTrie.insert(name);
						}
						var generator = new markov_namegen_NameGenerator(data,_gthis1.order,_gthis1.prior,_gthis1.backoff == 0 ? false : true);
						var names = [];
						var startTime = new Date().getTime();
						var currentTime = new Date().getTime();
						var regex = _gthis1.get_regexMatch() == "" ? null : new EReg(_gthis1.get_regexMatch(),"i");
						while(names.length < _gthis1.maxWordsToGenerate && currentTime < startTime + processingTimePerSet) {
							var name1 = generator.generateName(_gthis1.minLength,_gthis1.maxLength,_gthis1.get_startsWith(),_gthis1.get_endsWith(),_gthis1.get_includes(),_gthis1.get_excludes(),regex);
							if(name1 != null && !duplicateTrie.find(name1)) {
								names.push(name1);
								duplicateTrie.insert(name1);
							}
							currentTime = new Date().getTime();
						}
						tmp = names;
					}
					generatedNameSets.push(tmp);
				}
				if(generatedNameSets.length == 1) {
					var names = generatedNameSets[0];
					var _gthis = _gthis1;
					_gthis1.lastGeneratedNames = names;
					if(_gthis1.get_similar().length > 0) {
						names.sort(function(x,y) {
							var target = _gthis.get_similar();
							if(x == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var xSimilarity;
							if(x.length == 0) {
								xSimilarity = target.length;
							} else if(target.length == 0) {
								xSimilarity = x.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
								xSimilarity = table[table.length - 1];
							}
							var target = _gthis.get_similar();
							if(y == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var ySimilarity;
							if(y.length == 0) {
								ySimilarity = target.length;
							} else if(target.length == 0) {
								ySimilarity = y.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
								ySimilarity = table[table.length - 1];
							}
							if(xSimilarity > ySimilarity) {
								return 1;
							} else if(xSimilarity < ySimilarity) {
								return -1;
							} else {
								return 0;
							}
						});
					}
					_gthis1.noNamesFoundElement.innerHTML = "";
					_gthis1.currentNamesElement.innerHTML = "";
					if(names.length == 0) {
						_gthis1.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
					}
					var _g = 0;
					while(_g < names.length) {
						var name = names[_g];
						++_g;
						var li = window.document.createElement("li");
						if(!(name != null && name.length > 0)) {
							throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
						}
						li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
						_gthis1.currentNamesElement.appendChild(li);
					}
				} else {
					var recombinedNames = [];
					var _g = 0;
					var _g1 = _gthis1.maxWordsToGenerate;
					while(_g < _g1) {
						var wordIdx = _g++;
						var name = "";
						var _g2 = 0;
						while(_g2 < generatedNameSets.length) {
							var set = generatedNameSets[_g2];
							++_g2;
							if(wordIdx < set.length) {
								name += set[wordIdx];
								name += " ";
							}
						}
						name = StringTools.trim(name);
						if(name.length > 0) {
							recombinedNames.push(name);
						}
					}
					var _gthis2 = _gthis1;
					_gthis1.lastGeneratedNames = recombinedNames;
					if(_gthis1.get_similar().length > 0) {
						recombinedNames.sort(function(x,y) {
							var target = _gthis2.get_similar();
							if(x == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var xSimilarity;
							if(x.length == 0) {
								xSimilarity = target.length;
							} else if(target.length == 0) {
								xSimilarity = x.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
								xSimilarity = table[table.length - 1];
							}
							var target = _gthis2.get_similar();
							if(y == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var ySimilarity;
							if(y.length == 0) {
								ySimilarity = target.length;
							} else if(target.length == 0) {
								ySimilarity = y.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
								ySimilarity = table[table.length - 1];
							}
							if(xSimilarity > ySimilarity) {
								return 1;
							} else if(xSimilarity < ySimilarity) {
								return -1;
							} else {
								return 0;
							}
						});
					}
					_gthis1.noNamesFoundElement.innerHTML = "";
					_gthis1.currentNamesElement.innerHTML = "";
					if(recombinedNames.length == 0) {
						_gthis1.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
					}
					var _g = 0;
					while(_g < recombinedNames.length) {
						var name = recombinedNames[_g];
						++_g;
						var li = window.document.createElement("li");
						if(!(name != null && name.length > 0)) {
							throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
						}
						li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
						_gthis1.currentNamesElement.appendChild(li);
					}
				}
			}
		},false);
		this.startsWithElement.addEventListener("change",function() {
			if(_gthis1.startsWithElement.value != null) {
				_gthis1.set_startsWith(_gthis1.startsWithElement.value.toLowerCase());
			}
		},false);
		this.endsWithElement.addEventListener("change",function() {
			if(_gthis1.endsWithElement.value != null) {
				_gthis1.set_endsWith(_gthis1.endsWithElement.value.toLowerCase());
			}
		},false);
		this.includesElement.addEventListener("change",function() {
			if(_gthis1.includesElement.value != null) {
				_gthis1.set_includes(_gthis1.includesElement.value.toLowerCase());
			}
		},false);
		this.excludesElement.addEventListener("change",function() {
			if(_gthis1.excludesElement.value != null) {
				_gthis1.set_excludes(_gthis1.excludesElement.value.toLowerCase());
			}
		},false);
		this.similarElement.addEventListener("change",function() {
			if(_gthis1.similarElement.value != null) {
				_gthis1.set_similar(_gthis1.similarElement.value.toLowerCase());
			}
		},false);
		this.regexMatchElement.addEventListener("change",function() {
			if(_gthis1.regexMatchElement.value != null) {
				_gthis1.set_regexMatch(_gthis1.regexMatchElement.value);
			}
		},false);
		this.shareResultsAndSettingsElement.addEventListener("click",function() {
			_gthis1.shareLinkTextEdit.value = ShareResults.makeCustomQueryString(_gthis1,CustomQueryStringOption.EVERYTHING);
			return _gthis1.shareLinkTextEdit.style.display = "block";
		},false);
		this.shareResultsOnlyElement.addEventListener("click",function() {
			_gthis1.shareLinkTextEdit.value = ShareResults.makeCustomQueryString(_gthis1,CustomQueryStringOption.NO_TRAINING_DATA);
			return _gthis1.shareLinkTextEdit.style.display = "block";
		},false);
	}
	,buildTrainingDataList: function() {
		var _gthis = this;
		var params = window.location.search.substring(1);
		if(!(params == null || params == "")) {
			TrainingData["custom"] = [];
		}
		var fields = Type.getClassFields(TrainingData);
		fields.sort(function(a,b) {
			var str = StringTools.replace(a,"_"," ");
			if(str == null) {
				throw haxe_Exception.thrown("FAIL: str != null");
			}
			var parts = str.split(" ");
			var results = "";
			var _g = 0;
			var _g1 = parts.length;
			while(_g < _g1) {
				var i = _g++;
				var str = parts[i];
				if(!(str != null && str.length > 0)) {
					throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
				}
				results += HxOverrides.substr(str,0,1).toUpperCase() + HxOverrides.substr(str,1,str.length - 1);
				if(i <= parts.length - 1) {
					results += " ";
				}
			}
			var first = StringTools.trim(results).toLowerCase();
			var str = StringTools.replace(b,"_"," ");
			if(str == null) {
				throw haxe_Exception.thrown("FAIL: str != null");
			}
			var parts = str.split(" ");
			var results = "";
			var _g = 0;
			var _g1 = parts.length;
			while(_g < _g1) {
				var i = _g++;
				var str = parts[i];
				if(!(str != null && str.length > 0)) {
					throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
				}
				results += HxOverrides.substr(str,0,1).toUpperCase() + HxOverrides.substr(str,1,str.length - 1);
				if(i <= parts.length - 1) {
					results += " ";
				}
			}
			var second = StringTools.trim(results).toLowerCase();
			if(first < second) {
				return -1;
			} else if(first > second) {
				return 1;
			}
			return 0;
		});
		this.topicSearchTrie = new markov_util_PrefixTrie();
		var _g = 0;
		while(_g < fields.length) {
			var field = fields[_g];
			++_g;
			var str = StringTools.replace(field,"_"," ");
			if(str == null) {
				throw haxe_Exception.thrown("FAIL: str != null");
			}
			var parts = str.split(" ");
			var results = "";
			var _g1 = 0;
			var _g11 = parts.length;
			while(_g1 < _g11) {
				var i = _g1++;
				var str1 = parts[i];
				if(!(str1 != null && str1.length > 0)) {
					throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
				}
				results += HxOverrides.substr(str1,0,1).toUpperCase() + HxOverrides.substr(str1,1,str1.length - 1);
				if(i <= parts.length - 1) {
					results += " ";
				}
			}
			var displayName = [StringTools.trim(results)];
			var makeOption = (function(displayName) {
				return function() {
					var option = window.document.createElement("option");
					option.appendChild(window.document.createTextNode(displayName[0]));
					option.value = displayName[0];
					return option;
				};
			})(displayName);
			this.nameDataPresetListElement.appendChild(makeOption());
			this.nameDataDataListElement.appendChild(makeOption());
			this.addTrainingDataSelectionCheckboxes(displayName[0]);
			this.topicSearchTrie.insert(displayName[0]);
		}
	}
	,populateTrainingDataSetCombinationModeList: function() {
		var makeOption = function(displayName) {
			var option = window.document.createElement("option");
			option.appendChild(window.document.createTextNode(displayName));
			option.value = displayName;
			return option;
		};
		this.nameDataCombinationModeListElement.appendChild(makeOption("Append Entire Datasets"));
		this.nameDataCombinationModeListElement.appendChild(makeOption("Join Individual Words"));
	}
	,applySettings: function() {
		this.set_trainingDataKeys(["Animals"]);
		this.maxWordsToGenerate = 100;
		this.minLength = 5;
		this.maxLength = 11;
		this.order = 3;
		this.prior = 0.0;
		this.backoff = 0;
		this.maxProcessingTime = 800;
		this.set_startsWith("");
		this.set_endsWith("");
		this.set_includes("");
		this.set_excludes("");
		this.set_similar("");
		this.set_regexMatch("");
		ShareResults.applySettings(this);
	}
	,createSliders: function() {
		var _gthis = this;
		noUiSlider.create(this.lengthElement,{ start : [this.minLength,this.maxLength], connect : true, range : { "min" : [2,1], "max" : 25}, pips : { mode : "range", density : 10}});
		this.createTooltips(this.lengthElement);
		this.lengthElement.noUiSlider.on("change",function(values,handle,rawValues) {
			if(handle == 0) {
				_gthis.minLength = values[handle] | 0;
			} else if(handle == 1) {
				_gthis.maxLength = values[handle] | 0;
			}
		});
		this.lengthElement.noUiSlider.on("update",function(values,handle,rawValues) {
			_gthis.updateTooltips(_gthis.lengthElement,handle,values[handle] | 0);
		});
		noUiSlider.create(this.orderElement,{ start : [this.order], connect : "lower", range : { "min" : [1,1], "max" : [9]}, pips : { mode : "range", density : 10}});
		this.createTooltips(this.orderElement);
		this.orderElement.noUiSlider.on("change",function(values,handle,rawValues) {
			return _gthis.order = values[handle] | 0;
		});
		this.orderElement.noUiSlider.on("update",function(values,handle,rawValues) {
			_gthis.updateTooltips(_gthis.orderElement,handle,values[handle] | 0);
		});
		noUiSlider.create(this.priorElement,{ start : [this.prior], connect : "lower", range : { "min" : 0.001, "50%" : 0.025, "max" : 0.05}, pips : { mode : "range", density : 10, format : new wNumb({ decimals : 3})}});
		this.createTooltips(this.priorElement);
		this.priorElement.noUiSlider.on("change",function(values,handle,rawValues) {
			return _gthis.prior = parseFloat(values[handle]);
		});
		this.priorElement.noUiSlider.on("update",function(values,handle,rawValues) {
			_gthis.updateTooltips(_gthis.priorElement,handle,values[handle]);
		});
		noUiSlider.create(this.backoffElement,{ start : [this.backoff], connect : "lower", range : { "min" : [0,1], "max" : [1]}, format : new wNumb({ decimals : 0})});
		this.createTooltips(this.backoffElement);
		this.backoffElement.noUiSlider.on("change",function(values,handle,rawValues) {
			return _gthis.backoff = Std.parseInt(values[handle]);
		});
		this.backoffElement.noUiSlider.on("update",function(values,handle,rawValues) {
			_gthis.updateTooltips(_gthis.backoffElement,handle,values[handle]);
		});
		noUiSlider.create(this.maxWordsToGenerateElement,{ start : [100], connect : "lower", range : { "min" : 20, "max" : 1000}, pips : { mode : "range", density : 10, format : new wNumb({ decimals : 0})}});
		this.createTooltips(this.maxWordsToGenerateElement);
		this.maxWordsToGenerateElement.noUiSlider.on("change",function(values,handle,rawValues) {
			return _gthis.maxWordsToGenerate = Std.parseInt(values[handle]);
		});
		this.maxWordsToGenerateElement.noUiSlider.on("update",function(values,handle,rawValues) {
			_gthis.updateTooltips(_gthis.maxWordsToGenerateElement,handle,values[handle] | 0);
		});
		noUiSlider.create(this.maxProcessingTimeElement,{ start : [this.maxProcessingTime], connect : "lower", range : { "min" : 50, "max" : 5000}, pips : { mode : "range", density : 10, format : new wNumb({ decimals : 0})}});
		this.createTooltips(this.maxProcessingTimeElement);
		this.maxProcessingTimeElement.noUiSlider.on("change",function(values,handle,rawValues) {
			return _gthis.maxProcessingTime = Std.parseInt(values[handle]);
		});
		this.maxProcessingTimeElement.noUiSlider.on("update",function(values,handle,rawValues) {
			_gthis.updateTooltips(_gthis.maxProcessingTimeElement,handle,values[handle] | 0);
		});
	}
	,createTooltips: function(slider) {
		var tipHandles = slider.getElementsByClassName("noUi-handle");
		var _g = 0;
		var _g1 = tipHandles.length;
		while(_g < _g1) {
			var i = _g++;
			var div = window.document.createElement("div");
			div.className += "tooltip";
			tipHandles[i].appendChild(div);
			this.updateTooltips(slider,i,0);
		}
	}
	,updateTooltips: function(slider,handleIdx,value) {
		var tipHandles = slider.getElementsByClassName("noUi-handle");
		tipHandles[handleIdx].innerHTML = "<span class='tooltip'>" + (value == null ? "null" : "" + value) + "</span>";
	}
	,addEventListeners: function() {
		var _gthis = this;
		this.nameDataPresetListElement.addEventListener("change",function() {
			_gthis.set_trainingDataKeys([_gthis.nameDataPresetListElement.value]);
		},false);
		this.nameDataSearchBoxElement.addEventListener("change",function() {
			if(_gthis.topicSearchTrie.find(_gthis.nameDataSearchBoxElement.value)) {
				_gthis.set_trainingDataKeys([_gthis.nameDataSearchBoxElement.value]);
			}
		},false);
		this.nameDataSearchBoxElement.addEventListener("input",function() {
			if(_gthis.topicSearchTrie.find(_gthis.nameDataSearchBoxElement.value)) {
				_gthis.set_trainingDataKeys([_gthis.nameDataSearchBoxElement.value]);
			}
		},false);
		this.nameDataCombinationModeListElement.addEventListener("change",function() {
			_gthis.set_trainingDataKeys(_gthis.get_trainingDataKeys());
		},false);
		var _g = 0;
		var _g1 = this.nameDataPresetCheckboxElements;
		while(_g < _g1.length) {
			var nameDataPresetCheckbox = _g1[_g];
			++_g;
			nameDataPresetCheckbox.addEventListener("change",function() {
				_gthis.set_trainingDataKeys(_gthis.get_trainingDataKeys());
			},false);
		}
		this.trainingDataTextEdit.addEventListener("change",function() {
			var arr = StringTools.replace(StringTools.replace(_gthis.trainingDataTextEdit.value,"\r\n"," "),"\n"," ").split(" ");
			if(!(arr == null || arr.length == 0)) {
				var presetNames = _gthis.get_trainingDataKeys();
				var title = "";
				var _g = 0;
				var _g1 = presetNames.length;
				while(_g < _g1) {
					var i = _g++;
					title += presetNames[i];
					if(presetNames.length != 1 && i != presetNames.length - 1) {
						title += " & ";
					}
				}
				_gthis.namesTitleElement.innerHTML = title;
				var dataSets = new haxe_ds_IntMap();
				var dataSetCount = 0;
				var _g = 0;
				while(_g < arr.length) {
					var item = arr[_g];
					++_g;
					var parts = item.split("_");
					var _g1 = 0;
					var _g2 = parts.length;
					while(_g1 < _g2) {
						var i = _g1++;
						if(!dataSets.h.hasOwnProperty(i)) {
							var value = markov_util_ArraySet.create();
							dataSets.h[i] = value;
							++dataSetCount;
						}
						markov_util_ArraySet.add(dataSets.h[i],parts[i]);
					}
				}
				var processingTimePerSet = dataSetCount > 0 ? _gthis.maxProcessingTime / dataSetCount : 0;
				var generatedNameSets = [];
				var dataSet = dataSets.iterator();
				while(dataSet.hasNext()) {
					var dataSet1 = dataSet.next();
					var data = markov_util_ArraySet.toArray(dataSet1);
					var tmp;
					if(data == null || data.length == 0) {
						tmp = [];
					} else {
						var duplicateTrie = new markov_util_PrefixTrie();
						var _g = 0;
						while(_g < data.length) {
							var name = data[_g];
							++_g;
							duplicateTrie.insert(name);
						}
						var generator = new markov_namegen_NameGenerator(data,_gthis.order,_gthis.prior,_gthis.backoff == 0 ? false : true);
						var names = [];
						var startTime = new Date().getTime();
						var currentTime = new Date().getTime();
						var regex = _gthis.get_regexMatch() == "" ? null : new EReg(_gthis.get_regexMatch(),"i");
						while(names.length < _gthis.maxWordsToGenerate && currentTime < startTime + processingTimePerSet) {
							var name1 = generator.generateName(_gthis.minLength,_gthis.maxLength,_gthis.get_startsWith(),_gthis.get_endsWith(),_gthis.get_includes(),_gthis.get_excludes(),regex);
							if(name1 != null && !duplicateTrie.find(name1)) {
								names.push(name1);
								duplicateTrie.insert(name1);
							}
							currentTime = new Date().getTime();
						}
						tmp = names;
					}
					generatedNameSets.push(tmp);
				}
				if(generatedNameSets.length == 1) {
					var names = generatedNameSets[0];
					var _gthis1 = _gthis;
					_gthis.lastGeneratedNames = names;
					if(_gthis.get_similar().length > 0) {
						names.sort(function(x,y) {
							var target = _gthis1.get_similar();
							if(x == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var xSimilarity;
							if(x.length == 0) {
								xSimilarity = target.length;
							} else if(target.length == 0) {
								xSimilarity = x.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
								xSimilarity = table[table.length - 1];
							}
							var target = _gthis1.get_similar();
							if(y == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var ySimilarity;
							if(y.length == 0) {
								ySimilarity = target.length;
							} else if(target.length == 0) {
								ySimilarity = y.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
								ySimilarity = table[table.length - 1];
							}
							if(xSimilarity > ySimilarity) {
								return 1;
							} else if(xSimilarity < ySimilarity) {
								return -1;
							} else {
								return 0;
							}
						});
					}
					_gthis.noNamesFoundElement.innerHTML = "";
					_gthis.currentNamesElement.innerHTML = "";
					if(names.length == 0) {
						_gthis.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
					}
					var _g = 0;
					while(_g < names.length) {
						var name = names[_g];
						++_g;
						var li = window.document.createElement("li");
						if(!(name != null && name.length > 0)) {
							throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
						}
						li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
						_gthis.currentNamesElement.appendChild(li);
					}
				} else {
					var recombinedNames = [];
					var _g = 0;
					var _g1 = _gthis.maxWordsToGenerate;
					while(_g < _g1) {
						var wordIdx = _g++;
						var name = "";
						var _g2 = 0;
						while(_g2 < generatedNameSets.length) {
							var set = generatedNameSets[_g2];
							++_g2;
							if(wordIdx < set.length) {
								name += set[wordIdx];
								name += " ";
							}
						}
						name = StringTools.trim(name);
						if(name.length > 0) {
							recombinedNames.push(name);
						}
					}
					var _gthis2 = _gthis;
					_gthis.lastGeneratedNames = recombinedNames;
					if(_gthis.get_similar().length > 0) {
						recombinedNames.sort(function(x,y) {
							var target = _gthis2.get_similar();
							if(x == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var xSimilarity;
							if(x.length == 0) {
								xSimilarity = target.length;
							} else if(target.length == 0) {
								xSimilarity = x.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
								xSimilarity = table[table.length - 1];
							}
							var target = _gthis2.get_similar();
							if(y == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var ySimilarity;
							if(y.length == 0) {
								ySimilarity = target.length;
							} else if(target.length == 0) {
								ySimilarity = y.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
								ySimilarity = table[table.length - 1];
							}
							if(xSimilarity > ySimilarity) {
								return 1;
							} else if(xSimilarity < ySimilarity) {
								return -1;
							} else {
								return 0;
							}
						});
					}
					_gthis.noNamesFoundElement.innerHTML = "";
					_gthis.currentNamesElement.innerHTML = "";
					if(recombinedNames.length == 0) {
						_gthis.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
					}
					var _g = 0;
					while(_g < recombinedNames.length) {
						var name = recombinedNames[_g];
						++_g;
						var li = window.document.createElement("li");
						if(!(name != null && name.length > 0)) {
							throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
						}
						li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
						_gthis.currentNamesElement.appendChild(li);
					}
				}
			}
		},false);
		this.generateElement.addEventListener("click",function() {
			var arr = StringTools.replace(StringTools.replace(_gthis.trainingDataTextEdit.value,"\r\n"," "),"\n"," ").split(" ");
			if(!(arr == null || arr.length == 0)) {
				var presetNames = _gthis.get_trainingDataKeys();
				var title = "";
				var _g = 0;
				var _g1 = presetNames.length;
				while(_g < _g1) {
					var i = _g++;
					title += presetNames[i];
					if(presetNames.length != 1 && i != presetNames.length - 1) {
						title += " & ";
					}
				}
				_gthis.namesTitleElement.innerHTML = title;
				var dataSets = new haxe_ds_IntMap();
				var dataSetCount = 0;
				var _g = 0;
				while(_g < arr.length) {
					var item = arr[_g];
					++_g;
					var parts = item.split("_");
					var _g1 = 0;
					var _g2 = parts.length;
					while(_g1 < _g2) {
						var i = _g1++;
						if(!dataSets.h.hasOwnProperty(i)) {
							var value = markov_util_ArraySet.create();
							dataSets.h[i] = value;
							++dataSetCount;
						}
						markov_util_ArraySet.add(dataSets.h[i],parts[i]);
					}
				}
				var processingTimePerSet = dataSetCount > 0 ? _gthis.maxProcessingTime / dataSetCount : 0;
				var generatedNameSets = [];
				var dataSet = dataSets.iterator();
				while(dataSet.hasNext()) {
					var dataSet1 = dataSet.next();
					var data = markov_util_ArraySet.toArray(dataSet1);
					var tmp;
					if(data == null || data.length == 0) {
						tmp = [];
					} else {
						var duplicateTrie = new markov_util_PrefixTrie();
						var _g = 0;
						while(_g < data.length) {
							var name = data[_g];
							++_g;
							duplicateTrie.insert(name);
						}
						var generator = new markov_namegen_NameGenerator(data,_gthis.order,_gthis.prior,_gthis.backoff == 0 ? false : true);
						var names = [];
						var startTime = new Date().getTime();
						var currentTime = new Date().getTime();
						var regex = _gthis.get_regexMatch() == "" ? null : new EReg(_gthis.get_regexMatch(),"i");
						while(names.length < _gthis.maxWordsToGenerate && currentTime < startTime + processingTimePerSet) {
							var name1 = generator.generateName(_gthis.minLength,_gthis.maxLength,_gthis.get_startsWith(),_gthis.get_endsWith(),_gthis.get_includes(),_gthis.get_excludes(),regex);
							if(name1 != null && !duplicateTrie.find(name1)) {
								names.push(name1);
								duplicateTrie.insert(name1);
							}
							currentTime = new Date().getTime();
						}
						tmp = names;
					}
					generatedNameSets.push(tmp);
				}
				if(generatedNameSets.length == 1) {
					var names = generatedNameSets[0];
					var _gthis1 = _gthis;
					_gthis.lastGeneratedNames = names;
					if(_gthis.get_similar().length > 0) {
						names.sort(function(x,y) {
							var target = _gthis1.get_similar();
							if(x == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var xSimilarity;
							if(x.length == 0) {
								xSimilarity = target.length;
							} else if(target.length == 0) {
								xSimilarity = x.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
								xSimilarity = table[table.length - 1];
							}
							var target = _gthis1.get_similar();
							if(y == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var ySimilarity;
							if(y.length == 0) {
								ySimilarity = target.length;
							} else if(target.length == 0) {
								ySimilarity = y.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
								ySimilarity = table[table.length - 1];
							}
							if(xSimilarity > ySimilarity) {
								return 1;
							} else if(xSimilarity < ySimilarity) {
								return -1;
							} else {
								return 0;
							}
						});
					}
					_gthis.noNamesFoundElement.innerHTML = "";
					_gthis.currentNamesElement.innerHTML = "";
					if(names.length == 0) {
						_gthis.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
					}
					var _g = 0;
					while(_g < names.length) {
						var name = names[_g];
						++_g;
						var li = window.document.createElement("li");
						if(!(name != null && name.length > 0)) {
							throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
						}
						li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
						_gthis.currentNamesElement.appendChild(li);
					}
				} else {
					var recombinedNames = [];
					var _g = 0;
					var _g1 = _gthis.maxWordsToGenerate;
					while(_g < _g1) {
						var wordIdx = _g++;
						var name = "";
						var _g2 = 0;
						while(_g2 < generatedNameSets.length) {
							var set = generatedNameSets[_g2];
							++_g2;
							if(wordIdx < set.length) {
								name += set[wordIdx];
								name += " ";
							}
						}
						name = StringTools.trim(name);
						if(name.length > 0) {
							recombinedNames.push(name);
						}
					}
					var _gthis2 = _gthis;
					_gthis.lastGeneratedNames = recombinedNames;
					if(_gthis.get_similar().length > 0) {
						recombinedNames.sort(function(x,y) {
							var target = _gthis2.get_similar();
							if(x == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var xSimilarity;
							if(x.length == 0) {
								xSimilarity = target.length;
							} else if(target.length == 0) {
								xSimilarity = x.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
								xSimilarity = table[table.length - 1];
							}
							var target = _gthis2.get_similar();
							if(y == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var ySimilarity;
							if(y.length == 0) {
								ySimilarity = target.length;
							} else if(target.length == 0) {
								ySimilarity = y.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
								ySimilarity = table[table.length - 1];
							}
							if(xSimilarity > ySimilarity) {
								return 1;
							} else if(xSimilarity < ySimilarity) {
								return -1;
							} else {
								return 0;
							}
						});
					}
					_gthis.noNamesFoundElement.innerHTML = "";
					_gthis.currentNamesElement.innerHTML = "";
					if(recombinedNames.length == 0) {
						_gthis.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
					}
					var _g = 0;
					while(_g < recombinedNames.length) {
						var name = recombinedNames[_g];
						++_g;
						var li = window.document.createElement("li");
						if(!(name != null && name.length > 0)) {
							throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
						}
						li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
						_gthis.currentNamesElement.appendChild(li);
					}
				}
			}
		},false);
		this.singleRandomThemeElement.addEventListener("click",function() {
			var topics = Type.getClassFields(TrainingData);
			var keys = [];
			var _g = 0;
			var _g1 = 1;
			while(_g < _g1) {
				var i = _g++;
				var str = StringTools.replace(topics[Std.random(topics.length)],"_"," ");
				if(str == null) {
					throw haxe_Exception.thrown("FAIL: str != null");
				}
				var parts = str.split(" ");
				var results = "";
				var _g2 = 0;
				var _g11 = parts.length;
				while(_g2 < _g11) {
					var i1 = _g2++;
					var str1 = parts[i1];
					if(!(str1 != null && str1.length > 0)) {
						throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
					}
					results += HxOverrides.substr(str1,0,1).toUpperCase() + HxOverrides.substr(str1,1,str1.length - 1);
					if(i1 <= parts.length - 1) {
						results += " ";
					}
				}
				keys.push(StringTools.trim(results));
			}
			_gthis.set_trainingDataKeys(keys);
			var arr = StringTools.replace(StringTools.replace(_gthis.trainingDataTextEdit.value,"\r\n"," "),"\n"," ").split(" ");
			if(!(arr == null || arr.length == 0)) {
				var presetNames = _gthis.get_trainingDataKeys();
				var title = "";
				var _g = 0;
				var _g1 = presetNames.length;
				while(_g < _g1) {
					var i = _g++;
					title += presetNames[i];
					if(presetNames.length != 1 && i != presetNames.length - 1) {
						title += " & ";
					}
				}
				_gthis.namesTitleElement.innerHTML = title;
				var dataSets = new haxe_ds_IntMap();
				var dataSetCount = 0;
				var _g = 0;
				while(_g < arr.length) {
					var item = arr[_g];
					++_g;
					var parts = item.split("_");
					var _g1 = 0;
					var _g2 = parts.length;
					while(_g1 < _g2) {
						var i = _g1++;
						if(!dataSets.h.hasOwnProperty(i)) {
							var value = markov_util_ArraySet.create();
							dataSets.h[i] = value;
							++dataSetCount;
						}
						markov_util_ArraySet.add(dataSets.h[i],parts[i]);
					}
				}
				var processingTimePerSet = dataSetCount > 0 ? _gthis.maxProcessingTime / dataSetCount : 0;
				var generatedNameSets = [];
				var dataSet = dataSets.iterator();
				while(dataSet.hasNext()) {
					var dataSet1 = dataSet.next();
					var data = markov_util_ArraySet.toArray(dataSet1);
					var tmp;
					if(data == null || data.length == 0) {
						tmp = [];
					} else {
						var duplicateTrie = new markov_util_PrefixTrie();
						var _g = 0;
						while(_g < data.length) {
							var name = data[_g];
							++_g;
							duplicateTrie.insert(name);
						}
						var generator = new markov_namegen_NameGenerator(data,_gthis.order,_gthis.prior,_gthis.backoff == 0 ? false : true);
						var names = [];
						var startTime = new Date().getTime();
						var currentTime = new Date().getTime();
						var regex = _gthis.get_regexMatch() == "" ? null : new EReg(_gthis.get_regexMatch(),"i");
						while(names.length < _gthis.maxWordsToGenerate && currentTime < startTime + processingTimePerSet) {
							var name1 = generator.generateName(_gthis.minLength,_gthis.maxLength,_gthis.get_startsWith(),_gthis.get_endsWith(),_gthis.get_includes(),_gthis.get_excludes(),regex);
							if(name1 != null && !duplicateTrie.find(name1)) {
								names.push(name1);
								duplicateTrie.insert(name1);
							}
							currentTime = new Date().getTime();
						}
						tmp = names;
					}
					generatedNameSets.push(tmp);
				}
				if(generatedNameSets.length == 1) {
					var names = generatedNameSets[0];
					var _gthis1 = _gthis;
					_gthis.lastGeneratedNames = names;
					if(_gthis.get_similar().length > 0) {
						names.sort(function(x,y) {
							var target = _gthis1.get_similar();
							if(x == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var xSimilarity;
							if(x.length == 0) {
								xSimilarity = target.length;
							} else if(target.length == 0) {
								xSimilarity = x.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
								xSimilarity = table[table.length - 1];
							}
							var target = _gthis1.get_similar();
							if(y == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var ySimilarity;
							if(y.length == 0) {
								ySimilarity = target.length;
							} else if(target.length == 0) {
								ySimilarity = y.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
								ySimilarity = table[table.length - 1];
							}
							if(xSimilarity > ySimilarity) {
								return 1;
							} else if(xSimilarity < ySimilarity) {
								return -1;
							} else {
								return 0;
							}
						});
					}
					_gthis.noNamesFoundElement.innerHTML = "";
					_gthis.currentNamesElement.innerHTML = "";
					if(names.length == 0) {
						_gthis.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
					}
					var _g = 0;
					while(_g < names.length) {
						var name = names[_g];
						++_g;
						var li = window.document.createElement("li");
						if(!(name != null && name.length > 0)) {
							throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
						}
						li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
						_gthis.currentNamesElement.appendChild(li);
					}
				} else {
					var recombinedNames = [];
					var _g = 0;
					var _g1 = _gthis.maxWordsToGenerate;
					while(_g < _g1) {
						var wordIdx = _g++;
						var name = "";
						var _g2 = 0;
						while(_g2 < generatedNameSets.length) {
							var set = generatedNameSets[_g2];
							++_g2;
							if(wordIdx < set.length) {
								name += set[wordIdx];
								name += " ";
							}
						}
						name = StringTools.trim(name);
						if(name.length > 0) {
							recombinedNames.push(name);
						}
					}
					var _gthis2 = _gthis;
					_gthis.lastGeneratedNames = recombinedNames;
					if(_gthis.get_similar().length > 0) {
						recombinedNames.sort(function(x,y) {
							var target = _gthis2.get_similar();
							if(x == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var xSimilarity;
							if(x.length == 0) {
								xSimilarity = target.length;
							} else if(target.length == 0) {
								xSimilarity = x.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
								xSimilarity = table[table.length - 1];
							}
							var target = _gthis2.get_similar();
							if(y == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var ySimilarity;
							if(y.length == 0) {
								ySimilarity = target.length;
							} else if(target.length == 0) {
								ySimilarity = y.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
								ySimilarity = table[table.length - 1];
							}
							if(xSimilarity > ySimilarity) {
								return 1;
							} else if(xSimilarity < ySimilarity) {
								return -1;
							} else {
								return 0;
							}
						});
					}
					_gthis.noNamesFoundElement.innerHTML = "";
					_gthis.currentNamesElement.innerHTML = "";
					if(recombinedNames.length == 0) {
						_gthis.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
					}
					var _g = 0;
					while(_g < recombinedNames.length) {
						var name = recombinedNames[_g];
						++_g;
						var li = window.document.createElement("li");
						if(!(name != null && name.length > 0)) {
							throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
						}
						li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
						_gthis.currentNamesElement.appendChild(li);
					}
				}
			}
		},false);
		this.doubleRandomThemeElement.addEventListener("click",function() {
			var topics = Type.getClassFields(TrainingData);
			var keys = [];
			var _g = 0;
			var _g1 = 2;
			while(_g < _g1) {
				var i = _g++;
				var str = StringTools.replace(topics[Std.random(topics.length)],"_"," ");
				if(str == null) {
					throw haxe_Exception.thrown("FAIL: str != null");
				}
				var parts = str.split(" ");
				var results = "";
				var _g2 = 0;
				var _g11 = parts.length;
				while(_g2 < _g11) {
					var i1 = _g2++;
					var str1 = parts[i1];
					if(!(str1 != null && str1.length > 0)) {
						throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
					}
					results += HxOverrides.substr(str1,0,1).toUpperCase() + HxOverrides.substr(str1,1,str1.length - 1);
					if(i1 <= parts.length - 1) {
						results += " ";
					}
				}
				keys.push(StringTools.trim(results));
			}
			_gthis.set_trainingDataKeys(keys);
			var arr = StringTools.replace(StringTools.replace(_gthis.trainingDataTextEdit.value,"\r\n"," "),"\n"," ").split(" ");
			if(!(arr == null || arr.length == 0)) {
				var presetNames = _gthis.get_trainingDataKeys();
				var title = "";
				var _g = 0;
				var _g1 = presetNames.length;
				while(_g < _g1) {
					var i = _g++;
					title += presetNames[i];
					if(presetNames.length != 1 && i != presetNames.length - 1) {
						title += " & ";
					}
				}
				_gthis.namesTitleElement.innerHTML = title;
				var dataSets = new haxe_ds_IntMap();
				var dataSetCount = 0;
				var _g = 0;
				while(_g < arr.length) {
					var item = arr[_g];
					++_g;
					var parts = item.split("_");
					var _g1 = 0;
					var _g2 = parts.length;
					while(_g1 < _g2) {
						var i = _g1++;
						if(!dataSets.h.hasOwnProperty(i)) {
							var value = markov_util_ArraySet.create();
							dataSets.h[i] = value;
							++dataSetCount;
						}
						markov_util_ArraySet.add(dataSets.h[i],parts[i]);
					}
				}
				var processingTimePerSet = dataSetCount > 0 ? _gthis.maxProcessingTime / dataSetCount : 0;
				var generatedNameSets = [];
				var dataSet = dataSets.iterator();
				while(dataSet.hasNext()) {
					var dataSet1 = dataSet.next();
					var data = markov_util_ArraySet.toArray(dataSet1);
					var tmp;
					if(data == null || data.length == 0) {
						tmp = [];
					} else {
						var duplicateTrie = new markov_util_PrefixTrie();
						var _g = 0;
						while(_g < data.length) {
							var name = data[_g];
							++_g;
							duplicateTrie.insert(name);
						}
						var generator = new markov_namegen_NameGenerator(data,_gthis.order,_gthis.prior,_gthis.backoff == 0 ? false : true);
						var names = [];
						var startTime = new Date().getTime();
						var currentTime = new Date().getTime();
						var regex = _gthis.get_regexMatch() == "" ? null : new EReg(_gthis.get_regexMatch(),"i");
						while(names.length < _gthis.maxWordsToGenerate && currentTime < startTime + processingTimePerSet) {
							var name1 = generator.generateName(_gthis.minLength,_gthis.maxLength,_gthis.get_startsWith(),_gthis.get_endsWith(),_gthis.get_includes(),_gthis.get_excludes(),regex);
							if(name1 != null && !duplicateTrie.find(name1)) {
								names.push(name1);
								duplicateTrie.insert(name1);
							}
							currentTime = new Date().getTime();
						}
						tmp = names;
					}
					generatedNameSets.push(tmp);
				}
				if(generatedNameSets.length == 1) {
					var names = generatedNameSets[0];
					var _gthis1 = _gthis;
					_gthis.lastGeneratedNames = names;
					if(_gthis.get_similar().length > 0) {
						names.sort(function(x,y) {
							var target = _gthis1.get_similar();
							if(x == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var xSimilarity;
							if(x.length == 0) {
								xSimilarity = target.length;
							} else if(target.length == 0) {
								xSimilarity = x.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
								xSimilarity = table[table.length - 1];
							}
							var target = _gthis1.get_similar();
							if(y == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var ySimilarity;
							if(y.length == 0) {
								ySimilarity = target.length;
							} else if(target.length == 0) {
								ySimilarity = y.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
								ySimilarity = table[table.length - 1];
							}
							if(xSimilarity > ySimilarity) {
								return 1;
							} else if(xSimilarity < ySimilarity) {
								return -1;
							} else {
								return 0;
							}
						});
					}
					_gthis.noNamesFoundElement.innerHTML = "";
					_gthis.currentNamesElement.innerHTML = "";
					if(names.length == 0) {
						_gthis.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
					}
					var _g = 0;
					while(_g < names.length) {
						var name = names[_g];
						++_g;
						var li = window.document.createElement("li");
						if(!(name != null && name.length > 0)) {
							throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
						}
						li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
						_gthis.currentNamesElement.appendChild(li);
					}
				} else {
					var recombinedNames = [];
					var _g = 0;
					var _g1 = _gthis.maxWordsToGenerate;
					while(_g < _g1) {
						var wordIdx = _g++;
						var name = "";
						var _g2 = 0;
						while(_g2 < generatedNameSets.length) {
							var set = generatedNameSets[_g2];
							++_g2;
							if(wordIdx < set.length) {
								name += set[wordIdx];
								name += " ";
							}
						}
						name = StringTools.trim(name);
						if(name.length > 0) {
							recombinedNames.push(name);
						}
					}
					var _gthis2 = _gthis;
					_gthis.lastGeneratedNames = recombinedNames;
					if(_gthis.get_similar().length > 0) {
						recombinedNames.sort(function(x,y) {
							var target = _gthis2.get_similar();
							if(x == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var xSimilarity;
							if(x.length == 0) {
								xSimilarity = target.length;
							} else if(target.length == 0) {
								xSimilarity = x.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
								xSimilarity = table[table.length - 1];
							}
							var target = _gthis2.get_similar();
							if(y == null) {
								throw haxe_Exception.thrown("FAIL: source != null");
							}
							if(target == null) {
								throw haxe_Exception.thrown("FAIL: target != null");
							}
							var ySimilarity;
							if(y.length == 0) {
								ySimilarity = target.length;
							} else if(target.length == 0) {
								ySimilarity = y.length;
							} else {
								var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
								ySimilarity = table[table.length - 1];
							}
							if(xSimilarity > ySimilarity) {
								return 1;
							} else if(xSimilarity < ySimilarity) {
								return -1;
							} else {
								return 0;
							}
						});
					}
					_gthis.noNamesFoundElement.innerHTML = "";
					_gthis.currentNamesElement.innerHTML = "";
					if(recombinedNames.length == 0) {
						_gthis.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
					}
					var _g = 0;
					while(_g < recombinedNames.length) {
						var name = recombinedNames[_g];
						++_g;
						var li = window.document.createElement("li");
						if(!(name != null && name.length > 0)) {
							throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
						}
						li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
						_gthis.currentNamesElement.appendChild(li);
					}
				}
			}
		},false);
		this.startsWithElement.addEventListener("change",function() {
			if(_gthis.startsWithElement.value != null) {
				_gthis.set_startsWith(_gthis.startsWithElement.value.toLowerCase());
			}
		},false);
		this.endsWithElement.addEventListener("change",function() {
			if(_gthis.endsWithElement.value != null) {
				_gthis.set_endsWith(_gthis.endsWithElement.value.toLowerCase());
			}
		},false);
		this.includesElement.addEventListener("change",function() {
			if(_gthis.includesElement.value != null) {
				_gthis.set_includes(_gthis.includesElement.value.toLowerCase());
			}
		},false);
		this.excludesElement.addEventListener("change",function() {
			if(_gthis.excludesElement.value != null) {
				_gthis.set_excludes(_gthis.excludesElement.value.toLowerCase());
			}
		},false);
		this.similarElement.addEventListener("change",function() {
			if(_gthis.similarElement.value != null) {
				_gthis.set_similar(_gthis.similarElement.value.toLowerCase());
			}
		},false);
		this.regexMatchElement.addEventListener("change",function() {
			if(_gthis.regexMatchElement.value != null) {
				_gthis.set_regexMatch(_gthis.regexMatchElement.value);
			}
		},false);
		this.shareResultsAndSettingsElement.addEventListener("click",function() {
			_gthis.shareLinkTextEdit.value = ShareResults.makeCustomQueryString(_gthis,CustomQueryStringOption.EVERYTHING);
			return _gthis.shareLinkTextEdit.style.display = "block";
		},false);
		this.shareResultsOnlyElement.addEventListener("click",function() {
			_gthis.shareLinkTextEdit.value = ShareResults.makeCustomQueryString(_gthis,CustomQueryStringOption.NO_TRAINING_DATA);
			return _gthis.shareLinkTextEdit.style.display = "block";
		},false);
	}
	,addTrainingDataSelectionCheckboxes: function(displayName) {
		var label = window.document.createElement("label");
		label.className = "presetlabel";
		var labelTextContent = window.document.createElement("p");
		labelTextContent.className = "presetcheckboxtext";
		labelTextContent.innerHTML = displayName;
		var selectionCheckbox = window.document.createElement("input");
		selectionCheckbox.type = "checkbox";
		selectionCheckbox.className = "presetcheckbox";
		selectionCheckbox.innerHTML = displayName;
		selectionCheckbox.value = displayName;
		label.appendChild(selectionCheckbox);
		label.appendChild(labelTextContent);
		this.nameDataPresetCheckboxContainer.appendChild(label);
		this.nameDataPresetCheckboxElements.push(selectionCheckbox);
	}
	,onNameDataPresetSelectionChanged: function(keys) {
		var _gthis = this;
		var s = "";
		var keyCombinationMode = this.nameDataCombinationModeListElement.value;
		switch(keyCombinationMode) {
		case "Append Entire Datasets":
			var _g = 0;
			while(_g < keys.length) {
				var key = keys[_g];
				++_g;
				if(key == null) {
					throw haxe_Exception.thrown("FAIL: str != null");
				}
				var parts = key.split(" ");
				var results = "";
				var _g1 = 0;
				var _g11 = parts.length;
				while(_g1 < _g11) {
					var i = _g1++;
					var str = parts[i];
					if(!(str != null && str.length > 0)) {
						throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
					}
					results += HxOverrides.substr(str,0,1).toLowerCase() + HxOverrides.substr(str,1,str.length - 1);
					if(i <= parts.length - 1) {
						results += " ";
					}
				}
				var data = Reflect.getProperty(TrainingData,StringTools.replace(StringTools.trim(results)," ","_"));
				if(data == null) {
					continue;
				}
				var _g2 = 0;
				while(_g2 < data.length) {
					var i1 = data[_g2];
					++_g2;
					s += i1 + " ";
				}
				s = StringTools.rtrim(s);
			}
			break;
		case "Join Individual Words":
			var joinedWords = [];
			var result = new Array(keys.length);
			var _g = 0;
			var _g1 = keys.length;
			while(_g < _g1) {
				var i = _g++;
				var a = keys[i];
				if(a == null) {
					throw haxe_Exception.thrown("FAIL: str != null");
				}
				var parts = a.split(" ");
				var results = "";
				var _g2 = 0;
				var _g11 = parts.length;
				while(_g2 < _g11) {
					var i1 = _g2++;
					var str = parts[i1];
					if(!(str != null && str.length > 0)) {
						throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
					}
					results += HxOverrides.substr(str,0,1).toLowerCase() + HxOverrides.substr(str,1,str.length - 1);
					if(i1 <= parts.length - 1) {
						results += " ";
					}
				}
				result[i] = Reflect.getProperty(TrainingData,StringTools.replace(StringTools.trim(results)," ","_")).length;
			}
			var minLength = Lambda.fold(result,function(x,y) {
				return js_Boot.__cast(Math.min(js_Boot.__cast(x , Int),js_Boot.__cast(y , Int)) , Int);
			},16777215);
			var _g = 0;
			var _g1 = minLength;
			while(_g < _g1) {
				var i = _g++;
				var joinedWord = "";
				var _g2 = 0;
				var _g3 = keys.length;
				while(_g2 < _g3) {
					var k = _g2++;
					var name = keys[k];
					if(name == null) {
						throw haxe_Exception.thrown("FAIL: str != null");
					}
					var parts = name.split(" ");
					var results = "";
					var _g4 = 0;
					var _g11 = parts.length;
					while(_g4 < _g11) {
						var i1 = _g4++;
						var str = parts[i1];
						if(!(str != null && str.length > 0)) {
							throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
						}
						results += HxOverrides.substr(str,0,1).toLowerCase() + HxOverrides.substr(str,1,str.length - 1);
						if(i1 <= parts.length - 1) {
							results += " ";
						}
					}
					var data = Reflect.getProperty(TrainingData,StringTools.replace(StringTools.trim(results)," ","_"));
					joinedWord += data[i];
					if(k != keys.length - 1) {
						joinedWord += "_";
					}
				}
				joinedWords.push(joinedWord);
			}
			s += joinedWords.join(" ");
			break;
		}
		this.trainingDataTextEdit.value = s;
	}
	,generateAndRecombine: function(presetNames,data) {
		var title = "";
		var _g = 0;
		var _g1 = presetNames.length;
		while(_g < _g1) {
			var i = _g++;
			title += presetNames[i];
			if(presetNames.length != 1 && i != presetNames.length - 1) {
				title += " & ";
			}
		}
		this.namesTitleElement.innerHTML = title;
		var dataSets = new haxe_ds_IntMap();
		var dataSetCount = 0;
		var _g = 0;
		while(_g < data.length) {
			var item = data[_g];
			++_g;
			var parts = item.split("_");
			var _g1 = 0;
			var _g2 = parts.length;
			while(_g1 < _g2) {
				var i = _g1++;
				if(!dataSets.h.hasOwnProperty(i)) {
					var value = markov_util_ArraySet.create();
					dataSets.h[i] = value;
					++dataSetCount;
				}
				markov_util_ArraySet.add(dataSets.h[i],parts[i]);
			}
		}
		var processingTimePerSet = dataSetCount > 0 ? this.maxProcessingTime / dataSetCount : 0;
		var generatedNameSets = [];
		var dataSet = dataSets.iterator();
		while(dataSet.hasNext()) {
			var dataSet1 = dataSet.next();
			var data = markov_util_ArraySet.toArray(dataSet1);
			var tmp;
			if(data == null || data.length == 0) {
				tmp = [];
			} else {
				var duplicateTrie = new markov_util_PrefixTrie();
				var _g = 0;
				while(_g < data.length) {
					var name = data[_g];
					++_g;
					duplicateTrie.insert(name);
				}
				var generator = new markov_namegen_NameGenerator(data,this.order,this.prior,this.backoff == 0 ? false : true);
				var names = [];
				var startTime = new Date().getTime();
				var currentTime = new Date().getTime();
				var regex = this.get_regexMatch() == "" ? null : new EReg(this.get_regexMatch(),"i");
				while(names.length < this.maxWordsToGenerate && currentTime < startTime + processingTimePerSet) {
					var name1 = generator.generateName(this.minLength,this.maxLength,this.get_startsWith(),this.get_endsWith(),this.get_includes(),this.get_excludes(),regex);
					if(name1 != null && !duplicateTrie.find(name1)) {
						names.push(name1);
						duplicateTrie.insert(name1);
					}
					currentTime = new Date().getTime();
				}
				tmp = names;
			}
			generatedNameSets.push(tmp);
		}
		if(generatedNameSets.length == 1) {
			var names = generatedNameSets[0];
			var _gthis = this;
			this.lastGeneratedNames = names;
			if(this.get_similar().length > 0) {
				names.sort(function(x,y) {
					var target = _gthis.get_similar();
					if(x == null) {
						throw haxe_Exception.thrown("FAIL: source != null");
					}
					if(target == null) {
						throw haxe_Exception.thrown("FAIL: target != null");
					}
					var xSimilarity;
					if(x.length == 0) {
						xSimilarity = target.length;
					} else if(target.length == 0) {
						xSimilarity = x.length;
					} else {
						var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
						xSimilarity = table[table.length - 1];
					}
					var target = _gthis.get_similar();
					if(y == null) {
						throw haxe_Exception.thrown("FAIL: source != null");
					}
					if(target == null) {
						throw haxe_Exception.thrown("FAIL: target != null");
					}
					var ySimilarity;
					if(y.length == 0) {
						ySimilarity = target.length;
					} else if(target.length == 0) {
						ySimilarity = y.length;
					} else {
						var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
						ySimilarity = table[table.length - 1];
					}
					if(xSimilarity > ySimilarity) {
						return 1;
					} else if(xSimilarity < ySimilarity) {
						return -1;
					} else {
						return 0;
					}
				});
			}
			this.noNamesFoundElement.innerHTML = "";
			this.currentNamesElement.innerHTML = "";
			if(names.length == 0) {
				this.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
			}
			var _g = 0;
			while(_g < names.length) {
				var name = names[_g];
				++_g;
				var li = window.document.createElement("li");
				if(!(name != null && name.length > 0)) {
					throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
				}
				li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
				this.currentNamesElement.appendChild(li);
			}
		} else {
			var recombinedNames = [];
			var _g = 0;
			var _g1 = this.maxWordsToGenerate;
			while(_g < _g1) {
				var wordIdx = _g++;
				var name = "";
				var _g2 = 0;
				while(_g2 < generatedNameSets.length) {
					var set = generatedNameSets[_g2];
					++_g2;
					if(wordIdx < set.length) {
						name += set[wordIdx];
						name += " ";
					}
				}
				name = StringTools.trim(name);
				if(name.length > 0) {
					recombinedNames.push(name);
				}
			}
			var _gthis1 = this;
			this.lastGeneratedNames = recombinedNames;
			if(this.get_similar().length > 0) {
				recombinedNames.sort(function(x,y) {
					var target = _gthis1.get_similar();
					if(x == null) {
						throw haxe_Exception.thrown("FAIL: source != null");
					}
					if(target == null) {
						throw haxe_Exception.thrown("FAIL: target != null");
					}
					var xSimilarity;
					if(x.length == 0) {
						xSimilarity = target.length;
					} else if(target.length == 0) {
						xSimilarity = x.length;
					} else {
						var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
						xSimilarity = table[table.length - 1];
					}
					var target = _gthis1.get_similar();
					if(y == null) {
						throw haxe_Exception.thrown("FAIL: source != null");
					}
					if(target == null) {
						throw haxe_Exception.thrown("FAIL: target != null");
					}
					var ySimilarity;
					if(y.length == 0) {
						ySimilarity = target.length;
					} else if(target.length == 0) {
						ySimilarity = y.length;
					} else {
						var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
						ySimilarity = table[table.length - 1];
					}
					if(xSimilarity > ySimilarity) {
						return 1;
					} else if(xSimilarity < ySimilarity) {
						return -1;
					} else {
						return 0;
					}
				});
			}
			this.noNamesFoundElement.innerHTML = "";
			this.currentNamesElement.innerHTML = "";
			if(recombinedNames.length == 0) {
				this.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
			}
			var _g = 0;
			while(_g < recombinedNames.length) {
				var name = recombinedNames[_g];
				++_g;
				var li = window.document.createElement("li");
				if(!(name != null && name.length > 0)) {
					throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
				}
				li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
				this.currentNamesElement.appendChild(li);
			}
		}
	}
	,generate: function(data,maxProcessingTime) {
		if(data == null || data.length == 0) {
			return [];
		}
		var duplicateTrie = new markov_util_PrefixTrie();
		var _g = 0;
		while(_g < data.length) {
			var name = data[_g];
			++_g;
			duplicateTrie.insert(name);
		}
		var generator = new markov_namegen_NameGenerator(data,this.order,this.prior,this.backoff == 0 ? false : true);
		var names = [];
		var startTime = new Date().getTime();
		var currentTime = new Date().getTime();
		var regex = this.get_regexMatch() == "" ? null : new EReg(this.get_regexMatch(),"i");
		while(names.length < this.maxWordsToGenerate && currentTime < startTime + maxProcessingTime) {
			var name = generator.generateName(this.minLength,this.maxLength,this.get_startsWith(),this.get_endsWith(),this.get_includes(),this.get_excludes(),regex);
			if(name != null && !duplicateTrie.find(name)) {
				names.push(name);
				duplicateTrie.insert(name);
			}
			currentTime = new Date().getTime();
		}
		return names;
	}
	,generateForRandomPresets: function(numPresets) {
		var topics = Type.getClassFields(TrainingData);
		var keys = [];
		var _g = 0;
		var _g1 = numPresets;
		while(_g < _g1) {
			var i = _g++;
			var str = StringTools.replace(topics[Std.random(topics.length)],"_"," ");
			if(str == null) {
				throw haxe_Exception.thrown("FAIL: str != null");
			}
			var parts = str.split(" ");
			var results = "";
			var _g2 = 0;
			var _g11 = parts.length;
			while(_g2 < _g11) {
				var i1 = _g2++;
				var str1 = parts[i1];
				if(!(str1 != null && str1.length > 0)) {
					throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
				}
				results += HxOverrides.substr(str1,0,1).toUpperCase() + HxOverrides.substr(str1,1,str1.length - 1);
				if(i1 <= parts.length - 1) {
					results += " ";
				}
			}
			keys.push(StringTools.trim(results));
		}
		this.set_trainingDataKeys(keys);
		var arr = StringTools.replace(StringTools.replace(this.trainingDataTextEdit.value,"\r\n"," "),"\n"," ").split(" ");
		if(arr == null || arr.length == 0) {
			return;
		}
		var presetNames = this.get_trainingDataKeys();
		var title = "";
		var _g = 0;
		var _g1 = presetNames.length;
		while(_g < _g1) {
			var i = _g++;
			title += presetNames[i];
			if(presetNames.length != 1 && i != presetNames.length - 1) {
				title += " & ";
			}
		}
		this.namesTitleElement.innerHTML = title;
		var dataSets = new haxe_ds_IntMap();
		var dataSetCount = 0;
		var _g = 0;
		while(_g < arr.length) {
			var item = arr[_g];
			++_g;
			var parts = item.split("_");
			var _g1 = 0;
			var _g2 = parts.length;
			while(_g1 < _g2) {
				var i = _g1++;
				if(!dataSets.h.hasOwnProperty(i)) {
					var value = markov_util_ArraySet.create();
					dataSets.h[i] = value;
					++dataSetCount;
				}
				markov_util_ArraySet.add(dataSets.h[i],parts[i]);
			}
		}
		var processingTimePerSet = dataSetCount > 0 ? this.maxProcessingTime / dataSetCount : 0;
		var generatedNameSets = [];
		var dataSet = dataSets.iterator();
		while(dataSet.hasNext()) {
			var dataSet1 = dataSet.next();
			var data = markov_util_ArraySet.toArray(dataSet1);
			var tmp;
			if(data == null || data.length == 0) {
				tmp = [];
			} else {
				var duplicateTrie = new markov_util_PrefixTrie();
				var _g = 0;
				while(_g < data.length) {
					var name = data[_g];
					++_g;
					duplicateTrie.insert(name);
				}
				var generator = new markov_namegen_NameGenerator(data,this.order,this.prior,this.backoff == 0 ? false : true);
				var names = [];
				var startTime = new Date().getTime();
				var currentTime = new Date().getTime();
				var regex = this.get_regexMatch() == "" ? null : new EReg(this.get_regexMatch(),"i");
				while(names.length < this.maxWordsToGenerate && currentTime < startTime + processingTimePerSet) {
					var name1 = generator.generateName(this.minLength,this.maxLength,this.get_startsWith(),this.get_endsWith(),this.get_includes(),this.get_excludes(),regex);
					if(name1 != null && !duplicateTrie.find(name1)) {
						names.push(name1);
						duplicateTrie.insert(name1);
					}
					currentTime = new Date().getTime();
				}
				tmp = names;
			}
			generatedNameSets.push(tmp);
		}
		if(generatedNameSets.length == 1) {
			var names = generatedNameSets[0];
			var _gthis = this;
			this.lastGeneratedNames = names;
			if(this.get_similar().length > 0) {
				names.sort(function(x,y) {
					var target = _gthis.get_similar();
					if(x == null) {
						throw haxe_Exception.thrown("FAIL: source != null");
					}
					if(target == null) {
						throw haxe_Exception.thrown("FAIL: target != null");
					}
					var xSimilarity;
					if(x.length == 0) {
						xSimilarity = target.length;
					} else if(target.length == 0) {
						xSimilarity = x.length;
					} else {
						var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
						xSimilarity = table[table.length - 1];
					}
					var target = _gthis.get_similar();
					if(y == null) {
						throw haxe_Exception.thrown("FAIL: source != null");
					}
					if(target == null) {
						throw haxe_Exception.thrown("FAIL: target != null");
					}
					var ySimilarity;
					if(y.length == 0) {
						ySimilarity = target.length;
					} else if(target.length == 0) {
						ySimilarity = y.length;
					} else {
						var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
						ySimilarity = table[table.length - 1];
					}
					if(xSimilarity > ySimilarity) {
						return 1;
					} else if(xSimilarity < ySimilarity) {
						return -1;
					} else {
						return 0;
					}
				});
			}
			this.noNamesFoundElement.innerHTML = "";
			this.currentNamesElement.innerHTML = "";
			if(names.length == 0) {
				this.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
			}
			var _g = 0;
			while(_g < names.length) {
				var name = names[_g];
				++_g;
				var li = window.document.createElement("li");
				if(!(name != null && name.length > 0)) {
					throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
				}
				li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
				this.currentNamesElement.appendChild(li);
			}
		} else {
			var recombinedNames = [];
			var _g = 0;
			var _g1 = this.maxWordsToGenerate;
			while(_g < _g1) {
				var wordIdx = _g++;
				var name = "";
				var _g2 = 0;
				while(_g2 < generatedNameSets.length) {
					var set = generatedNameSets[_g2];
					++_g2;
					if(wordIdx < set.length) {
						name += set[wordIdx];
						name += " ";
					}
				}
				name = StringTools.trim(name);
				if(name.length > 0) {
					recombinedNames.push(name);
				}
			}
			var _gthis1 = this;
			this.lastGeneratedNames = recombinedNames;
			if(this.get_similar().length > 0) {
				recombinedNames.sort(function(x,y) {
					var target = _gthis1.get_similar();
					if(x == null) {
						throw haxe_Exception.thrown("FAIL: source != null");
					}
					if(target == null) {
						throw haxe_Exception.thrown("FAIL: target != null");
					}
					var xSimilarity;
					if(x.length == 0) {
						xSimilarity = target.length;
					} else if(target.length == 0) {
						xSimilarity = x.length;
					} else {
						var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
						xSimilarity = table[table.length - 1];
					}
					var target = _gthis1.get_similar();
					if(y == null) {
						throw haxe_Exception.thrown("FAIL: source != null");
					}
					if(target == null) {
						throw haxe_Exception.thrown("FAIL: target != null");
					}
					var ySimilarity;
					if(y.length == 0) {
						ySimilarity = target.length;
					} else if(target.length == 0) {
						ySimilarity = y.length;
					} else {
						var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
						ySimilarity = table[table.length - 1];
					}
					if(xSimilarity > ySimilarity) {
						return 1;
					} else if(xSimilarity < ySimilarity) {
						return -1;
					} else {
						return 0;
					}
				});
			}
			this.noNamesFoundElement.innerHTML = "";
			this.currentNamesElement.innerHTML = "";
			if(recombinedNames.length == 0) {
				this.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
			}
			var _g = 0;
			while(_g < recombinedNames.length) {
				var name = recombinedNames[_g];
				++_g;
				var li = window.document.createElement("li");
				if(!(name != null && name.length > 0)) {
					throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
				}
				li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
				this.currentNamesElement.appendChild(li);
			}
		}
	}
	,generateForCurrentSettings: function() {
		var arr = StringTools.replace(StringTools.replace(this.trainingDataTextEdit.value,"\r\n"," "),"\n"," ").split(" ");
		if(arr == null || arr.length == 0) {
			return;
		}
		var presetNames = this.get_trainingDataKeys();
		var title = "";
		var _g = 0;
		var _g1 = presetNames.length;
		while(_g < _g1) {
			var i = _g++;
			title += presetNames[i];
			if(presetNames.length != 1 && i != presetNames.length - 1) {
				title += " & ";
			}
		}
		this.namesTitleElement.innerHTML = title;
		var dataSets = new haxe_ds_IntMap();
		var dataSetCount = 0;
		var _g = 0;
		while(_g < arr.length) {
			var item = arr[_g];
			++_g;
			var parts = item.split("_");
			var _g1 = 0;
			var _g2 = parts.length;
			while(_g1 < _g2) {
				var i = _g1++;
				if(!dataSets.h.hasOwnProperty(i)) {
					var value = markov_util_ArraySet.create();
					dataSets.h[i] = value;
					++dataSetCount;
				}
				markov_util_ArraySet.add(dataSets.h[i],parts[i]);
			}
		}
		var processingTimePerSet = dataSetCount > 0 ? this.maxProcessingTime / dataSetCount : 0;
		var generatedNameSets = [];
		var dataSet = dataSets.iterator();
		while(dataSet.hasNext()) {
			var dataSet1 = dataSet.next();
			var data = markov_util_ArraySet.toArray(dataSet1);
			var tmp;
			if(data == null || data.length == 0) {
				tmp = [];
			} else {
				var duplicateTrie = new markov_util_PrefixTrie();
				var _g = 0;
				while(_g < data.length) {
					var name = data[_g];
					++_g;
					duplicateTrie.insert(name);
				}
				var generator = new markov_namegen_NameGenerator(data,this.order,this.prior,this.backoff == 0 ? false : true);
				var names = [];
				var startTime = new Date().getTime();
				var currentTime = new Date().getTime();
				var regex = this.get_regexMatch() == "" ? null : new EReg(this.get_regexMatch(),"i");
				while(names.length < this.maxWordsToGenerate && currentTime < startTime + processingTimePerSet) {
					var name1 = generator.generateName(this.minLength,this.maxLength,this.get_startsWith(),this.get_endsWith(),this.get_includes(),this.get_excludes(),regex);
					if(name1 != null && !duplicateTrie.find(name1)) {
						names.push(name1);
						duplicateTrie.insert(name1);
					}
					currentTime = new Date().getTime();
				}
				tmp = names;
			}
			generatedNameSets.push(tmp);
		}
		if(generatedNameSets.length == 1) {
			var names = generatedNameSets[0];
			var _gthis = this;
			this.lastGeneratedNames = names;
			if(this.get_similar().length > 0) {
				names.sort(function(x,y) {
					var target = _gthis.get_similar();
					if(x == null) {
						throw haxe_Exception.thrown("FAIL: source != null");
					}
					if(target == null) {
						throw haxe_Exception.thrown("FAIL: target != null");
					}
					var xSimilarity;
					if(x.length == 0) {
						xSimilarity = target.length;
					} else if(target.length == 0) {
						xSimilarity = x.length;
					} else {
						var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
						xSimilarity = table[table.length - 1];
					}
					var target = _gthis.get_similar();
					if(y == null) {
						throw haxe_Exception.thrown("FAIL: source != null");
					}
					if(target == null) {
						throw haxe_Exception.thrown("FAIL: target != null");
					}
					var ySimilarity;
					if(y.length == 0) {
						ySimilarity = target.length;
					} else if(target.length == 0) {
						ySimilarity = y.length;
					} else {
						var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
						ySimilarity = table[table.length - 1];
					}
					if(xSimilarity > ySimilarity) {
						return 1;
					} else if(xSimilarity < ySimilarity) {
						return -1;
					} else {
						return 0;
					}
				});
			}
			this.noNamesFoundElement.innerHTML = "";
			this.currentNamesElement.innerHTML = "";
			if(names.length == 0) {
				this.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
			}
			var _g = 0;
			while(_g < names.length) {
				var name = names[_g];
				++_g;
				var li = window.document.createElement("li");
				if(!(name != null && name.length > 0)) {
					throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
				}
				li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
				this.currentNamesElement.appendChild(li);
			}
		} else {
			var recombinedNames = [];
			var _g = 0;
			var _g1 = this.maxWordsToGenerate;
			while(_g < _g1) {
				var wordIdx = _g++;
				var name = "";
				var _g2 = 0;
				while(_g2 < generatedNameSets.length) {
					var set = generatedNameSets[_g2];
					++_g2;
					if(wordIdx < set.length) {
						name += set[wordIdx];
						name += " ";
					}
				}
				name = StringTools.trim(name);
				if(name.length > 0) {
					recombinedNames.push(name);
				}
			}
			var _gthis1 = this;
			this.lastGeneratedNames = recombinedNames;
			if(this.get_similar().length > 0) {
				recombinedNames.sort(function(x,y) {
					var target = _gthis1.get_similar();
					if(x == null) {
						throw haxe_Exception.thrown("FAIL: source != null");
					}
					if(target == null) {
						throw haxe_Exception.thrown("FAIL: target != null");
					}
					var xSimilarity;
					if(x.length == 0) {
						xSimilarity = target.length;
					} else if(target.length == 0) {
						xSimilarity = x.length;
					} else {
						var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
						xSimilarity = table[table.length - 1];
					}
					var target = _gthis1.get_similar();
					if(y == null) {
						throw haxe_Exception.thrown("FAIL: source != null");
					}
					if(target == null) {
						throw haxe_Exception.thrown("FAIL: target != null");
					}
					var ySimilarity;
					if(y.length == 0) {
						ySimilarity = target.length;
					} else if(target.length == 0) {
						ySimilarity = y.length;
					} else {
						var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
						ySimilarity = table[table.length - 1];
					}
					if(xSimilarity > ySimilarity) {
						return 1;
					} else if(xSimilarity < ySimilarity) {
						return -1;
					} else {
						return 0;
					}
				});
			}
			this.noNamesFoundElement.innerHTML = "";
			this.currentNamesElement.innerHTML = "";
			if(recombinedNames.length == 0) {
				this.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
			}
			var _g = 0;
			while(_g < recombinedNames.length) {
				var name = recombinedNames[_g];
				++_g;
				var li = window.document.createElement("li");
				if(!(name != null && name.length > 0)) {
					throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
				}
				li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
				this.currentNamesElement.appendChild(li);
			}
		}
	}
	,setNames: function(names) {
		var _gthis = this;
		this.lastGeneratedNames = names;
		if(this.get_similar().length > 0) {
			names.sort(function(x,y) {
				var target = _gthis.get_similar();
				if(x == null) {
					throw haxe_Exception.thrown("FAIL: source != null");
				}
				if(target == null) {
					throw haxe_Exception.thrown("FAIL: target != null");
				}
				var xSimilarity;
				if(x.length == 0) {
					xSimilarity = target.length;
				} else if(target.length == 0) {
					xSimilarity = x.length;
				} else {
					var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
					xSimilarity = table[table.length - 1];
				}
				var target = _gthis.get_similar();
				if(y == null) {
					throw haxe_Exception.thrown("FAIL: source != null");
				}
				if(target == null) {
					throw haxe_Exception.thrown("FAIL: target != null");
				}
				var ySimilarity;
				if(y.length == 0) {
					ySimilarity = target.length;
				} else if(target.length == 0) {
					ySimilarity = y.length;
				} else {
					var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
					ySimilarity = table[table.length - 1];
				}
				if(xSimilarity > ySimilarity) {
					return 1;
				} else if(xSimilarity < ySimilarity) {
					return -1;
				} else {
					return 0;
				}
			});
		}
		this.noNamesFoundElement.innerHTML = "";
		this.currentNamesElement.innerHTML = "";
		if(names.length == 0) {
			this.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
		}
		var _g = 0;
		while(_g < names.length) {
			var name = names[_g];
			++_g;
			var li = window.document.createElement("li");
			if(!(name != null && name.length > 0)) {
				throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
			}
			li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
			this.currentNamesElement.appendChild(li);
		}
	}
	,sanitizeTrainingData: function(data) {
		return StringTools.replace(StringTools.replace(data,"\r\n"," "),"\n"," ").split(" ");
	}
	,trainingDataFieldToDisplayName: function(field) {
		var str = StringTools.replace(field,"_"," ");
		if(str == null) {
			throw haxe_Exception.thrown("FAIL: str != null");
		}
		var parts = str.split(" ");
		var results = "";
		var _g = 0;
		var _g1 = parts.length;
		while(_g < _g1) {
			var i = _g++;
			var str = parts[i];
			if(!(str != null && str.length > 0)) {
				throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
			}
			results += HxOverrides.substr(str,0,1).toUpperCase() + HxOverrides.substr(str,1,str.length - 1);
			if(i <= parts.length - 1) {
				results += " ";
			}
		}
		return StringTools.trim(results);
	}
	,displayNameToTrainingDataField: function(name) {
		if(name == null) {
			throw haxe_Exception.thrown("FAIL: str != null");
		}
		var parts = name.split(" ");
		var results = "";
		var _g = 0;
		var _g1 = parts.length;
		while(_g < _g1) {
			var i = _g++;
			var str = parts[i];
			if(!(str != null && str.length > 0)) {
				throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
			}
			results += HxOverrides.substr(str,0,1).toLowerCase() + HxOverrides.substr(str,1,str.length - 1);
			if(i <= parts.length - 1) {
				results += " ";
			}
		}
		return StringTools.replace(StringTools.trim(results)," ","_");
	}
	,get_trainingDataKeys: function() {
		var keys = [];
		var _g = 0;
		var _g1 = this.nameDataPresetCheckboxElements;
		while(_g < _g1.length) {
			var checkboxElement = _g1[_g];
			++_g;
			if(checkboxElement.checked) {
				keys.push(checkboxElement.value);
			}
		}
		if(keys.length == 0) {
			return ["Animals"];
		}
		return keys;
	}
	,get_trainingDataId: function() {
		return this.nameDataPresetListElement.value;
	}
	,set_trainingDataKeys: function(keys) {
		this.nameDataPresetListElement.value = keys[keys.length - 1];
		this.nameDataSearchBoxElement.value = keys[keys.length - 1];
		var _g = 0;
		var _g1 = this.nameDataPresetCheckboxElements;
		while(_g < _g1.length) {
			var checkboxElement = [_g1[_g]];
			++_g;
			var isChecked = (function(checkboxElement) {
				return function() {
					var _g = 0;
					while(_g < keys.length) {
						var key = keys[_g];
						++_g;
						if(checkboxElement[0].value == key) {
							return true;
						}
					}
					return false;
				};
			})(checkboxElement);
			checkboxElement[0].checked = isChecked();
		}
		this.onNameDataPresetSelectionChanged(keys);
		return this.get_trainingDataKeys();
	}
	,get_startsWith: function() {
		return this.startsWithElement.value.toLowerCase();
	}
	,set_startsWith: function(s) {
		return this.startsWithElement.value = s.toLowerCase();
	}
	,get_endsWith: function() {
		return this.endsWithElement.value.toLowerCase();
	}
	,set_endsWith: function(s) {
		return this.endsWithElement.value = s.toLowerCase();
	}
	,get_includes: function() {
		return this.includesElement.value.toLowerCase();
	}
	,set_includes: function(s) {
		return this.includesElement.value = s.toLowerCase();
	}
	,get_excludes: function() {
		return this.excludesElement.value.toLowerCase();
	}
	,set_excludes: function(s) {
		return this.excludesElement.value = s.toLowerCase();
	}
	,get_similar: function() {
		return this.similarElement.value.toLowerCase();
	}
	,set_similar: function(s) {
		return this.similarElement.value = s.toLowerCase();
	}
	,get_regexMatch: function() {
		return this.regexMatchElement.value;
	}
	,set_regexMatch: function(s) {
		return this.regexMatchElement.value = s;
	}
	,__class__: Main
	,__properties__: {set_trainingDataKeys:"set_trainingDataKeys",get_trainingDataKeys:"get_trainingDataKeys",set_regexMatch:"set_regexMatch",get_regexMatch:"get_regexMatch",set_similar:"set_similar",get_similar:"get_similar",set_excludes:"set_excludes",get_excludes:"get_excludes",set_includes:"set_includes",get_includes:"get_includes",set_endsWith:"set_endsWith",get_endsWith:"get_endsWith",set_startsWith:"set_startsWith",get_startsWith:"get_startsWith"}
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) {
		return null;
	} else {
		var tmp1;
		if(o.__properties__) {
			tmp = o.__properties__["get_" + field];
			tmp1 = tmp;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			return o[tmp]();
		} else {
			return o[field];
		}
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
var CustomQueryStringOption = $hxEnums["CustomQueryStringOption"] = { __ename__:true,__constructs__:null
	,EVERYTHING: {_hx_name:"EVERYTHING",_hx_index:0,__enum__:"CustomQueryStringOption",toString:$estr}
	,NO_TRAINING_DATA: {_hx_name:"NO_TRAINING_DATA",_hx_index:1,__enum__:"CustomQueryStringOption",toString:$estr}
};
CustomQueryStringOption.__constructs__ = [CustomQueryStringOption.EVERYTHING,CustomQueryStringOption.NO_TRAINING_DATA];
var ShareResults = function() { };
ShareResults.__name__ = true;
ShareResults.isQueryStringEmpty = function() {
	var params = window.location.search.substring(1);
	if(params == null || params == "") {
		return true;
	}
	return false;
};
ShareResults.applySettings = function(m) {
	var params = window.location.search.substring(1);
	if(params == null || params == "") {
		return;
	}
	var params = window.location.search.substring(1);
	var splitParams = params.split("&");
	var customTrainingData = [];
	var sharedResultData = [];
	var _g = 0;
	while(_g < splitParams.length) {
		var param = splitParams[_g];
		++_g;
		var kv = param.split("=");
		if(kv.length < 2) {
			continue;
		}
		var k = decodeURIComponent(kv[0].split("+").join(" "));
		var v = decodeURIComponent(kv[1].split("+").join(" "));
		switch(k) {
		case "backoff":
			m.backoff = Std.parseInt(v);
			break;
		case "ends_width":
			m.set_endsWith(v);
			break;
		case "excludes":
			m.set_excludes(v);
			break;
		case "includes":
			m.set_includes(v);
			break;
		case "length_range_max":
			m.maxLength = Std.parseInt(v);
			break;
		case "length_range_min":
			m.minLength = Std.parseInt(v);
			break;
		case "max_processing_time":
			m.maxProcessingTime = Std.parseInt(v);
			break;
		case "max_words":
			m.maxWordsToGenerate = Std.parseInt(v);
			break;
		case "order":
			m.order = Std.parseInt(v);
			break;
		case "prior":
			m.prior = parseFloat(v);
			break;
		case "r":
			sharedResultData.push(v);
			break;
		case "regex_match":
			m.set_regexMatch(v);
			break;
		case "similar_to":
			m.set_similar(v);
			break;
		case "starts_with":
			m.set_startsWith(v);
			break;
		case "w":
			customTrainingData.push(v);
			break;
		}
	}
	if(sharedResultData.length > 0) {
		var _gthis = m;
		m.lastGeneratedNames = sharedResultData;
		if(m.get_similar().length > 0) {
			sharedResultData.sort(function(x,y) {
				var target = _gthis.get_similar();
				if(x == null) {
					throw haxe_Exception.thrown("FAIL: source != null");
				}
				if(target == null) {
					throw haxe_Exception.thrown("FAIL: target != null");
				}
				var xSimilarity;
				if(x.length == 0) {
					xSimilarity = target.length;
				} else if(target.length == 0) {
					xSimilarity = x.length;
				} else {
					var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(x,target,true);
					xSimilarity = table[table.length - 1];
				}
				var target = _gthis.get_similar();
				if(y == null) {
					throw haxe_Exception.thrown("FAIL: source != null");
				}
				if(target == null) {
					throw haxe_Exception.thrown("FAIL: target != null");
				}
				var ySimilarity;
				if(y.length == 0) {
					ySimilarity = target.length;
				} else if(target.length == 0) {
					ySimilarity = y.length;
				} else {
					var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(y,target,true);
					ySimilarity = table[table.length - 1];
				}
				if(xSimilarity > ySimilarity) {
					return 1;
				} else if(xSimilarity < ySimilarity) {
					return -1;
				} else {
					return 0;
				}
			});
		}
		m.noNamesFoundElement.innerHTML = "";
		m.currentNamesElement.innerHTML = "";
		if(sharedResultData.length == 0) {
			m.noNamesFoundElement.textContent = "No names found, try again or change the name generation settings. Reducing the model order, adjusting the allowed word length, increasing the prior or removing the filters may help.";
		}
		var _g = 0;
		while(_g < sharedResultData.length) {
			var name = sharedResultData[_g];
			++_g;
			var li = window.document.createElement("li");
			if(!(name != null && name.length > 0)) {
				throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
			}
			li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
			m.currentNamesElement.appendChild(li);
		}
	}
	if(customTrainingData.length > 3) {
		TrainingData["custom"] = customTrainingData;
		m.set_trainingDataKeys(["custom"]);
	}
};
ShareResults.makeCustomQueryString = function(m,mode) {
	var s = "https://www.samcodes.co.uk/project/markov-namegen";
	var appendKv = function(k,v,sep) {
		if(sep == null) {
			sep = "&";
		}
		if(k == null || k.length == 0 || v == null || v.length == 0) {
			return;
		}
		s += sep + encodeURIComponent(k) + "=" + encodeURIComponent(v);
	};
	appendKv("length_range_min",m.minLength == null ? "null" : "" + m.minLength,"?");
	appendKv("length_range_max",m.maxLength == null ? "null" : "" + m.maxLength);
	appendKv("order",m.order == null ? "null" : "" + m.order);
	appendKv("prior",m.prior == null ? "null" : "" + m.prior);
	appendKv("backoff",m.backoff == null ? "null" : "" + m.backoff);
	appendKv("max_words",m.maxWordsToGenerate == null ? "null" : "" + m.maxWordsToGenerate);
	appendKv("max_processing_time",m.maxProcessingTime == null ? "null" : "" + m.maxProcessingTime);
	appendKv("starts_with",m.get_startsWith());
	appendKv("ends_width",m.get_endsWith());
	appendKv("includes",m.get_includes());
	appendKv("excludes",m.get_excludes());
	appendKv("similar_to",m.get_similar());
	appendKv("regex_match",m.get_regexMatch());
	if(mode != CustomQueryStringOption.NO_TRAINING_DATA) {
		var data = m.trainingDataTextEdit.value.split(" ");
		if(data.length > 1) {
			var _g = 0;
			while(_g < data.length) {
				var word = data[_g];
				++_g;
				if(word != null && word.length != 0) {
					appendKv("w",word);
				}
			}
		}
	}
	if(m.lastGeneratedNames.length > 0) {
		var _g = 0;
		var _g1 = m.lastGeneratedNames;
		while(_g < _g1.length) {
			var name = _g1[_g];
			++_g;
			if(name != null && name.length != 0) {
				appendKv("r",name);
			}
		}
	}
	return s;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
Std.random = function(x) {
	if(x <= 0) {
		return 0;
	} else {
		return Math.floor(Math.random() * x);
	}
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.startsWith = function(s,start) {
	if(s.length >= start.length) {
		return s.lastIndexOf(start,0) == 0;
	} else {
		return false;
	}
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	if(slen >= elen) {
		return s.indexOf(end,slen - elen) == slen - elen;
	} else {
		return false;
	}
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var TrainingData = function() { };
TrainingData.__name__ = true;
var Type = function() { };
Type.__name__ = true;
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"__meta__");
	HxOverrides.remove(a,"prototype");
	return a;
};
var UInt = {};
UInt.gte = function(a,b) {
	var aNeg = a < 0;
	var bNeg = b < 0;
	if(aNeg != bNeg) {
		return aNeg;
	} else {
		return a >= b;
	}
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
haxe_IMap.__isInterface__ = true;
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
haxe_Exception.__name__ = true;
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
	,__properties__: {get_native:"get_native"}
});
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	__class__: haxe_ValueException
});
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) if(this.h.hasOwnProperty(key)) a.push(+key);
		return new haxe_iterators_ArrayIterator(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_List = function() {
	this.length = 0;
};
haxe_ds_List.__name__ = true;
haxe_ds_List.prototype = {
	add: function(item) {
		var x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,pop: function() {
		if(this.h == null) {
			return null;
		}
		var x = this.h.item;
		this.h = this.h.next;
		if(this.h == null) {
			this.q = null;
		}
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,__class__: haxe_ds_List
};
var haxe_ds__$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
haxe_ds__$List_ListNode.__name__ = true;
haxe_ds__$List_ListNode.prototype = {
	__class__: haxe_ds__$List_ListNode
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	__class__: haxe_ds_StringMap
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g = 0;
		var _g1 = intf.length;
		while(_g < _g1) {
			var i = _g++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__toStr = null;
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var markov_namegen_Generator = function(data,order,prior,backoff) {
	if(data == null) {
		throw haxe_Exception.thrown("FAIL: data != null");
	}
	if(!UInt.gte(order,1)) {
		throw haxe_Exception.thrown("FAIL: order >= 1");
	}
	if(!(prior >= 0)) {
		throw haxe_Exception.thrown("FAIL: prior >= 0");
	}
	this.order = order;
	this.prior = prior;
	this.backoff = backoff;
	var letters = markov_util_ArraySet.create();
	var _g = 0;
	while(_g < data.length) {
		var word = data[_g];
		++_g;
		var _g1 = 0;
		var _g2 = word.length;
		while(_g1 < _g2) {
			var i = _g1++;
			markov_util_ArraySet.add(letters,word.charAt(i));
		}
	}
	letters.sort(function(a,b) {
		if(a < b) {
			return -1;
		}
		if(a > b) {
			return 1;
		}
		return 0;
	});
	var domain = markov_util_ArraySet.toArray(letters);
	domain.splice(0,0,"#");
	this.models = [];
	if(this.backoff) {
		var _g = 0;
		var _g1 = order;
		while(_g < _g1) {
			var i = _g++;
			this.models.push(new markov_namegen_Model(data.slice(),order - i,prior,domain));
		}
	} else {
		this.models.push(new markov_namegen_Model(data.slice(),order,prior,domain));
	}
};
markov_namegen_Generator.__name__ = true;
markov_namegen_Generator.prototype = {
	generate: function() {
		var times = this.order;
		if(times < 1) {
			throw haxe_Exception.thrown("FAIL: times >= 1");
		}
		var output = "";
		var _g = 0;
		var _g1 = times;
		while(_g < _g1) {
			var i = _g++;
			output += "#";
		}
		var word = output;
		var letter = this.getLetter(word);
		while(letter != "#" && letter != null) {
			if(letter != null) {
				word += letter;
			}
			letter = this.getLetter(word);
		}
		return word;
	}
	,getLetter: function(word) {
		if(word == null) {
			throw haxe_Exception.thrown("FAIL: word != null");
		}
		if(word.length <= 0) {
			throw haxe_Exception.thrown("FAIL: word.length > 0");
		}
		var letter = null;
		var context = word.substring(word.length - this.order,word.length);
		var _g = 0;
		var _g1 = this.models;
		while(_g < _g1.length) {
			var model = _g1[_g];
			++_g;
			letter = model.generate(context);
			if(letter == null || letter == "#") {
				context = context.substring(1);
			} else {
				break;
			}
		}
		return letter;
	}
	,__class__: markov_namegen_Generator
};
var markov_namegen_Model = function(data,order,prior,alphabet) {
	if(!(alphabet != null && data != null)) {
		throw haxe_Exception.thrown("FAIL: alphabet != null && data != null");
	}
	if(!(alphabet.length > 0 && data.length > 0)) {
		throw haxe_Exception.thrown("FAIL: alphabet.length > 0 && data.length > 0");
	}
	if(!(prior >= 0 && prior <= 1)) {
		throw haxe_Exception.thrown("FAIL: prior >= 0 && prior <= 1");
	}
	this.order = order;
	this.prior = prior;
	this.alphabet = alphabet;
	this.observations = new haxe_ds_StringMap();
	this.train(data);
	this.buildChains();
};
markov_namegen_Model.__name__ = true;
markov_namegen_Model.countMatches = function(arr,v) {
	if(arr == null) {
		return 0;
	}
	var i = 0;
	var _g = 0;
	while(_g < arr.length) {
		var s = arr[_g];
		++_g;
		if(s == v) {
			++i;
		}
	}
	return i;
};
markov_namegen_Model.selectIndex = function(chain) {
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
	var _g = 0;
	var _g1 = totals.length;
	while(_g < _g1) {
		var i = _g++;
		if(rand < totals[i]) {
			return i;
		}
	}
	return 0;
};
markov_namegen_Model.prototype = {
	generate: function(context) {
		if(context == null) {
			throw haxe_Exception.thrown("FAIL: context != null");
		}
		var chain = this.chains.h[context];
		if(chain == null) {
			return null;
		} else {
			if(chain.length <= 0) {
				throw haxe_Exception.thrown("FAIL: chain.length > 0");
			}
			return this.alphabet[markov_namegen_Model.selectIndex(chain)];
		}
	}
	,retrain: function(data) {
		if(data == null) {
			throw haxe_Exception.thrown("FAIL: data != null");
		}
		this.train(data);
		this.buildChains();
	}
	,train: function(data) {
		while(data.length != 0) {
			var d = data.pop();
			var times = this.order;
			if(times < 1) {
				throw haxe_Exception.thrown("FAIL: times >= 1");
			}
			var output = "";
			var _g = 0;
			var _g1 = times;
			while(_g < _g1) {
				var i = _g++;
				output += "#";
			}
			d = output + d + "#";
			var _g2 = 0;
			var _g3 = d.length - this.order;
			while(_g2 < _g3) {
				var i1 = _g2++;
				var key = d.substring(i1,i1 + this.order);
				var value = this.observations.h[key];
				if(value == null) {
					value = [];
					this.observations.h[key] = value;
				}
				value.push(d.charAt(i1 + this.order));
			}
		}
	}
	,buildChains: function() {
		this.chains = new haxe_ds_StringMap();
		var h = this.observations.h;
		var context_h = h;
		var context_keys = Object.keys(h);
		var context_length = context_keys.length;
		var context_current = 0;
		while(context_current < context_length) {
			var context = context_keys[context_current++];
			var _g = 0;
			var _g1 = this.alphabet;
			while(_g < _g1.length) {
				var prediction = _g1[_g];
				++_g;
				var value = this.chains.h[context];
				if(value == null) {
					value = [];
					this.chains.h[context] = value;
				}
				var tmp = this.prior;
				var arr = this.observations.h[context];
				var tmp1;
				if(arr == null) {
					tmp1 = 0;
				} else {
					var i = 0;
					var _g2 = 0;
					while(_g2 < arr.length) {
						var s = arr[_g2];
						++_g2;
						if(s == prediction) {
							++i;
						}
					}
					tmp1 = i;
				}
				value.push(tmp + tmp1);
			}
		}
	}
	,__class__: markov_namegen_Model
};
var markov_namegen_NameGenerator = function(data,order,prior,backoff) {
	if(backoff == null) {
		backoff = false;
	}
	this.generator = new markov_namegen_Generator(data,order,prior,backoff);
};
markov_namegen_NameGenerator.__name__ = true;
markov_namegen_NameGenerator.prototype = {
	generateName: function(minLength,maxLength,startsWith,endsWith,includes,excludes,regexMatch) {
		var name = "";
		name = this.generator.generate();
		name = StringTools.replace(name,"#","");
		if(name.length >= minLength && name.length <= maxLength && StringTools.startsWith(name,startsWith) && StringTools.endsWith(name,endsWith) && (includes.length == 0 || name.indexOf(includes) != -1) && (excludes.length == 0 || name.indexOf(excludes) == -1) && (regexMatch == null || regexMatch.match(name))) {
			return name;
		}
		return null;
	}
	,generateNames: function(n,minLength,maxLength,startsWith,endsWith,includes,excludes,maxTimePerName,regexMatch) {
		if(maxTimePerName == null) {
			maxTimePerName = 0.02;
		}
		var names = [];
		var startTime = new Date().getTime();
		var currentTime = new Date().getTime();
		while(names.length < n && currentTime > startTime + maxTimePerName * n) {
			var name = this.generateName(minLength,maxLength,startsWith,endsWith,includes,excludes,regexMatch);
			if(name != null) {
				names.push(name);
			}
			currentTime = new Date().getTime();
		}
		return names;
	}
	,__class__: markov_namegen_NameGenerator
};
var markov_util_ArraySet = {};
markov_util_ArraySet.create = function(array) {
	if(array == null) {
		var this1 = [];
		return this1;
	}
	return markov_util_ArraySet.toSet(array);
};
markov_util_ArraySet.intersection = function(this1,set) {
	var result = [];
	var _g = 0;
	while(_g < this1.length) {
		var element = this1[_g];
		++_g;
		if(markov_util_ArraySet.contains(set,element)) {
			result.push(element);
		}
	}
	var this1 = result;
	return this1;
};
markov_util_ArraySet.union = function(this1,set) {
	return markov_util_ArraySet.toSet(this1.concat(markov_util_ArraySet.toArray(set)));
};
markov_util_ArraySet.unionArray = function(this1,array) {
	return markov_util_ArraySet.toSet(this1.concat(array));
};
markov_util_ArraySet.difference = function(this1,set) {
	var this2 = this1.slice();
	var result = this2;
	var _g = 0;
	var _g1 = set;
	while(_g < _g1.length) {
		var element = _g1[_g];
		++_g;
		HxOverrides.remove(result,element);
	}
	var this1 = markov_util_ArraySet.toArray(result);
	return this1;
};
markov_util_ArraySet.add = function(this1,element) {
	if(element == null) {
		throw haxe_Exception.thrown("FAIL: element != null");
	}
	if(markov_util_ArraySet.contains(this1,element)) {
		return false;
	}
	this1.push(element);
	return true;
};
markov_util_ArraySet.contains = function(this1,element) {
	var _g = 0;
	while(_g < this1.length) {
		var i = this1[_g];
		++_g;
		if(i == element) {
			return true;
		}
	}
	return false;
};
markov_util_ArraySet.copy = function(this1) {
	var this2 = this1.slice();
	return this2;
};
markov_util_ArraySet.slice = function(this1,position,end) {
	var this2 = this1.slice(position,end);
	return this2;
};
markov_util_ArraySet.splice = function(this1,position,length) {
	var this2 = this1.splice(position,length);
	return this2;
};
markov_util_ArraySet.toArray = function(this1) {
	return this1.slice();
};
markov_util_ArraySet.toSet = function(array) {
	var this1 = [];
	var set = this1;
	var _g = 0;
	while(_g < array.length) {
		var v = array[_g];
		++_g;
		markov_util_ArraySet.add(set,v);
	}
	return set;
};
markov_util_ArraySet._new = function(array) {
	var this1 = array;
	return this1;
};
var markov_util_EditDistanceMetrics = function() { };
markov_util_EditDistanceMetrics.__name__ = true;
markov_util_EditDistanceMetrics.levenshtein = function(source,target) {
	if(source == null) {
		throw haxe_Exception.thrown("FAIL: source != null");
	}
	if(target == null) {
		throw haxe_Exception.thrown("FAIL: target != null");
	}
	var slen = source.length;
	var tlen = target.length;
	if(slen == 0) {
		return tlen;
	}
	if(tlen == 0) {
		return slen;
	}
	var this1 = new Array(tlen + 1);
	var costs = this1;
	var _g = 0;
	var _g1 = costs.length;
	while(_g < _g1) {
		var i = _g++;
		costs[i] = i;
	}
	var s = 0;
	while(s < source.length) {
		costs[0] = s + 1;
		var corner = s;
		var t = 0;
		while(t < target.length) {
			var upper = costs[t + 1];
			if(source.charAt(s) == target.charAt(t)) {
				costs[t + 1] = corner;
			} else {
				var tc = upper < corner ? upper : corner;
				costs[t + 1] = (costs[t] < tc ? costs[t] : tc) + 1;
			}
			corner = upper;
			++t;
		}
		++s;
	}
	return costs[costs.length - 1];
};
markov_util_EditDistanceMetrics.damerauLevenshtein = function(source,target) {
	if(source == null) {
		throw haxe_Exception.thrown("FAIL: source != null");
	}
	if(target == null) {
		throw haxe_Exception.thrown("FAIL: target != null");
	}
	if(source.length == 0) {
		return target.length;
	}
	if(target.length == 0) {
		return source.length;
	}
	var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(source,target,true);
	return table[table.length - 1];
};
markov_util_EditDistanceMetrics.damerauLevenshteinMatrix = function(source,target,enableTranspositions) {
	if(enableTranspositions == null) {
		enableTranspositions = true;
	}
	if(!(source != null && target != null)) {
		throw haxe_Exception.thrown("FAIL: source != null && target != null");
	}
	var w = source.length;
	var h = target.length;
	if(w == 0 || h == 0) {
		var this1 = new Array(0);
		return this1;
	}
	++w;
	++h;
	var this1 = new Array(w * h);
	var costs = this1;
	var _g = 0;
	var _g1 = w;
	while(_g < _g1) {
		var i = _g++;
		costs[i] = i;
	}
	var _g = 1;
	var _g1 = h;
	while(_g < _g1) {
		var j = _g++;
		costs[j * w] = j;
	}
	var cost = 0;
	var _g = 1;
	var _g1 = w;
	while(_g < _g1) {
		var x = _g++;
		var _g2 = 1;
		var _g3 = h;
		while(_g2 < _g3) {
			var y = _g2++;
			if(source.charAt(x - 1) == target.charAt(y - 1)) {
				cost = 0;
			} else {
				cost = 1;
			}
			var a = costs[x - 1 + y * w] + 1;
			var a1 = costs[x + (y - 1) * w] + 1;
			var b = costs[x - 1 + (y - 1) * w] + cost;
			var b1 = a1 < b ? a1 : b;
			costs[x + y * w] = a < b1 ? a : b1;
			if(enableTranspositions && x > 1 && y > 1 && source.charAt(x) == target.charAt(y - 1) && source.charAt(x - 1) == target.charAt(y)) {
				var a2 = costs[x + y * w];
				var b2 = costs[x - 2 + (y - 2) * w] + cost;
				costs[x + y * w] = a2 < b2 ? a2 : b2;
			}
		}
	}
	return costs;
};
var markov_util_IntExtensions = function() { };
markov_util_IntExtensions.__name__ = true;
markov_util_IntExtensions.clamp = function(value,min,max) {
	if(value < min) {
		return min;
	}
	if(value > max) {
		return max;
	}
	return value;
};
markov_util_IntExtensions.min = function(a,b) {
	if(a < b) {
		return a;
	}
	return b;
};
var markov_util_PrefixTrie = function() {
	this.root = new markov_util_PrefixNode(null,"",0);
};
markov_util_PrefixTrie.__name__ = true;
markov_util_PrefixTrie.findChild = function(node,letter) {
	var _g = 0;
	var _g1 = node.children;
	while(_g < _g1.length) {
		var child = _g1[_g];
		++_g;
		if(child.letter == letter) {
			return child;
		}
	}
	return null;
};
markov_util_PrefixTrie.prototype = {
	insert: function(word) {
		var current = this.root;
		var _g = 0;
		var _g1 = word.length;
		while(_g < _g1) {
			var i = _g++;
			var ch = word.charAt(i);
			var child = markov_util_PrefixTrie.findChild(current,ch);
			if(child == null) {
				child = new markov_util_PrefixNode(current,ch,i);
				current.children.push(child);
			} else {
				child.frequency++;
			}
			current = child;
		}
		current.word = true;
		return current.frequency;
	}
	,find: function(word) {
		var current = this.root;
		var _g = 0;
		var _g1 = word.length;
		while(_g < _g1) {
			var i = _g++;
			current = markov_util_PrefixTrie.findChild(current,word.charAt(i));
			if(current == null) {
				return false;
			}
		}
		if(!current.word) {
			return false;
		}
		return true;
	}
	,getWords: function() {
		var queue = new haxe_ds_List();
		queue.add(this.root);
		var words = [];
		while(!queue.isEmpty()) {
			var node = queue.pop();
			if(node.word) {
				var word = node.letter;
				var parent = node.parent;
				while(parent != null) {
					word += parent.letter;
					parent = parent.parent;
				}
				if(word == null) {
					throw haxe_Exception.thrown("FAIL: str != null");
				}
				var arr = word.split("");
				arr.reverse();
				words.push(arr.join(""));
			}
			var _g = 0;
			var _g1 = node.children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				queue.add(child);
			}
		}
		return words;
	}
	,__class__: markov_util_PrefixTrie
};
var markov_util_PrefixNode = function(parent,letter,depth) {
	if(!(letter.length == 1 || parent == null && depth == 0)) {
		throw haxe_Exception.thrown("FAIL: letter.length == 1 || (parent == null && depth == 0)");
	}
	this.parent = parent;
	this.children = [];
	this.letter = letter;
	this.depth = depth;
	this.frequency = 1;
	this.word = false;
};
markov_util_PrefixNode.__name__ = true;
markov_util_PrefixNode.prototype = {
	__class__: markov_util_PrefixNode
};
var markov_util_StringExtensions = function() { };
markov_util_StringExtensions.__name__ = true;
markov_util_StringExtensions.reverse = function(str) {
	if(str == null) {
		throw haxe_Exception.thrown("FAIL: str != null");
	}
	var arr = str.split("");
	arr.reverse();
	return arr.join("");
};
markov_util_StringExtensions.repeat = function(str,times) {
	if(str == null) {
		throw haxe_Exception.thrown("FAIL: str != null");
	}
	if(times < 1) {
		throw haxe_Exception.thrown("FAIL: times >= 1");
	}
	var output = "";
	var _g = 0;
	var _g1 = times;
	while(_g < _g1) {
		var i = _g++;
		output += str;
	}
	return output;
};
markov_util_StringExtensions.contains = function(str,substr) {
	if(str == null) {
		throw haxe_Exception.thrown("FAIL: str != null");
	}
	if(substr == null) {
		throw haxe_Exception.thrown("FAIL: substr != null");
	}
	return str.indexOf(substr) >= 0;
};
markov_util_StringExtensions.capitalize = function(str) {
	if(!(str != null && str.length > 0)) {
		throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
	}
	return HxOverrides.substr(str,0,1).toUpperCase() + HxOverrides.substr(str,1,str.length - 1);
};
markov_util_StringExtensions.lowercase = function(str) {
	if(!(str != null && str.length > 0)) {
		throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
	}
	return HxOverrides.substr(str,0,1).toLowerCase() + HxOverrides.substr(str,1,str.length - 1);
};
markov_util_StringExtensions.capitalizeWords = function(str) {
	if(str == null) {
		throw haxe_Exception.thrown("FAIL: str != null");
	}
	var parts = str.split(" ");
	var results = "";
	var _g = 0;
	var _g1 = parts.length;
	while(_g < _g1) {
		var i = _g++;
		var str = parts[i];
		if(!(str != null && str.length > 0)) {
			throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
		}
		results += HxOverrides.substr(str,0,1).toUpperCase() + HxOverrides.substr(str,1,str.length - 1);
		if(i <= parts.length - 1) {
			results += " ";
		}
	}
	return results;
};
markov_util_StringExtensions.lowercaseWords = function(str) {
	if(str == null) {
		throw haxe_Exception.thrown("FAIL: str != null");
	}
	var parts = str.split(" ");
	var results = "";
	var _g = 0;
	var _g1 = parts.length;
	while(_g < _g1) {
		var i = _g++;
		var str = parts[i];
		if(!(str != null && str.length > 0)) {
			throw haxe_Exception.thrown("FAIL: str != null && str.length > 0");
		}
		results += HxOverrides.substr(str,0,1).toLowerCase() + HxOverrides.substr(str,1,str.length - 1);
		if(i <= parts.length - 1) {
			results += " ";
		}
	}
	return results;
};
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = "Date";
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
js_Boot.__toStr = ({ }).toString;
ID.header = "header";
ID.accordion = "accordion";
ID.showsettingscheckbox = "showsettingscheckbox";
ID.showsettingslabel = "showsettingslabel";
ID.trainingdataselectioncheckboxes = "trainingdataselectioncheckboxes";
ID.trainingdatalist = "trainingdatalist";
ID.trainingdatasearchbox = "trainingdatasearchbox";
ID.trainingdatacombinationmodelist = "trainingdatacombinationmodelist";
ID.namedatapresetslist = "namedatapresetslist";
ID.trainingdataedit = "trainingdataedit";
ID.sliderscontainer = "sliderscontainer";
ID.minmaxlength = "minmaxlength";
ID.order = "order";
ID.prior = "prior";
ID.backoff = "backoff";
ID.maxwordstogenerate = "maxwordstogenerate";
ID.maxtime = "maxtime";
ID.startswith = "startswith";
ID.endswith = "endswith";
ID.includes = "includes";
ID.excludes = "excludes";
ID.similar = "similar";
ID.regexmatch = "regexmatch";
ID.generate = "generate";
ID.randomthemeone = "randomthemeone";
ID.randomthemetwo = "randomthemetwo";
ID.namestitle = "namestitle";
ID.nonamesfound = "nonamesfound";
ID.currentnames = "currentnames";
ID.shareresultsonly = "shareresultsonly";
ID.shareresultsandsettings = "shareresultsandsettings";
ID.shareedit = "shareedit";
Main.WEBSITE_URL = "https://www.samcodes.co.uk/project/markov-namegen";
TrainingData.american_cities = ["abilene","akron","albuquerque","alexandria","allentown","amarillo","anaheim","anchorage","annarbor","antioch","arvada","athens","atlanta","augusta","aurora","aurora","austin","bakersfield","baltimore","batonrouge","beaumont","bellevue","berkeley","billings","boise","boston","boulder","bridgeport","brokenarrow","brownsville","buffalo","burbank","cambridge","capecoral","carlsbad","carrollton","cary","centennial","chandler","charleston","charlotte","chattanooga","chesapeake","chicago","chulavista","cincinnati","clarksville","clearwater","cleveland","clovis","collegestation","columbia","columbia","columbus","columbus","concord","corona","corpuschristi","costamesa","dallas","davenport","dayton","denver","detroit","downey","durham","edison","elmonte","elgin","elkgrove","eugene","evansville","everett","fairfield","fargo","fortcollins","fortlauderdale","fortwayne","fortworth","fremont","fresno","frisco","fullerton","garland","gilbert","glendale","glendale","grandprairie","grandrapids","greenbay","greensboro","gresham","hampton","henderson","hillsboro","hollywood","honolulu","houston","huntingtonbeach","huntsville","independence","indianapolis","inglewood","irvine","irving","jackson","jacksonville","jerseycity","joliet","kansascity","kansascity","kent","killeen","knoxville","lafayette","lakeland","lakewood","lancaster","lansing","laredo","lascruces","lasvegas","lewisville","lexington","lincoln","littlerock","longbeach","losangeles","lowell","lubbock","macon","madison","manchester","mcallen","mckinney","memphis","mesa","mesquite","miami","miamigardens","midland","milwaukee","minneapolis","mobile","montgomery","murfreesboro","murrieta","naperville","nashville","neworleans","newyork","newportnews","norfolk","norman","northcharleston","northlasvegas","norwalk","oakland","oceanside","oklahomacity","olathe","omaha","ontario","orange","orlando","overlandpark","palmbay","palmdale","pasadena","pasadena","paterson","pearland","pembrokepines","peoria","peoria","philadelphia","phoenix","pittsburgh","plano","pomona","pompanobeach","portland","providence","pueblo","raleigh","ranchocucamonga","reno","rialto","richardson","richmond","riverside","rockford","roundrock","sacramento","saintpaul","salem","salinas","saltlakecity","sanantonio","sandiego","sanfrancisco","sanmateo","sandysprings","santaana","santaclara","santaclarita","santamaria","santarosa","scottsdale","seattle","simivalley","siouxfalls","southbend","springfield","springfield","stamford","stockton","sunnyvale","surprise","syracuse","tallahassee","tampa","temecula","tempe","thornton","toledo","topeka","torrance","tucson","tulsa","tyler","vallejo","vancouver","victorville","virginiabeach","vista","warren","washington","waterbury","westjordan","westpalmbeach","westvalleycity","westminster","wichita","wichitfalls","wilmington","winstonsalem","woodbridge","yonkers"];
TrainingData.american_companies = ["","abbottlaboratories","abbvieinc","accenture","activisionblizzard","acuitybrands","adobesystems","advanceautoparts","advancedmicrodevices","aescorp","aetnainc","agilenttechnologies","akamaitechnologies","alaskaairgroupinc","albemarlecorp","alexionpharmaceuticals","allerganplc","alliancedatasystems","alliantenergycorp","allstatecorp","alphabetincclassa","alphabetincclassc","altriagroupinc","amazoncominc","amerencorp","americanairlinesgroup","americanelectricpower","americanexpressco","americaninternationalgroup","americantowercorpa","americanwaterworkscompanyinc","ameriprisefinancial","amerisourcebergencorp","ametekinc","amgeninc","amphenolcorp","anadarkopetroleumcorp","analogdevicesinc","antheminc","aonplc","apachecorporation","apartmentinvestmentandmanagement","appleinc","appliedmaterialsinc","arconicinc","arthurjgallagherandco","assetmanagementandcustodybanks","assurantinc","atandtinc","autodeskinc","automaticdataprocessing","autonationinc","autozoneinc","avalonbaycommunitiesinc","averydennisoncorp","bakerhughesinc","ballcorp","bankofamericacorp","bardcrinc","baxterinternationalinc","bbandtcorporation","bectondickinson","bedbathandbeyond","bestbuycoinc","bfb","biogeninc","blockhandr","boeingcompany","bostonproperties","bostonscientific","bristolmyerssquibb","brkb","buildingproducts","cabotoilandgas","cainc","campbellsoup","capitalonefinancial","cardinalhealthinc","carmaxinc","carnivalcorp","caterpillarinc","cboeholdings","cbregroup","cbscorp","celgenecorp","centenecorporation","centerpointenergy","centurylinkinc","cfindustriesholdingsinc","charlesschwabcorporation","chartercommunications","chesapeakeenergy","chevroncorp","chipotlemexicangrill","chrobinsonworldwide","chubblimited","churchanddwight","cignacorp","cimarexenergy","cincinnatifinancial","cintascorporation","ciscosystems","citigroupinc","citizensfinancialgroup","citrixsystems","cmegroupinc","cmsenergy","coachinc","cocacolacompanythe","cognizanttechnologysolutions","colgatepalmolive","comcastcorp","comericainc","conagrabrands","conchoresources","consolidatededison","constellationbrands","consumerfinance","corninginc","costcowholesalecorp","cotyinc","crowncastleinternationalcorp","csrainc","csxcorp","cumminsinc","cvshealth","danahercorp","dardenrestaurants","davitainc","deereandco","delphiautomotive","deltaairlines","dentsplysirona","devonenergycorp","digitalrealtytrust","discoverfinancialservices","discoverycommunications","dishnetwork","dollargeneral","dollartree","dominionresources","dovercorp","dowchemical","drhorton","drpeppersnapplegroup","dteenergyco","dukeenergy","dupontei","dxctechnology","e*trade","eastmanchemical","eatoncorporation","ebayinc","ecolabinc","edisonintl","edwardslifesciences","electronicarts","emersonelectriccompany","entergycorp","envisionhealthcare","eogresources","eqtcorporation","equifaxinc","equityresidential","essexpropertytrustinc","esteelaudercos","eversourceenergy","exeloncorp","expediainc","expeditorsinternational","expressscripts","extraspacestorage","exxonmobilcorp","f5networks","facebookinc","fastenalco","federalrealtyinvestmenttrust","fedexcorporation","fidelitynationalinformationservices","fifththirdbancorp","firstenergycorp","fiservinc","flirsystems","flowservecorporation","fluorcorp","fmccorporation","footlockerinc","fordmotor","fortivecorp","fortunebrandshomeandsecurity","franklinresources","freeportmcmoraninc","gapinc","garminltd","gartnerinc","generaldynamics","generalelectric","generalgrowthpropertiesinc","generalmills","generalmotors","genuineparts","gileadsciences","globalpaymentsinc","goldmansachsgroup","goodyeartireandrubber","graingerwwinc","halliburtonco","hanesbrandsinc","harleydavidson","harriscorporation","hartfordfinancialsvcgp","hasbroinc","hcaholdings","hcpinc","healthcare","helmerichandpayne","henryschein","hesscorporation","hewlettpackardenterprise","homedepot","honeywellintlinc","hormelfoodscorp","hosthotelsandresorts","hpinc","humanainc","huntingtonbancshares","idexxlaboratories","illinoistoolworks","illuminainc","informationtechnology","ingersollrandplc","intelcorp","intercontinentalexchange","internationalbusinessmachines","internationalpaper","interpublicgroup","intlflavorsandfragrances","intuitinc","intuitivesurgicalinc","invescoltd","ironmountainincorporated","jacobsengineeringgroup","jbhunttransportservices","jmsmucker","johnsonandjohnson","johnsoncontrolsinternational","jpmorganchaseandco","junipernetworks","kansascitysouthern","kelloggco","kimberlyclark","kimcorealty","kindermorgan","klatencorcorp","kohlscorp","kraftheinzco","krogerco","l3communicationsholdings","laboratorycorpofamericaholding","lamresearch","lbrandsinc","leggettandplatt","lennarcorp","leucadianationalcorp","level3communications","lillyeliandco","lincolnnational","lkqcorporation","lockheedmartincorp","loewscorp","lowescos","macysinc","mallinckrodtplc","mandtbankcorp","marathonoilcorp","marathonpetroleum","marriottintl","marshandmclennan","martinmariettamaterials","mascocorp","mastercardinc","mattelinc","mccormickandco","mcdonaldscorp","mckessoncorp","meadjohnson","medtronicplc","merckandco","metlifeinc","mettlertoledo","michaelkorsholdings","microchiptechnology","microntechnology","microsoftcorp","midamericaapartments","mohawkindustries","molsoncoorsbrewingcompany","mondelezinternational","monsantoco","monsterbeverage","moodyscorp","morganstanley","motorolasolutionsinc","murphyoil","mylannv","nasdaqinc","nationaloilwellvarcoinc","netflixinc","newellbrands","newfieldexplorationco","newmontminingcorphldgco","newscorp","nexteraenergy","nielsenholdings","nisourceinc","nobleenergyinc","norfolksoutherncorp","northerntrustcorp","northropgrummancorp","nrgenergy","nucorcorp","nvidiacorporation","oreillyautomotive","occidentalpetroleum","oilandgasdrilling","oilandgasequipmentandservices","oilandgasexplorationandproduction","oilandgasstorageandtransportation","omnicomgroup","oraclecorp","paccarinc","parkerhannifin","pattersoncompanies","paychexinc","pentairltd","peoplesunitedfinancial","pepsicoinc","pfizerinc","pgandecorp","philipmorrisinternational","phillips66","pinnaclewestcapital","pioneernaturalresources","pncfinancialservices","poloralphlaurencorp","ppgindustries","pplcorp","praxairinc","pricelinecominc","principalfinancialgroup","procterandgamble","progressivecorp","prudentialfinancial","publicserventerpriseinc","publicstorage","pultehomesinc","pvhcorp","qualcomminc","quantaservicesinc","questdiagnostics","rangeresourcescorp","raymondjamesfinancialinc","raytheonco","realestate","realtyincomecorporation","redhatinc","regencycenterscorporation","regionalbanks","regionsfinancialcorp","republicservicesinc","reynoldsamericaninc","roberthalfinternational","rockwellautomationinc","rockwellcollins","ropertechnologies","rossstores","royalcaribbeancruisesltd","rydersystem","salesforcecom","sandpglobalinc","scanacorp","schlumbergerltd","scrippsnetworksinteractiveinc","seagatetechnology","sealedair","sempraenergy","sherwinwilliams","signetjewelers","simonpropertygroupinc","skyworkssolutions","slgreenrealty","snaponinc","southernco","southwestairlines","specialtychemicals","stanleyblackanddecker","staplesinc","starbuckscorp","statestreetcorp","stericycleinc","strykercorp","suntrustbanks","symanteccorp","synchronyfinancial","synopsysinc","syscocorp","targetcorp","teconnectivityltd","tegnainc","teradatacorp","tesoropetroleumco","texasinstruments","textroninc","thebankofnewyorkmelloncorp","thecloroxcompany","thecoopercompanies","thehersheycompany","themosaiccompany","thermofisherscientific","thetravelerscompaniesinc","thewaltdisneycompany","tiffanyandco","timewarnerinc","tjxcompaniesinc","torchmarkcorp","totalsystemservices","tractorsupplycompany","transdigmgroup","trowepricegroup","twentyfirstcenturyfox","tysonfoods","udrinc","ultasaloncosmeticsandfragranceinc","underarmour","underarmour","unionpacific","unitedcontinentalholdings","unitedhealthgroupinc","unitedparcelservice","unitedrentalsinc","unitedtechnologies","universalhealthservicesinc","unumgroup","usbancorp","valeroenergy","varianmedicalsystems","ventasinc","verisigninc","veriskanalytics","verizoncommunications","vertexpharmaceuticalsinc","vfcorp","viacominc","visainc","vornadorealtytrust","vulcanmaterials","walgreensbootsalliance","walmartstores","wastemanagementinc","waterscorporation","wecenergygroupinc","wellsfargo","welltowerinc","westerndigital","westernunionco","westrockcompany","weyerhaeusercorp","whirlpoolcorp","wholefoodsmarket","williamscos","willistowerswatson","wyndhamworldwide","wynnresortsltd","xcelenergyinc","xeroxcorp","xilinxinc","xlcapital","xyleminc","yahooinc","yumbrandsinc","zimmerbiometholdings","zionsbancorp"];
TrainingData.american_desserts = ["ambrosia","angelcake","applecrisp","appledumpling","applepie","bananapudding","bananasplit","beanpie","blackberrypie","blackbottompie","blondie","blueberrypie","bostoncreampie","brownbetty","brownie","bundtcake","buttermilkpie","butterscotch","caramel","checkerboardcake","cheesecake","cherrypie","chiffonpie","chocolatebrownie","chocolatechipcookie","chocolatepudding","cobbler","coconutcake","congobar","corncookie","creampie","cupcake","cupcone","derbypie","dessertbar","dirtcake","dobergecake","doughnut","frieddough","friedicecream","friedpie","frozenyogurt","fudge","funnelcake","gooeybuttercake","grapepie","grasshopperpie","grasshopperpie","hastypudding","hermitcookies","hotmilkcake","huckleberrypie","hummingbirdcake","iceboxcake","icecreamcake","icecreamcone","jamcake","jello","jellybean","jellycreampie","keylimepie","kingcake","lanecake","lemonsquares","maracapie","marshmallowcreme","moltenchocolatecake","mudpie","oreo","panocha","parfait","pastryhearts","pecanpie","persimmonpudding","pistachiopudding","potpie","pumpkinpie","redvelvetcake","rhubarbpie","ricepudding","scotcheroos","shooflypie","snackcake","snickerdoodles","snickerssalad","stackcake","strawberryshortcake","sundae","sweetpotatopie","tapiocapudding","tipsycake","twinkie","waldorfpudding","watergatesalad","whoopiepie"];
TrainingData.american_forenames = ["aaron","ada","adam","adrian","adrienne","agnes","alan","albert","alberta","alberto","alex","alexander","alexandra","alexis","alfred","alfredo","alice","alicia","alison","allan","allen","allison","alma","alvin","alyssa","amanda","amber","amelia","amy","ana","andre","andrea","andrew","andy","angel","angel","angela","angelica","angelina","angie","anita","ann","anna","anne","annette","annie","anthony","antoinette","antonia","antonio","april","arlene","armando","arnold","arthur","ashley","audrey","barbara","barry","beatrice","becky","belinda","ben","benjamin","bernadette","bernard","bernice","bertha","bessie","beth","bethany","betsy","betty","beulah","beverly","bill","billie","billy","blanca","blanche","bob","bobbie","bobby","bonnie","brad","bradley","brandi","brandon","brandy","brenda","brent","brett","brian","bridget","brittany","brooke","bruce","bryan","byron","calvin","camille","candace","candice","carl","carla","carlos","carmen","carol","carole","caroline","carolyn","carrie","casey","casey","cassandra","catherine","cathy","cecelia","cecil","cecilia","celia","chad","charlene","charles","charlie","charlotte","chelsea","cheryl","chester","chris","christian","christie","christina","christine","christopher","christy","cindy","claire","clara","clarence","claude","claudia","clayton","clifford","clifton","clinton","clyde","cody","colleen","connie","constance","cora","corey","cory","courtney","craig","cristina","crystal","curtis","cynthia","daisy","dale","dan","dana","daniel","danielle","danny","darla","darlene","darrell","darren","darryl","daryl","dave","david","dawn","dean","deanna","debbie","deborah","debra","delia","della","delores","denise","dennis","derek","derrick","desiree","diana","diane","dianna","dianne","dixie","dolores","don","donald","donna","dora","doreen","doris","dorothy","douglas","duane","dustin","dwayne","dwight","earl","ebony","eddie","edgar","edith","edna","eduardo","edward","edwin","eileen","elaine","eleanor","elena","elisa","elizabeth","ella","ellen","elmer","eloise","elsa","elsie","elvira","emily","emma","enrique","eric","erica","erik","erika","erin","erma","ernest","ernestine","essie","estelle","esther","ethel","eugene","eula","eunice","eva","evelyn","everett","faith","fannie","faye","felicia","felix","fernando","flora","florence","floyd","frances","francis","francis","francisco","frank","franklin","fred","freda","freddie","frederick","gabriel","gail","gary","gayle","gene","geneva","genevieve","george","georgia","gerald","geraldine","gertrude","gilbert","gina","ginger","gladys","glen","glenda","glenn","gloria","gordon","grace","greg","gregory","gretchen","guadalupe","guy","gwen","gwendolyn","hannah","harold","harriet","harry","harvey","hattie","hazel","heather","hector","heidi","helen","henrietta","henry","herbert","herman","hilda","holly","hope","howard","hugh","ian","ida","inez","irene","iris","irma","isaac","isabel","ivan","jack","jackie","jacob","jacqueline","jacquelyn","jaime","jaime","james","jamie","jamie","jan","jana","jane","janet","janice","janie","janis","jared","jasmine","jason","javier","jay","jean","jeanette","jeanne","jeannette","jeannie","jeff","jeffery","jeffrey","jenna","jennie","jennifer","jenny","jeremy","jerome","jerry","jesse","jessica","jessie","jessie","jesus","jill","jim","jimmie","jimmy","jo","joan","joann","joanna","joanne","jodi","jody","joe","joel","johanna","john","johnnie","johnnie","johnny","jon","jonathan","jordan","jorge","jose","josefina","joseph","josephine","joshua","joy","joyce","juan","juana","juanita","judith","judy","julia","julian","julie","julio","june","justin","kara","karen","kari","karl","karla","kate","katherine","kathleen","kathryn","kathy","katie","katrina","kay","kayla","keith","kelley","kelli","kellie","kelly","kelly","ken","kendra","kenneth","kent","kerry","kevin","kim","kimberly","kirk","krista","kristen","kristi","kristie","kristin","kristina","kristine","kristy","krystal","kurt","kyle","lana","lance","larry","latoya","laura","lauren","laurie","laverne","lawrence","leah","lee","lee","leigh","lela","lena","leo","leon","leona","leonard","leroy","leslie","leslie","lester","leticia","lewis","lila","lillian","lillie","linda","lindsay","lindsey","lisa","lloyd","lois","lola","lonnie","lora","lorena","lorene","loretta","lori","lorraine","louis","louise","lucia","lucille","lucy","luis","lula","luz","lydia","lynda","lynette","lynn","lynne","mabel","mable","madeline","mae","maggie","mamie","mandy","manuel","marc","marcella","marcia","marcus","margaret","margarita","margie","marguerite","maria","marian","marianne","marie","marilyn","mario","marion","marion","marjorie","mark","marlene","marsha","marshall","marta","martha","martin","marvin","mary","maryann","mathew","matthew","mattie","maureen","maurice","max","maxine","may","megan","meghan","melanie","melba","melinda","melissa","melody","melvin","mercedes","meredith","michael","micheal","michele","michelle","miguel","mike","mildred","milton","mindy","minnie","miranda","miriam","misty","mitchell","molly","mona","monica","monique","morris","muriel","myra","myrtle","nadine","nancy","naomi","natalie","natasha","nathan","nathaniel","neil","nellie","nelson","nettie","nicholas","nichole","nicole","nina","nora","norma","norman","olga","olive","olivia","ollie","opal","ora","oscar","pam","pamela","pat","patricia","patrick","patsy","patti","patty","paul","paula","paulette","pauline","pearl","pedro","peggy","penny","perry","peter","philip","phillip","phyllis","priscilla","rachael","rachel","rafael","ralph","ramon","ramona","randall","randy","raquel","raul","ray","raymond","rebecca","regina","reginald","rene","renee","rhonda","ricardo","richard","rick","ricky","rita","robert","roberta","roberto","robin","robyn","rochelle","rodney","roger","roland","ron","ronald","ronnie","rosa","rosalie","rose","rosemarie","rosemary","rosie","ross","roxanne","roy","ruben","ruby","russell","ruth","ryan","sabrina","sadie","sally","salvador","sam","samantha","samuel","sandra","sandy","sara","sarah","scott","sean","sergio","seth","shane","shannon","shari","sharon","shawn","shawna","sheila","shelia","shelley","shelly","sheri","sherri","sherry","sheryl","shirley","sidney","silvia","sonia","sonja","sonya","sophia","sophie","stacey","stacy","stanley","stella","stephanie","stephen","steve","steven","sue","susan","susie","suzanne","sylvia","tabitha","tamara","tami","tammy","tanya","tara","tasha","ted","teresa","teri","terrance","terrence","terri","terry","terry","thelma","theodore","theresa","thomas","tiffany","tim","timothy","tina","todd","tom","tommy","toni","tony","tonya","tracey","traci","tracy","tracy","travis","tricia","troy","tyler","tyrone","valerie","vanessa","velma","vera","verna","vernon","veronica","vicki","vickie","vicky","victor","victoria","vincent","viola","violet","virgil","virginia","vivian","wade","wallace","walter","wanda","warren","wayne","wendy","wesley","whitney","willard","william","willie","willie","wilma","winifred","yolanda","yvette","yvonne","zachary"];
TrainingData.american_states = ["alabama","alaska","arizona","arkansas","california","colorado","connecticut","delaware","florida","georgia","hawaii","idaho","illinois","indiana","iowa","kansas","kentucky","louisiana","maine","maryland","massachusetts","michigan","minnesota","mississippi","missouri","montana","nebraska","nevada","newhampshire","newjersey","newmexico","newyork","northcarolina","northdakota","ohio","oklahoma","oregon","pennsylvania","rhode","southcarolina","southdakota","tennessee","texas","utah","vermont","virginia","washington","westvirginia","wisconsin","wyoming"];
TrainingData.american_surnames = ["abbott","acevedo","acosta","adams","adkins","aguilar","aguirre","albert","alexander","alford","allen","allison","alston","alvarado","alvarez","anderson","andrews","anthony","armstrong","arnold","ashley","atkins","atkinson","austin","avery","avila","ayala","ayers","bailey","baird","baker","baldwin","ball","ballard","banks","barber","barker","barlow","barnes","barnett","barr","barrera","barrett","barron","barry","bartlett","barton","bass","bates","battle","bauer","baxter","beach","bean","beard","beasley","beck","becker","bell","bender","benjamin","bennett","benson","bentley","benton","berg","berger","bernard","berry","best","bird","bishop","black","blackburn","blackwell","blair","blake","blanchard","blankenship","blevins","bolton","bond","bonner","booker","boone","booth","bowen","bowers","bowman","boyd","boyer","boyle","bradford","bradley","bradshaw","brady","branch","bray","brennan","brewer","bridges","briggs","bright","britt","brock","brooks","brown","browning","bruce","bryan","bryant","buchanan","buck","buckley","buckner","bullock","burch","burgess","burke","burks","burnett","burns","burris","burt","burton","bush","butler","byers","byrd","cabrera","cain","calderon","caldwell","calhoun","callahan","camacho","cameron","campbell","campos","cannon","cantrell","cantu","cardenas","carey","carlson","carney","carpenter","carr","carrillo","carroll","carson","carter","carver","case","casey","cash","castaneda","castillo","castro","cervantes","chambers","chan","chandler","chaney","chang","chapman","charles","chase","chavez","chen","cherry","christensen","christian","church","clark","clarke","clay","clayton","clements","clemons","cleveland","cline","cobb","cochran","coffey","cohen","cole","coleman","collier","collins","colon","combs","compton","conley","conner","conrad","contreras","conway","cook","cooke","cooley","cooper","copeland","cortez","cote","cotton","cox","craft","craig","crane","crawford","crosby","cross","cruz","cummings","cunningham","curry","curtis","dale","dalton","daniel","daniels","daugherty","davenport","david","davidson","davis","dawson","day","dean","decker","dejesus","delacruz","delaney","deleon","delgado","dennis","diaz","dickerson","dickson","dillard","dillon","dixon","dodson","dominguez","donaldson","donovan","dorsey","dotson","douglas","downs","doyle","drake","dudley","duffy","duke","duncan","dunlap","dunn","duran","durham","dyer","eaton","edwards","elliott","ellis","ellison","emerson","england","english","erickson","espinoza","estes","estrada","evans","everett","ewing","farley","farmer","farrell","faulkner","ferguson","fernandez","ferrell","fields","figueroa","finch","finley","fischer","fisher","fitzgerald","fitzpatrick","fleming","fletcher","flores","flowers","floyd","flynn","foley","forbes","ford","foreman","foster","fowler","fox","francis","franco","frank","franklin","franks","frazier","frederick","freeman","french","frost","fry","frye","fuentes","fuller","fulton","gaines","gallagher","gallegos","galloway","gamble","garcia","gardner","garner","garrett","garrison","garza","gates","gay","gentry","george","gibbs","gibson","gilbert","giles","gill","gillespie","gilliam","gilmore","glass","glenn","glover","goff","golden","gomez","gonzales","gonzalez","good","goodman","goodwin","gordon","gould","graham","grant","graves","gray","green","greene","greer","gregory","griffin","griffith","grimes","gross","guerra","guerrero","guthrie","gutierrez","guy","guzman","hahn","hale","haley","hall","hamilton","hammond","hampton","hancock","haney","hansen","hanson","hardin","harding","hardy","harmon","harper","harrell","harrington","harris","harrison","hart","hartman","harvey","hatfield","hawkins","hayden","hayes","haynes","hays","head","heath","hebert","henderson","hendricks","hendrix","henry","hensley","henson","herman","hernandez","herrera","herring","hess","hester","hewitt","hickman","hicks","higgins","hill","hines","hinton","hobbs","hodge","hodges","hoffman","hogan","holcomb","holden","holder","holland","holloway","holman","holmes","holt","hood","hooper","hoover","hopkins","hopper","horn","horne","horton","house","houston","howard","howe","howell","hubbard","huber","hudson","huff","huffman","hughes","hull","humphrey","hunt","hunter","hurley","hurst","hutchinson","hyde","ingram","irwin","jackson","jacobs","jacobson","james","jarvis","jefferson","jenkins","jennings","jensen","jimenez","johns","johnson","johnston","jones","jordan","joseph","joyce","joyner","juarez","justice","kane","kaufman","keith","keller","kelley","kelly","kemp","kennedy","kent","kerr","key","kidd","kim","king","kinney","kirby","kirk","kirkland","klein","kline","knapp","knight","knowles","knox","koch","kramer","lamb","lambert","lancaster","landry","lane","lang","langley","lara","larsen","larson","lawrence","lawson","le","leach","leblanc","lee","leon","leonard","lester","levine","levy","lewis","lindsay","lindsey","little","livingston","lloyd","logan","long","lopez","lott","love","lowe","lowery","lucas","luna","lynch","lynn","lyons","macdonald","macias","mack","madden","maddox","maldonado","malone","mann","manning","marks","marquez","marsh","marshall","martin","martinez","mason","massey","mathews","mathis","matthews","maxwell","may","mayer","maynard","mayo","mays","mcbride","mccall","mccarthy","mccarty","mcclain","mcclure","mcconnell","mccormick","mccoy","mccray","mccullough","mcdaniel","mcdonald","mcdowell","mcfadden","mcfarland","mcgee","mcgowan","mcguire","mcintosh","mcintyre","mckay","mckee","mckenzie","mckinney","mcknight","mclaughlin","mclean","mcleod","mcmahon","mcmillan","mcneil","mcpherson","meadows","medina","mejia","melendez","melton","mendez","mendoza","mercado","mercer","merrill","merritt","meyer","meyers","michael","middleton","miles","miller","mills","miranda","mitchell","molina","monroe","montgomery","montoya","moody","moon","mooney","moore","morales","moran","moreno","morgan","morin","morris","morrison","morrow","morse","morton","moses","mosley","moss","mueller","mullen","mullins","munoz","murphy","murray","myers","nash","navarro","neal","nelson","newman","newton","nguyen","nichols","nicholson","nielsen","nieves","nixon","noble","noel","nolan","norman","norris","norton","nunez","obrien","ochoa","oconnor","odom","odonnell","oliver","olsen","olson","oneal","oneil","oneill","orr","ortega","ortiz","osborn","osborne","owen","owens","pace","pacheco","padilla","page","palmer","park","parker","parks","parrish","parsons","pate","patel","patrick","patterson","patton","paul","payne","pearson","peck","pena","pennington","perez","perkins","perry","peters","petersen","peterson","petty","phelps","phillips","pickett","pierce","pittman","pitts","pollard","poole","pope","porter","potter","potts","powell","powers","pratt","preston","price","prince","pruitt","puckett","pugh","quinn","ramirez","ramos","ramsey","randall","randolph","rasmussen","ratliff","ray","raymond","reed","reese","reeves","reid","reilly","reyes","reynolds","rhodes","rice","rich","richard","richards","richardson","richmond","riddle","riggs","riley","rios","rivas","rivera","rivers","roach","robbins","roberson","roberts","robertson","robinson","robles","rocha","rodgers","rodriguez","rodriquez","rogers","rojas","rollins","roman","romero","rosa","rosales","rosario","rose","ross","roth","rowe","rowland","roy","ruiz","rush","russell","russo","rutledge","ryan","salas","salazar","salinas","sampson","sanchez","sanders","sandoval","sanford","santana","santiago","santos","sargent","saunders","savage","sawyer","schmidt","schneider","schroeder","schultz","schwartz","scott","sears","sellers","serrano","sexton","shaffer","shannon","sharp","sharpe","shaw","shelton","shepard","shepherd","sheppard","sherman","shields","short","silva","simmons","simon","simpson","sims","singleton","skinner","slater","sloan","small","smith","snider","snow","snyder","solis","solomon","sosa","soto","sparks","spears","spence","spencer","stafford","stanley","stanton","stark","steele","stein","stephens","stephenson","stevens","stevenson","stewart","stokes","stone","stout","strickland","strong","stuart","suarez","sullivan","summers","sutton","swanson","sweeney","sweet","sykes","talley","tanner","tate","taylor","terrell","terry","thomas","thompson","thornton","tillman","todd","torres","townsend","tran","travis","trevino","trujillo","tucker","turner","tyler","tyson","underwood","valdez","valencia","valentine","valenzuela","vance","vang","vargas","vasquez","vaughan","vaughn","vazquez","vega","velasquez","velazquez","velez","villarreal","vincent","vinson","wade","wagner","walker","wall","wallace","waller","walls","walsh","walter","walters","walton","ward","ware","warner","warren","washington","waters","watkins","watson","watts","weaver","webb","weber","webster","weeks","weiss","welch","wells","west","wheeler","whitaker","white","whitehead","whitfield","whitley","whitney","wiggins","wilcox","wilder","wiley","wilkerson","wilkins","wilkinson","william","williams","williamson","willis","wilson","winters","wise","witt","wolf","wolfe","wong","wood","woodard","woods","woodward","wooten","workman","wright","wyatt","wynn","yang","yates","york","young","zamora","zimmerman"];
TrainingData.animals = ["aardvark","aardwolf","albatross","alligator","alpaca","anaconda","angelfish","anglerfish","ant","anteater","antelope","antlion","ape","aphid","armadillo","asp","ass","baboon","badger","baldeagle","bandicoot","barnacle","barracuda","basilisk","bass","bat","bear","beaver","bedbug","bee","beetle","bird","bison","blackbird","blackpanther","blackwidow","bluebird","bluejay","bluewhale","boa","boar","bobcat","bonobo","buffalo","butterfly","buzzard","camel","capybara","caribou","carp","cat","caterpillar","catfish","catshark","centipede","chameleon","cheetah","chickadee","chicken","chimpanzee","chinchilla","chipmunk","clam","clownfish","cobra","cockroach","cod","condor","coral","cougar","cow","coyote","crab","crane","cranefly","crayfish","cricket","crocodile","crow","cuckoo","damselfly","deer","dingo","dog","dolphin","donkey","dormouse","dove","dragonfly","duck","dungbeetle","eagle","earthworm","earwig","echidna","eel","egret","elephant","elephantseal","elk","emu","ermine","falcon","ferret","finch","firefly","fish","flamingo","flea","fly","fowl","fox","frog","fruitbat","galliform","gamefowl","gazelle","gecko","gerbil","giantpanda","giantsquid","gibbon","giraffe","goat","goldfish","goose","gopher","gorilla","grasshopper","grizzlybear","groundshark","groundsloth","grouse","guan","guanaco","guineafowl","guineapig","gull","haddock","halibut","hammerheadshark","hamster","hare","hawk","hedgehog","hermitcrab","heron","herring","hippopotamus","hornet","horse","hoverfly","hummingbird","humpbackwhale","hyena","iguana","jackal","jaguar","jay","jellyfish","kangaroo","kingfisher","kiwi","koala","koi","komodo","krill","ladybug","lamprey","lark","leech","lemming","lemur","leopard","limpet","lion","lizard","llama","lobster","locust","loon","louse","lynx","macaw","mackerel","magpie","mammal","manatee","mantaray","marmoset","marmot","meadowlark","meerkat","mink","minnow","mite","mockingbird","mole","mollusk","mongoose","monitor","monkey","moose","mosquito","moth","mouse","mule","narwhal","newt","nightingale","octopus","orangutan","orca","ostrich","otter","owl","ox","panda","panther","parakeet","parrot","partridge","peacock","peafowl","pelican","penguin","perch","peregrine","pheasant","pig","pigeon","pike","piranha","platypus","polarbear","pony","porcupine","porpoise","possum","prairiedog","prawn","prayingmantis","primate","puffin","puma","python","quail","rabbit","raccoon","rat","rattlesnake","raven","redpanda","reindeer","reptile","rhinoceros","roadrunner","rodent","rook","rooster","salamander","salmon","scorpion","seahorse","sealion","seaslug","seasnail","shark","sheep","shrew","shrimp","silkworm","silverfish","skink","skunk","sloth","slug","snail","snake","snipe","sole","sparrow","spermwhale","spider","spidermonkey","squid","squirrel","starfish","stingray","stoat","stork","swallow","swan","swift","swordfish","swordtail","tarantula","termite","thrush","tiger","tigershark","toad","tortoise","toucan","treefrog","trout","tuna","turkey","turtle","tyrannosaurus","vampirebat","viper","vole","vulture","wallaby","walrus","wasp","waterbuffalo","weasel","whale","whitefish","wildcat","wildebeest","wolf","wolverine","wombat","woodpecker","yak","zebra"];
TrainingData.animal_sounds = ["arf","baa","bark","bawl","bay","bell","bellow","bleat","boom","bray","bugle","buzz","cackle","cackle","cah","caw","chatter","cheep","chirp","chirrup","chuckle","click","cluck","coo","cough","creak","croak","crow","cry","dook","drum","gibber","gobble","groan","growl","grunt","heehaw","hiss","honk","hoot","howl","hum","laugh","low","meow","mew","moo","neigh","nevermore","nicker","oink","pipe","purr","quack","roar","ruff","scream","screech","shriek","simper","sing","snort","squeak","squeal","talk","trill","trumpet","tweet","twitter","wail","warble","whine","whinny","whisper","whistle","whoop","woof","yap","yell","yelp","yowl"];
TrainingData.art_types = ["abstractart","abstractexpressionism","academicism","actionpainting","americanrealism","analyticalcubism","analyticalrealism","artbrut","artdeco","artnouveau","ashcan","automaticpainting","avantgarde","baroque","bauhaus","biedermeier","byzantine","cartographicart","casualism","classicism","cloisonnism","colorfieldpainting","computerart","concretism","constructivism","contemporaryrealism","costumbrismo","cubism","cuboexpressionism","cubofuturism","cyberart","dada","digitalart","divisionism","earthart","environmental","existentialart","expressionism","fantasticrealism","fauvism","feministart","fiberart","figurativeart","figurativeexpressionism","fluxus","folkart","futurism","gongbi","gothic","graffitiart","hardedge","highrenaissance","hyperrealism","ilkhanid","impressionism","inkandwash","internationalgothic","intimism","japonism","junkart","kinetic","kitsch","lettrism","lowbrowart","luminism","magicrealism","mailart","mannerism","maritimeart","maximalism","mechanisticcubism","metaphysicalart","minimalism","miserablism","modernismo","mosanart","mozarabic","mughal","muralism","nanga","nativeart","naturalism","neobaroque","neobyzantine","neoclassicism","neoconcretism","neodada","neoexpressionism","neofiguratism","neogeo","neominimalism","neoorthodoxism","neoplasticism","neopop","neorococo","neoromanticism","newrealism","nihonga","opart","orientalism","orphism","outsiderart","perceptism","performanceart","photorealism","pictorialism","pointillism","popart","posterart","postimpressionism","postminimalism","postpainterly","precisionism","primitivism","protorenaissance","purism","rayonism","realism","regionalism","renaissance","rococo","romanesque","romanticism","skyart","socialistrealism","socialrealism","spatialism","spectralism","streetart","streetphotography","stuckism","superflat","suprematism","surrealism","symbolism","synchromism","syntheticcubism","synthetism","tachisme","tenebrism","tonalism","toyism","transautomatism","transavantgarde","trashart","tubism","urbanart","verism","vorticism","zen"];
TrainingData.atomic_and_subatomic_particles = ["acceleron","antimuon","antiquark","antitau","anyon","atom","axino","axion","boson","bottomquark","bradyon","branon","chameleon","chargino","charmquark","dilatino","dilaton","diracfermion","dislon","downquark","dualgraviton","dyon","electron","electronantineutrino","electronneutrino","exciton","genon","geon","gimp","glueball","gluino","gluon","goldstino","goldstoneboson","graviphoton","graviscalar","gravitino","graviton","higgsboson","higgsino","hyperon","inflaton","instanton","ion","isotope","luxon","magneticphoton","magnons","majoranafermino","meson","muon","muonantineutrino","muonium","muonneutrino","neutralino","neutrino","neutron","nucleon","nuclide","pentaquark","phonon","photino","photon","plasmon","plekton","polariton","polaron","pomeron","positron","preon","quark","saxion","skyrmion","slepton","sneutrino","spurion","squark","strangequark","tachyon","tardyon","tau","tauantineutrino","tauneutrino","tetraquark","topquark","upquark","weylfermion","wimp","wino","zino"];
TrainingData.banks = ["aarealbanak","ababank","abankavipa","abcbankingcorporation","abcislamicbank","abibank","ablvbank","abnamrobankchina","abnamrogroup","absebbankas","absolutbank","absolutbank","abudhabiislamicbank","accentbank","accessbankghana","accessbankgroup","accessbankliberia","accessbankplc","accessbankrwanda","accessbankzambia","achmeabank","achmeahypotheekbank","acledabank","acledabanklaos","acledabankmyanmar","acnbcorp","adabank","adambankgroup","adriabank","aegeanbalticbank","affinbank","affinislamicbank","afghanunitedbank","afnbholdings","afrasiabank","africanbank","afrilandfirstbank","agbank","agranibank","agrobank","agrobank","agrofinanzas","agroinvestbank","ahlibankqatar","ahlibanksaog","ahliunitedbank","ahliunitedbankuk","aichibank","ajmanbank","akbank","akbarsbank","akbkyrgyzkramdsbank","akibacommercialbank","akitabank","akkobank","aktiabankgroup","aktifyatirimbankasi","alahlibankofkuwait","alarafahislamibank","albankcorporation","albarakabankegypt","albarakabanksudan","albarakabanktunisia","albarakabankturkey","albarakaislamicbank","alefbank","alexbank","alfabankbelarus","alfabankkazakhstan","alfabankukraine","alhilalbank","alinmabank","aliorbank","aljbaalliancebank","allahabadbank","allbankpanama","alliancebankjsc","allianceislamicbank","alliedbanklimited","alliedirishbanks","allyfinancial","almasraf","almbrandbank","aloqabank","alphabank","alphabankalbania","alphabankcyprus","alphabankromania","alphabankskopje","alphabankuk","alrajhibank","alrajhibankmalaysia","alsalambank","alsalambank","alshamalislamicbank","altabank","altaienergobank","alternatifbank","alwatanybankofegypt","amalgamatedbank","amanabank","amanbank","ambankcompany","ambankgroup","amboybancorporation","amegycorporation","amenbank","ameriabank","americanexpress","amerisbancorp","ameriservfinancial","amonatbank","amrahbank","amsterdamtradebank","anadolubank","anbcorporation","anbinhbank","anchorbancorp","andbankpanama","andhrabank","androscogginbancorp","anelikbank","animalresourcesbank","anzamerikasamoabank","anzbankfiji","anzbankindonesia","anzbanklaos","anzbanknewzealand","anzbanksamoa","anzroyal","aomoribank","aozorabank","apobank","applebankforsavings","apsbank","arabbangladeshbank","arabbank","arabbankaustralia","arabisraelbank","arabnationalbank","arabtunisianbank","arabturkishbank","araratbank","arbuthnotlatham","ardshininvestbank","aresbank","areximbank","argenta","argentagroup","arionbank","arkadabank","armbusinessbank","armswissbank","arnerbank","artsakhbank","arvestbank","asahishinkinbank","asakabank","asbbancorp","asbbank","ashikagaholdings","asiacommercialbank","asiacreditbank","asianfinancebank","asiaunitedbank","askaribank","assebpank","associatedbanccorp","astoriabank","astrabank","asyakatilimbankasi","atabank","atbancorp","atbancorp","atfbank","atlanticbank","atlasbank","atrabank","atticabank","attijaribanktunisia","attijariwafabank","austinbancorp","austriananadibank","avtogradbank","avtovazbank","awabank","axabankeurope","axabanque","axionswissbanksa","axisbank","ayeyarwadybank","azaniabank","azizibank","bacpanama","badischebeamtenbank","bahrainisaudibank","bahrainislamicbank","baiduribank","bakerboyerbancorp","bakhtarbank","balboabank","balticabank","baltiyskiybank","banamexusabancorp","bancaafirme","bancaapulia","bancadeeconomii","bancadelceresio","bancadellemarche","bancadelpiemonte","bancadelsempione","bancadicreditosardo","bancadipiacenza","bancadisassari","bancaetruria","bancagenerali","bancaintesarussia","bancaintesaserbia","bancaitalease","bancamarch","bancamediolanum","bancamiga","bancamonteparma","bancapassadore","bancaprossima","bancaromaneasca","bancasella","bancasociala","bancatransilvania","bancedcorp","bancfirstcorp","bancindependent","bancoabccapital","bancoactinver","bancoactivo","bancoagrícola","bancoahorrofamsa","bancoalfa","bancoaliado","bancoamambay","bancoamazonas","bancoarbi","bancoatlantida","bancoatlas","bancoavvillas","bancoazteca","bancoaztecahonduras","bancoaztecapanama","bancoaztecaperu","bancobaicaboverde","bancobaieuropa","bancobandes","bancobase","bancobbm","bancobdi","bancobhd","bancobic","bancobica","bancobice","bancobicentenario","bancobicportugues","bancobisa","bancobmg","bancobolivariano","bancobonsucesso","bancobradesco","bancobtgpactual","bancocacique","bancocaixageral","bancocajasocial","bancocapital","bancocaroni","bancocedula","bancocencosud","bancocmf","bancocofiec","bancocolpatria","bancocolumbia","bancocomafi","bancocompartamos","bancoconsorcio","bancocontinental","bancocontinental","bancocoomeva","bancocoopnacional","bancocredicoop","bancodaamazonia","bancodavivienda","bancodaycoval","bancodeantigua","bancodebogota","bancodebogotapanama","bancodebrasilia","bancodechile","bancodecomercio","bancodecordoba","bancodecorrientes","bancodecostarica","bancodecrédito","bancodefinanzas","bancodegalicia","bancodehonduras","bancodehonduras","bancodeinversiones","bancodelanacion","bancodelapampa","bancodelaproduccion","bancodelarepublica","bancodelaustro","bancodelbajio","bancodelcaribe","bancodelchubut","bancodellitoral","bancodeloja","bancodelpacifico","bancodelpais","bancodelsol","bancodelsur","bancodelta","bancodeltaasia","bancodeltesoro","bancodeltucuman","bancodemachala","bancodeoccidente","bancodesabadell","bancodesanjuan","bancodevalores","bancodevenezuela","bancodicaribe","bancodinapoli","bancodisardegna","bancodmiro","bancodobrasil","bancodobrasilchile","bancodoestadodopara","bancoeconómico","bancoespíritosanto","bancoexterior","bancoexteriordecuba","bancofalabella","bancofalabellaperu","bancofamiliar","bancofcalifornia","bancofibra","bancofichosapanama","bancofinandina","bancofinansur","bancofinantia","bancofinca","bancofondocomun","bancoforjadores","bancoformosa","bancogallego","bancoganadero","bancogeneral","bancognbperu","bancognbsudameris","bancogrupocajatres","bancoguanabara","bancohipotecario","bancoibi","bancoimprosa","bancoinbursa","bancoindustrial","bancoindustrial","bancoinmobiliario","bancointeratlantico","bancointerfinanzas","bancointermedium","bancointernacional","bancointernacional","bancointernacional","bancoinvest","bancoinvex","bancoitapua","bancoitauargentina","bancoitaubba","bancoitauchile","bancoitaucolombia","bancoitauluxembourg","bancoitauparaguay","bancoitauuruguay","bancojpmorganbrazil","bancojulio","bancokdbbrasil","bancokeve","bancolafisehonduras","bancolafisepanama","bancolahipotecaria","bancolombia","bancolombiapanama","bancolusobrasileiro","bancomacro","bancomadesant","bancomarenostrum","bancomariva","bancomasventas","bancomaxima","bancomercantil","bancomeridian","bancometropolitano","bancomifel","bancomizuhodobrasil","bancomodal","bancomonex","bancomultiplecaribe","bancomultiva","bancomúltipleleón","banconacionaldecuba","bancooriginal","bancop","bancopanama","bancoparis","bancopastor","bancopatagonia","bancopenta","bancopiano","bancopine","bancoplaza","bancopopolare","bancopopular","bancopopular","bancopopular","bancopotencial","bancoppel","bancoreformador","bancoregional","bancorendimento","bancoribeiraoprato","bancoripley","bancoripleyperu","bancoroela","bancorprhodeisland","bancorpsouth","bancosaenz","bancosafra","bancosantacruz","bancosantacruz","bancosantander","bancosantander","bancosantanderchile","bancosantanderperu","bancosantanderrio","bancosantandertotta","bancosecurity","bancosofisa","bancosofitasa","bancosol","bancosolidario","bancosolidario","bancosudamericano","bancosupervielle","bancoterra","bancotriangulo","bancotricury","bancounico","bancounion","bancouniversal","bancovalor","bancovepormas","bancovimenca","bancovotorantim","bancowenghang","bancowwb","bancpluscorporation","bancpost","bancrecer","bancwestcorporation","banescopanama","bangente","bangkokbank","bangkokbankmalasya","bangorbancorp","banisi","banistmo","bankaceh","bankacelje","bankaekonomike","bankagris","bankakoper","bankalbilad","bankaletihad","bankalfalah","bankalhabib","bankaljazira","bankalkhair","bankalliance","bankasia","bankatlanticbancorp","bankaudi","bankaudisyria","bankaustria","bankavangard","bankbakai","bankbfgcredit","bankbjb","bankbph","bankbukopin","bankbumiarta","bankcapital","bankcartu","bankcentercredit","bankcentralasia","bankdegroof","bankderzhava","bankdevoncredit","bankdhofar","bankdki","bankdnbnordpolska","bankeghtesadnovin","bankekonomiraharja","bankelectronika","bankemillieafghan","bankeshkata","bankforbusiness","bankforum","bankfrey","bankfurarbeitundwirtschaftundosterreichischepostsparkasseaktiengesellschaft","bankgaborone","bankganesha","bankhapoalim","bankindexselindo","bankinter","bankintercredit","bankiowacorp","bankislami","bankj.safra","bankjasajakarta","bankkalbar","bankkeshavarzi","bankkhreschatyk","bankleumipanama","bankleumiromania","bankleumiuk","bankleumius","banklevoberezhniy","banklinth","banklviv","bankm","bankmanagerscorp","bankmandiri","bankmandirieurope","bankmaskan","bankmaspion","bankmassad","bankmecu","bankmed","bankmega","bankmellat","bankmellatturkey","bankmelliiran","bankmuscat","banknegaraindonesia","banknizwa","banknordik","bankocbcnisp","bankofabyssinia","bankofafricabenin","bankofafricaghana","bankofafricagroup","bankofafricakenya","bankofafricamali","bankofafricaniger","bankofafricasenegal","bankofafricauganda","bankofaland","bankofamerica","bankofamericaindia","bankofamericamexico","bankofanshan","bankofanyang","bankofayudhya","bankofazerbaijan","bankofbaku","bankofbaroda","bankofbarodafiji","bankofbarodaghana","bankofbarodaguyana","bankofbarodakenya","bankofbarodauganda","bankofbeijing","bankofbeirut","bankofbhutan","bankofcangzhou","bankofceylon","bankofchangsha","bankofchaoyang","bankofchengde","bankofchengdu","bankofchina","bankofchinabrazil","bankofchinahongkong","bankofchinamalaysia","bankofchinapanama","bankofchinathailand","bankofchinazambia","bankofchongqing","bankofcommerce","bankofcyprus","bankofdalian","bankofdandong","bankofdeyang","bankofdongguan","bankoffushun","bankoffuxin","bankofgansu","bankofganzhou","bankofgeorgia","bankofgreenland","bankofguangzhou","bankofguiyang","bankofhandan","bankofhangzhou","bankofhebei","bankofhuludao","bankofhuzhou","bankofindia","bankofindiakenya","bankofindiatanzania","bankofinnermongolia","bankofireland","bankofiwate","bankofjerusalem","bankofjiangsu","bankofjiaxing","bankofjilin","bankofjining","bankofjinzhou","bankofjiujiang","bankofjordan","bankofkaohsiung","bankofkathmandu","bankofkhartoum","bankofkigali","bankofkochi","bankofkunlun","bankofkyoto","bankoflangfang","bankoflanzhou","bankofliaoyang","bankofliuzhou","bankofluoyang","bankofmaharashtra","bankofmaldives","bankofmarinbancorp","bankofmiami","bankofmontreal","bankofmontserrat","bankofmoscow","bankofmoscowukraine","bankofnagasaki","bankofnagoya","bankofnanchang","bankofnanjing","bankofnanyang","bankofnauru","bankofnevis","bankofnewyorkmellon","bankofnewzealand","bankofningbo","bankofningxia","bankofokinawa","bankofpanhsin","bankofpunjab","bankofqingdao","bankofqinghai","bankofqinhuangdao","bankofquanzhou","bankofqueensland","bankofrizhao","bankofsaga","bankofshanghai","bankofshaoxing","bankofsharjah","bankofshizuishan","bankofsouthpacific","bankofstlucia","bankofsuzhou","bankofsydney","bankoftaiwan","bankoftaizhou","bankofthebahamas","bankoftheozarks","bankoftheryukyus","bankoftianjin","bankofvalletta","bankofweifang","bankofwenzhou","bankofxinxiang","bankofyingkou","bankofyokohama","bankofzhengzhou","bankone","bankotkritie","bankotsarhahayal","bankpanindonesia","bankpapua","bankpasargad","bankpekao","bankpermata","bankpetrocommerce","bankplatina","bankpozitifturkey","bankpundiindonesia","bankrakyatindonesia","bankrefah","bankrepublic","bankresonaperdania","bankrespublika","bankrossiya","banksaderatiran","banksaderatplc","banksaintpetersburg","banksepah","banksgb","banksilkway","banksinarmas","banksinopac","banksoharsaog","banksolidarnost","banksoyuz","bankstandard","banktabungannegara","banktavricheskiy","banktechnique","banktejarat","banktolubay","bankunited","bankuralsib","bankvozrozhdenie","bankwindhoek","bankwooriindonesia","bankzachodniwbk","bankzarechye","bannercorporation","banplus","banquealternative","banquebemo","banquecongolaise","banquecramer","banquedetahiti","banquedetunisie","banqueducaire","banqueheritage","banquemisr","banquemisrfrance","banquemisrlebanon","banquenagelmackers","banquepasche","banqueraiffeisen","banquesaudifransi","banquesbmmadagascar","banquesocredo","banquetarneaud","banquezitouna","bansi","banterracorp","baoshangbank","baovietbank","barclays","barclaysafricagroup","barclaysbankbrazil","barclaysbankegypt","barclaysbankfrance","barclaysbankkenya","barclaysbankmexico","barclaysbankofghana","barclaysbankrussia","barclaysbankspain","barclaysbankuganda","barclaysbankzambia","barclayscapitalinc","barharborbankshares","barwabank","basisbank","baslerkantonalbank","bawagbankaslovenia","bawagmaltabank","baylakecorp","bbcnbancorp","bbvabancofrances","bbvachile","bbvacolombia","bbvacontinental","bbvaparaguay","bbvaportugal","bbvaprovincial","bbvasuiza","bbvauruguay","bbvausabancshares","bcbbancorp","bcbholdings","bdounibank","beaconbancorp","belagroprombank","belarusbank","belarusianswissbank","belfius","belgazprombank","belinvestbank","bellevuegroup","belmontsavingsbank","belvnesheconombank","berkshirebancorp","berlinervolksbank","berlinhyp","bernerkantonalbank","bessemergroup","bforbank","bfvsocietegenerale","bgfibank","bgfibankbenin","bgfibankcameroun","bgfibankcongo","bgfibankdrccongo","bgfibankmadagascar","bgfiinternational","bglbnpparibas","bhfbank","bhutannationalbank","bhwgroup","bidvestbank","bigbank","bimbholdings","birlikbank","bksbank","bksbank","blombank","blombank","blombankegypt","blombankfrance","bluenilemashreqbank","blueridgebancshares","bmcebankgroup","bmofinancialcorp","bnbankasa","bncbancorp","bnhfinancial","bnimadagascar","bnpparibas","bnpparibasargentina","bnpparibasbulgaria","bnpparibaschina","bnpparibascolombia","bnpparibasegypt","bnpparibaseldjazair","bnpparibasfortis","bnpparibashungary","bnpparibasindonesia","bnpparibasmalaysia","bnpparibasportugal","bnpparibasrussia","bobarbanka","boilingspringsmhc","bondstreetholdings","booyoungkhmerbank","bosshardbanco","botswanasavingsbank","boubancorp","boubyanbank","boursoramabanque","boylebancorp","bpce","bracbankafghanistan","bracbanklimited","bradescoeuropa","bramerbank","brandgroupholdings","bratskiynarodnybank","bred","bredbank","bremerfinancialcorp","bremerkreditbank","bremerlandesbank","bridgebancorp","bridgeviewbancorp","briscoeranch","broadwaybancshares","brooklinebancorp","brownshipley","brynmawrbankcorp","bsbbancorp","bsfinancialgroup","btabank","btabank","btabankarmenia","btabankbelarus","btcfinancialcorp","budapestbank","burganbank","burganbankturkey","burjbank","butterfieldbankuk","byblosbank","byblosbankarmenia","byblosbankcongo","byblosbanksyria","bylinebank","bystrobank","bzbank","c1financial","cacanskabanka","cadencebancorp","cagamasberhad","cairoammanbank","caixabank","caixadesabadell","caixaontinyent","caixapenedes","cajacirculo","cajadeahorros","cajadebadajoz","cajadeburgos","calbank","cambodiaasiabank","cambodiamekongbank","cambodianpublicbank","cambridgebancorp","canadiabank","canadianwesternbank","canarabank","capitalbank","capitalbank","capitalbank","capitalbank","capitalbankofjordan","capitalgbank","capitalonebank","capitecbankholdings","capitolbancorp","capitronbank","carlilebancshares","cascadebancorp","catalunyabanc","cathayunitedbank","catholicsyrianbank","cavmontbank","cbfh","cbtccapitalcorp","cdgcapital","cecabank","cecbank","centarbanka","centenarybank","centennialbank","centerbancorp","centerinvestbank","centerstatebanks","centralbancompany","centralbancorp","centralbancshares","centralbancshares","centralbank","centralbankofindia","centralofkansas","centrobanca","centrocreditbank","centurybancorp","cerabank","certusholdings","ceskasporitelna","cetelem","cfcstanbicbank","chambersbancshares","changhwabank","charitybank","charterbankshares","chasebank","chelindbank","chibabank","chibakogyobank","chicopeebancorp","chikuhobank","chinabohaibank","chinaciticbank","chinaeverbrightbank","chinaguangfabank","chinamerchantsbank","chinaminshengbank","chinatrustindia","chinatrustindonesia","chinazheshangbank","choicebank","chonghingbank","chugokubank","chukyobank","cibanco","cibank","cibbank","cibmarinebancshares","cimbcambodia","cimbgroup","cimbislamicbank","cimbniaga","cimbthai","citadelebanka","citadelebankas","citgroup","citibankargentina","citibankbangladesh","citibankbrazil","citibankchina","citibankcolombia","citibankcostarica","citibankecuador","citibankelsalvador","citibankeurope","citibankguatemala","citibankhaiti","citibankhonduras","citibankhungary","citibankindia","citibankindonesia","citibankjamaica","citibankjapan","citibankkazakhstan","citibankkorea","citibankmalaysia","citibanknicaragua","citibanknigeria","citibankpanama","citibankparaguay","citibankperu","citibankromania","citibankslovakia","citibanktaiwan","citibanktanzania","citibankthailand","citibanktunisia","citibankturkey","citibankuganda","citibankukraine","citibankuruguay","citibankvenezuela","citigroup","citizensbankguyana","citizensbankholding","cityholdingco","cityunionbank","claytonbancorp","clearinghousebank","closebrothersgroup","clydesdalebank","cmfloridaholdings","cnbbancshares","cnbcorporation","cnlbancshares","cobizfinancial","colonybankcorp","columbiabancorp","comerica","comertbank","commercebancshares","commerzbank","commerzbankeurasija","commerzbankhungary","commonwealthbank","commonwealthbank","communitybancorp","communitybankshares","communitybankshares","communitybanksystem","communityonebancorp","connectonebancorp","consubanco","conversebank","coopbank","cooperativebank","cooperativebank","cooperativebank","corealcreditbank","cornerbank","corpbanca","corporacionbct","corporationbank","cosmosbank","cosmosbanktaiwan","cotacommercialbank","cranebank","crdbbank","credicorpbank","credigenbank","credinsbank","creditagricole","creditagricolecib","creditagricoleegypt","creditbank","creditbank","creditbankofalbania","creditbankofmoscow","creditdnepr","crediteuropebank","creditlibanais","creditlyonnais","creditmutuel","creditobergamasco","creditoemiliano","creditovaltellinese","creditstandardbank","creditsuissebrazil","creditsuissegroup","creditsuissemexico","credituralbank","crelan","croatiabanka","croghanbancshares","crèditandorrà","créditdumaroc","créditdunord","créditoagrícola","csalternabank","csbbancorp","csobslovakia","cubancorp","cullenfrostbankers","customersbancorp","cvbfinancialcorp","d.l.evansbancorp","dacotahbanks","dahsingbankinggroup","daisanbank","daishibank","daitobank","dalnevostochnyybank","danskebank","danskebank","danskebankfinland","danskebankireland","danskebanklithuania","danskebanknorway","dashenbank","dbsbank","dbsbankchina","dbsbankhongkong","dbsbankindia","dbsbankindonesia","dbsbanktaiwan","dcbfinancialcorp","dcommercebank","dearbornbancorp","deerwoodstatebank","degroofbanqueprivee","dekabankgroup","delavskahranilnica","delbank","deltabancsharesco","deltabank","deltabank","demerarabank","demirbank","denabank","denizbank","denizbankaustria","denmarkbancshares","depfabank","desjardinsgroup","desurinaamschebank","deutschebank","deutschebankbrazil","deutschebankchile","deutschebankchina","deutschebankhungary","deutschebankindia","deutschebankitaly","deutschebankmexico","deutschebankperu","deutschebankpoland","deutschebankrussia","deutschebankspain","deutschebankturkey","deutschebankuk","deutschepostbank","deutscheschiffsbank","dexia","dexiabanknetherland","dezhoubank","dfccbank","dfcugroup","dgbfinancialgroup","dhakabank","dhanalakshmibank","diamondbancorp","diamondbank","diamondbankbenin","diamondbanksenegal","diamondbanktogo","diamondtrustbank","discountbancorp","dnbbankalatvia","dnbbankalithuania","dnbbankchile","dnbgroup","dnblatvia","dnister","dohabank","dongabank","dongyingbank","dskbank","dubaiislamicbank","durantbancorp","dutchbanglabank","dvbbank","dzbankpolska","eaglebancorp","eastbridgebank","easternbank","easternbank","eastwestbancorp","eastwestbankingcorp","ecobankbenin","ecobankburkinafaso","ecobankburundi","ecobankcameroon","ecobankcapeverde","ecobankcentrafrique","ecobankchad","ecobankcongo","ecobankdrccongo","ecobankgabon","ecobankgambia","ecobankghanalimited","ecobankguinea","ecobankguineabissau","ecobankkenya","ecobankliberia","ecobankmalawi","ecobankmali","ecobankniger","ecobanknigeria","ecobankrwanda","ecobanksenegal","ecobanksierraleone","ecobanktanzania","ecobanktogo","ecobankuganda","ecobankzambia","ecobankzimbabwe","eestikrediidipank","efggroup","efginternational","egg","egyptiangulfbank","ehimebank","eighteenthbank","eikbankiforoya","elafislamicbank","electrobanque","emiratesislamicbank","emiratesnbd","emporikibank","encorebancshares","energbank","energobank","eniseybank","enterprisebancorp","entiecommercialbank","eonbank","equabank","equitybancshares","equitybank","erstebankhungary","erstebankpodgorica","erstebankukraine","erstegroup","esbbancorp","esuncommercialbank","eurasianbankjsc","eurobank","eurobankbulgaria","eurobankcyprus","eurobankergasias","eurobankserbia","eurocreditbank","eurohypo","europabank","europeantrustbank","europearabbank","eurostandardbank","eurotorginvestbank","everbank","everestbank","evergrowingbank","eximbank","eximbankkazakhstan","expobank","expressbank","extracocorporation","f.n.b.corp","factorbanka","familybank","fareasternbank","farmersenterprises","faysalbank","fbcholding","fbnbankuk","federalbank","fenturafinancial","fibabanka","fibibankuk","fideaholdings","fidelitybancorp","fidelitybancshares","fidelitybank","fidelitybank","fidelitybankbahamas","fidobank","fifththirdbancorp","fiherhvervsbank","fimbank","finabank","finabank","financebankzambia","finansbank","fincombank","findomesticbanca","fineco","finibancoangola","finibancoholding","finprombank","firstbancorp","firstbancorp","firstbancorp","firstbancorp","firstbancshares","firstbancshares","firstbankcorp","firstbankofnigeria","firstbankoftoyama","firstbanks","firstbusinessbank","firstcitizensbank","firstcobancorp","firstcommercialbank","firstcommercialbank","firstenergybank","firstfinancialcorp","firstglobalbank","firstgulfbank","firstinvestmentbank","firstmarinerbancorp","firstmerchantbank","firstmiamibancorp","firstmidwestbancorp","firstrand","firstrandindia","firstsecuritygroup","firstsinobank","firstsouthbancorp","firsttexas","firsttexasbancorp","firstunitedcorp","firstwomenbank","firstyorkbancorp","florencebancorp","fnbbancorp","fnbhbancorp","fnc","forchtbancorp","forexbank","fortebank","fortuneo","foundersgroup","foxchasebancorp","fpbbank","franklinresources","fransabank","fsbbancorp","fsbmutualholdings","fubonbankhongkong","fudianbank","fujianhaixiabank","fukuhobank","fukuibank","fukuokachuobank","fukushimabank","fultonfinancialcorp","futurebank","gallabank","gandjabank","garantibankmoscow","gatoholdings","gazbank","gazprombank","gbsmutualbank","gemoneybankfrance","gemoneybanklatvia","gemoneybankrussia","genikibank","getinbank","getinnoblebank","ghanacommercialbank","ghazanfarbank","gifushinkinbank","girobank","girocommercialbank","glacierbancorp","glarnerkantonalbank","globexbank","gmacbankgermany","gnbsudamerisbank","goldmansachs","goldmansachsbrazil","golomtbank","gorenjskabanka","grandinvestbank","grandpointcapital","granitbank","greenbancorp","groupamabanque","groupebpce","grupobancaja","grupofinancierohsbc","grupounnim","gtcbank","guangdongnanyuebank","guarantybancorp","guarantytrustbank","guardianbank","guilinbank","guillaumebank","gulfafricanbank","gulfbank","gulfbankalgeria","gulffinancehouse","gumhouriabank","gunmabank","habibbankmauritius","habibbankturkey","habibbankzurich","habiboverseasbank","hachijunibank","hakrinbank","halkbankadskopje","halykbank","halykbankkyrgyzstan","hamburgersparkasse","hamkorbank","hampdenbancorp","hanabankchina","hanabankindonesia","hanafinancialgroup","hancockholdingco","hangsengbank","hangsengbankchina","hankoubank","happybancshares","harbinbank","hattonnationalbank","havinbanklimited","hawthornbancshares","hblpakistan","hbos","hbzbank","hdfcbank","heartlandbancorp","hellenicbank","hellenicpostbank","helmbankpanama","heritagebank","heritageoaksbancorp","hfcbank","hfcbank","higashinipponbank","highlandsbankshares","higobank","hillcrestbancshares","hillsbancorporation","hilltopholdings","himalayanbank","hipotekarnabank","hiroshimabank","hnbcorporation","hokkaidobank","hokkokubank","hokuetsubank","hokutobank","homebancshares","homecreditb.v.","homecreditslovakia","homefederalbancorp","hometownbanccorp","hongleongbank","hopfedbancorp","horizonbancorp","howabank","hsbcamanahmalaysia","hsbcbank","hsbcbankargentina","hsbcbankarmenia","hsbcbankaustralia","hsbcbankbangladesh","hsbcbankbermuda","hsbcbankbrasil","hsbcbankcanada","hsbcbankchile","hsbcbankegypt","hsbcbankfrance","hsbcbankindonesia","hsbcbankkazakhstan","hsbcbankmacao","hsbcbankmalaysia","hsbcbankmalta","hsbcbankmauritius","hsbcbankmiddleeast","hsbcbanknicaragua","hsbcbankoman","hsbcbankparaguay","hsbcbankpolska","hsbcbankrussia","hsbcbankturkey","hsbcbankuruguay","hsbcbankvietnam","hsbccorpchina","hsbcholdings","hsbcindia","hsbcsrilanka","hshnordbank","huaxiabank","hubeibank","hudsoncitybancorp","huishangbank","hwataibank","hyakugobank","hyakujushibank","hydeparkbancorp","hyponoebank","hypotecnibanka","hypotirolbank","hypovereinsbank","ibercajabanco","ibtbancorp","icbbankbumiputera","iccreaholding","icicibank","icicibankeurasia","icicibankuk","idagrovebancshares","idbi","ideabank","ideabank","ificbank","ihagprivatbank","imexbank","imexbanka","imperialbank","indebank","independentbankcorp","independentholdings","indianbank","indianoverseasbank","indovinabank","indozambiabank","indusindbank","industrialbank","industrialbank","industrialbank","industrybancshares","inecobank","ingbank","ingbankaustralia","ingbankbelgium","ingbankbrazil","ingbankeurasia","ingbankfrance","ingbankhungary","ingbankindonesia","ingbankslaski","ingbankturkey","ingbankukraine","ingdiba","ingluxembourg","ingvysyabank","inlandbancorp","insingerdebeaufort","integralbank","inteligobank","inteligobankpanama","interaudibank","interbanco","interbank","interbankburundi","intercommercialbank","intercommerzbank","interprogressbank","intesasanpaolo","investabank","investbank","investbank","investbank","investbank","investbank","investbank","investecbank","investecsouthafrica","investkredit","investmenttradebank","investorsbancorp","investrustbank","inwoodbancshares","isbank","islamicbankofyemen","islandsbanki","israeldiscountbank","iyobank","izolabank","jadranskabanka","jammaltrustbank","jamunabank","janatabank","japanpostbank","jeonbukbank","jimotoholdings","jinchengbank","jinshangbank","johnanshinkinbank","jordanahlibank","jordanislamicbank","jordankuwaitbank","joyobank","jpmorgan","jpmorgancolombia","jpmorganindonesia","jsbank","jsbceximbank","jubanka","jubmesbanka","jugrabank","julianhodgebank","juliusbaergroup","jurokubank","jyskebank","kabulbank","kagawabank","kagoshimabank","kanagawabank","kanbawzabank","kapitalbank","karafarinbank","karlovackabanka","karnatakabank","karntnersparkasse","karurvysyabank","kasbank","kasbbank","kasikornbank","kaspibank","kautharbank","kazinvestbank","kazkommertsbank","kbcbanka","kbcbankireland","kbcgroup","kbfinancialgroup","kdbfinancialgroup","keiyobank","kenyacommercialbank","keycorp","keystonebank","khanbankofmongolia","kharismabank","khushhalibank","kiatnakinbank","kienlongbank","killbuckbancshares","kingdombank","kingdombank","kinkiosakabank","kirayakabank","kitanipponbank","kiwibank","kiyobank","kiyobank","kleinfinancial","komercnibanka","kookminbankcambodia","koreaexchangebank","korstandardbank","kotakmahindrabank","kreditnabankazagreb","kreditprombank","kredobank","kredobankukraine","kreissparkassekoln","kreissparkassekusel","kreissparkassemayen","kreissparkassemelle","kreissparkassepeine","kreissparkassestade","kreissparkassesyke","krepbank","krungthaibank","kumamotofamilybank","kumaribank","kutxabank","kuwaitfinancehouse","kwangjubank","kyivbank","kyongnambank","kyotoshinkinbank","labanquepostale","laikibank","laishangbank","lakelandbancorp","lakesidebancorp","lakshmivilasbank","landandhousebank","landbankoftaiwan","landbankphilippines","landrumcompany","landsbankinnhf.","landshypotekbank","lantabank","laxmibank","lbbwbankcz","lclbanque","lcnbcorp","legacytexasgroup","leumiprivatebank","lgtgroup","liberbankgroup","libertybancshares","libertybancshares","libertybank","librabank","libyanforeignbank","lienvietpostbank","linshangbank","lloydsbankinggroup","lnbbancorp","localtapiolabank","lockobank","lombardbankmalta","londonscottishbank","longjiangbank","lowellfivebancorp","lsbcorp","lumbinibank","macauchinesebank","machhapuchrebank","machiasbancorp","maconbancorp","macquariegroup","maerkibumann","mainstreetbank","mainzervolksbank","maldivesislamicbank","maplebank","marfinbankromania","maritimebank","maruhanjapanbank","mashreqbank","masrafalrayan","masterbank","maybankcambodia","maybankphilippines","mbcabank","mbfinancial","mbtfinancialcorp","mcbbank","mdmbank","medicinosbankas","medimurskabanka","mediobanca","mediterraneanbank","meezanbank","megabank","mekonghousingbank","mellatbank","mellibank","membersequitybank","mercantilebancorp","mercantilebank","merchantbankghana","merchantsbancorp","merchantsbancshares","metafinancialgroup","metallinvestbank","metrobancorp","metrobank","metrocorpbancshares","mezhtopenergobank","mibanco","mibanco","mibanco","michinokubank","middleeastbankkenya","middlesexbancorp","midillinoisbancorp","midpennbancorp","midsouthbancorp","midwestbankcentre","miebank","migrosbank","mikrokreditbank","militarybank","milleniumbankpoland","millenniumbcp","minaminipponbank","minatobank","minnehahabanshares","minnwestcorporation","minsktransitbank","misrbankeurope","mistobank","miyazakibank","miyazakitaiyobank","mizrahitefahotbank","mizuhobankchina","mizuhobankindonesia","mizuhobankmalaysia","mizuhobankthailand","mizuhointernational","mkb","mkbnextebank","mkbunionbank","mmgbankpanama","mobiasbanca","moldindconbank","moldovaagroindbank","momijibank","monabanq","montecitobancorp","montepaschibanque","moodybancshares","morabancgrup","mordovpromstroybank","morganstanley","morganstanleybv","morrillbancshares","moscomprivatbank","moscowcitybank","moskommertsbank","mosstroieconombank","mozabanco","mpbank","msbmutualholdingco","mtsbank","multibank","municipalbank","musashinobank","mutiarabank","mutualtrustbank","myanmarcitizensbank","myanmarorientalbank","myanmarorientalbank","n26","nabilbank","nadrabank","naganobank","nainitalbank","namacommercialbank","namvietbank","nantobank","nanxunbank","nationalbank","nationalbank","nationalbankforforeigneconomicactivityoftherepublicofuzbekistan","nationalbankofegypt","nationalbankofkenya","nationalbankofoman","nationalbankofsudan","nationalbankofyemen","nationalbankshares","nationalbanktrust","nationalcreditbank","nationalreservebank","nationalsavingsbank","nationstrustbank","natixis","natixisalgerie","natixisbrasil","nbcbank","nbdbank","nbhholdingscorp","nbsbank","nbtbancorp","nebcorp","nedbankgroup","nedbanknamibia","nedbankswaziland","nepalbank","nepalinvestmentbank","nepalsbibank","neueprivatbank","newbridgebancorp","newsymbolbank","nextierincorporated","nibbank","nibcholding","nicoletbankshares","ningbocommercebank","nishinipponcitybank","nlbbankabeograd","nlbbankasofia","nlbmontenegrobanka","nlbprishtina","nlbtutunskabanka","nmbzholdings","noblegrossart","nomosbank","nomuraholdings","noorbank","nordeabankdenmark","nordeabankfinland","nordeabanknorge","nordeabankpolska","nordeabankrussia","nordeagroup","nordjyskebank","nordlandsbanken","nordostseesparkasse","norinchukinbank","norisbank","norresundbybank","northeastbancorp","northpacificbank","northrimbancorp","northvalleybancorp","northwayfinancial","northwestbancshares","northwestbancshares","norvikbanka","norwaybancorp","notabank","novabanka","novagaliciabanco","novikombank","nrwbank","nuevobancocomercial","nuevobancodelarioja","nuevobancodelchaco","nuevobancodesantafe","nurbank","nvebancorp","nykredit","oberbank","ocbcbankmalaysia","oceanbank","oceanbankshares","oceanicbank","odeabank","ofgbancorp","ogakikyoritsubank","ohiovalleybanccorp","ohnwardbancshares","oitabank","okazakishinkinbank","okinawakaihobank","oldlinebancshares","oldnationalbancorp","oldsecondbancorp","olympicbancorp","omanarabbank","oneamericancorp","onebank","oneybank","optimabank","orabank","orabankbenin","orabankchad","orabankgabon","orabankguinea","orabankmauritania","orcobank","ordosbank","orienbank","orientbank","orientbank","orientexpressbank","oskindochinabank","otpbank","otpbankcroatia","otpbankromania","otpbankrussia","otpbankserbia","otpbankslovakia","otpbankukraine","ottawabancshares","pabbankshares","pacwestbancorp","palmbancorp","palmettobancshares","pancaribbeanbank","panelliniabank","parabank","paranabanco","parisbancshares","paritetbank","parkebancorp","parknationalcorp","parkwaybancorp","parsianbank","partnerbanka","pashabank","passumpsicbancorp","patriotbancshares","pennswoodsbancorp","peoples","peoplesbancorp","peoplesbancorp","peoplesbancorp","peoplescorporation","peoplesholdingco","petrolimexgroupbank","philtrustbank","pinganbank","pinnaclebancorp","piraeusbankbulgaria","piraeusbankcyprus","piraeusbankegypt","piraeusbankgroup","piraeusbankromania","piraeusbankserbia","piraeusbankukraine","pivdennyibank","pkobankpolski","plainsbancorp","plantersholdingco","podgorickabank","podravskabanka","policombank","pontiacbancorp","popular","popularbank","popularcreditbank","porterbancorp","portigonag","portofrankobank","postbankofiran","postovabanka","ppfbanka","pravexbank","premierbank","premierwestbancorp","primabankaslovensko","primebank","primebank","primorskabanka","primsotsbank","priorbank","privalbank","privatbank","privatbank","privatbanka","privatbankbellerive","privatebancorp","probank","probanka","probusinessbank","procreditbankcongo","procreditbankkosovo","procreditbankserbia","procreditholding","produbankpanama","profinbank","promekonombank","prometeybank","prominvestbank","promsvyazbank","prudentialbancorp","prudentialbank","prvabankacrnegore","psabanquefrance","ptbankpaninsyariah","ptbankqnbkesawan","ptbanksyariahbni","pubalibank","publicbank","publicbankhongkong","publicislamicbank","punjabnationalbank","putnambancshares","pvcombank","qatarislamicbank","qatarnationalbank","qazaqbanki","qcrholdings","qilubank","qishangbank","qnbalahlibank","qnbcorp","rabitabank","rabobankchile","rabobankgroup","rabobankindonesia","rabobanknewzealand","rabobankpoland","radabank","raiffeisenbankad.d.","raiffeisenbankaval","raiffeisenbankmalta","rakbank","rakutenbankltd","rasheedbank","rastriyabaniyabank","ratnakarbank","rawbank","rbbbancorp","rbsholdingnv","rbttbankantilles","rbttbankaruba","rbttbankbarbados","rbttbankcaribbean","rbttbankgrenada","rbttbankjamaica","rcbcorporation","rcbholdingcompany","rcibanque","realbank","realestatebank","redriverbancshares","reliancebancshares","renaissancecredit","renasantcorporation","republicbancorp","republicbancorpco","republicbank","republicbankgrenada","republicbankguyana","resonaholdings","reverta","rhbbankberhad","rhbislamicbank","rietumubanka","riyadbank","rockvillefinancial","rodovidbank","rogersbancshares","rokelcommercialbank","rosbank","rosdorbank","rosevrobank","rosgosstrakhbank","rosinterbank","rossiyskycapital","rossiyskykreditbank","rostbank","royalbankofcanada","royalbankofscotland","rsibancorp","rskbank","rupalibank","ruralbank","rurbanfinancialcorp","russianlandbank","russianstandardbank","s.y.bancorp","sabaislamicbank","sagakyoeibank","saigonhanoibank","saikyobank","salemfivebancorp","salinbancshares","samanbank","sambabank","sambafinancialgroup","samoborskabanka","sampathbank","sampopank","sandnessparebank","sandyspringbancorp","sanpaolobank","santanderuk","sarovbusinessbank","sasfinbank","saudibritishbank","saudihollandibank","saudiinvestmentbank","saudisudanesebank","savannahbancorp","savingsbankgroup","saxobankgroup","sbcinc","sberbank","sberbankcroatia","sberbankeurope","sberbankkazakhstan","sberbankserbia","sberbankslovenia","sberbankslovensko","sberbankukraine","sbimauritius","sbisumishinnetbank","sbtbancshares","schoellerbank","schroders","scotiabank","scotiabankanguilla","scotiabankbahamas","scotiabankbarbados","scotiabankbelize","scotiabankbrasil","scotiabankchile","scotiabankcostarica","scotiabankguyana","scotiabankhaiti","scotiabankinverlat","scotiabankjamaica","scotiabankmalaysia","scotiabankpanama","scotiabankperu","sdmbank","seawaybancshares","sebbanka","sebbankdenmark","sebbankgermany","securitybancshares","seerainvestmentbank","sekerbank","senagatbank","sendaibank","senshuikedabank","serbianbank","sevenbank","seylanbank","sgbbank","shahjalalislamibank","sharjahislamicbank","shawbrookbank","shengjingbank","shigabank","shikokubank","shimanebank","shimizubank","shinhanbankindia","shinhanbankvietnam","shinkincentralbank","shinkongbank","shinseibank","shinwabank","shizuokabank","shizuokachuobank","shokochukinbank","shonaibank","shorebancshares","siamcommercialbank","siauliubankas","sibneftebank","sidbanka","siddharthabank","sierrabancorp","silkbank","sinabank","sinopacbancorp","skandiabanken","skbbank","skbbanka","skbhcholdings","skyebank","skyebankgambia","skyebankguinea","skyebanksierraleone","slatinskabanka","smebank","smolenskiybank","smpbank","smpbank","snsbank","sobinbank","socialislamibank","societegenerale","sogebank","solvaybankcorp","sonalibank","soneribank","sotsinvestbank","southeastasiabank","southeastbank","southernbancshares","southernbank","southindianbank","southshorebancorp","southsidebancshares","southvalleybancorp","southwestbancorp","sovcombank","sovereignbancorp","sovereignbancshares","sparbankenoresund","sparebank1nordnorge","sparebank1smn","sparebank1srbank","sparebankenhedmark","sparebankenmore","sparebankenpluss","sparebankensor","sparebankenvest","sparekassenfaaborg","sparkasseaachen","sparkasseallgau","sparkassebamberg","sparkassebank","sparkassebankmalta","sparkassebayreuth","sparkassebensheim","sparkassebielefeld","sparkassebochum","sparkassebodensee","sparkassebremen","sparkassecelle","sparkassechemnitz","sparkassedachau","sparkassedarmstadt","sparkassedeggendorf","sparkassedetmold","sparkassedieburg","sparkassedonauworth","sparkassedortmund","sparkasseduisburg","sparkasseduren","sparkasseelbeelster","sparkasseemsland","sparkasseerlangen","sparkasseessen","sparkasseforchheim","sparkassefreising","sparkassegottingen","sparkassegutersloh","sparkassehagen","sparkassehamm","sparkassehanau","sparkassehannover","sparkasseheidelberg","sparkasseherford","sparkassehildesheim","sparkassehochrhein","sparkasseholstein","sparkassehoxter","sparkasseingolstadt","sparkassekarlsruhe","sparkassekleve","sparkassekoblenz","sparkassekolnbonn","sparkassekraichgau","sparkassekrefeld","sparkasselandshut","sparkasselemgo","sparkasseleverkusen","sparkasseluneburg","sparkasselunen","sparkassemainz","sparkasseneuss","sparkasseneuwied","sparkassenienburg","sparkassenurnberg","sparkasseoberhessen","sparkasseoderspree","sparkasseosnabruck","sparkassepaderborn","sparkassepassau","sparkasseregensburg","sparkasserheinnahe","sparkasserottalinn","sparkasseschaumburg","sparkasseschwaz","sparkassesiegen","sparkassetrier","sparkasseulm","sparkasseunna","sparkassevogtland","sparkassewetzlar","sparkassezollernalb","sparkassezulubeck","sparkassezwickau","sparnordbank","spiritbankcorp","splitskabanka","square1financial","stanbicbankbotswana","stanbicbankghana","stanbicbanktanzania","stanbicbankuganda","stanbicbankzambia","stanbicbankzimbabwe","stanbicibtcholdings","standardbancshares","standardbankgroup","standardbankmalawi","standardbanknamibia","standardbankrdcongo","standardbankuk","standardchartered","standardlesothobank","starfinancialgroup","starkbankgroup","starokyivskybank","statebancorp","statebankofindia","statebankofmysore","statebankofpatiala","statebankshares","statestreetcorp","stbank","stedbanka","sterlingbancorp","sterlingbank","stgeorgebank","stgeorgesbank","stifelfinancialcorp","stockyardsbancorp","storebrandbankgroup","sturmfinancialgroup","stusidbank","sudamerisbank","sudanesefrenchbank","sudaneseislamicbank","sudostroitelnybank","sudtirolervolksbank","suezcanalbank","suffolkbancorp","sugamoshinkinbank","summitbancorp","summitbank","sunbancorp","suncorpmetway","sunflowerfinancial","sunnybank","suntrustbanks","sunwestmortgage","surgutneftegasbank","surichangebank","surugabank","sviazbank","svyaznoybank","swedbank","swedbankas","swedbankestonia","swedbanklithuania","sydbank","syndicatebank","tachongbank","tadamonislamicbank","tagbank","taibbank","taibkazakhbank","taibyatirimbank","taifungbank","taikobank","taisangbank","taishobank","taiwanbusinessbank","taiyaubank","tajimabank","tajprombank","takarekbank","tallinnbusinessbank","talmerbancorp","tampabankingco","tatfondbank","tatrabanka","taunuscorporation","taylorcapitalgroup","tbank","tbcbank","tbilbusinessbank","tcffinancialcorp","tcziraatbankasi","technobank","tekstilbankasi","temirbank","tescobank","teximbank","thanachartbank","thebanccorporation","thebancorp","thebankofeastasia","thebankofkhyber","thecitybank","thecooperativebank","thesaningodobank","tibfinancialcorp","tiranabank","tirolersparkasse","tiscobank","tmbbank","tochigibank","tochigishinkinbank","tohobank","tohokubank","tojiksodiotbonk","tokudabank","tokushimabank","tokyostarbank","tokyotominbank","tomatobank","tomonyholdings","torontodominionbank","tottoribank","towabank","toyamabank","tradebankofiraq","trafinaprivatbank","transbank","transcapitalbank","transcreditbank","transnationalbank","tricobancshares","triodosbank","triumphbancorp","tropicalbank","trustbank","trustbank","trustbankalgeria","trustbanklimited","trustcommercialbank","trustmerchantbank","tsbbank","tsesnabank","tsukubabank","ttkbank","tunisianqataribank","turanbank","turkekonomibankasi","turkishbankturkey","turkishbankuk","turkiyehalkbankasi","turkiyeisbankasi","turklandbanka.s.","turkmenbashibank","turkmenturkishbank","tuzlanskabanka","tveruniversalbank","ubaearabitalianbank","ubank","ubs","ubschina","ubsluxembourg","ubsmexico","ucobank","ufsbancorp","ukhtabank","ukoopspilkabank","ukrgasbank","ukrgazprombank","ukrsibbank","ukrsotsbank","ulaanbaatarcitybank","ulsterbankireland","umbfinancialcorp","unexbank","uniastrumbank","unibank","unibank","unibank","unibank","unibankghana","unicajabanco","unicredit","unicreditbanklatvia","unicreditbankrussia","unicreditbankserbia","unicreditbulbank","unicredittiriacbank","unionbancaireprivée","unionbancalcorp","unionbank","unionbankddsarajevo","unionbankofcolombo","unionbankofindia","unionbankofisrael","unionbankofnigeria","unionbankoftaiwan","unionbankshares","unionbankuk","unioncommercialbank","unionnationalbank","uniontrustbank","unipolbanca","unitedarabbank","unitedbancorp","unitedbank","unitedbank","unitedbankforafrica","unitedbankofalbania","unitedbankofindia","unitedbankshares","unitedbankzurich","unitedbulgarianbank","unitedcapitalbank","unitedgulfbank","unitedkreditbank","unitedoverseasbank","unitedtrustbank","unitybank","unitytrustbank","universalbank","universalbank","universalsavingbank","univerzalbanka","uraltransbank","urnerkantonalbank","usameribancorp","usbancorp","utbank","uttarabank","uzpromstroybank","vababankvarazdin","vakufskabanka","valartisgroup","valiantholdingag","vattanacbank","vbsmutualbank","venetobanca","venetobankad.d.","versobank","versusbank","vestjyskbank","vibcorp","victoriabank","vietcapitalbank","vietinbank","vijayabank","vinasiambank","virginmoneygroup","visionbanco","vistfinancialcorp","vneshprombank","vojvodjanskabanka","volksbankbanjaluka","volksbankromania","volkskreditbankag","volkswagenbank","vontobelholding","vtb24bank","vtbbank","vtbbankarmenia","vtbbankaustria","vtbbankbelarus","vtbbankdeutschland","vtbbankfrance","vtbbankgeorgia","vtbbankukraine","vuzbank","vyborgbank","wahdabank","washingtonfederal","waterstonefinancial","wegagenbank","wesbanco","westamericabancorp","westbancorporation","westbrand","westlandutrechthypo","westlbbelgium","westpac","westpacfiji","westpacnewzealand","westsuburbanbancorp","wgzbankireland","wilmingtontrustcorp","wilshirebancorp","windwardislandsbank","winghangbank","winghangbankchina","winglungbank","wnbbancshares","wooribankchina","woorifinancialgroup","workersunited","wtbfinancialcorp","wvsfinancialcorp","xacbank","xiamenbank","yachiyobank","yadanabonbank","yamagatabank","yamaguchibank","yamanashichuobank","yangoncitybank","yantaibank","yapıvekredibankası","yemencommercialbank","yesbank","yinzhoubank","yomabank","zagbank","zagrebackabanka","zakhidbudgazbank","zakhidinkombank","zamanbank","zaocitibank","zaoraiffeisenbank","zapsibcombank","zbfinancialholdings","zemelnykapital","zemenbank","zenitbankinggroup","zenithbank","zenithbankgambia","zenithbankghana","zenithbankuk","zhangjiakoucitybank","zionsbancorporation","zionsbank","ziraatbankcjsc","zolotivorotabank","zugerkantonalbank","zurichcantonalbank"];
TrainingData.birds_common_names = ["abbottsbooby","abdimsstork","acaciapiedbarbet","acadianflycatcher","acornwoodpecker","adamawaturtledove","adeliepenguin","admirablehummingbird","afeppigeon","afghansnowfinch","albatross","aleutiantern","allensgallinule","allenshummingbird","alpineaccentor","alpinechough","alpineswift","antbird","apostlebird","ashyfacedowl","ashyheadedgoose","ashyheadedgreenpigeon","ashywoodpecker","avocet","bandedkestrel","bandedkingfisher","bandedlapwing","bandedstilt","bandedwoodpecker","barbet","barbthroat","barheadedgoose","barkingowl","barnaclegoose","barneckedcuckoodove","barnswallow","barredowlet","batfalcon","bathawk","beachkingfisher","beardedreedling","beardedscreechowl","beardedvulture","beeeater","beehummingbird","bellbird","bittern","blackduck","blackgrouse","blackheadedoriole","blackheron","blackswan","blackswift","blacktern","bluebilledduck","bluejay","bluequail","bluethroat","bluetit","broadbill","bronzewing","browndove","brushturkey","bustard","buttonquail","buzzard","chickadee","cockoftherock","collareddove","condor","coot","cormorant","coucal","cowbird","crake","crestedhummingbird","crow","cuckoo","cuckoodove","cuckoohawk","cuckooshrike","darter","darter","dipper","dollarbird","dowitcher","dwarfkingfisher","eagleowl","eagleowl","emerald","emeraldcuckoo","fairybluebird","falcon","finch","finfoot","fisheagle","fishowl","flameback","flamingo","flicker","florican","flufftail","forestfalcon","francolin","frigatebird","fruitdove","fruiteater","gannet","glossystarling","gnatcatcher","goawaybird","goldeneye","goldenplover","goldensparrow","goldfinch","goose","goshawk","grassowl","greenpigeon","greenpigeon","greyhornbill","greywoodpecker","groundcuckoo","grounddove","guan","guineafowl","gull","harrier","harrierhawk","hawkeagle","hawkowl","heron","herringgull","hillstar","hobby","honeybird","honeybuzzard","hoopoe","hornbill","hummingbird","imperialpigeon","jacamar","jacana","jewelbabbler","kestrel","kingfisher","lapwing","lapwing","lark","logrunner","magpie","mango","marshharrier","maskedowl","metaltail","monarchbird","mountaintoucan","murrelet","nativehen","needletail","nighthawk","nightheron","nightjar","nunbird","olivepigeon","openbill","owlet","oystercatcher","paintedsnipe","palmswift","paradiseflycatcher","partridge","peacockpheasant","penguin","petrel","pheasant","piculet","piculet","piedhornbill","puffbird","puffin","puffleg","pygmyfalcon","pygmygoose","pygmykingfisher","pygmyowl","rail","redstart","reedwarbler","robin","rockjumper","rockpigeon","sacredibis","sandgrouse","satinbird","scimitarbill","scopsowl","screechowl","scrubfowl","scurassow","serpenteagle","shag","sheartail","shearwater","sheathbill","shelduck","shoveler","sicklebill","skimmer","snipe","snowcock","sparrow","sparrowhawk","spinetail","spoonbill","spurfowl","starfrontlet","starling","stork","stormpetrel","streamertail","sugarbird","sunbeam","swamphen","swamphen","swift","swiftlet","teal","tern","thorntail","threetoedwoodpecker","throatedmountaingem","throatedsunangel","tigerheron","treecreeper","trogon","warbler","wattledlapwing","wattleeye","waxbill","whistlingduck","whiteeye","whiteibis","whitepelican","wigeon","woodcock","woodowl","woodpecker","woodpigeon","woodquail","woodstar"];
TrainingData.board_games = ["abalone","acronymble","agricola","alias","articulate","backgammon","balderdash","battleship","blockade","buckaroo","checkers","chess","clue","diamond","diplomacy","dominion","dominos","downfall","draughts","go","guesswho","hex","isola","jenga","kerplunk","kropki","ludo","mahjong","mastermind","monopoly","mousetrap","obsession","operation","othello","pandemic","pictionary","risk","scattergories","scrabble","senet","shogi","stratego","trivialpursuit","twister","ubongo","uno","upwords","yahtzee"];
TrainingData.boat_types = ["airboat","bananaboat","barge","bassboat","boita","bowrider","bracera","cabincruiser","cableferry","canoe","capeislander","captainsgig","carboat","carfloat","catamaran","centerconsole","coble","coracle","cornishpilotgig","crashrescueboat","cruiseship","cuddyboat","cutter","dhow","dinghy","dory","dragger","dragonboat","driftboat","drifter","dugout","durhamboat","electricboat","expresscruiser","ferry","fireboat","fishingboat","floattube","flyak","flyingboat","foldingboat","friendshipsloop","fullriggedpinnace","garbagescow","gofastboat","gondola","greatlakesfreighter","gundalow","houseboat","hovercraft","hydrofoil","hydroplane","iceboat","inflatableboat","jetboat","jetski","jonboat","jukung","junk","ketch","landingcraft","langschiff","launch","lifeboat","lighter","logboat","longboat","longship","longtail","lugger","luxuryyacht","mackinawboat","masulaboat","missileboat","monitor","motorboat","motorlaunch","narrowboat","nordland","norfolkwherry","oiltanker","optimist","outriggercanoe","paddlesteamer","patrolboat","personalwatercraft","pinnace","pirogue","pleasurebarge","pleasurecraft","policewatercraft","pontoon","powerboat","proa","pumpboat","punt","raft","reactionferry","recreationaltrawler","reedboat","rigidhulledinflatable","riverboat","rodneyboat","rowboat","runabout","sailboat","sampan","schooner","scow","seakayak","seakayak","shadboat","shallop","sharpie","shikara","ship","shipstender","skiboat","skiff","skipjack","slipperlaunch","sloop","speedboat","steamboat","submarine","supertanker","surfboat","swiftboat","torpedoboat","towboat","trainferry","trawler","trimaran","tugboat","wakeboardboat","walkaround","waterambulance","watertaxi","weidling","whaleboat","yacht","yawl","zille"];
TrainingData.body_parts = ["abdomen","adamsapple","ankle","anus","arm","belly","bellybutton","bigtoe","breast","buttocks","calf","calf","calves","canines","cheeks","chest","chin","clavicles","collarbone","diaphragm","ear","earlobes","elbow","elbows","esophagus","eye","eyebrows","eyelashes","eyelids","feet","finger","fingernail","foot","forehead","forehead","gallbladder","groin","gums","hair","hand","head","hips","intestines","jaw","kidney","knee","kneecap","kneecap","larynx","leg","lips","liver","molars","mouth","muscles","nails","navel","nipples","nose","nostril","palms","penis","penvis","pupils","rectum","ribs","scalp","scrotum","shinbone","shoulderblades","shoulders","skin","skull","soles","spine","spleen","sternum","teeth","tendons","thigh","thighs","throat","thumb","tibia","toes","tongue","tooth","torso","trachea","vulva","waist","wrist"];
TrainingData.breads = ["aniseedbread","bananabread","banburycake","bannock","bathbun","beatenbiscuit","beerbread","belgianbun","biscuit","bostonbun","brownbread","bun","cardamombread","carrotbread","chelseabun","cinnamonroll","cocktailbun","coffeecake","cornbread","currantbun","danishpastry","drippingcake","eggwaffle","farl","fruitbun","frybread","gingerbread","griddlescone","honeybun","hotcrossbun","hushpuppy","icedbun","kingcake","lardycake","londonbun","longevitypeach","lotusseedbun","mantecadas","melonpan","muffin","muffin","pancake","parisbuns","peanutbutterbun","pineapplebun","pumpkinbread","pumpkinbread","raisinbread","saffronbun","scone","shortcake","soboro","sodabread","sopaipilla","stickybun","stollen","sweetroll","tahiniroll","teacake","waffle","welshcake","zucchinibread"];
TrainingData.breakfast_cereals = ["addamsfamilycereal","allbran","almonddelight","alpen","alphabits","applecinnamoncheerios","appleclones","applejacks","applejacksgliders","appleraisincrisp","applezingaroos","applezings","bakedapplelife","bananafrostedflakes","banananutcheerios","berrryluckycharms","berryberrykix","berryburstcheerios","berrykrispies","booberry","capncrunch","captainplanetcereal","caramelcrunchfuls","ceccettios","cheerios","chocapic","chococrunch","chocolatecheerios","chocolatechex","chocolatecrunchfuls","chocolatedonutz","chocolateflake","chocolatekrave","chocolateoatcrunchlife","chocolatetoastcrunch","chrebetcrunch","christmascrunch","cinnabon","cinnamoncheerios","cinnamonchex","cinnamoncrunch","cinnamongrahams","cinnamonjacks","cinnamonlife","cinnamonnutcheerios","cinnamontoastcrunch","cinnamontoasters","cinnasaryapplejacks","circusfun","clackers","clusters","cocoafrostedflakes","cocoahoots","cocoakrispies","cocoapebbles","cocoapuffs","cocopops","cocoroos","cocowheats","colossalcrunch","cometballs","cookiecrisp","cookiecrispbrownie","cookiecrispcereal","cornbran","cornbransquares","cornbursts","cornchex","cornflakes","cornpops","cornsoya","cornysnaps","countchocula","cranberryalmondcrunch","cranberrywheats","crazycow","crazyflakes","crispix","crispix","crispycritters","crispyrice","crispywheats","croonchystars","crunchberries","cruncheroos","crunchybran","crunchycornbran","crunchynutcornflakes","cupcakepebbles","diamondshreddies","dinersaurs","dinkydonuts","dinopebbles","doublechex","doubledipcrunch","dynobites","eggocereal","fantuzflakes","fiberone","flutieflakes","fortifiedoatflakes","frankenberry","freakies","frenchtoastcrunch","frootloops","frootloops","frostedcheerios","frostedflakes","frostedflakesgold","frostedminichex","frostedminiwheats","frosties","fruitbrute","fruitharvest","fruitycheerios","fruitypebbles","fruitypebbles","goldencrisp","goldengoals","goldengrahams","goldennuggets","goldenpuffs","goleancereal","gorillamunch","grahamchex","granola","granola","granolove","granula","grapenutflakes","grapenuts","halfsies","harvestcrunch","honeybunny","honeybuzzers","honeycomb","honeycomb","honeycrisps","honeycups","honeygrahamchex","honeykix","honeynutcheerios","honeypuffs","honeyricekrispies","honeysmacks","honeysmacks","hulkcereal","iceberrypebbles","jets","jif","jumbokrispies","jurassicparkcrunch","kaboom","kingvitaman","kix","kokokrunch","krispykritters","krunchios","krustyos","littlebites","luckycharms","luckycharms","magicpuffscereal","mallowoats","marshmallowpebbles","millenios","milocereal","miniwheats","moonstones","muesli","mueslix","muffets","multigraincheerios","nestlenesquik","nutrigrain","oatbake","oatbransquares","oatcrisp","oatibix","oatkrunchies","oatmealcookiecrisp","oatmealcrisp","oatmealsquares","optivita","orangeblossom","peanutbuttercrunch","pebblesboulders","pebblescereal","pinkpantherflakes","pokemoncereal","powdereddonutz","pronutro","prostarz","puffapuffarice","puffedrice","puffedwheat","puffins","puffkins","punchcrunch","quakequangaroos","quakerohs","quisp","railroadtracks","raisinbran","raisinbran","raisinbranccrunch","raisincrisps","raisinlife","raisinnutbran","raisinsquares","raisinwheats","razzledazzlericekrispies","readybrek","reesespuffs","reptarcrunch","ricebubbles","ricechex","ricehoneys","ricekrinkles","ricekrispies","rockyroad","scoobydoo","sesamestreetcereal","shredddspoonfuls","shreddedoats","shreddedwheat","shreddies","shreddies","shreks","sirgrapefellow","smartbbran","smartstart","smorz","smurfberrycrunch","snowflakes","spidermancereal","sprinklespangles","stars","starwarscereal","strawberryblastedhoneycomb","strawberryricekrispies","strawberryshortcake","strawberrysquares","sugarcrisp","sugarjets","sugarpuffs","sugarsmacks","sugarsprinkledtwinkles","sultanabran","suncrunchers","sunflakes","supermanstars","sweetenedwheatfuls","teamflakes","tigerpower","toastedcinnamonsquares","toastedwheatfuls","toasties","totalcinnamoncrunch","totalcorn","totalcranberrycrunch","totalhoneyclusters","triples","triplesnack","turbocereal","twinkles","unclesamcereal","undercoverbears","vanillycrunch","veggieos","vive","wackies","waffelos","wafflecrisp","weetabix","weetabixminis","weetbix","weetbix","weetos","wheatena","wheathoneys","wheaties","wheatstax","wildanimalcrunch","winterfruitypebbles","yogactive","zanyfruits"];
TrainingData.british_desserts = ["angelcake","angeldelight","applecake","applepie","arcticroll","bakewelltart","banburycake","banoffeepie","battenbergcake","blackbun","blancmange","brandysnaps","breadpudding","cabinetpudding","carawayseedcake","carrotcake","chelseabun","chorleycake","christmaspudding","clootie","cobbler","cranachan","crumble","custardtart ","dundeecake","ecclescake","empirebiscuit","etonmess","fatrascal","figgypudding","flummery","fruitfool","fruithat","fudgedoughnut","gypsytart","happyfaces","icecream","jaffacakes","jamrolypoly","knickerbockerglory","lardycake","lardycake","liverpooltart","madeiracake","maltloaf","malvernpudding","manchestertart","mincepie","parkin","penguin","pinkwafer","poundcake","raspberryripple","rhubarbpie","ricepudding","rockcake","scone","shortcake","shrewsburycake","spongecake","spoom","spotteddick","suetpudding","summerpudding","tottenhamcake","treaclespong","treacletart","trifle","welshcake"];
TrainingData.brythonic_deities = ["abandinus","abellio","abnoba","adsullata","aericura","agrona","alaunus","alisanos","ambisagrus","ancamna","ancasta","andarta","andraste","anextiomarus","ankou","arausio","arduinna","arnemetia","artio","arvernus","atepomarus","aufaniae","aventia","aveta","barinthus","belatucadros","belenus","belisama","borrum","borvo","brigantia","britannia","buxenus","campestres","camulus","canetonnessis","cernunnos","cicolluis","cimbrianus","cissonius","clota","cocidius","condatis","contrebis","coventina","damara","damona","esus","fagus","grannus","hueteris","huetiris","intarabus","iovantucarus","latobius","lenus","leucetios","lugus","luxovius","luxovius","maponos","maponus","moguns","moritasgus","mullo","nemausus","nerius","nodens","ogmios","robor","rudianos","sedatus","segomo","smertrios","sucellos","taranis","toutatis","tridamos","veteris","vheteris","vindonnus","vinotonus","virotutis","visucius","vitiris","vosegus"];
TrainingData.building_types = ["airportterminal","amphitheater","apartmentblock","archive","arsenal","artgallery","asylum","barn","barracks","basilica","blockhouse","boardingschools","boathouse","brewery","bungalow","bunker","busstation","capitol","carshop","carwash","castle","cathedral","chapel","chickencoop","church","cinema","citadel","cityhall","classroom","college","concerthall","condominium","consulate","conventioncenter","courthouse","cowshed","dormitory","duplex","embassy","factory","farmhouse","firestation","firetemple","fortress","forum","foundry","garage","gasstation","granary","greenhouse","gymnasium","hayloft","hospitals","hotel","house","internetcafe","library","lighthouse","market","markethouse","meetinghouse","metrostation","mill","milling","monastery","moothall","museum","nursinghome","operahouse","oratory","pagoda","palace","parkinggarage","parliament","pigpen","policestation","postoffice","powerplant","prison","railwaystation","restaurant","rootcellar","school","shed","shop","shoppingmall","shrine","signalbox","silo","skyscraper","smelting","stable","storagesilo","stormcellar","sty","subwaystation","supermarket","synagogue","taxistation","temple","theater","townhouse","unit","villa","warehouse","wellhouse","winery","chickenhouse"];
TrainingData.cakes = ["angelcake","angelfoodcake","applecake","applesaucecake","avocadocake","babka","bananabread","bananacake","bananacake","banoffeepie","barabrith","batikcake","battenbergcake","baumkuchen","bebinca","beercake","bibingka","birthdaycake","blackforestcake","blackforestgâteau","blackoutcake","blitztorte","bostoncreampie","brazilnutcake","brownie","buccellato","bundtcake","buttercake","butterflycake","butterkuchen","carrotcake","caterpillarcake","charlotte","cheesecake","chestnutcake","chiffoncake","chocolatecake","christmascake","clementinecake","coconutcake","coffeecake","cremeschnitte","croquembouche","crystalcake","cucumbercake","cupcake","dateandwalnutloaf","dateloaf","datesquare","depressioncake","devilsfoodcake","doboscake","dundeecake","dutchcarnivalcake","ecclescake","eroticcake","fatrascal","figcake","flourlesschocolatecake","fondantfancy","fragelité","frogcake","fruitcake","genoacake","genoesecake","germanchocolatecake","gingerbread","gooeybuttercake","goosebreast","halloweencake","hashbrownies","hotmilkcake","icecreamcake","jaffacakes","kievcake","kingcake","kranzcake","lanecake","layercake","lemoncake","madeiracake","marblecake","misérablecake","moltenchocolatecake","mooncake","muffin","napeleonscake","nasturtiumcake","onioncake","operacake","pancake","panettone","panpepato","parkin","pavlova","petitgâteau","plumcake","poundcake","princesscake","prinzregententorte","pumpkinbread","queenelizabethcake","raisincake","redbeancake","redvelvetcake","rockcake","rumbaba","rumcake","sachertorte","sesameseedcake","simnelcake","snowballcake","snowskinmooncake","soufflé","spicecake","spitcake","spongecake","stackcake","strawberrycake","suncake","swissroll","teacake","tealoaf","tiramisu","upsidedowncake","victoriaspongecake","walnutloaf","weddingcake","welshcake","whoopiepies","winecake"];
TrainingData.capitol_cities = ["abudhabi","abuja","adamstown","addisababa","algiers","amman","amsterdam","ankara","antananarivo","asmara","astana","athens","baghdad","bangkok","basseterre","beijing","beirut","belgrade","berlin","bern","bloemfontein","bogota","brasilia","bratislava","brazzaville","bridgetown","brussels","bucharest","budapest","buenosaires","cairo","canberra","capetown","caracas","cayenne","cockburn town","conakry","copenhagen","dakar","damascus","dhaka","djibouti","doha","douglas","dublin","dushanbe","freetown","funafuti","gaborone","georgetown","gibraltar","grozny","gustavia","hamilton","hanoi","harare","hargeisa","havana","helsinki","hongkong","honiara","islamabad","jakarta","jamestown","jerusalem","juba","kabul","kathmandu","khartoum","kiev","kingston","kingstown","kualalumpur","kuwaitcity","libreville","lima","lisbon","london","luxembourg","madrid","manila","maputo","marigot","maseru","mexicocity","minsk","mogadishu","monaco","monrovia","montevideo","moscow","muscat","nairobi","nassau","nicosia","oslo","ottawa","paris","philipsburg","phnompenh","plymouth","prague","praia","pretoria","pristina","pyongyang","quito","rabat","ramallah","reykjavik","riga","riyadh","roadtown","rome","roseau","saipan","sanjose","sanjuan","sanmarino","sansalvador","santiago","santodomingo","saotome","sarajevo","seoul","singapore","skopje","sofia","stanley","stockholm","sukhumi","suva","taipei","tallinn","tashkent","tehran","tokyo","tripoli","tunis","vaduz","valletta","vaticancity","victoria","vienna","vientiane","vilnius","warsaw","washington","wellington","windhoek","zagreb"];
TrainingData.car_brands = ["aerocar","albion","alphasports","amarok","americar","amherst","ascort","astonmartin","astra","audi","avallone","beetle","bentley","bianco","buchanan","buffalo","bugatti","bugatti","buick","caddy","cadillac","chalmers","cheetah","chevrolet","chrysler","citroen","corrado","crosslander","dasher","daytona","delahay","delorean","derby","desoto","detroit","dodge","dodge","eagle","eniak","eos","escort","fargo","feresa","fiat","fiesta","focus","ford","ford","fox","frontera","fusion","geronimo","golf","granada","holden","hummer","hyundai","hyundai","jaguar","jeep","kia","lafayette","lamborghini","landrover","lexus","lotus ","lupo","maxwell","mclaren","microcar","mini","nissan","oakland","oldsmobile","peugeot","piedmont ","pioneer","plymouth","pontiac","porsche","prodrive","puma","rainier","ram","ranger","renault","rochester","rockway","rollsroyce","saturn","scripps booth","sheridan","shrike","sierra","statesman","toyota","trabant","tramontana","valiant","vauxhall","venturi","viking","volkswagen","volvo","welch"];
TrainingData.car_parts = ["accessorybelt","adjustablepedal","airbag","airblower","airdam","airduct","airfilter","airintake","airspring","alarm","alternator","alternatorbearing","alternatorbracket","alternatorfan","ammeter","anchor","antennaassembly","antennacable","armrest","axleshaft","babyseat","balljoint","battery","battery","batterybox","batterycable","batteryplate","batterytray","beamaxle","bellhousing","benchseat","bleednipple","boltcap","bonnet","bonnetlatch","boot","bootlatch","bracket","brakebackingpad","brakecoolingduct","brakedisc","brakedrum","brakeducthose","brakefluid","brakelining","brakelining","brakepad","brakepedal","brakepiston","brakepump","brakeroll","brakerotor","brakeservo","brakeshoe","brakewarninglight","bucketseat","bumper","cables","caliper","camshaft","camshaftbearing","camshaftfastener","camshaftfollower","camshaftpushrod","carburetor","carburetor parts","carrierassembly","catalyticconverter","centerconsole","chokecable","clinometer","clutchassembly","clutchcable","clutchdisk","clutchfan","clutchfork","clutchhose","clutchlever","clutchlining","clutchpedal","clutchshoe","clutchspring","coilspring","combinationvalve","connectingrod","connectingrodbolt","connectingrodwasher","controlarm","coolanthose","coolingfan","cotterpin","cowlscreen","crankcase","crankpulley","crankshaft","cylinderhead","dashboard","decal","decklid","dieselengine","differential","distributor","distributor","distributorcap","doorcontact","doorhandle","doorlatch","doorlock","doorswitch","draglink","drivebelt","driveshaft","dynamicseal","dynamometer","engineblock","enginecontrolunit","enginecradle","enginevalve","exhaustgasket","exhaustmanifold","exhaustpipe","exocage","fanbelt","fanblade","fanclutch","fascia","fastener","fastener","fender","flangenut","flywheel","foglight","frameswitch","frontclip","frontfascia","frontspoiler","fuelcap","fuelcell","fuelcooler","fuelfiller","fuelfilter","fuelgauge","fuelhose","fuelinjector","fuelline","fuelpump","fuelrail","fueltank","fueltank","fuse","fusebox","gasket","gear","gearbox","gearcoupling","gearpump","gearring","gearstick","glass","glovecompartment","glowplug","grabhandle","grill","grille","groundstrap","halogen","harmonicbalancer","hatch","headerpanel","headlight","headlightmotor","headrest","heater","heatshield","hexnut","hinge","holddownsprings","hood","hoodlatch","hose","hubcap","hydrometer","idlerarm","idlergear","ignitionbox","ignitioncoil","ignitionmagneto","ignitionswitch","indicatorlight","intakemanifold","interiorlight","kingpin","knuckle","label","licenseplate","mainharness","mastercylinder","meteringvalve","milometer","mirror","mounting","muffler","nameplate","needlebearing","nut","odometer","oilfilter","oilgasket","oilpan","oilpipe","oilpump","oilstrainer","oring","otherbelts","outputshaft","overflowtank","paint","panhardrod","performancechip","performancemonitor","phonemount","pinion","pinionbearing","piston","pitmanarm","poppetvalve","propshaft","pulleypart","quarterpanel","rackend","radiator","radiatorbolt","radiatorgasket","radio","rearspoiler","relayconnector","remotelock","reservoir","resonator","rims","rivet","rocker","rockerarm","rockercover","rollcage","rollerbearing","roofrack","rubber","rubberspring","screw","seatbelt","seatbracket","seatcover","seattrack","shiftcable","shiftfork","shiftimprover","shiftknob","shiftlever","shim","shockabsorber","shoeweb","sidelighting","siren","slavecylinder","sleevebearing","spacerring","sparkingcable","sparkplug","speaker","speedcontroller","speedometer","speedometercable","speedometercalibrator","speedometergear","speedreducer","spidergears","spindle","spiralspring","spoiler","spring","starter","starterdrive","startermotor","startermotor","starterpinion","starterring","startersolenoid","steeringarm","steeringbox","steeringgear","steeringrack","steeringshaft","steeringwheel","strut","stubaxle","subwoofer","sunroof","sunroofmotor","sunvisor","switchcover","switchpanel","tachometer","taillight","tappet","temperaturegauge","thermostat","thermostat","throttlebody","tiebar","tierod","tierodend","timingtape","tire","tirepressuregauge","trailingarm","transaxlehousing","transfercase","transmissioncomputer","transmissiongear","transmissionpan","transmissionspring","transmissionyoke","trap","trimpackage","trunk","trunklatch","tuner","tyre","tyre","universaljoint","vacuumbrakebooster","vacuumgauge","valance","valvecover","valvehousing","valvespring","valvestem seal","voltageregulator","voltmeter","washer","washerhose","waterneck","waterpipe","waterpump","waterpump gasket","watershield","watertank","wheelcylinder","wheelstud","windowmotor","windowregulator","windows","windowseal","windscreen","windshield","wiringconnector","wristpin","controlharness","floorharness","gasolineengine","manometer","petrolengine","wheelbearing"];
TrainingData.chinese_cities = ["aksu","alashankou","altay","anda","anda","andong","anguo","ankang","anlu","anning","anqing","anqiu","anshan","anshun","anyang","aral","artux","arxan","baicheng","baise","baishan","baiyin","baoding","baoji","baoshan","baotou","barkam","bayannur","bazhong","bazhou","beian","beihai","beijing","beiliu","beining","beipiao","beitun","beizhen","bengbu","benxi","bijie","binzhou","bole","botou","bozhou","cangzhou","cenxi","chamdo","changchun","changde","changge","changji","changle","changning","changsha","changshu","changyi","changzhi","changzhou","chaohu","chaoyang","chaozhou","chengde","chengdu","chenzhou","chibi","chifeng","chishui","chizhou","chongqing","chongzhou","chongzuo","chuxiong","chuzhou","cixi","daan","dali","dalian","dandong","dangyang","danjiangkou","danyang","danzhou","daqing","dashiqiao","datong","daxian","daye","dayong","dazhou","dehui","delingha","dengfeng","dengta","dengzhou","dexing","deyang","dezhou","diaobingshan","dihua","dingxi","dingzhou","dongfang","donggang","dongguan","dongning","dongtai","dongxing","dongyang","dongying","dujiangyan","dukou","dunhua","dunhuang","duyun","emeishan","enping","enshi","erenhot","ergun","ezhou","fangchenggang","feicheng","fengcheng","fengcheng","fenghua","fengzhen","fenyang","foshan","fuan","fuding","fujin","fukang","fuqing","fuquan","fushun","fuxin","fuyang","fuyu","fuyuan","fuzhou","fuzhou","gaizhou","ganzhou","gaoan","gaobeidian","gaomi","gaoping","gaoyou","gaozhou","gejiu","genhe","golmud","gongqingcheng","gongyi","gongzhuling","guangan","guanghan","guangshui","guangyuan","guangzhou","guigang","guilin","guiping","guisui","guixi","guiyang","gujiao","guyuan","haicheng","haidong","haikou","hailin","hailun","haimen","haining","haiyang","hami","hancheng","hanchuan","handan","hangzhou","hanzhong","harbin","hebi","hechi","hefei","hegang","heihe","hejian","hejin","helong","hengshui","hengyang","heshan","heshan","heyuan","heze","hezhou","hezuo","hohhot","holingol","hongkong","honghu","hongjiang","hotan","houma","huadian","huaian","huaibei","huaihua","huainan","huaiyin","huanggang","huanghua","huangshan","huangshi","huayin","huaying","huazhou","huixian","huizhou","hulin","huludao","hulunbuir","hunchun","hunjiang","huozhou","huzhou","jiamusi","jian","jian","jiande","jiangmen","jiangshan","jiangyin","jiangyou","jianou","jianyang","jiaohe","jiaozhou","jiaozuo","jiaxing","jiayuguan","jieshou","jiexiu","jieyang","jilin","jimo","jinan","jinchang","jincheng","jingdezhen","jinggangshan","jinghong","jingjiang","jingmen","jingsha","jingxi","jingzhou","jinhua","jining","jinjiang","jinshi","jinxi","jinzhong","jinzhou","jinzhou","jishou","jiujiang","jiuquan","jixi","jiyuan","jurong","kaifeng","kaili","kaiping","kaiyuan","kaiyuan","kangding","karamay","kashgar","khorgas","kokdala","korla","kunming","kunshan","kunyu","kuytun","laibin","laiwu","laixi","laiyang","laizhou","langfang","langzhong","lanxi","lanzhou","laohekou","lechang","leiyang","leizhou","leling","lengshuijiang","leping","leshan","lhasa","lianjiang","lianyuan","lianyungang","lianzhou","liaocheng","liaoyang","liaoyuan","lichuan","lijiang","liling","linan","lincang","linfen","lingbao","linghai","lingwu","lingyuan","linhai","linjiang","linqing","linxia","linxiang","linyi","linzhou","lishui","liupanshui","liuyang","liuzhou","liyang","longhai","longjing","longkou","longnan","longquan","longyan","loudi","luan","lucheng","lufeng","luoding","luohe","luoyang","lushan","lushui","luxi","luzhou","lüda","lüliang","maanshan","macau","macheng","mang","manzhouli","maoming","meihekou","meishan","meixian","meizhou","mengzhou","mengzi","mianyang","mianzhu","mile","miluo","mingguang","mishan","mudanjiang","muling","nanan","nanchang","nanchong","nangong","nanjing","nanning","nanping","nantong","nanxiong","nanyang","nanzheng","nehe","neijiang","ningan","ningbo","ningde","ningguo","nyingchi","ordos","panjin","panshi","panzhihua","penglai","pengzhou","pingdingshan","pingdu","pinghu","pingliang","pingxiang","pingxiang","pizhou","puer","puning","puqi","putian","puyang","qianan","qianjiang","qidong","qingdao","qingtongxia","qingyang","qingyuan","qingzhen","qingzhou","qinhuangdao","qinyang","qinzhou","qionghai","qionglai","qiqihar","qitaihe","qixia","quanzhou","qufu","qujing","quzhou","renhuai","renqiu","rizhao","rongcheng","rugao","ruian","ruichang","ruijin","ruili","rushan","ruzhou","sanhe","sanmenxia","sanming","sansha","sanya","shahe","shanghai","shangluo","shangqiu","shangrao","shangrila","shangzhi","shannan","shantou","shanwei","shaoguan","shaoshan","shaowu","shaoxing","shaoyang","shengzhou","shenyang","shenzhen","shenzhou","shifang","shigatse","shihezi","shijiazhuang","shishi","shishou","shiyan","shizuishan","shouguang","shuanghe","shuangliao","shuangyashan","shulan","shuozhou","sihui","simao","siping","songyuan","songzi","sucheng","suifenhe","suihua","suining","suixi","suizhou","suqian","suzhou","suzhou","tacheng","taian","taicang","taishan","taixing","taiyuan","taizhou","taizhou","tangshan","taonan","tengchong","tengzhou","tianchang","tianjin","tianmen","tianshui","tiefa","tieli","tieling","tiemenguan","tongcheng","tongchuan","tonghua","tongjiang","tongliao","tongling","tongren","tongshi","tongxiang","tumen","tumxuk","turpan","ulanhot","ulanqab","wafangdian","wanning","wanyuan","weifang","weihai","weihaiwei","weihui","weinan","wenchang","wenling","wenzhou","wuan","wuchang","wuchuan","wudalianchi","wugang","wugang","wuhai","wuhan","wuhu","wujiaqu","wusu","wuwei","wuxi","wuxue","wuyishan","wuzhishan","wuzhong","wuzhou","xiamen","xian","xian","xiangcheng","xiangfan","xiangtan","xiangxiang","xiangyang","xianning","xiantao","xianyang","xiaogan","xiaoyi","xichang","xilinhot","xingcheng","xinghua","xingning","xingping","xingshan","xingtai","xingyang","xingyi","xinhailian","xining","xinji","xinle","xinmi","xinmin","xintai","xinxiang","xinyang","xinyi","xinyi","xinyu","xinzheng","xinzhou","xuancheng","xuanwei","xuchang","xuzhou","yaan","yakeshi","yanan","yancheng","yangchun","yangjiang","yangquan","yangzhong","yangzhou","yanji","yanshi","yantai","yibin","yichang","yicheng","yichun","yichun","yidu","yima","yinchuan","yingcheng","yingde","yingkou","yingtan","yining","yiwu","yixing","yiyang","yizheng","yizhou","yongan","yongcheng","yongji","yongkang","yongzhou","yuanjiang","yuanping","yucheng","yueqing","yueyang","yulin","yulin","yumen","yuncheng","yunfu","yushu","yushu","yuxi","yuyao","yuzhou","zaoyang","zaozhuang","zhalantun","zhangjiagang","zhangjiajie","zhangjiakou","zhangping","zhangqiu","zhangshu","zhangye","zhangzhou","zhanjiang","zhaodong","zhaoqing","zhaotong","zhaoyuan","zhengzhou","zhenjiang","zhicheng","zhijiang","zhongshan","zhongwei","zhongxiang","zhoukou","zhoushan","zhuanghe","zhucheng","zhuhai","zhuji","zhumadian","zhuozhou","zhuzhou","zibo","zigong","zixing","ziyang","zoucheng","zunhua","zunyi"];
TrainingData.cities_worldwide = ["abidjan","adana","adelaide","agra","ahmedabad","aleppo","alexandria","algiers","allahabad","almaty","amman","amsterdam","ankara","anqiu","anshan","asansol","asuncion","athens","atlanta","auckland","baghdad","baku","baltimore","bamako","bandung","bangalore","bangkok","baotou","barcelona","barranquilla","bazhong","beijing","beiliu","belgrade","belém","berlin","bhopal","bijie","birmingham ","bogota","bonn","boston","bozhou","brasilia","brisbane","brussels","bucharest","budapest","buenosaires","bursa","busan","cairo","calgary","cali","caloocan","campinas","capetown","caracas","casablanca","changchun","changde","changsha","changshu","changzhou","chelyabinsk","chengdu","chennai","chicago","chifeng","chittagong","chongqing","cixi","coimbatore","colombo","conakry","curitiba","córdoba","daegu","daejeon","dakar","dalian","dallas","damascus","daqing","datong","davao","delhi","dengzhou","denver","detroit","dhaka","dhanbad","dingzhou","dongguan","dongtai","douala","dubai","dublin","durban","edmonton","ekaterinoburg","el-jadida","esfahan","essen","faisalabad","faridabad","fortaleza","fukuoka","fuqing","fushun","fuyang","fès","gaozhou","giza","goiânia","guadalajara","guangzhou","guarulhos","guayaquil","guigang","guiping","guiyang","gujranwala","gwangju","haicheng","hama","hamburg","hanchuan","handan","hangzhou","harare","harbin","havana","hechuan","hefei","heze","hiroshima","homs","hongkong","houston","huaian","huainan","huhehaote","huzhou","hyderabad","hyderabad","hànoi","ibadan","incheon","indore","istanbul","izmir","jabalpur","jaipur","jakarta","jamshedpur","jeddah","jiangdu","jiangjin","jiangyin","jianyang","jilin","jimo","jingzhou","jinjiang","johannesburg","juárez","kabul","kalookan","kalyan","kampala","kano","kanpur","kaohsiung","karachi","karaj","katowice","kawasaki","kayes","kazan","kharkiv","khartoum","kiev","kinshasa","kobe","kochi","kolkata","koulikoro","kualalumpur","kumasi","kunming","kyoto","lagos","lahore","laiwu","leiyang","leizhou","leqing","leshan","león","lianjiang","lima","linyi","lisbon","liuan","liuyang","liuzhou","london","losangeles","luanda","lucknow","ludhiana","lufeng","luoyang","lusaka","luzhou","macheng","madrid","madurai","makasar","makkah","manaus","manchester","manila","maputo","maracaibo","marrakech","mashhad","medan","medellín","meerut","melbourne","mexicocity","miami","mianyang","milan","minneapolis","minsk","mogadishu","monterrey","montevideo","montréal","mopti","moscow","multan","mumbai","münchen","nagoya","nagpur","nairobi","nakuru","nan'an","nanchang","nanchong","nanhai","nanjing","nanning","nanyang","naples","nashik","neijiang","newyork","ningbo","novosibirsk","odessa","omdurman","omsk","osaka","ottawa","ouagadougou","palembang","paris","perth","philadelphia","phnom penh","phoenix","pingdu","pizhou","portoalegre","prague","preston","pune","puning","pyongyang","qidong","qingdao","qiqihaer","quanzhou","quito","rawalpindi","recife","riodejaneiro","riyadh","rizhao","rome","rosario","rotterdam","rugao","ruian","saintpetersburg","saitama","salvador","samara","sanantonio","sandiego","sanfrancisco","sanjuan","santa cruz","santiago","santodomingo","saopaulo","sapporo","seattle","semarang","sendai","seoul","shanghai","shangqiu","shantou","shenyang","shenzhen","shijiazhuang","shiraz","shouguang","shunde","sikasso","singapore","sofia","stockholm","suining","suizhou","surabaya","surat","suzhou","sydney","ségou","tabriz","taian","taichung","taipei","taixing","taiyuan","taizhou","tampa","tangerang","tangshan","tashkent","tbilisi","tehran","tengzhou","thane","tianjin","tianmen","tianshui","tijuana","tokyo","tongzhou","toronto","tripoli","tunis","ulsan","urumqi","vadodara","valencia","vancouver","varanasi","vienna","visakhapatnam","volgograd","warsaw","washington","weifang","wenling","wenzhou","wuhan","wujin","wuxi","wuxian","xian","xiangcheng","xiantao","xiaoshan","xinghua","xintai","xinyang","xishan","xuanwei","xuzhou","yangon ","yantai","yaounde","yerevan","yixing","yiyang","yokohama","yongcheng","yongchuan","yongzhou","yushu","yuzhou","zaoyang","zaozhuang","zhanjiang","zhengzhou","zhongshan","zhongxiang","zhucheng","zhuji","zibo","zigong","ziyang","zoucheng","zürich"];
TrainingData.clothing = ["anorak","bikini","blazer","bloomers","blouse","bra","cape","cardigan","cloak","coat","corset","dress","dungarees","frock","garters","gloves","gown","jacket","jeans","jumper","kilt","kimino","knickers","leggings","leotard","lingerie","longjohns","mackintosh","mittens","negligee","nightgown","nylons","overalls","overcoat","pajamas","pants","petticoat","poncho","raincoat","robe","sari","sarong","scarf","shirt","skirt","skivvy","slacks","socks","stockings","suit","sweater","sweatshirt","tie","trousers","tshirt","tuxedo","underclothes","underpants","undershirt","underwear","uniform","veil","vest","waistcoat"];
TrainingData.cocktails = ["agentorange","alabamaslammer","alexander","alexander","ambermoon","angelface","applemartini","appletini","astropop","aviation","bacardi","bananarita","batida","baybreeze","betweenthesheets","bijou","blackjack","blackrussian","blackvelvet","blenheim","bloodhound","bloodyaztec","bloodymary","blueberrytea","blueblazer","bluehawaii","bluelagoon","bobbyburns","boilermaker","bourbonlancer","bramble","brandysour","brassmonkey","bronx","brooklyn","bucksfizz","bullshot","bumbo","bushwacker","bushwacker","caesar","capecod","caribou","casino","champagnecocktail","chicagococktail","churchill","cojito","colombia","corpsereviver","cosmopolitan","curacaopunch","daiquiri","darkandstorm","delilah","derby","dirtymother","earthquake","fairlady","farnell","fishhousepunch","flamingvolcano","flirtini","fourhorsemen","fourscore","frenchconnection","gibson","gimlet","ginandtonic","ginbuck","ginfizz","ginpahit","ginsour","glowtini","godfather","godmother","goldendoublet","goldendream","goldeneye","gose","grasshopper","greenrussians","greenvesper","greyhound","grog","gunfire","hangmansblood","hankypanky","harrogatenights","havanacooler","hennchata","hifi","horsesneck","hurricane","irishcoffee","jackrose","jagertee","jamaicancoffee","johncollins","joker","juancollins","junglejuice","kamikaze","kangaroo","lastword","lemondrop","limerickey","limerickey","linkup","londonfog","lorraine","mangosour","manhattan","margarita","martini","matador","michelada","mickeyslim","mimosa","missourimule","modernista","mojito","molokoplus","monkeygland","moonwalk","mudslide","negroni","nikolaschka","nixon","oldetonian","oldfashioned","orangetundra","orgasm","painkiller","pallmall","paloma","panama","paradise","paralyzer","pegu","pimmscup","pinkgin","pinklady","piscola","piscosour","piñacolada","planterspunch","porchcrawler","portoflip","redlotus","redrussian","robroy","royalarrival","rubydutchess","rumswizzle","rustynail","sakebomb","saltydog","sangria","sangria","savoyaffair","sazera","sazerac","sazerac","screwdriver","seabreeze","sexonthebeach","shandy","sidecar","singaporesling","skittlebomb","slammerroyale","snakebite","stinger","sundowner","tequilaslammer","tequilasour","tequilasunrise","terry","tipunch","tomcollins","tschunk","tuxedo","vesper","vespermartini","vodkagimlet","vodkamartini","vodkasundowner","vodkasunrise","whiskeysour","whiskymac","whitelady","whiterussian","wolfram","woowoo","yellowbird","yorsh","zombie","zombie","tomandjerry"];
TrainingData.colours = ["amaranth","amber","amethyst","apricot","aquamarine","azure","babyblue","beige","black","blue","bluegreen","blush","bronze","brown","burgundy","byzantium","carmine","cerise","cerulean","champagne","chocolate","cobaltblue","coffee","copper","coral","crimson","cyan","desertsand","electricblue","emerald","erin","gold","gray","green","harlequin","indigo","ivory","jade","junglegreen","lavender","lemon","lilac","lime","magenta","magentarose","maroon","mauve","navyblue","ocher","olive","orange","orchid","peach","pear","periwinkle","persianblue","pink","plum","prussianblue","puce","purple","raspberry","red","redviolet","rose","ruby","salmon","sangria","sapphire","scarlet","silver","slategray","springbud","springgreen","tan","taupe","teal","turquoise","violet","viridian","white","yellow"];
TrainingData.constellations_modern = ["andromeda","antlia","apus","aquarius","aquila","ara","aries","auriga","boötes","caelum","camelopardalis","cancer","canesvenatici","canismajor","canisminor","capricornus","carina","cassiopeia","centaurus","cepheus","cetus","chamaeleon","circinus","columba","coma","corona","corvus","crater","crux","cygnus","delphinus","dorado","draco","equuleus","eridanus","fornax","gemini","grus","hercules","horologium","hydra","hydrus","indus","lacerta","leo","leominor","lepus","libra","lupus","lynx","lyra","mensa","microscopium","monoceros","musca","norma","octans","ophiuchus","orion","pavo","pegasus","perseus","phoenix","pictor","pisces","puppis","pyxis","reticulum","sagitta","sagittarius","scorpius","sculptor","scutum","serpens","sextans","taurus","telescopium","triangulum","tucana","ursamajor","ursaminor","vela","virgo","volans","vulpecula"];
TrainingData.cooking_utensils = ["applecorer","applecutter","baster","biscuitcutter","biscuitpress","blowtorch","boiloverpreventer","bottleopener","bowl","breadknife","browningtray","buttercurler","cakeandpieserver","cheesecloth","cheeseknife","chefsknife","cherrypitter","chinois","chopfork","chopsticks","cleaver","colander","corkscrew","crabcracker","crabcracker","cuttingboard","doughscraper","eggpiercer","eggpoacher","eggseparator","eggslicer","eggtimer","filletknife","fishscaler","fishslice","floursifter","fonduefork","foodmill","fork","funnel","garlicpress","grapefruitknife","grater","gravystrainer","herbchopper","honeydipper","honeydipper","knife","knork","ladle","lame","lemonreamer","lemonsqueezer","lobsterpick","mandoline","matedcolanderpot","measuringcup","measuringspoon","meatgrinder","meattenderiser","meatthermometer","melonballer","mezzaluna","mortarandpestle","nutcracker","nutcracker","nutmeggrater","ovenglove","pastrybag","pastryblender","pastrybrush","pastrywheel","peel","peeler","peppermill","piebird","pizzacutter","pot-holder","potatomasher","potatoricer","poultryshears","rollerdocker","rollingpin","saltshaker","scales","scissors","scoop","sieve","skewer","slottedspoon","spatula","spider","spoon","sporf","spork","sugarthermometer","tamis","tinopener","tomatoknife","tongs","tongs","trongs","trussingneedle","twine","whisk","woodspoon","zester"];
TrainingData.countries = ["afghanistan","africa","albania","algeria","andorra","angola","antigua","arabia","argentina","armenia","ascension","australia","austria","bahamas","bahrain","bangladesh","barbados","belarus","belgium","belize","bermuda","bolivia","bosnia","botswana","brazil","britain","brunei","bulgaria","burundi","cambodia","cameroon","canada","chad","chile","china","china","colombia","congo","costarica","croatia","cuba","cyprus","cyrenaica","czech","denmark","ecuador","egypt","emirates","eritrea","estonia","ethiopia","falklands","finland","france","gambia","georgia","germany","ghana","greece","greenland","grenada","guam","guatemala","guernsey","guinea","guinea","haiti","hongkong","hungary","iceland","india","indonesia","iran","iraq","ireland","israel","italy","jamaica","japan","jordan","kashmir","kenya","korea","kosovo","kurdistan","kuwait","laos","latvia","lebanon","libya","liechtenstein","lithuania","luxembourg","macau","macedonia","madagascar","malaysia","maldives","mali","malta","mexico","micronesia","monaco","mongolia","morocco","mozambique","nepal","netherlands","nicaragua","niger","nigeria","norway","norway","oman","pakistan","palestine","panama","paraguay","peru","philippines","poland","portugal","romania","ross","russia","rwanda","salvador","saudi","serbia","seychelles","singapore","slovakia","slovenia","somalia","spain","sudan","sudan","svalbard","sweden","switzerland","syria","taiwan","taiwan","thailand","timor","tobago","trinidad","tunisia","turkey","turkmenistan","uganda","ukraine","unitedkingdom","uruguay","uzbekistan","vanuatu","vatican","venezuela","vietnam","yemen","zealand","zimbabwe"];
TrainingData.cryptocurrencies = ["achain","adex","aeon","aeternity","agorastokens","aion","airswap","ambrosus","aragon","ardor","ark","asch","atmchain","augur","bancor","binancecoin","bitbay","bitcoin","bitcoincash","bitcoindark","bitcoingold","bitconnect","bitshares","blocknet","blocktix","blockv","byteballbytes","bytecoin","bytom","cardano","centra","chainlink","cindicator","civic","cloakcoin","cobinhood","cofound.it","coindash","counterparty","crown","cryptonex","dash","decentraland","decred","delphy","dent","diamond","digibyte","digixdao","dogecoin","dragonchain","edgeless","eidoo","einsteinium","electroneum","emercoin","enigma","enjincoin","eos","ethereum","ethereumclassic","ethos","factom","faircoin","feathercoin","firstblood","funfair","gamecredits","gas","gnosis","golem","groestlcoin","gulden","gxshares","hive","hshare","humaniq","iconomi","iexecrlc","ink","iocoin","ion","iota","jinn","kin","komodo","kucoinshares","kybernetwork","lbrycredits","lisk","litecoin","loopring","lykke","maidsafecoin","matchpool","melon","mercury","metal","metaverseetp","minexcoin","mobilego","monaco","monacoin","monero","namecoin","navcoin","neblio","nem","neo","nexus","nxt","omisego","opentrading","particl","paypex","paypie","peercoin","pepecash","pillar","pivx","populous","potcoin","powerledger","pura","qash","qtum","quantstamp","quantumresis","raiblocks","rchain","reddcoin","requestnetwork","revain","ripiocredit","ripple","rise","safeexchange","salt","siacoin","sibcoin","singulardtv","skycoin","smartcash","sonm","status","steem","steemdollars","stellar","storj","stratis","streamrdatacoin","substratum","syscoin","tenx","tether","tierion","timenewbank","tron","ubiq","vechain","verge","veritaseum","vertcoin","viacoin","voxels","wabi","walton","waves","whitecoin","wings","xp","xtrabytes","yoyow","zcash","zcoin","zencash"];
TrainingData.currencies = ["afghani","angolar","argentino","austral","baht","bitcoin","boliviano","bolívar","colón","cupon","córdoba","dime","dinar","diner","dinero","dinheiro","dirham","dobra","dollar","drachma","dram","escudo","euro","fanam","fiorino","florin","forint","franc","franco","frange","frank","genevoise","gineih","gourde","grosz","guaraní","guilder","gulden","hryvnia","hwan","inca","karbovanets","keping","kolion","kori","korona","koruna","koruuni","krona","krone","kronenthaler","kroon","króna","kuna","kwanza","kyat","laari","leone","leu","lev","libra","lira","litas","livre","loti","manat","mark","marka","markka","metica","metical","mohar","mon","mun","newpence","ostmark","ostruble","paisa","peseta","peso","phoenix","piastra","piastre","pitis","pound","quetzal","rand","reaal","real","real","reichsmark","reichsthaler","renminbi","rentenmark","rial","riel","rigsdaler","rijksdaalder","riksdaler","ringgit","rixdollar","riyal","riyal","roepiah","ruble","rupee","rupiah","rupie","ryō","schilling","scudo","setu","shekel","shilling","skender","sol","som","somalo","somoni","speciedaler","speciethaler","sucre","tenge","thaler","tradedollar","vatu","venezolano","vereinsthaler","won","wén","yang","yen","yuan","złoty","đồng"];
TrainingData.dance_styles = ["acrodance","affranchi","allemande","bagurumba","balboa","ballet","ballroom","barndance","baroquedance","basquedance","bassadanse","bellydance","blues","bollywooddance","bomba","boogaloo","boogie","boogiewoogie","bop","bossanova","boston","breakaway","breakdancing","bunnyhop","butterflydance","cajundance","cajunjig","cajunwaltz","cakewalk","calypso","cancan","candledance","castlewalk","chacarer","chach","chickendance","chumba","circledance","clogdance","clowning","clubdance","concertdance","conga","contemporarydance","contradance","cossackdance","cotillion","countrydance","courtdance","cripwalk","cupidshuffle","discodance","dragondance","drobushki","electricslide","electrodance","eroticdance","ethnicdance","fandance","fandango","firedance","flamenco","folkdance","formationdance","foxtrot","freakdancing","freestyledance","handjive","harddance","harlemshake","headbanging","highlanddancing","hiphopdance","historicaldance","hokeypokey","hornpipe","housedance","huladance","icedancing","irishdance","jazzdance","jitterbug","jivedance","lambethwalk","lapdance","latindance","limbo","linedance","liondance","lyricaldance","macarena","mambo","marimba","maypoledance","medievaldance","metalmosh","moderndance","modernjive","mollydance","moonwalker","morrisdance","neonstyle","parasoldance","partnerdance","persiandance","pogodance","poledancing","quickstep ","raindancing","reggaedance","renaissancedance","rhumba","robotdance","salsa","samba","sambadance","setdance","shake","shimmy","shimsham","shuffle","skadance","skipjive","slowdance","slowwaltz","snapdance","socialdance","stagediving","stepdance","stilettodance","streetdance","swing","tango","tapdance","troika","twerking","twist","twostep","vintagedance","westernswing","worshipdance","zumba"];
TrainingData.data_structures = ["abstractsyntaxtree","adjacencylist","adjacencymatrix","alist","andortree","array","array","arraylist","associativearray","beap","bin","binarydecisiondiagram","binaryheap","binarysearchtree","binarytree","binomialheap","bitarray","bitboard","bitfield","bitmap","bloomfilter","boolean","boundingintervalhierarchy","brodalqueue","bsharptree","btree","cartesiantree","character","circularbuffer","conctreelist","container","controltable","covertree","ctrie","ctrie","cuttree","dancingtree","decisiontree","differencelist","directedacyclicgraph","directedgraph","distributedhashtable","dopevector","double","doubleendedqueue","doublehashing","doublyconnectededgelist","doublylinkedlist","dynamicarray","dynamicperfecthashtable","enfilade","expectiminimaxtree","exponentialtree","expressiontree","fenwicktree","fibonacciheap","fingertree","float","freelist","fusiontree","fusiontree","gapbuffer","graph","graph","graphstructuredstack","hasharraymappedtrie","hashedarraytree","hashlist","hashtable","hashtree","hashtrie","heap","heightmap","hilberttree","hypergraph","iliffevector","image","integer","intervaltree","judyarray","karytree","kdtree","koorde","leftistheap","lightmap","linearoctree","linkedlist","linktree","list","lookuptable","matrix","merkletree","metrictree","minhash","minimaxtree","multigraph","multimap","multiset","octree","orderstatistictree","pagoda","pairingheap","parallelarray","parsetree","prefixhashtree","priorityqueue","quadedge","quadtree","queap","queue","quotientfilter","radixtree","randomizedbinarysearchtree","rangetree","record","redblacktree","rollinghash","rope","rosetree","routingtable","rtree","scapegoattree","scenegraph","segmenttree","set","skewheap","skiplist","softheap","sortedarray","spaghettistack","sparsearray","sparsematrix","splaytree","stack","suffixarray","suffixtree","symboltable","taggedunion","tangotree","ternaryheap","ternarytree","threadedbinarytree","toptree","treap","treap","tree","tree","trie","union","unrolledlinkedlist","variablelengtharray","vlist","weakheap","weightbalancedtree","wingededge","xorlinkedlist","xtree","zipper"];
TrainingData.dinosaurs = ["aachenosaurus","aardonyx","abdallahsaurus","abelisaurus","abrictosaurus","abrosaurus","abydosaurus","acanthopholis","achelousaurus","acheroraptor","achillesaurus","achillobator","acristavus","acrocanthosaurus","acrotholus","actiosaurus","adamantisaurus","adasaurus","adelolophus","adeopapposaurus","aegyptosaurus","aeolosaurus","aepisaurus","aerosteon","aetonyx","afrovenator","agathaumas","aggiosaurus","agilisaurus","agnosphitys","agrosaurus","agujaceratops","agustinia","ahshislepelta","ajancingenia","ajkaceratops","alamosaurus","alaskacephale","albalophosaurus","albertaceratops","albertadromeus","albertonykus","albertosaurus","albinykus","albisaurus","alcovasaurus","alectrosaurus","aletopelta","algoasaurus","alioramus","aliwalia","allosaurus","alnashetri","alocodon","altirhinus","altispinax","alvarezsaurus","alwalkeria","alxasaurus","amargasaurus","amargastegos","amargatitanis","amazonsaurus","ammosaurus","ampelosaurus","amphicoelias","amphicoelicaudia","amphisaurus","amtocephale","amtosaurus","amurosaurus","amygdalodon","anabisetia","anasazisaurus","anatosaurus","anatotitan","anchiceratops","anchiornis","anchisaurus","andesaurus","andhrasaurus","angaturama","angloposeidon","angolatitan","angulomastacator","aniksosaurus","animantarx","ankistrodon","ankylosaurus","anodontosaurus","anoplosaurus","anserimimus","antarctopelta","antarctosaurus","antetonitrus","anthodon","antrodemus","anzu","aorun","apatodon","apatoraptor","apatosaurus","appalachiosaurus","aquilops","aragosaurus","aralosaurus","araucanoraptor","archaeoceratops","archaeodontosaurus","archaeopteryx","archaeoraptor","archaeornis","archaeornithoides","archaeornithomimus","arcovenator","arctosaurus","arcusaurus","arenysaurus","argentinosaurus","argyrosaurus","aristosaurus","aristosuchus","arizonasaurus","arkansaurus","arkharavia","arrhinoceratops","arstanosaurus","asiaceratops","asiamericana","asiatosaurus","astrodon","astrodonius","astrodontaurus","astrophocaudia","asylosaurus","atacamatitan","atlantosaurus","atlasaurus","atlascopcosaurus","atopodentatus","atrociraptor","atsinganosaurus","aublysodon","aucasaurus","augustia","augustynolophus","auroraceratops","aurornis","australodocus","australovenator","austrocheirus","austroraptor","austrosaurus","avaceratops","avalonia","avalonianus","aviatyrannis","avimimus","avipes","azendohsaurus","bactrosaurus","bagaceratops","bagaraatan","bahariasaurus","bainoceratops","bakesaurus","balaur","balochisaurus","bambiraptor","banji","baotianmansaurus","barapasaurus","barilium","barosaurus","barrosasaurus","barsboldia","baryonyx","bashunosaurus","basutodon","bathygnathus","batyrosaurus","baurutitan","bayosaurus","becklespinax","beelemodon","beipiaosaurus","beishanlong","bellusaurus","belodon","berberosaurus","betasuchus","bicentenaria","bienosaurus","bihariosaurus","bilbeyhallorum","bissektipelta","bistahieversor","blancocerosaurus","blasisaurus","blikanasaurus","bolong","bonapartenykus","bonatitan","bonitasaura","borealosaurus","boreonykus","borogovia","bothriospondylus","brachiosaurus","brachyceratops","brachylophosaurus","brachypodosaurus","brachyrophus","brachytaenius","brachytrachelopan","bradycneme","brasileosaurus","brasilotitan","bravoceratops","breviceratops","brohisaurus","brontomerus","brontoraptor","brontosaurus","bruhathkayosaurus","bugenasaura","buitreraptor","byranjaffia","byronosaurus","caenagnathasia","caenagnathus","calamosaurus","calamospondylus","calamospondylus","callovosaurus","camarasaurus","camarillasaurus","camelotia","camposaurus","camptonotus","camptosaurus","campylodon","campylodoniscus","canardia","capitalsaurus","carcharodontosaurus","cardiodon","carnotaurus","caseosaurus","cathartesaura","cathetosaurus","caudipteryx","caudocoelus","caulodon","cedarosaurus","cedarpelta","cedrorestes","centemodon","centrosaurus","cerasinops","ceratonykus","ceratops","ceratosaurus","cetiosauriscus","cetiosaurus","changchunsaurus","changdusaurus","changyuraptor","chaoyangsaurus","charonosaurus","chasmosaurus","chassternbergia","chebsaurus","cheneosaurus","chialingosaurus","chiayusaurus","chienkosaurus","chilantaisaurus","chilesaurus","chindesaurus","chingkankousaurus","chinshakiangosaurus","chirostenotes","chondrosteosaurus","chromogisaurus","chuandongocoelurus","chuanjiesaurus","chuanqilong","chubutisaurus","chungkingosaurus","chuxiongosaurus","cinizasaurus","cionodon","citipati","cladeiodon","claorhynchus","claosaurus","clarencea","clasmodosaurus","clepsysaurus","coahuilaceratops","coelophysis","coelosaurus","coeluroides","coelurosauravus","coelurus","colepiocephale","coloradia","coloradisaurus","colossosaurus","comahuesaurus","comanchesaurus","compsognathus","compsosuchus","concavenator","conchoraptor","condorraptor","coronosaurus","corythosaurus","craspedodon","crataeomus","craterosaurus","creosaurus","crichtonpelta","crichtonsaurus","cristatusaurus","crosbysaurus","cruxicheiros","cryolophosaurus","cryptodraco","cryptoraptor","cryptosaurus","cryptovolans","cumnoria","daanosaurus","dacentrurus","dachongosaurus","daemonosaurus","dahalokely","dakosaurus","dakotadon","dakotaraptor","damalasaurus","dandakosaurus","danubiosaurus","daptosaurus","darwinsaurus","dashanpusaurus","daspletosaurus","dasygnathoides","dasygnathus","datanglong","datonglong","datousaurus","daurosaurus","daxiatitan","deinocheirus","deinodon","deinonychus","delapparentia","deltadromeus","demandasaurus","denversaurus","deuterosaurus","diabloceratops","diamantinasaurus","dianchungosaurus","diceratops","diceratus","diclonius","dicraeosaurus","didanodon","dilong","dilophosaurus","dimodosaurus","dinheirosaurus","dinodocus","dinosaurus","dinotyrannus","diplodocus","diplotomodon","diracodon","dolichosuchus","dollodon","domeykosaurus","dongbeititan","dongyangopelta","dongyangosaurus","doratodon","doryphorosaurus","draconyx","dracopelta","dracoraptor","deinonychusskeleton","dracorex","dracovenator","dravidosaurus","dreadnoughtus","drinker","dromaeosauroides","dromaeosaurus","dromiceiomimus","dromicosaurus","drusilasaura","dryosaurus","dryptosauroides","dryptosaurus","dubreuillosaurus","duriatitan","duriavenator","dynamosaurus","dyoplosaurus","dysalotosaurus","dysganus","dyslocosaurus","dystrophaeus","dystylosaurus","echinodon","edmarka","edmontonia","edmontosaurus","efraasia","einiosaurus","ekrixinatosaurus","elachistosuchus","elaltitan","elaphrosaurus","elmisaurus","elopteryx","elosaurus","elrhazosaurus","elvisaurus","emausaurus","embasaurus","enigmosaurus","eoabelisaurus","eobrontosaurus","eocarcharia","eoceratops","eocursor","eodromaeus","eohadrosaurus","eolambia","eomamenchisaurus","eoplophysis","eoraptor","eosinopteryx","eotrachodon","eotriceratops","eotyrannus","eousdryosaurus","epachthosaurus","epanterias","ephoenosaurus","epicampodon","epichirostenotes","epidendrosaurus","epidexipteryx","equijubus","erectopus","erketu","erliansaurus","erlikosaurus","eshanosaurus","euacanthus","eucamerotus","eucentrosaurus","eucercosaurus","eucnemesaurus","eucoelophysis","eugongbusaurus","euhelopus","euoplocephalus","eupodosaurus","eureodon","eurolimnornis","euronychodon","europasaurus","europelta","euskelosaurus","eustreptospondylus","fabrosaurus","falcarius","fenestrosaurus","ferganasaurus","ferganastegos","ferganocephale","fosterovenator","frenguellisaurus","fruitadens","fukuiraptor","fukuisaurus","fukuivenator","fukuititan","fulengia","fulgurotherium","fusinasus","fusuisaurus","futabasaurus","futalognkosaurus","gadolosaurus","galeamopus","galesaurus","gallimimus","galtonia","galveosaurus","galvesaurus","gannansaurus","gansutitan","ganzhousaurus","gargoyleosaurus","garudimimus","gasosaurus","gasparinisaura","gastonia","gavinosaurus","geminiraptor","genusaurus","genyodectes","geranosaurus","gideonmantellia","giganotosaurus","gigantoraptor","gigantoscelus","gigantspinosaurus","gilmoreosaurus","ginnareemimus","giraffatitan","glacialisaurus","glishades","glyptodontopelta","gobiceratops","gobisaurus","gobititan","gobivenator","godzillasaurus","gojirasaurus","gondwanatitan","gongbusaurus","gongpoquansaurus","gongxianosaurus","gorgosaurus","goyocephale","graciliceratops","graciliraptor","gracilisuchus","gravitholus","gresslyosaurus","griphornis","griphosaurus","gryphoceratops","gryponyx","gryposaurus","guaibasaurus","guanlong","gwyneddosaurus","gyposaurus","hadrosauravus","hadrosaurus","haestasaurus","hagryphus","hallopus","halticosaurus","hanssuesia","hanwulosaurus","haplocanthosaurus","haplocanthus","haplocheirus","harpymimus","haya","hecatasaurus","heilongjiangosaurus","heishansaurus","helioceratops","helopus","heptasteornis","herbstosaurus","herrerasaurus","hesperonychus","hesperosaurus","heterodontosaurus","heterosaurus","hexing","hexinlusaurus","heyuannia","hierosaurus","hippodraco","hironosaurus","hisanohamasaurus","histriasaurus","homalocephale","honghesaurus","hongshanosaurus","hoplitosaurus","hoplosaurus","horshamosaurus","hortalotarsus","huabeisaurus","hualianceratops","huanansaurus","huanghetitan","huangshanlong","huaxiagnathus","huaxiaosaurus","huaxiasaurus","huayangosaurus","hudiesaurus","huehuecanauhtlus","hulsanpes","hungarosaurus","huxleysaurus","hylaeosaurus","hylosaurus","hypacrosaurus","hypselorhachis","hypselosaurus","hypselospinus","hypsibema","hypsilophodon","hypsirophus","ichabodcraniosaurus","ichthyovenator","ignavusaurus","iguanacolossus","iguanodon","iguanoides","iguanosaurus","iliosuchus","ilokelesia","incisivosaurus","indosaurus","indosuchus","ingenia","inosaurus","irritator","isanosaurus","ischioceratops","ischisaurus","ischyrosaurus","isisaurus","issasaurus","itemirus","iuticosaurus","jainosaurus","jaklapallisaurus","janenschia","jaxartosaurus","jeholosaurus","jenghizkhan","jensenosaurus","jeyawati","jianchangosaurus","jiangjunmiaosaurus","jiangjunosaurus","jiangshanosaurus","jiangxisaurus","jinfengopteryx","jingshanosaurus","jintasaurus","jinzhousaurus","jiutaisaurus","jobaria","jubbulpuria","judiceratops","jurapteryx","jurassosaurus","juratyrant","juravenator","kaatedocus","kagasaurus","kaijiangosaurus","kakuru","kangnasaurus","karongasaurus","katepensaurus","katsuyamasaurus","kayentavenator","kazaklambia","kelmayisaurus","kemkemia","kentrosaurus","kentrurosaurus","kerberosaurus","khaan","khetranisaurus","kileskus","kinnareemimus","kitadanisaurus","kittysaurus","klamelisaurus","kol","koparion","koreaceratops","koshisaurus","kosmoceratops","kotasaurus","koutalisaurus","kritosaurus","kryptops","krzyzanowskisaurus","kukufeldia","kulceratops","kulindadromeus","kulindapteryx","kunbarrasaurus","kundurosaurus","kunmingosaurus","kuszholia","labocania","labrosaurus","laelaps","laevisuchus","lagerpeton","lagosuchus","lamaceratops","lambeosaurus","lametasaurus","lamplughsaura","lanasaurus","lancangosaurus","lancanjiangosaurus","lanzhousaurus","laosaurus","lapampasaurus","laplatasaurus","lapparentosaurus","laquintasaura","latirhinus","leaellynasaura","leinkupal","leipsanosaurus","lengosaurus","leonerasaurus","lepidocheirosaurus","lepidus","leptoceratops","leptorhynchos","leptospondylus","leshansaurus","lesothosaurus","lessemsaurus","levnesovia","lewisuchus","lexovisaurus","leyesaurus","liaoceratops","liaoningosaurus","libycosaurus","ligabueino","ligabuesaurus","ligomasaurus","likhoelesaurus","liliensternus","limaysaurus","limnornis","limnosaurus","limusaurus","linhenykus","linheraptor","linhevenator","lirainosaurus","lisboasaurus","liubangosaurus","loncosaurus","longisquama","longosaurus","lophorhothon","lophostropheus","loricatosaurus","loricosaurus","losillasaurus","lourinhanosaurus","lourinhasaurus","luanchuanraptor","luanpingosaurus","lucianosaurus","lufengosaurus","lukousaurus","luoyanggia","lurdusaurus","lusitanosaurus","lusotitan","lycorhinus","lythronax","macelognathus","machairasaurus","macrodontophion","macrogryphosaurus","macrophalangia","macroscelosaurus","macrurosaurus","madsenius","magnapaulia","magnirostris","magnosaurus","magulodon","magyarosaurus","mahakala","maiasaura","majungasaurus","majungatholus","malarguesaurus","malawisaurus","maleevosaurus","maleevus","mamenchisaurus","manidens","mandschurosaurus","manospondylus","mantellisaurus","mantellodon","mapusaurus","marasuchus","marisaurus","marmarospondylus","marshosaurus","martharaptor","masiakasaurus","massospondylus","maxakalisaurus","medusaceratops","megacervixosaurus","megadactylus","megadontosaurus","megalosaurus","megapnosaurus","megaraptor","melanorosaurus","mendozasaurus","mercuriceratops","meroktenos","metriacanthosaurus","microcephale","microceratops","microceratus","microcoelus","microdontosaurus","microhadrosaurus","micropachycephalosaurus","microraptor","microvenator","mifunesaurus","minmi","minotaurasaurus","miragaia","mirischia","moabosaurus","mochlodon","mohammadisaurus","mojoceratops","mongolosaurus","monkonosaurus","monoclonius","monolophosaurus","mononychus","mononykus","montanoceratops","morelladon","morinosaurus","morosaurus","morrosaurus","mosaiceratops","moshisaurus","mtapaiasaurus","mtotosaurus","mussaurus","muttaburrasaurus","muyelensaurus","mymoorapelta","naashoibitosaurus","nambalia","nankangia","nanningosaurus","nanosaurus","nanotyrannus","nanshiungosaurus","nanuqsaurus","nanyangosaurus","narambuenatitan","nasutoceratops","natronasaurus","nebulasaurus","nectosaurus","nedcolbertia","nedoceratops","neimongosaurus","nemegtia","nemegtomaia","nemegtosaurus","neosaurus","neosodon","neovenator","neuquenraptor","neuquensaurus","newtonsaurus","ngexisaurus","nigersaurus","ningyuansaurus","niobrarasaurus","nipponosaurus","noasaurus","nodocephalosaurus","nodosaurus","nomingia","nopcsaspondylus","normanniasaurus","nothronychus","notoceratops","notocolossus","notohypsilophodon","nqwebasaurus","nteregosaurus","nurosaurus","nuthetes","nyasasaurus","nyororosaurus","ojoceratops","ojoraptorsaurus","oligosaurus","olorotitan","omeisaurus","omosaurus","onychosaurus","oohkotokia","opisthocoelicaudia","oplosaurus","orcomimus","orinosaurus","orkoraptor","ornatotholus","ornithodesmus","ornithoides","ornitholestes","ornithomerus","ornithomimoides","ornithomimus","ornithopsis","ornithosuchus","ornithotarsus","orodromeus","orosaurus","orthogoniosaurus","orthomerus","oryctodromeus","oshanosaurus","osmakasaurus","ostafrikasaurus","othnielia","othnielosaurus","otogosaurus","ouranosaurus","overosaurus","oviraptor","ovoraptor","owenodon","oxalaia","ozraptor","pachycephalosaurus","pachyrhinosaurus","pachysauriscus","pachysaurops","pachysaurus","pachyspondylus","pachysuchus","padillasaurus","pakisaurus","palaeoctonus","palaeocursornis","palaeolimnornis","palaeopteryx","palaeosauriscus","palaeoscincus","paleosaurus","paludititan","paluxysaurus","pampadromaeus","pamparaptor","panamericansaurus","panguraptor","panoplosaurus","panphagia","pantydraco","paraiguanodon","paralititan","paranthodon","pararhabdodon","parasaurolophus","pareiasaurus","parksosaurus","paronychodon","parrosaurus","parvicursor","patagonykus","patagosaurus","pawpawsaurus","pectinodon","pedopenna","pegomastax","peishansaurus","pekinosaurus","pelecanimimus","pellegrinisaurus","peloroplites","pelorosaurus","peltosaurus","penelopognathus","pentaceratops","petrobrasaurus","phaedrolosaurus","philovenator","phuwiangosaurus","phyllodon","piatnitzkysaurus","picrodon","pinacosaurus","pisanosaurus","pitekunsaurus","piveteausaurus","planicoxa","plateosauravus","plateosaurus","platyceratops","plesiohadros","pleurocoelus","pleuropeltus","pneumatoarthrus","pneumatoraptor","podokesaurus","poekilopleuron","polacanthoides","polacanthus","polyodontosaurus","polyonax","ponerosteus","poposaurus","postosuchus","pradhania","prenocephale","prenoceratops","priconodon","priodontognathus","probrachylophosaurus","probactrosaurus","proceratops","proceratosaurus","procheneosaurus","procompsognathus","prodeinodon","proiguanodon","propanoplosaurus","proplanicoxa","prosaurolophus","protarchaeopteryx","protecovasaurus","protiguanodon","protoavis","protoceratops","protognathosaurus","protognathus","protohadros","protrachodon","proyandusaurus","pseudolagosuchus","psittacosaurus","pteropelyx","pterospondylus","puertasaurus","pukyongosaurus","pulanesaura","pycnonemosaurus","pyroraptor","qantassaurus","qianzhousaurus","qiaowanlong","qijianglong","qinlingosaurus","qingxiusaurus","qiupalong","quaesitosaurus","quetecsaurus","quilmesaurus","rachitrema","rahiolisaurus","rahona","rahonavis","rajasaurus","rapator","rapetosaurus","raptorex","ratchasimasaurus","rayososaurus","razanandrongobe","rebbachisaurus","regaliceratops","regnosaurus","revueltosaurus","rhabdodon","rhadinosaurus","rhinorex","rhodanosaurus","rhoetosaurus","rhopalodon","riabininohadros","richardoestesia","rileya","rileyasuchus","rinchenia","rinconsaurus","rioarribasaurus","riodevasaurus","riojasaurus","riojasuchus","rocasaurus","roccosaurus","rubeosaurus","rukwatitan","ruyangosaurus","sacisaurus","sahaliyania","saichania","saldamosaurus","salimosaurus","saltasaurus","saltopus","saltriosaurus","sanchusaurus","sangonghesaurus","sanjuansaurus","sanpasaurus","santanaraptor","sarahsaurus","sarcolestes","sarcosaurus","sarmientosaurus","saturnalia","sauraechinodon","saurolophus","sauroniops","sauropelta","saurophaganax","saurophagus","sauroplites","sauroposeidon","saurornithoides","saurornitholestes","scansoriopteryx","scaphonyx","scelidosaurus","scipionyx","sciurumimus","scleromochlus","scolosaurus","scutellosaurus","secernosaurus","sefapanosaurus","segisaurus","segnosaurus","seismosaurus","seitaad","selimanosaurus","sellacoxa","sellosaurus","serendipaceratops","shamosaurus","shanshanosaurus","shantungosaurus","shanxia","shanyangosaurus","shaochilong","shenzhousaurus","shidaisaurus","shixinggia","shuangmiaosaurus","shunosaurus","shuvosaurus","shuvuuia","siamodon","siamodracon","siamosaurus","siamotyrannus","sibirosaurus","sigilmassasaurus","silesaurus","siluosaurus","silvisaurus","similicaudipteryx","sinocalliopteryx","sinoceratops","sinocoelurus","sinopeltosaurus","sinornithoides","sinornithomimus","sinornithosaurus","sinosauropteryx","sinosaurus","sinotyrannus","sinovenator","sinraptor","sinusonasus","sirindhorna","skorpiovenator","smilodon","sonidosaurus","sonorasaurus","sphaerotholus","sphenosaurus","sphenospondylus","spinophorosaurus","spinops","spinosaurus","spinostropheus","spinosuchus","spondylosoma","squalodon","staurikosaurus","stegoceras","stegopelta","stegosaurides","stegosaurus","stenonychosaurus","stenopelix","stenotholus","stephanosaurus","stereocephalus","sterrholophus","stokesosaurus","stormbergia","strenusaurus","streptospondylus","struthiomimus","struthiosaurus","stygimoloch","stygivenator","styracosaurus","succinodon","suchomimus","suchosaurus","suchoprion","sugiyamasaurus","skeletonofsuchomimus","sulaimanisaurus","supersaurus","suuwassea","suzhousaurus","symphyrophus","syngonosaurus","syntarsus","syrmosaurus","szechuanosaurus","tachiraptor","talarurus","talenkauen","tambatitanis","tangvayosaurus","tanius","tanycolagreus","tanystropheus","tanystrosuchus","taohelong","tapinocephalus","tapuiasaurus","tarascosaurus","tarbosaurus","tarchia","tastavinsaurus","tatankacephalus","tatankaceratops","tataouinea","tatisaurus","taveirosaurus","tawasaurus","tazoudasaurus","technosaurus","tecovasaurus","tehuelchesaurus","teinurosaurus","teleocrater","telmatosaurus","tenantosaurus","tenchisaurus","tendaguria","tenontosaurus","teratophoneus","teratosaurus","termatosaurus","tethyshadros","tetragonosaurus","texacephale","texasetes","teyuwasu","thecocoelurus","thecodontosaurus","thecospondylus","theiophytalia","therizinosaurus","therosaurus","thescelosaurus","thespesius","thotobolosaurus","tianchisaurus","tianchungosaurus","tianyulong","tianyuraptor","tianzhenosaurus","tichosteus","tienshanosaurus","timimus","timurlengia","titanoceratops","tochisaurus","tomodon","tonganosaurus","tonouchisaurus","torilion","tornieria","torosaurus","torvosaurus","tototlmimus","trachodon","traukutitan","trialestes","triassolestes","tribelesodon","triceratops","trigonosaurus","trimucrodon","trinisaura","troodon","tsaagan","tsagantegia","tsintaosaurus","tsuchikurasaurus","tugulusaurus","tuojiangosaurus","turanoceratops","turiasaurus","tylocephale","tylosteus","tyrannosaurus","tyrannotitan","uberabatitan","udanoceratops","ugrosaurus","ugrunaaluk","uintasaurus","ultrasauros","umarsaurus","unaysaurus","unenlagia","unescoceratops","unicerosaurus","unquillosaurus","urbacodon","utahceratops","utahraptor","uteodon","vagaceratops","vahiny","valdoraptor","valdosaurus","variraptor","vectensia","vectisaurus","velafrons","velocipes","velociraptor","velocisaurus","venaticosuchus","venenosaurus","veterupristisaurus","viavenator","vitakridrinda","vitakrisaurus","volkheimeria","vulcanodon","wadhurstia","wakinosaurus","walgettosuchus","walkeria","walkersaurus","wangonisaurus","wannanosaurus","wellnhoferia","wendiceratops","willinakaqe","wintonotitan","wuerhosaurus","wulagasaurus","wulatelong","wyleyia","wyomingraptor","xenoceratops","xenoposeidon","xenotarsosaurus","xianshanosaurus","xiaosaurus","xiaotingia","xinjiangovenator","xinjiangtitan","xiongguanlong","xixianykus","xixiasaurus","xixiposaurus","xuanhanosaurus","xuanhuaceratops","xuanhuasaurus","xuwulong","yaleosaurus","yamaceratops","yandusaurus","yangchuanosaurus","yaverlandia","yezosaurus","yibinosaurus","yimenosaurus","yingshanosaurus","yinlong","yixianosaurus","yizhousaurus","yongjinglong","yuanmouraptor","yuanmousaurus","yueosaurus","yulong","yunganglong","yunnanosaurus","yunxianosaurus","yurgovuchia","yutyrannus","zalmoxes","zanabazar","zanclodon","zapalasaurus","zapsalis","zaraapelta","zatomus","zephyrosaurus","zhanghenglong","zhejiangosaurus","zhenyuanlong","zhongornis","zhongyuansaurus","zhuchengceratops","zhuchengosaurus","zhuchengtyrannus","ziapelta","zigongosaurus","zizhongosaurus","zuniceratops","zuolong","zuoyunlong","zupaysaurus"];
TrainingData.diseases = ["abscess","anotia","anthrax","appendicitis","apraxia","argyria","arthritis","asthenia","asthma","astigmatism","atherosclerosis","athetosis","atrophy","beriberi","botulism","bronchitis","brucellosis","bubonic plague","bunion","calculi","cancer","candidiasis","chalazion","chancroid","chavia","cherubism","chickenpox","chlamydia","cholera","chordoma","chorea","coccidioidomycosis","cold","colitis","condyloma","cowpox","cretinism","dehydration","dengue","diabetes","diphtheria","dysentery","ebola","emphysema","encephalitis","epilepsy","fibromyalgia","gangrene","gastroenteritis","goitre","gonorrhea","hepatitis","hypermetropia","hyperopia","hyperthyroidism","hypothyroid","hypotonia","impetigo","infertility","influenza","iritis","jaundice","keloids","kuru","laryngitis","legionellosis","leishmaniasis","leprosy","leptospirosis","leukemia","lice","listeriosis","loiasis","lymphoma","malaria","measles","melanoma","meningitis","migraine","mononucleosis","mumps","myelitis","myoclonus","myopia","myxedema","neoplasm","nightblindness","obesity","osteoarthritis","osteoporosis","otitis","peritonitis","pertussis","phenylketonuria","pilia","plague","pneumonia","poliomyelitis","porphyria","progeria","prostatitis","psittacosis","psoriasis","rabies","rheumatism","rickets","rubella","salmonellosis","scabies","schizophrenia","sciatica","scleroderma","scrapie","scurvy","sepsis","septicemia","shigellosis","shingles","siderosis","silicosis","smallpox","strabismus","strepthroat","swineflu","synovitis","syphilis","taeniasis","teratoma","tetanus","thalassaemia","thrush","thymoma","tinnitus","tonsillitis","trichinosis","trichomoniasis","trisomy","tuberculosis","tularemia","tumor","tungiasis","typhus","ulcers","uremia","urticaria","uveitis","varicella","vitiligo","warts","watkins","yersiniosis"];
TrainingData.dog_names = ["ace","apollo","argos","astro","bailey","balto","bandit","banga","banjo","baxter","bear","beau","benjy","biscuit","blue","bo","bobbie","bone","bonzo","boomer","bouncer","bowser","brady","brody","bruno","brutus","bubba","buck","buddy","bullet","bullseye","buster","cash","champ","champ","chance","charlie","chase","chester","chico","chip","chips","clifford","coco","cody","comet","cookie","cooper","copper","cujo","dakota","dash","dexter","diesel","digby","dingo","duke","einstein","elvis","fang","fearless","fido","fifi","finn","fluffy","frankie","gander","garm","george","gidget","gizmo","gunner","gus","hachi","hank","harley","henry","hooch","hunter","jack","jackson","jake","jasper","jax","joey","jump","king","kirby","kobe","laci","lady","laika","lassi","lassie","leo","loki","louie","lucca","lucky","lucy","luke","mac","marley","max","mickey","milo","moose","murphy","mutt","nash","oliver","ollie","oreo","oscar","otis","paddington","peanut","pepper","prince","rags","rascal","rex","rex","ribsy","riley","rocco","rocky","romeo","roscoe","rover","rowlf","rudy","rufus","rusty","sam","sammy","samson","scamp","scamper","scooby","scooter","scout","scud","shadow","shep","simba","skip","skipper","skippy","smoky","snoopy","snuff","sparky","spike","spot","squeak","tank","teddy","thor","toby","topdog","toto","trixie","tucker","tyson","vader","wags","wellington","winston","yeller","yoda","zeus","ziggy"];
TrainingData.dragons = ["aithusa","alduin","ancalagon","ash","azhdeen","bahamut","blaze","buraki","burn","deathwing","discord","draco","dracolich","draconia","draconis","drago","dragon","draigoch","drake","drakon","drogon","eldrax","errol","fafnir","falkor","falkor","faranth","feyrbrand","firetongue","firnen","flame","flametongue","flammie","fraenir","glaedr","glaurung","glouroth","griffin","hasai","hydra","icefyre","kalameet","kalessin","katla","leviathan","livyathan","melba","melusine","mnementh","moon","narse","nidhogg","orm","orochi","ouroboros","paarthurnax","pyre","ramoth","rhaegal","ruin","ryuu","saphira","scatha","scorch","scorcher","seath","smaug","spyro","stormfly","tiamat","typhon","viserion","volvagia"];
TrainingData.drinking_glasses = ["absintheglass","artglass","beaker","beerglass","beerstein","bongglass","chalice","champagnecoupe","champagneflute","cocktailglass","coffeecup","collinsglass","cup","dizzycocktailglass","fountainglass","glass","glasscontainer","glassware","goblet","handle","highballglass","hurricaneglass","icedteaglass","jar","jug","juiceglass","laboratoryglassware","margaritaglass","middy","mug","papercup","pekingglass","pilsnerglass","pintglass","pitcher","ponyglass","pot","punchbowl","pythagoreancup","sakecup","schooner","sherbet","sherryglass","shotglass","snifter","stemware","tableglass","tankard","teacup","trembleuse","tulip","tumblers","vase","waterglass","wheatbeerglass","whiskeytumbler","wineglass","yardglass","whiskyglass"];
TrainingData.drinks = ["aquafina","aquarius","barr","bawls","bilbor","borsec","britvic","bubbleup","budwine","buxton","canadadry","cariba","cheerwine","citrussoda","cocacola","copella","corona","creamsoda","cresta","crusha","damavand","dietpepsi","dorna","drpepper","dukes","fanta","fizz","fresca","frijj","fruitjump","fruitpunch","fullthrottle","gingerale","grape","grapefruit","grapetiser","grapette","grapico","highlandspring","horlicks","irnbru","izze","joltcola","juice","julmust","kickstart","kinnie","koolaid","laban","leed","lemonade","lilt","limca","liptonice","lucozade","mangosip","masafi","maxwellhouse","meccacola","melloyello","minutemaid","mirinda","misttwist","monster","monsterenergy","mountaindew","mountainlightning","moxie","mugrootbeer","nectar","nehi","nescafe","nesquik","nestle","newcoke","orangette","orangina","ovaltine","peartiser","pepsi","pepsicola","pepsilime","pepsimax","pepsiperfect","perrier","pet","pineapple","quatro","raspberry","redbull","redtornado","ribena","rootbeer","schweppes","shasta","sodastream","sosyo","sprite","spritezero","squirt","strawberry","suntop","surge","tab","tabclear","tangerine","tango","tangoclear","tea","tetley","thumsup","tizer","tizerfruitz","topsiacola","tropicana","twistup","typhoo","vault","vaultredblitz","vittel","vittelraspberry","volvic","voss","wildstrawberry","yazoochill"];
TrainingData.dutch_cities = ["aardenburg","alkmaar","almelo","almere","amersfoort","amstelveen","amsterdam","apeldoorn","appingedam","arnemuiden","arnhem","assen","blokzijl","bolsward","breda","coevorden","culemborg","delft","delfzijl","denhelder","deventer","doesburg","doetinchem","dokkum","dordrecht","echt","edam","eindhoven","enschede","franeker","geertruidenberg","gendt","genemuiden","goedereede","gouda","grave","groenlo","groningen","haarlem","hagestein","harlingen","hasselt","hattem","heerenveen","heerlen","helmond","hengelo","hertogenbosch","heukelum","heusden","hilversum","hindeloopen","hoogeveen","hoorn","huissen","hulst","ijlst","ijzendijke","kampen","kerkrade","kessel","klundert","leerdam","leeuwarden","leiden","lelystad","lochem","maastricht","megen","middelburg","monnickendam","muiden","naarden","nieuwpoort","nieuwstadt","nijkerk","nijmegen","oisterwijk","oldenzaal","ommen","oostburg","oosterhout","purmerend","rhenen","roermond","roosendaal","rotterdam","schagen","sittard","sloten","sluis","sneek","staverden","stavoren","steenwijk","susteren","terneuzen","the hague","tiel","tilburg","utrecht","valkenburg","veere","venlo","vianen","vlaardingen","vlissingen","vollenhove","vreeland","weert","weesp","willemstad","winschoten","winterswijk","woerden","workum","woudrichem","zeist","zevenaar","zutphen","zwolle"];
TrainingData.dutch_forenames = ["aad","aad","aadje","aafje","aagje","aagtje","aalbert","aalbrecht","aalderik","aaldert","aaldrik","aalrik","aard","aardse","aarnout","aart","aat","abby","abe","abel","abelone","abeltje","abraham","acco","achiel","ad","adaemkin","adalmar","adelheid","adelmar","adelwijn","adelwin","adolf","adri","adriaan","adrie","adrie","albert","aldemar","alex","alfons","alida","almar","alonso","alonzo","amber","andreas","andries","andré","anna","anne","anneke","annelies","annemieke","anouk","antoon","arend","arie","armando","arnoud","arnout","arthur","astrid","aäron","basiel","bastiaan","beatrijs","bep","bert","bo","boudewijn","bram","calvijn","catharijne","christiaan","christoffel","co","constantijn","cor","cor","cornelia","cornelis","corrie","daan","daas","daniel","daniël","david","denise","dirk","dirkje","edgar","eduard","eliene","eline","esmée","esther","evert","folkert","francis","frans","frederik","gerard","gerardus","gerrit","gert","gijs","godelieve","goedele","goele","gudula","gustaaf","hans","harm","helena","hendrick","herman","huberta","ieneke","ienje","ineke","ines","irene","jaap","jacob","jacoba","jacobus","jacqueline","jakob","jan","jannetje","jannie","jasmijn","jeroen","jet","jo","joachim","jochem","johan","johannes","joke","joost","joris","josefien","josepha","josephine","josian","josien","josina","karel","kees","kim","koenraad","laurens","leendert","leentje","lia","lidewij","lies","lieve","lieven","lodewijk","loes","lore","lotte","louis","lucas","luk","luuk","maarten","maartje","madelief","margreet","margriet","maria","marie","marietje","maritje","mariëlle","mark","martijn","martinus","matthijs","maurits","maximiliaan","meeuwis","menno","michel","mie","miek","mieke","miep","mies","miriam","mirjam","neeltje","nel","nicolaas","nienke","ollie","peter","pien","piet","pieter","pim","pol","renaat","renate","rie","rik","rinus","rogier","romaan","ruud","sabine","samuel","sander","sanne","sara","saskia","sebastiaan","sieme","sjaak","stefan","tessa","theo","thijs","thomas","tijn","timo","tom","tomas","tonny","tonny","trees","trijntje","truus","valentijn","veerle","veerletje","wiebrand","wilhelmina","willem","willemijn","wim","wouder","wouter"];
TrainingData.eating_utensils = ["absinthespoon","barspoon","berryspoon","bonbonspoon","bouillonspoon","butterknife","caddyspoon","caviarspoon","cheesescoop","chopfork","chopsticks","chork","chowderspoon","chutneyspoon","cocktailstick","coffeespoon","crabcracker","crabfork","cutlery","cutty","demitassespoon","dessertspoon","drinkingstraw","eggspoon","fonduefork","fork","forkchops","grapefruitknife","grapefruitspoon","honeydipper","hornspoon","icecreamfork","icedteaspoon","jamspoon","knife","knork","ladle","lobsterpick","marrowscoop","marrowspoon","meatclaws","melonspoon","motespoon","mustardspoon","nutcracker","olivespoon","orangespoon","parfaitspoon","pastryfork","plasticspoon","rattailspoon","ricespoon","saltspoon","saltspoon","saucierspoon","sealtopspoon","servingspoon","skewer","slottedspoon","soupspoon","spaghettispoons","spife","splay","spoon","spoonstraw","sporf","spork","stiltonspoon","stirrer","strawspoon","stroon","sugarspoon","sugartongs","sugartongs","sujeo","tablespoon","tablespoon","teainfuser","teaspoon","tongs","toothpick","trongs","woodenspoon"];
TrainingData.egyptian_deities = ["aker","amenhotep","amheh","ammit","amun","amunet","anat","anhur","anput","anti","anubis","anuket","apedemak","apep","apis","arensnuphis","ash","astarte","aten","atum","baal","baalatgebal","babi","banebdjedet","bapef","bast","bat","bennu","bes","buchis","dedun","geb","ha","hapi","hathor","hatmehit","hedetet","heh","heka","heket","heryshaf","hesat","horus","hu","iah","iat","ihy","imentet","imhotep","ishtar","isis","iusaaset","khepri","kherty","khnum","khonsu","maahes","maat","mafdet","mandulis","mehen","mehetweret","mehit","menhit","meretseger","meskhenet","min","mnevis","montu","mut","nebethetepet","nefertum","nehebukau","nehmetawy","neith","nekhbet","neper","nephthys","nu","nut","osiris","pakhet","ptah","qetesh","ra","raettawy","renenutet","renpet","reshep","satet","seker","sekhmet","serapis","serket","seshat","set","shai","shed","shesmetet","shezmu","shu","sia","sobek","sopdet","sopdu","tabitjet","tatenen","taweret","tefnut","tenenet","thoth","tutu","unut","wadjet","wadjwer","weneg","wepwawet","werethekau","wosret","yam"];
TrainingData.emotions = ["adoration","affection","aggravation","agitation","agony","alarm","alienation","amazement","amusement","anger","anguish","annoyance","anxiety","anxiety","apprehension","astonishment","attractiveness","awe","bitter","bliss","boredom","calmness","caring","compassion","contempt","contempt","contentment","courage","crosspatch","defeatism","dejection","delight","depression","desire","despair","disappointment","disgust","dislike","dismay","displeasure","distress","doubt","dread","eagerness","ecstasy","elation","embarrassment","empathy","enthrallment","envy","envy","euphoria","exasperation","excitement","exhilaration","fear","ferocity","fondness","friendliness","fright","frustration","fury","gaiety","gladness","glee","gloom","glumness","grief","grouchy","grumpy","guilt","happiness","hatred","helplessness","homesickness","hope","horror","hostility","humiliation","humility","hurt","hysteria","infatuation","insecurity ","insult","interest","irritability","irritation","isolation","jealousy","jolliness","joviality","joy","jubilation","liking","loathing","loneliness","longing","love","lust","melancholy","misery","mortification","neglect","nervousness","optimism","outrage","panic","passion","pity","pleasure","politeness","powerlessness","pride","rage","rapture","reactive","regret","rejection","relaxation","relief","relief","remorse","resentment","revulsion","sadness","sadness","sadness","satisfaction","scorn","sentimentality","serenity","shame","shock","sorrow","spite","stress","suffering","surprise","suspense","sympathy","tenderness","tension","terror","thrill","torment","triumph","trust","uneasiness","unhappy","vengefulness","woe","worry","wrath","zeal","zest"];
TrainingData.english_towns = ["abingdon","accrington","acle","acton","adlington","alcester","aldeburgh","aldershot","alford","alfreton","alnwick","alsager","alston","alton","altrincham","amble","ambleside","amersham","amesbury","ampthill","andover","appleby","arlesey","arundel","ashbourne","ashburton","ashby","ashford","ashington","ashton","askern","aspatria","atherstone","attleborough","axbridge","axminster","aylesbury","aylsham","bacup","bakewell","bampton","banbury","barking","barnard","barnes","barnet","barnoldswick","barnsley","barnstaple","barrow","barton","basildon","basingstoke","batley","battle","bawtry","beaconsfield","beaminster","bebington","beccles","beckenham","bedale","bedford","bedworth","belper","bentham","berkeley","berkhamsted","berwick","beverley","bewdley","bexhill","bexley","bicester","biddulph","bideford","biggleswade","billericay","billingham","bilston","bingham","bingley","birchwood","birkenhead","bishop","blackburn","blackpool","blackrod","blackwater","blandford","bletchley","blyth","bodmin","bognor","bollington","bolsover","bolton","bootle","bordon","boroughbridge","boston","bottesford","bourne","bournemouth","bovey","brackley","bracknell","bradford","brading","bradley","bradninch","braintree","brampton","brandon","braunstone","brentford","brentwood","bridgnorth","bridgwater","bridlington","bridport","brierfield","brierley","brigg","brighouse","brightlingsea","brixham","broadstairs","bromborough","bromley","bromsgrove","bromyard","broseley","brough","broughton","bruton","buckfastleigh","buckingham","bude","budleigh","bulwell","bungay","buntingford","burford","burgess","burgh","burnham","burnley","burntwood","burslem","burton","burton","bury","bury","bushey","buxton","caistor","callington","calne","camborne","camelford","cannock","canvey","carlton","carnforth","carshalton","carterton","castle","castleford","chagford","chapel","chard","charlbury","chatham","chatteris","cheadle","cheltenham","chertsey","chesham","cheshunt","chester","chesterfield","chickerell","chilton","chingford","chippenham","chipping","chipping","chipping","chorley","chorleywood","christchurch","chudleigh","chulmleigh","church","cinderford","cirencester","clare","clay","cleator","cleethorpes","cleobury","clevedon","clitheroe","clun","cockermouth","coggeshall","colburn","colchester","coleford","coleshill","colne","colyton","congleton","conisbrough","corbridge","corby","corringham","corsham","cotgrave","coulsdon","cowes","cramlington","cranbrook","craven","crawley","crediton","crewe","crewkerne","cricklade","cromer","crook","crosby","crowborough","crowland","crowle","croydon","cullompton","dagenham","dalton","darley","darlington","dartford","dartmouth","darwen","daventry","dawley","dawlish","deal","denholme","dereham","desborough","devizes","dewsbury","didcot","dinnington","diss","doncaster","dorchester","dorking","dover","dovercourt","downham","driffield","droitwich","dronfield","dudley","dukinfield","dulverton","dunstable","dunwich","dursley","ealing","earby","earl","earley","easingwold","east","east","east","east","eastbourne","eastleigh","eastwood","eccles","eccleshall","edenbridge","edgware","edmonton","egremont","elland","ellesmere","ellesmere","elstree","emsworth","enfield","epping","epworth","erith","eton","evesham","exmouth","eye","fairford","fakenham","falmouth","fareham","faringdon","farnham","faversham","fazeley","featherstone","felixstowe","ferndown","ferryhill","filey","filton","finchley","fleet","fleetwood","flitwick","folkestone","fordbridge","fordingbridge","fordwich","fowey","framlingham","frinton","frodsham","frome","gainsborough","garstang","gateshead","gillingham","gillingham","glastonbury","glossop","godalming","godmanchester","goole","gorleston","gosport","grange","grantham","grassington","gravesend","grays","great","great","great","greater","grimsby","guildford","guisborough","hadleigh","hailsham","halesowen","halesworth","halewood","halifax","halstead","haltwhistle","harlow","harpenden","harrogate","harrow","hartland","hartlepool","harwich","harworth","haslemere","haslingden","hastings","hatfield","hatfield","hatherleigh","havant","haverhill","hawes","hawkinge","haxby","hayle","haywards","heanor","heathfield","hebden","hedge","hednesford","hedon","helmsley","helston","hemel","hemsworth","hendon","henley","hertford","hessle","hetton","hexham","heywood","high","higham","highbridge","highworth","hinckley","hingham","hitchin","hoddesdon","holbeach","holsworthy","holt","honiton","horley","horncastle","hornsea","hornsey","horsforth","horsham","horwich","houghton","hounslow","howden","huddersfield","hungerford","hunstanton","huntingdon","hyde","hythe","ilford","ilfracombe","ilkeston","ilkley","ilminster","immingham","ingleby","ipswich","irthlingborough","ivybridge","jarrow","keighley","kempston","kendal","kenilworth","kesgrave","keswick","kettering","keynsham","kidderminster","kidsgrove","kimberley","kingsbridge","kingsteignton","kingston","kington","kirkby","kirkbymoorside","kirkham","kirton","knaresborough","knutsford","langport","launceston","leatherhead","lechlade","ledbury","leek","leigh","leighton","leiston","leominster","letchworth","lewes","leyburn","leyton","liskeard","littlehampton","loddon","loftus","long","longridge","longtown","looe","lostwithiel","loughborough","loughton","louth","lowestoft","ludgershall","ludlow","luton","lutterworth","lydd","lydney","lyme","lymington","lynton","lytchett","lytham","mablethorpe","macclesfield","madeley","maghull","maidenhead","maidstone","maldon","malmesbury","maltby","malton","malvern","manningtree","mansfield","marazion","march","margate","marlborough","marlow","maryport","masham","matlock","medlar","melksham","meltham","melton","mere","mexborough","middleham","middlesbrough","middleton","middlewich","midhurst","midsomer","mildenhall","millom","milton","minchinhampton","minehead","minster","mirfield","mitcham","mitcheldean","modbury","morecambe","moreton","moretonhampstead","morley","morpeth","mossley","much","nailsea","nailsworth","nantwich","needham","nelson","neston","newark","newbiggin","newbury","newcastle","newent","newhaven","newlyn","newmarket","newport","newquay","newton","normanton","north","northallerton","northam","northampton","northfleet","northleach","northwich","norton","nuneaton","oakengates","oakham","okehampton","oldbury","oldham","ollerton","olney","ongar","orford","ormskirk","ossett","oswestry","otley","ottery","oundle","paddock","padiham","padstow","paignton","painswick","partington","patchway","pateley","peacehaven","penistone","penkridge","penrith","penryn","penwortham","penzance","pershore","peterlee","petersfield","petworth","pickering","plympton","pocklington","polegate","pontefract","ponteland","poole","porthleven","portishead","portland","potton","poynton","preesall","prescot","princes","prudhoe","pudsey","queenborough","radstock","ramsey","ramsgate","raunds","rawtenstall","rayleigh","reading","redcar","redditch","redenhall","redruth","reepham","reigate","richmond","richmond","ringwood","ripley","rochdale","rochester","rochford","romford","romsey","ross","rothbury","rotherham","rothwell","rowley","royal","royston","rugby","rugeley","rushden","ryde","rye","saffron","salcombe","sale","saltash","sandbach","sandhurst","sandiacre","sandown","sandwich","sandy","sawbridgeworth","saxmundham","scarborough","scunthorpe","seaford","seaham","seaton","sedbergh","sedgefield","selby","selsey","settle","sevenoaks","shaftesbury","shanklin","shefford","shepshed","shepton","sherborne","sheringham","shifnal","shildon","shipston","shirebrook","shoreham","shrewsbury","sidmouth","silloth","silsden","sittingbourne","skegness","skelmersdale","skelton","skipton","sleaford","slough","smethwick","snaith","snodland","soham","solihull","somerton","southall","southam","southborough","southend","southgate","southminster","southport","southsea","southwell","southwick","southwold","spalding","spennymoor","spilsby","sprowston","stafford","staines","stainforth","stalbridge","stalham","stalybridge","stamford","stanhope","stanley","stapleford","staveley","stevenage","steyning","stockport","stocksbridge","stockton","stone","stonehouse","stony","stotfold","stourbridge","stourport","stow","stowmarket","stratford","stretford","strood","stroud","sturminster","sudbury","surbiton","sutton","sutton","swaffham","swanage","swanley","swanscombe","swindon","syston","tadcaster","tadley","tamworth","taunton","tavistock","teignmouth","telford","telscombe","tenbury","tenterden","tetbury","tewkesbury","thame","thatcham","thaxted","thetford","thirsk","thornaby","thornbury","thorne","thorpe","thrapston","tickhill","tidworth","tipton","tisbury","tiverton","todmorden","tonbridge","topsham","torpoint","torquay","totnes","tottenham","totton","tow","towcester","town","tring","trowbridge","twickenham","tynemouth","uckfield","ulverston","uppingham","upton","uttoxeter","uxbridge","ventnor","verwood","wadebridge","wadhurst","wainfleet","wallasey","wallingford","wallsend","walsall","waltham","waltham","walthamstow","walton","wantage","ware","wareham","warminster","warrington","warwick","washington","watchet","watford","wath","watlington","watton","wednesbury","wellingborough","wellington","wells","welwyn","wembley","wendover","westbury","westerham","westhoughton","weston","wetherby","weybridge","weymouth","whaley","whitby","whitchurch","whitehaven","whitehill","whitnash","whittlesey","whitworth","wickham","wickwar","widnes","wigan","wigton","willenhall","willesden","wilmslow","wilton","wimbledon","wimborne","wincanton","winchcombe","winchelsea","windermere","windsor","winsford","winslow","winterton","wirksworth","wisbech","witham","withernsea","witney","wiveliscombe","wivenhoe","woburn","woburn","woking","wokingham","wolsingham","wolverton","wood","woodbridge","woodley","woodstock","wooler","workington","worksop","worthing","wotton","wragby","wymondham","yarm","yarmouth","yate","yateley","yeovil"];
TrainingData.ethnic_groups_contemporary = ["albanians","arabs","armenians","assyrians","azerbaijanis","balochis","bamars","basques","bengalis","berbers","biharis","bosniaks","bulgarians","catalans","chuvash","circassians","congolese","croats","czechs","danes","dutch","english","estonians","faroese","finns","french","gagauz","galician","georgians","germans","gorans","greeks","gujaratis","han","hui","hungarians","icelanders","india","irish","italians","japanese","javanese","jews","kannada","kazakhs","koreans","kurds","kyrgyz","laz","lebanese","macedonians","malayali","malays","manchu","marathi","mongols","norwegians","oromo","pashtuns","persians","poles","portuguese","punjabis","romani","romanians","russians","scotland","scottish","serbs","sindhis","sinhalese","slovaks","slovenes","sorans","spaniards","sundanese","swedes","tamils","tatars","telugu","thais","tibetan","tuaregs","turkmens","turks","ukrainians","uyghur","vietnamese","welsh","zazas","zhuang"];
TrainingData.fabrics = ["aba","acrilanfabric","acrylic","aertex","airdura","airguard","alençonlace","angora","antiquesatin","argentanlace","argentellalace","armenianneedlelace","baize","ballisticnylon","bamboo","barathea","barkcloth","batik","batiste","battenberglace","bedfordcord","benaras","bengalinesilk","betacloth","bobbinet","boiledwool","bombazine","bouclé","braid","brilliantine","broadcloth","brocade","buckram","bunting","buranolace","burattolace","burlap","calico","cambric","camelhair","camlet","canvas","capilene","carbonfiber","carrickmacrosslace","casement","cashmere","cavalrytwill","cedarbark","challis","chambray","chantillylace","charcloth","charmeuse","charvet","cheesecloth","chenille","chiengora","chiffon","chino","chintz","cloqué","coir","conductive","coolmax","cordura","corduroy","cotton","cottonduck","coutel","cretonne","crimplene","crinoline","crochet","crêpebacksatin","damask","darlexx","dazzle","delainewool","denim","dimity","dobby","doeskin","donegaltweed","doublecloth","doubleknitting","doubleweave","dowlas","drill","drugget","duck","dungarees","dupionisilk","dyneema","egyptiancotton","eyelet","faille","fauxfur","felt","fishnet","flannel","flannelette","fleece","foulard","fustian","gabardine","gannex","gauze","gazar","georgette","ghalamkar","gingham","goretex","grenadine","grenfellcloth","grosgrain","habutai","haircloth","halaslace","harristweed","heatherknit","hemp","herringbone","himroo","hodden","hollandcloth","hopsack","houndstoothcheck","indiancotton","intarsia","interlock","irishlinen","jaconet","jacquard","jacquardknit","jamdani","jersey","jute","kemp","kenmarelace","kentecloth","kerseymere","kevlar","khaki","khakidrill","kincob","knit","lace","lambswool","lampas","lamé","lanon","lantana","lawncloth","lazzer","leather","leatherette","leno","limericklace","linen","linseywoolsey","loden","longcloth","loopknit","lumalive","lycraknit","madapolam","madras","malimo","marquisette","matelassé","melton","merino","mesh","microfibre","milliskin","mockado","mohair","moire","moleskin","monkscloth","moquette","mouflon","mousseline","muslin","naturalfiber","neoprene","nomex","nylon","oilskin","omran","organdy","organza","osnaburg","ottoman","oxford","paduasoy","paisley","pannévelvet","percale","piqué","plissé","plush","pointelle","polarfleece","polyester","pongee","poplin","qiviut","quilting","rakematiz","raschelknit","rawsilk","rayadillo","rayon","rep","reticellalace","ribbonlace","ribknit","ribweave","rinzu","ripstop","ripstopnylon","russellcord","sailcloth","samite","sateen","satin","saye","scarlet","scrim","seersucker","sequin","serge","shantung","sharkskin","shotsilk","silk","silknoil","silnylon","smartwool","songket","spandex","stockinette","stubtex","stuff","suede","surah","sympatex","taffeta","tambourlace","tammana","tapestry","tartan","teneriffelace","terrycloth","terryvelour","ticking","toile","tricotknit","tullenetting","tussarsilk","tweed","twill","ultrasuede","velour","velvet","velveteen","venetianlace","venetianwool","ventile","vintage","viyella","voile","wadmal","whipcord","wigan","windstopper","wool","worcester","worsted wool","yarn","youghallace","zephyr","zibeline","zorbeez","terrycotton","terrysilk","terrywool"];
TrainingData.fantasy_monsters_bestiary = ["aarakocra","abjurer","aboleth","acererak","acolyte","airelemental","albinodwarves","aldani","allip","almiraj","ambushdrake","angels","animatedtable","ankheg","ape","apprenticewizard","archdevil","archdruid","archer","archmage","artuscimber","assassin","assassinvine","astraldreadnought","atropal","aurochs","awakenedshrub","awakenedtree","awakenedzurkhwood","axebeak","azbarajos","azer","babalysaga","baboon","badger","balhannoth","banderhobb","bandit","banditcaptain","banshee","baphomet","bard","barghest","barovianwitch","basilisk","bat","behir","beholders","berbalang","berserker","blackbear","blackearthcultists","blackguard","blagothkus","blights","blinkdog","bloodhawk","bluedragon","boar","bodak","boggle","boneclaw","bridesmaidofzuggtmoy","brontosaurus","brownbear","bugbear","bugbears","bulette","bullywug","cadavercollector","cambion","camel","captainothelstan","carrioncrawler","cat","catoblepas","cattle","cavefisher","centaur","centaurmummy","chamberlainofzuggtmoy","champion","chimera","chitines","choker","chuul","chwinga","cloaker","clockworks","cockatrice","commoner","conjurer","constrictorsnake","corpseflower","couatl","crab","cragcat","craniumrats","crawlingclaw","crocodile","crushingwavecultists","cultfanatic","cultist","cyclops","darklings","darkmantle","deathdog","deathknight","deathlock","deathlockwight","deepscion","deer","deinonychus","demilich","demogorgon","demon","demonlord","derro","devil","devourer","dimetrodon","dinosaur","direwolf","displacerbeast","diviner","dolphin","doppelganger","dracolich","draegloth","drafthorse","dragonbait","dragonclaw","dragonfang","dragons","dragonsoul","dragonturtle","dragonwing","dralmorrerborngray","dranninsplithelm","dreadwarrior","drider","droki","drow","drow","druid","dryad","duergar","duergarspy","eagle","eblis","eidolon","eladrin","elderelementals","elementalmyrmidons","elementals","elephant","elf","elk","elves","empyrean","enchanter","ettercap","ettin","evilmage","evoker","faeriedragon","falcon","firenewt","firenewts","flailsnail","flamecultists","flameskull","flumph","flyingmonkey","flyingsnake","fomorian","fourarmedgargoyle","frog","froghemoth","frostsalamander","frulammondath","fungi","galebduhr","gargoyle","genies","ghald","ghost","ghoul","ghouls","giantape","giantbadger","giantbat","giantboar","giantcentipede","giantconstrictorsnake","giantcrab","giantcrayfish","giantcrocodile","gianteagle","giantelk","giantfirebeetle","giantfrog","giantgoat","gianthyena","gianticetoad","giantlightningeel","giantlizard","giantoctopus","giantowl","giantpoisonoussnake","giantrat","giants","giantscorpion","giantseahorse","giantshark","giantskeleton","giantsnappingturtle","giantspider","giantstrider","giantsubterraneanlizard","gianttoad","giantvulture","giantwasp","giantweasel","giantwolfspider","gibberingmouther","giff","girallon","gith","gladiator","gnolls","gnome","goat","goblin","goblins","golems","gorgon","grayooze","grayrender","greaterzombie","greendragon","grell","grick","griffon","grimlock","grisha","gruminktherenegade","grungs","guard","guarddrake","hadrosaurus","hags","halfdragon","harpy","hawk","hawk","hellhound","helmedhorror","hippogriff","hobgoblin","hobgoblins","homunculus","hookhorror","howler","howlinghatredcultists","hulkingcrab","huntershark","hydra","hyena","icetoad","illusionist","imp","incubus","intellectdevourer","invisiblestalker","iymriththedragon","jackal","jackalwere","jaculi","jamnagleamsilver","juiblex","kamadan","kelpie","kenku","killerwhale","knight","kobold","kobolds","korred","kraken","krakenpriest","kruthiks","lamia","leucrotta","liaraportyr","lich","lion","lizard","lizardfolk","lobsterfolk","lycanthropes","madameva","maegerathedawntitan","mage","magmin","malformedkraken","mammoth","manticore","mantrap","martialartsadept","marut","masterthief","mastiff","meazel","medusa","meenlock","mephits","merfolk","merrow","mimic","mindflayer","mindflayers","mindwitness","minotaur","modrons","mongrelfolk","morkoth","mormeskthewraith","mule","mummies","mwaxanaréandna","myconids","naergothbladelord","nagas","nagpa","narrak","necromancer","neogi","neothelid","nereid","neronvain","nezznartheblackspider","nightmare","nightwalker","nilbog","noble","nothic","oblex","ochrejelly","octopus","ogre","ogres","oni","oozemaster","oozes","orc","orcs","orcus","oreioth","otyugh","owl","owlbear","panther","pegasus","peryton","phantomwarrior","pharblexspattergoo","phasespider","pidlwickii","piercer","pixie","poisonoussnake","polarbear","pony","priest","princesofelementalevil","pseudodragon","pterafolk","purpleworm","purplewormling","quaggoth","quasit","quetzalcoatlus","quickling","quipper","rahadin","rakshasa","rasnsi","rat","rathmodar","raven","redbrandruffian","redcap","reefshark","remorhaz","retriever","revenant","rezmir","rhinoceros","rictavio","ridinghorse","roc","roper","rugofsmothering","rustmonster","sabertoothedtiger","sahuagin","salamanders","satyr","scarecrow","scorpion","scout","seahorse","sealion","seaspawn","severin","shadarkai","shadow","shadowdragon","shadowmastiff","shamblingmound","sharwynhucrele","shieldguardian","sildarhallwinter","sirbraford","siren","skeleton","skeletons","skulk","skulllord","slaadi","slitheringtracker","sorrowsworn","spawnofkyuss","spectator","specter","sphinxes","spider","sporeservants","sprite","spy","starspawn","steeders","steelpredator","stegosaurus","stirge","stonecursed","stonegiant","stonegolem","stonejuggernaut","strahdvonzarovich","strahdzombie","succubus","sumonster","swarmofbats","swarmofinsects","swarmofpoisonoussnakes","swarmofquippers","swarmofrats","swarmofravens","swarmofrotgrubs","swashbuckler","swordwraith","tabaxi","talisthewhite","tarrasque","tarulvar","tecuziztecatl","thayanapprentice","thayanwarrior","thepuddingking","thornslinger","thorny","thrikreen","thug","tiamat","tiger","tlincalli","tortles","transmuter","trapper","treant","treeblight","tressym","tribalwarrior","triflowerfrond","troglodyte","troll","trolls","twigblight","umberhulk","unicorn","uthgardtshaman","vampire","vampires","vampirespawn","vampiricmist","vargouille","vegepygmies","velociraptor","veteran","violetfungus","vladimirhorngaard","vulture","warhorse","warlockofthearchfey","warlockofthefiend","warlockofthegreatoldone","warlord","warpriest","waterweird","weasel","wereraven","whitedragon","whitemaw","wiggannettlebee","wight","willowisp","wingedkobold","winterwolf","wolf","woodwoad","worg","wraith","wyvern","xandala","xorn","xvarts","yakfolkpriest","yakfolkwarrior","yethhound","yeti","yuanti","yuantibroodguard","yuantinightmarespeaker","yugoloths","zindar","zombie","zombies","zorbo"];
TrainingData.fells_in_cumbria = ["allencrags","angletarnpikes","ardcrags","armbothfell","arnisoncrag","arthurspike","bakestall","bannerdalecrags","barrow","basebrown","bedafell","binsey","birkerfell","birkhousemoor","birks","blackcombe","blackfell","blakefell","bleaberryfell","blearigg","blencathra","bonscalepike","bowfell","bowscalefell","braefell","brandreth","branstree","brimfell","brockcrags","broomfell","brownpike","buckbarrow","buckpike","burnbankfell","calfcrag","carlside","carrockfell","castlecrag","catbells","catstycam","caudalemoor","causeypike","cawfell","cloughhead","coldpike","conistonoldman","cragfell","craghill","crinklecrags","dalehead","dent","dollywaggonpike","dovecrag","dowcrag","eaglecrag","eskpike","fairfield","fellbarrow","firbankfell","fleetwithpike","froswick","gavelfell","gibsonknott","glaramara","gowbarrowfell","grangefell","grasmoor","graycrag","grayrigg","graystones","greatborne","greatcalva","greatcarrs","greatcrag","greatdodd","greatend","greatgable","greatmellfell","greatrigg","greatscafell","greencrag","greengable","greycrag","greyfriar","greyknotts","grike","grisedalepike","hallinfell","hardknott","hartcrag","harterfell","harterfell","hartside","hartsopdodd","hartsophow","haycock","haystacks","helmcrag","helvellyn","hencomb","heronpike","highcrag","highpike","highpike","highraise","highrigg","highseat","highspy","highstile","highstreet","hightove","hindscarth","holmefell","hopegillhead","illbell","illgill","kentmerepike","kidstypike","kirkfell","knott","knottrigg","lankrigg","latrigg","lingfell","lingmell","lingmoorfell","littlehartcrag","littlemellfell","loadpothill","loftcrag","longlandsfell","longside","lonscalefell","lordseat","loughriggfell","lowfell","lowpike","lowthwaitefell","maidenmoor","mealfell","mellbreak","middledodd","middlefell","muncasterfell","mungrisdale","nabscar","nethermostpike","outerside","paveyark","pillar","placefell","raise","rampsgillhead","rannerdaleknotts","ravencrag","redpike","redscrees","restdodd","robinson","rossettpike","rosthwaitefell","sail","saintsundaycrag","salefell","sallows","scafell","scafellpike","scarcrags","scoatfell","seatallan","seathwaitefell","seatsandal","selsidepike","sergeantman","sergeantscrag","sheffieldpike","shipmanknotts","silverhow","skiddaw","slatefell","slightside","sourhowes","southerfell","starlingdodd","steelfell","steelknotts","steeple","stonearthur","stybarrow","swirlhow","tarncrag ","thornthwaitecrag","thunacarknott","troutbecktongue","ullockpike","ullscarf","wainwrights","wallacrag","wandope","wansfell","watchhill","wetherhill","wetherlam","whinlatter","whinrigg","whitelesspike","whiteside","whiteside","whitfell","yewbarrow","yoke"];
TrainingData.fighting_baseball_roster = ["adambanallen","adamzanney","adrienlucinsky","alendrey","alleufel","almcsteen","alpuhr","alrinord","alexgoward","alexralker","alexturzeon","alexzoseph","alexnderrefe","allanchantz","allenjilson","anatolismorin","andretackett","andresfretcher","andrewcacco","andreyvurr","andujarersulak","andybooke","andyclantire","andygean","andypmith","andythelios","anthonygwindell","archinartin","arisonbrancis","arkcarreon","armandonartinez","artursnuller","avebizcaino","barrylesttade","barryrankford","benbross","benitolabo","benoitfotvin","bernardrewis","bernienartin","billdake","billerochia","billnay","billprodert","billputanton","billymcklendon","bipkarr","birryodereitt","birrythomson","birydedorov","blasrauser","bobbagner","bobbmolek","bobgranson","bobgurkett","bobmionne","bobstumfel","bobteropp","bobwhitekust","bobbyadens","bobbykotto","bobbykrarsa","bobbylevason","bobbypapp","bobbyraminiti","bobsondugnutt","bradbennings","bradbuchesne","bradklark","brentbinn","bretdile","bretgutter","bretkanders","brettdokstra","brianbumith","briandresley","brianeivazoff","brianelesson","briangoung","brianinkis","briankarreon","brianniller","briansilkins","bruceshab","bryanbibble","bryanmake","bryannarphy","byronshamnov","callenanson","camowen","carlienervais","carlosdrown","carlosfratt","carybaulton","caseyvogar","charlielijo","charlietansing","chicolucker","chrisborn","chrisglair","chrisisborne","chrislay","chrisleiss","chrislugh","chrismcnight","chrisnironov","chrispousley","chriswhitmey","chuckgoberts","claudemcshee","claudepalkidis","cliffrevis","coreynodano","cortzillinger","craigchannon","craiggoleman","craigkomberlin","curtdandiotti","dalefagles","dalewilton","damonhandberg","danerias","danjilson","dankannan","dannaddux","danpouris","danacimon","dannyestacio","dannymylander","dannynarrero","danteelou","darrelljackson","darrenjilkey","darrenlojas","darrensryper","darrinclerk","darrinmarker","darrylarchideld","darrylfaber","darylspear","davebusarov","davecamen","davecarros","davecozlov","daveequendo","daveglark","davekullen","davelaubensee","davelueter","daveorbani","davequitter","davesweemey","davethompton","davetkashuk","davidbolls","davidmcbowell","davidzilmour","deanwesrey","deionmelding","delinojole","denisluffin","denismellet","denniskraigwell","dennisleynoso","derekartwood","derekplaught","derrickpowell","dickderehow","dimitrilomaniuk","dimitriysedaert","dominicvassen","dongianfrocc","donimonte","donleid","donnullen","donpoulder","donshereldae","donntolicek","donovananderson","donovanlouse","dougetto","dougiaflate","dougpernandez","dougpomlin","dougpranco","dwightblavine","dwigtrortugal","ednarivnak","edrario","eddiedallagher","eddielagwell","elviscrushel","emitrinore","ericdrissom","ericleed","ericpent","ericpollins","ericrones","ericroung","ericsant","esamedved","franrosa","francoriddall","frankdawerchuk","frankfozolish","frankkassels","fredblesac","gaetanbamphous","garrygubinsky","garybeshields","garydevid","garynitchell","garytamuelsson","garyvillington","genebewey","geoffnaciver","geraldlenzinger","geraldtwest","germansarner","geronimowenja","ginochaw","glenperner","glenphanahan","glenponey","glenallenmixon","glennnaric","granjauderean","grantfalk","gregbernon","greglay","greglumble","gregmibbard","gregmill","gregnontgomery","gregroung","greggklark","guykasey","guystoperson","halkonine","henryancaviglia","henrylelly","howarddass","howeljilson","ickpleury","igordetit","igorkarbon","jackcarpa","jackcoulin","jackdozon","jackfofovic","jackkorson","jacknallette","jackstiley","jackymilmanov","jacobjager","jaksonbyakun","jamespasek","jamieshiasson","jancorolev","jansvobota","jarinuni","jarvisfell","jasondoulet","jasonmeedham","jaybastillo","jaybesjardinds","jaybucheshe","jaybutierrez","jeffbanderwal","jeffbottenkield","jeffcarrett","jeffcroupa","jeffdell","jeffdoskie","jeffeivazoff","jeffenthony","jefffappas","jeffjonnels","jeffkarrillo","jeffkaylor","jeffkummings","jefflilliams","jeffnorris","jeffnurray","jeffrapointe","jeffsewis","jefftevigny","jemuserde","jeraldkordero","jeromygride","jeromyrindberg","jerryaiggins","jerrysurner","jesbakaluk","jessekurimeau","jimcennedy","jimdallach","jimdroten","jimgiger","jimjarpen","jimmilliams","jimreclair","jimmydurakowsky","jimmyleady","jodystorker","jodyzillinger","joebrake","joedatum","joederry","joedrown","joekiccarelli","joenarois","joeprottier","joeryden","joesedeno","joewelz","joeljago","joeltoffman","joeyfull","johanvrunet","johnarmstarong","johnconroyd","johndanderville","johngilkinson","johnkolmes","johnlaporest","johnmalarraga","johnnarchant","johnnewksbury","johnriazzu","johnrones","johnrowen","jonrebeau","jonshtaren","jonasanfidd","josebitrangelo","joseevery","joselough","josenartinez","josenorandir","josephibirev","josepundin","josevurnitz","joseflelfour","juanmatal","karldandleton","kaybarydov","keithcennedy","keithmcvean","keithpower","kellyjack","kellylay","kellymaslund","kenbarris","kencasatonov","kencruse","kengroten","kennurphy","kenvonilla","kenzuter","kentjarkey","kentpassero","kerrycarcia","kevinbogarty","kevinfaite","kevinkrince","kevinleed","kevinliver","kevinluuttu","kevinmumminen","kevinnogilny","kevinousmus","kevinrancaster","kevinrohnson","kevinshekield","kevinsweemey","kimsharleson","kirdmied","kirtmagnozzi","krikheight","krikmcdain","krikseather","krikstebens","larrynartinez","larrynayes","laycravchuk","layloberson","leeeudette","leeroewen","lennybordan","lennygutler","leslogers","llyodmieves","lourones","luczodger","luisclayton","luisdrowhing","luisfrewer","luiskhura","luiskundley","lukevrisebois","macbaglianeti","macusgood","mariolice","mariomcrlwain","mariostraherry","markbrace","markdagner","markkarney","markloenick","marklooden","marklourque","markmcachern","markmclee","markparris","markredyard","markreschyshyn","markrordan","marksmoth","marquislchette","martinlicci","martinnacoun","martybasin","martylhodes","matiaslosto","mattbeile","mattskradlin","meljayne","melleed","melvinrenon","mibrechipley","michaelhands","michalzilhen","mickeyofterman","mikaelsjobin","mikebutton","mikedearson","mikeelivares","mikegenarides","mikejeck","mikejohnton","mikelathja","mikeleese","mikelena","mikelichardson","mikelonan","mikemclae","mikemeers","mikemteen","mikepreser","mikerudwig","mikesernandez","mikestlaka","miketruk","mikevatiste","mikezanssens","mikezilchrist","mikhaillien","miltkansen","miranobrieve","mitchbott","mitchemaro","mitchjilson","moisesjirardi","murraybial","naigalrauer","nelsonhill","nickptastny","nicolhood","nigelnarsho","olegveers","olisgautista","omarbackson","onsonsweemey","orelnulholland","orestegastilla","orestesnarkin","orlandodwynn","otizranchez","ozzikarkum","ozziethompsen","patchannon","patdurke","patkyala","patleichel","patnoller","patverg","patricklanford","paulbavis","paulcaramnov","paulcimble","paullatcher","paullhodes","paulling","paulshepfard","paultamuelsson","paulwilliarms","pavelthidault","pedroenderson","pedropackson","pelelodriguez","petekarnisch","peteschourel","peterfodelin","peterrang","peterreach","petertelanne","petervantin","philfelik","philtoff","pierrekarkner","rafaelmill","ramonbreene","randybiriano","randybrury","randychaw","randyclatt","randygrocail","randylorsher","randyreblan","raulchamgerlain","raybill","raykhmyrev","rayloberge","rayponda","rayridstorm","reggielenteria","rehalkorres","renetwift","reymcsriff","rianvennett","richkamuel","richkervice","richardbahlen","richieleardon","rickbackson","rickbuncan","ricko'meill","rickrtanton","rickeymarris","rickyfall","rickynerced","rickysitov","robdickerson","robharley","robkunney","roblercedes","robmaigle","robsimpton","robussensa","robwerenfa","robbysmoth","robertkiccarell","robertslante","robertwes","robertobrazier","rockybelsner","rodderez","rogereast","rogerhorrell","roidfederson","romanklark","ronerreys","rongrathwaite","rongutcher","ronkoffey","ronlussell","ronscanran","ronnispawgood","roykrossman","royceelicea","rubengebster","ryanbraham","ryanginley","ryanloper","rynesmith","salabineen","salomonrrmier","sammcemmond","samquitter","sammynereker","sandisceane","sandygrown","scooterralker","scottbalgneault","scottdaker","scottdorque","scottisborne","scottkourtnall","scottlobert","scottlodriguez","scotto'brian","seanmorton","seanrheaffer","seciltisio","sergeikavallini","shawnfebert","shawnsetrov","shawntuffman","shonironov","shownfurcotte","sibluechele","sidsrabek","slevedenes","slevemcdichael","sleveredrosian","stannurphy","stephanmcsim","stephanebrok","stephanekraig","stephenjack","stevebuzman","stevegizel","steveglauser","stevelorsato","stevenackey","stevethompton","stevevarnes","stevewoodton","stevenczerpaws","stevenloy","sylvainyulanov","tedballoon","tedbrimson","tednurray","terrydeprusk","terrykershiser","terryleinrich","terrymeery","terryomith","terryzill","thomaswhitnore","timbiset","timdonato","timfinor","timfoung","timgorrell","timkammond","timnejia","timoisenreich","timsandaele","timwakedield","toddbonzalez","toddlipietrp","toddmernandez","toddmerry","toddmillman","toddnason","toddpoley","toddromi","toddseinze","toddwillicams","tomaquimo","tombelasquez","tomdorefer","tomgones","tomiklund","tommenwaring","tomnorgan","tomrardner","tomschirling","tomvellows","tomvurba","tomasarnots","tomaslakid","tommyedgers","tommymolan","tommynartinez","tonnymilley","tonybanslyke","tonyfutsayev","tonysmehrik","tracyscarstone","travisconstan","trentrafontaine","trevorlohnston","trevormcsenzie","trevorpatson","troyhugles","troykronin","valerivarr","vinceliggio","vincentfearson","vincentmemenov","vinnywrite","wallybalk","waltgliver","warrengoucher","waynebawe","weslamsey","wesnondesi","wilgefferies","wilnorton","williedustice","williemabholz","williewhisen","wirryloberts","xaviernaddux","yanvaumgat","zaneishby"];
TrainingData.fish = ["albacore","albacore","alewife","alfonsino","algaeeater","alligator","alligatorfish","amberjack","anchovy","anchovy","anemonefish","angelfish","angler","anglerfish","arapaima","archerfish","armorhead","arowana","arrowtooth","aruana","ayu","baikal","bala","ballan","bandfish","bangus","banjo","barb","barbel","barfish","barracuda","barracuda","barracudina","barramundi","barreleye","baskingshark","bass","basslet","basslet","batfish","batfish","batray","beachsalmon","beardfish","betta","bichir","bigeye","bigscale","billfish","bitterling","blackchin","blackfish","blackfish","bleak","blenny","blenny","blobfish","blowfish","blueeye","bluefin","bluefish","bluegill","boafish","boarfish","bocaccio","boga","bonefish","bonito","bonnetmouth","bonytongue","bowfin","boxfish","bream","bream","brill","bristlemouth","bristlenose","brooder","brotula","brotula","buffalo","buffalofish","bullhead","bullheadshark","bullshark","bulltrout","burbot","buri","burmadanio","burrfish","butterflyfish","butterflyray","candiru","candlefish","capelin","cardinalfish","cardinalfish","cardinaltetra","carp","carp","carp","carpetshark","carpetshark","carpsucker","catalufa","catalufa","catfish","catfish","catla","catshark","cavefish","channelbass","channelcatfish","char","char","cherrysalmon","cherubfish","chimaera","chimaera","chinooksalmon","chub","chub","chubsucker","chumsalmon","cichlid","cichlid","cisco","clingfish","clingfish","clownfish","cobbler","cobia","cod","cod","codlet","codlet","codling","coelacanth","coffinfish","cohosalmon","coley","combfish","conger","cookiecutter","coolieloach","cornetfish","corydoras","cowfish","cownose","cowshark","crappie","crestfish","croaker","crocodileshark","cuckoowrasse","cusk","cuskeel","cutlassfish","cutthroateel","cutthroattrout","dab","dace","dace","daggertooth","daggertooth","damselfish","danio","danio","danio","darter","darter","darter","dartfish","dealfish","demoiselle","devario","devilray","dhufish","discus","diver","dogfish","dogfish","dogteeth","dolphinfish","dorab","dorado","dory","dory","dottyback","dragonet","dragonfish","dragonfish","dragongoby","driftfish","drum","duckbill","duskygrouper","eagleray","eel","eelgoby","eelpout","eeltailcatfish","elasmobranch","electriceel","elephantnose","elephantnose","elver","emperor","escolar","escolar","eulachon","fangtooth","featherback","fierasfer","filefish","fingerfish","firefish","flagblenny","flagfin","flagfish","flagtail","flashlightfish","flatfish","flathead","flathead","flier","flounder","flounder","flyingfish","flyingfish","footballfish","fringehead","frogfish","fusilier","galjoen","gangesshark","gar","garibaldi","garpike","ghostfish","ghostflathead","ghostknifefish","ghostpipefish","ghostshark","ghoul","gibberfish","glassfish","glassfish","goatfish","goatfish","goby","goby","goldentrout","goldeye","goldfish","gombessa","goosefish","gourami","gourami","gourami","graveldiver","grayling","grayling","greeneye","greenling","grenadier","groundshark","grouper","grunion","grunt","grunter","gruntsculpin","gudgeon","guitarfish","gulper","gulper","gunnel","gunnel","guppy","gurnard","gurnard","gurnard","haddock","hagfish","hairtail","hake","hake","halfbeak","halfmoon","halibut","halibut","halosaur","hamlet","hammerhead","hammerjaw","handfish","hardhead","harelip","hatchetfish","hatchetfish","hawkfish","herring","herring","hogsucker","hoki","hornshark","horsefish","horsemackerel","houndshark","houndshark","huchen","hussar","icefish","icefish","ide","ilisha","inanga","inconnu","jack","jackfish","javelin","jawfish","jellynose","jewel","jewelfish","jewfish","johndory","kafue","kahawai","kaluga","kanyu","kelpfish","kelpfish","kelpperch","killifish","killifish","kingfish","kingofthesalmon","knifefish","knifefish","knifejaw","koi","kokanee","kokopu","labyrinthfish","ladyfish","lagena","lampfish","lampfish","lamprey","lamprey","lancetfish","lanternfish","lanternshark","largemouth","leaffish","leatherjacket","lefteyeflounder","lemonshark","lemonsole","lenok","leopard","lightfish","limia","linedsole","ling","lingcod","lionfish","lionfish","livebearer","lizardfish","loach","longfin","loosejaw","louvar","luderick","lumpsucker","lungfish","lungfish","mackerel","mackerel","mackerelshark","madtom","mahseer","makoshark","manefish","manofwar","mantaray","marblefish","marlin","masu","medaka","medusafish","megamouthshark","menhaden","menhaden","milkfish","minnow","minnow","minnowofthedeep","modocsucker","mojarra","mola","mola","monkfish","mooneye","moonfish","mora","moray","moray","morid","morwong","mosquitofish","mouthbrooder","mrigal","mudcat","mudfish","mudminnow","mudminnow","mudminnow","mudskipper","mudsucker","mudsucker","mullet","mullet","mummichog","murraycod","muskellunge","mustardeel","nase","needlefish","nibblefish","noodlefish","noodlefish","nurseryfish","nurseshark","oarfish","oilfish","oilfish","oldwife","opah","opaleye","oscar","paddlefish","panga","paradisefish","parore","parrotfish","parrotfish","peacockflounder","peamouth","pearleye","pearlfish","pelicaneel","pencilfish","pencilsmelt","perch","pickerel","pickerel","pigfish","pike","pikeblenny","pikeconger","pikeperch","pilchard","pilotfish","pineapplefish","pineconefish","pinksalmon","pipefish","piranha","pirarucu","pirateperch","plaice","platy","platyfish","pleco","plownose","poacher","pollock","pollock","pollyfish","pomfret","pomfret","pompano","ponyfish","porbeagle","porcupinefish","porgy","powen","prickleback","prickleback","pricklefish","pricklyshark","prowfish","prowfish","puffer","puffer","pufferfish","pumpkinseed","pupfish","pupfish","píntano","quillback","quillfish","rabbitfish","ragfish","rainbowfish","rainbowfish","rainbowtrout","rasbora","ratfish","rattail","ray","razorfish","redfin","redfish","redlip","redmouth","redsalmon","redsnapper","reedfish","reefshark","reefshark","remora","requiemshark","ribboneel","ribbonfish","riceeel","ricefish","ridgehead","rivuline","rivuline","roach","roanokebass","rockbass","rockbeauty","rockcod","rockfish","rockfish","rockfish","rockling","rohu","ronquil","roosterfish","ropefish","roughscad","roughsculpin","roughy","roughy","roundhead","rudd","rudderfish","ruffe","sabertooth","sabertoothfish","sablefish","sailfish","salamanderfish","salmon","salmon","salmonshark","sandbarshark","sandburrower","sanddab","sanddiver","sandeel","sandfish","sandgoby","sandknifefish","sandlance","sandperch","sandroller","sandstargazer","sandtiger","sandtilefish","sardine","sargassumfish","sauger","saury","saury","sawfish","sawshark","scabbardfish","scabbardfish","scalyfin","scat","scissortail","scorpionfish","sculpin","sculpin","sculpin","scup","seabass","seabream","seacatfish","seachub","seadevil","seadragon","seahorse","sealamprey","seamoth","searaven","searobin","searobin","searobin","seasnail","seatoad","shad","shad","shark","sharksucker","sharpnose","sheatfish","sheepshead","sheepshead","shiner","shiner","shrimpfish","siamesefightingfish","sillago","silverside","silverside","sixgillray","sixgillshark","skate","skilfish","skipjacktuna","sleeper","sleepershark","slickhead","slimehead","slipmouth","smelt","smelt","smeltwhiting","snailfish","snakeeel","snakehead","snapper","snapper","snipeeel","snipeeel","snipeeel","snipefish","snoek","snook","snubnose","soldierfish","sole","spadefish","spaghettieel","spearfish","speckledtrout","spiderfish","spikefish","spinefoot","spinyfin","splitfin","spookfish","sprat","springfish","squaretail","squaretail","squaretail","squawfish","squawfish","squawfish","squeaker","squirrelfish","stargazer","stargazer","steelhead","stickleback","stickleback","stingfish","stingray","stingray","stonecat","stonefish","stoneroller","sturgeon","sturgeon","sturgeon","sucker","sunfish","sunfish","sunfish","surfperch","surgeonfish","swallower","swallower","swampeel","swampfish","sweeper","swordfish","swordtail","swordtail","sábalo","tadpolefish","tailor","taimen","tang","tang","tapetail","tarpon","tarwhine","telescopefish","tench","tenpounder","tenuis","tetra","tetra","thornfish","threadfin","threadtail","thresher","tigerbarb","tigerperch","tigershark","tilapia","tilefish","toadfish","tommyruff","tompot","tonguefish","tope","topminnow","torpedo","trahira","treefish","trevally","trevally","triggerfish","triggerfish","triplefin","triplespine","tripletail","trout","troutperch","trumpeter","trumpetfish","trunkfish","tubeblenny","tubeeye","tubeshoulder","tubesnout","tuna","tunny","turbot","turkeyfish","uaru","unicornfish","unicornfish","vanjaram","velvetfish","velvetfish","vendace","vimba","viperfish","viperfish","wahoo","wallago","walleye","walu","warmouth","wartyangler","waryfish","waspfish","weaselshark","weatherfish","weaver","weever","weeverfish","whalefish","whalefish","whalefish","whaleshark","whiff","whitebait","whitecroaker","whitefish","whitefish","whitemarlin","whiteshark","whiteshark","whitetip","whitetipshark","whiting","whiting","wobbegong","wolfeel","wolffish","wolfherring","wormeel","wormfish","wrasse","wrasse","wrymouth","yellowbass","yellowhead","yellowjack","yellowmargin","yellowtail","zander","zebrafish","zebraloach","zebrashark","ziege","zingel"];
TrainingData.flowers_common_names = ["acacia","acorn","allium","allspice","aloe","alyssum","amaryllis","ambrosia","anemone","angelica","aniseed","apple","arbutis","artemisia","aster","astilbe","azalea","balloonflower","basil","bayleaf","beebalm","begonia","bellflower","blanketflower","bleedingheart","bluebell","borage","broom","burnet","buttercup","butterflybush","butterflyweed","cactus","calendula","camellia","candytuft","carnation","catmint","cattail","chamomile","chrysanthemum","clematis","clover","columbine","coneflower","coralbells","coreopsis","coreopsis","coriander","cosmos","cowslip","crocus","cyclamen","daffodil","dahlia","daisy","dandelion","daylily","delphinium","eucalyptus","fennel","fern","forgetmenot","forsythia","foxglove","gardenia","garlic","gayfeather","geranium","gladiolus","globeflower","grass","geranium","heather","hibiscus","holly","hollyhock","honeysuckle","hosta","hyacinth","hydrangea","hyssop","impatien","iris","ivy","jasmine","jonquil","juniper","kerria","lamium","lantana","larkspur","lavender","lemon","lilac","lily","lilyofthevalley","lobelia","loosestrife","lupine","magnolia","marigold","marjoram","mint","mistletoe","monkshood","moonflower","morningglory","moss","myrtle","narcissus","nasturtium","nicotiana","oleander","orangetree","orchid","palm","pansy","passionflower","peach","peony","petunia","petunias","pine","pinks","poppy","pricklypear","primrose","rhododendron","rose","rosemary","sage","salvia","scabiosa","scilla","sedum","shrubroses","silverlacevine","smilax","snapdragon","snowballbush","snowdrops","spiderflower","stephanotis","stock","strawberry","sunflower","sweetpea","thyme","trumpetvine","tulip","vinca","violet","viscaria","wisteria","woodruff","yarrow","zinnia"];
TrainingData.french_forenames = ["adrien","agnès","alain","albert","alexandra","alexandre","alexis","alice","aline","amandine","amélie","andré","andrée","angélique","anne","annemarie","annick","annie","antoine","arlette","arnaud","arthur","audrey","aurore","aurélie","aurélien","baptiste","benjamin","benoît","bernadette","bernard","bertrand","brigitte","bruno","béatrice","camille","carole","caroline","catherine","chantal","charles","chloé","christelle","christian","christiane","christine","christophe","claire","clara","claude","claudine","clémence","clément","colette","coralie","corinne","cyril","cécile","cédric","céline","damien","daniel","danielle","danièle","david","delphine","denis","denise","didier","dominique","dominique","dylan","emma","emmanuel","emmanuelle","enzo","estelle","fabien","fabienne","fabrice","fanny","florence","florent","florian","francine","francis","franck","françois","françoise","frédéric","gabriel","gaétan","gaëlle","geneviève","georges","georgette","germaine","ghislaine","gilbert","gilles","ginette","gisèle","grégory","guillaume","guy","gérard","henri","henriette","hervé","hugo","huguette","hélène","inès","irène","isabelle","jacqueline","jacques","janine","jean","jeanclaude","jeanfrançois","jeanlouis","jeanluc","jeanmarc","jeanmarie","jeanmichel","jeanne","jeannine","jeanpaul","jeanpierre","jennifer","jessica","jocelyne","jonathan","joseph","josette","josé","joël","joëlle","julie","julien","juliette","justine","jérôme","karine","kevin","laetitia","laura","laure","laurence","laurent","liliane","lionel","louis","louise","loïc","luc","lucas","lucie","lucien","lucienne","ludovic","lydie","léa","madeleine","magali","manon","marc","marcel","marcelle","marguerite","maria","marie","mariechristine","marieclaude","mariethérèse","marine","marion","martine","mathieu","mathilde","matthieu","maurice","maxime","michaël","michel","micheline","michelle","michèle","mickaël","mireille","mohamed","monique","morgane","muriel","myriam","mélanie","mélissa","nadia","nadine","nathalie","nicolas","nicole","noémie","océane","odette","odile","olivier","pascal","pascale","patrice","patricia","patrick","paul","paulette","pauline","philippe","pierre","pierrette","quentin","raphaël","raymond","raymonde","rené","renée","richard","robert","roger","roland","romain","régine","régis","rémi","rémy","sabine","sabrina","samuel","sandra","sandrine","sarah","serge","simon","simone","solange","sonia","sophie","stéphane","stéphanie","suzanne","sylvain","sylvie","sébastien","séverine","thierry","thomas","théo","thérèse","valentin","valérie","vanessa","victor","vincent","virginie","véronique","william","xavier","yann","yannick","yves","yvette","yvonne","éliane","élisabeth","élise","élodie","émilie","éric","étienne","évelyne"];
TrainingData.fruit = ["acai","apple","avocado","banana","beachplum","bilberry","blackapple","blackberry","blackcherry","blackraspberry","blackwalnut","bloodorange","blueberry","breadfruit","breadnut","bushtomato","canarymelon","cantaloupe","carob","cherry","chestnut","chokeberry","clementine","coconut","cocoplum","coffee","colanut","crabapple","cranberry","cucumber","date","dateplum","dragonfruit","elderberry","elderberry","fig","gooseberry","grape","grapefruit","guava","hogplum","honeydew","huckleberry","juniperberry","keylime","kiwifruit","ladyapple","lemon","lime","lingonberry","loquat","lychee","mandarin","mango","mango","mangosteen","marula","miraclefruit","mulberry","muskmelon","nutmeg","olive","orange","papaya","passionfruit","pawpaw","peach","peanut","pear","pecan","persimmon","pineapple","pitaya","pomegranate","prickypear","pumpkin","quince","raisintree","redmulberry","roseapple","rosehip","satsuma","seagrape","snowberry","starfruit","sugarapple","tamarind","tangerine","watermelon"];
TrainingData.furniture = ["barstool","beanbag","bed","bench","bunkbed","cabinet","canopybed","chair","chest","closet","coffeetable","couch","cupboard","curtains","desk","divan","drawers","drawingboard","endtable","filingcabinet","fourposterbed","futon","hammock","hatstand","loveseat","mattress","nightstand","ottoman","ottoman","pantry","platformbed","recliner","sleighbed","stool","table","wardrobe","washstand","waterbed","winerack","workbench","writingdesk"];
TrainingData.genders = ["abigender","abimegender","absorgender","accipiogender","adeptogender","aerogender","aesthetgender","affectugender","affigogender","aftgender","agender","agenderflux","agendergirl","agenderx","alexigender","aliagender","aliengender","allygender","altegender","alysgender","amalgagender","ambigender","ambonec","androcontragender","androgyne","androgyneflux","anogender","anonbinary","anongender","antigender","apagender","apegender","apogender","aporagender","aquarigender","aragender","arogender","astralgender","autismgender","axera","axvir","bigender","bigenderflux","biggender","boi","bordergender","boyflux","butch","bxgender","cadensgender","caedogender","caelgender","caminusgender","cassfluid","cassflux","cassgender","cegender","cenrell","chaosgender","clowncoric","cobblogender","cogender","cogitogender","colorgender","contigender","contragender","contrastgender","coric","corugender","cosmicgender","cosmosflux","cuavgender","daimogender","demiagender","demiandrogyne","demibigender","demiboy","demifemme","demifluid","demifluidflux","demiflux","demigender","demigirl","demimascandrogyneflux","demimaverique","diastasi","didgender","dimittorte","distentagender","domgender","dryagender","dualgender","dubsgender","eafluid","earthgender","egogender","electrogender","enigender","epicene","ergender","ethale","ethegender","eunuch","exclusivegenders","explorogender","faegender","faesari","fegender","femache","femme","ferusgender","flowergender","fluidception","fluidflux","fluxstatic","foggender","foodgender","foxkinsuperqueer","fractalgender","frigusgender","froggender","ftn","ftx","furgender","gardenian","genderagnostic","genderapathetic","gendercasual","genderdoe","genderfaer","genderfake","genderfaun","genderfaunet","genderflor","genderfloren","genderfluid","genderflux","genderfree","genderfree","gendergender","genderneutral","genderplush","genderqueer","gendersensitive","genderspike","genderstill","gendervoid","genderwhat","genre-gender","girlflux","glassgender","greygender","gxrl","hijra","hydrangeaflux","iceboy","ilyagender","inceptogender","incligender","intensigender","intergender","intrafeminflux","ipsogender","isogender","juxera","ketugender","kevgender","khanith","kidcoric","ktulugender","legogender","librafeminine","libragender","libramasculine","libranonbinary","linkgender","littlefluid","lolgender","ludogender","lunagender","lunarian","magigender","marfluid","maricagender","mascflux","maverique","mekangender","metagender","miaspec","mingender","mirrorgender","multiflux","multigender","musegender","mutogender","muxe","nanogender","nebulagender","neoboy","neogirl","nesciogender","neurogender","neuter","neutrafemale","neutramale","neutrandrogyne","neutrois","neutroisflux","ningender","niveigender","nocturnalgender","nonbinaryflux","nulhuegender","nullgender","nuncgender","nyctogender","nymphgender","octogender","offgender","opti-genitalia-queer","orientationgender","othergender","pangender","paraboy","parafluidflux","paragender","paragirl","pendogender","perigender","pichugender","plastigender","plerugender","pluiettefluid","plurigender","pocketgender","prin*gender","proxvir","quoigender","salmacian","scorpigender","sekhet","stargender","staticgender","systemfluid","systemgender","trigender","unisex","virgender","xenogender","xirl"];
TrainingData.german_forenames = ["achim","adele","adelheid","adolf","adrian","agnes","albert","alfred","alina","almut","alois","alvin","alwin","amalia","amelia","andrea","andreas","angelika","anna","annaliese","anneliese","annelise","ansgar","anton","armin","arndt","arnold","astrid","august","aurick","axel","barbara","bastian","beat","beata","benedikt","bernd","bertram","bianka","bodo","bruno","carl","carolina","caroline","cassandra","charlotte","christa","christel","christian","christof","claudia","colby","colton","corey","corina","dagmar","dagobert","daniel","david","diana","diedrich","dieter","dieterich","dietrich","donald","dustin","edith","edmund","eilhard","ekkehard","elfriede","elke","elmar","elsa","emil","emilie","emily","emma","emmerich","erhard","eric","erika","estelle","esther","eva","ewald","felix","ferdinand","florian","frank","franz","frauke","frederick","fredrik","friedemann","friedrich","fritz","gabriele","gebhard","georg","gerald","gerard","gerd","gerhardt","germar","gernot","gert","gertrude","gilbert","gisela","giselher","gottfried","gottlieb","gottschalk","greta","gretchen","grete","gretel","guido","gunther","götz","günther","hannah","hanne","hannelore","hans","harald","harold","hedy","heidemarie","heidi","heiner","heini","heino","heinrich","heinz","helena","helga","helge","hellmuth","helmut","helmuth","herbert","herman","hermann","hermine","herwig","hilda","hilde","hildegard","hilma","holger","horst","hubert","hunter","ilona","imelda","ingo","ingrid","irma","isa","isabella","jacob","jacqueline","jana","jermaine","jerome","joachim","johann","johanna","johannes","jonas","jonathan","joseph","jost","julia","jupp","jutta","jörg","jürgen","karin","karl","karlheinz","karsten","katja","katrin","katya","kerstin","kevin","klaus","klaus-peter","konrad","kurt","ladislaus","lars","lena","levin","liana","liesl","lina","lisbeth","lorentz","lothar","louella","louise","ludwig","lukas","lutz","lydia","lütold","magdalena","malte","malvina","manuel","marcus","margarete","maria","marianne","marina","mario","marius","marlene","marta","martin","matthias","maximilian","medard","meinrad","melvin","michaela","michel","michelle","milo","minna","miranda","mirco","miriam","mirko","mona","monika","moritz","nadine","nanne","natalie","nicolas","nicolaus","nicole","nikola","nina","nivaldo","olaf","olga","olivia","ortrud","oscar","othmar","otto","ottomar","patrick","paul","peter","philip","philipp","philippa","rachel","rainer","ralph","ramona","randall","reinhard","reinhold","richard","richenza","robert","roberta","robin","roger","rolf","roman","ronald","rosina","rudolph","rut","sabine","samuel","sander","sandra","sebastian","selma","severin","sheryl","siegfried","sigismund","sigmund","stefania","stephen","susanne","sven","svenja","sylvester","tamara","thomas","timo","tina","tobias","tom","udo","ulrich","ulrike","ursula","ute","utto","uwe","valter","veronica","victoria","viola","vollrath","walter","wenzel","werner","wernher","wiebke","wilhelm","wilhelmina","william","wiltrud","winfried","wolf","wolfgang","xenia","yvette"];
TrainingData.german_towns = ["aach","aachen","aalen","abenberg","abensberg","achern","achim","adelsheim","adenau","adorf","ahaus","ahlen","ahrensburg","aichach","aichtal","aken","albstadt","alfeld","allendorf","allstedt","alpirsbach","alsdorf","alsfeld","alsleben","altdorf","altena","altenberg","altenburg","altenkirchen","altensteig","altentreptow","altlandsberg","altötting","alzenau","alzey","amberg","amorbach","amöneburg","andernach","angermünde","anklam","annaberg","annaburg","annweiler","ansbach","apolda","arendsee","arneburg","arnis","arnsberg","arnstadt","arnstein","arnstein","artern","arzberg","aschaffenburg","aschersleben","asperg","attendorn","aub","aue","auerbach","auerbach","augsburg","augustusburg","aulendorf","auma","aurich","aßlar","babenhausen","bacharach","backnang","baden","baesweiler","baiersdorf","balingen","ballenstedt","balve","bamberg","barby","bargteheide","barmstedt","barntrup","barsinghausen","barth","baruth","bassum","battenberg","baumholder","baunach","baunatal","bautzen","bayreuth","bebra","beckum","bedburg","beelitz","beerfelden","beeskow","beilngries","beilstein","belgern","bendorf","bensheim","berching","berga","bergen","bergen","bergheim","bergisch","bergkamen","bergneustadt","berka","berlin","bernau","bernburg","bernkastel","bernsdorf","bernstadt","bersenbrück","besigheim","betzdorf","betzenstein","beverungen","bexbach","biberach","biedenkopf","bielefeld","biesenthal","bietigheim","billerbeck","bingen","birkenfeld","bischofsheim","bischofswerda","bismark","bitburg","bitterfeld","blankenburg","blankenhain","blaubeuren","blaustein","bleckede","bleicherode","blieskastel","blomberg","blumberg","bobingen","bocholt","bochum","bockenem","bodenwerder","bogen","boizenburg","bonn","bonndorf","bopfingen","boppard","borgentreich","borgholzhausen","borken","borken","borkum","borna","bornheim","bottrop","boxberg","brackenheim","brake","brakel","bramsche","brand","brandenburg","brandis","braubach","braunfels","braunlage","braunsbedra","braunschweig","breckerfeld","bredstedt","breisach","bremen","bremerhaven","bremervörde","bretten","breuberg","brilon","brotterode","bruchköbel","bruchsal","brunsbüttel","bräunlingen","brück","brüel","brühl","brüssow","buchen","buchholz","buchloe","buckow","burg","burg","burgau","burgbernheim","burgdorf","burghausen","burgkunstadt","burglengenfeld","burgstädt","burgwedel","burladingen","burscheid","buttelstedt","buttstädt","butzbach","buxtehude","bärnau","böblingen","böhlen","bönnigheim","bückeburg","büdelsdorf","büdingen","bühl","bünde","büren","bürgel","bürstadt","bützow","calau","calbe","calw","castrop","celle","cham","chemnitz","clausthal","clingen","cloppenburg","coburg","cochem","coesfeld","colditz","cologne","coswig","coswig","cottbus","crailsheim","creglingen","creuzburg","creußen","crimmitschau","crivitz","cuxhaven","dachau","dahlen","dahme","dahn","damme","dannenberg","dargun","darmstadt","dassel","dassow","datteln","daun","deggendorf","deidesheim","delbrück","delitzsch","delmenhorst","demmin","dessau","detmold","dettelbach","dieburg","diemelstadt","diepholz","dierdorf","dietenheim","dietfurt","dietzenbach","diez","dillenburg","dillingen","dillingen","dingelstädt","dingolfing","dinkelsbühl","dinklage","dinslaken","dippoldiswalde","dissen","ditzingen","doberlug","dohna","dommitzsch","donaueschingen","donauwörth","donzdorf","dorfen","dormagen","dornburg","dornhan","dornstetten","dorsten","dortmund","dransfeld","drebkau","dreieich","drensteinfurt","dresden","drolshagen","duderstadt","duisburg","döbeln","döbern","dömitz","dülmen","düren","düsseldorf","ebeleben","eberbach","ebermannstadt","ebern","ebersbach","ebersbach","ebersberg","eberswalde","eckartsberga","eckernförde","edenkoben","egeln","eggenfelden","eggesin","ehingen","ehrenfriedersdorf","eibelstadt","eibenstock","eichstätt","eilenburg","einbeck","eisenach","eisenberg","eisenberg","eisenhüttenstadt","eisfeld","eisleben","eislingen","ellingen","ellrich","ellwangen","elmshorn","elsdorf","elsfleth","elsterberg","elsterwerda","elstra","elterlein","eltmann","eltville","elzach","elze","emden","emmelshausen","emmendingen","emmerich","emsdetten","endingen","engen","enger","ennepetal","ennigerloh","eppelheim","eppingen","eppstein","erbach","erbach","erbendorf","erding","erftstadt","erfurt","erkelenz","erkner","erkrath","erlangen","erlenbach","erlensee","erwitte","eschborn","eschenbach","eschershausen","eschwege","eschweiler","esens","espelkamp","essen","esslingen","ettenheim","ettlingen","euskirchen","eutin","falkenberg","falkensee","falkenstein","falkenstein","fehmarn","fellbach","felsberg","feuchtwangen","filderstadt","finsterwalde","fladungen","flensburg","florstadt","flöha","flörsheim","forchheim","forchtenberg","forst","frankenau","frankenberg","frankenberg","frankenthal","frankfurt","frankfurt","franzburg","frauenstein","frechen","freiberg","freiberg","freiburg","freilassing","freinsheim","freising","freital","freren","freudenberg","freudenberg","freudenstadt","freyburg","freystadt","freyung","fridingen","friedberg","friedberg","friedland","friedland","friedrichroda","friedrichsdorf","friedrichshafen","friedrichstadt","friedrichsthal","friesack","friesoythe","fritzlar","frohburg","fröndenberg","fulda","furth","furtwangen","fürstenau","fürstenberg","fürstenfeldbruck","fürstenwalde","fürth","füssen","gadebusch","gaggenau","gaildorf","gammertingen","garbsen","garching","gardelegen","garding","gartz","garz","gau","gebesee","gedern","geesthacht","geestland","gefell","gefrees","gehrden","gehren","geilenkirchen","geisa","geiselhöring","geisenfeld","geisenheim","geisingen","geislingen","geislingen","geithain","geldern","gelnhausen","gelsenkirchen","gemünden","gemünden","gengenbach","genthin","georgsmarienhütte","gera","gerabronn","gerbstedt","geretsried","geringswalde","gerlingen","germering","germersheim","gernsbach","gernsheim","gerolstein","gerolzhofen","gersfeld","gersthofen","gescher","geseke","gevelsberg","geyer","giengen","gießen","gifhorn","ginsheim","gladbeck","gladenbach","glashütte","glauchau","glinde","glücksburg","glückstadt","gnoien","goch","goldberg","goldkronach","golßen","gommern","goslar","gotha","grabow","grafenau","grafenwöhr","grafing","gransee","grebenau","grebenstein","greding","greifswald","greiz","greußen","greven","grevenbroich","grevesmühlen","griesheim","grimma","grimmen","groitzsch","gronau","gronau","groß","groß","groß","großalmerode","großbottwar","großbreitenbach","großenehrich","großenhain","großräschen","großröhrsdorf","großschirma","gräfenberg","gräfenhainichen","gräfenthal","gröditz","gröningen","grünberg","grünhain","grünsfeld","grünstadt","guben","gudensberg","gummersbach","gundelfingen","gundelsheim","gunzenhausen","göppingen","görlitz","göttingen","gößnitz","güglingen","günzburg","güsten","güstrow","gütersloh","gützkow","haan","hachenburg","hadamar","hagen","hagenbach","hagenow","haiger","haigerloch","hainichen","haiterbach","halberstadt","haldensleben","halle","halle","hallenberg","hallstadt","haltern","halver","hamburg","hameln","hamm","hammelburg","hamminkeln","hanau","hanover","harburg","hardegsen","haren","harsewinkel","hartenstein","hartha","harzgerode","haselünne","haslach","hattersheim","hattingen","hatzfeld","hausach","hauzenberg","havelberg","havelsee","hayingen","haßfurt","hechingen","hecklingen","heide","heideck","heidelberg","heidenau","heidenheim","heilbad","heilbronn","heiligenhafen","heiligenhaus","heilsbronn","heimbach","heimsheim","heinsberg","heitersheim","heldrungen","helmbrechts","helmstedt","hemau","hemer","hemmingen","hemmoor","hemsbach","hennef","hennigsdorf","heppenheim","herbolzheim","herborn","herbrechtingen","herbstein","herdecke","herdorf","herford","heringen","heringen","hermeskeil","hermsdorf","herne","herrenberg","herrieden","herrnhut","hersbruck","herten","herzberg","herzberg","herzogenaurach","herzogenrath","hessisch","hessisch","hettingen","hettstedt","heubach","heusenstamm","hilchenbach","hildburghausen","hilden","hildesheim","hillesheim","hilpoltstein","hirschau","hirschberg","hirschhorn","hitzacker","hochheim","hockenheim","hof","hofgeismar","hofheim","hofheim","hohen","hohenberg","hohenleuben","hohenmölsen","hohenstein","hohnstein","hollfeld","holzgerlingen","holzminden","homberg","homberg","homburg","horb","horn","hornbach","hornberg","horstmar","hoya","hoyerswerda","hungen","husum","höchstadt","höchstädt","höhr","hörstel","höxter","hückelhoven","hückeswagen","hüfingen","hünfeld","hürth","ibbenbüren","ichenhausen","idar","idstein","illertissen","ilmenau","ilsenburg","ilshofen","immenhausen","immenstadt","ingelfingen","ingelheim","ingolstadt","iphofen","iserlohn","isny","isselburg","itzehoe","jarmen","jena","jerichow","jessen","jever","joachimsthal","johanngeorgenstadt","jöhstadt","jülich","jüterbog","kaarst","kahla","kaisersesch","kaiserslautern","kalbe","kalkar","kaltenkirchen","kaltennordheim","kamen","kamenz","kamp","kandel","kandern","kappeln","karben","karlsruhe","karlstadt","kassel","kastellaun","katzenelnbogen","kaub","kaufbeuren","kehl","kelbra","kelheim","kelkheim","kellinghusen","kelsterbach","kemberg","kemnath","kempen","kempten","kenzingen","kerpen","ketzin","kevelaer","kiel","kierspe","kindelbrück","kirchberg","kirchberg","kirchberg","kirchen","kirchenlamitz","kirchhain","kirchheim","kirchheimbolanden","kirn","kirtorf","kitzingen","kitzscher","kleve","klingenberg","klingenthal","klötze","klütz","knittlingen","koblenz","kohren","kolbermoor","konstanz","konz","korbach","korntal","kornwestheim","korschenbroich","kraichtal","krakow","kranichfeld","krautheim","krefeld","kremmen","krempe","kreuztal","kronach","kronberg","kroppenstedt","krumbach","kröpelin","kulmbach","kupferberg","kuppenheim","kusel","kyllburg","kyritz","kölleda","königs","königsberg","königsbrunn","königsbrück","königsee","königslutter","königstein","königstein","königswinter","könnern","köthen","kühlungsborn","külsheim","künzelsau","laage","laatzen","ladenburg","lage","lahnstein","lahr","laichingen","lambrecht","lampertheim","landau","landau","landsberg","landsberg","landshut","landstuhl","langelsheim","langen","langenau","langenburg","langenfeld","langenhagen","langenselbold","langenzenn","langewiesen","lassan","laubach","laucha","lauchhammer","lauchheim","lauda","lauenburg","lauf","laufen","laufenburg","lauffen","lauingen","laupheim","lauscha","lauta","lauter","lauterbach","lauterecken","lauterstein","lebach","lebus","leer","lehesten","lehrte","leichlingen","leimen","leinefelde","leinfelden","leipheim","leipzig","leisnig","lemgo","lengenfeld","lengerich","lennestadt","lenzen","leonberg","leun","leuna","leutenberg","leutershausen","leutkirch","leverkusen","lich","lichtenau","lichtenau","lichtenberg","lichtenfels","lichtenfels","lichtenstein","liebenau","liebenwalde","lieberose","liebstadt","limbach","limburg","lindau","linden","lindenberg","lindenfels","lindow","lingen","linnich","linz","lippstadt","lohmar","lohne","lohr","loitz","lollar","lommatzsch","lorch","lorch","lorsch","lucka","luckau","luckenwalde","ludwigsburg","ludwigsfelde","ludwigshafen","ludwigslust","ludwigsstadt","lugau","lunzenau","lychen","löbau","löffingen","löhne","löningen","lörrach","löwenstein","lößnitz","lübbecke","lübben","lübbenau","lübeck","lübtheen","lübz","lüchow","lüdenscheid","lüdinghausen","lügde","lüneburg","lünen","lütjenburg","lützen","magdala","magdeburg","mahlberg","mainbernheim","mainburg","maintal","mainz","malchin","malchow","manderscheid","mannheim","mansfeld","marbach","marburg","marienberg","marienmünster","markdorf","markgröningen","markkleeberg","markneukirchen","markranstädt","marktbreit","marktheidenfeld","marktleuthen","marktoberdorf","marktredwitz","marktsteft","marl","marlow","marne","marsberg","maulbronn","maxhütte","mayen","mechernich","meckenheim","medebach","meerane","meerbusch","meersburg","meinerzhagen","meiningen","meisenheim","meißen","meldorf","melle","mellrichstadt","melsungen","memmingen","menden","mendig","mengen","meppen","merkendorf","merseburg","merzig","meschede","mettmann","metzingen","meuselwitz","meyenburg","meßkirch","meßstetten","michelstadt","miesbach","miltenberg","mindelheim","minden","mirow","mittenwalde","mitterteich","mittweida","moers","monheim","monheim","monschau","montabaur","moosburg","moringen","mosbach","munderkingen","munich","munster","murrhardt","mylau","märkisch","möckern","möckmühl","mölln","mönchengladbach","mörfelden","mössingen","mücheln","mügeln","mühlacker","mühlberg","mühldorf","mühlhausen","mühlheim","mühlheim","mülheim","mülheim","müllheim","müllrose","münchberg","müncheberg","münchenbernsdorf","münnerstadt","münsingen","münster","münstermaifeld","münzenberg","nabburg","nagold","naila","nassau","nastätten","nauen","naumburg","naumburg","naunhof","nebra","neckarbischofsheim","neckargemünd","neckarsteinach","neckarsulm","neresheim","netphen","nettetal","netzschkau","neu","neu","neu","neubrandenburg","neubukow","neubulach","neuburg","neudenau","neuenburg","neuenbürg","neuenhaus","neuenrade","neuenstadt","neuenstein","neuerburg","neuffen","neuhaus","neukalen","neukirchen","neukirchen","neukloster","neumark","neumarkt","neumarkt","neumünster","neunburg","neunkirchen","neuruppin","neusalza","neuss","neustadt","neustadt","neustadt","neustadt","neustadt","neustadt","neustadt","neustadt","neustadt","neustadt","neustadt","neustadt","neustadt","neustrelitz","neusäß","neutraubling","neuwied","neuötting","nidda","niddatal","nidderau","nideggen","niebüll","niedenstein","nieder","niederkassel","niedernhall","niederstetten","niederstotzingen","nieheim","niemegk","nienburg","nienburg","nierstein","niesky","nittenau","norden","nordenham","norderney","norderstedt","nordhausen","nordhorn","northeim","nortorf","nossen","nuremberg","nördlingen","nürtingen","ober","oberasbach","oberharz","oberhausen","oberhof","oberkirch","oberkochen","oberlungwitz","obermoschel","obernburg","oberndorf","obernkirchen","oberriexingen","obertshausen","oberursel","oberviechtach","oberweißbach","oberwesel","oberwiesenthal","ochsenfurt","ochsenhausen","ochtrup","oderberg","oebisfelde","oederan","oelde","oelsnitz","oelsnitz","oer","oerlinghausen","oestrich","oettingen","offenbach","offenburg","ohrdruf","olbernhau","olching","oldenburg","oldenburg","olfen","olpe","olsberg","oppenau","oppenheim","oranienbaum","oranienburg","orlamünde","ornbau","ortenberg","ortrand","oschatz","oschersleben","osnabrück","osterburg","osterburken","osterfeld","osterhofen","osterholz","osterode","osterwieck","ostfildern","ostheim","osthofen","ostritz","otterberg","otterndorf","ottweiler","overath","owen","paderborn","papenburg","pappenheim","parchim","parsberg","pasewalk","passau","pattensen","pausa","pegau","pegnitz","peine","peitz","penig","penkun","penzberg","penzlin","perleberg","petershagen","pfaffenhofen","pfarrkirchen","pforzheim","pfreimd","pfullendorf","pfullingen","pfungstadt","philippsburg","pinneberg","pirmasens","pirna","plattling","plau","plaue","plauen","plettenberg","pleystein","plochingen","plön","pockau","pocking","pohlheim","polch","porta","potsdam","pottenstein","preetz","premnitz","prenzlau","pressath","preußisch","prichsenstadt","pritzwalk","prüm","puchheim","pulheim","pulsnitz","putbus","putlitz","pößneck","püttlingen","quakenbrück","quedlinburg","querfurt","quickborn","rabenau","radeberg","radebeul","radeburg","radevormwald","radolfzell","raguhn","rahden","rain","ramstein","ranis","ransbach","rastatt","rastenberg","rathenow","ratingen","ratzeburg","rauenberg","raunheim","rauschenberg","ravensburg","ravenstein","recklinghausen","rees","regen","regensburg","regis","rehau","rehburg","rehna","reichelsheim","reichenbach","reichenbach","reinbek","reinfeld","reinheim","remagen","remda","remscheid","remseck","renchen","rendsburg","rennerod","renningen","rerik","rethem","reutlingen","rheda","rhede","rheinau","rheinbach","rheinberg","rheinböllen","rheine","rheinfelden","rheinsberg","rheinstetten","rhens","rhinow","ribnitz","richtenberg","riedenburg","riedlingen","riedstadt","rieneck","riesa","rietberg","rinteln","rochlitz","rockenhausen","rodalben","rodenberg","rodewisch","rodgau","roding","romrod","ronneburg","ronnenberg","rosbach","rosenfeld","rosenheim","rosenthal","rostock","rotenburg","rotenburg","roth","rothenburg","rothenburg","rothenfels","rottenburg","rottenburg","rottweil","roßleben","roßwein","rudolstadt","ruhla","ruhland","runkel","rutesheim","röbel","rödental","rödermark","römhild","rösrath","rötha","röthenbach","röttingen","rötz","rüdesheim","rüsselsheim","rüthen","saalburg","saalfeld","saarbrücken","saarburg","saarlouis","sachsenhagen","sachsenheim","salzgitter","salzkotten","salzwedel","sandau","sandersdorf","sangerhausen","sankt","sankt","sankt","sarstedt","sassenberg","sassnitz","sayda","schalkau","schauenstein","scheer","scheibenberg","scheinfeld","schelklingen","schenefeld","scheßlitz","schieder","schifferstadt","schillingsfürst","schiltach","schirgiswalde","schkeuditz","schkölen","schleiden","schleiz","schleswig","schlettau","schleusingen","schlieben","schlitz","schlotheim","schloß","schlüchtern","schlüsselfeld","schmalkalden","schmallenberg","schmölln","schnackenburg","schnaittenbach","schneeberg","schneverdingen","schongau","schopfheim","schorndorf","schortens","schotten","schramberg","schraplau","schriesheim","schrobenhausen","schrozberg","schwaan","schwabach","schwabmünchen","schwaigern","schwalbach","schwalmstadt","schwandorf","schwanebeck","schwarzenbach","schwarzenbach","schwarzenbek","schwarzenberg","schwarzenborn","schwarzheide","schwedt","schweich","schweinfurt","schwelm","schwentinental","schwerin","schwerte","schwetzingen","schwäbisch","schwäbisch","schömberg","schönau","schönau","schönberg","schönebeck","schöneck","schönewalde","schöningen","schönsee","schönwald","schöppenstedt","schüttorf","sebnitz","seehausen","seeland","seelow","seelze","seesen","sehnde","seifhennersdorf","selb","selbitz","seligenstadt","selm","selters","senden","sendenhorst","senftenberg","seßlach","siegburg","siegen","sigmaringen","simbach","simmern","sindelfingen","singen","sinsheim","sinzig","soest","solingen","solms","soltau","sondershausen","sonneberg","sonnewalde","sonthofen","sontra","spaichingen","spalt","spangenberg","speicher","spenge","speyer","spremberg","springe","sprockhövel","stade","stadt","stadtallendorf","stadtbergen","stadthagen","stadtilm","stadtlengsfeld","stadtlohn","stadtoldendorf","stadtprozelten","stadtroda","stadtsteinach","starnberg","staufen","staufenberg","stavenhagen","staßfurt","stein","steinach","steinau","steinbach","steinbach","steinfurt","steinheim","steinheim","stendal","sternberg","stockach","stolberg","stollberg","stolpen","storkow","straelen","stralsund","strasburg","straubing","strausberg","strehla","stromberg","stutensee","stuttgart","stößen","stühlingen","suhl","sulingen","sulz","sulzbach","sulzbach","sulzburg","sundern","syke","sömmerda","südliches","süßen","tambach","tangerhütte","tangermünde","tann","tanna","tauberbischofsheim","taucha","taunusstein","tecklenburg","tegernsee","telgte","teltow","templin","tengen","tessin","teterow","tettnang","teublitz","teuchern","teupitz","teuschnitz","thale","thalheim","thannhausen","tharandt","themar","thum","tirschenreuth","titisee","tittmoning","todtnau","torgau","torgelow","tornesch","traben","traunreut","traunstein","trebbin","trebsen","treffurt","trendelburg","treuchtlingen","treuen","treuenbrietzen","triberg","tribsees","trier","triptis","trochtelfingen","troisdorf","trossingen","trostberg","tuttlingen","twistringen","töging","tönisvorst","tönning","tübingen","uebigau","ueckermünde","uelzen","uetersen","uffenheim","uhingen","ulm","ulmen","ulrichstein","ummerstadt","unkel","unna","unterschleißheim","usedom","usingen","uslar","vacha","vaihingen","vallendar","varel","vechta","velbert","velburg","velden","velen","vellberg","vellmar","velten","verden","veringenstadt","verl","versmold","vetschau","viechtach","viernheim","viersen","villingen","vilsbiburg","vilseck","vilshofen","visselhövede","vlotho","voerde","vogtsburg","vohburg","vohenstrauß","volkach","volkmarsen","vreden","vöhrenbach","vöhringen","völklingen","wachenheim","wadern","waghäusel","wahlstedt","waiblingen","waibstadt","waischenfeld","waldbröl","waldeck","waldenbuch","waldenburg","waldenburg","waldershof","waldheim","waldkappel","waldkirch","waldkirchen","waldkraiburg","waldmünchen","waldsassen","waldshut","walldorf","walldürn","wallenfels","walsrode","waltershausen","waltrop","wanfried","wangen","wanzleben","warburg","waren","warendorf","warin","warstein","wassenberg","wasserburg","wassertrüdingen","wasungen","wedel","weener","wegberg","wegeleben","wehr","weida","weiden","weikersheim","weil","weil","weilburg","weilheim","weilheim","weimar","weingarten","weinheim","weinsberg","weinstadt","weismain","weiterstadt","weißenberg","weißenburg","weißenfels","weißenhorn","weißensee","weißenstadt","weißenthurm","weißwasser","welzheim","welzow","wemding","wendlingen","werben","werdau","werder","werdohl","werl","wermelskirchen","wernau","werne","werneuchen","wernigerode","wertheim","werther","wertingen","wesel","wesenberg","wesselburen","wesseling","westerburg","westerstede","wetter","wetter","wettin","wetzlar","widdern","wiehe","wiehl","wiesbaden","wiesensteig","wiesloch","wiesmoor","wildau","wildberg","wildenfels","wildeshausen","wilhelmshaven","wilkau","willebadessen","willich","wilsdruff","wilster","wilthen","windischeschenbach","windsbach","winnenden","winsen","winterberg","wipperfürth","wirges","wismar","wissen","witten","wittenberg","wittenberge","wittenburg","wittichenau","wittingen","wittlich","wittmund","wittstock","witzenhausen","woldegk","wolfach","wolfenbüttel","wolfhagen","wolframs","wolfratshausen","wolfsburg","wolfstein","wolgast","wolkenstein","wolmirstedt","worms","wriezen","wunsiedel","wunstorf","wuppertal","wurzbach","wurzen","wustrow","wyk","wächtersbach","wörrstadt","wörth","wörth","wörth","wülfrath","würselen","würzburg","xanten","zahna","zarrentin","zehdenick","zeil","zeitz","zell","zell","zell","zella","zerbst","zeulenroda","zeven","ziegenrück","zierenberg","ziesar","zirndorf","zittau","zossen","zschopau","zweibrücken","zwenkau","zwickau","zwiesel","zwingenberg","zwönitz","zörbig","zülpich","öhringen","östringen","übach","überlingen"];
TrainingData.graphical_methods = ["airfieldtrafficpatterndiagram","areachart","autocorrelationplot","autostereogram","barchart","binarydecisiondiagram","biplot","bodeplot","boxplot","bulletgraph","businessmethods","carnotplot","causalityloopdiagram","chernofffaces","circuitdiagram","cladogram","conceptmapping","conceptualgraph","controlchart","controlflowgraph","craigretroazimuthalprojection","dalitzplot","dataflowdiagram","dispersionfandiagram","dymaxionmap","eadiehofsteediagram","edgeworthbox","entityrelationshipdiagram","fanchart","feynmandiagram","fitnesslandscape","flowchart","forestplot","freebodydiagram","functionalflowblockdiagram","funnelplot","galbraithplot","ganttchart","graphicalprojection","greningerchart","growthsharematrix","hammerretroazimuthalprojection","heatmap","hintondiagram","histogram","informationflowdiagram","ishikawadiagram","isometricprojection","karnaughdiagram","linechart","lineweaverburkediagram","logarithmicgraphpaper","mapprojection","mindmapping","mohrscircle","mosaicplot","multidimensionalscaling","nomogram","normalprobabilityplot","npchart","nyquistplot","onelinediagram","orthographicprojection","pantograph","parametricplot","paretochart","pchart","perspective","phasediagram","piechart","plotting","poincareplot","populationpyramid","predominancediagram","probabilityplot","radarchart","ramachandranplot","rankit","recurrenceplot","robinsonprojection","runchart","sankeydiagram","scatterplot","seasonalsubseriesplot","sentencediagram","skewplot","smithchart","sparkline","statediagram","stemplot","stereographicprojection","systemcontextdiagram","systemsanalysis","systemsbiologygraphicalnotation","tagcloud","technicaldrawing","ternaryplot","topographicmap","treemapping","treestructure","ulamspiral","venndiagram","violinplot","vmodel","waterfallchart","wavenumberfrequencydiagram","weathermap","wordcloud","workbreakdownstructure"];
TrainingData.greek_islands = ["aegina","agathonissi","agiaeirini","agistri","agreloussa","agriomandra","aitoliko","alimia","alonissos","ammouliani","amorgos","anafi","ananes","anavatis","andros","antikythera","antimilos","antiparos","antipaxi","antipsara","antitilos","antitrikeri","arefoussa","arhangelos","arkoi","arkoudi","armathia","arnaouti","artemis","askania","astakida","astypalaia","atalanti","atokos","avgo","cephalonia","chios","chrysi","corfu","crete","dasia","daskaleia","delos","despotiko","dia","diaplo","diapori","dionysades","dokos","dolmas","donoussa","dragonada","drakonera","elafonisi","elafonisos","elafonissos","elasa","ereikoussa","erinia","eschati","euboea","falkonera","faradonesia","farmakonisi","fleves","fokionissia","folegandros","fotia","fragos","gaidouronisi","gavdopoula","gavdos","gianysada","gioura","glaronisi","glaronisi","grammeza","gramvoussa","grandes","gyali","gyaros","halavra","halki","hersonisi","hondro","hristiana","htenies","hydra","ikaria","imia","ios","iraklia","ithaca","ithaki","kalamos","kalogiros","kalogiros","kalolimnos","kalovolos","kalydon","kalymnos","kamilonisi","kandeloussa","karavi","kardak","kardiotissa","karga","karlonisi","karpathos","kasos","kastellorizo","kastos","katergo","kavalliani","kavallos","kea","kefali","kefalonia","kelifos","keros","kimolos","kinaros","kitriani","kleisova","kolokythas","kos","koubelonisi","koufonisi","koufonisia","kouloundros","kounoupoi","koursaroi","koutsomytis","kramvoniss","kravia","kyriamadi","kythira","kythnos","kythros","lagousa","lamprinos","lazaretta","lazaretto","lefkada","leipsoi","lekhoussa","lemnos","leon","leros","lesbos","levitha","lichades","lithari","loutro","madouri","makares","makri","makronissos","makropoula","makroulo","mandilou","manolia","marathos","marmaras","marmaro","mathraki","mavros","megalo","megalonisi","meganisi","megatzedes","mikronisi","milos","mochlos","mykonos","naxos","nero","nikolos","nikouria","nimos","nisyros","oinousses","omfori","othonoi","oxeia","palaiosouda","papadoplaka","paros","pasas","patmos","patroklou","paxi","paximada","paximadaki","paximadia","pergoussa","peristera","peristeri","peristerovrachoi","petalas","petalida","petalioi","petalouda","piganoussa","piperi","pistros","pitta","platia","polyaigos","pontikaki","pontikonisi","pontikos","pontikoussa","poros","prasokissamou","prasonisi","prasouda","prokopanistos","prosfora","provati","psara","psarocharako","psathoura","pseira","pserimos","psili","psyllos","psyttaleia","repio","revythoussa","rhineia","rho","rhodos","romvi","safonidi","salamina","saliagos","samiopoula","samos","samothraki","santorini","sapientza","sarakino","saria","schistonisi","schiza","schoinoussa","seirina","serifopoula","serifos","sesklio","sideros","sifnos","sikinos","skandili","skantzoura","skiathos","skopelos","skorpidi","skorpios","skyropoula","skyros","sofia","souda","spetses","spetsopoula","sphacteria","spinalonga","stouronisi","strofades","stroggyli","strongyli","symi","syrna","syros","telendos","thasos","thera","thetis","thilia","thirasia","thymaina","tilos","tinos","tourlida","trachilos","trafos","tragonisi","tsougria","tsougriaki","valaxa","valenti","vasiladi","vidos","vous","vromonas","vryonisi","zaforas","zakynthos"];
TrainingData.herbs_common_names = ["alexanders","alkanet","alligatorpepper","allspice","angelica","anise","aniseedmyrtle ","annatto","artemisia","asafoetida","asarabacca","avens","avocadoleaf","barberry","bayleaf","bluefenugreek","bluemelilot","boldo","borage","caper","caraway ","cardamom","caromseeds","cassia","catnip","cayennepepper","celeryleaf","celeryseed","chervil","chicory","chilipepper","chives","cicely","cilantro","cinnamon","clary","clove","coriandergreens","corianderherb","corianderseed","costmary","cubebpepper","cudweed","culantro","cumin","curryleaf","curryplant","dillherb","dillseed","dillweed","elderflower","epazote","fennel","fenugreek","filepowder","fingerroot","galangal","galingale","garlicchives","ginger","golpar","holybasil","horseradish","huacatay","hyssop","jasmineflowers","juniperberry","keluak","kokamseed","koseretleaves","lavender","lemonbalm","lemonbasil","lemongrass","lemonironbark","lemonmyrtle","lemonthyme","lemonverbena","lessercalamint","licorice","limeflower","limeleaves","lindenflower","lovage","mace","marjoram","mastic","mint","muskmallow","mustardseed","nigella","nutmeg","olida","oregano","orrisroot","pandanflower","pandanleaf","paprika","paracress","parsley","pepper","peppermint","perilla","peruvianpepper","ricepaddyherb","rosemary","rue","safflower","saffron","sage","saladburnet","sassafras","savory","shiso","silphium","sorrel","spearmint","spikenard","staranise","sumac","sweetbasil","sweetwoodruff","tarragon","thaibasil","thyme","turmeric","vanilla","wasabi","watercress","wattleseed","wildthyme","willowherb","wintergreen","woodruff","wormwood","yarrow"];
TrainingData.hindu_deities = ["aakash","acyutah","adimurti","aditi","adityas","agni","ammavaru","anala","anila","anumati","anuradha","aranyani","aravan","ardhanari","ardra","arjuna","aruna","arundhati","aryadurga","aryaman","ashapura","aslesais","asura","asvayujau","aswiniis","ayyanar","ayyappan","ayyavaikundar","bagalamukhi","balaji","balambika","balarama","beeralingeswara","bhadra","bhadrakali","bhaga","bhairava","bhairavi","bharani","bharati","bhavani","bhishma","bhumidevi","bhumiya","bhutamata","bhuvaneshvari","brahma","brahman","brahmani","brihaspati","buddha","buddhi","budha","chamunda","chandra","chathan","chhinnamasta","chitragupta","daksha","dakshayani","danu","dattatreya","deva","devi","devnarayan","dhanvantari","dhara","dharma","dharma","dhatri","dhumavati","diti","draupadi","durga","ganesha","ganga","ganga","garuda","gayatri","ghanshyam","gusainji","hanuman","hanuman","hari","hrishikesh","indra","indrani","iravant","iravat","jagaddhatri","jagannath","jhulelal","jumadi","jyotiba","kali","kalki","kama","kamakhya","kamakshi","kamalatmika","kartikeya","kashyapa","kathyayini","ketu","khandoba","khatushyamji","khodiyar","kirata moorti","krishna","kubera","kumbhakarna","lakshman","lakshmi","lalitha","lambodar","mahakali","mahalasa","mahalaxmi","mahavidya","mahavishnu","mahesh","mallanna","manasa","mangala","manikanta","mariamman","mariamman","markandeya","maruts","matangi","matrikas","meenakshi","mhasoba","mitra","mohini","mookambika","mukyaprana","muneeswaran","muniandi","murugan","muthappan","muthyalamma","nandi","nandni","narada","narasimha","narayana","nataraja","nirrith","nirrta","nookambika","parashurama","parasiva","parjanya","parvati","pashupati","perumal","prajapati","prithvi","purusha","pushan","radha","radha","rahu","rama","ramnathi","ranganatha","rati","ratri","ravi","rbhus","renuka","revanta","rudra","samaleswari","saranyu","saraswati","saraswati","sati","savitar","savitr","sesha","shakti","shani","shantadurga","shitala","shiva","sita","skanda","soma","subrahmanya","surya","svaha","swaminarayan","tara","tejaji","tvashtri","ugratara","uma","urvashi","ushas","valli","vamana","varaha","varuna","vasu","vayu","veerabhadra","venkateshwara","vishnu","vishvaksena","vishwakarma","vithoba","vivasvat","yaksha","yakshini","yama","yami","yamini","yamuna","yellamma","yudhishthira"];
TrainingData.hobbies = ["acting","aircraftspotting","airsoft","airsports","amateurastronomy","amateurradio","americanfootball","animalfancy","antiquing","antiquities","aqualung","archery","artcollecting","associationfootball","astrology","astronomy","autoracing","backpacking","badminton","baseball","basejumping","basketball","batontwirling","batontwirling","beachvolleyball","beekeeping","billiards","birdwatching","blacksmithing","boardsports","boardgames","bodybuilding","bookcollecting","bookrestoration","bowling","boxing","breakdancing","bridge","busspotting","cabaret","calligraphy","camping","candlemaking","cardcollecting","cheerleading","chess","climbing","coffeeroasting","coincollecting","collectionhobbies","colorguard","coloring","computerprogramming","cooking","cosplaying","couponing","creativewriting","cricket","crocheting","crosswordpuzzles","cryptography","curling","cycling","dance","dancing","darts","debate","deltiology","digitalarts","discgolf","dogsport","dowsing","drama","drawing","driving","electronics","elementcollecting","embroidery","equestrianism","fantasysports","fashion","fencing","fieldhockey","figureskating","fishing","fishkeeping","flagfootball","flowerarranging","flying","flyingdisc","footbag","foraging","fossilhunting","gaming","gardening","genealogy","geocaching","ghosthunting","glassblowing","go","golfing","gongoozling","graffiti","gunsmithing","gymnastics","handball","herping","hiking","homebrewing","hooping","horsebackriding","hunting","icehockey","iceskating","indoors","inlineskating","insectcollecting","jewelrymaking","jigsawpuzzles","jogging","judo","juggling","kabaddi","kartracing","kayaking","kiteflying","kitesurfing","knapping","knifemaking","knifethrowing","knitting","lacemaking","lacrosse","lapidary","larping","lasertag","learning","legobuilding","letterboxing","lockpicking","luciddreaming","machining","macrame","magic","mahjong","marbles","martialarts","metaldetecting","metalworking","meteorology","microscopy","mineralcollecting","modelaircraft","modelbuilding","motorsports","mountaineering","mountainhiking","mycology","netball","nordicskating","orienteering","origami","paintball","painting","parkour","peoplewatching","photography","pigeonracing","poi","pokemongo","poker","polo","pottery","puzzles","quilting","racquetball","rafting","rappelling","reading","recordcollecting","roadbiking","rockbalancing","rockclimbing","rollerderby","rollerskating","rowing","rugby","running","sailing","sandart","satellitewatching","scouting","scrapbooking","scubadiving","sculling","sculpting","seashellcollecting","sewing","shooting","shootingsport","shopping","shortwavelistening","singing","skateboarding","sketching","skiing","skimboarding","skydiving","slacklining","slotcarracing","snowboarding","soapmaking","speedskating","squash","stampcollecting","stonecollecting","stoneskipping","surfing","swimming","tablefootball","tabletennis","taekwondo","taichi","taxidermy","tennis","topiary","tourskating","trainspotting","traveling","triathlon","urbanexploration","vacation","vehiclerestoration","videogaming","videophilia","vintagecars","volleyball","walking","watersports","websurfing","weightlifting","whalewatching","whittling","woodcarving","woodworking","worldbuilding","writing","yoga"];
TrainingData.home_appliances = ["airconditioner","airfryer","airioniser","aromalamp","atticfan","backboiler","barbecue","boxmangle","breadmaker","canopener","ceilingfan","cheesemelter","clothesdryer","clothesiron","coffeemaker","convectionoven","cornroaster","crepemaker","deepfryer","dishdrainer","dishwasher","espressomachine","fanheater","firepot","foodsteamer","futondryer","grill","hairdryer","hairiron","hotplate","humidifier","icebox","ironman","kettle","mangle","microwave","mousetrap","multicooker","oilheater","oven","oven","pancakemachine","patioheater","popcornmaker","pressurecooker","pressurefryer","radiator","refrigerator","ricecooker","ricepolisher","sandwichgrill","sandwichtoaster","sewingmachine","slowcooker","solarcooker","stove","stove","sumppump","television","tiepress","toaster","toasteroven","trouserpress","turkeyfryer","vacuumcleaner","vacuumfryer","waffleiron","washerdryer","washingmachine","waterboiler","watercooker","waterheater","windowfan"];
TrainingData.horses = ["adios","adiosbutler","affirmed","ajax","albatross","aldebaron","allezfrance","almondeye","alydar","americanpharoah","animalkingdom","archer","aristides","arkle","arrogate","assault","babieca","bambooharvester","barbaro","bayard","beholder","bennevis","bendor","bernborough","bestmate","bigben","bigbrown","bill","billy","blackbess","blackcaviar","blackjack","blackie","blackjack","blueskin","boldforbes","boldruler","boney","brethanover","brigadiergerard","brooklynsupreme","brownroan","bucephalus","buckpasser","burmese","burns","butler","buttermilk","californiachrome","captain","carbine","cardiganbay","castleshane","champion","charlemagne","chetak","cicero","cigar","cincinnati","citation","cleverhans","comanche","copenhagen","cornwall","countryhouse","crisp","curlin","danpatch","dancesmartly","danehill","danielwebster","darleyarabian","dawnrun","decatur","deepimpact","desertgold","desertorchid","dhūljānāḥ","dixie","dolly","donjuan","doncaster","drfager","duke","easygoer","eclipse","egypt","eightbelles","emanas","exterminator","fairplay","fancy","faughaballagh","favorito","figure","fire-eater","firefly","fleeter","fleetfoot","flybynight","flyingbolt","fox","frankel","funnycide","gainsborough","galileo","genuinerisk","gertie","gloaming","gomango","goldenmiller","goldsmithmaid","grandoldcanister","grape","greyeagle","greyhound","gunrock","hambletonian","handsomejoe","harry","hastings","hero","hickstead","highfly","hollywooddunit","huaso","huaso","hurricanefly","hyperion","illhaveanother","incitatus","invasor","irishwarcry","iroquois","isinglass","isonomy","jack","jasper","jaytrump","jeffdavis","jennie","jim","jinny","johnhenry","johnstown","justify","kalgoorliekid","kangaroo","kasztanka","kelso","kentuck","kincsem","kindergarten","king","kingphilip","kingston","kingstontown","kissingeorge","latroienne","lancer","lexington","littlesorrel","llamrei","lonesomeglory","longfellow","lookinatlucky","lookout","lottery","lucylong","mahubah","makybediva","manowar","marengo","marocco","mastercharlie","matsukaze","maximumsecurity","methuselah","midnight","midnightsun","mightandpower","milroy","milton","moifaa","moscow","mrprospector","muhamed","mymaryland","nasrullah","nativedancer","nearco","needles","nelliegray","nelson","niatross","nightraid","nobleflaire","northerndancer","oedipus","oldbaldy","oldbob","oldisham","oldjim","oldspot","orfevre","overdose","palomo","peterpan","pharlap","pleasantcolony","plugugly","pocohontas","popcorndeelites","potoooooooo","pretty","prettypolly","prince","prometea","queensway","quevega","rachelalexandra","radium","rambler","realquiet","reckless","redeye","redhare","redpepper","redrum","regret","ribot","richmond","rienzi","rifle","roanoke","rocksand","roderick","rondy","roundtable","royolcott","ruffian","ruggedlark","ruthless","sadlerswells","sampson","sardar","scamperprorodeo","seabird","seathestars","seabiscuit","seattleslew","secretariat","sefton","seldomseen","shergar","shiloh","silkysullivan","sirwinston","skewball","skylark","slicky","smartyjones","snowman","spectacularbid","steeldust","stormcat","streiff","sundaysilence","sunline","swale","tawee","tammany","tanya","tapwrit","tencendur","theduke","thunder","tiznow","tobey","tomtelegraph","tonalist","totilas","touchofclass","traveler","traveller","trigger","tuscalee","twentygrand","twolea","unbreakable","unbridled","unbridledssong","vain","valegro","varenne","veillantif","virginia","vorouge","voltaire","waradmiral","warofwill","warren","warrior","whirlaway","whiskbroomii","whistlejacket","winningcolors","winx","wisedan","xaar","xtraheat","yeats","yorkshire","yourhost","zabeel","zaccio","zenyatta","zev","zippopinebar","zippychippy","zuljanah"];
TrainingData.icelandic_forenames = ["aage","aagot","aaron","abel","abela","abigael","abraham","ada","adam","adda","addi","addú","addý","adel","adela","adelía","adrían","adríana","adríel","adíel","adólf","agata","agatha","agla","agnar","agnea","agnes","agneta","agni","agða","akira","alanta","alba","albert","alberta","albína","alda","aldar","aldný","aldís","alena","aleta","aletta","alex","alexa","alexander","alexandra","alexandría","alexis","alexstrasa","alexía","alexíus","alfa","alfons","alfred","alfreð","alfífa","ali","alice","alida","alla","allan","alli","allý","alma","almar","alrekur","alrún","alva","alvar","alvilda","alvin","alída","alína","alís","alísa","amadea","amal","amalía","amanda","amelía","amil","amilía","amos","amy","amír","amíra","amý","analía","anastasía","anders","andra","andrea","andreas","andri","andrá","andré","andrés","andríana","anes","anetta","anfinn","angantýr","angela","angelía","angelíka","angi","anika","anita","anja","ann","anna","annabella","annalísa","annar","annarr","annas","anne","annel","annelí","annes","annetta","anney","annika","annía","anný","anthony","anton","antonía","antoníus","antóníus","aníka","anína","aníta","apríl","ara","aran","ardís","arent","ares","arey","ari","arilíus","arinbjörg","arinbjörn","aris","arisa","arja","armenía","arna","arnald","arnaldur","arnar","arnberg","arnbergur","arnbjörg","arnbjörn","arnborg","arndís","arndór","arnes","arney","arnfinna","arnfinnur","arnfreyr","arnfríður","arngarður","arngeir","arngerður","arngils","arngrímur","arngunnur","arnheiður","arnhildur","arnika","arnkatla","arnkell","arnlaug","arnlaugur","arnleif","arnleifur","arnljót","arnljótur","arnlín","arnmundur","arnmóður","arnoddur","arnold","arnrós","arnrún","arnsteinn","arnviður","arnór","arnóra","arnúlfur","arnþrúður","arnþór","arnþóra","aron","arthur","arthúr","artúr","aría","aríana","aríanna","aríaðna","aríel","aríela","aríella","arín","arína","arís","aríus","asael","askja","askur","aspar","assa","astrid","asía","asírí","atalía","atena","athena","atla","atlanta","atlas","atli","aurora","austar","austmann","austmar","austri","auðberg","auðbergur","auðbert","auðbjörg","auðbjörn","auðbjört","auðdís","auðgeir","auðkell","auðlín","auðmundur","auðna","auðný","auðrún","auðun","auðunn","auður","auður","auðólfur","axel","axelma","axelía","aðalberg","aðalbergur","aðalbert","aðalbjörg","aðalbjörn","aðalbjört","aðalborg","aðalborgar","aðaldís","aðalfríður","aðalgeir","aðalheiður","aðalmundur","aðalráður","aðalrós","aðalsteina","aðalsteinn","aðalsteinunn","aðalveig","aðalvíkingur","aðólf","aþena","baldey","baldrún","baldur","baldvin","baldvina","baldwin","baltasar","bambi","barbara","barbára","barri","barði","bassi","bassí","bastían","baugur","bebba","begga","beinir","beinteinn","beitir","bekan","belinda","bella","benedikt","benedikta","bengta","benidikt","benidikta","benjamín","benna","benney","benný","benoný","bent","benta","bentey","bentína","benvý","benía","beníta","benóní","benóný","bera","berent","berg","bergdís","bergey","bergfinnur","bergfríður","bergheiður","berghildur","berghreinn","bergjón","berglaug","berglind","bergljót","berglín","bergmann","bergmannía","bergmar","bergmundur","bergný","bergrán","bergrín","bergrós","bergrún","bergsteinn","bergsveina","bergsveinn","bergur","bergvin","bergþór","bergþóra","berit","bernhard","bernharð","bernharður","berni","bernódus","bernódía","bersi","berta","bertel","bertha","bertram","bessi","bessí","bestla","beta","betanía","betsý","bettý","betúel","bil","bill","birgir","birgit","birgitta","birkir","birna","birnir","birta","birtingur","birtir","birtna","bjargar","bjargdís","bjargey","bjargheiður","bjarghildur","bjarglind","bjargmundur","bjargþór","bjarkan","bjarkar","bjarkey","bjarki","bjarklind","bjarma","bjarmar","bjarmi","bjarnar","bjarndís","bjarney","bjarnfinnur","bjarnfreður","bjarnfríður","bjarngerður","bjarnharður","bjarnheiður","bjarnhildur","bjarnhéðinn","bjarni","bjarnlaug","bjarnlaugur","bjarnleifur","bjarnrún","bjarnsteinn","bjarnveig","bjarnólfur","bjarný","bjarnþrúður","bjarnþór","bjarnþóra","bjartey","bjartmann","bjartmar","bjartmey","bjartur","bjartþór","bjólan","bjólfur","björg","björgey","björgheiður","björghildur","björgmundur","björgvin","björgólfur","björgúlfur","björk","björn","björney","björnfríður","björnólfur","björt","bláey","bláklukka","blædís","blængur","blær","blær","blævar","blín","blíða","blómey","bobba","boga","bogdís","bogey","bogga","boghildur","bogi","bolli","borg","borgar","borgdís","borghildur","borgný","borgrún","borgúlfur","borgþór","borgþóra","botnía","boði","braga","braghildur","bragi","branddís","brandur","brandís","breki","bresi","brestir","briet","brigitta","brimar","brimdís","brimhildur","brimi","brimir","brimrún","brit","britt","britta","brjánn","broddi","bruno","bryndís","brynfríður","bryngeir","bryngerður","brynheiður","brynhildur","brynja","brynjar","brynjólfur","brynjúlfur","brynleifur","brynmar","brynný","brynsteinn","bryntýr","brynþór","brá","brák","bríana","bríanna","bríet","brími","brímir","burkney","burkni","bylgja","bára","bárður","bæring","bæringur","bæron","bíbí","bína","bóas","bóel","bói","bót","bóthildur","bótólfur","börkur","böðvar","búi","búri","camilla","caritas","carl","carla","carmen","cathinca","cecil","cecilia","cecilía","cesar","charlotta","charlotte","christa","christel","christian","christina","christine","christopher","clara","cæsar","cýrus","dagbjartur","dagbjörg","dagbjört","dagfari","dagfinnur","dagfríður","daggeir","daggrós","dagheiður","dagmann","dagmar","dagmey","dagný","dagnýr","dagrún","dagur","dagþór","dalbert","daldís","daley","dalla","dalli","dallilja","dalmann","dalmar","dalrós","dalvin","dalía","damjan","damon","dan","dana","danelíus","daney","danfríður","danheiður","danhildur","daniel","danival","dante","danía","daníel","daníela","daníella","daníval","dara","darri","daría","daríus","davíð","daðey","daði","daðína","debora","debóra","demus","dendý","dennis","deníel","didda","dilja","diljá","dimma","dimmblá","dimmey","diðrik","dofri","dolli","dominik","donna","doris","dorothea","drauma","draumey","draupnir","dreki","drengur","droplaug","drífa","drótt","dröfn","dufgus","dufþakur","dugfús","dvalinn","dynþór","dæja","día","díana","díanna","díma","dís","dísa","dísella","díómedes","dóa","dómald","dómaldi","dómaldur","dómhildur","dónald","dónaldur","dór","dóra","dórey","dóri","dóris","dórothea","dórótea","dóróthea","dósóþeus","dögg","dögun","dúa","dúfa","dúi","dúna","dúnn","dúnna","dýrborg","dýrfinna","dýri","dýrleif","dýrley","dýrmundur","dýrunn","ebba","ebbi","ebeneser","ebenezer","eberg","ebonney","edda","eddi","edel","edgar","edil","edilon","edit","edith","edvard","edvin","edward","edílon","efemía","efraím","egedía","eggert","eggrún","eggþór","egill","egla","eik","eikar","eileiþía","eilífur","einar","einbjörg","eindís","einey","einfríður","einhildur","einir","einrún","einvarður","einína","einþór","eir","eirdís","eirfinna","eirný","eiríka","eiríkur","eirún","eivin","eivör","eiðar","eiðný","eiðunn","eiður","elba","elberg","elbert","eldar","eldbjörg","eldey","eldgrímur","eldjárn","eldlilja","eldmar","eldon","eldrún","eldur","eldór","eldþóra","eleina","elektra","elena","elenborg","elentínus","elfa","elfar","elfráður","elfur","elimar","elina","elinborg","elinór","elis","elisabeth","elka","ella","ellen","ellert","elley","elli","ellisif","elliði","elly","ellín","ellís","ellý","elma","elmar","elna","elsa","elsabet","elsie","elsí","elsý","elva","elvar","elvi","elvin","elvira","elvis","elvíra","elvý","elí","elía","elía","elíana","elías","elíeser","elímar","elín","elína","elínbergur","elínbet","elínbjörg","elínbjört","elínborg","elíndís","elíngunnur","elínheiður","elínmundur","elínrós","elíná","elínór","elírós","elís","elísa","elísabet","elísabeth","elíza","emanúel","embla","embrek","emelía","emelíana","emelína","emerald","emeralda","emil","emilía","emilíana","emilíanna","emilý","emma","emmanúel","emmý","emý","enea","eneka","engilbert","engilbjartur","engilbjört","engiljón","engill","engilráð","engilrós","engla","enika","enja","enok","eníta","enóla","eres","eric","erik","erika","erin","erla","erlar","erlen","erlendur","erling","erlingur","erlín","ermenrekur","erna","ernestó","ernir","ernst","eron","erpur","esekíel","esja","esjar","eskja","esmeralda","esra","estefan","ester","esther","estiva","ethel","etna","eufemía","eva","evald","evan","evelyn","evert","evey","evfemía","evgenía","evlalía","evían","evíta","ey","eyberg","eybjörg","eybjört","eyborg","eydís","eyfríður","eygerður","eygló","eyhildur","eyja","eyjalín","eyjólfur","eylaugur","eyleif","eyleifur","eylín","eymar","eymundur","eyríkur","eyrós","eyrún","eysteinn","eyvar","eyveig","eyvindur","eyvör","eyþrúður","eyþór","eyþóra","eðna","eðvald","eðvar","eðvarð","fabrisíus","falgeir","falur","fannar","fannberg","fanndís","fanney","fanngeir","fannlaug","fanny","fanný","febrún","felix","fema","fengur","fenrir","ferdinand","ferdínand","fertram","feykir","filip","filippa","filippus","filippía","filipía","finn","finna","finnbjörg","finnbjörk","finnbjörn","finnboga","finnbogi","finnborg","finndís","finney","finnfríður","finngeir","finnjón","finnlaug","finnlaugur","finnrós","finnur","finnvarður","fjalar","fjalldís","fjarki","fjóla","fjólar","fjólmundur","fjölnir","fjölvar","fjörnir","flemming","flosi","flóki","flóra","flórent","flóvent","folda","forni","fossmar","francis","frank","franklín","frans","fransiska","franz","franziska","fregn","freybjörn","freydís","freygarður","freygerður","freyja","freylaug","freyleif","freymar","freymundur","freymóður","freyr","freysteinn","freyviður","freyþór","friedrich","frigg","fritz","friðberg","friðbergur","friðbert","friðbjörg","friðbjörn","friðbjört","friðborg","friðdís","friðdóra","friðey","friðfinna","friðfinnur","friðgeir","friðgerður","friðjón","friðjóna","friðlaug","friðlaugur","friðleif","friðleifur","friðlín","friðmann","friðmar","friðmey","friðmundur","friðný","friðrik","friðrika","friðrikka","friðrós","friðrún","friðsemd","friðsteinn","friður","friðveig","friðvin","friðþjófur","friðþór","friðþóra","frosti","frostrós","frán","fránn","frár","frímann","fríða","fríðsteinn","fríður","fróði","fróðmar","fróðný","funi","fura","fylkir","fáfnir","fálki","fía","fídes","fífa","fífill","fólki","fönn","fúsi","gabriel","gabríel","gabríela","gabríella","gael","galdur","gamalíel","garibaldi","garpur","garri","garðar","gaui","gauja","gaukur","gauthildur","gauti","gautrekur","gautur","gautviður","gefjun","gefn","geir","geira","geirarður","geirbjörg","geirdís","geirfinna","geirfinnur","geirfríður","geirharður","geirhildur","geirhjörtur","geirhvatur","geiri","geirlaug","geirlaugur","geirleifur","geirlöð","geirmundur","geirný","geirríður","geirröður","geirrún","geirtryggur","geirvaldur","geirólfur","geirþjófur","geirþrúður","geisli","gellir","georg","georgía","gerald","geri","gerða","gerðar","gerður","gestheiður","gestný","gestrún","gestur","gilbert","gill","gillý","gilmar","gils","gilslaug","gissunn","gissur","gizur","gjaflaug","gjúki","gloría","gló","glóa","glóbjört","glódís","glóey","glói","glóð","glúmur","gneisti","gná","gnúpur","gnýr","gottskálk","gottsveinn","goði","goðmundur","grani","grankell","gregor","grein","greipur","greppur","gret","greta","gretar","grethe","grettir","grélöð","grét","gréta","grétar","gríma","grímar","grímey","grímheiður","grímhildur","grímkell","grímlaugur","grímnir","grímur","grímólfur","grímúlfur","gróa","gullbrá","gulli","gullveig","gullý","gumi","gumma","gunnar","gunnberg","gunnbjörg","gunnbjörn","gunnbjört","gunnborg","gunndís","gunndór","gunndóra","gunnella","gunnfinna","gunnfríður","gunngeir","gunnhallur","gunnharða","gunnheiður","gunnhildur","gunnjóna","gunnlaug","gunnlaugur","gunnleif","gunnleifur","gunnlöð","gunnröður","gunnrún","gunnsteinn","gunnur","gunnvaldur","gunnveig","gunnvör","gunnólfur","gunnóli","gunný","gunnþór","gunnþóra","gunnþórunn","gurrý","gustav","gutti","guttormur","guðberg","guðbergur","guðbjarni","guðbjartur","guðbjörg","guðbjörn","guðbjört","guðborg","guðbrandur","guðdís","guðfinna","guðfinnur","guðfreður","guðfríður","guðgeir","guðjón","guðjóna","guðlaug","guðlaugur","guðleif","guðleifur","guðleikur","guðlín","guðmann","guðmar","guðmey","guðmon","guðmunda","guðmundur","guðmundína","guðni","guðný","guðráður","guðríður","guðröður","guðrún","guðsteina","guðsteinn","guðvarður","guðveig","guðveigur","guðvin","guðþór","gylfi","gyrðir","gytta","gyða","gyðja","gyðríður","gæfa","gæflaug","gía","gídeon","gígja","gígjar","gígur","gísela","gísla","gísley","gísli","gíslný","gíslrún","gíslunn","gíslína","gíta","góa","gógó","gói","góði","gúa","gústaf","gústav","gýgjar","gýmir","hadda","haddi","haddur","haddý","hafberg","hafbjörg","hafborg","hafdís","hafey","hafgrímur","hafliða","hafliði","haflína","hafnar","hafni","hafný","hafrós","hafrún","hafsteina","hafsteinn","hafþór","hafþóra","hagalín","hagbarður","hagbert","haki","halla","hallbera","hallberg","hallbjörg","hallbjörn","hallborg","halldís","halldór","halldóra","halley","hallfreður","hallfríður","hallgarður","hallgeir","hallgerður","hallgils","hallgrímur","hallgunnur","hallkatla","hallkell","hallmann","hallmar","hallmundur","hallný","hallrún","hallsteinn","hallur","hallvarður","hallveig","hallvör","hallþór","hamar","hanna","hannes","hanney","hannibal","hans","hansa","hansína","harald","haraldur","harpa","harri","harry","harrý","hartmann","hartvig","hauksteinn","haukur","haukvaldur","hauður","heba","hebba","hedda","hedí","heida","heikir","heilmóður","heimir","heinrekur","heisi","heiða","heiðar","heiðarr","heiðberg","heiðbert","heiðbjörg","heiðbjörk","heiðbjört","heiðbrá","heiðdís","heiðlaug","heiðlindur","heiðlóa","heiðmann","heiðmar","heiðmundur","heiðný","heiðrekur","heiðrós","heiðrún","heiður","heiðveig","hekla","hektor","helen","helena","helga","helgi","hella","helma","helmút","hemmert","hendrik","hendrikka","henning","henný","henrietta","henrik","henrika","henry","henríetta","henrý","hera","herbert","herbjörg","herbjörn","herbjört","herborg","herdís","herfinnur","herfríður","hergeir","hergerður","hergill","hergils","herjólfur","herlaug","herlaugur","herleifur","herluf","hermann","hermundur","hermína","hermóður","hersilía","hersir","hersteinn","hersveinn","herta","hertha","hervar","hervarður","hervin","hervör","herþrúður","hilaríus","hilbert","hilda","hildar","hildegard","hildibergur","hildibjörg","hildibrandur","hildigeir","hildigerður","hildiglúmur","hildigunnur","hildimar","hildimundur","hildingur","hildir","hildiríður","hildisif","hildiþór","hildur","hilma","hilmar","hilmir","himinbjörg","himri","hind","hinrik","hinrika","hinrikka","hjallkár","hjalta","hjaltalín","hjaltey","hjalti","hjarnar","hjálmar","hjálmdís","hjálmey","hjálmfríður","hjálmgeir","hjálmgerður","hjálmrós","hjálmrún","hjálmtýr","hjálmur","hjálmveig","hjálmþór","hjördís","hjörfríður","hjörleif","hjörleifur","hjörný","hjörtfríður","hjörtur","hjörtþór","hjörvar","hlaðgerður","hleiðar","hleiður","hlini","hljómur","hlynur","hlédís","hlégestur","hlér","hlíf","hlífar","hlín","hlíðar","hlíðberg","hlökk","hlöðmundur","hlöður","hlöðvarður","hlöðver","hnefill","hnikar","hnikarr","holgeir","holger","holti","hrafn","hrafna","hrafnar","hrafnbergur","hrafnborg","hrafndís","hrafney","hrafnfífa","hrafngerður","hrafnheiður","hrafnhildur","hrafnkatla","hrafnkell","hrafnlaug","hrafntinna","hrafntýr","hrannar","hrappur","hraunar","hraundís","hrefna","hreggviður","hreimur","hreindís","hreinn","hreiðar","hreiðmar","hringur","hrollaugur","hrolleifur","hrund","hrærekur","hrímnir","hróaldur","hróar","hróbjartur","hrói","hrólfdís","hrólfur","hrómundur","hróðgeir","hróðmar","hróðný","hróðvar","hróðólfur","hrönn","hrútur","hugberg","hugbjörg","hugbjört","hugborg","hugdís","hugi","huginn","hugleikur","hugljúf","hugo","hugrún","hugó","huld","hulda","huldar","huldrún","huldís","huxley","hvannar","hvönn","hyltir","hylur","hákon","hákonía","háleygur","hálfdan","hálfdán","hámundur","hárekur","hárlaugur","hásteinn","hávar","hávarr","hávarður","hængur","hænir","héðinn","híram","hólm","hólmar","hólmbert","hólmbjörg","hólmdís","hólmfastur","hólmfríður","hólmgeir","hólmgrímur","hólmkell","hólmsteinn","hólmþór","hóseas","hödd","högna","högni","hörn","hörður","höskuldur","höður","húbert","húgó","húmi","húna","húnbjörg","húnbogi","húndís","húngerður","húni","húnn","húnröður","ida","idda","illugi","ilmur","ilse","ilías","immanúel","immý","ina","inda","india","indiana","indra","indriði","indí","indía","indíana","indíra","inga","ingberg","ingdís","ingeborg","inger","ingey","ingheiður","inghildur","ingi","ingiberg","ingibergur","ingibert","ingibjartur","ingibjörg","ingibjörn","ingibjört","ingiborg","ingifinna","ingifríður","ingigerður","ingilaug","ingileif","ingileifur","ingilín","ingimagn","ingimar","ingimaría","ingimunda","ingimundur","ingiríður","ingirós","ingisól","ingivaldur","ingiveig","ingiþór","ingjaldur","ingmar","ingrid","ingrún","ingunn","ingvaldur","ingvar","ingveldur","ingvi","ingólfur","ingþór","inna","irena","irene","irja","irma","irmelín","irmý","irpa","isabel","isabella","ismael","issi","iða","iðunn","jack","jafet","jagger","jaki","jakob","jakobína","jakop","jamil","jan","jana","jane","janetta","jannika","janus","jara","jarfi","jarl","jarla","jarún","jarþrúður","jasmín","jason","jenetta","jenna","jenni","jenny","jenný","jens","jensína","jeremías","jes","jesper","jessý","jochum","johan","john","joshua","jovina","judith","julian","járnbrá","járngerður","járngrímur","játgeir","játmundur","játvarður","jóa","jóakim","jóann","jóanna","jódís","jóel","jófríður","jóhann","jóhanna","jóhannes","jói","jólín","jómar","jómundur","jón","jóna","jónanna","jónar","jónas","jónasína","jónatan","jónbjörg","jónbjörn","jónbjört","jóndís","jóndór","jóndóra","jóney","jónfríður","jóngeir","jóngerð","jónheiður","jónhildur","jóninna","jónmundur","jónný","jónsteinn","jónída","jónína","jóný","jónþór","jóra","jórlaug","jórunn","jóríður","jósafat","jósavin","jósebína","jósef","jósefín","jósefína","jósep","jósteinn","jósúa","jóvin","jökla","jökull","jökulrós","jörfi","jörgen","jörgína","jörmundur","jörri","jörundur","jörvar","jörvi","júdea","júdit","júlí","júlía","júlían","júlíana","júlíanna","júlíetta","júlíhuld","júlína","júlírós","júlíus","júní","júní","júnía","júníana","júníus","júrek","kai","kaj","kaja","kakali","kaktus","kala","kaldi","kaleb","kali","kalla","kalman","kalmann","kalmar","kamal","kamilla","kamma","kamí","kapitola","kaprasíus","kapítóla","kara","karel","karen","karim","karin","karitas","karkur","karl","karla","karles","karli","karlinna","karlotta","karlína","karmen","karol","karolína","karvel","karí","karín","karína","karítas","karó","karólín","karólína","karún","kaspar","kasper","kassandra","kastíel","kata","katarína","katarínus","katerína","katharina","kathinka","katinka","katla","katrín","katrína","kató","katý","kaðlín","kellý","kendra","keran","ketilbjörg","ketilbjörn","ketilfríður","ketill","ketilríður","kiddý","kiljan","kilían","kira","kirsten","kirstín","kittý","kjalar","kjallakur","kjalvör","kjaran","kjartan","kjarval","kjárr","kjói","klara","klemens","klementína","klemenz","kleópatra","kládía","klængur","knörr","knútur","koggi","kolbeinn","kolbjörg","kolbjörn","kolbrá","kolbrún","koldís","kolfinna","kolfinnur","kolfreyja","kolgríma","kolgrímur","kolka","kolmar","kolskeggur","kolur","kolviður","konkordía","konný","konráð","konstantínus","korka","kormlöð","kormákur","kornelía","kornelíus","kort","koðrán","kraki","kris","krista","kristall","kristberg","kristbergur","kristbjörg","kristbjörn","kristborg","kristdór","kristel","kristens","kristensa","krister","kristey","kristfinnur","kristfríður","kristgeir","kristgerður","kristian","kristin","kristine","kristinn","kristjana","kristján","kristjón","kristjóna","kristlaug","kristlaugur","kristleifur","kristlind","kristlín","kristmann","kristmar","kristmundur","kristný","kristofer","kristrós","kristrún","kristvaldur","kristvarður","kristveig","kristvin","kristvina","kristíana","kristíanna","kristín","kristína","kristófer","kristólína","kristý","kristþór","kristþóra","krumma","krummi","kría","kvasir","kveldúlfur","kár","kára","kári","kæja","kókó","kópur","kórekur","laila","lambert","lana","lara","lars","laufar","laufey","laufheiður","laufhildur","lauga","laugey","laugheiður","laugi","lauritz","laíla","lea","leif","leifur","leiknir","leikný","leila","leiðólfur","lena","leo","leon","leonard","leonhard","leonóra","leví","lexí","leyla","leó","leóna","leónóra","leópold","lilja","liljar","liljurós","liljá","lill","lilla","lillian","lilly","lillý","lily","lilý","lind","linda","lindar","lindberg","linddís","lingný","lisbeth","listalín","liv","ljósbjörg","ljósbrá","ljósálfur","ljótunn","ljótur","ljúfur","lofn","loftur","loftveig","logey","logi","lokbrá","loki","lotta","louisa","louise","lovísa","loðmundur","ludvig","lukka","lundi","lydia","lydía","lyngar","lyngheiður","lár","lára","lárensína","lárent","lárentíus","láretta","lárey","lárus","læla","lér","líam","líba","líf","lífdís","lílý","lín","lína","línberg","línbjörg","líndís","líneik","líney","línhildur","líni","lísa","lísabet","lísandra","lísbet","lísebet","lív","lóa","lóreley","lórens","lórenz","lótus","lúcía","lúkas","lúna","lúsinda","lúsía","lúter","lúther","lúvísa","lúísa","lúðvíg","lúðvík","lúðvíka","lýdía","lýra","lýtingur","lýður","maddý","magda","magdalena","magga","maggey","maggi","maggý","magna","magndís","magnea","magnes","magney","magnfríður","magngeir","magnheiður","magnhildur","magni","magnús","magnúsína","magný","magnþór","magnþóra","magðalena","maj","maja","makan","malen","malena","malika","malla","malía","malín","malína","manda","manfred","manfreð","manúel","manúela","manúella","mar","mara","marbjörn","mardís","marel","marela","marella","maren","marey","marfríður","margeir","margit","margot","margret","margrjet","margrét","margrímur","margunnur","marheiður","mari","maria","marie","marijón","marikó","marinella","marinó","marit","marja","marjón","mark","markrún","markó","markús","markþór","marlaug","marlena","marlín","marlís","maron","marri","mars","marsa","marsellíus","marselía","marselína","marsibil","marsilía","marsý","marta","marteinn","marten","martha","marthen","martin","martína","marvin","mary","marzibil","marzilíus","marí","maría","maríam","marían","maríana","maríanna","marías","marín","marína","marínella","marínó","maríon","marís","marísa","marísól","marít","maríuerla","maríus","marólína","marý","mathilda","mathías","matta","mattea","matthea","matthilda","matthildur","matthía","matthías","matti","mattíana","mattías","mattína","mattý","max","maxima","maximus","maía","maídís","maísól","meda","mekkin","mekkinó","mekkín","melinda","melissa","melkorka","melkíor","melkólmur","melrakki","melrós","mensalder","merkúr","messíana","methúsalem","metta","metúsalem","mey","meyvant","michael","mikael","mikaela","mikaelína","mikjáll","mikkael","mikkalína","mikkel","milda","mildinberg","mildríður","milla","millý","minerva","minna","minney","minný","miriam","mirja","mirjam","mirra","mist","mjalldís","mjallhvít","mjaðveig","mjöll","mjöllnir","mjölnir","moli","mona","monika","morgan","morgunsól","moritz","mosi","muggur","munda","mundheiður","mundhildur","mundína","muni","muninn","myrk","myrkvi","myrra","mábil","málfríður","málhildur","málmfríður","mánadís","máney","máni","már","mára","márus","mía","mías","míla","mímir","mímósa","mínerva","mír","míra","míranda","míríel","mítra","míó","móa","módís","móeiður","móey","móheiður","mói","móna","mónika","móníka","móri","mórits","móses","móði","mörk","mörður","múli","mýr","mýra","mýrkjartan","mýrún","nadia","nadja","nadía","nana","nanna","nanný","nansý","naomí","narfi","natalie","natalía","natan","natanael","nataníel","nathan","naómí","neisti","nella","nellý","nenna","nenni","neptúnus","nicolas","nicole","nikanor","nikolai","nikolas","nikoletta","nikulás","nikíta","nikólína","nils","ninja","ninna","niðbjörg","njála","njáll","njóla","njörður","nonni","norbert","norma","normann","norðmann","náttmörður","náttsól","náttúlfur","náð","níels","níls","nína","níní","nóa","nóam","nóel","nói","nóni","nóra","nóri","nótt","nóvember","nökkvi","númi","nýbjörg","nývarð","obba","odda","oddbergur","oddbjörg","oddbjörn","oddfreyja","oddfreyr","oddfríður","oddgeir","oddgerður","oddhildur","oddi","oddkell","oddlaug","oddleif","oddleifur","oddmar","oddný","oddrún","oddsteinn","oddur","oddvar","oddveig","oddvör","oddþór","oktavía","oktavíus","októ","októvía","októvíus","olaf","olav","olga","olgeir","oliver","olivert","olivia","ollý","ora","orfeus","orka","ormar","ormheiður","ormhildur","ormur","orri","orvar","otkatla","otkell","otri","otta","otti","ottó","otur","pamela","parmes","parís","patrek","patrekur","patricia","patrick","patrik","patrisía","pedró","per","perla","peta","peter","petra","petrea","petronella","petrína","petrónella","petrós","petrún","petrúnella","pjetur","polly","pollý","pría","príor","pála","páldís","páley","pálfríður","pálhanna","pálheiður","pálhildur","páll","pálmar","pálmey","pálmfríður","pálmi","pálrún","pálín","pálína","pétrína","pétrún","pétur","pía","rafael","rafn","rafnar","rafney","rafnhildur","rafnkell","ragna","ragnar","ragnbjörg","ragney","ragnfríður","ragnheiður","ragnhildur","ragúel","rakel","ramóna","randalín","randver","randíður","randý","ranka","rannva","rannveig","rannver","rasmus","rea","rebekka","refur","reginbaldur","reginbjörg","reginn","regína","reidar","reifnir","reimar","rein","reinar","reinhart","reinhold","remek","renata","rex","reykdal","reyn","reynald","reynar","reyndís","reynheiður","reynhildur","reynir","reyr","richard","rikharð","rikharður","rikka","ripley","rita","robert","rolf","ronald","ronja","rorí","roxanna","rudolf","runi","runný","runólfur","rut","ruth","rán","ráðgeir","ráðhildur","ráðvarður","ríkarður","ríkey","ríkharð","ríkharður","rín","ríta","ríó","róbert","róberta","róbjörg","rólant","róman","rómeó","rós","rósa","rósalind","rósalía","rósanna","rósant","rósar","rósberg","rósbjörg","rósborg","róselía","rósenberg","rósey","rósfríður","róshildur","rósi","rósinberg","rósinkar","rósinkara","rósinkrans","rósinkransa","róska","róslaug","róslind","róslinda","róslín","rósmann","rósmary","rósmarý","rósmunda","rósmundur","rósný","röfn","rögn","rögnvald","rögnvaldur","rögnvar","rökkvi","röskva","röðull","rúbar","rúben","rúbý","rúdólf","rún","rúna","rúnar","rúndís","rúnhildur","rúrik","rúrí","rútur","sabrína","sabína","safír","saga","sakarías","salbjörg","saldís","salgerður","salka","salma","salmann","salmar","salný","salome","salvar","salvör","salín","salína","salóme","salómon","samson","samúel","sandel","sandra","sandri","sandur","sanna","santía","sara","sarína","saxi","sebastian","sebastían","sefanía","seifur","seimur","selena","selja","selka","selma","senía","septíma","sera","serena","sesar","seselía","sesil","sesilía","sesselja","sesselía","sessilía","sif","sigbergur","sigbert","sigbjartur","sigbjörn","sigdís","sigdór","sigdóra","sigfastur","sigfinnur","sigfreður","sigfríð","sigfríður","sigfús","sigga","siggeir","siggerður","sighvatur","sigjón","siglaugur","sigmann","sigmar","sigmunda","sigmundur","signa","signar","signhildur","signý","sigri","sigrid","sigríkur","sigríður","sigrún","sigsteinn","sigtryggur","sigtýr","sigur","sigurbaldur","sigurberg","sigurbergur","sigurbirna","sigurbjarni","sigurbjartur","sigurbjörg","sigurbjörn","sigurbjört","sigurborg","sigurbrandur","sigurbára","sigurdríf","sigurdrífa","sigurdís","sigurdór","sigurdóra","sigurey","sigurfinna","sigurfinnur","sigurfljóð","sigurgeir","sigurgeira","sigurgestur","sigurgrímur","sigurgísli","sigurhanna","sigurhans","sigurhelga","sigurhildur","sigurhjörtur","sigurjón","sigurjóna","sigurkarl","sigurlaug","sigurlaugur","sigurleif","sigurleifur","sigurlilja","sigurlinn","sigurlinni","sigurliði","sigurlogi","sigurlás","sigurlín","sigurlína","sigurmann","sigurmar","sigurmon","sigurmunda","sigurmundur","sigurnanna","sigurnýas","sigurnýjas","siguroddur","sigurpáll","sigurrós","sigursteina","sigursteinn","sigursveinn","sigurunn","sigurvaldi","sigurveig","sigurvin","sigurvina","sigurást","sigurásta","sigurða","sigurður","siguróli","sigurósk","sigurörn","sigurþór","sigurþóra","sigvalda","sigvaldi","sigvarður","sigyn","sigþrúður","sigþór","sigþóra","silfa","silfrún","silfá","silja","silka","silla","silli","silva","silvana","silvía","sindri","sirra","sirrí","sirrý","siv","sivía","sjafnar","sjana","sjöfn","skafti","skapti","skarpheiður","skarphéðinn","skefill","skeggi","skellir","skjöldur","skorri","skröggur","skugga","skuggi","skuld","skær","skæringur","skírnir","skíði","skúla","skúli","skúlína","skúta","smiður","smyrill","smári","snjáfríður","snjáka","snjófríður","snjóki","snjólaug","snjólaugur","snjólfur","snorra","snorri","snæbjartur","snæbjörg","snæbjörn","snæbjört","snæborg","snæbrá","snædís","snæfríður","snæhólm","snælaug","snælaugur","snær","snæringur","snærós","snærún","snævar","snævarr","snæþór","snót","soffanías","soffía","sofie","sofía","solveig","sonja","sonný","sophanías","sophia","sophie","sophus","spartakus","sporði","spói","stanley","stapi","starkaður","starri","stasía","stefan","stefana","stefanía","stefnir","stefán","stefánný","steina","steinar","steinarr","steinberg","steinbergur","steinbjörg","steinbjörn","steinborg","steindís","steindór","steindóra","steiney","steinfinnur","steinfríður","steingerður","steingrímur","steinhildur","steini","steinkell","steinlaug","steinmann","steinmar","steinmóður","steinn","steinrós","steinröður","steinrún","steinunn","steinvarður","steinvör","steinólfur","steinþór","steinþóra","stella","stirnir","stjarna","stjarney","stormur","sturla","sturlaugur","sturri","styr","styrbjörn","styrgerður","styrkár","styrmir","styrr","stígheiður","stígrún","stígur","stína","stórólfur","sumarliði","sumarlína","sumarrós","sunna","sunnefa","sunneva","sunniva","sunníva","susan","svafa","svafar","svala","svali","svalrún","svan","svana","svanberg","svanbergur","svanbjörg","svanbjörn","svanbjört","svanborg","svandís","svaney","svanfríður","svangeir","svanheiður","svanhildur","svanhvít","svanhólm","svani","svanlaug","svanlaugur","svanmundur","svanrós","svanur","svanþrúður","svanþór","svava","svavar","svea","sveina","sveinar","sveinberg","sveinbjartur","sveinbjörg","sveinbjörn","sveinborg","sveindís","sveiney","sveinfríður","sveingerður","sveinhildur","sveinjón","sveinlaug","sveinlaugur","sveinmar","sveinn","sveinrós","sveinrún","sveinsína","sveinungi","sveinveig","sveinþór","svend","sverre","sverrir","sváfnir","svölnir","svörfuður","sylgja","sylva","sylvia","sylvía","sæberg","sæbergur","sæbjartur","sæbjörg","sæbjörn","sæbjört","sæborg","sæbrá","sædís","sæfinna","sæfríður","sæhildur","sæi","sæla","sælaug","sælaugur","sæmann","sæmi","sæmunda","sæmundur","sæný","sær","særós","særún","sæsól","sæunn","sævald","sævaldur","sævar","sævarr","sævin","sævör","sæþór","sía","símon","símona","símonía","sírnir","sírus","sísí","síta","sívar","sófus","sófónías","sókrates","sól","sóla","sólberg","sólbergur","sólbjartur","sólbjörg","sólbjörn","sólbjört","sólborg","sólbrá","sólbrún","sóldís","sóldögg","sóley","sólfríður","sólgerður","sólhildur","sólimann","sólkatla","sóllilja","sólmar","sólmundur","sólný","sólon","sólrós","sólrún","sólveig","sólver","sólvin","sólvör","sólín","sónata","sölmundur","sölva","sölvar","sölvey","sölvi","sölvína","sören","sörli","súla","súlamít","súsan","súsanna","sýrus","tala","talía","tamar","tamara","tandri","tanja","tanya","tanya","tanía","tara","tarfur","tea","teitný","teitur","tekla","telma","tera","teresa","teresía","thea","thelma","theodór","theodóra","theresa","theódór","theódóra","thomas","thor","thorberg","thór","tindar","tindra","tindri","tindur","tinna","tinni","tirsa","tjaldur","tjörfi","tjörvi","tobías","todda","tolli","tonni","torbjörg","torfey","torfheiður","torfhildur","torfi","trausti","tristan","tristana","trostan","tryggva","tryggvi","tryggvína","trú","trúmann","tumas","tumi","tyrfingur","tía","tíalilja","tíbor","tíbrá","tími","tímon","tímoteus","tímóteus","tína","tístran","tóbías","tóbý","tói","tóka","tóki","tómas","tór","tóta","týr","týra","ubbi","uggi","ugla","ulrich","una","undína","uni","unna","unnar","unnbjörg","unnbjörn","unndís","unndór","unnsteinn","unnur","unnþór","urðar","urður","uxi","vagn","vagna","vagnbjörg","vagnfríður","vaka","vakur","vala","valberg","valbergur","valbjörg","valbjörk","valbjörn","valbjört","valborg","valbrandur","valdemar","valdheiður","valdi","valdimar","valdís","valdór","valentín","valentína","valentínus","valería","valey","valfríður","valgarð","valgarður","valgeir","valgerða","valgerður","valgý","valhildur","valka","valkyrja","vallaður","vallý","valmar","valmundur","valný","valrós","valrún","valsteinn","valter","valtýr","valur","valva","valves","valíant","valý","valþrúður","valþór","vanda","varmar","varða","vatnar","veig","veiga","veigar","veigur","venný","venus","ver","vera","vermundur","vernharð","vernharður","veronika","verónika","veróníka","vestar","vestmar","vetrarrós","veturliði","vibeka","victor","victoría","vigdís","vigfús","viggó","viglín","vignir","vigný","vigri","vigtýr","vigur","vikar","viktor","viktoria","viktoría","vilberg","vilbergur","vilbert","vilbjörn","vilbogi","vilborg","vilbrandur","vildís","vilfríður","vilgeir","vilgerður","vilhelm","vilhelmína","vilhjálmur","vili","viljar","vilji","villa","villi","villimey","vilma","vilmar","vilmundur","vilný","vinbjörg","vincent","vindar","vinjar","vinný","vinsý","virgill","virginía","viðar","viðja","viðjar","von","voney","vopni","vordís","vorm","váli","vápni","vár","vébjörg","vébjörn","védís","végeir","végerður","vékell","vélaug","vélaugur","vémundur","véný","vésteinn","víbekka","víf","vífill","vígberg","vígdögg","víggunnur","víglundur","vígmar","vígmundur","vígsteinn","vígþór","víkingur","vísa","víðar","víðir","víóla","víóletta","vöggur","völundur","vörður","vöttur","walter","werner","wilhelm","willard","william","willum","willy","ylfa","ylfur","ylja","ylur","ylva","ymir","yngvar","yngvi","ynja","yrja","yrkill","yrsa","zakaría","zakarías","zophanías","zophonías","zóphanías","zóphonías","ágúst","ágústa","ágústína","áki","álfar","álfdís","álfey","álfgeir","álfgerður","álfgrímur","álfheiður","álfhildur","álfrós","álfrún","álfsól","álfur","álfþór","ámundi","árbjartur","árbjörg","árbjörn","árbjört","árdís","árelía","árelíus","árgeir","árgils","árlaug","ármann","ármey","árna","árndís","árney","árnheiður","árni","árnína","árný","ársæl","ársæll","ársól","árveig","árvök","áróra","árún","árþóra","ás","ása","ásberg","ásbergur","ásbjörg","ásbjörn","ásborg","ásdís","ásdór","ásfríður","ásgautur","ásgeir","ásgerður","ásgils","ásgrímur","áshildur","ási","áskatla","áskell","ásla","áslaug","áslaugur","ásleif","áslákur","ásmar","ásmundur","ásný","ásrós","ásröður","ásrún","ást","ásta","ástbjörg","ástbjörn","ástbjört","ástdís","ástfríður","ástgeir","ástgerður","ástheiður","ásthildur","ástmar","ástmundur","ástráður","ástríkur","ástríður","ástrós","ástrún","ástvald","ástvaldur","ástvar","ástveig","ástvin","ástþrúður","ástþór","ástþóra","ásvaldur","ásvarður","ásvör","ásólfur","ásþór","ægileif","ægir","æsa","æsgerður","æsir","ævar","ævarr","ævör","ían","ída","ígor","íma","ími","ína","ír","íren","írena","íris","írunn","ísabel","ísabella","ísadóra","ísafold","ísak","ísalind","ísar","ísarr","ísbjörg","ísbjörn","ísdís","íseldur","ísey","ísfold","ísgeir","ísgerður","íshildur","ísidór","ísidóra","ísis","íslaug","ísleif","ísleifur","íslilja","ísmael","ísmar","ísmey","ísold","ísrael","ísrún","íssól","ísveig","ísól","ísólfur","íunn","íva","ívan","ívar","óda","ófeigur","ófelía","óla","ólaf","ólafur","ólafía","ólafína","ólavía","óli","óliver","ólivía","ólína","ólíver","ólöf","ómar","ómi","ósa","ósk","óskar","ósklín","ósvald","ósvaldur","ósvífur","ótta","óttar","óttarr","óðinn","óðný","ögmunda","ögmundur","ögn","ögri","ölnir","ölrún","ölveig","ölver","ölvir","öndólfur","önundur","örbrún","örk","örlaugur","örlygur","örn","örnólfur","örvar","ösp","össur","öxar","úa","úddi","úlfa","úlfar","úlfdís","úlfey","úlfgeir","úlfheiður","úlfhildur","úlfhéðinn","úlfkell","úlfljótur","úlfrún","úlftýr","úlfur","úlla","úlrik","úna","úndína","úranus","úranía","úrsúla","ýja","ýma","ýmir","ýr","ýrar","ýrr","þalía","þangbrandur","þeba","þengill","þeyr","þeódís","þeódóra","þingey","þinur","þiðrandi","þiðrik","þjálfi","þjóstar","þjóstólfur","þjóðann","þjóðar","þjóðbjörg","þjóðbjörn","þjóðgeir","þjóðhildur","þjóðleifur","þjóðmar","þjóðrekur","þjóðvarður","þjóðólfur","þoka","þollý","þorberg","þorbergur","þorbjörg","þorbjörn","þorbrandur","þorfinna","þorfinnur","þorgarður","þorgautur","þorgeir","þorgerður","þorgestur","þorgils","þorgnýr","þorgríma","þorgrímur","þorgísl","þorkatla","þorkell","þorlaug","þorlaugur","þorleif","þorleifur","þorleikur","þorlákur","þormar","þormundur","þormóður","þorri","þorsteina","þorsteinn","þorstína","þorvaldur","þorvar","þorvarður","þrastar","þrymur","þrá","þráinn","þrándur","þróttur","þröstur","þrúða","þrúðmar","þrúður","þula","þura","þurí","þuríður","þurý","þyri","þyrill","þyrnir","þyrnirós","þyrí","þór","þóra","þóranna","þórar","þórarinn","þórarna","þórbergur","þórbjarni","þórbjörg","þórbjörn","þórdís","þórelfa","þórelfur","þórey","þórfríður","þórgnýr","þórgrímur","þórgunna","þórgunnur","þórhaddur","þórhalla","þórhalli","þórhallur","þórhanna","þórheiður","þórhildur","þóri","þórinn","þórir","þórkatla","þórlaug","þórlaugur","þórleif","þórleifur","þórlindur","þórmar","þórmundur","þórný","þórodda","þóroddur","þórormur","þórsteina","þórsteinn","þórsteinunn","þórstína","þórunn","þórveig","þórvör","þórða","þórður","þórólfur","þórörn","þöll","þúfa"];
TrainingData.indian_forenames = ["abhay","abhinav","abhishek","adarsh","adesh","adi","aishwarya","ajay","ajish","ajit","akhil","akhila","ambica","ami","amit","amita","ammar","amrita","ananya","anil","anirban","aniruddha","anjali","ankit","ankita","anu","anuj","anup","anupam","anupama","anurag","anushree","apoorva","arindam","arjun","arpita","arti","arun","arunachalam","arundhati","arvind","arya","aryaman","aseem","ashoka","ashvin","ashwin","bali","ballabh","bharat","bhardwaj","bhavesh","bhupinder","bhushan","bibin","biju","binod","binu","bipasha","chandrajit","damayanti","deepa","deepak","deepali","deepika","deepti","devanshi","devendra","devesh","dhanishka","dinesh","dipankar","ekram","eva","ganesh","gayatri","girish","girjesh","gita","gitanjali","gopinathan","gurcharan","gurunath","hansraj","hara","hardik","harish","harjit","harsh","harshita","hemalata","hitesh","indira","indrani","indranil","indumati","ira","ishana","jacqueline","jagannath","jaipal","jalaj","jara","jayant","jayashankar","jesminder","jitendra","juhi","kailash","kalimuthu","kamala","kanika","karthik","karthika","karthikeyan","kaushal","kavita","kazi","kirtan","kishor","kripesh","krishnan","krishnappa","krishnayya","kumar","kumudini","lakshan","lakshanya","lakshman","lata","latha","lauretta","leela","leelavathi","leila","lena","madhuri","mahboob","mahendra","mallika","mandar","manish","manjula","manmohan","manorama","maya","mayank","mira","mukesh","munish","muthuswamy","nadeem","nagaraj","nagesh","nahla","naila","nalini","nana","naranbhai","narayan","naveen","navin","neeraj","neha","nehal","nibaran","nihal","nihar","niharika","nikita","nirav","nitesh","nitin","nripendra","oommen","padmavati","palanivel","pallav","pankaj","parag","parul","parvati","phani","phanita","poonam","prajesh","prakash","pramod","pranab","pratibha","pratul","preeti","priya","priyanka","puja","radhanath","ragini","rahul","raj","raja","rajan","rajendra","rajesh","rajinder","rajiv","rakesh","ram","ramakant","ramesh","ramya","rana","ranbir","randhir","ranganath","rani","rashmi","rati","ravinder","ravish","reena","rekha","richa","rinjish","ritwik","ritwika","rohit","sachin","sahil","saket","saloni","samar","samir","sanah","sandhya","sandipan","sania","sanjib","sarabjit","saravanan","satyajit","satyana","savitri","sekar","shahbaz","shahnaz","shailendra","sharad","sharada","sharmila","sheela","sheetal","shekhar","shilpa","shishir","shishira","shreya","shridhar","shubhendu","shweta","sitaramayya","smeet","sneha","somesh","soumitra","sourav","srikanta","srinivas","subrata","sudha","sudhir","sujata","sukhbir","sulochana","sundar","sunil","supriya","surendranath","suresh","sureza","surinder","sushma","susmita","swetha","tala","tanisha","tanushree","tanvi","tarun","tejal","tina","uma","umesh","upendra","vaibhav","varsha","vasudevan","venkataraman","venu","vibha","vijayalakshmi","vikas","vinay","vinod","vivek","vrushali","wasim","yamini","yash","yugesh"];
TrainingData.irish_forenames = ["abbán","affraic","agaistín","aibhilín","aibhne","aifric","ailbhe","ailin","ailín","aindriú","aindréas","ainm","ainníleas","aislin","aisling","aislinn","aithche","ambrós","amhalgaidh","amhlaoibh","anluan","anmchadh","anne","antóin","aodh","aodhagán","aodhamair","aodhnait","aodhán","aogán","aoibhe","aoibheann","aoibhin","aoibhinn","aoife","aonghus","ardghal","ardghar","art","artúr","athracht","aíbhinn","bairre","baothghalach","barra","barrdhubh","basil","beacán","bearach","bearchán","bearnárd","beinidict","blanche","blinne","bláth","bláthnaid","bran","breandán","breanndán","breasal","brian","brighdín","brighid","brochadh","bréanainn","bríd","brídín","brónach","buadhach","buadhnait","bébhinn","cacht","cailean","cainneach","cairbre","caitlín","caitrín","caitríona","calbhach","canice","caoilfhionn","caoimhe","caoimhghín","caoimhín","caolán","caomhán","carraig","cathal","cathaoir","cathbharr","catraoine","ceallach","ceallachán","cearbhall","charles","charles","charles","ciamhnait","cian","ciannait","cianán","ciara","ciarán","cillian","cinnéididh","cinnéidigh","cionaodh","ciothruadh","cliodhna","clodagh","clíona","cobhfhlaith","cobhlaith","coilean","coileán","coilín","coinneach","coireall","colla","colm","colmán","colum","comhghall","comhghan","comán","conaire","conall","conchobhar","conchubhar","conchúr","conghalach","conmhac","conn","connla","connlaodh","conán","cormac","cosnamhach","criomthann","críostóir","cróchán","crónán","cuan","cuileán","cuimín","cyril","cárthach","cúchonnacht","cúmhaighe","cúmheadha","dabhag","dabhóg","dainéal","daire","damhnait","damháin","daniel","dara","david","deaglán","dearbhfhorgaill","dearbhfhorghaill","dearbhla","dearbháil","deasmhumhnach","declan","deirdre","denis","dervilia","dianaimh","diarmaid","diarmait","doireann","domhnall","donn","donnchadh","donnchadha","donnán","dorothy","dubhaltach","dubhchobhlaigh","dubhghall","dubhghlas","dubhán","dubhóg","dymphna","dáithí","déaglán","dónall","dúnlang","eachaidh","eachann","eachdhonn","eachthighearn","eamon","earcán","earnait","earnán","easnadh","edwina","eibhlín","eibhlín","eignach","eigneachán","eilín","eilís","eimear","eimer","eimhear","eireamhán","eireamhón","eirnín","eithne","eochaidh","eoghainín","eoghan","eoin","eóin","fachtna","faoiltighearna","faolán","fearadhach","fearchar","fearganainm","fearghal","fearghus","feargus","feary","feichín","feidhelm","feidhlim","felix","fergus","fiach","fiacha","fiachra","fiadhnait","finghin","finian","finnian","fintan","fionghuine","fionn","fionnbharr","fionnghuala","fionntán","fionnuala","fitheal","flann","flann","flannait","flannán","flora","fodhla","forbhlaith","froinsias","fáilbhe","féilim","féthnaid","féthnat","fíneamhain","fíona","garbhán","gearóid","geiléis","glaisne","gobnait","gormfhlaith","gormlaith","grace","granya","greagoir","gráinne","gréagóir","honora","iarfhlaith","iarlaith","iodhnait","irial","iósaf","ióseph","iúdás","jeremiah","john","kyle","labhrás","lachtna","lann","laoighseach","laoiseach","lasairfhíona","lasairian","laurence","lewis","lewis","liam","lochlainn","lochlann","lomán","lonán","lorcán","lubhrás","lughaidh","maeleachlainn","maelsheachlainn","maelíosa","mainchín","mairghréad","mairéad","maitiú","malachy","maodhóg","maoilir","maoilín","maolcholm","maolcholuim","maolmhuire","maolmórdha","maolruadháin","marion","mathghamhain","meabh","meadhbh","mealla","meaveen","meibhín","meidhbhín","miodhnait","mortimer","muadhnait","muircheartach","muireach","muireadhach","muireann","muirgheal","muirgheas","muirinn","muiris","muirne","murchadh","máire","máirtín","máirín","mícheál","míde","móirín","mór","naomhán","naos","neachtan","neasán","niall","niallán","niamh","nioclás","nuala","nóirín","nóra","odharnait","odhrán","oilibhéar","oireachtach","oisín","onóra","oscar","peadar","peig","peigi","peigín","pilib","proinsias","pádraig","póil","pól","raghnailt","raibhilín","rathnait","riain","risteárd","ristéard","roger","roibeard","roibeárd","roibhilín","roibéard","ros","ruadhán","ruaidhri","ruairi","ruairí","ruari","ruaridh","ruarí","ruibhilín","ráichéal","réamann","réamonn","ríoghnach","ríona","ríonach","róis","róisín","rónán","rós","sadhbh","saerbhreathach","saev","saoirse","saorfhlaith","saorla","saorlaith","sarah","seachnasach","seathan","senán","seoirse","seosamh","seán","seárlas","siadhal","siaghal","sinéad","siobhán","sioda","sláine","sorcha","stíofán","suibhne","séadna","séafra","séamas","séamus","séan","séaonin","síle","síomón","síthmaith","tadhg","taichleach","terry","tiarnach","tiarnán","tiernan","tighearnán","tighernach","timothy","tiobóid","toirdhealbhach","toirleach","tomás","torna","treabhair","tuathal","tuathflaith","téodóir","uaithne","uaitéar","ualgharg","uallach","uasal","uilliam","uinseann","ultán","vivian","ágastas","áilís","áine","árdghal","árón","éabha","éadaoin","éadbhárd","éamon","éanna","éanán","éibhear","éignach","éigneachán","éimhear","éimhín","éinde","éireamhón","émer","étaín","íde","órfhlaith","órla","órlaith","úna"];
TrainingData.italian_cities = ["acerra","acireale","afragola","agrigento","alessandria","altamura","ancona","andria","anzio","aprilia","arezzo","asti","avellino","aversa","bagheria","bari","barletta","battipaglia","benevento","bergamo","bisceglie","bitonto","bologna","bolzano","brescia","brindisi","cagliari","caltanissetta","campobasso","carpi","carrara","caserta","casoria","catania","catanzaro","cerignola","cesena","chieti","chioggia","civitavecchia","collegno","como","cosenza","cremona","crotone","cuneo","ercolano","faenza","fano","ferrara","fiumicino","florence","foggia","foligno","forli","gallarate","gela","genoa","giugliano","grosseto","imola","laspezia","latina","lecce","legnano","livorno","lucca","manfredonia","marsala","massa","matera","messina","milan","modena","modica","molfetta","moncalieri","montecelio","montesilvano","monza","naples","novara","olbia","padua","palermo","parma","pavia","perugia","pesaro","pescara","piacenza","pisa","pistoia","pomezia","pordenone","portici","potenza","pozzuoli","prato","ragusa","ravenna","reggiocalabria","reggioemilia","rho","rimini","rome","rovigo","salerno","sanremo","sassari","savona","scafati","scandicci","siena","syracuse","taranto","teramo","terni","tivoli","trani","trapani","trento","treviso","trieste","turin","udine","varese","velletri","venice","verona","viareggio","vicenza","vigevano","viterbo","vittoria"];
TrainingData.italian_foods = ["abbacchio","acetodolce","acquacotta","acquapazza","agliata","agnolotti","agrodolce","anguillamarinata","anisette","arancini","asiago","asino","babà","baccalà","baccalàfritto","bagnacàuda","bari","bavette","belpaese","biscotti","biscuittortoni","bisteccafiorentina","bitto","boreto","bozzapratese","bra","braciole","braciolone","breadsticks","bresaola","brodo","bruschetta","buccellato","buridda","burrata","burrini","butirro","cacciatore","cacciucco","caciocavallo","cacioricotta","calamarettifritti","calamariripieni","calzone","canestratopugliese","cannelloni","cannolo","capellini","capesante","capocollo","caponata","capponmagro","caprino","carbonara","carnepizzaiola","carrozza","casatiello","casiello","cassatasiciliana","castelmagno","casumodde","casècc","cevapcici","chiacchiere","chitarra","ciabatta","ciabusco","ciaccino","ciarduna","ciccillo","ciriola","conchiglie","coppiaferrarese","crauti","crescentina","crescenza","crocchè","crocetta","crostata","crostini","crostoli","crostui","crotonese","culatello","culatello","ditalini","eliche","farfalle","farinata","ficattola","fioresardo","focaccia","focacciaalrosmarino","fonduta","fontina","fragguno","frutti","fruttidibosco","garganelli","garmugia","gelato","ginestrata","giuncata","gnocchi","gorgonzola","goulash","granapadano","grancevola","granita","guanciale","gubana","insalatacaprese","insalatadiriso","lasagna","latteria","liptauer","lonza","maccheroni","maccu","malga","marzolino","marzotica","mascarpone","michetta","minestrone","moddizzosu","montasio","mortadella","mozzarella","muffuletta","murazzano","murenafritta","neccio","nervetti","oca","offelle","olives","orataarrosto","oratealforno","orzo","ossobuco","ossobuco","pancetta","pandoro","panettone","panforte","panino","pannacotta","panzanella","parmigianoreggiano","pastaalpesto","pastaefagioli","pastiera","pecorinoromano","pecorinosardo","penia","peperonata","peperoniimbottiti","pesto","pestât","piacentinu","piadina","piccolifrutti","pignolata","pinzimonio","pita","pizza","pizzacapricciosa","pizzamarinara","pizzapugliese","pizzaromana","pizzasiciliana","pizzelle","porcaloca","presnitz","primosale","profiterole","prosciutto","provolone","quartirolo","ragusano","ragù","raschera","ravioli","ricotta","ricottasalata","risotto","robiola","rosetta","salame","salami","salsiccia","scampi","scampigratinati","schiacciata","sciusceddu","semifreddo","slattato","spaghetti","spezzatino","spiedini","spinasanta","squacquerone","stelline","stigghiola","stoccafisso","stracchino","stracciatella","strolghino","strucchi","strucoli","struffoli","tabor","tacconi","taleggio","taralli","testaroli","testarolo","tigella","tiramisù","toma","tortacaprese","tortano","tortellini","vermicelli","zabaglione","ziti","bigoli","bucatini","cappelletti","crespelle","festoni","fettuccine","filatieddi","fusilli","gulash","lasagnette","linguine","lumache","malloreddus","maltagliati","marille","marrubini","rigatoni","tagliarini","tagliatelle","tonnarelli","tortellini","trenette","trofie","trottole"];
TrainingData.italian_forenames = ["achille","adamo","adelasia","adele","adelmo","adriana","adriano","agatha","agnolo","agostino","alberico","alberto","albina","aldo","alessandra","alessandro","alessia","alfredo","alina","alphons","amadeo","amanda","amedeo","amita","andrea","angelica","angelina","angelo","anita","annalisa","annetta","antonietta","antonio","arlo","armando","arsenio","arturo","aurora","baldassare","barbara","bartolomeo","beatrice","benedetto","benito","benvenuto","beppe","berenice","bernardo","bettina","bianca","biancamaria","bruno","camilla","camillo","carmelo","carmine","carolina","cassandra","caterina","cecilia","cesare","chiara","claudia","claudio","clelia","constantino","corrado","cosimo","costanzo","cristina","damiano","daniele","danilo","dante","daria","dario","davide","delfino","diana","dina","dino","domenico","donatella","durante","edoardo","elena","eliana","elisa","elmo","elvira","emiliana","emilio","emma","ennio","enrico","enzo","eraldo","erika","ermenegildo","ernesto","ettore","eugenia","eva","fabia","fabio","fabrizio","fausto","federico","federigo","ferdinando","fernanda","fiamma","filippa","filippo","fiorino","flavia","flavio","flora","francesca","francesco","fredo","fulvio","gabriele","gabriella","gaetano","gaspare","gastone","gemma","geppetto","giacinto","giacobbe","giacomo","giada","giampaolo","giampiero","gian","giancarlo","gianfrancesco","gianfranco","gianluca","gianluigi","gianmarco","gianna","gianni","gianpaolo","gianpietro","gilberto","gino","giorgia","giorgio","giovanna","giovanni","girolamo","giulia","giuliana","giuliano","giulietta","giulio","giuseppe","giuseppina","graziano","griselda","guarino","guglielmo","guido","gustavo","imelda","ingrid","irma","isa","isabella","ivo","jacopo","joseph","julia","lamberto","lando","lara","laureano","lauretta","leonardo","leone","liberto","licia","lilla","lina","livia","livio","lorenzo","luca","luchino","lucia","luciana","luciano","lucio","lucrezia","ludovica","ludovico","luigi","luisa","manuel","marcella","marcello","marco","maria","mariano","mariella","mario","marisa","marissa","martina","martino","massimiliano","massimo","matilda","matteo","maura","maurilio","maurizio","mauro","melania","melina","melissa","michela","michelangelo","michele","micheletto","michelotto","milena","milo","mirco","mirko","morena","nadia","napoleone","natalia","neri","niccolò","nicholas","nicola","nicole","nicoletta","nicolò","nina","nino","nunzio","omero","onofrio","orazio","oreste","orlando","ornella","osvaldo","ottavio","paloma","panfilo","paola","paolo","pascale","pasqual","pasquale","paulina","pellegrino","pierangelo","piergiorgio","piergiuseppe","pierluigi","piermaria","piersanti","pietro","pompeo","priscilla","puccio","rachel","raffaella","raffaello","renata","renato","renzo","riccardo","rita","roberto","rodolfo","rolando","romana","romina","romolo","rosa","rosalia","rosaria","rosario","rosina","ruggero","ruggiero","sabatino","salvatore","salvi","sandra","sandro","sante","santino","saverio","sebastian","serafina","serena","severino","silvestro","silvia","silvio","sonia","sophia","stefania","stefano","stella","susanna","tatiana","tazio","temistocle","tiziano","toni","torquato","tullio","ubaldo","ugo","umberto","valentina","valeria","valerio","vanessa","vanna","veronica","vincentio","vincenzo","virginia","viridiana","vito","vittoria","vittoria","vittorio","zaira","zanobi"];
TrainingData.japanese_cities = ["abashiri","abiko","adachi","agano","ageo","aioi","aira","aisai","aizuwakamatsu","akabira","akaiwa","akashi","aki","akiruno","akishima","akita","akitakata","akune","akō","ama","amagasaki","amakusa","amami","anan","anjō","annaka","aomori","arakawa","arao","arida","asago","asahi","asahikawa","asaka","asakuchi","asakura","ashibetsu","ashikaga","ashiya","aso","atami","atsugi","awa","awaji","awara","ayabe","ayase","azumino","bandō","beppu","bibai","bizen","bungotakada","bunkyo","buzen","chiba","chichibu","chigasaki","chikugo","chikuma","chikusei","chikushino","chino","chiryū","chita","chitose","chiyoda","chōfu","chōshi","chūō","chūō","daisen","daitō","date","date","dazaifu","ebetsu","ebina","ebino","echizen","edogawa","ena","eniwa","etajima","fuchū","fuchū","fuefuki","fuji","fujieda","fujiidera","fujimi","fujimino","fujinomiya","fujioka","fujisawa","fujiyoshida","fukagawa","fukaya","fukuchiyama","fukui","fukuoka","fukuroi","fukushima","fukutsu","fukuyama","funabashi","furano","fussa","futtsu","gamagōri","gero","gifu","ginowan","gobō","gojō","gose","gosen","goshogawara","gotenba","gotō","gujō","gyōda","gōtsu","habikino","hachimantai","hachinohe","hachiōji","hadano","hagi","hakodate","hakui","hakusan","hamada","hamamatsu","hamura","hanamaki","handa","hannan","hannō","hanyū","hashima","hashimoto","hasuda","hatsukaichi","hekinan","hida","hidaka","higashihiroshima","higashikagawa","higashikurume","higashimatsushima","higashimatsuyama","higashimurayama","higashine","higashiyamato","higashiōmi","higashiōsaka","hikari","hikone","himeji","himi","hino","hioki","hirado","hirakata","hirakawa","hiratsuka","hirosaki","hiroshima","hita","hitachi","hitachinaka","hitachiōmiya","hitachiōta","hitoyoshi","hokota","hokuto","hokuto","honjō","hyūga","hōfu","ibara","ibaraki","ibusuki","ichihara","ichikawa","ichikikushikino","ichinomiya","ichinoseki","iga","iida","iiyama","iizuka","ikeda","iki","ikoma","imabari","imari","imizu","ina","inabe","inagi","inashiki","inazawa","inuyama","inzai","iruma","isa","isahaya","ise","isehara","isesaki","ishigaki","ishikari","ishinomaki","ishioka","isumi","itabashi","itako","itami","itoigawa","itoman","itoshima","itō","iwade","iwaki","iwakuni","iwakura","iwamizawa","iwanuma","iwata","iyo","izu","izumi","izumi","izumisano","izumiōtsu","izumo","izunokuni","jōetsu","jōsō","jōyō","kadoma","kaga","kagoshima","kahoku","kai","kainan","kaizu","kaizuka","kakamigahara","kakegawa","kakogawa","kakuda","kama","kamagaya","kamaishi","kamakura","kameoka","kameyama","kami","kaminoyama","kamisu","kamo","kamogawa","kan'onji","kanazawa","kani","kanoya","kanuma","kanzaki","karatsu","kariya","kasai","kasama","kasaoka","kashiba","kashihara","kashima","kashima","kashiwa","kashiwara","kashiwazaki","kasuga","kasugai","kasukabe","kasumigaura","katagami","katano","katori","katsuragi","katsushika","katsuura","katsuyama","katō","kawachinagano","kawagoe","kawaguchi","kawanishi","kawasaki","kazo","kazuno","kesennuma","kikuchi","kikugawa","kimitsu","kinokawa","kirishima","kiryū","kisarazu","kishiwada","kita","kitaakita","kitahiroshima","kitaibaraki","kitakami","kitakata","kitakyūshū","kitami","kitamoto","kitanagoya","kitsuki","kiyose","kiyosu","kizugawa","kobayashi","kobe","kodaira","koga","koga","koganei","kokubunji","komae","komagane","komaki","komatsu","komatsushima","komoro","konan","kosai","koshigaya","koto","kudamatsu","kuji","kuki","kumagaya","kumamoto","kumano","kunisaki","kunitachi","kurashiki","kurayoshi","kure","kurihara","kurobe","kuroishi","kurume","kusatsu","kushima","kushiro","kuwana","kyoto","kyōtanabe","kyōtango","kōchi","kōfu","kōka","kōnan","kōnan","kōnosu","kōriyama","kōshi","kōshū","machida","maebashi","maibara","maizuru","makinohara","makurazaki","maniwa","marugame","masuda","matsubara","matsudo","matsue","matsumoto","matsusaka","matsuura","matsuyama","meguro","midori","mihara","mikasa","miki","mima","mimasaka","minamata","minamiashigara","minamiawaji","minamibōsō","minamikyūshū","minamisatsuma","minamishimabara","minamisōma","minato","mine","mino","minoh","minokamo","misato","misawa","mishima","mitaka","mito","mitoyo","mitsuke","miura","miyako","miyakojima","miyakonojō","miyama","miyawaka","miyazaki","miyazu","miyoshi","miyoshi","miyoshi","mizuho","mizunami","mobara","monbetsu","mooka","moriguchi","morioka","moriya","moriyama","motomiya","motosu","mukō","munakata","murakami","murayama","muroran","muroto","musashimurayama","musashino","mutsu","myōkō","nabari","nagahama","nagai","nagano","nagaoka","nagaokakyō","nagareyama","nagasaki","nagato","nago","nagoya","naha","naka","nakama","nakano","nakatsu","nakatsugawa","namegata","namerikawa","nan'yō","nanao","nanjō","nankoku","nantan","nanto","nara","narashino","narita","naruto","nasukarasuyama","nasushiobara","natori","nayoro","nemuro","nerima","neyagawa","nichinan","nihonmatsu","niigata","niihama","niimi","niiza","nikaho","nikkō","ninohe","nirasaki","nishinomiya","nishinoomote","nishio","nishitōkyō","nishiwaki","nisshin","nobeoka","noboribetsu","noda","nomi","nonoichi","noshiro","numata","numazu","nōgata","obama","obanazawa","obihiro","odawara","oga","ogi","ogōri","ojiya","okaya","okayama","okazaki","okegawa","okinawa","omaezaki","omitama","ono","onomichi","osaka","otaru","owariasahi","owase","oyabe","oyama","rikuzentakata","rittō","rumoi","ryūgasaki","sabae","sado","saga","sagae","sagamihara","saijō","saikai","saiki","saitama","saito","sakado","sakai","sakai","sakaide","sakaiminato","sakata","saku","sakura","sakura","sakuragawa","sakurai","sanda","sanjō","sanmu","sano","sanuki","sapporo","sasayama","sasebo","satsumasendai","satte","sayama","seiyo","seki","semboku","sendai","sennan","setagaya","seto","setouchi","settsu","shibata","shibetsu","shibukawa","shibushi","shibuya","shijōnawate","shiki","shikokuchūō","shima","shimabara","shimada","shimanto","shimoda","shimonoseki","shimotsuke","shimotsuma","shinagawa","shingū","shinjuku","shinjō","shinshiro","shiogama","shiojiri","shirakawa","shiroi","shiroishi","shisō","shizuoka","shōbara","shūnan","sodegaura","soo","special","suginami","suita","sukagawa","sukumo","sumida","sumoto","sunagawa","susaki","susono","suwa","suzaka","suzu","suzuka","sōja","sōka","sōma","sōsa","tachikawa","tagajō","tagawa","tahara","tainai","taitō","tajimi","takahagi","takahama","takahashi","takaishi","takamatsu","takaoka","takarazuka","takasago","takasaki","takashima","takatsuki","takayama","takehara","takeo","taketa","takikawa","takizawa","taku","tama","tamana","tamano","tamba","tamura","tanabe","tarumizu","tatebayashi","tateyama","tatsuno","tendō","tenri","toba","tochigi","toda","toki","tokoname","tokorozawa","tokushima","tomakomai","tome","tomigusuku","tomioka","tomisato","tonami","tondabayashi","toride","tosa","tosashimizu","toshima","tosu","tottori","towada","toyama","toyoake","toyohashi","toyokawa","toyonaka","toyooka","toyota","tsu","tsubame","tsuchiura","tsugaru","tsukuba","tsukubamirai","tsukumi","tsuru","tsuruga","tsurugashima","tsuruoka","tsushima","tsushima","tsuyama","tōgane","tōkai","tōkamachi","tōmi","tōno","tōon","ube","uda","ueda","uenohara","uji","uki","ukiha","unnan","unzen","uonuma","uozu","urasoe","urayasu","ureshino","uruma","usa","ushiku","usuki","utashinai","uto","utsunomiya","uwajima","wajima","wakayama","wakkanai","wakō","warabi","yabu","yachimata","yachiyo","yaita","yaizu","yamaga","yamagata","yamagata","yamaguchi","yamanashi","yamato","yamatokōriyama","yamatotakada","yame","yanagawa","yanai","yao","yashio","yasu","yasugi","yatomi","yatsushiro","yawata","yawatahama","yokkaichi","yokohama","yokosuka","yokote","yonago","yonezawa","yoshikawa","yoshinogawa","yotsukaidō","yufu","yukuhashi","yurihonjō","yuzawa","yūbari","yūki","zama","zentsūji","zushi","ōbu","ōda","ōdate","ōfunato","ōgaki","ōita","ōkawa","ōmachi","ōme","ōmihachiman","ōmura","ōmuta","ōno","ōnojō","ōsakasayama","ōsaki","ōshū","ōta","ōta","ōtake","ōtawara","ōtsu","ōtsuki","ōzu"];
TrainingData.japanese_forenames = ["ai","aiko","aimi","airi","akane","akari","akemi","aki","akie","akifumi","akihiko","akihiro","akihisa","akihito","akiko","akimasa","akimi","akimitsu","akina","akinobu","akinori","akio","akira","akisada","akishige","akito","akitoshi","akitsugu","akiyoshi","akiyuki","amane","ami","anri","anzu","aoi","arata","arihiro","arinaga","arinobu","aritomo","asako","asami","asao","asuka","asuka","asumi","asuna","atomu","atsuhiko","atsuhiro","atsuko","atsumi","atsuo","atsushi","atsuto","atsuya","aya","ayaka","ayako","ayame","ayana","ayane","ayano","ayu","ayuka","ayumi","ayumu","azuma","azumi","azusa","banri","bunji","bunta","chiaki","chie","chieko","chiemi","chiharu","chihiro","chiho","chika","chikara","chikayoshi","chinami","chinatsu","chisato","chitose","chiyako","chiyo","chiyoko","chizuko","chizuru","choki","chōei","chūichi","dai","daichi","daigo","daiki","dairoku","daishin","daisuke","daizō","eiichi","eiichiro","eiji","eijirō","eikichi","eiko","eimi","einosuke","eishun","eisuke","eizō","emi","emiko","emiri","eri","erika","eriko","etsuji","etsuko","fujiko","fujio","fukumi","fumiaki","fumie","fumihiko","fumihiro","fumika","fumiko","fumio","fumito","fumiya","fusako","fusanosuke","fusazane","futoshi","fuyuki","fuyuko","gaku","gakuto","gen'ichi","gen'ichirō","genjiro","genta","gentarō","genzo","giichi","gin","goichi","goro","hachirō","hajime","hakaru","hana","hanae","hanako","haru","haruaki","haruchika","harue","haruhi","haruhiko","haruhiro","haruhisa","haruka","haruki","haruko","harumi","haruna","harunobu","haruo","harutaka","haruto","haruyo","haruyoshi","hatsu","hatsue","hatsuo","hayanari","hayate","hayato","hazuki","heihachirō","heisuke","hideaki","hideharu","hidehiko","hidehito","hideji","hidekazu","hideki","hideko","hidemasa","hidemi","hidemi","hidemitsu","hidenobu","hidenori","hideo","hideshi","hidetaka","hideto","hidetoshi","hidetsugu","hideyo","hideyoshi","hideyuki","hikari","hikaru","himeko","hinata","hiro","hiroaki","hiroe","hirofumi","hirohide","hirohisa","hiroji","hirokatsu","hirokazu","hiroki","hiroko","hirokuni","hiromasa","hiromi","hiromichi","hiromitsu","hiromori","hiromu","hironari","hironobu","hironori","hiroshi","hiroshige","hirotaka","hirotami","hiroto","hirotoki","hirotomo","hirotoshi","hirotsugu","hiroya","hiroyasu","hiroyo","hiroyoshi","hiroyuki","hisae","hisahito","hisako","hisamitsu","hisamoto","hisanobu","hisanori","hisao","hisashi","hisataka","hisateru","hisato","hisaya","hisaya","hisayasu","hisayo","hisayoshi","hisayuki","hitomi","hitoshi","hokuto","honami","hotaru","hozumi","ichiei","ichiko","ichirō","ichizō","iehisa","iemasa","iemon","iesada","ikko","ikue","ikumi","ikuo","ikurō","iori","ippei","isami","isamu","isao","issei","itaru","itsuki","itsuko","itsumi","iwao","izumi","jiichirō","jin","jin'ichi","jinpachi","jiro","jitsuko","jun","jun'ichirō","jun'ya","junichi","junji","junki","junko","junpei","junzō","jōichirō","jōji","jōkichi","jōtarō","jūbei","jūkichi","jūshirō","jūtarō","jūzō","kaede","kagami","kagemori","kagetaka","kaguya","kaho","kahoru","kaiji","kaito","kakichi","kaku","kakuji","kan'ichi","kana","kanae","kanako","kaname","kanehira","kanehiro","kanematsu","kanemoto","kanesuke","kanetake","kaneto","kanetsugu","kaneyoshi","kankuro","kansuke","kaori","kaoru","karin","kasumi","katsuaki","katsuei","katsuhiko","katsuhiro","katsuhisa","katsuhito","katsuji","katsuki","katsukiyo","katsuko","katsumasa","katsumi","katsumoto","katsunaga","katsunari","katsunori","katsunosuke","katsuo","katsushi","katsusuke","katsutarō","katsuteru","katsutomo","katsutoshi","katsuya","katsuyoshi","katsuyuki","kawai","kayo","kayoko","kazu","kazuaki","kazue","kazuharu","kazuhiko","kazuhiro","kazuhisa","kazuhito","kazuki","kazuko","kazuma","kazumasa","kazumi","kazunari","kazunori","kazuo","kazuoki","kazurō","kazusa","kazushi","kazushige","kazutaka","kazuto","kazutoki","kazutoshi","kazuya","kazuyo","kazuyoshi","kazuyuki","kei","keigo","keiichi","keiichirō","keiji","keijirō","keijū","keiki","keiki","keiko","keinosuke","keishi","keisuke","keita","keizō","ken","ken'ichi","ken'ichirō","ken'yū","kengo","kenji","kenjirō","kenki","kenkichi","kensaku","kenshin","kensuke","kenta","kentaro","kento","kenzo","kesao","kihachi","kihachirō","kihei","kiichirō","kiko","kikue","kikuko","kikuo","kimiko","kimio","kimiya","kin'ichi","kin'ichirō","kin'ya","kinji","kinjirō","kintaro","kira","kisaburō","kishō","kiyoaki","kiyofumi","kiyohide","kiyohiko","kiyohiro","kiyoji","kiyokazu","kiyoko","kiyomoto","kiyonari","kiyonori","kiyoshi","kiyosue","kiyotaka","kiyotake","kiyoyuki","kogorō","koharu","koji","kojiro","konomi","koson","kotaro","kotomi","kotori","kouta","koya","kozue","kumatarō","kumi","kumiko","kuniaki","kunie","kunihiko","kunihiro","kunihisa","kuniko","kunimitsu","kunio","kunitake","kuniyuki","kuranosuke","kurenai","kurumi","kusuo","kyo","kyoko","kyukichi","kyōhei","kyōichi","kyōji","kyōsuke","kōhei","kōichi","kōichirō","kōki","kōkichi","kōnosuke","kōsaku","kōsei","kōshirō","kōsuke","kōzō","maaya","machi","machiko","madoka","mahiro","maho","maiko","maki","makiko","makio","mako","makoto","mami","mamiko","mamoru","mana","manabu","manami","manjirō","mantarō","mao","mareo","mari","mariko","marié","masaaki","masabumi","masachika","masae","masafumi","masaharu","masahide","masahiko","masahiro","masahisa","masahito","masaichi","masaie","masaji","masakage","masakatsu","masakazu","masaki","masako","masakuni","masami","masamichi","masamitsu","masamori","masamune","masamura","masanao","masanobu","masanori","masao","masaomi","masaru","masashi","masashige","masataka","masatake","masatane","masateru","masato","masatomo","masatoshi","masatsugu","masaya","masayoshi","masayuki","masazumi","masumi","masuo","masuzō","matabei","matsuchi","matsuki","matsuko","matsuo","matsushige","mayako","mayu","mayuko","mayumi","mayura","megu","megumi","mei","meiko","meisa","michiaki","michiharu","michihiko","michihiro","michihisa","michiko","michinori","michio","michiru","michirō","michitaka","michitarō","michiya","michiyo","michiyoshi","midori","mie","mieko","miho","miiko","mika","mikako","miki","mikiko","mikio","mikoto","miku","mikuni","mikuru","mimori","mina","minae","minako","minami","mineichi","mineko","mineo","minori","mirai","misaki","misako","misao","misato","mitsuaki","mitsugi","mitsugu","mitsuharu","mitsuhide","mitsuhiko","mitsuhira","mitsuhiro","mitsuhisa","mitsuki","mitsuko","mitsumasa","mitsumori","mitsunobu","mitsunori","mitsuo","mitsuomi","mitsuru","mitsusuke","mitsutaka","mitsuteru","mitsutoshi","mitsuyasu","mitsuyo","mitsuyo","mitsuyoshi","mitsuyuki","miu","miwa","miwako","miyabi","miyako","miyoko","miyu","miyuki","miyumi","miyū","mizuho","mizuki","mizuko","mochiaki","moe","mokichi","momo","momoe","momoka","momoko","morihiko","morihiro","morikazu","morimasa","morio","moritaka","mosuke","motoaki","motoharu","motohiko","motohiro","motoichi","motojirō","motoki","motoko","motomu","motonobu","motoshi","motoshige","motosuke","mototada","mototsugu","motoyasu","motoyuki","motozane","mukuro","munehiro","munemori","munenobu","munenori","muneo","muneshige","munetaka","munetoki","munetoshi","murashige","mutsuko","mutsumi","mutsuo","nagaharu","nagahide","nagako","nagamasa","nagamichi","naganao","naganori","nagatoki","nagatomo","nagisa","nami","namio","nana","nanako","nanami","nanase","nankichi","nao","naofumi","naohiko","naohiro","naohisa","naohito","naoji","naokatsu","naoki","naoko","naomasa","naomi","naomichi","naomori","naoshi","naotaka","naotake","naoto","naoya","naoyuki","naozumi","nariaki","nariakira","naritaka","nariyasu","nariyuki","naruhisa","naruhito","narumi","natsue","natsuki","natsuko","natsume","natsumi","noa","noboru","nobuaki","nobuatsu","nobuharu","nobuhiko","nobuhiro","nobuhisa","nobuhito","nobukatsu","nobukazu","nobuko","nobumasa","nobumitsu","nobumoto","nobunao","nobunari","nobuo","nobusada","nobusuke","nobutaka","nobuteru","nobutoki","nobutomo","nobutoshi","nobutsuna","nobuyasu","nobuyoshi","nobuyuki","nodoka","noriaki","norifumi","norifusa","norihiko","norihiro","norihito","norikazu","noriko","norimasa","norio","noriyasu","noriyo","noriyoshi","noriyuki","nozomi","nozomu","okimoto","okitsugu","omi","osamu","otoha","otohiko","otome","raizo","ran","rei","reiichi","reiji","reika","reiko","reizō","ren","rena","rentarō","rie","rieko","riho","riichi","rika","rikichi","rikiya","riku","rin","rina","rinshō","risa","ritsuko","rokurō","rumi","rumiko","runa","ruri","ruriko","ryoko","ryu","ryō","ryōhei","ryōichi","ryōji","ryōka","ryōma","ryōsei","ryōsuke","ryōta","ryōtarō","ryōzō","ryūhei","ryūichi","ryūji","ryūki","ryūnosuke","ryūsaku","ryūsei","ryūsuke","ryūta","ryūtarō","ryūya","ryūzō","saburō","sachie","sachiko","sachio","sadaaki","sadaharu","sadahiko","sadako","sadao","sadatoshi","sadayoshi","sadazane","saeko","saiichi","sakae","saki","sakichi","sakie","sakiko","sakura","sakurako","sanae","saori","satoko","satomi","satonari","satoru","satoshi","satsuki","satsuo","sawako","saya","sayaka","sayako","sayoko","sayumi","sayuri","seigen","seigo","seihō","seiichi","seiichirō","seiji","seijin","seijirō","seikichi","seiko","seishi","seishirō","seiya","seizō","senkichi","setsuko","setsuna","shichirō","shigeaki","shigefumi","shigeharu","shigehiro","shigehisa","shigekazu","shigeki","shigeko","shigemasa","shigematsu","shigemi","shigemitsu","shigenaga","shigenobu","shigenori","shigeo","shigeri","shigeru","shigetada","shigetaka","shigeto","shigetoshi","shigeyasu","shigeyoshi","shigeyuki","shiho","shiina","shikō","shimako","shin","shin'ichi","shin'ichirō","shinako","shingo","shinji","shinjirō","shinjō","shinkichi","shino","shinobu","shinpei","shinsaku","shinsuke","shinta","shintarō","shinya","shinzō","shion","shiori","shizue","shizuka","shizuko","shizuo","shoko","shuko","shuko","shun","shun'ichi","shun'ichirō","shun'ya","shunji","shunkichi","shunpei","shunsaku","shunsuke","shuntarō","shunzō","shō","shōgo","shōhei","shōichi","shōji","shōjirō","shōma","shōsuke","shōta","shōtarō","shōya","shōzō","shūgo","shūhei","shūichi","shūji","shūsaku","shūsuke","shūta","shūzō","sonosuke","sora","subaru","suehiro","suguru","sukehiro","sukemasa","suketoshi","suketsugu","sumika","sumiko","sumio","sumire","sumiyoshi","sunao","susumu","suzue","suzuko","sōgen","sōichi","sōichirō","sōji","sōsuke","sōtarō","tadaaki","tadachika","tadafumi","tadaharu","tadahiko","tadahiro","tadahito","tadakatsu","tadamasa","tadami","tadamori","tadanaga","tadanao","tadanari","tadanobu","tadanori","tadao","tadaoki","tadashi","tadataka","tadateru","tadatomo","tadatoshi","tadatsugu","tadatsune","tadayo","tadayoshi","tadayuki","taeko","taichi","taichirō","taiga","taiichi","taiji","taiki","taishi","taisuke","taka","takaaki","takafumi","takahide","takahiko","takahiro","takahisa","takahito","takaki","takako","takamasa","takamitsu","takanobu","takanori","takao","takashi","takatomi","takatoshi","takatsugu","takauji","takaya","takayasu","takayoshi","takayuki","takeaki","takefumi","takeharu","takehiko","takehiro","takehisa","takehito","takeichi","takejirō","takeko","takenaga","takenori","takeo","takeru","takeshi","taketo","taketora","taketoshi","takeya","takeyoshi","takezō","taku","takuji","takuma","takumi","takuo","takurō","takuto","takuya","takuzō","tamaki","tamao","tamiko","tamio","tamotsu","tarō","tateo","tatsuaki","tatsuhiko","tatsuhiro","tatsuhito","tatsuji","tatsuko","tatsuma","tatsumi","tatsunori","tatsuo","tatsurō","tatsushi","tatsuya","tatsuyoshi","tatsuyuki","teiji","teijirō","teiko","teiko","teizō","teppei","teru","teruaki","teruhiko","teruhisa","teruko","terumasa","terumi","terunobu","teruo","teruyoshi","teruyuki","tetsu","tetsuharu","tetsuji","tetsumasa","tetsuo","tetsurō","tetsushi","tetsutarō","tetsuya","tetsuzō","togo","tokihiko","tokiko","tokio","tokuji","tokujirō","tokuko","tokuo","tokurō","tokutarō","tomiko","tomio","tomo","tomoaki","tomochika","tomoe","tomoharu","tomohide","tomohiko","tomohiro","tomohisa","tomohito","tomoji","tomoka","tomokazu","tomoki","tomoko","tomomi","tomomichi","tomonobu","tomonori","tomotaka","tomoya","tomoyasu","tomoyo","tomoyoshi","tomoyuki","torahiko","toru","toshi","toshiaki","toshiharu","toshihide","toshihiko","toshihiro","toshihisa","toshihito","toshikatsu","toshikazu","toshiki","toshiko","toshimasa","toshimi","toshimichi","toshimitsu","toshinaga","toshinari","toshinobu","toshinori","toshio","toshirō","toshitada","toshitaka","toshitsugu","toshiya","toshiyasu","toshiyuki","toshizō","toyoaki","toyohiko","toyokazu","toyoko","toyomatsu","toyoshige","toyozō","tsubasa","tsugio","tsukasa","tsuneharu","tsunehisa","tsunejirō","tsuneko","tsunemi","tsunenori","tsuneo","tsuneyoshi","tsuneyuki","tsutomu","tsuyoshi","umanosuke","umeji","umeko","wakako","wataru","yaeko","yahiko","yahiro","yanosuke","yasuaki","yasue","yasufumi","yasuharu","yasuhide","yasuhiko","yasuhiro","yasuhisa","yasuji","yasujirō","yasukazu","yasuki","yasuko","yasumasa","yasumi","yasumichi","yasunari","yasunobu","yasunori","yasuo","yasurō","yasushi","yasutaka","yasutomo","yasutoshi","yasuyoshi","yasuyuki","yatarō","yayoi","yoko","yorimitsu","yorinobu","yorishige","yoritaka","yoritsugu","yoritsune","yoriyuki","yoshi","yoshifumi","yoshihide","yoshihiko","yoshihiro","yoshihisa","yoshihito","yoshiie","yoshika","yoshikane","yoshikatsu","yoshikazu","yoshiki","yoshikiyo","yoshiko","yoshikuni","yoshimasa","yoshimatsu","yoshimi","yoshimichi","yoshinaga","yoshinao","yoshinari","yoshino","yoshinobu","yoshinori","yoshio","yoshirō","yoshisada","yoshishige","yoshisuke","yoshitaka","yoshitake","yoshitarō","yoshiteru","yoshito","yoshitomo","yoshitsugu","yoshiya","yoshiyasu","yoshiyuki","yugi","yugo","yui","yuka","yukari","yuki","yukie","yukiharu","yukihiko","yukihiro","yukiko","yukimasa","yukimura","yukina","yukinobu","yukinori","yukio","yukitaka","yukito","yukiya","yumeko","yumi","yumika","yumiko","yuri","yurie","yurika","yuriko","yurina","yutaka","yuzuru","yō","yō","yōhei","yōichi","yōichirō","yōji","yōjirō","yōsuke","yōta","yōzō","yū","yūdai","yūhei","yūichi","yūichirō","yūji","yūjirō","yūkichi","yūko","yūsaku","yūsei","yūshi","yūsuke","yūta","yūtarō","yūto","yūya","yūzō","zenjiro","zenkichi","zentarō","zenzō"];
TrainingData.languages = ["afrikaans","arabic","belarusian","bengali","bosnian","bulgarian","catalan","cherokee","chinese","croatian","czech","danish","dutch","english","estonian","filipino","finnish","french","german","greek","hawaiian","hebrew","hungarian","indonesian","italian","japanese","korean","latvian","lithuanian","malay","moldavian","norwegian","persian","polish","pomeranian","portuguese","romani","romanian","russian","serbian","slovak","slovenian","somali","spanish","swedish","thai","turkish","ukranian","uzbek","vietnamese"];
TrainingData.magic_spells = ["acidburst","aero","animatedead","apocalypse","apokalypse","arise","armageddon","aura","barrier","berserk","bio","bioga","biora","blades","blind","blizzaga","blizzara","blizzard","break","break","candlelight","chainlightning","coldbeam","comet","confuse","cura","curaga","cure","darkbolt","death","deathripple","debarrier","deepfreeze","demi","dispel","doomsday","double","dragonbreath","drain","esuna","fira","fira","firaga","fire","fireball","fireblast","firebolt","fireburst","firering","firerune","fireshield","flamecloak","flames","flare","float","forcefield","freeze","frenzy","frostbite","frostbolt","frostcloak","frostring","frostrune","fury","graviga","gravira","gravity","haste","holy","hysteria","iceblast","iceblitz","icebolt","iceburst","icerush","iceshards","icespear","icespike","icestorm","ignite","implosion","incinerate","inferno","ironflesh","life","life","lightningbolt","magelight","magicmirror","meltdown","meteor","mini","moonray","name","necromancy","osmose","pain","paralyze","poison","poisona","protect","quaga","quakra","quicksand","raise","reanimate","reflect","regen","renew","resist","resurrect","rockblast","scan","shadowblitz","shadowbolt","shadowburst","sharpmetal","shell","shield","shockshield","silence","sleep","slow","souldrinker","soulstealer","soultrap","sparks","starburst","stoneflesh","stop","sunfire","sunflame","teleport","thundaga","thundara","thunder","thunderbolt","thunderspear","toad","torchlight","tornado","transmute","triple","ultima","wall","water","zombie"];
TrainingData.meats = ["bacon","beef","beefliver","beefplate","beefshank","beefsteak","beeftongue","brisket","bushmeat","calfliver","chicken","crab","crabmeat","cutlet","darkmeat","duck","fishfillet","flanksteak","goat","goose","gooseliver","groundbeef","ham","horse","lamb","lean","loinchop","meat","meatball","meatchop","mince","mincemeat","mutton","patridge","pheasant","pigeon","pork","poultry","quail","rabbit","redmeat","ribchop","riblets","ribs","ribsteak","rumpsteak","shortribs","squab","steak","turkey","veal","venison","whitemeat","wildboar"];
TrainingData.minerals = ["abelsonite","abenakiite","abernathyite","abhurite","abramovite","abswurmbachite","acanthite","achavalite","actinolite","acuminite","adamantine","adamite","adamsite","adelite","admontite","aegirine","aenigmatite","aerinite","aerugite","aeschynite","aeschynite","aeschynite","afghanite","afwillite","agardite","agate","agrellite","agrinierite","aguilarite","aheylite","ahlfeldite","aikinite","ajoite","akaganéite","akatoreite","akdalaite","akhtenskite","akimotoite","akrochordite","aksaite","aktashite","alabandite","alabaster","alacránite","alamosite","alarsite","albite","albrechtschraufite","aldermanite","aleksite","alexandrite","alforsite","algodonite","aliettite","allabogdanite","allactite","allanite","allanpringite","allargentum","alleghanyite","allingite","alloclasite","allophane","alluaivite","alluaudite","almandine","almarudite","alsakharovite","alstonite","altaite","althausite","althupite","altisite","alum","aluminite","aluminium","alunite","alunogen","amakinite","amarantite","amazonite","amber","amblygonite","ameghinite","amesite","amethyst","amicite","ammolite","amosite","amphibole","analcime","anandite","anapaite","anatase","ancylite","andalusite","andersonite","andesine","andorite","andradite","andyrobertsite","anglesite","anhydrite","ankerite","annabergite","annite","anorthite","anorthoclase","antarcticite","anthonyite","anthophyllite","antigorite","antimony","antitaenite","antlerite","antozonite","anyolite","apachite","apatite","aphthitalite","apophyllite","aquamarine","aragonite","arcanite","archerite","arctite","arcubisite","ardaite","arfvedsonite","argentite","argentite","argutite","argyrodite","armalcolite","arsenic","arseniosiderite","arsenoclasite","arsenolite","arsenopyrite","arthurite","artinite","artroeite","asbestos","ashburtonite","ashoverite","asisite","astrophyllite","atacamite","athabascaite","atheneite","aubertite","auerlite","augelite","augite","aurichalcite","auricupride","aurostibite","austinite","autunite","avalite","aventurine","avicennite","avogadrite","awaruite","axinite","azurite","babefphite","babingtonite","baddeleyite","bakerite","balangeroite","banalsite","baotite","bararite","barbertonite","barrerite","barstowite","baryte","barytocalcite","bassanite","bastnäsite","baumhauerite","bauxite","bayldonite","bayleyite","bazzite","beckerite","becquerelite","benitoite","benstonite","bentonite","bentorite","beraunite","berborite","bergenite","berlinite","berryite","berthierite","bertrandite","beryl","beryllonite","beudantite","bicchulite","biehlite","billietite","billwiseite","biotite","birnessite","bischofite","bismite","bismuth","bismuthinite","bismutite","bityite","bixbite","bixbyite","blossite","blödite","bobfergusonite","boehmite","boleite","boltwoodite","bonaccordite","boracite","borax","bornite","botallackite","botryogen","boulangerite","bournonite","boussingaultite","bowenite","bowieite","braggite","brammallite","brassite","braunite","brazilianite","breithauptite","brewsterite","brezinaite","brianite","brianyoungite","briartite","bridgmanite","brochantite","brockite","brokenhillite","bromargyrite","bromellite","bronzite","brookite","brownleeite","brownmillerite","brucite","brushite","buddingtonite","buergerite","bukovite","bukovskyite","bultfonteinite","bunsenite","bursaite","bustamite","bystrite","bytownite","bílinite","cabalzarite","cabriite","cacoxenite","cadmium","cadmoindite","cadmoselite","cadwaladerite","cafarsite","cafetite","cahnite","calaverite","calciborite","calcite","calderite","caledonite","calumetite","campigliaite","campylite","canavesite","cancrinite","canfieldite","carletonite","carlosruizite","carlsbergite","carminite","carnallite","carnelian","carnotite","carobbiite","carpathite","carpholite","carrollite","caryopilite","cassiterite","cattierite","cavansite","celadonite","celestine","celsian","cementite","cerite","cerium","cerussite","cervandonite","cervantite","cesanite","cesbronite","ceylonite","chabazite","chaidamuite","chalcanthite","chalcedony","chalcocite","chalcophyllite","chalcopyrite","challacolloite","chambersite","chamosite","changbaiite","chaoite","chapmanite","charoite","chatkalite","chesterite","chiastolite","chibaite","childrenite","chlorargyrite","chlorastrolite","chlorite","chloritoid","chlormayenite","chlorocalcite","chloroxiphite","chondrodite","chrisstanleyite","christite","chromite","chromium","chrysoberyl","chrysocolla","chrysoprase","chrysotile","chrysotile","chvaleticeite","cinnabar","citrine","clarkeite","claudetite","clausthalite","clearcreekite","cleusonite","cleveite","clinochrysotile","clinoclase","clinohedrite","clinohumite","clinoptilolite","clinozoisite","clintonite","cobaltite","coccinite","coconinoite","coesite","coffinite","cohenite","colemanite","colimaite","collinsite","coloradoite","coltan","columbite","combeite","conichalcite","connellite","cooperite","copiapite","copper","corderoite","cordierite","corkite","cornubite","cornwallite","corundum","cotunnite","covellite","coyoteite","creedite","cristobalite","crocidolite","crocoite","cronstedtite","crookesite","crossite","cryolite","cryptomelane","cubanite","cumberlandite","cummingtonite","cupalite","cuprite","cuprosklodowskite","cuprospinel","curite","cuspidine","cyanotrichite","cylindrite","cymophane","cymrite","cyrilovite","danalite","danburite","datolite","daubréeite","daubréelite","davidite","dawsonite","delafossite","delessite","delvauxite","demesmaekerite","derriksite","descloizite","devilline","diaboleite","diadochite","diamond","diaspore","diatomite","dickite","digenite","dimorphite","diopside","dioptase","djerfisherite","djurleite","dmitryivanovite","dollaseite","dolomite","domeykite","donnayite","drysdallite","duftite","dumortierite","dundasite","dypingite","dyscrasite","dzhalindite","edenite","edingtonite","efremovite","ekanite","elbaite","elsmoreite","emerald","emery","emmonsite","empressite","enargite","enstatite","eosphorite","ephesite","epidote","epsomite","ericssonite","erionite","erythrite","eskolaite","esperite","ettringite","euchroite","euclase","eucryptite","eudialyte","euxenite","eveite","evenkite","eveslogite","fabianite","farneseite","fassaite","faujasite","faustite","fayalite","feldspar","feldspathoid","felsőbányaite","ferberite","fergusonite","feroxyhyte","ferricrete","ferrierite","ferrihydrite","ferrimolybdite","ferroactinolite","ferrocolumbite","ferrogedrite","ferrohortonolite","ferronigerite","ferropericlase","ferroselite","ferrotantalite","fettelite","fichtelite","fletcherite","fluckite","fluellite","fluoborite","fluocerite","fluorapatite","fluorapophyllite","fluorbuergerite","fluorcaphite","fluorellestadite","fluorite","fluorliddicoatite","fluororichterite","fluorspar","fluoruvite","fornacite","forsterite","fougèrite","fourmarierite","fraipontite","francevillite","franckeite","francolite","frankamenite","frankdicksonite","frankhawthorneite","franklinite","franklinphilite","freibergite","freieslebenite","fukuchilite","gabrielite","gadolinite","gagarinite","gahnite","galaxite","galena","galkhaite","gananite","garnet","garnierite","gaspeite","gatehouseite","gaylussite","gedanite","gedrite","geerite","gehlenite","geigerite","geikielite","geocronite","georgerobinsonite","germanite","gersdorffite","getchellite","gibbsite","gilalite","gismondine","glauberite","glaucochroite","glaucodot","glauconite","glaucophane","glessite","gmelinite","godovikovite","goethite","gold","goldmanite","gonnardite","gordaite","gormanite","goslarite","graftonite","grandidierite","grandreefite","graphite","gratonite","greenalite","greenockite","gregoryite","greifensteinite","greigite","grossite","grossular","groutite","grunerite","guettardite","gugiaite","guilleminite","gummite","gunningite","guyanaite","gwihabaite","gypsum","hafnon","hagendorfite","haggertyite","haidingerite","haiweeite","halite","halloysite","halotrichite","hambergite","hanksite","hapkeite","hardystonite","harmotome","hatchettite","hauerite","hausmannite","hauyne","hawleyite","haxonite","hazenite","heazlewoodite","hectorite","hedenbergite","heliodor","heliotrope","hellyerite","hematite","hemihedrite","hemimorphite","hemusite","herbertsmithite","hercynite","herderite","hessite","hessonite","heulandite","hexaferrum","hibonite","hidalgoite","hiddenite","hilgardite","hisingerite","hiärneite","hodgkinsonite","hoelite","hollandite","holmquistite","homilite","hopeite","hornblende","howlite","hsianghualite","hubeite","huemulite","humite","huntite","hureaulite","hutchinsonite","huttonite","hyalite","hyalophane","hydroboracite","hydrogrossular","hydrohalite","hydrokenoelsmoreite","hydromagnesite","hydrotalcite","hydroxylapatite","hydrozincite","hypersthene","håleniusite","hübnerite","ianbruceite","ice","icosahedrite","idocrase","idrialite","ikaite","illite","ilmenite","ilvaite","imogolite","indite","indium","inyoite","iodargyrite","iolite","iranite","iridium","iron","ixiolite","jacobsite","jadarite","jade","jadeite","jaffeite","jalpaite","jamesonite","janggunite","jarosewichite","jarosite","jasper","jeffersonite","jennite","jeremejevite","jerrygibbsite","jet","jimthompsonite","johannite","jolliffeite","jonesite","jordanite","julgoldite","junitoite","jurbanite","kaatialaite","kadyrelite","kaersutite","kainite","kainosite","kalininite","kalinite","kalsilite","kamacite","kambaldaite","kamiokite","kampfite","kanoite","kaolinite","karlite","kassite","kaňkite","kegelite","keilhauite","keilite","kermesite","kernite","kerolite","kesterite","keyite","khatyrkite","kieserite","kinoite","knebelite","knorringite","kobellite","kochite","kogarkoite","kolbeckite","kornerupine","kosmochlor","kostovite","kovdorskite","krantzite","kratochvílite","kremersite","krennerite","krieselite","krotite","krutovite","kröhnkite","kukharenkoite","kunzite","kuratite","kurnakovite","kutnohorite","kyanite","köttigite","labradorite","lanarkite","langbeinite","langite","lansfordite","lanthanite","lapislazuli","laplandite","larimar","larnite","laumontite","laurionite","laurite","lautite","lavendulan","lawsonite","lazulite","lazurite","lead","leadhillite","lechatelierite","legrandite","leifite","leightonite","lepidocrocite","lepidolite","letovicite","leucite","leucophanite","leucophoenicite","libethenite","liebigite","lignite","limonite","linarite","lindgrenite","linnaeite","lipscombite","liroconite","litharge","lithiophilite","livingstonite","lizardite","lodestone","loellingite","lonsdaleite","loparite","lorenzenite","lorándite","loveringite","lublinite","ludlamite","ludwigite","lulzacite","lyonsite","lévyne","lópezite","macaulayite","macdonaldite","mackinawite","madocite","magadiite","maghemite","magnesia","magnesioferrite","magnesiohastingsite","magnesiopascoite","magnesite","magnetite","majorite","malachite","malacolite","malayaite","manganite","manganocolumbite","manganosite","manganotantalite","manganvesuvianite","marcasite","margaritasite","margarite","marialite","maricite","mariposite","marrite","marthozite","mascagnite","massicot","masuyite","matlockite","maucherite","mawsonite","mckelveyite","meerschaum","meionite","melanite","melanophlogite","melanterite","melilite","mellite","melonite","mendipite","mendozite","meneghinite","menilite","mercury","mereheadite","merenskyite","meridianiite","merrillite","mesolite","messelite","metacinnabar","metatorbernite","metazeunerite","meyerhofferite","miargyrite","mica","microcline","microlite","millerite","millosevichite","mimetite","minium","minnesotaite","minyulite","mirabilite","mixite","moganite","mohite","mohrite","moissanite","molybdenite","molybdite","monazite","monohydrocalcite","monticellite","montmorillonite","mooihoekite","moolooite","mordenite","morganite","moschellandsbergite","mosesite","mottramite","motukoreaite","mullite","mundite","murdochite","muscovite","musgravite","nabalamprophyllite","nabesite","nacrite","nadorite","nagyágite","nahcolite","naldrettite","nambulite","narsarsukite","natrolite","natron","natrophilite","nekrasovite","nelenite","nenadkevichite","nepheline","nephrite","neptunite","nichromite","nickel","nickeline","niedermayrite","niningerite","niobite","niobitetantalite","nissonite","niter","nitratine","nobleite","nontronite","norbergite","normandite","northupite","nosean","nsutite","nyerereite","népouite","obsidian","okenite","oldhamite","olgite","oligoclase","olivenite","olivine","omphacite","onyx","opal","ordóñezite","oregonite","orpiment","orthochrysotile","orthoclase","osarizawaite","osmium","osumilite","otavite","ottrelite","otwayite","pabstite","painite","palagonite","palladium","palygorskite","panethite","panguite","papagoite","parachrysotile","paragonite","paralaurionite","paramelaconite","pararealgar","pargasite","parisite","parsonsite","parthéite","pascoite","patrónite","paulingite","paulscherrerite","pearceite","pecoraite","pectolite","pelagosite","penikisite","penroseite","pentagonite","pentlandite","perhamite","periclase","pericline","peridot ","perite","perlite","perovskite","petalite","petzite","pezzottaite","pharmacolite","pharmacosiderite","phenakite","phengite","phillipsite","phlogopite","phoenicochroite","phosgenite","phosphophyllite","phosphorite","phosphuranylite","pickeringite","picropharmacolite","piemontite","pigeonite","pimelite","pinalite","pinnoite","pitchblende","piypite","plagioclase","plancheite","platinum","plattnerite","playfairite","plessite","plumbogummite","polarite","pollucite","polybasite","polycrase","polydymite","polyhalite","portlandite","posnjakite","poudretteite","povondraite","powellite","prehnite","proustite","pseudobrookite","pseudomalachite","pseudowollastonite","psilomelane","pumicite","pumpellyite","purpurite","putnisite","pyrargyrite","pyrite","pyrochlore","pyrolusite","pyromorphite","pyrope","pyrophanite","pyrophyllite","pyroxene","pyroxferroite","pyroxmangite","pyrrhotite","pääkkönenite","qingsongite","quartz","quenstedtite","quintinite","rambergite","rameauite","rammelsbergite","rapidcreekite","rashleighite","raspite","realgar","reidite","reinerite","renierite","rheniite","rhodium","rhodochrosite","rhodolite","rhodonite","rhodplumsite","rhomboclase","richterite","rickardite","riebeckite","ringwoodite","roaldite","robertsite","rockcrystal","rodalquilarite","romanèchite","romeite","rosasite","roscoelite","roselite","rosenbergite","rosequartz","rosickýite","roumanite","routhierite","rozenite","rubicline","ruby","ruizite","russellite","ruthenium","rutherfordine","rutile","rynersonite","sabatierite","sabieite","sabinaite","sacrofanite","safflorite","salammoniac","saleeite","saliotite","salzburgite","samarskite","sampleite","samsonite","samuelsonite","sanbornite","saneroite","sanidine","santabarbaraite","santite","saponite","sapphire","sapphirine","sarabauite","sard","sarkinite","sassolite","satinspar","satterlyite","sauconite","sborgite","scapolite","scheelite","schmiederite","schoepite","schorl","schreibersite","schreyerite","schröckingerite","schwertmannite","schäferite","scolecite","scorodite","scorzalite","scrutinyite","seamanite","searlesite","seeligerite","segelerite","seifertite","sekaninaite","selenite","selenium","seligmannite","sellaite","semseyite","senarmontite","sepiolite","serendibite","serpentine","serpierite","sewardite","shandite","shattuckite","shigaite","shortite","shungite","siderite","siderophyllite","siderotil","siegenite","silicate","silicon","sillimanite","silver","simetite","simonellite","simpsonite","sincosite","sinkankasite","sinoite","skaergaardite","sklodowskite","skutterudite","smaltite","smectite","smithsonite","smokyquartz","soapstone","sodalite","sodaniter","soddyite","sonolite","spectrolite","sperrylite","spertiniite","spessartine","spessartite","sphalerite","sphene","spherocobaltite","spinel","spodumene","spurrite","stannite","stannoidite","stantienite","staurolite","steacyite","steatite","stellerite","stephanite","stercorite","stibarsen","stibiconite","stibiopalladinite","stibnite","stichtite","stilbite","stilleite","stillwaterite","stillwellite","stilpnomelane","stishovite","stolzite","strashimirite","strengite","stromeyerite","strontianite","struvite","studenitsite","studtite","stützite","suanite","suessite","sugilite","sulfur","sunstone","sursassite","susannite","sussexite","svanbergite","sweetite","switzerite","sylvanite","sylvite","synchysite","syngenite","sérandite","taaffeite","tachyhydrite","taenite","talc","talmessite","talnakhite","tamarugite","tangeite","tantalite","tantite","tanzanite","tapiolite","taranakite","tarapacaite","tarbuttite","tausonite","teallite","tellurite","tellurium","tellurobismuthite","temagamite","tennantite","tenorite","tephroite","terlinguaite","teruggite","tetradymite","tetrahedrite","tetrataenite","thaumasite","thenardite","thermonatrite","thiospinel","thomasclarkite","thomsenolite","thomsonite","thorianite","thorite","thortveitite","thulite","thuringite","tiemannite","tienshanite","tin","tinaksite","tincalconite","titanite","titanium","titanowodginite","tobermorite","todorokite","tokyoite","tongbaite","topaz","torbernite","tourmaline","tranquillityite","travertine","tremolite","trevorite","tridymite","triphylite","triplite","triploidite","tripuhyite","troilite","trona","tsavorite","tschermakite","tschermigite","tsumcorite","tsumebite","tugtupite","tungsten","tungstite","tuperssuatsiaite","turquoise","tusionite","tyrolite","tyrrellite","tyuyamunite","uchucchacuaite","uklonskovite","ulexite","ullmannite","ulrichite","ultramarine","ulvöspinel","umangite","umber","umbite","unakite","upalite","uralite","uraninite","uranocircite","uranophane","uranopilite","urea","uricite","urusovite","ussingite","utahite","uvarovite","uytenbogaardtite","vaesite","valentinite","valleriite","vanadinite","vanadiocarpholite","vanadium","vantasselite","vanuralite","variscite","vaterite","vauquelinite","vauxite","veatchite","vermiculite","vesuvianite","villiaumite","violarite","vishnevite","vivianite","vladimirite","vlasovite","volborthite","vulcanite","wad","wadsleyite","wagnerite","wairakite","wakabayashilite","wakefieldite","walfordite","wardite","warikahnite","warwickite","wassonite","wavellite","weddellite","weeksite","weilite","weissite","weloganite","whewellite","whiteite","whitlockite","willemite","wiluite","witherite","wodginite","wolframite","wollastonite","woodhouseite","wulfenite","wurtzite","wyartite","wüstite","xanthiosite","xanthoconite","xanthoxenite","xenophyllite","xenotime","xiangjiangite","xieite","xifengite","xilingolite","ximengite","xingzhongite","xitieshanite","xocolatlite","xocomecatlite","xonotlite","yeelimite","yttrialite","yttrocerite","yttrocolumbite","yttropyrochlore","yuksporite","zabuyelite","zaccagnaite","zaherite","zajacite","zakharovite","zanazziite","zaratite","zaïrite","zektzerite","zemannite","zeolite","zeunerite","zhanghengite","zharchikhite","zhemchuzhnikovite","zhonghuacerite","ziesite","zimbabweite","zinalsite","zincite","zinclipscombite","zincmelanterite","zincobotryogen","zincochromite","zincolivenite","zinkenite","zinnwaldite","zippeite","zircon","zirconolite","zircophyllite","zirkelite","znucalite","zoisite","zorite","zunyite","zussmanite","zykaite","åkermanite"];
TrainingData.musical_instruments = ["accordion","airhorn","arpeggione","autoharp","bagpipes","bass","bassdrum","bassethorn","bassflute","bassguitar","bongo","bugle","bullroarer","celesta","clapsticks","clarinet","clavinet","cornet","crumhorn","doublebass","drum","drumkit","electricguitar","euphonium","flugelhorn","flumpet","flute","flutina","glockenspiel","guitar","handpan","harmonica","harp","harpsichord","horn","keyboard","lute","lyre","marimba","obo","oud","piano","piccolo","pipe","pitchpipe","psaltery","recorder","saxhorn","saxophone","saxotromba","saxtuba","steelpan","tinwhistle","triangle","trombone","trumpet","trumpet","tuba","turntable","vibraphone","viola","violin","violino","wheelharp","wobbleboard","woodblock","xylophone"];
TrainingData.musical_styles = ["acappella","acidhouse","acidjazz","acidrock","acoustic","afrobeat","afrocubanjazz","afropop","aleatoric","alternativecountry","alternativedance","alternativehiphop","alternativemetal","alternativerock","ambient","ambientindustrial","americana","anarchopunk","anime","antifolk","apala","arabicpop","argentinerock","arsnova","artpop","artpunk","artrock","avantgarde","avantgardejazz","avantgardemetal","bacbal","ballad","ballata","ballet","barndance","baroque","bass","bassline","batárumba","beatboxing","bebop","bigbeat","biomusic","bitpop","blackmetal","bluegrass","blues","bluesballad","bluesrock","bossanova","bounce","brass","breakbeat","breakcore","breakstep","britfunk","britishblues","britpop","brokenbeat","brostep","bubblegumdance","bubblegumpop","bunraku","bushballad","cabaret","cadencelypso","calypso","canon","cantiga","cantopop","carol","cellorock","celtic","celticfusion","celtichiphop","celticmetal","celticpunk","celticreggae","celticrock","chachacha","chamber","chamberjazz","chamberpop","charanga","chicagoblues","chicagohouse","chicagosoul","chickenscratch","chillout","chillwave","chiptune","christiancountry","christianelectronic","christianhardcore","christianhiphop","christianmetal","christianpunk","christianrock","christianska","christmascarol","christmasmusic","churchmusic","classical","classiccountry","classicrock","coldwave","concerto","cooljazz","country","countryblues","countrypop","countryrap","countryrock","crunk","crunkcore","dance","dancehall","dancepop","dancepunk","dancerock","darkambient","darkcabaret","darkcore","darkstep","darkwave","deathcore","deathdoom","deathgrind","deathindustrial","deathmetal","deathrock","deephouse","deltablues","descarga","detroitblues","detroittechno","digitalhardcore","dirtyrap","disco","discopolo","divahouse","dixieland","doommetal","dreampop","drone","dronemetal","drumstep","dub","dubstep","dubstyle","dubtronica","dutchjazz","easycore","easylistening","electricblues","electricfolk","electro","electroclash","electroindustrial","electronica","electronicdance","electronicmusic","electronicrock","electropop","electropunk","electroswing","elevatormusic","emo","eurobeat","eurodance","eurodisco","eurohouse","europop","eurotrance","experimental","experimentalrock","extrememetal","fingerstyle","flamenco","folk","folkock","folkjazz","folkmetal","folkpop","folkpunk","folktronica","freakbeat","freejazz","freemusic","freestyle","funk","funkmetal","funkrock","funkyhouse","furnitureusic","fusionjazz","futurepop","gangsterrap","garagehouse","garagerock","ghettohouse","ghettotech","girlgroup","glammetal","glampunk","glamrock","glitch","gospel","gothicmetal","gothicrock","gregorianchant","grime","grindcore","groovemetal","grunge","grupera","gypsyjazz","gypsypunk","hardbop","hardcorehiphop","hardcorepunk","hardcoretechno","hardhouse","hardrock","hardstep","hardstyle","hardtrance","harmonicablues","heavymetal","highlife","hiphop","hiphouse","hiplife","horrorcore","horrorpunk","hymn","impressionist","improvisational","incidental","indie","indiefolk","indiepop","indierock","indietronica","indojazz","industrial","industrialdeathmetal","industrialhiphop","industrialmetal","industrialrock","instrumental","instrumentalrock","irishfolk","irishrebel","jam","janglepop","jazz","jazzblues","jazzfunk","jazzfusion","jazzrap","jingle","jitterbug","jive","jpop","jrock","jungle","kpop","latinmetal","latinpop","liquidfunk","louisianablues","lounge","loversrock","mathcore","mathrock","medievalfolkrock","medievalmetal","melodic","melodichardcore","melodicmetalcore","memphisblues","memphissoul","metalcore","miamibass","microhouse","minijazz","minimal","minimaltechno","minimaltrance","minstrel","minuet","modernclassical","modernrock","musicdrama","musichall","neoclassical","neoclassicaldarkwave","neoclassicalmetal","neofolk","neoprogressiverock","neopsychedelia","neosoul","nerdcore","newprog","newrave","newwave","nintendocore","noise","noisepop","noiserock","nordicfolk","northernsoul","numetal","opera","orchestra","organum","paganmetal","paganrock","palmwine","pianoblues","plainchant","popfolk","popmusic","poppunk","poprap","poprock","pornocore","postdisco","postgrunge","postindustrial","postmetal","postminimalism","postpunk","postrock","postromanticism","powerduo","powerelectronics","powermetal","powernoise","powerpop","powertrio","powerviolence","praisesong","progressivebluegrass","progressiveelectronic","progressivefolk","progressivehouse","progressivemetal","progressiverock","progressivetrance","protopunk","psychedelicrock","psychedelictrance","psychobilly","pubrock","punkblues","punkjazz","punkrock","queercore","raggamuffin","ragtime","rave","reggae","reggaedancehall","reggaefusion","reggaehighlife","reggaeton","renaissancemusic","requiem","retro","rhapsody","rhumba","rhymingspiritual","rock","rockabilly","rockopera","rocksteady","rococo","rootsreggae","rootsrock","rootsrockreggae","rumba","sadcore","salsa","salsaerotica","salsaromantica","saltarello","samba","sambareggae","sambarock","shockrock","ska","skapunk","skatepunk","sludgemetal","smoothjazz","softrock","soulblues","souljazz","soulmusic","southerngospel","southernharmony","southernhiphop","southernmetal","southernrock","southernsoul","spaceagepop","spacemusic","spacerock","speedcore","speedgarage","speedmetal","stonermetal","stonerrock","straightedge","streetbass","stringquartet","sunshinepop","surfballads","surfinstrumental","surfmusic","surfpop","surfrock","swampblues","swamppop","swamprock","symphonicmetal","symphonicpoem","symphonicrock","symphony","synthpop","synthwave","techhouse","techno","technoid","techstep","techtonik","techtrance","texasblues","thrashmetal","thrashcore","turbofolk","tweepop","undergroundmusic","urbanfolk","vaporwave","vaudeville","vikingmetal","vocalhouse","vocaljazz","vocalmusic","vocaloid","waltz","westernswing","worldbeat","worldmusic","yodeling","yopop"];
TrainingData.mythical_humanoids = ["adlet","ala","angel","asterius","aswang","bannik","blafard","boggart","brownie","bugbear","bunyip","caliban","centaur","changeling","clurichaun","cyclopes","demon","devil","doppelganger","draugar","dryad","duduri","dullahan","dwarf","elf","empusa","encantado","ent","erinyes","fairy","faun","fiura","gargoyle","garuda","ghoul","giant","giantess","gigantes","gnome","goblin","gorgon","gremlin","grendel","gwishin","hag","haltija","harpy","hibagon","hobbit","hobgoblins","huldra","imp","incubus","incubus","jengu","jinn","jorogumo","jotuns","kappa","kikimora","kitsune","knocker","kobold","korrigan","lamia","lamia","lares","leprechaun","lich","little people","lycanthrope","manticore","menehune","mermaid","merman","minotaur","monaciello","monopod","mothman","mummy","naga","naiad","nereid","nix","nukekubi","nuno","nymph","oceanid","ogre","ogre","ogress","oni","orc","ork","pan","pixie","poltergeist","pombero","pugot","redcap","rusalka","samebito","sandman","satyr","seelie","selkie","sidhe","siren","sphinx","spriggan","sprite","succubus","sylph","tengu","tennin","tikbalang","titan","tiyanak","triton","troll","troll","trow","tyress","undine","valkyrie","vampire","vetter","vila","wendigo","werecat","werehyena","werewolf","yeren","yeti","yukionna","zombie"];
TrainingData.norse_deity_forenames = ["baduhenna","baldr","beyla","bil","bragi","brynhildr","dellingr","eir","eir","forseti","freyja","freyr","frigg","fulla","gefjun","geirahöð","geiravör","geirdriful","geirskögul","geirönul","gersemi","gerðr","gná","gullveig","gunnr","guðr","göll","göndul","hariasa","heimdallr","herfjötur","herja","hermóðr","hervör","hildr","hjalmþrimul","hjörþrimul","hlaðguðr","hlín","hlökk","hnoss","hretha","hrist","hrund","höðr","hœnir","ilmr","irpa","iðunn","kára","lofn","loki","lóðurr","meili","mist","máni","nanna","nerthus","njörun","njörðr","odin","randgríðr","reginleif","rindr","rán","ráðgríðr","róta","sandraudiga","sanngriðr","saxnōt","sif","sigrdrífa","sigrún","sigyn","sinthgunt","sjöfn","skalmöld","skaði","skeggöld","skuld","skögul","snotra","sveið","svipul","syn","sága","sól","tanfana","thor","týr","ullr","vili","viðarr","váli","vár","vé","vör","zisa","óðr","ölrún","þorgerðr","þrima","þrúðr","þrúðr","þögn","ēostre"];
TrainingData.norwegian_fjords = ["adventfjorden","arasvikfjord","astafjorden","austefjorden","austfjorden","balsfjorden","batnfjord","beitstadfjorden","billefjorden","bindalsfjorden","bjugnfjorden","bjørnafjorden","boknafjord","breviksfjord","bunnefjorden","byfjorden","bøkfjord","bømlafjorden","dalsfjorden","dicksonfjorden","drammensfjord","duvefjorden","edøyfjorden","eidangerfjord","eidsfjorden","ekmanfjorden","eresfjorden","erfjorden","esefjorden","etnefjorden","fanafjorden","fannefjord","finnøyfjord","fisterfjord","fognafjord","folda","forfjord","fossingfjord","freifjorden","frierfjord","frænfjorden","frøyfjorden","fusafjorden","fættenfjord","førdefjorden","gandsfjord","gapafjord","gardssundfjord","geirangerfjord","gratangen","grimstadfjord","grindafjord","grønfjorden","gullesfjorden","gunneklevfjord","hadselfjord","halsafjord","hamnesfjord","hardangerfjord","hellemofjorden","hemnfjorden","herdlefjord","herjangsfjord","hervikfjord","herøyfjord","hidlefjord","hjeltefjorden","hjørundfjorden","hornsund","hyllestadfjorden","hylsfjord","håsteinsfjord","høgsfjorden","høyangsfjorden","iddefjord","idsefjord","indre oslofjord","innværfjorden","isfjorden","jarfjorden","jelsafjord","jøsenfjorden","jøssingfjorden","kaldfjord","kaldvågfjorden","kilsfjord","kobbefjorden","kongsfjorden","kornstadfjord","krossfjorden","kurefjorden","kvernesfjord","kvitsøyfjord","kvåsefjorden","kvænangen","kåfjorden","laksefjord","langangsfjord","langfjorden","lavangen","leirfjorden","liefdefjorden","lille kufjorden","listafjord","lomfjorden","lustrafjorden","lyngenfjorden","lysakerfjorden","lysefjorden","magdalenefjorden","malangen","maurangerfjord","mefjorden","melfjorden","meløyfjorden","midtgulen","moldefjord","namsfjorden","norddalsfjorden","nordefjorden","nordfjorden","nordgulfjorden","nærøyfjord","ofotfjord","ombofjord","orkdalsfjorden","ormefjord","osafjord","oslofjord","osterfjorden","porsangerfjorden","puddefjorden","ranfjorden","raudfjorden","recherchefjorden","revsbotn","rijpfjorden","rombaken","romsdalsfjord","rovdefjord","sagfjorden","salhusfjorden","sandefjordsfjord","sandeidsfjord","sandsfjord","sassenfjorden","saudafjord","selbjørnsfjorden","sjona","skjerstadfjorden","skjoldafjord","skjomen","skudenesfjord","skånevikfjorden","snigsfjorden","snillfjorden","sognefjord","solbergfjord","stavfjord","stjørnfjord","storfjorden","sulafjorden","sunndalsfjord","sunnylvsfjorden","sykkylvsfjorden","syvdsfjorden","sørfjorden","sørgul","tafjorden","talgjefjord","tanafjord","tempelfjorden","tingvollfjorden","tjongsfjorden","tjuvfjorden","tomrefjorden","topdalsfjorden","tresfjorden","trollfjord","trondheimsfjord","trongfjord","trænfjorden","tysfjorden","tyssefjord","ullsfjord","valsøyfjorden","van keulenfjorden","van mijenfjorden","vanylvsfjorden","varangerfjord","vartdalsfjord","vatsfjord","vefsnfjorden","vegafjorden","velfjorden","vestfjorden","vestfjorden","vetlefjorden","vindafjorden","vinjefjorden","voldsfjorden","værangfjorden","wahlenbergfjorden","wijdefjorden","woodfjorden","yrkefjorden","ytre oslofjord","åfjorden","åkrafjorden","åmøyfjord","årdalsfjord","øksfjord","økstrafjorden"];
TrainingData.nuts_and_seeds = ["acorn","almond","apricot","barley","beech","blackeyedpea","blackwalnut","bopplenut","brazilnut","breadnut","broadbean","buckwheat","bunyanut","candlenut","cashew","cashewnut","cattail","cempedak","chestnuts","chia","chickpea","chileanhazelnut","chinesechestnut","cocoabean","coconuts","coffeebean","colocynth","commonbean","cowpeas","drybeans","durian","favabean","flax","fonio","foxnut","gabonnut","grainamaranth","groundnut","groundnut","hanza","hazelnut","heartnuts","hemp","hickory","hyacinthbean","indianbeech","jackfruit","jacknuts","japanesechestnut","kolanut","lotusseed","lupin","macadamia","maize","malabaralmond","malabarchestnut","malabargourd","mamoncillo","melonseed","mongongo","monkeypuzzlenut","moringa","oats","ogbono","palmersgrass","palmnut","paradisenut","pea","peanut","pearlmillet","pecan","pepita","pigeonpea","pili","pilinuts","pinenuts","pistachio","pitseed","poppyseed","quinoa","rice","rye","sesame","shagbark","sorghum","soybean","spelt","sunflowerseed","sweetchestnut","teff","triticale","velvetbean","walnut","waterchestnut","wheat","wild rice","wingedbean","yambeans","yellowwalnut"];
TrainingData.periodic_elements = ["actinium","aluminum","americium","antimony","argon","arsenic","astatine","barium","berkelium","beryllium","bismuth","bohrium","boron","bromine","cadmium","calcium","californium","carbon","cerium","cesium","chlorine","chromium","cobalt","copper","curium","dubnium","dysprosium","einsteinium","erbium","europium","fermium","fluorine","francium","gadolinium","gallium","germanium","gold","hafnium","hassium","helium","holmium","hydrogen","indium","iodine","iridium","iron","krypton","lanthanum","lawrencium","lead","lithium","lutetium","magnesium","manganese","meitnerium","mendelevium","mercury","molybdenum","neodymium","neon","neptunium","nickel","niobium","nitrogen","nobelium","osmium","oxygen","palladium","phosphorus","platinum","plutonium","polonium","potassium","praseodymium","promethium","protactinium","radium","radon","rhenium","rhodium","rubidium","ruthenium","rutherfordium","samarium","scandium","seaborgium","selenium","silicon","silver","sodium","strontium","sulfur","tantalum","technetium","tellurium","terbium","thallium","thorium","thulium","tin","titanium","tungsten","uranium","vanadium","xenon","ytterbium","yttrium","zinc","zirconium"];
TrainingData.personality_traits = ["abrasive","abrupt","absentminded","adaptable","admirable","adventurous","aggressive","agonizing","agreeable","aimless","airy","alert","aloof","ambitious","amiable","amoral","amusing","angry","anticipative","anxious","apathetic","appreciative","argumentative","arrogant","artful","articulate","artificial","ascetic","asocial","aspiring","assertive","astigmatic","athletic","attractive","authoritarian","barbaric","benevolent","bewildered","bizarre","bland","blunt","boyish","breezy","brilliant","brittle","brutal","busy","calculating","callous","calm","capable","captivating","careless","caring","casual","cautious","challenging","charismatic","charming","charmless","cheerful","childish","chummy","circumspect","clean","clearheaded","clever","clumsy","coarse","cold","colorful","colorless","compassionate","competitive","complacent","complex","compulsive","conceited","conciliatory","confident","confidential","confused","conscientious","conservative","considerate","contemplative","contemptible","contradictory","conventional","cooperative","courageous","courteous","cowardly","crass","crazy","creative","criminal","crisp","crude","cruel","cultured","curious","cute","cynical","daring","decadent","deceitful","decent","deceptive","decisive","dedicated","deep","demanding","dependent","desperate","destructive","determined","devious","difficult","dignified","dirty","disciplined","disconcerting","discontented","discouraging","discourteous","discreet","dishonest","disloyal","disobedient","disorderly","disorganized","disputatious","disrespectful","disruptive","dissolute","dissonant","distractible","disturbing","dogmatic","dominating","domineering","dramatic","dreamy","driving","droll","dry","dull","dutiful","dynamic","earnest","educated","effeminate","efficient","egocentric","elegant","eloquent","emotional","empathetic","energetic","enervated","enigmatic","enthusiastic","envious","erratic","escapist","excitable","exciting","expedient","extraordinary","extravagant","extreme","fair","faithful","faithless","fanatical","fanciful","farsighted","fatalistic","fawning","fearful","fickle","fiery","firm","flamboyant","flexible","focused","folksy","foolish","forgetful","forgiving","formal","forthright","fraudulent","freethinking","freewheeling","friendly","frightening","frivolous","frugal","gallant","generous","gentle","genuine","glamorous","gloomy","goodnatured","gracious","greedy","grim","guileless","gullible","hardworking","hateful","haughty","healthy","hearty","hedonistic","helpful","herioc","highhanded","highminded","highspirited","honest","honorable","hostile","humble","humorous","huried","hypnotic","iconoclastic","idealistic","idiosyncratic","ignorant","imaginative","impassive","impatient","impersonal","impractical","impressionable","impressive","imprudent","impulsive","incisive","inconsiderate","incorruptible","incurious","indecisive","independent","individualistic","indulgent","inert","inhibited","innovative","inoffensive","insecure","insensitive","insightful","insincere","insulting","intelligent","intense","intolerant","intuitive","invisible","invulnerable","irrational","irresponsible","irritable","kind","knowledge","lazy","leisurely","liberal","logical","loquacious","lovable","loyal","lyrical","magnanimous","malicious","manysided","masculine","maternal","maticulous","mature","meddlesome","melancholic","mellow","meretricious","methodical","miserable","miserly","misguided","mistaken","moderate","modern","modest","moneyminded","monstrous","moody","moralistic","morbid","mystical","naive","narcissistic","narrow","narrowminded","neat","neglectful","neurotic","neutral","nihilistic","noncommittal","obedient","objective","obnoxious","observant","obsessive","obvious","offhand","open","opinionated","opportunistic","optimistic","orderly","ordinary","organized","original","outrageous","outspoken","painstaking","paranoid","passionate","passive","paternalistic","patient","patriotic","peaceful","pedantic","perceptive","perfectionist","personable","persuasive","perverse","petty","pharissical","phlegmatic","physical","placid","planful","playful","plodding","polished","political","pompous","popular","possessive","practical","precise","predatory","predictable","prejudiced","preoccupied","presumptuous","pretentious","principled","private","procrastinating","profligate","profound","progressive","protective","proud","provocative","prudent","pruposeful","pugnacious","punctual","pure","puritanical","questioning","quiet","rational","reactionary","reactive","realistic","reflective","regretful","relaxed","reliable","religious","repentant","repressed","resentful","reserved","resourceful","respectful","responsible","responsive","restrained","retiring","ridiculous","rigid","ritualistic","romantic","ruined","sadistic","sage","sanctimonious","sane","sarcastic","scheming","scholarly","scornful","scrupulous","secretive","secure","sedentary","selfconscious","selfindulgent","selfish","selfless","selfreliant","selfsufficent","sensitive","sensual","sentimental","serious","sexy","shallow","shortsighted","shrewd","shy","silly","simple","singleminded","skeptical","skillful","slow","sly","smooth","sober","sociable","soft","softheaded","solemn","solid","solitary","sophisticated","sordid","spontaneous","sporting","stable","steadfast","steady","steely","stern","stiff","stoic","strict","strong","stubborn","studious","stupid","stylish","suave","submissive","subtle","superficial","superstitious","suspicious","sweet","sympathetic","systematic","tactless","tasteful","tasteless","tense","thievish","thorough","thoughtless","tidy","timid","tolerant","tractable","transparent","treacherous","trendy","troublesome","trusting","unaggressive","unambitious","unappreciative","uncaring","unceremonious","uncharitable","uncooperative","unctuous","undemanding","understanding","undisciplined","undogmatic","unfathomable","unfriendly","ungrateful","unhealthy","unimaginative","unimpressive","uninhibited","unlovable","unpatriotic","unpolished","unpredicatable","unprincipled","unrealistic","unreflective","unreliable","unreligious","unrestrained","unsentimental","unstable","upright","urbane","vacuous","vague","venal","venomous","venturesome","vindictive","vivacious","warm","whimsical","winning","wise","witty","youthful"];
TrainingData.pharmaceuticals = ["abilify","acetaminophen","aciphex","adalimumab","adderall","advair","afinitor","aflibercept","alimta","amphetamine","androgel","apixaban","aranesp","atripla","avastin","avonex","benicar","betaferon","betaseron","bevacizumab","budesonide","celebrex","celgene","cialis","combivent","complera","copaxone","crestor","cymbalta","dexilant","dextroamphetamine","diovan","divalproex","doxycycline","enbrel","enoxaparin","epogen","etanercept","evista","fenofibrate","flovent hfa","fluticasonepropionate","gilenya","glargine","gleevec","glivec","herceptin","humalog","humira","hydrocodone","incivo","infliximab","insulin","isentress","janumet","januvia","lantus","lantussolostar","ledipasvir","lenalidomide","levemir","levothyroxine","lidocaine","lipitor","lovaza","lucentis","lunesta","lyrica","metoprolol","namenda","nasonex","neulasta","neupogen","nexium","nivolumab","novolog","novologflexpen","orencia","oxycontin","pembrolizumab","pradaxa","pregabalin","prevenar","prevnar","prezista","proair hfa","procriteprex","rebif","remicade","renvela","restasis","reyataz","ritalin","rituxan","rituximab","rivaroxaban","rosuvastatin","salmeterol","sensipar","seretide","seroquelxr","sofosbuvir","spiriva","stelara","stribild","suboxone","symbicort","synagis","synthroid","tamiflu","trastuzumab","truvada","ustekinumab","ventolinhfa","vesicare","viagra","victoza","vytorin","vyvanse","xarelto","xeloda","xgeva","xolair","zetia","zostavax","zytiga"];
TrainingData.pharmaceutical_antibiotics = ["amikacin","amoxicillin","ampicillin","ansamycins","arsphenamine","azithromycin","azlocillin","aztreonam","bacitracin","capreomycin","carbacephem","carbapenems","cefaclor","cefadroxil","cefalexin","cefamandole","cefazolin","cefdinir","cefditoren","cefepime","cefixime","cefmetazole","cefonicid","cefoperazone","cefotaxime","cefotetan","cefoxitin","cefpodoxime","cefprozil","ceftarolinefosamil","ceftazidimeinosa","ceftibuten","ceftizoxime","ceftriaxone","cefuroxime","cephalosporins","cephalothin","cephapirin","cephradine","chloramphenicol","cilastatin","ciprofloxacin","clarithromycin","clavulanate","clindamycin","clofazimine","colistin","cycloserine","dalbavancin","dalfopristin","dapsone","daptomycin","demeclocycline","dicloxacillin","doripenem","doxycycline","enoxacin","ertapenem","erythromycin","ethambutol","ethionamide","fidaxomicin","flucloxacillin","fluoroquinolones","fosfomycin","furazolidone","fusidic acid","gatifloxacin","geldanamycin","gemifloxacin","gentamicin","glycopeptides","grepafloxacin","herbimycin","hypoprothrombinemia","imipenem","isoniazid","kanamycin","levofloxacin","lincomycin","lincosamides","linezolid","lipopeptide","lomefloxacin","loracarbef","macrolides","mafenide","meropenem","metacycline","methicillin","metronidazole","mezlocillin","minocycline","monobactams","moxalactam","moxifloxacin","mupirocin","nadifloxacin","nafcillin","nalidixic acid","neomycin","netilmicin","nitrofurans","nitrofurantoin","norfloxacin","ofloxacin","oritavancin","oxacillin","oxazolidinones","oxytetracycline","paromomycin","penicillin","piperacillin","platensimycin","polymyxin","polypeptides","posizolid","pyrazinamide","quinolones","quinupristin","radezolid","rifabutin","rifampicin","rifapentine","rifaximin","roxithromycin","silversulfadiazine","sparfloxacin","spectinomycin","spiramycin","streptomycin","streptomycin","sulbactam","sulfacetamide","sulfadiazine","sulfadimethoxine","sulfamethizole","sulfamethoxazole","sulfanilimide","sulfasalazine","sulfisoxazole","sulfonamides","sulfonamidochrysoidine","tazobactam","teicoplanin","telavancin","telithromycin","temafloxacin","temocillin","tetracycline","tetracyclines","thiamphenicol","thrombocytopenia","ticarcillin","tigecycline","tinidazole","tobramycin","torezolid","trimethoprim","trimethoprimsulfamethoxazole","trovafloxacin","vancomycin"];
TrainingData.philosophies = ["ableism","absolutism","absurdism","acquiescence","activism","actualidealism","actualism","aestheticrealism","aesthetics","agentialrealism","agnosticism","agnotology","altruism","amorfati","analytic philosophy","anarchism","ancientphilosophy","animism","anomalous monism","anthropocentrism","antiimperialism","antiintellectualism","antinatalism","antipsychiatry","antirealism","antireductionism","applied ethics","aristotelianism","asceticism","atavism","atheism","authoritarianism","autodidacticism","averroism","avicennism","axiology","baathism","baháíteachings","behaviorism","biblicalliteralism","bioconservatism","bioethics","biolibertarianism","biosophy","bushido","capitalism","cartesianism","catechism","centrism","chaostheory","charvaka","chauvinism","chinesenaturalism","christianecology","christianexistentialism","christianhumanism","christianphilosophy","christiantheology","christology","classicalliberalism","cognitivism","collectivism","communitarianism","compatibilism","computerethics","conformism","confucianism","consequentialism","conservatism","constructivistepistemology","continentalphilosophy","continuationism","cosmopolitanism","creationism","criticalrationalism","criticalrealism","cultural elativism","cynicism","daoism","darwinism","deconstruction","defeatism","deism","democratictranshumanism","denialism","deontology","determinism","dialectic","dialecticalmaterialism","didacticism","digitalphilosophy","discordianism","dogma","dualism","dvaita","ecumenism","egalitarianism","egocentrism","eliminativematerialism","empiricism","environmentalism","epicureanism","epiphenomenalism","epistemology","erudition","eschatology","esotericism","ethicalegoism","ethics","eudaimonism","eugenics","evangelism","existentialism","externalism","externalism","extremism","fallacy","fanaticism","fascism","feminism","fengshui","filialpiety","flowersermon","foundationalism","freemasonry","freewill","fundamentalism","germanidealism","germanphilosophy","globalism","gnosticism","gothicismus","greekphilosophy","hasidism","hedonism","hegelianism","hegeliansynthesis","hermeneutics","hermeticism","heterophenomenology","historicism","holism","hongaku","humanexceptionalism","humanism","humanisticnaturalism","idealism","identityism","ignosticism","illegalism","illuminationism","incontinence","individualism","inductionism","informal logic","innatism","instrumentalism","instrumentalrationality","internalism","interventionism","intuitionism","irrealism","jainism","jesuism","juche","judaism","kaizen","kantianism","legalism","leibnizianism","libertarianism","literarycriticism","literarytheory","logicians","logicism","lutheranism","machiavellianism","manichaeism","maoism","marxism","materialism","mathematicism","mazdakism","medievalism","mentalism","mereologicalnihilism","metaethics","metaphilosophy","metaphysics","methodism","misanthropy","misology","modernism","monism","monogamy","monotheism","moralrealism","moralrelativism","moralskepticism","multilateralism","mysticism","natalism","naturalism","naïverealism","negationism","neoconfucianism","neohegelianism","neokantianism","neoplatonism","neopythagoreanism","neoscholasticism","neotaoism","neuroethics","neurophilosophy","neurotheology","neutralmonism","newage","newrealism","newthought","nihilism","nominalism","nondualism","objectiveidealism","objectivism","occamsrazor","occasionalism","ontology","ontotheology","openindividualism","opportunism","optimism","organicism","orientalism","pacifism","paganism","pain","pancriticalrationalism","pandeism","panentheism","panpsychism","pantheism","paradigm","pataphysics","patriotism","perfectionism","peripatetic","personalism","perspectivism","pessimism","phenomenalism","phenomenology","physicalism","physicalontology","platonicrealism","platonism","pluralism","polygamy","populism","positivism","posthumanism","postmaterialism","postmodernism","poststructuralism","pragmatism","premillennialism","presentism","progressivism","property dualism","proselytism","pseudophilosophy","psychologicalegoism","pythagoreanism","quantummysticism","quietism","racism","rastafari","rationalism","raëlism","realism","reconstructivism","reductionism","reductivematerialism","reformationalphilosophy","reification","relationalism","relativism","reliabilism","romanticism","sabellianism","scandal","scholasticism","scientism","secretsociety","secularhumanism","secularism","semanticholism","sensualism","sexism","sexualism","shamanism","sikhism","simulism","singularitarianism","skepticism","socialbusiness","socialphilosophy","solipsism","sophism","spiritualism","stoicism","structuralism","subjectiveidealism","subjectivism","sufimetaphysics","supersessionism","supervenience","surrealism","survivalism","synopticphilosophy","taoism","tautology","teleology","tetralemma","theism","thelema","theology","theosophy","transcendentalidealism","transcendentalism","transhumanism","transmodernism","unilateralism","universalism","utilitarianism","utopianism","valuetheory","verificationism","virtueethics","vitalism","voluntaryism","westernphilosophy","wiccan","zen","zoroastrianism","zurvanism","śūnyatā"];
TrainingData.pies = ["aloopie","applecrisp","applecrumble","applepie","baconeggpie","bakewelltart","bananacreampie","banoffeepie","beanpie","bisteeya","blackberrypie","blackbottompie","blackbun","blueberrypie","bobandypie","bougatsa","boysenberry","bridie","bukopie","bumbleberrypie","bundevara","burek","buttermilkpie","butterpie","buttertart","cantaloupepie","carameltart","cashewpie","cheesecake","cheesepie","cherrypie","chesspie","chestnutpie","chickenmushroompie","chiffonpie","cipaille","clanger","coconutcreampie","cookiecakepie","cornedbeefpie","cottagepie","coulibiac","cumberlandpie","currypie","currypuff","custardtart","derbypie","echpochmak","eggtart","empanada","fishermanspie","fishpie","flan","flapperpie","fleischkuekle","flipperpie","friedpie","gibanica","greekcheesepie","greengrapepie","homitypie","hornazo","jamaicanpatty","kalakukko","karelianpasties","keylimepie","khachapuri","killiepie","knish","kuchen","lemoniceboxpie","lemonmeringuepie","manchestertart","meatpie","meatpie","meatpotatopie","meltonowbrayporkpie","mincepie","mississippimudpie","natchitochesmeatpie","nusstorte","pastafrola","pasty","peachpie","peanutpie","peartart","pecanpie","pirozhki","porkpie","potpie","pumpkinpie","quiche","raisinpie","rappiepie","raspberrypie","razzleberrypie","rhubarbpie","sambusac","saskatoonberrypie","scotchpie","seapie","sfiha","shakerlemonpie","shepherdspie","shepherdspie","shooflypie","soparnik","southerntomatopie","spanakopita","stargazypie","steakkidneypie","steakpie","strawberrypie","strawberryrhubarbpie","sugarpie","sweetpotatopie","tiropita","treacletart","vlaai","walnutpie","watalappam","wooltonpie","spinachpie"];
TrainingData.pizza_varieties = ["africana","baladopizza","barpizza","bolognese","bulgogipizza","californiastylepizza","calzone","capricciosa","chicagostylepizza","ciaociao","detroitpizza","fruttidimare","funghi","grandmapizza","greekpizza","hawaii","kebabpizza","kimchipizza","maltija","margherita","marinara","meatfeast","mexicana","napolitana","neapolitanpizza","newyorkpizza","pekingduckpizza","peperoni","pizzabianca","pizzacapricciosa","pizzapugliese","pizzaquattroformaggi","pizzaquattrostagioni","pizzaromana","pizzaviennese","pizzetta","quattroformaggi","quattrostagioni","rendangpizza","rucolatomatosauce","salmonteriyakipizza","sataypizza","sicilianpizza","tikkachickenpizza","tomatopie","tomyumpizza","upsidedownpizza","vegetariana"];
TrainingData.places_in_cumbria = ["abbeytown","ackenthwaite","adgarley","aglionby","aiketgate","aikhead","aikshaw","aikton","ainstable","aisgill","albyfield","aldingham","aldoth","allenwood","allerdale","allerdale","allhallows","allithwaite","allonby","alston","alstonmoor","ambleside","angerton","annaside","anthorn","appleby","applethwaite","arkleby","arlecdon","armaside","armathwaite","arnaby","arnside","arradfoot","arthuret","asby","ashgill","askerton","askham","aspatria","aughertree","ayside","backbarrow","baggrow","baldwinholme","bampton","bamptongrange","bandrakehead","banks","barbergreen","barbon","barclose","bardsea","barepot","barras","barrow","barrowisland","barrowsgreen","barton","bassenthwaite","baycliff","bayles","beanthwaite","beaumont","beckbottom","beckces","beckermet","beckfoot","beckhead","beckside","beetham","belah","bellevue","berrier","bewaldeth","bewcastle","biggar","biglands","birkby","birkerthwaite","blackbeck","blackcombe","blackdyke","blackford","blackpoolgate","blackwell","blagill","blawith","bleatarn","blencarn","blencogo","blencow","blindbothel","blindcrake","blitterlees","bolton","boltongate","boltonlowhouses","boltonnewhouses","boltons","boltonwoodlane","bomby","bonninggate","boot","bootle","borrowdale","botcherby","bothel","bousteadhill","bouth","bowlandbridge","bowmanstead","bowscale","bowston","brackenber","brackenlands","brackenthwaite","braithwaite","brampton","brandlingill","bransty","branthwaite","brathay","braystones","braytonpark","bretherdalehead","bridekirk","bridgefield","bridgefoot","briery","brigham","brigsteer","brisco","briscoe","broadoak","broadwath","brockleymoor","bromfield","broom","brothybeck","brough","brougham","broughsowerby","broughton","broughtonbeck","broughtoncross","broughtoneast","broughtonmills","broughtonmoor","broughtonwest","brownber","browtop","brunstock","brunthwaite","buckabank","bullgill","burghbysands","burneside","burnrigg","burrells","burtholme","burthwaite","busk","buttermere","butterwick","caldbeck","calder","calderbridge","calthwaite","calva","cambeckbridge","camerton","canalfoot","cardew","cardewlees","cardurnock","cargo","cark","carlatton","carlisle","carrbank","cartmel","cartmelfell","carwinley","casterton","castlecarrock","castlesowerby","castletown","catbank","catlowdy","catterlen","causewayend","causewayhead","cautley","chalkfoot","chapel","chapelstile","chestnuthill","churchbrough","claife","clappersgate","clawthorpe","cleabarrow","cleator","cleatormoor","cliburn","clifton","cliftondykes","cockermouth","cocklake","cockleybeck","colby","coldbeck","colthouse","colton","commonend","coniston","corbyhill","corkickle","corney","cotehill","cotes","coulderton","coupland","cowenhead","cowgill","crackenthorpe","croasdale","crofton","croglin","crook","crooklands","crosby","crosbygarrett","crosbyravensworth","crosbyvilla","croslandspark","crosscanonby","crossend","crossgates","crosslands","crosthwaite","culgaith","cumbria","cumdivock","cummersdale","cumrew","cumwhinton","cumwhitton","currock","dacre","dale","dalebottom","dalemain","dalston","dalton","dean","deanscales","dearham","deepthwaite","dendron","dent","dentonholme","distington","dockray","dovenby","downhall","dragleybeck","drigg","drumburgh","drumleaning","drybeck","dubwath","duddonbridge","dufton","dundraw","dungeonghyll","durdar","dykesfield","eaglesfield","eamontbridge","eastcurthwaite","edderside","edenhall","edentown","egremont","egtonwithnewland","ellenborough","ellonby","elterwater","embleton","endmoor","ennerdalebridge","eskdale","eskdalegreen","eskett","etterby","ewanrigg","fairhill","fararnside","farend","farlam","farleton","farsawrey","faugh","fawcettforest","fellside","fenton","fieldbroughton","fingland","finsthwaite","firbank","fletchertown","flimby","flitholme","flookburgh","floristonrigg","forceforge","foresthead","fornside","fothergill","foulbridge","foxfield","frizington","gaisgill","galligill","gamblesby","gamelsby","garlands","garnettbridge","garrigill","garsdale","garsdalehead","garthrow","garths","gatebeck","gatefoot","gatesgarth","gawthrop","gawthwaite","geltsdale","gilcrux","gilsland","glasson","glasson","glassonby","gleaston","glencoyne","glenridding","goadsbarrow","goodyhills","goosegreen","gosforth","grangefell","grasmere","grassgarth","grayrigg","graysongreen","greatasby","greatblencow","greatbroughton","greatclifton","greatcorby","greatcrosthwaite","greatlangdale","greatmusgrave","greatormside","greatorton","greatsalkeld","greatstrickland","greaturswick","greenbank","greengill","greenhead","greenhill","greenholme","greenodd","greenquarter","greenrow","greenwell","greysouthen","greystoke","greystone","grinsdale","grisedale","grizebeck","grizedale","gullomholme","hackthorpe","haile","hailforth","hale","halfpenny","hallbankgate","hallbeck","halldunnerdale","hallowbank","hallsanton","hallthwaites","hallwaberthwaite","haltcliff","hampsfield","hardendale","haresceugh","harker","harkermarsh","harraby","harrington","harriston","hartley","hartsop","hassness","haverigg","haverthwaite","hawcoat","hawksdale","hawkshead","hawksheadhill","hawsbank","hayton","hayton","hazelrigg","hazelslack","headsnook","heaning","heathwaite","hegglelane","helbeck","helsington","helton","helvellyn","hensingham","hesket","hethersgill","highbankhill","highbewaldeth","highbiggins","highbridge","highcasterton","highcrosby","highcunsey","highgreen","highhesket","highhill","highireby","highknipe","highlaws","highlorton","highmoor","highnewton","highoaks","highrigg","highrow","highscales","highside","highwray","hilltop","hilton","hincaster","hodbarrow","holker","hollins","holme","holmeabbey","holmelow","holmrook","holmwrangle","honisterpass","hopebeck","hornsby","houghton","how","howgate","howgill","hugill","hunsonby","hurst","hutton","huttonend","huttonsoil","hycemoor","hyton","ireleth","irthington","isel","ivegill","jericho","johnby","kaber","keekle","keisley","kelbarrow","keld","kelleth","kells","kelsick","kendal","kentmere","kentrigg","kentsbank","keswick","killington","kilnhill","kingmoor","kingsmeaburn","kingstown","kingwater","kinkryhill","kirkbampton","kirkhouse","kirklandguards","kirklinton","kirklintonmiddle","kirkoswald","kirksanton","lakeside","lambfoot","langdale","langwathby","leadgate","leasgill","legburthwaite","lessonhall","levens","littlebeck","littlebroughton","littleclifton","littlelangdale","littletown","lockhills","longburgh","longlands","longmarton","longpark","longthwaite","loweswater","lowick","lowther","martindale","mawbray","mealbank","mealsgate","melmerby","micklethwaite","middleton","midgeholme","milburn","millom","milnthorpe","milton","mockerkin","monkhill","moorrow","moresby","morland","morton","mosedale","muncaster","mungrisdale","murton","nateby","natland","nearsawrey","nenthall","nenthead","nethertown","netherwasdale","newcowper","newhutton","newland","newlands","newton","newtonarlosh","newtonreigny","newtonrigg","newtown","northdykes","northscale","oddendale","oldhutton","ormside","orthwaite","orton","oughterside","oulton","ousby","outhgill","oxenholme","oxenpark","papcastle","parsonby","parton","patterdale","pennington","penrith","penruddock","petterilgreen","pielisland","plumbland","plumpton","ponsonby","pooleybridge","rampside","raughtonhead","ravenglass","ravenstonedale","renwick","rickerby","roanhead","rockcliffe","roose","roosebeck","rosside","rosthwaite","roundthwaite","ruckcroft","ruleholme","rusland","rydal","sadgill","santonbridge","satterthwaite","scaleby","scalebyhill","scotby","seascale","seathwaite","seatoller","seaton","sedbergh","sedgwick","selside","shap","shoregill","siddick","silecroft","silloth","silverband","skelton","skelwithbridge","skinburness","skirwith","skitby","slackhead","smithfield","sockbridge","southwaite","sparkbridge","stair","stanah","stapleton","staveley","stbees","stockdalewath","stonehouse","sunderland","swarthmoor","swindale","tarns","templesowerby","thiefside","thornhill","thornthwaite","threapland","threlkeld","thursby","thwaites","tirril","todhills","torpenhow","torver","troutbeck","troutbeckbridge","uldale","ulpha","ulverston","underbarrow","underskiddaw","upperdenton","upton","vickerstown","waberthwaite","walton","warcop","warwickbridge","wasdale","wasdalehead","watchgate","watendlath","watermillock","waverton","westnewton","westward","wetheral","wetsleddale","whale","whicham","whitehaven","wiggonby","wigton","wilton","windermere","winscales","winton","witherslack","wolsty","woodend","woodend","woodland","workington","wreay","wythburn","wythopmill","yanwath","yarlside","yearngill","yottenfews"];
TrainingData.plants_common_names = ["africanrice","alder","almond","ambrosia","amyroot","apple","apricot","arfaj","arrowwood","ash","ashleavedmaple","asianrice","azolla","babyrose","bamboo","banana","bankcress","baobab","bay","baylaurel","bean","bearberry","bearcorn","beech","bermudacress","bindweed","birch","birdsnest","bittercress","bittersweet","bitterweed","blackalder","blackash","blackberry","blackbirch","blackcap","blackcherry","blackhaw","blackiehead","blackmaple","blackoak","blackraspberry","blackweed","blueash","blueberry","blueoak","boleanbirch","bowwood","box","boxelder","boxwood","brier","brittlebush","broadleaf","brownbetty","buckeye","buffaloweed","bulbouscress","bullnettle","buroak","butterflyweed","cabbage","caneash","canoebirch","carrot","carrotweed","championoak","cherry","cherrybirch","chestnut","chiggerflower","christmasfern","chrysanthemum","cinnamon","clove","clover","clumpfoot","coakum","coastliveoak","coconut","coffeeplant","colicweed","collard","colwort","commonalder","coneflower","corkoak","cornel","cornelian","cornsowthistle","cornthistle","corydalis","cottonplant","creekmaple","cress","crowfoot","crowsnest","crowstoes","cucumber","cursedthistle","cutleafmaple","daisy","damerocket","deadlynightshade","deadnettle","devilsbite","devilsnose","devilsplague","dewberry","dindle","dogwood","drumstick","duckretten","duscle","dyeleaves","dyersoak","earthgall","eucalyptus","eytelia","falsealder","falsebox","fellenwort","felonwood","felonwort","fennel","ferns","feverbush","feverfew","fig","flax","fluxroot","fumewort","gallberry","garget","garlic","garlicmustard","garlicroot","gilliflower","goldenbuttons","goldengarlic","goldenglow","goosetongue","gordaldo","grapefruit","grapevine","grayalder","graybirch","greenash","greenthistle","groundberry","gutweed","haldi","hardthistle","haresthistle","harlequin","hayfever","healingblade","hedgeplant","hellebore","hemp","hempdogbane","henplant","hogweed","holly","honeymesquite","horsecane","horsenettle","houndsberry","houseleek","huckleberry","indianhemp","indianposy","inkberry","inkberryholly","ironwood","islandoak","itchweed","ivy","jackinthebush","jalap","judastree","juneberry","juniper","keek","kinnikinnik","kousa","kudzu","laceflower","lambscress","lambsfoot","landcress","lavender","leek","lemon","lettuce","lilac","lilyleek","lovevine","lowrose","mahoganybirch","maize","mango","maple","mapleash","mapleash","meadowholly","mesquite","milfoil","milkthistle","milkweed","milkytassel","mirbeckoak","moosemaple","moosewood","morel","mosquitofern","mulberry","neem","nettle","nightshade","noddingthistle","northernoak","nosebleed","oak","olive","onion","orangeroot","osage","osageapple","paperbirch","parsley","parsnip","pea","peach","peanut","pear","pellitory","pennyhedge","pepperroot","perennialthistle","pigeonberry","pine","pineapple","pinoak","pistachio","plane","plantain","pleurisyroot","poisonberry","poisonflower","poisonivy","poke","pokeroot","pokeweed","polecatweed","polkweed","poplar","poppy","possumhaw","potato","prairierose","pricklythistle","pudina","purpleraspberry","quercitron","radicalweed","ragweed","ragwort","ramblerrose","rantipole","rapeseed","raspberry","redash","redbirch","redbrush","redbud","redmulberry","redoak","redweed","rheumatismroot","rhubarb","ribwort","rice","riverash","riverbirch","rivermaple","roadweed","rocket","rocketcress","rose","rosemary","rumcherry","rye","sandbrier","sanguinary","saskatoon","scarletberry","scoke","scotchcap","scruboak","scurvycress","scurvygrass","serviceberry","shadblow","shadbush","silkweed","silverbirch","silvermaple","skunkcabbage","skunkweed","snakeberry","sneezeweed","sneezewort","snowdrop","softmaple","sorrel","sowthistle","spanishoak","speckledalder","speedwell","spicebirch","spoolwood","spottedoak","springcress","squawbush","stagbush","stammerwort","stickweed","strawberry","stripedalder","stripedmaple","sugarcane","sugarmaple","sugarplum","summerlilac","sunflower","swallowwort","swallowwort","swampash","swampcabbage","swampholly","swampmaple","swampoak","swampsilkweed","sweetbirch","sweetpotato","sweetrocket","swinethistle","swinies","swordferns","sycamore","tansy","tasselweed","tea","thimbleberry","thimbleweed","thistle","thousandleaf","thousandseal","thyme","tickleweed","tobaccoplant","tomato","toothwort","touchmenot","treadsoftly","treeonion","trillium","tuberroot","tulip","tulsi","uplandcress","valleyoak","vanillaorchid","viburnum","violet","violetbloom","virginbower","wakerobin","walnut","waterash","waterbirch","waterfern","watermaple","waybread","waythistle","weepingbirch","weepingbirch","wheat","whitealder","whiteash","whitebirch","whitebirch","whitemaple","whitemulberry","whiteoak","whiteroot","whitetansy","wildblackcherry","wildcherry","wildcotton","wildgarlic","wildhops","wildrose","wildtansy","willow","windroot","wineberry","winterberry","wintercress","winterrocket","woodbine","woodynightshade","wormwood","woundrocket","woundwort","yam","yarrow","yellowbirch","yellowdaisy","yellowfumewort","yellowrocket","yellowwood","zedoary"];
TrainingData.pokemon = ["abra","aerodactyl","alakazam","arbok","arcanine","articuno","beedrill","bellsprout","blastoise","bulbasaur","butterfree","caterpie","chansey","charizard","charmander","charmeleon","clefable","clefairy","cloyster","cubone","dewgong","diglett","ditto","dodrio","doduo","dragonair","dragonite","dratini","drowzee","dugtrio","eevee","ekans","electabuzz","electrode","exeggcute","exeggutor","farfetchd","fearow","flareon","gastly","gengar","geodude","gloom","golbat","goldeen","golduck","golem","graveler","grimer","growlithe","gyarados","haunter","hitmonchan","hitmonlee","horsea","hypno","ivysaur","jigglypuff","jolteon","jynx","kabuto","kabutops","kadabra","kakuna","kangaskhan","kingler","koffing","krabby","lapras","lickitung","machamp","machoke","machop","magikarp","magmar","magnemite","magneton","mankey","marowak","meowth","metapod","mew","mewtwo","mime","moltres","muk","nidoking","nidoqueen","nidoran","nidoran","nidorina","nidorino","ninetales","oddish","omanyte","omastar","onix","paras","parasect","persian","pidgeot","pidgeotto","pidgey","pikachu","pinsir","poliwag","poliwhirl","poliwrath","ponyta","porygon","primeape","psyduck","raichu","rapidash","raticate","rattata","rhydon","rhyhorn","sandshrew","sandslash","scyther","seadra","seaking","seel","shellder","slowbro","slowpoke","snorlax","spearow","squirtle","starmie","staryu","tangela","tauros","tentacool","tentacruel","vaporeon","venomoth","venonat","venusaur","victreebel","vileplume","voltorb","vulpix","wartortle","weedle","weepinbell","weezing","wigglytuff","zapdos","zubat"];
TrainingData.pokemon_modern = ["abomasnow","abra","absol","accelgor","aegislash","aerodactyl","aggron","aipom","alakazam","alomomola","altaria","amaura","ambipom","amoonguss","ampharos","anorith","arbok","arcanine","arceus","archen","archeops","ariados","armaldo","aromatisse","aron","articuno","audino","aurorus","avalugg","axew","azelf","azumarill","azurill","bagon","baltoy","banette","barbaracle","barboach","basculin","bastiodon","bayleef","beartic","beautifly","beedrill","beheeyem","beldum","bellossom","bellsprout","bergmite","bewear","bibarel","bidoof","binacle","bisharp","blastoise","blaziken","blissey","blitzle","boldore","bonsly","bouffalant","braixen","braviary","breloom","bronzong","bronzor","bruxish","budew","buizel","bulbasaur","buneary","bunnelby","burmy","butterfree","cacnea","cacturne","camerupt","carbink","carnivine","carracosta","carvanha","cascoon","castform","caterpie","celebi","chandelure","chansey","charizard","charjabug","charmander","charmeleon","chatot","cherrim","cherubi","chesnaught","chespin","chikorita","chimchar","chimecho","chinchou","chingling","cinccino","clamperl","clauncher","clawitzer","claydol","clefable","clefairy","cleffa","cloyster","cobalion","cofagrigus","combee","combusken","conkeldurr","corphish","corsola","cottonee","cradily","cranidos","crawdaunt","cresselia","croagunk","crobat","croconaw","crustle","cryogonal","cubchoo","cubone","cutiefly","cyndaquil","darkrai","darmanitan","darumaka","dedenne","deerling","deino","delcatty","delibird","delphox","deoxys","dewgong","dewott","dialga","diancie","diggersby","diglett","ditto","dodrio","doduo","donphan","doublade","dragalge","dragonair","dragonite","drampa","drapion","dratini","drifblim","drifloon","drilbur","drowzee","druddigon","ducklett","dugtrio","dunsparce","duosion","durant","dusclops","dusknoir","duskull","dustox","dwebble","eelektrik","eelektross","eevee","ekans","electabuzz","electivire","electrike","electrode","elekid","elgyem","emboar","emolga","empoleon","entei","escavalier","espeon","espurr","excadrill","exeggcute","exeggutor","exploud","farfetch'd","fearow","feebas","fennekin","feraligatr","ferroseed","ferrothorn","finneon","flaaffy","flabébé","flareon","fletchinder","fletchling","floatzel","floette","florges","flygon","foongus","forretress","fraxure","frillish","froakie","frogadier","froslass","furfrou","furret","gabite","gallade","galvantula","garbodor","garchomp","gardevoir","gastly","gastrodon","genesect","gengar","geodude","gible","gigalith","girafarig","giratina","glaceon","glalie","glameow","gligar","gliscor","gloom","gogoat","golbat","goldeen","golduck","golem","golett","golurk","goodra","goomy","gorebyss","gothita","gothitelle","gothorita","gourgeist","granbull","graveler","greninja","grimer","grotle","groudon","grovyle","growlithe","grubbin","grumpig","gulpin","gurdurr","gyarados","happiny","hariyama","haunter","hawlucha","haxorus","heatmor","heatran","heliolisk","helioptile","heracross","herdier","hippopotas","hippowdon","hitmonchan","hitmonlee","hitmontop","hooh","honchkrow","honedge","hoopa","hoothoot","hoppip","horsea","houndoom","houndour","huntail","hydreigon","hypno","igglybuff","illumise","infernape","inkay","ivysaur","jellicent","jigglypuff","jirachi","jolteon","joltik","jumpluff","jynx","kabuto","kabutops","kadabra","kakuna","kangaskhan","karrablast","kecleon","keldeo","kingdra","kingler","kirlia","klang","klefki","klink","klinklang","koffing","komala","krabby","kricketot","kricketune","krokorok","krookodile","kyogre","kyurem","lairon","lampent","landorus","lanturn","lapras","larvesta","larvitar","latias","latios","leafeon","leavanny","ledian","ledyba","lickilicky","lickitung","liepard","lileep","lilligant","lillipup","linoone","litleo","litten","litwick","lombre","lopunny","lotad","loudred","lucario","ludicolo","lugia","lumineon","lunala","lunatone","luvdisc","luxio","luxray","machamp","machoke","machop","magby","magcargo","magearna","magikarp","magmar","magmortar","magnemite","magneton","magnezone","makuhita","malamar","mamoswine","manaphy","mandibuzz","manectric","mankey","mantine","mantyke","maractus","mareep","marill","marowak","marshtomp","masquerain","mawile","medicham","meditite","meganium","meloetta","meowstic","meowth","mesprit","metagross","metang","metapod","mewtwo","mew","mienfoo","mienshao","mightyena","milotic","miltank","mimejr","mimikkyu","minccino","minun","misdreavus","mismagius","moltres","monferno","mothim","mrmime","mudkip","muk","munchlax","munna","murkrow","musharna","natu","nidoking","nidoqueen","nidoran","nidoran♂","nidorina","nidorino","nincada","ninetales","ninjask","noctowl","noibat","noivern","nosepass","numel","nuzleaf","octillery","oddish","omanyte","omastar","onix","oshawott","pachirisu","palkia","palpitoad","pancham","pangoro","panpour","pansage","pansear","paras","parasect","patrat","pawniard","pelipper","persian","petilil","phanpy","phantump","phione","pichu","pidgeot","pidgeotto","pidgey","pidove","pignite","pikachu","pikipek","piloswine","pineco","pinsir","piplup","plusle","politoed","poliwag","poliwhirl","poliwrath","ponyta","poochyena","popplio","porygon","porygon","porygonz","primeape","prinplup","probopass","psyduck","pumpkaboo","pupitar","purrloin","purugly","pyroar","quagsire","quilava","quilladin","qwilfish","raichu","raikou","ralts","rampardos","rapidash","raticate","rattata","rayquaza","regice","regigigas","regirock","registeel","relicanth","remoraid","reshiram","reuniclus","rhydon","rhyhorn","rhyperior","riolu","rockruff","roggenrola","roselia","roserade","rotom","rowlet","rufflet","sableye","salamence","salandit","samurott","sandile","sandshrew","sandslash","sawk","sawsbuck","scatterbug","sceptile","scizor","scolipede","scrafty","scraggy","scyther","seadra","seaking","sealeo","seedot","seel","seismitoad","sentret","serperior","servine","seviper","sewaddle","sharpedo","shaymin","shedinja","shelgon","shellder","shellos","shelmet","shieldon","shiftry","shinx","shroomish","shuckle","shuppet","sigilyph","silcoon","simipour","simisage","simisear","skarmory","skiddo","skiploom","skitty","skorupi","skrelp","skuntank","slaking","slakoth","sliggoo","slowbro","slowking","slowpoke","slugma","slurpuff","smeargle","smoochum","sneasel","snivy","snorlax","snorunt","snover","snubbull","solgaleo","solosis","solrock","spearow","spewpa","spheal","spinarak","spinda","spiritomb","spoink","spritzee","squirtle","stantler","staraptor","staravia","starly","starmie","staryu","steelix","stoutland","stunfisk","stunky","sudowoodo","suicune","sunflora","sunkern","surskit","swablu","swadloon","swalot","swampert","swanna","swellow","swinub","swirlix","swoobat","sylveon","taillow","talonflame","tangela","tangrowth","tapu koko","tauros","teddiursa","tentacool","tentacruel","tepig","terrakion","throh","thundurus","timburr","tirtouga","togedemaru","togekiss","togepi","togetic","torchic","torkoal","tornadus","torterra","totodile","toxicroak","tranquill","trapinch","treecko","trevenant","tropius","trubbish","turtwig","tympole","tynamo","typhlosion","tyranitar","tyrantrum","tyrogue","tyrunt","umbreon","unfezant","unown","ursaring","uxie","vanillish","vanillite","vanilluxe","vaporeon","venipede","venomoth","venonat","venusaur","vespiquen","vibrava","victini","victreebel","vigoroth","vikavolt","vileplume","virizion","vivillon","volbeat","volcanion","volcarona","voltorb","vullaby","vulpix","wailmer","wailord","walrein","wartortle","watchog","weavile","weedle","weepinbell","weezing","whimsicott","whirlipede","whiscash","whismur","wigglytuff","wingull","wobbuffet","woobat","wooper","wormadam","wurmple","wynaut","xatu","xerneas","yamask","yanma","yanmega","yungoos","yveltal","zangoose","zapdos","zebstrika","zekrom","zigzagoon","zoroark","zorua","zubat","zweilous","zygarde"];
TrainingData.professions = ["accessorydesigner","actor","advertisingdesigner","analyst","anesthesiologist","animationdirector","animator","applicationanalyst","applicationdeveloper","archaeologist","architect","architect","artadministrator","artcritic","artdirector","arthistorian","artisan","artist","arttherapist","astronaut","astronomer","athletictrainer","audiologist","author","automechanic","backupdancer","balletdancer","bariatricsurgeon","bartender","beader","biochemist","biokineticist","biologist","biomedicalscientist","blacksmith","blogger","blogger","bobbinboy","boilermaker","boilerman","bookbinder","bookcoach","botanist","brakeman","brandmanager","broadcastnewsanalyst","busdriver","cardiacsurgeon","cardiologist","cardiologyfellow","cartoonist","cashier","castingdirector","chaplain","chauffeur","chiefcreativeofficer","chieffireman","chiropractor","choreographer","choreographer","cinematographer","colorist","comicbookcreator","commissioningeditor","compositor","computeranalyst","computeroperator","computerrepairtechnician","computerscientist","conductor","constructionworker","coppersmith","copyeditor","copywriter","cordwainer","corsetier","creativeconsultant","creativedirector","creativeprofessional","creativewriter","curator","dancer","dancer","dancetherapy","dataanalyst","databaseadministrator","dataentryclerk","datascientist","delivery","designdirector","designstrategist","developer","dialysistechnician","dogwriter","dramatherapist","draper","dressmaker","ecologist","editor","embroiderer","emergencyphysician","endocrinologist","equestrian","essayist","eventplanner","exoticdancer","factoryworker","familynurse","fashiondesigner","fillingstationattendant","filmcritic","filmdirector","fineartist","flashdeveloper","flatter","flightnurse","floraldesigner","foodstylist","foreman","founder","freelancer","furnituredesigner","furnituremaker","gameartist","gastroenterologist","generalpractitioner","generalsurgeon","geographer","geologist","geoprofessions","geriatrician","ghostwriter","glover","graphicdesigner","griot","guard","gunsmith","gynaecologist","hackwriter","haematologist","hairstylist","hatter","healthcarechaplain","healthcarescience","herpetologist","illustrator","imagineer","industrialdesigner","infopreneur","intensivist","interiordesigner","internist","inventor","jeweler","jewellerydesigner","journalist","journalist","knitweardesigner","leadman","leatherworker","limner","literaryeditor","lyricist","maintenanceengineer","makeupartist","mammographer","marinedesigner","marquetarian","mechanic","mediadesigner","medicalwriter","mentalhealthnurse","microbiologist","midwife","miller","milliner","millwright","model","moldmaker","motorman","multimediaartist","musicartist","musiceditor","naturalist","neonatalologist","neonatologist","nephrologist","networkadministrator","networkanalyst","networkengineer","neurologist","neuroradiographer","neuroscientist","neurosurgeon","obstetrician","occupationaltherapist","oceanographer","oncologist","ophthamologist","optometrist","orthopedicphysician","otolaryngologist","paleontologist","panelbeater","parachuterigger","pastoralcounsellor","pathologist","patternmaker","paydriver","pediatrician","pediatricnurse","penciller","petroleumgeologist","pharmacist","phlebotomist","photographer","photojournalist","physicaltherapist","physicianassistant","pipefitter","plantoperator","playwright","plumber","poet","poet","polygraph","printmaker","productiondesigner","programmer","psychiatricnurse","psychiatrist","psychiatrist","psychologist","psychologist","psychotherapists","pulmonologist","pulmonologyfellow","quilter","radiationtherapist","radiographer","radiologist","radiotherapist","railroadengineer","reporter","review","sailmaker","sawfiler","scenographer","schoolcounselor","sciencetechnician","scientist","screenwriter","screenwriter","scribe","scriptcoordinator","scriptdoctor","scrivener","sculptor","seamstress","secondman","securityengineer","setdecorator","setdresser","sextherapist","shoemaker","shopforeman","showgirl","silversmith","smith","soaper","socialworker","softwareanalyst","softwaredesign","softwarequalityanalyst","sonographer","sounddesigner","speechwriter","sportpsychologist","staffwriter","stagedirector","stationaryengineer","statistician","steelerector","systemadministrator","systemarchitect","systemsanalyst","systemsdesigner","tailor","taxidermist","taxidriver","teachingartist","technicalwriter","testdriver","theatreconsultant","truckdriver","typefacedesigner","upholsterer","urbanplanner","waiter","webdesigner","webdeveloper","webdeveloper","webmaster","weddingplanner","welder","wheelwright","woodworkers","writer","writer","behavioranalyst","dancejournalist","professionalcounselor"];
TrainingData.programming_languages = ["a#","a+","a++","abap","abc","abset","absys","acc","accent","acedasl","acl2","action","actionscript","ada","adenine","agda","agilentvee","agora","aimms","aldor","alef","alf","algol58","algol60","algol68","alice","ambienttalk","amigae","amos","ampl","angelscript","apl","applescript","apt","arc","arexx","argus","aspectj","assemblylanguage","ats","autocoder","autohotkey","autoit","autolisp","averest","awk","axum","babbage","bash","basic","batch","bc","bcpl","beanshell","bertrand","beta","bistro","blockly","bloop","boo","bourneshell","bpel","c","c#","c++","c--","caml","cayenne","cduce","cecil","cesil","ceylon","cfengine","cfml","cg","ch","chapel","charity","charm","chill","chomski","chuck","cics","cilk","citrine","cl","claire","clarion","clean","clipper","clips","clist","clojure","clu","cobol","cobolscript","cobra","code","coffeescript","coldfusion","comal","comit","commonlisp","compass","componentpascal","comtran","converge","cool","coq","coral66","corn","corvision","cowsel","cpl","cryptol","crystal","csh","cshell","csound","csp","cuda","curl","curry","cybil","cyclone","cython","céu","d","dart","dasl","dataflex","datalog","datatrieve","dbase","dc","dcl","deesel","delphi","dibol","dinkc","dog","draco","drakon","dylan","dynamo","earsketch","ease","easytrieve","ecmascript","edinburghimp","egl","eiffel","elan","elixir","elm","emacslisp","emerald","epigram","epl","erlang","es","escher","espol","esterel","etoys","euclid","euler","euphoria","exec2","f","f#","f*","factor","falcon","fantom","faust","ffp","fjölnir","fl","flavors","flex","floop","flowmatic","focal","focus","foil","formac","forth","fortran","fortress","foxbase","foxpro","fp","franzlisp","frege","fscript","gamemakerlanguage","gamemonkeyscript","gams","gap","gcode","gdl","gdscript","genie","george","gj","glsl","gm","go","goal","golo","gom","gosu","gotran","gpss","graphtalk","grass","groovy","gödel","hack","haggis","hal/s","halide","harbour","hartmannpipelines","haskell","haxe","hermes","hlsl","hop","hope","hopscotch","hugo","hume","hypertalk","ici","icon","id","idl","idris","imp","inform","interlisp","io","ioke","ipl","iptscrae","islisp","ispf","iswim","j","j#","j++","jade","jal","janus","jass","java","javafxscript","javascript","jcl","jean","joinjava","joss","joule","jovial","joy","jscript","julia","jython","k","kaleidoscope","karel","karel++","kee","kif","kixtart","kodu","kojo","kotlin","krc","krl","krl","krypton","ksh","l","labview","ladder","lagoona","lansa","lasso","latex","lava","lc-3","leda","legoscript","lil","lilypond","limbo","limnor","linc","lingo","lis","lisa","lisaac","lisp","lite-c","lithe","livecode","livescript","logo","logtalk","lotusscript","lpc","lse","lsl","lua","lucid","lustre","lyapas","lynx","m#","m2000","m2001","m4","machinecode","mad","magik","magma","make","maple","mapper","markiv","mary","mathcad","mathematica","mathmatic","matlab","maude system","max","maxima","maxscript","maya","mdl","mercury","mesa","metafont","metaquotes","microcode","microscript","miis","milk","mimic","mirah","miranda","mivascript","ml","modelica","modula","modula-2","modula-2","modula-3","mohol","moo","mortran","mouse","mpd","msil","msl","mumps","mupad","napier88","nasm","neko","nemerle","nesc","nesl","netdata","netlogo","netrexx","newlisp","newp","newspeak","newtonscript","ngl","nial","nice","nickle","nim","nodejs","npl","nsis","nu","nwscript","nxtg","oak","oberon","obj2","objective-c","objective-j","objectlisp","objectlogo","objectpascal","objectrexx","objectscript","obliq","ocaml","occam","octave","omnimark","onyx","opa","opal","opencl","openedgeabl","openvera","opl","ops5","optimj","orc","orca","oriel","orwell","oxml","oxygene","oz","p#","parasail","pascal","pcastl","pcf","pdl","pearl","peoplecode","perl","perl6","pharo","php","pico","picolisp","pict","pike","pikt","pilot","pipelines","pizza","pl/0","pl/b","pl/c","pl/i","pl/m","pl/p","pl/sql","pl360","planc","plankalkül","planner","plex","plexil","plus","pop-11","pop-2","portable","postscript","powerbuilder","powerhouse","powershell","ppl","processing","processing.js","prograph","proiv","prolog","promal","promela","protel","providex","pure","pure data","python","q","qalb","qbasic","qpl","qtscript","quakec","r","racket","rapid","rapira","ratfiv","ratfor","rc","rebol","red","redcode","refal","reia","rexx","ring","rlab","roop","rpg","rpl","rsl","ruby","runescript","rust","sabretalk","sail","salsa","sam76","sas","sasl","sather","sawzall","sbl","scala","scheme","scilab","scratch","sed","self","sensetalk","sequencel","setl","signal","simple","simpol","simscript","simula","simulink","singularity","sisal","slip","small","small basic","smalltalk","sml","snobol","snowball","sol","solidity","sp/k","spark","speedcode","spin","sps","sqr","squeak","squirrel","sr","stacklesspython","starlogo","stata","stateflow","strand","strongtalk","subtext","supercollider","supertalk","swift","sympl","synccharts","systemverilog","tacl","tacpol","tads","tal","tcl","tea","teco","telcomp","tex","tex","tie","timber","toi","tom","tom","topspeed","tpu","trac","transcript","ttcn","ttm","turing","tutor","txl","typescript","ubercode","umple","unicon","uniface","unity","unixshell","unrealscript","vala","verilog","vhdl","visualbasic","visualdataflex","visualdialogscript","visualfortran","visualfoxpro","visualj#","visuallisp","visualobjects","visualprolog","vsxu","vvvv","watfor","webdna","webql","whiley","winbatch","windowspowershell","wolframlanguage","wyvern","x++","x10","xbl","xharbour","xl","xojo","xotcl","xpl","xpl0","xquery","xsb","xsharp","xslt","xtend","yoix","yorick","yql","zeno","znotation","zopl","zpl","zsh"];
TrainingData.religions = ["adamites","adventism","agonoclita","ahmadiyya","akhbari","alawites","alchemy","alevism","amish","amyraldism","anabaptists","anglicanism","anglocatholicism","arianism","arminianism","azali","azraqi","babism","bagnolians","baptists","bardaisan","barelvi","basilideans","bathouism","batuque","behmenism","bezpopovtsy","bispanthi","bodongpa","bogomilism","bon","buddhism","calvinism","candomble","catharism","cerdonians","cheondoism","cheontae","christadelphians","colarbasians","confucianism","daejongism","davidians","digambara","discordianism","doukhobor","dudeism","ebionites","eckankar","elcesaites","esotericism","essenes","evangelicalism","frankism","gelug","gnosticism","hanafi","hanbali","haruriyyah","hermeticism","hinduism","holinessmovement","hudu","hussites","hutterites","hwaeom","ibadi","jadid","jahriyya","jainism","jehovahwitnesses","jesuism","jonang","judaism","kabbalah","kagyu","kalam","kegon","khalsa","khawarij","khufiyya","konkokyo","kumina","landmarkism","lingayatism","lollardy","lucumi","lutheranism","macumba","mahayana","mahdavia","maliki","mandaeism","manichaeism","marcionism","martinism","maturidi","mennonites","methodism","millerism","mithraism","molokan","moravians","mormonism","mumboism","murtipujaka","mustaali","namdhari","navayana","nazarenes","neocalvinism","neoconfucianism","neoevangelicalism","neoplatonism","neopythagoreanism","nihang","nizari","noahidism","nontrinitarianism","nyaya","obeah","oomoto","oyotunji","pentecostalism","pharisees","pietism","popovtsy","presbyterianism","protestantism","puritans","pythagoreanism","qadiriyya","quakers","quimbanda","quranism","radhasoami","rastafari","ravidassia","remonstrants","restorationism","rosicrucianism","sabbateans","sabians","sadducees","sahajdhari","salafism","samaritanism","satanism","scientology","sedevacantism","sethianism","shabakism","shaivism","shakers","shaktism","shamanism","shaykhism","shinto","shrauta","sicarii","sikhism","simonians","smartism","sufism","sufism","sufri","suhrawardiyya","sundance","svatantrika","swaminarayan","syntheism","tantra","tantrism","taoism","tariqa","technopaganism","tendai","tenrikyo","theosophy","theravada","tiantai","tijaniyyah","usuli","vaishnavism","valentinianism","voodoo","wahhabism","waldensians","wesleyanism","wicca","xidaotang","xuanxue","yarsanism","yazidis","yiguandao","yoga","zaidiyyah","zen","zenrinkyo","zoroastrianism","zurvanism","zwinglianism"];
TrainingData.roman_deities = ["abeona","abudantia","adeona","aequitas","aera","aeternitas","africus","alemonia","angerona","angita","anna","antevorte","aphrodite","apollo","aquilo","ares","artemis","asclepius","athena","attis","aurora","auster","bacchus","bellona","bona","bubona","camenaees","candelifera","cardea","carmenta","carnea","ceres","cinxia","clementia","cloacina","coelus","concordia","conditor","consus","convector","copia","corus","cunina","cupid","cybele","dea","dea","decima","demeter","devera","deverra","dia","diana","dis","disciplina","discordia","dius","egestes","empanda","endovelicus","eventus","fabulinus","fama","fauna","faunus","faunus","faustitas","favonius","febris","felicitas","feronia","fides","flora","fontus","fornax","fortuna","fulgora","furies","furina","hephaestus","hera","hercules","hermes","hestia","honos","indivia","isis","janus","juno","jupiter","juturna","juventas","lactans","lares","laverna","liber","libera","liberalitas","libertas","libitina","lima","lucifer","lucina","luna","maia","maiesta","manes","mania","mars","matuta","meditrina","mefitas","mellona","mena","menrva","mens","mercury","messor","minerva","mithras","moneta","mors","morta","muta","mutinus","naenia","necessitas","nemestrinus","neptune","nona","nox","nundina","obarator","occator","ops","orbona","orcus","pales","parcaes","pax","penates","picus","pietas","poena","pomona","portunes","porus","poseidon","postverta","potina","priapus","prorsa","providentia","pudicitia","puta","quirinus","quiritis","robigo","robigus","roma","rumina","salus","sancus","saritor","saturn","securitas","semonia","serapis","silvanus","sol","sol","somnus","sors","spes","stata","stimula","strenua","suadela","subrincinator","summanus","tellus","tempestes","terminus","terra","trivia","vacuna","veiovis","venus","veritas","vertumnus","vesta","victoria","viduus","viriplacaa","virtus","vitumnus","volturnus","volumna","vulcan","vulturnus","zeus"];
TrainingData.roman_emperor_forenames = ["aemilian","alexander","alexios","anastasios","anastasius","andronikos","anthemius","antoninus","arcadius","artabasdos","augustus","aurelian","avitus","balbinus","basil","basiliscus","caligula","caracalla","carinus","carus","claudius","claudius","commodus","constans","constans","constantine","constantius","constantius","didius","diocletian","domitian","elagabalus","florian","galba","galerius","gallienus","geta","glycerius","gordian","gordian","gratian","hadrian","heraclius","heraklonas","honorius","hostilian","irene","isaac","joannes","john","jovian","julian","julius","justin","justinian","leo","leontios","libius","licinius","lucius","macrinus","magnus","majorian","manuel","marcian","marcus","maurice","maxentius","maximian","maximinus","michael","nero","nerva","nikephoros","numerian","olybrius","otho","pertinax","petronius","philippikos","phocas","probus","pupienus","quintillus","romanos","romulus","septimius","severus","staurakios","tacitus","theodora","theodosios","theodosius","theodosius","theophilos","tiberius","tiberius","titus","trajan","trebonianus","valens","valentinian","valerian","vespasian","vetranio","vitellius","zeno","zoe"];
TrainingData.roman_place_names = ["acerrae","acerraevatriae","acquiterme","adrotas","alsium","anavio","antemnae","apiolae","apollonia","aquaesulis","ardotalia","ariolica","asti","ausona","baiae","bannaventa","bevagna","bobbio","bovillae","bruttium","caenina","caesaromagus","cagliari","calcaria","cales","cameria","camulodunum","capizzi","caromago","castelseprio","catania","cefalù","chiavenna","chieri","claternae","clausentum","clotagenium","colonnata","como","concangis","concordia","condate","coria","corinium","cosa","cremona","curia","daedalium","danum","dubris","durnovaria","durocobrivis","durocornovium","durolipons","durolitum","durovigutum","eboracum","entella","eryx","etruria","evidensca","falacrine","fano","feronia","forumfulvii","forumnovum","gabii","gaeta","garrianonum","genoa","gereatis","heraea","herculaneum","hispellum","hortonium","imachara","interamna","ivrea","lactodorum","lagentium","latium","leodis","letocetum","lindinis","londinium","longaricum","longula","lorium","luceria","luentinum","luguvalium","luna","luni","mamucium","mantua","maromago","mediolanum","miseno","monferrato","moridunum","mytistraton","nacona","navio","netum","norba","olicana","padria","pedum","petelia","piacenza","pollentia","pollusca","pompeia","portotorres","portusfelix","potentia","praetorium","regillum","regulbium","ricina","rusellae","rutupiae","saepinum","salinae","sciacca","segontium","sentinum","septempeda","soluntum","stabiae","suasa","sulloniacae","taormina","tortona","trimontium","turin","tusculum","ulubrae","vagniacae","vardacate","vectis","veleia","venafrum","ventimiglia","vercelli","verulamium","vindolanda","vinovia"];
TrainingData.rooms = ["aerary","aircraftcabin","airportlounge","airshower","aisle","alcove","almonry","andron","antechamber","apodyterium","assemblyhall","atrium","attic","atticstyle","auditorium","aularegia","ballroom","banishmentroom","basement","bathroom","bedroom","billiardroom","bonusroom","boudoir","breezeway","butteryroom","cabin","cabinet","cafeteria","caldarium","calefactory","castlechapel","changingroom","churchhall","churchporch","classroom","cleanroom","cloakroom","closet","committeeroom","commonroom","companionway","computerlab","conferencehall","controlroom","conversationpit","corneroffice","countinghouse","countroom","courtroom","cry room","cryptoporticus","cyzicenehall","darkroom","den","diningroom","dirtykitchen","drawingroom","dungeon","electricalroom","entryway","equatorialroom","equipmentroom","executionchamber","faintingroom","falloutshelter","familyroom","firstaidroom","frigidarium","functionhall","furnaceroom","garage","gardenoffice","garret","genkan","ghorfa","greatchamber","greathall","greatroom","greenroom","hall","homecinema","inglenook","kitchen","laconicum","lactationroom","larder","laundryroom","livingroom","lobby","loft","longgallery","lumberroom","luxurybox","mailroom","mancave","mastercontrol","mechanicalfloor","mechanicalroom","megaron","missioncontrolroom","monasticcell","nursery","office","paddedcell","pantry","parlour","porterslodge","presidentialsuite","priesthole","printroom","prisoncell","psychomanteum","publictoilet","queuearea","rainporch","recreationroom","refectory","refreshmentroom","reredorter","ridinghall","room","roomnumber","roomsharing","rootcellar","rottingroom","sacristy","saferoom","sallyport","sauna","screenedporch","secretpassage","semibasement","servantshall","servantsquarters","serverroom","showroom","skylobby","skyway","sleepingporch","slype","smokingroom","spearcloset","staffroom","staircasetower","stateroom","stillroom","stormcellar","studentlounge","studio","studyroom","suite","sunroom","tearoom","tepidarium","throneroom","toolroom","torturechamber","triclinium","undercroft","utilityroom","utilityvault","vestibule","vestry","voiddeck","waiting room","whisperinggallery"];
TrainingData.russian_cities = ["abakan","abaza","abdulino","abinsk","achinsk","adygeysk","agidel","agryz","akhtubinsk","aksay","alagir","alapayevsk","alatyr","aldan","aleksin","alexandrov","alexandrovsk","alexeyevka","aleysk","almetyevsk","alzamay","amursk","anadyr","anapa","andreapol","angarsk","aniva","apatity","aprelevka","apsheronsk","aramil","ardatov","ardon","argun","arkadak","arkhangelsk","armavir","arsenyev","arsk","artyom","artyomovsk","artyomovsky","arzamas","asbest","asha","asino","astrakhan","atkarsk","aznakayevo","azov","babayevo","babushkin","bagrationovsk","bakal","baksan","balabanovo","balakhna","balakovo","balashikha","balashov","baley","baltiysk","barabinsk","barnaul","barysh","bataysk","bavly","baykalsk","baymak","belebey","belgorod","belinsky","belogorsk","belokurikha","belomorsk","belorechensk","beloretsk","belousovo","belovo","beloyarsky","belozersk","bely","belyov","berdsk","berezniki","berezovsky","berezovsky","beslan","bezhetsk","bikin","bilibino","birobidzhan","birsk","biryuch","biryusinsk","biysk","blagodarny","blagoveshchensk","blagoveshchensk","bobrov","bodaybo","bogdanovich","bogoroditsk","bogorodsk","bogotol","boguchar","boksitogorsk","bolgar","bolkhov","bologoye","bolokhovo","bolotnoye","bor","borisoglebsk","borodino","borovichi","borovsk","borzya","bratsk","bronnitsy","bryansk","budyonnovsk","bugulma","buguruslan","buinsk","buturlinovka","buy","buynaksk","buzuluk","chadan","chapayevsk","chaplygin","chaykovsky","chebarkul","cheboksary","chegem","chekalin","chekhov","chelyabinsk","cherdyn","cheremkhovo","cherepanovo","cherepovets","cherkessk","chernogolovka","chernogorsk","chernushka","chernyakhovsk","chistopol","chita","chkalovsk","chudovo","chukhloma","chulym","chusovoy","chyormoz","dalmatovo","dalnegorsk","dalnerechensk","danilov","dankov","davlekanovo","dedovsk","degtyarsk","demidov","derbent","desnogorsk","digora","dimitrovgrad","divnogorsk","dmitriyev","dmitrov","dmitrovsk","dno","dobryanka","dolgoprudny","dolinsk","domodedovo","donetsk","donskoy","dorogobuzh","drezna","dubna","dubovka","dudinka","dukhovshchina","dyatkovo","dyurtyuli","dzerzhinsk","dzerzhinsky","elektrogorsk","elektrostal","elektrougli","elista","engels","ertil","fatezh","fokino","fokino","frolovo","fryazino","furmanov","gadzhiyevo","gagarin","galich","gatchina","gay","gdov","gelendzhik","georgiyevsk","glazov","golitsyno","gorbatov","gornozavodsk","gornyak","gorodets","gorodishche","gorodovikovsk","gorokhovets","grayvoron","gremyachinsk","grozny","gryazi","gryazovets","gubakha","gubkin","gubkinsky","gudermes","gukovo","gulkevichi","guryevsk","guryevsk","gusev","gusinoozyorsk","gvardeysk","igarka","ilansky","innopolis","insar","inta","inza","ipatovo","irbit","irkutsk","ishim","ishimbay","isilkul","iskitim","istra","ivangorod","ivanovo","ivanteyevka","ivdel","izberbash","izhevsk","izobilny","kachkanar","kadnikov","kalach","kalachinsk","kaliningrad","kalininsk","kaltan","kaluga","kalyazin","kambarka","kamenka","kamennogorsk","kameshkovo","kamyshin","kamyshlov","kamyzyak","kanash","kandalaksha","kansk","karabanovo","karabash","karabulak","karachayevsk","karachev","karasuk","kargat","kargopol","karpinsk","kartaly","kashin","kashira","kasimov","kasli","kaspiysk","kataysk","kazan","kedrovy","kem","kemerovo","khabarovsk","khadyzhensk","kharabali","kharovsk","khasavyurt","khilok","khimki","kholm","kholmsk","khotkovo","khvalynsk","kimovsk","kimry","kinel","kineshma","kingisepp","kirensk","kireyevsk","kirillov","kirishi","kirov","kirov","kirovgrad","kirovsk","kirovsk","kirs","kirsanov","kirzhach","kiselyovsk","kislovodsk","kizel","kizilyurt","kizlyar","klimovsk","klin","klintsy","knyaginino","kodinsk","kogalym","kokhma","kola","kolchugino","kologriv","kolomna","kolpashevo","kolpino","kommunar","komsomolsk","konakovo","kondopoga","kondrovo","konstantinovsk","kopeysk","korablino","korenovsk","korkino","korocha","korolyov","korsakov","koryazhma","kosteryovo","kostomuksha","kostroma","kotelnich","kotelniki","kotelnikovo","kotlas","kotovo","kotovsk","kovdor","kovrov","kovylkino","kozelsk","kozlovka","kozmodemyansk","krasavino","krasnoarmeysk","krasnoarmeysk","krasnodar","krasnogorsk","krasnokamensk","krasnokamsk","krasnoslobodsk","krasnoslobodsk","krasnoturyinsk","krasnoufimsk","krasnouralsk","krasnovishersk","krasnoyarsk","krasnozavodsk","krasnoznamensk","krasnoznamensk","kremyonki","kronstadt","kropotkin","krymsk","kstovo","kubinka","kudymkar","kulebaki","kumertau","kungur","kupino","kurchatov","kurgan","kurganinsk","kurilsk","kurlovo","kurovskoye","kursk","kurtamysh","kusa","kushva","kuvandyk","kuvshinovo","kuybyshev","kuznetsk","kyakhta","kyshtym","kyzyl","labinsk","labytnangi","ladushkin","lagan","laishevo","lakhdenpokhya","lakinsk","langepas","lebedyan","leninogorsk","leninsk","lensk","lermontov","lesnoy","lesosibirsk","lesozavodsk","lgov","likhoslavl","lipetsk","lipki","liski","livny","lobnya","lomonosov","luga","lukhovitsy","lukoyanov","luza","lyantor","lyskovo","lysva","lytkarino","lyuban","lyubertsy","lyubim","lyudinovo","magadan","magas","magnitogorsk","makarov","makaryev","makhachkala","makushino","malgobek","malmyzh","maloarkhangelsk","maloyaroslavets","mamadysh","mamonovo","manturovo","mariinsk","marks","maykop","maysky","mednogorsk","medvezhyegorsk","medyn","megion","melenki","meleuz","mendeleyevsk","menzelinsk","meshchovsk","mezen","mezhdurechensk","mezhgorye","mglin","miass","michurinsk","mikhaylov","mikhaylovka","mikhaylovsk","mikhaylovsk","mikun","millerovo","minusinsk","minyar","mirny","mirny","mogocha","monchegorsk","morozovsk","morshansk","mosalsk","moscow","moskovsky","mozdok","mozhaysk","mozhga","mtsensk","murashi","muravlenko","murmansk","murom","myshkin","myski","mytishchi","nadym","nakhodka","nalchik","narimanov","nartkala","navashino","navoloki","nazarovo","nazran","nazyvayevsk","neftekamsk","neftekumsk","nefteyugansk","nelidovo","neman","nerchinsk","nerekhta","neryungri","nesterov","nevel","nevelsk","nevinnomyssk","nevyansk","neya","nikolayevsk","nikolsk","nikolsk","nikolskoye","nizhnekamsk","nizhneudinsk","nizhnevartovsk","noginsk","nolinsk","norilsk","novoalexandrovsk","novoaltaysk","novoanninsky","novocheboksarsk","novocherkassk","novodvinsk","novokhopyorsk","novokubansk","novokuybyshevsk","novokuznetsk","novomichurinsk","novomoskovsk","novopavlovsk","novorossiysk","novorzhev","novoshakhtinsk","novosibirsk","novosil","novosokolniki","novotroitsk","novoulyanovsk","novouralsk","novouzensk","novovoronezh","novozybkov","noyabrsk","nurlat","nyagan","nyandoma","nyazepetrovsk","nytva","nyurba","ob","obluchye","obninsk","oboyan","ochyor","odintsovo","okha","okhansk","oktyabrsk","oktyabrsky","okulovka","olenegorsk","olonets","olyokminsk","omsk","omutninsk","onega","opochka","orenburg","orlov","orsk","oryol","osa","osinniki","ostashkov","ostrogozhsk","ostrov","ostrovnoy","otradnoye","otradny","ozherelye","ozyorsk","ozyorsk","ozyory","pallasovka","partizansk","pavlovo","pavlovsk","pavlovsk","pechora","pechory","penza","peresvet","perevoz","perm","pervomaysk","pervouralsk","pestovo","petergof","petrovsk","petrozavodsk","petukhovo","petushki","pevek","pikalyovo","pionersky","pitkyaranta","plast","plavsk","plyos","pochep","pochinok","podolsk","podporozhye","pokachi","pokhvistnevo","pokrov","pokrovsk","polessk","polevskoy","polyarny","polysayevo","porkhov","poronaysk","poshekhonye","povorino","pravdinsk","primorsk","priozersk","privolzhsk","prokhladny","prokopyevsk","proletarsk","protvino","pskov","puchezh","pudozh","pugachyov","pushchino","pushkin","pushkino","pustoshka","pyatigorsk","pytalovo","raduzhny","raduzhny","ramenskoye","rasskazovo","raychikhinsk","reutov","revda","rezh","rodniki","roshal","roslavl","rossosh","rostov","rtishchevo","rubtsovsk","rudnya","ruza","ruzayevka","ryazan","ryazhsk","rybinsk","rybnoye","rylsk","rzhev","safonovo","salair","salavat","salekhard","salsk","samara","saransk","sarapul","saratov","sarov","sasovo","satka","sayanogorsk","sayansk","sebezh","segezha","seltso","semikarakorsk","semiluki","semyonov","sengiley","serafimovich","serdobsk","sergach","serov","serpukhov","sertolovo","sestroretsk","severobaykalsk","severodvinsk","severomorsk","severouralsk","seversk","sevsk","shadrinsk","shagonar","shakhty","shakhtyorsk","shakhunya","shali","sharya","sharypovo","shatsk","shatura","shcherbinka","shchigry","shchuchye","shchyokino","shchyolkovo","shebekino","shelekhov","shenkursk","shikhany","shilka","shimanovsk","shlisselburg","shumerlya","shumikha","shuya","sibay","sim","skopin","skovorodino","slantsy","slavgorod","slavsk","slobodskoy","slyudyanka","smolensk","snezhinsk","snezhnogorsk","sobinka","sochi","sokol","sokolniki","soligalich","solikamsk","solnechnogorsk","soltsy","solvychegodsk","sorochinsk","sorsk","sortavala","sosensky","sosnogorsk","sosnovka","sosnovoborsk","sovetsk","sovetsk","sovetsk","sovetsky","spassk","srednekolymsk","sredneuralsk","sretensk","staritsa","starodub","stavropol","sterlitamak","strezhevoy","stroitel","strunino","stupino","sudogda","sudzha","sukhinichi","suoyarvi","surazh","surgut","surovikino","sursk","susuman","suvorov","suzdal","svetlogorsk","svetlograd","svetly","svetogorsk","svirsk","svobodny","syasstroy","sychyovka","syktyvkar","sysert","syzran","taganrog","taldom","talitsa","tambov","tara","tarusa","tashtagol","tatarsk","tavda","tayga","tayshet","teberda","temnikov","temryuk","terek","tetyushi","teykovo","tikhoretsk","tikhvin","timashyovsk","tobolsk","toguchin","tolyatti","tomari","tommot","tomsk","topki","toropets","torzhok","tosno","totma","troitsk","troitsk","trubchevsk","tryokhgorny","tsimlyansk","tsivilsk","tuapse","tula","tulun","turan","turinsk","tutayev","tuymazy","tver","tynda","tyrnyauz","tyukalinsk","tyumen","uchaly","udachny","udomlya","ufa","uglegorsk","uglich","ukhta","ulyanovsk","unecha","uray","uren","uryupinsk","urzhum","usinsk","usman","usolye","ussuriysk","ustyuzhna","uvarovo","uyar","uzhur","uzlovaya","valday","valuyki","velizh","velsk","venyov","vereshchagino","vereya","verkhneuralsk","verkhoturye","verkhoyansk","vesyegonsk","vetluga","vichuga","vidnoye","vikhorevka","vilyuchinsk","vilyuysk","vladikavkaz","vladimir","vladivostok","volchansk","volgodonsk","volgograd","volgorechensk","volkhov","volodarsk","vologda","volokolamsk","volosovo","volsk","volzhsk","volzhsky","vorkuta","voronezh","vorsma","voskresensk","votkinsk","vsevolozhsk","vuktyl","vyazemsky","vyazma","vyazniki","vyborg","vyksa","vysokovsk","vysotsk","vytegra","yadrin","yakhroma","yakutsk","yalutorovsk","yanaul","yaransk","yaroslavl","yarovoye","yartsevo","yasnogorsk","yasny","yefremov","yegoryevsk","yekaterinburg","yelabuga","yelets","yelizovo","yelnya","yemanzhelinsk","yemva","yeniseysk","yermolino","yershov","yessentuki","yeysk","yubileyny","yugorsk","yukhnov","yurga","yuryevets","yuryuzan","yuzha","yuzhnouralsk","zadonsk","zainsk","zakamensk","zaozyorny","zaozyorsk","zapolyarny","zaraysk","zarechny","zarechny","zarinsk","zavitinsk","zavodoukovsk","zavolzhsk","zavolzhye","zelenodolsk","zelenogorsk","zelenogorsk","zelenograd","zelenogradsk","zelenokumsk","zernograd","zeya","zheleznodorozhny","zheleznogorsk","zheleznogorsk","zheleznovodsk","zherdevka","zhigulyovsk","zhirnovsk","zhizdra","zhukov","zhukovka","zhukovsky","zima","zlatoust","zlynka","zmeinogorsk","znamensk","zubtsov","zuyevka","zvenigorod","zvenigovo","zverevo"];
TrainingData.russian_forenames = ["aaron","abagor","abamon","abataly","abdaikl","abdullah","abel","abelyar","abid","abijah","abily","abnody","abo","abram","aburom","adrian","afanasy","agafa","agafangel","agafiya","agafodor","agafokliya","agafon","agafonik","agafonika","agap","agapa","agapion","agapit","agapiya","agapy","agat","agatha","agav","agavva","albert","alexey","alla","alya","amvrosy","anastasia","anatoly","andrey","angelika","anna","anton","anya","arina","artemy","artyom","aurora","avda","avdakt","avdelay","avdey","avdifaks","avdiky","avdiyes","avdon","avdotya","avel","avelina","avenir","avenira","aventin","aventina","averky","avessalom","avgar","avgury","avgust","avgusta","avgustin","avgustina","aviafa","avian","avim","avimelekh","avip","avit","aviv","aviva","avksenty","avksily","avksivy","avkt","avlida","avram","avrelian","avreliya","avrely","avrey","avreya","avros","avsey","avtonom","avtonoma","avudim","avundy","avva","avvakir","avvakum","bogdan","boris","borislav","boyan","branislav","damir","danica","daniel","daniil","danilo","daria","dario","darko","david","diana","dmitry","ekaterina","elena","elina","galenka","galina","gennadiya","gennady","genrikh","georgy","gerasim","gniewomir","grigory","grischa","igor","ilarion","ilya","inal","inna","irina","ivan","jaroslav","joseph","katja","katya","kira","kirill","konstantin","konstantine","lada","lana","lena","leonid","liběna","ljuba","lubomir","ludmila","ludomir","lukyan","lyubov","magdalena","margarita","maria","marta","masha","maxim","mikhail","milan","milena","milica","milorad","mira","miroslav","mstislav","nadezhda","nadia","nail","nastja","natacha","natalia","natasha","nicholas","nicole","nikita","nina","nonna","odette","oksana","oleg","olga","osip","ossip","panteley","pavel","pavsikakiy","petya","piotr","polina","pyotr","rachel","radmila","radomir","radoslav","radul","raisa","rasim","ratimir","robert","roman","rostislav","ruslan","rustem","sambor","snežana","sobieslaw","sonia","sophia","stanimir","stanislav","stanislava","stefania","svetlana","svetoslav","sviatoslav","tamara","tanya","tatiana","timofey","timur","tonya","vadim","valentina","valeria","valery","vanya","vasilisa","velimir","veniamin","vera","viacheslav","viktor","viktoriya","vitomir","vlada","vladan","vladimir","vladislav","volodymyr","vsevolod","yakov","yefim","yegor","yekaterina","yelena","yermolay","yulia","yury","zenaida","zinoviy","zinovy","zora","zoran","zoya"];
TrainingData.sandwiches = ["angusburger","australasianhamburger","baconsandwich","baguette","banquetburger","barbecueburger","beefonweck","bolognasandwich","bonusjacksandwich","breakfastsandwich","buffaloburger","bunkebabsandwich","butterburger","californiaburger","carolinaburger","cheeseburger","cheesedream","cheesesandwich","cheesesteak","chickensandwich","chiliburger","chimichurris","chipbutty","chippedbeefsandwich","chowmeinsandwich","clubsandwich","clubsandwich","cornedbeefsandwich","crabcakesandwich","crispsandwich","crustlesssandwich","cubansandwich","cucumbersandwich","curryburger","dagwoodsandwich","delisandwich","denversandwich","diablosandwich","donerkebab","donkeyburger","doubledownsandwich","dynamitesandwich","eggs","eggsaladsandwich","eggsandwich","elvissandwich","fairybread","falafel","fatsandwich","frenchdip","friedbrainsandwich","fruitsandwich","gatsbysandwich","genericsandwich","gerbersandwich","greenchileburger","gyro","hamburger","hamcheesesandwich","hamdog","hawaiiburger","horseshoesandwich","hotbrownsandwich","hotchickensandwich","hotturkeysandwich","icecreamsandwich","italianbeef","italiansandwich","jucylucyburger","kimchiburger","lettucesandwich","limburgersandwich","lobsterroll","lutherburger","manwich","meatballsandwich","meltsandwich","muffuletta","naanburger","naansandwich","omeletsandwich","panini","pastramiburger","pattymelt","peanutbuttersandwich","pork","porkchopbun","porktenderloinsandwich","prawnroll","prosperitysandwich","pudgypie","pulledporksandwich","reubensandwich","riceburger","roastbeefsandwich","sailorsandwich","sailorsandwich","salmonburger","saltbeefbagel","sandwichloaf","sandwichwrap","sausagesandwich","sliderburger","slopperburger","sloppyjoeburger","slugburger","spaghettisandwich","steakbomb","steakburger","steaksandwich","submarinesandwich","tavern","tavernsandwich","teasandwich","teriyakiburger","toast","toasthawaii","toastie","tofusandwich","tonguetoast","tunafishsandwich","tunasandwich","turkeydevonshire","vegemitesandwich","vegetablesandwich","veggieburger","wurstbrot"];
TrainingData.satellites_natural = ["adrastea","aegaeon","aegir","aitne","albiorix","amalthea","ananke","anthe","aoede","arche","ariel","atlas","autonoe","bebhionn","belinda","bergelmir","bestla","bianca","caliban","callirrhoe","callisto","calypso","carme","carpo","ceres","chaldene","cordelia","cressida","cupid","cyllene","daphnis","deimos","desdemona","despina","dia","dione","dysnomia","earth","elara","enceladus","erinome","eris","erriapus","euanthe","eukelade","euporie","europa","eurydome","farbauti","fenrir","ferdinand","fornjot","francisco","galatea","ganymede","greip","halimede","harpalyke","hati","haumea","hegemone","helene","helike","hermippe","herse","himalia","hyperion","hyrrokkin","iapetus","ijiraq","io","iocaste","isonoe","janus","jarnsaxa","juliet","jupiter","kale","kallichore","kalyke","kari","kerberos","kiviuq","kore","laomedeia","larissa","leda","loge","lysithea","mab","margaret","mars","megaclite","mercury","methone","metis","mimas","miranda","mneme","mundilfari","naiad","namaka","narvi","neptune","nereid","neso","oberon","ophelia","orthosie","paaliaq","pallene","pan","pandora","pasiphae","pasithee","perdita","phobos","phoebe","pluto","polydeuces","portia","praxidike","prometheus","prospero","proteus","psamathe","puck","rhea","rosalind","sao","saturn","setebos","siarnaq","sinope","skathi","skoll","sponde","stephano","styx","surtur","suttungr","sycorax","tarqeq","tarvos","taygete","telesto","tethys","thalassa","thebe","thelxinoe","themisto","thrymr","thyone","titan","titania","trinculo","triton","umbriel","uranus","venus","xi","ymir"];
TrainingData.scientific_disciplines = ["acarology","accidence","aceology","acology","acoustics","adenology","aedoeology","aerobiology","aerodonetics","aerodynamics","aerolithology","aerology","aeronautics","aerostatics","agonistics","agriology","agrobiology","agrology","agronomics","agrostology","alethiology","algedonics","algology","anaesthesiology","anaglyptics","anagraphy","anatomy","andragogy","anemology","angiology","anthropobiology","anthropology","aphnology","apiology","arachnology","archaeology","archelogy","archology","arctophily","areology","aretaics","aristology","arthrology","astacology","astheniology","astrogeology","astrometeorology","astronomy","astrophysics","astroseismology","atmology","audiology","autecology","autology","auxology","avionics","axiology","bacteriology","balneology","barodynamics","barology","batology","bibliology","bibliotics","bioecology","biology","biometrics","bionomics","botany","bromatology","brontology","bryology","cacogenics","caliology","calorifics","cambistry","campanology","carcinology","cardiology","caricology","carpology","cartography","cartophily","castrametation","catacoustics","catalactics","catechectics","cetology","chalcography","chalcotriptics","chaology","characterology","chemistry","chirocosmetics","chirography","chirology","chiropody","chorology","chrematistics","chronobiology","chrysology","ciselure","climatology","clinology","codicology","coleopterology","cometology","conchology","coprology","cosmetology","cosmology","craniology","criminology","cryobiology","cryptology","cryptozoology","ctetology","cynology","cytology","dactyliology","dactylography","dactylology","deltiology","demography","demology","demonology","dendrochronology","dendrology","deontology","dermatoglyphics","dermatology","desmology","diabology","diagraphics","dialectology","dioptrics","diplomatics","diplomatology","docimology","dosiology","dramaturgy","dysgenics","dysteleology","ecclesiology","eccrinology","ecology","economics","edaphology","egyptology","ekistics","electrochemistry","electrology","electrostatics","embryology","emetology","emmenology","endemiology","endocrinology","enigmatology","entomology","entozoology","enzymology","ephebiatrics","epidemiology","epileptology","epistemology","eremology","ergology","ergonomics","escapology","eschatology","ethnogeny","ethnology","ethnomethodology","ethnomusicology","ethology","ethonomics","etiology","etymology","euthenics","exobiology","floristry","fluviology","folkloristics","garbology","gastroenterology","gastronomy","gemmology","genealogy","genesiology","genethlialogy","geochemistry","geochronology","geogeny","geogony","geography","geology","geomorphogeny","geoponics","geotechnics","geratology","gerocomy","gerontology","gigantology","glaciology","glossology","glyptography","glyptology","gnomonics","gnosiology","gnotobiology","graminology","grammatology","graphemics","graphology","gromatics","gynaecology","gyrostatics","haemataulics","hagiology","halieutics","hamartiology","harmonics","hedonics","helcology","heliology","helioseismology","helminthology","hematology","heortology","hepatology","heraldry","heresiology","herpetology","hierology","hippiatrics","hippology","histology","histopathology","historiography","historiology","homiletics","hoplology","horography","horology","horticulture","hydrobiology","hydrodynamics","hydrogeology","hydrography","hydrokinetics","hydrology","hydrometeorology","hydropathy","hyetology","hygiastics","hygienics","hygiology","hygrology","hygrometry","hymnography","hymnology","hypnology","hypsography","iamatology","iatrology","iatromathematics","ichnography","ichnology","ichthyology","iconography","iconology","ideogeny","ideology","idiomology","idiopsychology","immunogenetics","immunology","immunopathology","insectology","irenology","iridology","kalology","karyology","kinematics","kinesics","kinesiology","kinetics","koniology","ktenology","kymatology","labeorphily","larithmics","laryngology","lepidopterology","leprology","lexicology","lexigraphy","lichenology","limacology","limnobiology","limnology","linguistics","liturgiology","loimology","loxodromy","magirics","magnanerie","magnetics","malacology","malariology","mammalogy","manège","mariology","mastology","mathematics","mazology","mechanics","meconology","melittology","mereology","mesology","metallogeny","metallography","metallurgy","metaphysics","metapolitics","metapsychology","meteoritics","meteorology","metrics","metrology","microanatomy","microbiology","microclimatology","micrology","micropalaeontology","microphytology","microscopy","mineralogy","molinology","momilogy","morphology","muscology","museology","musicology","mycology","myology","myrmecology","mythology","naology","nasology","nautics","nematology","neonatology","neossology","nephology","nephrology","neurobiology","neurology","neuropsychology","neurypnology","neutrosophy","nidology","nomology","noology","nosology","nostology","notaphily","numerology","numismatics","nymphology","obstetrics","oceanography","oceanology","odology","odontology","oenology","oikology","olfactology","ombrology","oncology","oneirology","onomasiology","onomastics","ontology","oology","ophiology","ophthalmology","optics","optology","optometry","orchidology","ornithology","orology","orthoepy","orthography","orthopterology","oryctology","osmics","osmology","osphresiology","osteology","otology","otorhinolaryngology","paedology","paedotrophy","paidonosology","palaeoanthropology","palaeobiology","palaeoclimatology","palaeolimnology","palaeolimnology","palaeontology","palaeopedology","paleo-osteology","paleobotany","palynology","papyrology","parapsychology","parasitology","paroemiology","parthenology","pataphysics","pathology","patrology","pedagogics","pedology","pelology","penology","periodontics","peristerophily","pestology","petrology","pharmacognosy","pharmacology","pharology","pharyngology","phenology","phenomenology","philately","philematology","phillumeny","philology","philosophy","phoniatrics","phonology","photobiology","phraseology","phrenology","phycology","physics","physiology","phytology","piscatology","pisteology","planetology","plutology","pneumatics","podiatry","podology","polemology","pomology","posology","potamology","praxeology","primatology","proctology","prosody","protistology","proxemics","psalligraphy","psephology","pseudology","pseudoptics","psychobiology","psychogenetics","psychognosy","psychology","psychopathology","psychophysics","pteridology","pterylology","pyretology","pyrgology","pyroballogy","pyrography","quinology","raciology","radiology","reflexology","rhabdology","rhabdology","rheology","rheumatology","rhinology","rhochrematics","runology","sarcology","satanology","scatology","schematonics","sciagraphy","scripophily","sedimentology","seismology","selenodesy","selenology","semantics","semantology","semasiology","semiology","semiotics","serology","sexology","siderography","sigillography","significs","silvics","sindonology","sinology","sitology","sociobiology","sociology","somatology","sophiology","soteriology","spectrology","spectroscopy","speleology","spermology","sphagnology","sphragistics","sphygmology","splanchnology","spongology","stasiology","statics","stemmatology","stoichiology","stomatology","storiology","stratigraphy","stratography","stylometry","suicidology","symbology","symptomatology","synecology","synectics","syntax","syphilology","systematology","taxidermy","tectonics","tegestology","teleology","telmatology","teratology","teuthology","textology","thalassography","thanatology","thaumatology","theology","theriatrics","theriogenology","thermodynamics","thermokinematics","thermology","therology","thremmatology","threpsology","tidology","timbrology","tocology","tonetics","topology","toponymics","toreutics","toxicology","toxophily","traumatology","tribology","trichology","trophology","tsiganology","turnery","typhlology","typography","typology","uranography","uranology","urbanology","urenology","urology","venereology","vermeology","vexillology","victimology","vinology","virology","vitrics","volcanology","vulcanology","xylography","xylology","zenography","zoiatrics","zooarchaeology","zoochemistry","zoogeography","zoogeology","zoology","zoonomy","zoonosology","zoopathology","zoophysics","zoophysiology","zoophytology","zoosemiotics","zootaxy","zootechnics","zygology","zymology","zymurgy"];
TrainingData.scottish_surnames = ["aileanach","ailpeanach","allanach","ambarsan","andarsan","anndrasdan","arasgain","baran","barrach","beitean","bhodhsa","bhàsa","blacach","blàr","blàrach","bochanan","boid","breac","breathnach","brothaigh","bruis","brus","bràigheach","brùn","buideach","buidheach","buids","buiseid","bànach","bòideach","cailbhin","caileanach","caimbeul","caimbeulach","camran","camshron","camshronach","cananach","canonach","caoidheach","caolaisdean","catach","catan","catanach","ceallach","ceanadach","ceannaideach","cearrach","ceiteach","ciar","ciarach","ciogach","coineagan","crannach","creag","criatharach","cuimeanach","cuimein","cuimeineach","càidh","cèamp","cèampach","còmhan","dalais","deòir","deòireach","druimeanach","druimein","druimeineach","druiminn","dubh","dubhach","dunaid","dunaidh","dòmhnallach","dùbhghlas","dùghallach","dùghlas","dùghlasach","eabarcrombaigh","fearghasdan","fionnlasdan","flimean","foirbeis","foirbeiseach","forsàidh","friseal","frisealach","fòlais","gall","gallach","geadais","geadasach","gearailteach","gilios","gillandrais","gilleasbaig","gilleasbuig","gillechriosd","gillechrìost","giobsan","glas","gobha","grannd","grannda","granndach","greum","greumach","griogal","griogalach","griogarach","guaire","guinne","gunnach","gutraidh","gòrdan","gòrdanach","latharnach","lathurna","leamhanach","leamhnach","leòideach","lobhdain","loganach","loudain","lìos","lìosach","lùtair","macabhra","macabhsalain","macadaidh","macadhaimh","macaididh","macailein","macailpein","macalasdair","macambrais","macamhalghaidh","macamhlaidh","macamhlaigh","macanndaidh","macanndra","macanndrais","macaodhagain","macaoidh","macaoidhein","macaomalain","macaonghais","macara","macartain","macartair","macasgaidh","macasgaill","macasgain","macbeatha","macbeathag","macbharrais","macbheatha","macbheathaig","macbheathain","macbhigein","macbhiocair","macbhlàthain","macbhradain","macbhraonaigh","macbhrìghdeinn","macbhàididh","macbhàtair","maccaibe","maccailein","maccain","maccaisgein","maccalmain","maccaluim","maccaog","maccaoig","maccardaidh","maccarmaig","maccathachaidh","maccathail","maccathain","maccathasaigh","maccathbhaidh","maccathbharra","macceallaig","macceallaigh","macceallair","maccearnaigh","maccearraich","macceasain","macchoinnich","maccianain","macciarain","maccinidh","macciomalain","maccionadha","macclambroch","maccnaimhin","maccnusachainn","maccodrum","maccoinnich","maccoinnigh","maccolla","maccomhainn","macconaill","macconnain","maccorcadail","maccormaig","maccosgraigh","maccrain","maccreamhain","maccriomain","maccrithein","maccrosain","maccruimein","maccrìsdein","maccròin","maccuaig","maccuidhein","maccuilcein","maccuinn","maccuinnleis","maccuirc","maccuithein","maccullach","maccullaich","maccumasgaigh","maccumhais","maccuthais","maccàba","maccòiseam","maccòmhain","maccòmhghan","maccùga","macdheòrsa","macdhiarmaid","macdhonnchaidh","macdhrostain","macdhubhaich","macdhubhaig","macdhubhshìth","macdhubhthaich","macdhuibh","macdhunlèibhe","macdhàibhidh","macdhòmhnaill","macdhùghaill","macdhùnshléibhe","macdiarmaid","maceachaidh","maceachainn","maceachairn","maceacharna","macealair","macealar","maceamailinn","maceanain","maceanraig","maceòghainn","macfhearchair","macfhearghail","macfhearghais","macfhilib","macfhiongain","macfhionghain","macfhionnlaigh","macfhitheachain","macfhlaithbheartaich","macfhraing","macfhraingein","macfigeinn","macfrìdeinn","macfuirigh","macgairbheith","macgaradh","macghearailt","macghille","macgille","macgilleain","macgillearnain","macgilleasbaig","macgilleathain","macgillebhreac","macgillebhràth","macgillebhrìghde","macgillebhàin","macgillechaluim","macgillechrìosd","macgilledhonaghart","macgilledhuibh","macgillefhialain","macgilleghlais","macgillemhartainn","macgilleriabhaich","macgilleseathanaich","macgilleòin","macgillfhaolagain","macgillfhiontag","macgilliosa","macgilloig","macgillonaidh","macgiobain","macglaisein","macgobhainn","macgoraidh","macgoraidh","macgriogair","macguaire","macgumaraid","maciain","macillanndrais","macillanndrais","macillaodhagain","macilldheòra","macille","macillearnain","macilleasbaig","macilleathain","macilleathainn","macillebheathain","macillebhlàthain","macillebhreac","macillebhris","macillebhràth","macillebhrìghde","macillebhuidh","macillebhuidhe","macillebhàin","macillebhàin","macillechaluim","macillechatain","macillechathbhaidh","macillechiar","macillechiar","macillechiarain","macillechomhghain","macillechonaill","macillechruim","macillechrìosd","macilledhonaghart","macilledhubhthaich","macilledhuibh","macilledhuibh","macilledhuinn","macilledhòmhnaich","macilleghlais","macilleghuinnein","macilleghuirm","macillemhaoil","macillemhearnaig","macillemhoire","macillemhàrtainn","macillemhìcheil","macillemhìcheil","macillemhòire","macillenaoimh","macillenaoimh","macillepheadair","macillephàdraig","macilleriabhaich","macilleriabhaich","macilleruaidh","macilleruaidh","macillesheathain","macillesheathanaich","macillesheathnaich","macillethòmhais","macilleòin","macillfhaolagain","macillfhaolain","macillfheargain","macillfhialain","macillfhinnein","macillfhinnein","macillfhinntain","macillfhionndaig","macillfhionndaig","macillfhionndain","macillianain","macilliomchadha","macilliosa","macilloig","macillonchon","macillonfhaidh","macillosa","macilluidhir","macilléidich","macillìmheir","macillìosa","maciomhair","macionmhainn","maciosaig","maclabhrainn","maclabhruinn","maclachlainn","maclagain","maclamraich","maclaomainn","maclathagain","macleòid","macleòir","maclianain","macliuthar","maclothaidh","maclughaidh","macluinge","macluirg","maclulaich","maclùcaidh","maclùcais","macmhaighstir","macmhanachain","macmhannain","macmhaoilein","macmhaoirn","macmhaolagain","macmhaolain","macmhaolbheatha","macmhaolchaluim","macmhaoldòmhnaich","macmhaolìosa","macmharais","macmharcais","macmhata","macmhatha","macmhathain","macmhiadhchain","macmhoirein","macmhorgain","macmhuircheartaich","macmhuirich","macmhunna","macmhurardaich","macmhurchaidh","macmhànais","macmhàrtainn","macmhèinn","macmhìcheil","macmhòrdha","macnaois","macnaomhain","macneacail","macneachdain","macneis","macnia","macniallghais","macniallghuis","macniocail","macnobaill","macnèill","macnìll","macphaid","macphaidein","macphail","macphairce","macpheadair","macpheadarain","macpheadrais","macpheidearain","macphilip","macphàdraig","macphàic","macphàidein","macphàil","macphàrlain","macphòil","macrabaidh","macraghnaill","macraibeirt","macraoimhin","macraoiridh","macraonaill","macrath","macriada","macriocaird","macrisnidh","macrob","macrobaidh","macroibeirt","macroithridh","macruairidh","macrusachainn","macràild","macrìdeinn","macrìgh","macshanndaidh","macshealbhaigh","macsheòrais","macsheòrsa","macshimidh","macshithich","macshitrig","macshomhairle","macshuibhne","macshìm","macsiridh","macsporain","macsuain","macsual","macthaidhg","mactheàrlaich","macthom","macthomaidh","macthorcadail","macthorcaill","macthàmhais","macthòmais","mactiridh","mactuirc","macualraig","macuaraig","macuchtraigh","macuilleim","macuirigh","macuirigh","macuisdein","macurardaidh","macurardaigh","macurchadain","macurchaidh","macusbaig","macàidh","macùisdein","maoileanach","maoliosa","matasan","mathanach","matharnach","mawr","moireach","moireasdan","moireasdanach","morgan","morganach","munna","màrnach","màrr","màrtainn","mèinn","mèinnearach","niocalsan","padarsan","paorach","peadarsan","peucag","peutan","preas","puidreach","rathais","robasan","robasdan","roid","roideach","ros","rosach","rothach","ruadh","ruiseal","ròs","ròsach","sailcirc","salmond","scottish","scottish","seadh","seadhg","seagha","seaghach","seathanach","sginnearach","sgot","sgèin","singleir","siosal","siosalach","smios","stiùbhart","stiùbhartach","sutharlainn","sutharlan","suthurlanach","sùdrach","talmhach","tod","todt","tolmach","tuairnear","tulach","tàileach","tàillear","ualas","umphraidh","urchadainn","urchardan","ìomharach"];
TrainingData.snakes_common_names = ["adder","anaconda","asp","aspviper","ballpython","bambooviper","birdsnake","blackmamba","blackratsnake","blacksnake","blindsnake","bluntnoseviper","boa","boaconstrictor","boomslang","brownsnake","brownwaterpython","bullsnake","burrowingviper","bushmaster","bushviper","capecobra","carpetviper","cateyedsnake","catsnake","chickensnake","coachwhipsnake","cobra","commoncobra","congosnake","copperhead","coralsnake","cornsnake","cottonmouth","crossedviper","crownedsnake","deathadder","desertdeathadder","diamondpython","dwarfboa","eyelashviper","eyelashviper","falsecobra","fiercesnake","fishingsnake","flyingsnake","forestcobra","foxsnake","gartersnake","glossysnake","gophersnake","grasssnake","graycatsnake","greenanaconda","greenmamba","greensnake","groundboa","heraldsnake","hognosedviper","hognosesnake","hoopsnake","hornedadder","hornedviper","keelback","kingbrown","kingcobra","kingsnake","leafviper","longnosed dder","lyresnake","mamba","milksnake","moccasinsnake","moleviper","mountainadder","mudadder","mudsnake","nightsnake","palmviper","parrotsnake","patchnosesnake","pinesnake","pipesnake","pitviper","puffadder","python","queensnake","raddysnake","rainbowboa","ratsnake","rattler","rattlesnake","riverjack","rubberboa","sandadder","sandboa","sandviper","seasnake","sidewinder","smoothsnake","spittingcobra","stilettosnake","stormwatercobra","stripedsnake","sunbeamsnake","tentacledsnake","tigersnake","treeboa","treeboa","treesnake","treeviper","twigsnake","viper","wartsnake","wateradder","watermoccasin","watersnake","whipsnake","wolfsnake","wormsnake","yellowcobra","zebrasnake"];
TrainingData.spanish_forenames = ["aaron","ababa","abigail","abrahan","absalon","abundio","adalberto","adan","adela","adelaida","adelia","adisoda","adolfo","adrian","adriana","adriano","africa","agapito","agueda","agustina","aida","aimar","ainara","ainhoa","aitor","alba","albano","alberto","alejandra","alejandro","alfonso","alfredo","alicia","alma","almudena","alodia","alondra","altagracia","alvara","alvaro","amalia","amanda","amaya","amelia","amparo","ana","andrea","andres","angel","angela","angeles","angelica","anibal","aniceto","anita","antero","antonia","antonieta","antonio","araceli","arantxa","ariel","armando","arturo","ascension","asuncion","augustin","aurelia","aurelio","aurora","azucena","barbara","bartolome","basilio","beatriz","begona","belen","beltran","beneharo","benita","benito","benjamin","bernardino","bernardo","berta","blanca","blas","bonifacio","braulio","brunilda","calixto","camila","candida","candido","canuto","caridad","carla","carlos","carlota","carmen","carolina","casimiro","catalina","catrina","cayetano","cecilia","celia","cesar","chaxiraxi","chema","citlali","clara","claudia","claudio","clotilde","cobura","concepcion","consolacion","consuelo","cornelio","covadonga","cristina","cristobal","cruz","cruz","dalila","damaso","damian","daniel","daniela","daritza","david","dayana","debora","delia","derque","desamparados","diana","diego","dionisia","dionisio","dolores","dominga","domingo","dorotea","echedey","edgar","edgardo","edmundo","eduardo","efren","egidio","elena","elias","elisa","eliseo","eloy","elvira","emanuel","emelda","emilia","emilio","encarnacion","enka","enrique","enriqueta","ernestina","ernesto","esperanza","estanislao","esteban","estefania","estela","ester","esther","eufemia","eugenia","eugenio","eulalia","eva","ezequiel","fabian","fabiana","fabio","fabricia","fabricio","facunda","facundo","fadrique","federico","feliciana","feliciano","felicidad","felipa","felipe","felisa","fermin","fermina","fernan","fernanda","fernando","ferrando","fidel","filomena","firjas","flavia","flora","florencia","floria","florio","floro","francisco","franco","frida","froila","froilan","froilana","fulberta","fulberto","fulca","fulco","gabriel","gabriela","gara","gema","genaro","german","gershu","gilberto","ginebra","gines","gonzalo","graciela","gregorio","guadalupe","guadalupe","guillermina","guillermo","gustavo","hanagua","haydee","hector","hernando","hilda","hipolito","hortensia","hugo","humberto","ignacio","ilda","imelda","inaki","ines","inigo","inmaculada","irene","ireneo","isaac","isabel","isidoro","isidro","ismael","itahisa","ivan","jacinta","jacinto","jacobo","jacqueline","jaime","jairo","javier","javiera","jesus","jimena","joaquin","joaquina","jonay","jorge","jorgelina","jose","josefa","josefina","josue","juan","juana","juanca","juanfran","juano","julian","juliana","julieta","julio","justin","justo","karina","kebehi","ladislao","laura","lea","leandro","leire","leon","leonardo","leonor","leopoldo","leticia","lia","lidia","lilia","liliana","lope","lorena","lorenza","lorenzo","lourdes","lucas","lucia","luciana","luciano","luis","luisa","luna","luz","macarena","magdalena","maite","manuel","manuela","marcela","marcelina","marcelino","marcelo","marcial","marcos","margarita","maria","mariana","mariano","maribel","marina","mario","marta","martin","martina","mateo","matias","matilde","maximo","mayte","meagens","mercedes","micaela","miguel","miguela","milagros","mireia","mirella","mireya","modesta","modesto","moises","monica","montserrat","murillo","narcisa","narciso","natalia","natalio","natan","natan","natividad","nerea","nicolas","nicolau","nieves","nilda","noelia","noemi","nuria","ofelia","olga","ordono","oriol","oscar","oswaldo","pablito","pablo","paqui","pascual","pascuala","patricia","patricio","paula","paulette","paulina","paulito","paz","pedro","pelayo","piedad","pilar","pio","purificacion","rafael","rafaela","raimunda","raimundo","ramira","ramiro","ramon","ramona","raquel","raul","rebeca","remedios","renato","ricarda","ricardo","roberto","rocio","rodolfa","rodolfo","rodrigo","rogelio","rosa","rosalia","rosario","roxana","ruben","rut","ruth","ruy","salomon","salvador","samuel","sancho","sandra","santi","santiago","sara","saul","sebastian","segundo","selena","serafina","sergio","silvia","silvio","simon","sofia","soledad","sonia","soraya","susana","tadeo","tania","teodora","teodoro","teofilo","teresa","thiare","tiare","timoteo","tito","tomas","tomasa","triana","trinidad","tristan","trysta","ulises","ulrica","unai","ursula","valentin","valentina","vane","vanesa","veronica","vicenta","vicente","victoria","violeta","virginia","vito","ximena","yago","yesenia","yolanda","zulma"];
TrainingData.sports = ["abseiling","aerobatics","aikido","air acing","airsoft","angling","archery","autocross","autograss","axethrowing","backpacking","backstroke","badminton","bagatelle","balancebeam","ball","ballooning","bando","bandy","bangerracing","barbilliards","barrelracing","bartitsu","baseball","basejumping","basketball","batontwirling","beachsoccer","beachtennis","beachvolleyball","beagling","billiards","biribol","blackball","bobsleigh","bodyboarding","bodybuilding","bottlepool","bouldering","bowlliards","boxing","breaststroke","broomball","bucketball","bullriding","bushwhacking","campdrafting","canoeing","canyoneering","cardstacking","casterboarding","casting","catchwrestling","coastalrowing","coasteering","cockfighting","corkball","cowboy","creeking","cribbage","cricket","crosscountry","curling","cutting","cycling","cyclocross","deerhunting","desertracing","dicestacking","dinghysailing","dirtjumping","discdog","discgolf","diving","dodgeball","dodgedisc","dragracing","drifting","eightball","fastnet","fencing","figureskating","fistball","fivepins","fives","floor","floorball","flutterguts","flyfishing","flyingtrapeze","folkrace","folkwrestling","football","footvolley","formularacing","foxhunting","freeboarding","freeboating","freediving","freerunning","freestyle","geocaching","gigracing","gliding","goalball","grasstrack","greekwrestling","gymnastics","handball","handball","hanggliding","harecoursing","harnessracing","highbar","hiking","hillclimbing","hockey","hoop","hooverball","horseracing","iceclimbing","icefishing","icehockey","iceracing","icespeedway","iceyachting","jousting","judo","juggling","jujutsu","karate","kartracing","kendo","kenjutsu","kickball","kickboxing","kilikiti","kiteboarding","kitebuggying","kitefighting","kitelandboarding","kitesurfing","kneeboarding","kungfu","lacrosse","landsailing","lasertag","letterboxing","longball","longboarding","luge","matball","matchplay","medleyrelay","miniaturegolf","motocross","mountainboarding","mountaineering","mudbogging","netball","ninjutsu","offroading","orienteering","paintball","parachuting","paragliding","paramotoring","parasailing","parkour","poleclimbing","polo","polocrosse","pool","powerlifting","punchball","racewalking","racketlon","racquetball","racquets","rafting","rallycross","rallying","reining","ribbon","ringball","ringette","ringo","riverboarding","rodeo","rope","ropeclimbing","ropejumping","roping","rundown","sailing","sandboarding","sanshou","scootering","scubadiving","seakayaking","shootboxing","shootfighting","showjumping","skateboarding","skibobbing","skijumping","skimboarding","skitouring","skydiving","skysurfing","slacklining","slamball","snooker","snooker","snorkelling","snowboarding","snowkiting","softball","softball","softtennis","spearfishing","speedball","speedgolf","speedminton","speedpool","speedskiing","squash","steeplechase","streetball","streetboarding","streetracing","sumowrestling","supercross","supermoto","surfboat","surfing","swordfighting","tennis","testcricket","throwball","tobogganing","trackcycling","trackracing","trampolining","trapeze","truckracing","ultimate","unicycling","vault","volleyball","wakeboarding","wakesurfing","walking","wallyball","waterpolo","watervolleyball","windsurfing","wireball","wrestling"];
TrainingData.stars_proper_names = ["acamar","achernar","achird","acrab","acrux","acubens","adhafera","adhara","ain","aladfar","alamak","alathfar","alaraph","albaldah","albali","albireo","alchiba","alcor","alcyone","aldebaran","alderamin","aldhafera","aldhibah","aldib","alfirk","algedi","algenib","algenib","algieba","algol","algorab","alhajoth","alhena","alioth","alkaid","alkalurops","alkes","alkurah","almach","alnasl","alnilam","alnitak","alniyat","alphard","alphecca","alpheratz","alrai","alrakis","alrami","alrischa","alsafi","alsciaukat","alshain","alshat","altair","altais","altarf","alterf","aludra","alwaid","alya","alzir","ancha","angetenar","ankaa","antares","arcturus","arich","arided","arkab","armus","arneb","arrakis","ascella","asellus","ashlesha","askella","aspidiske","asterion","asterope","atik","atlas","atria","auva","avior","azaleh","azelfafage","azha","azimech","azmidiske","baham","baten","becrux","beid","bellatrix","benetnasch","betelgeuse","botein","brachium","canopus","capella","caph","caphir","castor","castula","celbalrai","celaeno","chara","chara","cheleb","chertan","coxa","caiam","cursa","cynosura","dabih","decrux","deneb","denebola","dheneb","diadem","diphda","dnoces","dschubba","dubhe","duhr","edasich","electra","elmuthalleth","elnath","eltanin","enif","errai","etamin","fomalhaut","furud","gacrux","gatria","gemma","gianfar","giedi","giennah","girtab","gomeisa","gorgonea","graffias","grafias","grassias","grumium","hadar","hadir","haedus","haldus","hamal","hassaleh","hydrus","heka","heze","hoedus","homam","hyadum","hydrobius","izar","jabbah","jih","kabdhilinan","kaffaljidhma","kajam","kastra","keid","kitalpha","kleeia","kochab","kornephoros","kraz","ksora","kuma","lesath","maasym","mahasim","maia","marfark","marfik","markab","matar","mebsuta","media","megrez","meissa","mekbuda","menchib","menkab","menkalinan","menkar","menkent","menkib","merak","merga","merope","mesarthim","miaplacidus","mimosa","minchir","minelava","minkar","mintaka","mira","mirach","miram","mirfak","mirzam","misam","mizar","mothallah","muliphein","muphrid","murzim","naos","nash","nashira","navi","nekkar","nembus","neshmet","nihal","nunki","nusakan","okul","peacock","phact","phad","pherkad","pherkard","pleione","pollux","porrima","praecipua","procyon","propus","proximacentauri","pulcherrim","rana","rasalas","rastaban","regor","regulus","rigel","rotanev","ruchba","ruchbah","rukbat","sabik","sadachbia","sadalbari","sadalmelik","sadalsuud","sadatoni","sadira","sadr","sadlamulk","saiph","saiph","salm","sargas","sarin","sceptrum","scheat","scheddi","schedar","segin","seginus","sham","shaula","sheliak","sheratan","sinistra","sirius","situla","skat","spica","sterope","sualocin","subra","suhail","suhel","sulafat","sol","syrma","tabit","tarazet","taygeta","terebellum","thabit","theemin","unukalhai","vega","vindemiatrix","wasat","wei","wezen","wezn","yildun","zaniah","zaurak","zavijava","zedaron","zelphah","zibal","zosma","zubenelgenubi","zubenelgubi","zubeneschemali","zubenhakrabi"];
TrainingData.superlatives = ["angriest","best","biggest","bitterer","bitterest","blackest","blandest","bloodiest","bluest","boldest","bossiest","bravest","briefest","brightest","broadest","busiest","calmest","cheapest","chewiest","chubbiest","classiest","cleanest","clearest","cleverer","cleverest","closest","cloudiest","clumsiest","coarsest","coldest","coolest","craziest","creamiest","creepiest","crispiest","cruelest","crunchiest","curliest","curviest","cutest","dampest","darkest","deadliest","deepest","densest","dirtiest","driest","dullest","dumbest","dustiest","earliest","easiest","eldest","faintest","fairest","fanciest","farthest","fastest","fattest","fewest","fiercest","filthiest","finest","firmest","fittest","flakiest","flattest","freshest","friendliest","fullest","funniest","further","furthest","gentlest","gloomiest","grandest","gravest","greasiest","greatest","greediest","grossest","guiltiest","hairiest","handiest","happiest","hardest","harshest","healthiest","heaviest","highest","hippest","hottest","humblest","hungriest","iciest","itchiest","juiciest","kindest","largest","latest","laziest","lightest","likeliest","littlest","liveliest","loneliest","longest","loudest","loveliest","lowest","maddest","meanest","messiest","mildest","moistest","narrowest","nastiest","naughtiest","nearest","neatest","neediest","newest","nicest","noisiest","oddest","oiliest","older","oldest","plainest","politer","politest","poorest","prettiest","proudest","purest","quickest","quietest","rarest","rawest","richest","ripest","riskiest","roomiest","roughest","rudest","rustiest","saddest","safest","saltiest","sanest","scariest","shallowest","sharpest","shiniest","shortest","shyest","silliest","simplest","sincerest","skinniest","sleepiest","slimiest","slimmest","slowest","smallest","smartest","smelliest","smokiest","smoothest","softest","soonest","sorest","sorriest","sourest","spiciest","steepest","stingiest","strangest","strictest","strongest","sunniest","sweatiest","sweetest","tallest","tannest","tastiest","thickest","thinnest","thirstiest","tiniest","toughest","truest","ugliest","warmest","weakest","wealthiest","weirdest","wettest","widest","wildest","windiest","wisest","worldliest","worst","worthiest","youngest"];
TrainingData.supermarkets_and_discount_stores = ["aldi","asda","bargainbooze","bargainbuys","bargaincrazy","bimart","booths","bottomdollarfood","budgens","burlington ","buyright","cooltrader","cornerstore","costco","costcutter","cubfoods","deals","dollargeneral","dollartree","drugfair","familybargains","familymart","farmfoods","farmfreshexpress","fedmart","foodmart","gemco","gordmans","grandcentral","happyshopper","hartsstores","homebargains","hypervalue","iceland","jamesway","kaufland","kmart","kwiksave","kwiktrip","magicmart","mammothmart","morrisons","nationalstores","netto","ocado","poundland","poundstretcher","poundworld","premierstores","premiersupermarkets","richway","rodgersstores","rossstores","sainsburys","savealot","saverite","savershealth","seveneleven","shopko","shoppercity","shoprite","shopritehyper","steinmart","tesco","valumart","venturestores","waitrose","walmart","wellworths","whitemart","wincofoods","woolco","woolworths"];
TrainingData.swedish_forenames = ["adam","adrian","agnes","albin","alex","alexander","alfred","ali","alice","alicia","alma","alva","alvin","amanda","amelia","anna","anton","aron","arvid","astrid","august","axel","benjamin","carl","casper","celine","charlie","colin","cornelia","daniel","dante","david","ebba","ebbe","eddie","edith","edvin","edward","elias","elin","elina","elis","elisa","elise","ella","ellen","ellie","ellinor","elliot","elsa","elton","elvin","elvira","emelie","emil","emilia","emma","emmy","erik","ester","felicia","felix","filip","filippa","frank","freja","gabriel","greta","gustav","hampus","hanna","harry","hedda","henry","hilda","hilma","hjalmar","hugo","ida","ines","ingrid","iris","isabella","isabelle","isak","ivar","jack","jacob","jasmine","joel","john","joline","jonathan","josef","julia","julian","juni","kevin","klara","leah","leia","leo","leon","liam","lilly","linn","linnea","linus","lisa","liv","livia","loke","loui","lova","love","lovis","lovisa","lucas","ludvig","luna","lykke","maja","majken","malte","maria","matilda","matteo","max","maximilian","meja","melissa","melker","melvin","milo","milton","minna","mio","mira","moa","mohamed","molly","my","märta","nathalie","nellie","neo","nicole","nils","noah","noel","nora","nova","novalie","oliver","olivia","olle","oscar","otto","rasmus","ronja","rut","saga","sally","sam","samuel","sara","sebastian","selma","sigge","signe","sigrid","simon","siri","sixten","sofia","stella","stina","svante","svea","tage","thea","theo","theodor","tilda","tilde","tindra","tuva","tyra","valter","vera","victoria","vidar","viggo","viktor","vilgot","ville","vincent","wilhelm","william","wilma","wilmer"];
TrainingData.swiss_cities = ["aarau","aarberg","aarburg","adliswil","agno","aigle","allschwil","altdorf","altstätten","amriswil","appenzell","arbon","ascona","aubonne","avenches","baar","baden","basel","bellinzona","bern","beromünster","biasca","biel","bienne","binningen","birsfelden","bischofszell","boudry","bremgarten","brig","brugg","buchs","bulle","burgdorf","bülach","carouge","cham","chur","conthey","coppet","cossonay","croglio","cudrefin","cully","davos","delémont","diessenhofen","dietikon","dübendorf","ebikon","eglisau","einsiedeln","elgg","emmen","erlach","frauenfeld","freienbach","fribourg","geneva","gland","glarus","gordola","gossau","grandcour","grandson","greifensee","grenchen","gruyères","grüningen","herisau","hermance","horgen","horw","huttwil","ilanz","ittigen","kaiserstuhl","klingnau","kloten","kreuzlingen","kriens","köniz","küsnacht","küssnacht","lachen","lancy","langenthal","laufen","laufenburg","laupen","lausanne","lenzburg","leuk","lichtensteig","liestal","locarno","losone","lucerne","lugano","lutry","lyss","maienfeld","martigny","meilen","mellingen","mendrisio","meyrin","monthey","montreux","morcote","morges","moudon","moutier","muri","murten","muttenz","münchenstein","münsingen","neuchâtel","neuhausen","neunkirch","nidau","nyon","oftringen","olten","onex","opfikon","orbe","orsières","ostermundigen","payerne","porrentruy","pratteln","prilly","pully","regensberg","regensdorf","reinach","renens","rheinau","rheineck","rheinfelden","richterswil","riehen","rolle","romainmôtier","romont","rorschach","rue","rüti","saillon","sala","sargans","sarnen","schaffhausen","schlieren","schwyz","sembrancher","sempach","sierre","sion","solothurn","spiez2","splügen","spreitenbach","stans","steckborn","steffisburg","stäfa","sursee","thalwil","thun","thusis","thônex","unterseen","uster","uznach","uzwil","valangin","vernier","versoix","vevey","villeneuve","visp","volketswil","waldenburg","walenstadt","wallisellen","werdenberg","wettingen","wetzikon","wiedlisbach","wil","willisau","winterthur","wohlen","worb","wädenswil","zofingen","zollikon","zug","zurich","zurzach","échallens"];
TrainingData.theological_angels = ["abaddon","abathar","adriel","ahriman","ambriel","amesha","anael","angel","arariel","archangel","ariel","azazel","azrael","barachiel","bene","camael","cassiel","cherub","cherubim","daniel","dardail","dominions","dumah","eremiel","gabriel","gadreel","grigori","hadraniel","hahasiah","hamalat","haniel","harut","hashmal","hesediel","imamiah","israfil","jegudiel","jehoel","jequn","jerahmeel","jophiel","kerubiel","kiraman","kushiel","leliel","lucifer","maalik","marut","mebahiah","metatron","michael","muaqqibat","munkar","muriel","nakir","nanael","netzach","nithael","nuriel","pahaliah","penemue","phanuel","powers","poyel","principalities","puriel","qaphsiel","raguel","raphael","raziel","remiel","sachiel","samael","sandalphon","sariel","schemhampharae","selaphiel","seraph","seraphiel","seraphim","shamsiel","simiel","temeluchus","tennin","thrones","tzaphqiel","uriel","uzziel","vehuel","virtues","wormwood","zachariel","zadkiel","zaphkiel","zephon","zophiel"];
TrainingData.theological_demons = ["abaddon","abezethibou","abraxas","abyzou","adramelech","aeshma","agaliarept","agares","agiel","agrat","ahriman","aim","aka","ala","alal","alastor","allocer","alloces","allu","amaymon","amdusias","amy","anamalech","ancitif","andhaka","andras","andrealphus","andromalius","angra","antichrist","anzu","apollyon","archon","armaros","arunasura","asag","asakku","asbel","asmodai","asmodeus","astaroth","asura","azazel","azi","baal","babi","bael","bakasura","balam","balberith","bali","banshee","baphomet","barbas","barbatos","barong","bathin","bathym","beelzebub","behemoth","beherit","beleth","belial","belphegor","berith","bhūta","bifrons","boruta","botis","buer","bukavac","bune","bushyasta","caacrinolaas","caassimolar","cain","canio","cerbere","charun","chax","chemosh","choronzon","cimeies","cimejes","classyalabolas","corson","crocell","culsu","daeva","dagon","dajjal","danjal","dantalion","davy","decarabia","demiurge","demogorgon","devil","drekavac","dzoavits","eblis","eisheth","eligos","flauros","flavros","focalor","foraii","foras","forcas","forcas","forneus","furcas","furfur","gaap","gaderel","gaki","gamigin","ghoul","glasya","gomory","gorgon","gremory","grigori","gualichu","guayota","gusion","gusoin","gusoyn","haagenti","haborym","halphas","hantu","hauras","haures","havres","ifrit","incubus","ipes","ipos","jikininki","jinn","kabandha","kabhanda","kali","kasadya","killakee","kimaris","kokabiel","krampus","kroni","kumbhakarna","lechies","legion","lempo","leraie","leraje","leviathan","leyak","lili","lilim","lilin","lilith","lucifer","lucifuge","malaphar","malephar","malphas","malthus","mammon","mara","marax","marchosias","maricha","marthim","masih","mastema","mathim","mephistopheles","merihem","moloch","morax","morpheus","murmur","naamah","naberius","naberus","namtar","ninurta","onoskelis","orcus","orias","oriax","ornias","orobas","ose","paimon","pazuzu","pelesit","penemue","phenex","pithius","pocong","pontianak","procell","pruflas","puloman","rahab","rakshasa","rangda","raum","ravan","ronove","rusalka","sabnock","saleos","samael","satan","seir","semyaz","shax","shedim","sitri","solas","sthenno","stolas","suanggi","succubus","surgat","tannin","toyol","tuchulcha","ukobach","valac","valefar","vanth","vapula","vassago","vepar","vine","wendigo","xaphan","xezbeth","yeqon","yeterel","zagan","zepar","ziminiar","ördög"];
TrainingData.tolkienesque_forenames = ["abattârik","adalgrim","adanedhel","adanel","adrahil","adûnakhôr","aegnor","aerin","agarwaen","aikanáro","aiwendil","alatar","alatáriel","alcarin","aldamir","aldarion","aldaron","aldor","alfwine","amandil","amandil","amdír","amlaith","amras","amrod","amroth","amrothos","anairë","anardil","anborn","ancalagon","ancalimon","ancalimë","andrast","andreth","andróg","anducal","anfauglir","angbor","angrod","annatar","anárion","arador","araglas","aragorn","aragost","arahad","arahael","aranarth","arantar","aranuir","araphant","araphor","arassuil","aratan","aratar","arathorn","araval","aravir","aravorn","aredhel","argeleb","argon","argonui","arien","aros","arthedain","arthedain","arvedui","arvegil","arveleg","arwen","asfaloth","atanamir","atanatar","aulë","ausir","avranc","azaghâl","azog","baldor","balin","baragund","barahir","barahir","baran","bard","barliman","bauglir","belecthor","beleg","belegorn","belegund","belemir","belladonna","beorn","bereg","beregond","beren","bergil","bert","berylla","berúthiel","berúthiel","bifur","bofur","boldog","bolg","bolger","bombadil","bombur","borin","boromir","boron","borondir","brand","brandir","brego","bregolas","bregor","brodda","brytta","bucca","bëor","bór","calembel","calimehtar","calion","calmacil","calmacil","caranthir","carcharoth","castamir","celeborn","celebrimbor","celebrindor","celebrían","celegorm","celepharn","cemendur","ceorl","cirion","ciryaher","ciryandil","ciryatan","ciryon","cotton","curufin","curunír","círdan","daeron","denethor","dernhelm","deórwine","dior","dori","dorlas","draugluin","duilin","durin","dwalin","dáin","déagol","déor","dís","ecthelion","egalmoth","eilinel","elanor","elbereth","eldacar","eldarion","elemmakil","elendil","elendor","elendur","elenna","elenwë","elessar","elfhelm","elfhild","elfwine","elladan","elmar","elmo","elrohir","elrond","elros","elu","elven","elwing","elwë","emeldir","emerië","enel","enelyë","eorl","eradan","erendis","erestor","erkenbrand","estel","estelmo","estë","eärendil","eärendur","eärnil","eärnur","eärwen","eöl","eönwë","falassion","faniel","faramir","fastred","felaróf","fengel","ferumbras","finarfin","findis","finduilas","finduilas","fingolfin","fingon","finrod","finvain","finwë","folcwine","fortinbras","freca","frerin","fréa","fréaláf","fréawine","frór","fuinur","fundin","fëanor","fíli","fíriel","galador","galadriel","galdor","gamil","gamling","gandalf","gerontius","ghânburi","gildor","gilgalad","gilrain","gimilkhâd","gimilzôr","gimli","ginglith","girion","glanhír","glaurung","glorfindel","glóin","glóredhel","goldberry","goldwine","golfimbul","gollum","gorbag","gorlim","gormadoc","gorthaur","gothmog","gram","grimbold","grishnákh","gríma","grór","gwaihir","gwathir","gwindor","hador","halbarad","haldad","haldan","haldar","haldir","haleth","hallas","halmir","handir","hardang","hareth","helm","herion","herucalmo","herumor","herunúmen","hirgon","hiril","hostamir","huan","hundar","huor","hyarmendacil","háma","húrin","ibûn","idril","ilmarë","ilúvatar","ilúvatar","imbar","imin","iminyë","imrahil","indis","inglor","ingwë","inziladûn","inzilbêth","irimë","irmo","isildur","isilmo","isilmë","isumbras","ivriniel","khamûl","khîm","king","kíli","kúvion","lagduf","lalaith","legolas","lenwë","lindir","lobelia","lotho","lugdush","lurtz","léod","lúthien","mablung","maedhros","maeglin","maglor","magor","mahtan","maiar","malach","mallor","malvegil","manthor","manwë","marach","mauhúr","meleth","melian","meneldil","meneldur","meriadoc","minalcar","minardil","minastir","minyatur","mithrandir","morgoth","morwen","morwen","muzgash","mírielar","mírielserindë","mîm","nahar","narmacil","narvi","nerdanel","nessa","nienna","nienor","nimloth","nimrodel","nori","náin","námo","níniel","nólimon","nóm","ohtar","olwë","olórin","ondoher","ori","ornendil","orodreth","oromë","oropher","orophin","ossë","ostoher","paladin","palantir","pallando","pelendur","pengolodh","peregrin","pervinca","pharazôn","primula","radagast","rían","rómendacil","rúmil","sador","saeros","sakalthôr","salgant","salmar","saruman","sauron","scatha","shadowfax","shagrat","shelob","silmariën","singollo","siriondil","smaug","sméagol","snowmane","soronto","strider","súrion","tarannon","tarcil","tarondor","tata","tatië","telchar","telemmaitë","telemnar","telperiën","telumehtar","thengel","thingol","thorin","thorondir","thorondor","thranduil","thráin","thrór","théoden","théodred","théodwyn","tilion","tindomiel","tinúviel","tulkas","tuor","turambar","turgon","túrin","ufthak","uglúk","uinen","uldor","ulfang","ulfast","ulmo","ulwarth","umbardacil","undómiel","ungoliant","uolë","urwen","vairë","valacar","valandil","valandur","vanimeldë","varda","vardamir","vidugavia","vidumavi","vinyarion","vorondil","voronwë","voronwë","vána","walda","wormtongue","yavanna","yávien","zimraphel","zimraphel","zimrathôn","éomer","éomund","éothain","éothéod","éowyn","írildë","óin"];
TrainingData.units_of_heroes_of_might_and_magic_3 = ["airelemental","ancientbehemoth","angel","archangel","archdevil","archer","archmage","azuredragon","basilisk","battledwarf","behemoth","beholder","blackdragon","blackknight","boar","bonedragon","cavalier","centaur","centaurcaptain","cerberus","champion","chaoshydra","crusader","crystaldragon","cyclops","cyclopsking","demon","dendroid","devil","diamondgolem","dragonfly","dreadknight","dwarf","earthelemental","efreet","efreetsultan","enchanter","energyelemental","evileye","faerie","familiar","firebird","fireelemental","gargoyle","genie","ghostdragon","giant","gnoll","goblin","gog","golddragon","goldgolem","golem","gorgon","grandelf","greaterbasilisk","greendragon","gremlin","griffin","halberdier","halfling","harpy","harpyhag","hellhound","hobgoblin","horneddemon","hydra","iceelemental","imp","infernaltroglodyte","irongolem","lich","lizardman","lizardwarrior","mage","magicelemental","magmaelemental","magog","manticore","marksman","mastergenie","mastergremlin","medusa","medusaqueen","mightygorgon","minotaur","minotaurlord","monk","mummy","naga","nagaqueen","nomad","obsidiangargoyle","ogre","ogremage","orc","orcchieftain","peasant","pegasus","phoenix","pikeman","pitfiend","pitlord","pixie","powerlich","psychicelemental","reddragon","roc","rogue","royalgriffin","rustdragon","scorpicore","sharpshooter","silverpegasus","skeleton","skeletonwarrior","sprite","stonegargoyle","stonegolem","stormelemental","swordsman","thunderbird","titan","troglodyte","troll","unicorn","vampire","vampirelord","walkingdead","warunicorn","waterelemental","wight","wolfraider","wolfrider","woodelf","wraith","wyvern","wyvernmonarch","zealot","zombie"];
TrainingData.unix_commands = ["admin","alias","ar","asa","at","awk","basename","batch","bc","bg","cc","c99","cal","cat","cd","cflow","chgrp","chmod","chown","cksum","cmp","comm","command","compress","cp","crontab","csplit","ctags","cut","cxref","date","dd","delta","df","diff","dirname","du","echo","ed","env","ex","expand","expr","false","fc","fg","file","find","fold","fort77","fuser","gencat","get","getconf","getopts","grep","hash","head","iconv","id","ipcrm","ipcs","jobs","join","kill","lex","link","ln","locale","localedef","logger","logname","lp","ls","m4","mailx","make","man","mesg","mkdir","mkfifo","more","mv","newgrp","nice","nl","nm","nohup","od","paste","patch","pathchk","pax","pr","printf","prs","ps","pwd","qalter","qdel","qhold","qmove","qmsg","qrerun","qrls","qselect","qsig","qstat","qsub","read","renice","rm","rmdel","rmdir","sact","sccs","sed","sh","sleep","sort","split","strings","strip","stty","tabs","tail","talk","tee","test","time","touch","tput","tr","true","tsort","tty","type","ulimit","umask","unalias","uname","uncompress","unexpand","unget","uniq","unlink","uucp","uudecode","uuencode","uustat","uux","val","vi","wait","wc","what","who","write","xargs","yacc","zcat"];
TrainingData.vegetables = ["arracacha","artichoke","asparagus","avocado","badderlocks","bambooshoot","bean","beet","beetroot","bellpepper","bittermelon","bokchoy","broadleaf","broccoli","brusselssprouts","burdock","cabbage","camas","canna","caper","cardoon","carola","carrot","cassava","cauliflower","celeriac","celery","chickweed","chicory","chinesemallow","chives","chrysanthemum","collardgreens","cornsalad","courgetteflowers","cress","daikon","dandelion","dill","earthnutpea","enteromorpha","fiddlehead","florencefennel","galangal","gardenrocket","garlic","garlicchives","ginger","grape","greens","hamburgparsley","horseradish","jícama","kale","kohlrabi","kurrat","lambslettuce","lambsquarters","landcress","leek","lemongrass","lentil","lettuce","lotusroot","mashua","minerslettuce","mustard","nopal","nori","ogonori","onion","pakchoy","paracress","parsnip","pealeaves","peanut","pearlonion","peasprouts","pignut","plantain","potato","potatoonion","prairieturnip","pumpkin","purslane","radicchio","radish","rutabaga","salsify","scallion","scorzonera","seabeet","seagrape","seakale","sealettuce","shallot","skirret","soko","sorrel","sourcabbage","spinach","spinach","springonion","summer purslane","swede","sweetpotato","swisschard","tigernut","treeonion","turmeric","turnip","turnipgreens","ulluco","wakame","wasabi","watercaltrop","waterchestnut","watercress","waterspinach","welshonion","wheatgrass","wildleek","yam","yarrow"];
TrainingData.weapons_old = ["arbalest","armingsword","backsword","ballista","bardiche","bardiche","baselard","bastardsword","battleaxe","bill","bludgeon","boarspear","bolas","boomerang","bow","bowieknife","broadsword","bullwhip","chakram","claymore","club","compositebow","crossbow","culverin","curtana","cutlass","dagger","daggeraxe","estoc","falchion","falchion","firelance","flail","flamberge","flammard","flangedmace","gladius","glaive","greatsword","guisarme","halberd","handcannon","harpoon","hasta","hooksword","katana","kiteshield","lance","longbow","longknife","longsword","lucernehammer","mace","mancatcher","maul","militaryfork","mongolbow","morningstar","musket","partisan","pernach","pike","pitchfork","quarterstaff","ranseur","rapier","recurvebow","sabre","sabre","scimitar","shestopyor","shortsword","shuriken","sledgehammer","sling","smallsword","sovnya","spetum","stavesling","stiletto","swordstaff","throwingspear","trident","ulfberht","voulge","warhammer","warhammer","warscythe","zweihander"];
TrainingData.websites = ["adobe","alibaba","aliexpress","amazon","amazon","apple","ask","baidu","bing","bitbucket","blogger","blogspot","bongacams","chase","craigslist","digg","diply","dropbox","ebay","facebook","flipkart","github","google","google","haosou","imgur","instagram","linkedin","microsoft","naver","netflix","nicovideo","outbrain","paypal","pinterest","pixnet","rakuten","reddit","sina","slashdot","sohu","stackoverflow","taobao","tencent","tmall","tumblr","twitter","weibo","whatsapp","wikipedia","windowslive","wordpress","xvideos","yahoo","yahoo","yandex","youtube"];
TrainingData.werewolf_forenames = ["accalia","adalwolf","adalwolfa","adolpha","adolphus","amaguk","amarog","amoux","amwolf","ardolf","ardwolf","audolf","bardalph","bardolf","beowulf","biryuk","bleddyn","bledig","bleidd","bodolf","botewolf","botolf","botwolf","cana","canagan","chann","chanteloup","conall","conan","cuan","dolph","dolphus","ethelwulf","eyolf","faolan","farkas","felan","fenris","freki","fridolf","friduwulf","geirolf","guadalupe","gunnolf","honiahaka","hrolf","hrolleif","ingolf","ivaylo","landga","leidolf","leloo","lobo","loup","lowell","lupe","luperca","lupo","lupu","lupus","lyall","lykaios","maccon","maengun","maheegan","mahigan","maicoh","maiyun","makoce","mingan","mohegan","nashoba","nuntis","odolf","odwolfe","olcan","onai","phelan","radolf","raff","ralph","rand","randale","randall","randi","randolph","ranulfo","raoul","raul","rendall","reule","rezso","rodolfo","rolf","rudi","rudolph","sandalio","seff","shunkaha","singarti","sirhaan","sköll","susi","tala","tasha","tate","tchono","toralu","udolf","udolph","ujku","ulf","ulfred","ulger","ullok","ulmar","ulmer","ulric","ulvelaik","uwais","varg","velvel","vilkas","vilks","vuk","vukasin","weylyn","wolfgang","wolfram","wolfrik","woolsey","wulfgar","ylva"];
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
