package markov.util;

using markov.util.StringExtensions;

/**
 * An unoptimized prefix trie. A type of ordered tree structure for storing and organizing strings.
 * @see https://en.wikipedia.org/wiki/Trie
 */
class PrefixTrie {
    /**
     * The root node of the trie.
     */
    public var root:PrefixNode;

    /**
     * Creates a new trie with only a root node.
     */
    public function new() {
        root = new PrefixNode(null, "", 0);
    }

    /**
     * Inserts a word into the trie. For nodes that already exist, it increments a frequency count.
     * Marks the node that represents the final character in the word with the "word" flag.
     * @param   word    The word to add to the trie.
     * @return  The number of times the word exists in the trie.
     */
    public function insert(word:String):Int {
        var current = root;

        for (i in 0...word.length) {
            var ch = word.charAt(i);
            var child = findChild(current, ch);
            if (child == null) {
                child = new PrefixNode(current, ch, i);
                current.children.push(child);
            } else {
                child.frequency++;
            }
            current = child;
        }

        current.word = true;

        return current.frequency;
    }

    /**
     * Attempts to find a word in the trie.
     * If the boolean "word" flag is set on the terminal node of the word in the trie, it returns true, else it returns false.
     * @param   word    The word to find.
     * @return  True if the word was found, false if it was not.
     */
    public function find(word:String):Bool {
        var current = root;

        for (i in 0...word.length) {
            current = findChild(current, word.charAt(i));
            if (current == null) {
                return false;
            }
        }

        if (!current.word) {
            return false;
        }

        return true;
    }

    /**
     * Builds an array of all the words that have been inserted into the trie.
     * This is only appropriate for debugging or small data sets, it does really slow breadth-first search that works back up to the root every time it reconstructs a word.
     * @return  An array containing the set of the unique words that have been inserted into the trie.
     */
    public function getWords():Array<String> {
        var queue = new List<PrefixNode>();
        queue.add(root);
        var words = new Array<String>();

        while (!queue.isEmpty()) {
            var node = queue.pop();

            if (node.word) {
                var word:String = node.letter;
                var parent = node.parent;
                while (parent != null) {
                    word += parent.letter;
                    parent = parent.parent;
                }
                words.push(word.reverse());
            }

            for (child in node.children) {
                queue.add(child);
            }
        }

        return words;
    }

    /**
     * Attempts to find an immediate child node with the given letter.
     * @param   node    The node whose children will be searched.
     * @param   letter  The letter to search for.
     * @return  The child node with the matching letter, null if none is found.
     */
    private static function findChild(node:PrefixNode, letter:String):PrefixNode {
        for (child in node.children) {
            if (child.letter == letter) {
                return child;
            }
        }
        return null;
    }
}

/**
 * A node in the prefix trie.
 */
class PrefixNode {
    /**
     * The parent of the current node. Null if the node is a root node.
     */
    public var parent(default, null):PrefixNode;

    /**
     * The children of this node. Empty if there are no children, never null.
     */
    public var children(default, null):Array<PrefixNode>;

    /**
     * The letter contained in this node.
     */
    public var letter(default, null):String;

    /**
     * The depth of the node in the trie.
     */
    public var depth(default, null):UInt;

    /**
     * The number of times this node is used in the trie.
     * i.e. a trie containing the word "AS" and "AD" would have A -> 2, S -> 1, D -> 1.
     */
    public var frequency:UInt;

    /**
     * Whether this node is the end of a word.
     * This includes all the terminal nodes, but may also include intermediate nodes.
     * i.e. for "LAD" and LADS", the "D" node would be a "word" node, despite "D" not being a terminal node.
     */
    public var word:Bool;

    /**
     * Creates a new trie node.
     * @param   parent  The parent of this node. Null if the node is the root node.
     * @param   letter  The letter this node represents.
     * @param   depth   The depth of the node in the trie.
     */
    public inline function new(parent:PrefixNode, letter:String, depth:UInt) {
        Sure.sure(letter.length == 1 || (parent == null && depth == 0));

        this.parent = parent;
        children = new Array<PrefixNode>();
        this.letter = letter;
        this.depth = depth;
        frequency = 1;
        word = false;
    }
}