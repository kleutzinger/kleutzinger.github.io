numbers = [4, 8, 15, 16, 23, 12,4, 8, 15, 16, 23, 12,4, 8, 15, 13, 4, 5]
chartHeight = 298
 
chart = d3.select("#canvas-barchart1")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

chart.selectAll("rect").data(numbers).enter()
    .append("rect")
    .attr("y", (d, i) -> chartHeight - (d * 10))
    .attr("x", (d, i) -> (i * 20))
    .attr("width", 20)
    .attr("height", (d) -> d * 10);
