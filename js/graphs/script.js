var margin = {top: 40, right: 20, bottom: 30, left: 40},
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
    

var tip2 = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Number of Victims:</strong> <span style='color:red'>" + d.value + "</span>";
  })

var svg2 = d3.select(".graph5").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg2.call(tip2);

d3.csv("../Final_data.csv", function(error,d) {
  c=0
  s = [0,0,0,0,0,0]
  year =[2013,2014,2015,2016,2017,2018]
  d.dateyear = +d.dateyear
  d.total_people_infected = +d.total_people_infected
  for (i = 0;i < d.length; ++i){
    //console.log(d[i]) 
  if (d[i]['dateyear']==2013){
    s[0] = s[0] + (+d[i]['total_people_infected'])
  }
  else if(d[i]['dateyear']==2014){
    s[1] = s[1] + (+d[i]['total_people_infected'])
  }
  else if(d[i]['dateyear']==2015){
    s[2] = s[2] + (+d[i]['total_people_infected'])
  }
  else if(d[i]['dateyear']==2016){
    s[3] = s[3] + (+d[i]['total_people_infected'])
  }
  else if(d[i]['dateyear']==2017){
    s[4] = s[4] + (+d[i]['total_people_infected'])
  }
  else if(d[i]['dateyear']==2018){
    s[5] = s[5] + (+d[i]['total_people_infected'])
  }
  else{
    console.log('not a year')
  }
  }
  console.log(d[1])
  //var data =[{'year':'','value':''}]
  //for(i=0;i<s.length;i++){
  //  data[i]['year']=year[i]
  //  data[i]['value']=s[i]
  //}
  var data = [{'year':2013,'value':s[0]},{'year':2014,'value':s[1]},{'year':2015,'value':s[2]},
  {'year':2016,'value':s[3]},{'year':2017,'value':s[4]},{'year':2018,'value':s[5]}];
  
  console.log(data[1])
  x.domain(year);
  y.domain([0, 50000]);

  svg2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg2.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("No of victims");

  svg2.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.year); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .on('mouseover', tip2.show)
      .on('mouseout', tip2.hide)

  //console.log(typeof(data))
}
)