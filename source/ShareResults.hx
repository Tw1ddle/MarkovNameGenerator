package;

import js.Browser;

using StringTools;

// The keys for reading/writing preset settings in a URL query string
// These settings keys concern the name generator parameters and result filtering
@:enum abstract GeneratorSettingKey(String) from String to String {
	var PRESET_WORD_KEY = "w";
	var RESULT_WORD_KEY = "r";
	var NAME_DATA_PRESET = "name_data_preset";
	var NUMBER_TO_GENERATE = "number_to_generate";
	var LENGTH_RANGE_MIN = "length_range_min";
	var LENGTH_RANGE_MAX = "length_range_max";
	var ORDER = "order";
	var PRIOR = "prior";
	var MAX_WORDS = "max_words";
	var MAX_PROCESSING_TIME = "max_processing_time";
	var STARTS_WITH = "starts_with";
	var ENDS_WITH = "ends_width";
	var INCLUDES = "includes";
	var EXCLUDES = "excludes";
	var SIMILAR_TO = "similar_to";
	var REGEX_MATCH = "regex_match";
}

// The data that should be saved into the custom query string
// Note, should really use bitset/flags if more options are added
enum CustomQueryStringOption {
	EVERYTHING;
	NO_TRAINING_DATA;
}

/**
 * Helper functions for sharing the generated words
 */
@:access(Main)
class ShareResults
{
	public static inline function isQueryStringEmpty():Bool {
		var params = Browser.window.location.search.substring(1);
		if (params == null || params == "") {
			return true;
		}
		return false;
	}
	
	/*
	 * Applies any custom settings encoded in the query string
	 */
	public static function applySettings(m:Main):Void {
		if (isQueryStringEmpty()) {
			return;
		}
		var params = Browser.window.location.search.substring(1);
		var splitParams = params.split("&");
		var customTrainingData = new Array<String>();
		var sharedResultData = new Array<String>();
		for (param in splitParams) {
			var kv = param.split("=");
			if (kv.length < 2) {
				continue;
			}

			var k = kv[0].urlDecode();
			var v = kv[1].urlDecode();

			switch(k) {
				case GeneratorSettingKey.RESULT_WORD_KEY:
					sharedResultData.push(v);
				case GeneratorSettingKey.PRESET_WORD_KEY:
					customTrainingData.push(v);
				case GeneratorSettingKey.LENGTH_RANGE_MIN:
					m.minLength = Std.parseInt(v);
				case GeneratorSettingKey.LENGTH_RANGE_MAX:
					m.maxLength = Std.parseInt(v);
				case GeneratorSettingKey.ORDER:
					m.order = Std.parseInt(v);
				case GeneratorSettingKey.PRIOR:
					m.prior = Std.parseFloat(v);
				case GeneratorSettingKey.MAX_WORDS:
					m.maxWordsToGenerate = Std.parseInt(v);
				case GeneratorSettingKey.MAX_PROCESSING_TIME:
					m.maxProcessingTime = Std.parseInt(v);
				case GeneratorSettingKey.STARTS_WITH:
					m.startsWith = v;
				case GeneratorSettingKey.ENDS_WITH:
					m.endsWith = v;
				case GeneratorSettingKey.INCLUDES:
					m.includes = v;
				case GeneratorSettingKey.EXCLUDES:
					m.excludes = v;
				case GeneratorSettingKey.SIMILAR_TO:
					m.similar = v;
				case GeneratorSettingKey.REGEX_MATCH:
					m.regexMatch = v;
			}
		}

		if (sharedResultData.length > 0) {
			m.setNames(sharedResultData);
		}

		if (customTrainingData.length > 3) { // Arbitrary minimum, just in case something goes a bit wrong when reading the query string
			Reflect.setField(TrainingData, "custom", customTrainingData);
			m.trainingDataKeys = [ "custom" ];
		}
	}

	/*
	 * Creates a settings query string for the current settings
	 */
	public static function makeCustomQueryString(m:Main, mode:CustomQueryStringOption):String {
		var s:String = Main.WEBSITE_URL;

		var appendKv = function(k:String, v:String, sep = "&") {
			if (k == null || k.length == 0 || v == null || v.length == 0) {
				return;
			}
			s += (sep + k.urlEncode() + "=" + v.urlEncode());
		}

		appendKv(GeneratorSettingKey.LENGTH_RANGE_MIN, Std.string(m.minLength), "?");
		appendKv(GeneratorSettingKey.LENGTH_RANGE_MAX, Std.string(m.maxLength));
		appendKv(GeneratorSettingKey.ORDER, Std.string(m.order));
		appendKv(GeneratorSettingKey.PRIOR, Std.string(m.prior));
		appendKv(GeneratorSettingKey.MAX_WORDS, Std.string(m.maxWordsToGenerate));
		appendKv(GeneratorSettingKey.MAX_PROCESSING_TIME, Std.string(m.maxProcessingTime));
		appendKv(GeneratorSettingKey.STARTS_WITH, m.startsWith);
		appendKv(GeneratorSettingKey.ENDS_WITH, m.endsWith);
		appendKv(GeneratorSettingKey.INCLUDES, m.includes);
		appendKv(GeneratorSettingKey.EXCLUDES, m.excludes);
		appendKv(GeneratorSettingKey.SIMILAR_TO, m.similar);
		appendKv(GeneratorSettingKey.REGEX_MATCH, m.regexMatch);

		if(mode != CustomQueryStringOption.NO_TRAINING_DATA) {
			var data = m.trainingDataTextEdit.value.split(" ");
			if (data.length > 1) {
				for (word in data) {
					if (word != null && word.length != 0) {
						appendKv(GeneratorSettingKey.PRESET_WORD_KEY, word);
					}
				}
			}
		}

		if(m.lastGeneratedNames.length > 0) {
			for (name in m.lastGeneratedNames) {
				if (name != null && name.length != 0) {
					appendKv(GeneratorSettingKey.RESULT_WORD_KEY, name);
				}
			}
		}

		return s;
	}
}