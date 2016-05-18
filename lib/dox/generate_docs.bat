rem This batch file generates the documentation for markov namegen.

rem Clean the generated documentation folder, to remove any old documentation.
rd /s /q "generated_docs"

rem Delete any existing generated XML-format type information.
del types.xml

rem Build the XML-format type information.
haxe build.hxml

rem Copy the documentation site theme resources to the destination folder (overwrites any existing folder content).
robocopy /s /e ./themes/samcodes/ ./generated_docs /mir

rem Generate the documentation.
haxelib run dox -i types.xml -theme ./themes/samcodes --title "Markov Namegen API" -D version 1.0.0 --include "(markov)" -o generated_docs