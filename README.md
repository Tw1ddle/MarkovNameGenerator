![Logo](https://github.com/Tw1ddle/MarkovNameGenerator/blob/master/screenshots/markovnamegen_logo.png?raw=true "Logo")(http://samcodes.co.uk/web/)

WORK IN PROGRESS

Markov process name generator webpage and demo for my Haxe markovnamegen [haxelib](http://lib.haxe.org/p/markovnamegen).

## Features ##
* Interactively configure the training dataset, order and prior parameters.
* Filter results by length, start, end and content.
* Sort results by their Damarau-Levenstein similarity to your preferred result.
* Smart trie visualization of the training dataset and generated names.

## Usage ##

Open the [demo](http://www.samcodes.co.uk/web/markov-name-generator/) in your browser to see what the library is capable of. Example settings:

```
Training Dataset: English Towns
Order: 5
Prior: 0.01
Max Processing Time: 500ms
Length: 8-11
Starts with: b
Ends with:
Include: ham
Exclude:
Similarity To: "birmingham"
```

A list of up to 100 results will be returned. Here are the top 10 from my attempt:
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

Get the Haxe library code here or on haxelib. Add it to your ```Project.xml```:
```
<haxelib name="markovnamegen" />
```

Or include it as a library in your ```hxml```
```
-lib markovnamegen
```

## Screenshots ##
Here is the demo in action:

![Screenshot](https://github.com/Tw1ddle/MarkovNameGenerator/blob/master/screenshots/screenshot1.png?raw=true "Screenshot 1")

## Notes ##
* Ideas in this project were influenced by [this article](http://www.roguebasin.com/index.php?title=Markov_chains-based_name_generation) by [Dominik Marczuk](http://www.roguebasin.com/index.php?title=User:Dominikmarczuk).
* The internal state of the generator is visualized using [d3.js](http://d3js.org/).
* The haxelib should function on every Haxe target, but it has not been tested or optimized for performance, especially on native platforms.