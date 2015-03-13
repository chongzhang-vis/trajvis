/*
Chong Zhang
*/

Trajectory Data Visualization

// 3/13/2015

minor edits:
1. Add selection toggle on the node-link graph
2. Add label disply onto RoseChart
3. Remove zooming out of the node-link graph


// 3/13/2015

1. Align control panel and map view side by side.
2. Change circle to rect in the node-link graph and adjust label position according to its width
3. Add zooming to the node-link graph
4. Add mouseover interaction onto the node-link graph, which provides a way to look at the link direction
5. Add Multi-select function to the node-link graph.
6. Modify map filtering

// 3/11/2015

May delay because of the way of GeoJSON reading and rendering in OpenLayers and broswer.

1. Change color definition as Xiaoke suggested.
2. Separate control panel from map view
3. Have nodelink graph, Rosechart, and detailed routes encode with same color coding 


// 3/10/2015

Basically, the more you use the faster it become.

////////////////////////////
////    Interaction     ////
////////////////////////////

1. Mouse wheel to zoom map
3. Click dot on the map to filter routes and Rosechart
4. Click top right button to go back the original map 
5. Click top buttons to change the color setting for routes and Rosechart
 

////////////////////////////
////    Customermize    ////
////////////////////////////

1. variable name for patitioned graph was set 'graphdata' (no data structure changed)
2. variable name for detailed routes was set 'routesdata' (no data structure changed)
3. Custome map/RoseChart color by changing values of colorSettings in scripts\settings.js
4. Change RoseChart inner-size/outer-size by editing values of roseSettings in scripts\settings.js
5. For better performance, we may need to store the detailed routes data in a server offering Web Map Service.