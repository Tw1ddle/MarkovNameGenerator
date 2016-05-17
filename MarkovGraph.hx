package;

// Unused, could be used with d3.js to draw a force graph of a Markov model

/*
import js.d3.D3;
import js.d3.layout.Layout.Force;
import js.d3.layout.Layout.LayoutLink;
import js.d3.layout.Layout.LayoutNode;
import js.d3.scale.Scale.Ordinal;
import js.d3.selection.Selection;
import js.d3.svg.SVG;
import lycan.namegen.Model;
import lycan.namegen.NameGenerator;
import lycan.util.PrefixTrie;

using StringTools;
using lycan.util.StringExtensions;

typedef MarkovNode = {
	var x:Float;
	var y:Float;
	var symbol:String;
}

typedef MarkovLink = {
	var source:MarkovNode;
	var target:MarkovNode;
	var p:Float;
}

@:access(lycan.namegen.NameGenerator)
@:access(lycan.namegen.Model)
class MarkovGraph {
	private var force:Force;
	private var visual:Selection;
	
	private var width:Int;
	private var height:Int;
	private var fill:Ordinal;
	
	public function new(generator:NameGenerator, order:Int, element:String, width:Int, height:Int, minP:Float) {
		var model:Model = null;
		for (m in generator.models) {
			if (m.order == order) {
				model = m;
				break;
			}
		}
		if (model == null) {
			throw "Bad model order";
		}
		
		this.width = width;
		this.height = height;
		
		fill = D3.scale.category20();
		
		D3.select("svg").remove();
		visual = D3.select(element).append("svg:svg").attr("width", width).attr("height", height);
		
		var nodes = new Array<MarkovNode>();
		var links = new Array<MarkovLink>();
		
		for (symbol in model.domain) {
			nodes.push( { x:0, y:0, symbol:symbol } );
		}
		
		for (node in nodes) {
			var chain = model.chains.get(node.symbol);
			//trace(model.chains.keys());
			if (chain != null) {
				Sure.sure(chain.length == model.domain.length);
				for (i in 0...model.domain.length) {
					var p:Float = chain[i];
					if(p >= minP) {
						links.push( { source: node, target: nodes[i], p: p } );
					}
				}
			}
		}
		
		var link = visual.selectAll(".link").data(links).enter().append("svg:line").style("stroke", "rgb(6, 120, 155)");
		var node = visual.selectAll("circle.node").data(nodes).enter().append("g").attr("cx", function(d:MarkovNode) { return d.x; } ).attr("cy", function(d:MarkovNode) { return d.y; } );
		node.append("text").attr("dx", 12).attr("dy", ".35em").text(function(d:MarkovNode):String { return d.symbol.replace("#", ""); } );
		
		force = D3.layout.force().nodes(nodes).links(links).charge(-100).linkDistance(400).size([width, height]);
		
		force.on("tick", function(e:Dynamic) {			
			node.attr("transform", function(d:Dynamic) {
				return "translate(" + d.x + "," + d.y + ")";
			});
			
			link.attr("x1", function(d:MarkovLink) {
				return d.source.x;
			}).attr("y1", function(d:MarkovLink) {
				return d.source.y;
			}).attr("x2", function(d:MarkovLink) {
				return d.target.x;
			}).attr("y2", function(d:MarkovLink) {
				return d.target.y;
			});
		});
		
		force.start();
	}
}
*/