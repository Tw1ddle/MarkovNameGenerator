#!/bin/bash

# This batch file generates the documentation for markov namegen.

# Clean the generated documentation folder, to remove any old documentation.
rm -rf "generated_docs"

# Delete any existing generated XML-format type information.
rm -f types.xml

# Build the XML-format type information.
haxe build.hxml

# Generate the documentation.
haxelib run dox -i types.xml -theme ./themes/samcodes --title "Markov Namegen API" -D version 1.0.7 --include "(markov)" -o generated_docs