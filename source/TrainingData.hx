package;

import markov.util.TrainingDataBuilder;

// Automatically reads training data from files into corresponding static arrays of strings in this class
@:build(markov.util.TrainingDataBuilder.build("lib/word_lists"))
@:keep
class TrainingData {}