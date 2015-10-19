![Project logo](https://github.com/Tw1ddle/MarkovNameGenerator/blob/master/screenshots/markovnamegen_logo.png?raw=true "Project logo")

WORK IN PROGRESS

Procedural name generator demo written in Haxe. Demonstrates the [markov-namegen haxelib](http://lib.haxe.org/p/markov-namegen).

## Features ##
* Dozens of preset training datasets.
* Configurable training dataset, order and prior model parameter options.
* Filter results by length, start, end and content.
* Sort results by Damarau-Levenshtein distance to your preferred result.
* Visualization of the training dataset and generated names in a trie.

## Usage ##

Try the [demo](http://www.samcodes.co.uk/web/markov-name-generator/) in your browser to see what the library is capable of. Example settings:

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

A list of up to 100 results will be displayed. Here are the first 10 results from my run:
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

## Install ##

Get the Haxe library code here or on haxelib. 

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

![Screenshot](https://github.com/Tw1ddle/MarkovNameGenerator/blob/master/screenshots/screenshot1.png?raw=true "Screenshot 1")

## Notes ##
* Most of the concepts used for the generator were suggested in [this article](http://www.roguebasin.com/index.php?title=Names_from_a_high_order_Markov_Process_and_a_simplified_Katz_back-off_scheme) by [Jeffrey Lund](https://github.com/jlund3).
* The internal state of the generator is visualized using [d3.js](http://d3js.org/).
* The haxelib supports every Haxe target, but it has not been thoroughly tested or optimized for performance yet, especially on native platforms.
* If you have any suggestions or questions then get in touch.