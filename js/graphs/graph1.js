var margin1 = {top: 40, right: 20, bottom: 30, left: 40},
    width1 = 960 - margin1.left - margin1.right,
    height1 = 500 - margin1.top - margin1.bottom;

//var formatPercent = d3.format(".0%");

var x1 = d3.scale.ordinal()
    .rangeRoundBands([0, width1], .1);

var y1 = d3.scale.linear()
    .range([height1, 0]);

var xAxis1 = d3.svg.axis()
    .scale(x1)
    .orient("bottom");

var yAxis1 = d3.svg.axis()
    .scale(y1)
    .orient("left")

var tip1 = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Number of guns:</strong> <span style='color:red'>" + d.value + "</span>";
  })

var svg1 = d3.select(".graph1").append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
  .append("g")
    .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

svg1.call(tip1);

d3.csv("../guns.csv", function(error,d) {
  c=0
  s = [0,0,0,0,0,0,0,0,0,0]
  country =['United States','Yemen','Switzerland','Finland','Cyprus','Saudi Arabia','Iraq','Uruguay', 'Canada', 'Austria']
  d.country = +d.country
  d.no_of_guns = +d.no_of_guns
  for (i = 0;i < d.length; ++i){
    // console.log(d[i])
  if (d[i]['country']=='United States'){
    s[0] = s[0] + (+d[i]['no_of_guns'])
    // console.log(d[i]['no_of_guns'])
  }
  else if(d[i]['country']=='Yemen'){
    s[1] = s[1] + (+d[i]['no_of_guns'])
  }
  else if(d[i]['country']=='Switzerland '){
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
  //   console.log(s)
  // console.log(d[1])
  var data1 = [{'country':'United States','value':s[0]},{'country':'Yemen','value':s[1]},{'country':'Switzerland','value':s[2]},
  {'country':'Finland','value':s[3]},{'country':'Cyprus','value':s[4]},{'country':'Saudi Arabia','value':s[5]},{'country':'Iraq','value':s[6]},{'country':'Uruguay','value':s[7]},
  {'country':'Canada','value':s[8]},{'country':'Austria','value':s[9]}];

  console.log(data1[1])
  x1.domain(country);
  y1.domain([0, 100]);

  svg1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height1 + ")")
      .call(xAxis1);

  svg1.append("g")
      .attr("class", "y axis")
      .call(yAxis1)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("No of guns");

  svg1.selectAll(".bar")
    .data(data1)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x1(d.country); })
      .attr("width", x1.rangeBand())
      .attr("y", function(d) { return y1(d.value); })
      .attr("height", function(d) { return height1 - y1(d.value); })
      .on('mouseover', tip1.show)
      .on('mouseout', tip1.hide)

  //console.log(typeof(data))
}
)
