![Project logo](https://github.com/Tw1ddle/MarkovNameGenerator/blob/master/screenshots/markovnamegen_logo.png?raw=true "Markov Namegen Procedural Name Generator Project logo")

Procedural name generator written in Haxe. Demonstrates the [markov-namegen haxelib](http://lib.haxe.org/p/markov-namegen).

Try it out now [in your browser](http://www.samcodes.co.uk/project/markov-namegen/).

## Features ##
* Dozens of editable training data presets.
* Configurable corpus, order and prior model parameter settings.
* Filter results by length, start, end and content.
* Sort by Damerau-Levenshtein distance to list your results by similarity.

## Usage ##

Try the [demo](http://www.samcodes.co.uk/project/markov-namegen/) in your browser and generate your own words. Example settings:

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

You can also set custom training data through the URL query string, for example: [emotions](http://www.samcodes.co.uk/project/markov-namegen/?w=joyfulness&w=tenderness&w=helplessness&w=rageful&w=cheerfulness&w=sympathy&w=powerlessness&w=boredness&w=outraged&w=adoration&w=dreading&w=rejected&w=hostile&w=proudness&w=fondness&w=distrusting&w=disillusioned&w=bitterness&w=satisfied&w=receptive&w=suspicious&w=inferior&w=hatefulness&w=excited&w=interested&w=cautiousness&w=confused&w=scornful&w=amused&w=delighted&w=disturbed&w=griefstricken&w=spitefulness&w=elated&w=shocked&w=overwhelmed&w=vengefulness&w=enthusia) or [metasyntactic variables](http://www.samcodes.co.uk/project/markov-namegen/?w=foo&w=bar&w=baz&w=quux&w=quuux&w=quuuux&w=bazola&w=ztesch&w=thud&w=grunt&w=fred&w=jim&w=wombat&w=spam&w=eggs&w=snork&w=zot&w=blarg&w=wibble&w=zork&w=oogle&w=foogle&w=boogle&w=gork&w=bork&w=bongo&w=corge).

## Install ##

Get the Haxe library code here or through haxelib. 

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

![Screenshot](https://github.com/Tw1ddle/MarkovNameGenerator/blob/master/screenshots/screenshot2.png?raw=true "Name generator screenshot 2")

![Screenshot](https://github.com/Tw1ddle/MarkovNameGenerator/blob/master/screenshots/screenshot1.png?raw=true "Name generator screenshot 1")

## How It Works ##

The [markov-namegen haxelib](http://lib.haxe.org/p/markov-namegen) uses [Markov chains](https://en.wikipedia.org/wiki/Markov_chain) to generate random words. 

Given a set of words as [training data](https://en.wikipedia.org/wiki/Machine_learning), the library calculates the conditional probability of a letter coming up after a sequence of letters chosen so far. It looks back up to "n" characters, where "n" is the order of the model.

The generator can use several orders of models, each with memory n. Starting with the highest order models (models with bigger memories), it tries to get a new character, falling back to lower order models if necessary - this approach is known as [Katz's back-off model](https://en.wikipedia.org/wiki/Katz%27s_back-off_model).

A [Dirichlet prior](https://en.wikipedia.org/wiki/Dirichlet_distribution#Special_cases) is also used, which adds a constant probability that any letter may be picked as the next letter, which acts as an additive smoothing factor and adds a bit more "randomness" to the generated output.

Loads of words are generated, and are filtered and sorted according to several tweakable criteria like length, start and end characters, [similarity to a target word](https://en.wikipedia.org/wiki/Levenshtein_distance), and so on.

## Notes ##
* Many of the concepts used for the generator were suggested in [this article](http://www.roguebasin.com/index.php?title=Names_from_a_high_order_Markov_Process_and_a_simplified_Katz_back-off_scheme) by [Jeffrey Lund](https://github.com/jlund3).
* The haxelib supports every Haxe target, but it has not been thoroughly tested or optimized for performance yet, especially on native platforms.
* If you have any questions or suggestions then [get in touch](http://samcodes.co.uk/contact).

## License ##
The website and demo code are licensed under CC BY-NC. The haxelib library itself is MIT licensed. The noUiSlider settings sliders are WTFPL. Most of the training data was compiled from sites like Wikipedia and census data sources.