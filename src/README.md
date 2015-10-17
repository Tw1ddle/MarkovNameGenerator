### Building

For Windows, open the .hxproj in FlashDevelop, select either debug or release configuration and hit test. 

Manually invoke build using the .hxml files for other platforms.

### Notes

Running locally in the browser requires the [same origin policy to be disabled](http://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome) so that image assets can be loaded.

Debug builds include the debugger UI that slows things down a lot and breaks IE.