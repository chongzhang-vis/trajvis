var nodeColor = d3.scale.linear()
		    //.domain([20, 40, 60])			
		    //.range(["#008837", "#ffffbf", "#7b3294"]);
			.domain([graphdata.pagerank[0], (graphdata.pagerank[0] + graphdata.pagerank[1])/2 , graphdata.pagerank[1]])
			//.range(["#d01c8b", "#4dac26"]);
			//.range(["#00f", "#ff0", "#f00"]);
			.range(colorSettings.nodeStrokeRange)

var routeNode;

function getStyleMap (prop) {	
	var routesStyle = {
      //strokeColor: colorSettings.routeStroke,      
      strokeColor: "${getRouteColor}",      
      storkeWidth: 1
    }
  	var ol_context = {
	    getRouteColor: function(feature) {
	      var nodeObj = $.grep(graphdata.nodes, function (el, idx) { return el.id == feature.attributes.partitionID; })[0];
	      if (!nodeObj) return colorSettings.routeStroke;
	      else return nodeColor(nodeObj[prop]);        
	    }
  	};
  return new OpenLayers.StyleMap(new OpenLayers.Style(routesStyle, { context: ol_context }) );
}
function makeSepGraph(gid)	{
	var width = 1000,
		height = 700,
		padding = 20;	

    // code from Xiaoke with my edits
    var xScale = d3.scale.linear()
		.domain(graphdata.x).range([0+padding, width-padding]);

	var yScale = d3.scale.linear()
		.domain([graphdata.y[1], graphdata.y[0]]).range([20, height-padding]);

	var svg = d3.select("#" + gid).append("svg")
        .attr("width", width)
        .attr("height", height)

	graphdata.links.forEach(function(d) {
    	d.source = graphdata.nodes[d.source];
    	d.target = graphdata.nodes[d.target];
    })

	var links = svg.append("g")
        .selectAll("line")
        .data(graphdata.links)
        .enter().append("line")
        .attr("x1", function(d) { return xScale(d.source.x); })
        .attr("y1", function(d) { return yScale(d.source.y); })
        .attr("x2", function(d) { return xScale(d.target.x); })
        .attr("y2", function(d) { return yScale(d.target.y); })
        .attr("stroke", "#999")
        .attr("stroke-width", 1)
        .attr("opacity", 0.5)

	routeNode = svg.append("g")
        .selectAll("circle")
        .data(graphdata.nodes)
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("r", 10)
        .attr("cx", function(d) { return xScale(d.x) })
        .attr("cy", function(d) { return yScale(d.y) })
        .attr("fill", function(d) { return nodeColor(d["pagerank"]) })
        .attr("stroke", "#aaa")
        .attr("stroke-width", 1)
        .on("click", function(d) {
        	//console.log("node clicked");
        	updateFilter(d.id);
        })
    

	var label = svg.append("g")
            .selectAll("text")
            .data(graphdata.nodes)
            .enter()
            .append("text")            
            .attr("x", function(d) { return xScale(d.x) })
            .attr("y", function(d) { return yScale(d.y) }) 
            .attr("font-size", 25)
            .attr("fill", "#777")
            .attr("opacity", 0.5)
            .text(function(d) { return d.id })
         

}
function overlayAfteradd() {
	// Simple style
	// we can have complex style based on rule
	/*
	var featureLinksStyle = {
    	strokeColor: colorSettings.groupLinksStroke,
    	//strokeColor: 'rgba(44, 123, 182, 0.6)',    	
      	storkeWidth: 1
    }
	var featureLinksCollection = {"type": "FeatureCollection"},
		featureLinks = [];
	graphdata.links.forEach(function(d) {
    	d.source = graphdata.nodes[d.source];
    	d.target = graphdata.nodes[d.target];

    	
    	featureLinks.push({
    		"type": "Feature", 
    		"geometry": {"type": "LineString", "coordinates": [ [d.source.x, d.source.y], [d.target.x, d.target.y] ]},
        	"properties": {"sid": d.source.id, "tid": d.target.id}
        })
	});
	featureLinksCollection["features"] = featureLinks;

	var geojson_format = new OpenLayers.Format.GeoJSON({
		'internalProjection': map.baseLayer.projection,
        'externalProjection': new OpenLayers.Projection("EPSG:4326")
	});
	var linksVector_layer = new OpenLayers.Layer.Vector("GroupLinks", {style: featureLinksStyle});
	map.addLayer(linksVector_layer);
	linksVector_layer.addFeatures(geojson_format.read(featureLinksCollection));
	*/


	var overlay = new OpenLayers.Layer.Vector("PartitionedGroup");
	
	overlay.afterAdd = function() {
		var div = d3.selectAll("#" + overlay.div.id);
		div.selectAll("svg").remove();
		var svg = div.append("svg").attr("class", "graph");
		
		var g = svg.selectAll("g")
			//.data(collection.features)
			.data(graphdata.nodes)
			.enter()
			.append("g")
			.attr("class", "route");
		
		/*
		var bounds = d3.geo.bounds(collection),
			path = d3.geo.path().projection(project);
		*/
		var bounds = [[graphdata.x[0], graphdata.y[0]], [graphdata.x[1], graphdata.y[1]]],
			path = d3.geo.path().projection(project);
		
		//var centroids = {};	

		/*
		{ "type": "Feature",
		        "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
		        "properties": {"prop0": "value0"}
		        },
				
		{ "type": "Feature",
		        "geometry": {
		          "type": "LineString",
		          "coordinates": [
		            [113.81529, 22.649702], [113.81549, 22.649796]
		            ]
		          },
		        "properties": {
		      "name": "test2", "test": 42,
		          "speed": [180, 120,113,159,67,89,96,69,87,120,130,140,150,160,170,180,190,200,210,220,186,156,145,123],
		          "flow": [0.8,0.6,0.8,0.9,0.56,0.20,0.11,0.9,0.96,0.99,0.5,0.4,0.36,0.89,0.96,0.93,0.82,0.4,0.36,0.89,0.96,0.93,0.82,0.23]
		          }
		        },
		*/	
		/*
		{"closeness": 0.2920634920634921, "degree": 0.05434782608695652, "rank": [0.8, 0.6, 0.8, 0.9, 0.56, 0.2, 0.11, 0.9, 0.96, 0.99, 0.5, 0.4, 0.36, 0.89, 0.96, 0.93, 0.82, 0.4, 0.36, 0.89, 0.96, 0.93, 0.82, 0.23], "pagerank": 0.006814110659093795, "y": 22.730768, "x": 114.028605, "id": "53", "betweenness": 0.00012124693801712434}
		*/	
		/*
		var featureNode = g.append("path")									
			.attr("d", function(d){ 
				var dobj = {"type": "Feature", "properties": d, "geometry": {"type": "Point", "coordinates": [d.x, d.y]}}; 
				return path(dobj)
			})
			//.attr("class", "feature")
			.style("stroke", function(d){ return nodeColor(d.pagerank)})
			.style("stroke-width", "5px")			
			.on("click", function (d) {
				//console.log(d.id);				
				//updateFilter(d.id);
				// need prevent OL click propagation, is there a function to do it?

				//updateFilter(""); // result in blank layer

			})
		*/
		
		// @param {array},  [{"t":"1", "speed": 125, "flow": 2365}, {}, ...,{"t": 0, ...}],
		var rosemap = function (d3sel) {			
			d3sel.each(function(d) {
				var rosed = [];
				var t = d3.range(d.rank.length),
					zd = d3.zip(t, d.rank);
				for(var i = 0; i < zd.length; ++i){
					rosed.push({"t": zd[i][0], "rank": zd[i][1]});
				}
				
				var vis = roseplot(rosed, 'rose_'+d.id, roseSettings.svgwidth, roseSettings.svgheight, roseSettings.innersize, roseSettings.rosesize, roseSettings.labelpad, nodeColor(d["pagerank"]));
				vis.draw(); 				
				
			})
			
		}
		
		
			  
		var roseg = g.append("g")
			.attr("class", "roseg")
			//.attr("id", function(d) {return d.properties.name})
			.attr("id", function(d) {return 'rose_'+d.id})
		// uncomment it to draw rosegraph on map
			.call(rosemap)
		
		/*
		 Make a node-link graph on the map
		*/
		/*
		graphdata.links.forEach(function(d) {
    		d.source = graphdata.nodes[d.source];
    		d.target = graphdata.nodes[d.target];
		});


		var featureLinks = svg.append("g").attr("class", "featureLinks")
            .selectAll("line")
            .data(graphdata.links)
            .enter().append("line")
            //project(cent);
            .attr("x1", function(d) { return project([d.target.x, d.target.y])[0] })
            .attr("y1", function(d) { return project([d.target.x, d.target.y])[1] })
            .attr("x2", function(d) { return project([d.source.x, d.source.y])[0] })
            .attr("y2", function(d) { return project([d.source.x, d.source.y])[1] })
            .attr("stroke", "#999")
            .attr("stroke-width", 1)
            .attr("opacity", 0.5)
		*/

		map.events.register("moveend", map, reset);

		reset();

		$('#graphpart input[type=radio]').change(function() {
			//console.log(this.id);     
			var attr = this.id;
			nodeColor.domain([graphdata[attr][0], (graphdata[attr][0] + graphdata[attr][1])/2, graphdata[attr][1]]);
     		
     		// change nodes of group
     		routeNode.style("fill", function(d){ return nodeColor(d[attr])});
     		// change RoseChart on the map
     		d3.selectAll(".roseg").each(function(d) {
     			d3.select(this).selectAll("path").style("fill", nodeColor(d[attr]) );
     		})
     		// change detailed routes
     		routesVector_layer["styleMap"] = getStyleMap(attr);
			routesVector_layer.redraw();

  		})


		function reset() {
			//Here we can check the zoom level and decide if rosegraph to be drawn, Chong
			/*
			if (map.zoom < roseSettings.displayZoom) {
				d3.selectAll('.roseg').style('display', 'none');
			} else {
				d3.selectAll('.roseg').style('display', null);
			}
			*/

			var bottomLeft = project(bounds[0]),
				topRight = project(bounds[1]) ;

			svg.attr("width", topRight[0] - bottomLeft[0] + roseSettings.svgwidth) // + rose width
				.attr("height", bottomLeft[1] - topRight[1] + roseSettings.svgheight) // + rose height
				.style("margin-left", (bottomLeft[0] - roseSettings.svgwidth/2) + "px")
				.style("margin-top", (topRight[1] - roseSettings.svgheight/2) + "px");

			g.attr("transform", "translate(" + -(bottomLeft[0] - roseSettings.svgwidth/2) + "," + -(topRight[1] - roseSettings.svgheight/2) + ")");
			
			
			roseg.attr("transform", transform);
			
			/*roseg.style("display", function(d) {
				return d3.select(this).style("display");
			});
			*/
			/*
			featureNode.attr("d", function(d){ 
				var dobj = {"type": "Feature", "properties": d, "geometry": {"type": "Point", "coordinates": [d.x, d.y]}}; 
				return path(dobj)
			})
			*/			
            
		}
		
		// make it better? move to centroid of line?
		function transform(d) {
			//var cent = centroids[d.properties.name];
			var cent = [d.x, d.y];
			d = project(cent);
			return "translate(" + d[0] + "," + d[1] + ")";
		}

		function project(x) {
			var point = map.getViewPortPxFromLonLat(new OpenLayers.LonLat(x[0], x[1])
				.transform("EPSG:4326", "EPSG:900913"));
			return [point.x, point.y];
		}
	}
	map.addLayer(overlay);
}

function updateFilter(partID) {
	//Put the logical filter there  
    var filter = new OpenLayers.Filter.Logical({
        type: OpenLayers.Filter.Logical.OR,
        filters: [
        new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.EQUAL_TO,
            property: "partitionID",
            value: partID
        })]
    });
    filterStrategy.setFilter(filter);  

    d3.selectAll('.roseg').each(function(d) {
    	d3.select(this).style('display', d.id == partID ? 'block' : 'none');
    });
    
}

	
