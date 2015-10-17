package;

import js.Browser;
import motion.easing.*;

import lycan.util.EditDistanceMetrics;
import lycan.util.namegen.NameGenerator;
import lycan.util.namegen.Names;
import lycan.util.namegen.Generator;
import lycan.util.namegen.Model;
import lycan.util.FileReader;
import js.d3.D3;

class Main {
	private static inline var REPO_URL:String = "https://github.com/Tw1ddle/MarkovNameGenerator";
	private static inline var TWITTER_URL:String = "https://twitter.com/Sam_Twidale";
	private static inline var WEBSITE_URL:String = "http://samcodes.co.uk/";
	private static inline var HAXE_URL:String = "http://haxe.org/";
	
    private static function main():Void {
		var main = new Main();
	}
	
	private inline function new() {
		Browser.window.onload = onWindowLoaded;
	}
	
	private inline function onWindowLoaded():Void {
		// Event setup
		// Window resize event
		Browser.document.addEventListener('resize', function(event) {
			
		}, false);
		
		// Disable context menu opening
		Browser.document.addEventListener('contextmenu', function(event) {
			event.preventDefault();
		}, true);
	}
}