package;

import markov.util.TrainingDataBuilder;

// Automatically reads training data from files into corresponding static arrays of strings in this class
@:build(markov.util.TrainingDataBuilder.build("../embed"))
@:keep
class TrainingData {}