# markov-namegen

Markov process string algorithm written in Haxe, designed for procedural name generation. Try it out [here](http://www.samcodes.co.uk/project/markov-namegen/).

## Features
* Katz backoff using "high order" models - look up to "n" characters back.
* Sort procedurally generated strings by length, start, end and content.
* Damerau-Levenshtein distance sort method.
* Dirichlet prior parameter.

## Usage

See the [demo](https://github.com/Tw1ddle/MarkovNameGenerator) for a complete example.
	
## Tips
* The generator works using Markov chains and so require training data. A hundred or so words in a given category is usually sufficient for good results.
* Sort words by similarity to preferred "good words" using an edit distance metric, pick the most similar and suitable results. There are a few edit distance measures provided in EditDistanceMetrics.hx.
* To get best results the training dataset, model order and prior will need to be tweaked for the type of words you want to generate. Filter words to suit: look at length, beginning, end, contents, edit distance limits. Some of this done for you in NameGenerator.hx. If you prefer to do it your own way, use Generator.hx.