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

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Number of guns:</strong> <span style='color:red'>" + d.value + "</span>";
  })

var svg = d3.select(".graph1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

d3.csv("../../guns.csv", function(error,d) {
  c=0
  s = [0,0,0,0,0,0,0,0,0,0]
  country =['United States','Yemen','Switzerland','Finland','Cyprus','Saudi Arabia','Iraq','Uruguay', 'Canada', 'Austria']
  d.country = +d.country
  d.no_of_guns = +d.no_of_guns
  for (i = 0;i < d.length; ++i){
    //console.log(d[i])
  if (d[i]['country']=='United States'){
    s[0] = s[0] + (+d[i]['no_of_guns'])
  }
  else if(d[i]['country']=='Yemen'){
    s[1] = s[1] + (+d[i]['no_of_guns'])
  }
  else if(d[i]['country']=='Switzerland'){
    s[2] = s[2] + (+d[i]['no_of_guns'])
  }
  else if(d[i]['country']=='Finland'){
    s[3] = s[3] + (+d[i]['no_of_guns'])
  }
  else if(d[i]['country']=='Cyprus'){
    s[4] = s[4] + (+d[i]['no_of_guns'])
  }
  else if(d[i]['country']=='Saudi Arabia'){
    s[5] = s[5] + (+d[i]['no_of_guns'])
  }
  else if(d[i]['country']=='Iraq'){
    s[6] = s[6] + (+d[i]['no_of_guns'])
  }
  else if(d[i]['country']=='Uruguay'){
    s[7] = s[7] + (+d[i]['no_of_guns'])
  }
  else if(d[i]['country']=='Canada'){
    s[8] = s[8] + (+d[i]['no_of_guns'])
  }
  else if(d[i]['country']=='Austria'){
    s[9] = s[9] + (+d[i]['no_of_guns'])
  }
  else{
    console.log('not a country')
  }
  }
  console.log(d[1])
  //var data =[{'year':'','value':''}]
  //for(i=0;i<s.length;i++){
  //  data[i]['year']=year[i]
  //  data[i]['value']=s[i]
  //}
  var data = [{'country':'United States','value':s[0]},{'country':'Yemen','value':s[1]},{'country':'Switzerland','value':s[2]},
  {'country':'Finland','value':s[3]},{'country':'Cyprus','value':s[4]},{'country':'Saudi Arabia','value':s[5]},{'country':'Iraq','value':s[6]},{'country':'Uruguay','value':s[7]},
  {'country':'Uruguay','value':s[8]},{'country':'Austria','value':s[9]}];

  console.log(data[1])
  x.domain(country);
  y.domain([0, 50000]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("No of victims");

  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.country); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

  //console.log(typeof(data))
}
)
