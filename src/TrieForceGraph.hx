package;

import js.d3.D3;
import js.d3.layout.Layout.Force;
import js.d3.layout.Layout.LayoutLink;
import js.d3.layout.Layout.LayoutNode;
import js.d3.scale.Scale.Ordinal;
import js.d3.selection.Selection;
import js.d3.svg.SVG;
import lycan.util.PrefixTrie;

typedef Link = {
	var source:PrefixNode;
	var target:PrefixNode;
}

// Test code for a basic force graph
class TrieForceGraph {
	private var force:Force;
	private var visual:Selection;
	
	private var width:Int;
	private var height:Int;
	private var fill:Ordinal;
	
	public function new(graph:PrefixTrie, element:String, width:Int, height:Int) {
		this.width = width;
		this.height = height;
		
		fill = D3.scale.category20();
		visual = D3.select(element).append("svg:svg").attr("width", width).attr("height", height);
		
		var flattenedTrie = flattenTrie(graph);
		
		var nodes = flattenedTrie.nodes;		
		var links = flattenedTrie.links;
		
		var link = visual.selectAll(".link").data(links).enter().append("svg:line").style("stroke", "rgb(6, 120, 155)").style("marker-end", "url(#suit)");	
		var node = visual.selectAll("circle.node").data(nodes).enter().append("g").attr("cx", function(d:PrefixNode) { return d.x; } ).attr("cy", function(d:PrefixNode) { return d.y; } ).attr("r", function(d:PrefixNode) { return d.frequency; });
		node.append("text").attr("dx", 12).attr("dy", ".35em").text(function(d:PrefixNode):String { return d.letter; } ).style("fill", function(d:Dynamic) { return getColor(d); } ).on("click", function(d:Dynamic) { } );
		
		force = D3.layout.force().nodes(nodes).links(links).charge(function(node:PrefixNode) { return node.children != null ? -100 : -30; } ).linkDistance(30).size([width, height]);
		
		force.on("tick", function(e:Dynamic) {
			var ry = 50;
			var ly = 120;
			for (node in nodes) {
				if (node.parent != null) {
					node.y = node.depth * ly + ry;
				} else {
					node.y = ry;
				}
			}
			
			var k = 60 * e.alpha;
			for (link in links) {
				link.source.y -= k;
				link.target.y += k;
			}
			
			node.attr("transform", function(d:Dynamic) {
				return "translate(" + d.x + "," + d.y + ")";
			});
			
			link.attr("x1", function(d:Link) {
				return d.source.x;
			}).attr("y1", function(d:Link) {
				return d.source.y;
			}).attr("x2", function(d:Link) {
				return d.target.x;
			}).attr("y2", function(d:Link) {
				return d.target.y;
			});
		});
		
		force.start();
	}
	
	private function getColor(node:PrefixNode):String {
		switch(node.depth) {
			case 0:
				return "black";
			case 1:
				return "#111111";
			case 2:
				return "#222222";
			case 3:
				return "#333333";
			case 4:
				return "#444444";
			case 5:
				return "#555555";
			case 6:
				return "#666666";
			default:
				return "#777777";
		}
	}
	
	private static function flattenTrie(trie:PrefixTrie): { nodes:Array<PrefixNode>, links:Array<Link> } {
		var nodes = new Array<PrefixNode>();
		var links = new Array<Link>();
		var queue = new List<PrefixNode>();
		
		queue.add(trie.root);
		
		while (!queue.isEmpty()) {
			var node = queue.pop();
			
			nodes.push(node);
			
			for (child in node.children) {
				Sure.sure(child != null);
				queue.add(child);
				
				if(child.letter != null && child.letter.length != 0) {
					links.push( { source: node, target: child } );
				}
			}
		}
		
		return { nodes: nodes, links:links };
	}
}