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

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Victims:</strong> <span style='color:red'>" + d.values + "</span>";
  })

var svg = d3.select(".graph4").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);
d3.csv("../Final_data.csv",function(error,d){
    d3.json("../states.json",function(state){
        d.total_people_infected = +(d.total_people_infected);
        var values = +d.total_people_infected
        var incident = d3.nest()
        .key(function (d){return d.state;})
        .rollup(function (v){return d3.max(v, function(d){return +d.total_people_infected;});})
        .entries(d);
        event={}
    console.log(incident)
    var data1 = incident.sort(function(a, b){
        return b.values - a.values;
     });
    var data2 = data1.slice(0,10)
    console.log(data2)
    states=[]
    for(i=0;i<data2.length;i++){
        states[i]=data2[i].key
    }
    x.domain(states);
    y.domain([0,120]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y",0)
        .attr("x",9)
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 1)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("No of victims");

    svg.selectAll(".bar")
        .data(data2)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.key); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.values); })
        .attr("height", function(d) { return height - y(d.values); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
    })
})

