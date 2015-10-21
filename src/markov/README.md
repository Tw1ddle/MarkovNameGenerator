### Building

On Windows you should open the .hxproj in FlashDevelop, select either debug or release configuration and hit test. 

Manually invoke build using the .hxml files for other platforms.

See the demo for example usage and tips: https://github.com/Tw1ddle/MarkovNameGenerator
	
Also see the live example: http://www.samcodes.co.uk/project/markov-namegen/
	
#### Usage Suggestions

The generator works using Markov chains and so require training data. A hundred or so words in a given category is usually sufficient for good results.

To get best results the training dataset, model order and prior will need to be tweaked for the type of words you want to generate. I suggest filtering words to suit: look at length, beginning, end, contents, edit distance limits. Some of this done for you in NameGenerator.hx, but if you prefer to do it your own way, use Generator.hx.

I also recommend sorting your words by similarity to preferred "good words" using an edit distance metric, so you can pick the most similar results. There are a few basic edit distance metric algorithms provided in EditDistanceMetrics.hx.