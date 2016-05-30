// TODO incomplete

//import haxe.macro.Context;
//
//#if macro
//import sys.FileSystem;
//import sys.io.File;
//#end
//
//import markov.util.FileReader;
//
//using StringTools;
//using Lambda;
//
//
///**
 //* Helper macros for reading training data
 //*/
//
//@:access(markov.util.FileReader)
//class TrainingDataReader {
    ///**
     //* Reads all the files in a directory and returns an array of training data at compile time.
     //* @param directoryPath   File path to the directory to be scanned.
     //* @param splitter    Regex for splitting deciding how to split the strings. Defaults to newline splitting if the splitter is null.
     //* @return    Array of string arrays expression of the split files.
     //*/
    //macro public static function readTrainingData(directoryPath:String, ?splitter:EReg):ExprOf<Array<TrainingData>> {
        //var content = loadTrainingData(directoryPath, splitter);
        //return toExpr(content);
    //}
//
    //#if macro
    //static function toExpr(v:Dynamic) {
        //return Context.makeExpr(v, Context.currentPos());
    //}
//
    //static private function loadTrainingData(directoryPath:String, ?splitter:EReg) {
        //if (splitter == null) {
            //splitter = new EReg("[\r\n]", "g");
        //}
//
        //var arrays = new Array<TrainingData>();
        //try {
            //var files = FileSystem.readDirectory(directoryPath);
            //for (file in files) {
                //var data = FileReader.loadFileAsStringArray(directoryPath + "/" + file, splitter);
                //var trainingData = new TrainingData(file, file, data);
                //arrays.push(trainingData);
            //}
            //return arrays;
        //}
        //catch (e:Dynamic) {
            //return Context.error('Failed to find directory $directoryPath: $e', Context.currentPos());
        //}
    //}
    //#end
//}