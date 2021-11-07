@:enum abstract DatasetCombinationMode(String) from String to String {
    var AppendEntireDatasets = "Append Entire Datasets"; // Append the entire datasets, one after another
    var JoinIndividualWords = "Join Individual Words"; // Joins individual words from each dataset
}