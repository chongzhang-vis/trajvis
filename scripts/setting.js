if( typeof(mapSettings) == "undefined") {
   mapSettings = {};
}
mapSettings.getPositionMapByExtents = function() {
   return false;  // must also define center and zoom
}; 

mapSettings.getCenterLon = function() {
   return 114.006451;
};

mapSettings.getCenterLat = function() {
   return 22.619696;
};

mapSettings.getZoomLevel = function() {
   return 12;
};

/*
MapColor and RoseChart settings
@author Chong
*/
var colorSettings = {
	  groupLinksStroke: '#7fc97f' // kinda Green
	, nodeStrokeRange:  ["#3288bd", "#e6f598", "#f00"] // blue, yellow, red //"#00f", "#ff0", "#f00"
	, routeStroke: 'rgba(238, 153, 0, 0.5)' // kinda Yellow 
	, roseArcFill: "#58e" // kinda Blue
};

var roseSettings = {
	  displayZoom: 12
	, svgwidth: 150
	, svgheight: 150
	, innersize: 10
	, rosesize: 30
	, labelpad: 5
	, arcstroke: 'black'
};

var trafficColor = {
	  flow: [0, 200, 400] //0 200 400
	, speed: [80, 20, 0] //80 20 0
	, travelTime: [0, 1, 2] //0 2.5 5
};

var nodelinkgraph = {
	  nodeshadow: 12
	, textfontsize: 12
	, outline_rect_w: 16
	, outline_rect_h: 16
}

// only used for allday.html
var roadnetwork = {
	  colorRange:  ["#3288bd", "#e6f598", "#ff0000"] // blue, yellow, red
	, pagerank: [0, .00005, .0002]
	, betweenness: [0, .00005, .0007]
	, closeness: [0, .04, .08]
	
}