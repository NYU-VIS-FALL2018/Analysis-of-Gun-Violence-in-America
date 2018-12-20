var margin = {top: 40, right: 20, bottom: 100, left: 40},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

//var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    
    //.tickFormat(formatPercent);

var tip3 = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>No of guns:</strong> <span style='color:red'>" + d.values + "</span>";
  })

var svg3 = d3.select(".graph2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg3.call(tip3);
d3.csv("../Final_data.csv",function(error,d){
    d3.json("states.json",function(state){
        d.no_of_guns_involved = +d.no_of_guns_involved

        var gun_state = d3.nest()
        .key(function (d){return d.state;})
        .rollup(function (v){return d3.sum(v, function(d){return d.no_of_guns_involved;});})
        .entries(d);
    var data1 = gun_state.sort(function(a, b){
        return b.values - a.values;
     });

    states=[]
    for(i=0;i<data1.length;i++){
        states[i]=data1[i].key
    }
    x.domain(states);
    y.domain([0, 18000]);

    svg3.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y",0)
        .attr("x",9)
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");
    svg3.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("No of guns");

    svg3.selectAll(".bar")
        .data(data1)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.key); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.values); })
        .attr("height", function(d) { return height - y(d.values); })
        .on('mouseover', tip3.show)
        .on('mouseout', tip3.hide)
    })
})

