[![Markov Namegen logo](https://github.com/Tw1ddle/MarkovNameGenerator/blob/master/screenshots/markovnamegen_logo.png?raw=true "Markov Namegen Procedural Random Name Generator Project logo")](https://www.samcodes.co.uk/project/markov-namegen/)

[![Build Status Badge](https://ci.appveyor.com/api/projects/status/github/Tw1ddle/MarkovNameGenerator)](https://ci.appveyor.com/project/Tw1ddle/MarkovNameGenerator)
[![License Badge](https://licensebuttons.net/l/by-nc/4.0/80x15.png)](https://github.com/Tw1ddle/MarkovNameGenerator/blob/master/LICENSE)

Markov Namegen is a Markov chain-based procedural name generator [library](https://github.com/Tw1ddle/markov-namegen-lib) and [demo website](https://www.samcodes.co.uk/project/markov-namegen/) written in Haxe.

Run the demo [in your browser](https://www.samcodes.co.uk/project/markov-namegen/). It demonstrates the [markov-namegen](https://github.com/Tw1ddle/markov-namegen-lib) [haxelib](https://lib.haxe.org/p/markov-namegen). Read the library docs [here](https://tw1ddle.github.io/markov-namegen-lib/).

## Features
* Hundreds of customizable/combinable training data presets.
* Configurable corpus, order and prior model parameter settings.
* Filter results by length, start, end, content and regex match.
* Sort by Damerau-Levenshtein distance to list results by similarity.
* Save and share custom data, settings and results with one click.

## Usage

Run the [demo](https://www.samcodes.co.uk/project/markov-namegen/) to generate your own words. Press the "Generate" button to begin, or select "Settings" to configure advanced options.

For example, enter the settings:

```
Training Dataset: English Towns
Order: 5
Backoff: 1 (on)
Length: 8-12
Starts with: b
Include: ham
Similarity To: birmingham
```

Click the "Generate" button and the results will be displayed on the page. Here are my first 10 results when using the settings above:
```
Barkingham Basingham Birkenham Bebingham Bollingham Bridlingham Billenham Berwickham Botteringham Bradnincham
```

## Screenshots
Here is the demo in action. Using a single data set:

[![Screenshot](https://github.com/Tw1ddle/MarkovNameGenerator/blob/master/screenshots/screenshot2.png?raw=true "Markov Namegen Procedural Random Name Generator screenshot 2")](https://www.samcodes.co.uk/project/markov-namegen/)

Appending two presets:

[![Screenshot](https://github.com/Tw1ddle/MarkovNameGenerator/blob/master/screenshots/screenshot4.png?raw=true "Markov Namegen Procedural Random Name Generator screenshot 4")](https://www.samcodes.co.uk/project/markov-namegen/)

Joining the individual words from two presets:

[![Screenshot](https://github.com/Tw1ddle/MarkovNameGenerator/blob/master/screenshots/screenshot5.png?raw=true "Markov Namegen Procedural Random Name Generator screenshot 5")](https://www.samcodes.co.uk/project/markov-namegen/)

## Demo Setup

To run the [demo](https://www.samcodes.co.uk/project/markov-namegen/) locally, clone the repository and run the following in your console within the root folder of the repository:

```
haxe MarkovNames.hxml
```

Then navigate to the [bin](https://github.com/Tw1ddle/MarkovNameGenerator/tree/master/bin) directory and open [index.html](https://github.com/Tw1ddle/MarkovNameGenerator/blob/master/bin/index.html) in a web browser to use the name generator.

## Notes
* Many of the concepts used for the generator were suggested in [this article](http://www.roguebasin.com/index.php?title=Names_from_a_high_order_Markov_Process_and_a_simplified_Katz_back-off_scheme) by Jeffrey Lund.
* If you have any questions or suggestions then [get in touch](https://twitter.com/Sam_Twidale) or open an issue.
* The embedded word lists are included in the name generator library [repository](https://github.com/Tw1ddle/markov-namegen-lib/tree/master/word_lists).
* Read the [documentation](https://tw1ddle.github.io/markov-namegen-lib/).

## License
* The [haxelib](https://github.com/Tw1ddle/markov-namegen-lib/) code is provided under the MIT license.
* The website and demo code are licensed under CC BY-NC.
* The noUiSlider settings sliders are WTFPL.