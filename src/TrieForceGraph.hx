package;

import js.d3.D3;
import js.d3.layout.Layout.Force;
import js.d3.layout.Layout.LayoutLink;
import js.d3.layout.Layout.LayoutNode;
import js.d3.svg.SVG;

class TrieForceGraph {
	private var force:Force;
	private var svg:SVG;
	private var link:LayoutLink;
	private var node:LayoutNode;
	
	private var width:Int = 960;
	private var height:Int = 500;
	
	private var root:LayoutNode;
	
	public function new() {
		force = D3.layout.force().size([width, height]).on("tick", tick);
		untyped svg = D3.select("body").append("svg").attr("width", width).attr("height", height);
		
		link = untyped svg.selectAll(".link");
		node = untyped svg.selectAll(".node");
	}
	
	public function update():Void {
		var nodes = flatten(root);
		var links = D3.layout.tree().links(nodes);
		
		force.nodes(nodes).links(links).start();
		
		link = untyped link.data(links, function(d:Dynamic) {
			return d.target.id;
		});
		
		untyped link.exit().remove();
		
		untyped link.enter().insert("line", ".node").attr("class", "link")
		.attr("x1", function(d:Dynamic) { return d.source.x; })
		.attr("y1", function(d:Dynamic) { return d.source.y; })
		.attr("x2", function(d:Dynamic) { return d.target.x; })
		.attr("y2", function(d:Dynamic) { return d.target.y; } );
		
		untyped node = node.data(nodes, function(d:Dynamic) {
			return d.id;
		}).style("fill", color);
		
		untyped node.exit().remove();
		
		untyped node.enter().append("circle")
		.attr("class", "node")
		.attr("cx", function(d:Dynamic) { return d.x; })
		.attr("cy", function(d:Dynamic) { return d.y; })
		.attr("r", function(d:Dynamic) { return Math.sqrt(d.size) / 10 || 4.5; })
		.style("fill", color)
		.on("click", click)
		.call(force.drag);
	}
	
	public function flatten(root:Dynamic):Array<Dynamic> {
		var nodes = new Array<Dynamic>();
		var i = 0;
		
		var recurse = function(node:LayoutNode):Array<Dynamic> {
			if (node.children != null) {
				for (child in node.children) {
					untyped recurse(child);
				}
			}
			if (untyped node.id != 0) {
				untyped node.id = ++i;
				nodes.push(node);
			}
			
			return nodes;
		}
		
		return recurse(root);
	}
	
	public function tick():Void {
		untyped link.attr("x1", function(d:Dynamic) {
			return d.source.x;
		}).attr("y1", function(d:Dynamic) {
			return d.source.y;
		}).attr("x2", function(d:Dynamic) {
			return d.target.x;
		}).attr("y2", function(d:Dynamic) {
			return d.target.y;
		});
		
		untyped node.attr("cx", function(d:Dynamic) {
			return d.x;
		}).attr("cy", function(d:Dynamic) {
			return d.y;
		});
	}
	
	public function color(d:Dynamic):String {
		return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
	}
	
	public function click():Void {
		
	}
}