package lycan.util;

using lycan.util.StringExtensions;

// Unoptimized prefix trie
class PrefixTrie {
	public var root:PrefixNode;
	
	public function new() {
		root = new PrefixNode(" ", null);
	}
	
	public function insert(word:String):Void {
		var current = root;
		
		for (i in 0...word.length) {
			var child = findChild(current, word.charAt(i));
			
			if (child == null) {
				child = new PrefixNode(word.charAt(i), current);
				current.children.push(child);
			} else {
				child.frequency++;
			}
			
			current = child;
		}
		current.word = true;
	}
	
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
	
	// Note does linear lookup through unsorted children, it's simple and uses little memory but is really slow
	private static function findChild(node:PrefixNode, letter:String):PrefixNode {		
		var ret:PrefixNode = null;
		for (child in node.children) {
			if (child.letter == letter) {
				ret = child;
				break;
			}
		}
		return ret;
	}
	
	// Gets all the words that have been inserted into the trie
	// NOTE use this for debugging only, it does really slow BFS that returns up to the root every time to build the words
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
}

class PrefixNode {
	public var parent:PrefixNode;
	public var children:Array<PrefixNode>;
	public var letter:String;
	public var frequency:Int;
	public var word:Bool;
	
	public inline function new(letter:String, parent:PrefixNode) {
		Sure.sure(letter.length == 1);
		this.parent = parent;
		children = new Array<PrefixNode>();
		this.letter = letter;
		frequency = 1;
		word = false;
	}
}