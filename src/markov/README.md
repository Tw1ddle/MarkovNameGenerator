# markov-namegen

Markov process string algorithm written in Haxe, designed for procedural name generation. Try the demo out [here](http://www.samcodes.co.uk/project/markov-namegen/).

## Features
* Katz backoff using "high order" models - look up to "n" characters back.
* Sort and filter generated strings by length, start, end and content.
* Damerau-Levenshtein distance sort method.
* Dirichlet prior parameter.

## Usage

See the [demo code](https://github.com/Tw1ddle/MarkovNameGenerator) for a complete worked example.

## Tips
* The generator works using Markov chains and so require training data. A hundred or more words within a category is usually sufficient for good results.
* Sort words by similarity to preferred "good words" using an edit distance metric, pick the most similar and suitable results. There are a few edit distance measures provided in EditDistanceMetrics.hx.
* To get best results the training dataset, model order and prior will need to be tweaked for the type of words you want to generate. If possible, keep the prior parameter low or zero. Filter words to suit: look at length, beginning, end, contents, edit distance limits. Some of this done for you in NameGenerator.hx. If you prefer to do it your own way, use Generator.hx.


## Notes
* Many of the concepts used for the generator were suggested in [this article](http://www.roguebasin.com/index.php?title=Names_from_a_high_order_Markov_Process_and_a_simplified_Katz_back-off_scheme) by [Jeffrey Lund](https://github.com/jlund3).
* The haxelib supports every Haxe target.
* If you have any questions or suggestions then [get in touch](http://samcodes.co.uk/contact) or open an issue.