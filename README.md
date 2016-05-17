[![Project logo](https://github.com/Tw1ddle/MarkovNameGenerator/blob/master/screenshots/markovnamegen_logo.png?raw=true "Markov Namegen Procedural Name Generator Project logo")](http://www.samcodes.co.uk/project/markov-namegen/)

**Markov Namegen** is a Markov chain-based procedural name generator written in Haxe. Try it now [in your browser](http://www.samcodes.co.uk/project/markov-namegen/).

Demonstrates the [markov-namegen haxelib](http://lib.haxe.org/p/markov-namegen).

## Features ##
* Dozens of editable training data presets.
* Configurable corpus, order and prior model parameter settings.
* Filter results by length, start, end and content.
* Sort by Damerau-Levenshtein distance to list results by similarity.
* Save and share custom data, settings and results with one click.

## Usage ##

Try the [demo](http://www.samcodes.co.uk/project/markov-namegen/) in the browser and generate your own words. For example:

```
Training Dataset: English Towns
Order: 5
Prior: 0.01
Max Processing Time: 500ms
Length: 8-12
Starts with: b
Ends with:
Include: ham
Exclude:
Similarity To: birmingham
```

A list of up to 100 results will be displayed. Here are the first 10 results from this run:
```
Barkingham
Basingham
Birkenham
Bebingham
Bollingham
Bridlingham
Billenham
Berwickham
Botteringham
Bradnincham
```

You can save or share custom training data, settings and results - simply hit one of the sharing buttons and and use the generated URL. Note that large training data sets generate URLs too long for some browsers and servers - reduce the amount of training data to work around this.

## Install ##

Get the Haxe library from [GitHub](https://github.com/Tw1ddle/MarkovNameGenerator) or through [haxelib](http://lib.haxe.org/p/markov-namegen/).

Include it in your ```.hxml```
```
-lib markov-namegen
```

Or add it to your ```Project.xml```:
```
<haxelib name="markov-namegen" />
```

## Screenshots ##
Here is the demo in action:

[![Screenshot](https://github.com/Tw1ddle/MarkovNameGenerator/blob/master/screenshots/screenshot2.png?raw=true "Name generator screenshot 2")](http://www.samcodes.co.uk/project/markov-namegen/)


[![Screenshot](https://github.com/Tw1ddle/MarkovNameGenerator/blob/master/screenshots/screenshot1.png?raw=true "Name generator screenshot 1")](http://www.samcodes.co.uk/project/markov-namegen/)

## How It Works ##

The [markov-namegen haxelib](http://lib.haxe.org/p/markov-namegen) uses [Markov chains](https://en.wikipedia.org/wiki/Markov_chain) to generate random words.

Given a set of words as [training data](https://en.wikipedia.org/wiki/Machine_learning), the library calculates the conditional probability of a letter coming up after a sequence of letters chosen so far. It looks back up to "n" characters, where "n" is the order of the model.

The generator can use several orders of models, each with memory n. Starting with the highest order models (models with bigger memories), it tries to get a new character, falling back to lower order models if necessary - this approach is known as [Katz's back-off model](https://en.wikipedia.org/wiki/Katz%27s_back-off_model).

A [Dirichlet prior](https://en.wikipedia.org/wiki/Dirichlet_distribution#Special_cases) is also used, which adds a constant probability that any letter may be picked as the next letter, which acts as an additive smoothing factor and adds a bit more "randomness" to the generated output.

Loads of words are generated, and are filtered and sorted according to several tweakable criteria like length, start and end characters, [similarity to a target word](https://en.wikipedia.org/wiki/Levenshtein_distance), and so on.

## Notes ##
* Many of the concepts used for the generator were suggested in [this article](http://www.roguebasin.com/index.php?title=Names_from_a_high_order_Markov_Process_and_a_simplified_Katz_back-off_scheme) by [Jeffrey Lund](https://github.com/jlund3).
* If you have any questions or suggestions then [get in touch](http://samcodes.co.uk/contact) or open an issue.

## License ##
The website and demo code are licensed under CC BY-NC. The [haxelib library](http://lib.haxe.org/p/markov-namegen/) itself is MIT licensed. The noUiSlider settings sliders are WTFPL. Most of the training data was compiled from sites like Wikipedia and census data sources.