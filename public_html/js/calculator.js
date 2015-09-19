/*
desc: pandemic cost transformation d3
author: vorcil
date: 19/09/2015
repo: http://github.com/vorcil/adaptiveres
*/

//select the div "calculator" and append the visualisation workspace
var body = d3.select("#calculator");
//svg workspace
var svg = body.append("svg")

var box = svg.append("rect")
    .attr("x", 50).attr("rx", 5)
    .attr("y", 50).attr("ry", 5)
    .attr("height", 100)
    .attr("width", 100)
    .attr("fill", "white").attr("stroke", "gray");

	    
