
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

var tip2 = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Count:</strong> <span style='color:red'>" + d.value + "</span>";
  })

var svg2 = d3.select(".graph5").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg2.call(tip2);

d3.csv("../../Final_data.csv", function(error,d) {
  c=0
  s = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  guntype =['Handgun', '223 Rem [AR-15]', 'Shotgun', '9mm',
  '45 Auto', '12 gauge', '7.62 [AK-47]', '40 SW', '44 Mag', 'Other',
  '38 Spl', '22 LR', '380 Auto', '32 Auto', '308 Win', 'Rifle',
  '357 Mag', '16 gauge', '30-30 Win', '410 gauge', '25 Auto',
  '20 gauge', '10mm', '30-06 Spr', '300 Win', '28 gauge']
  for (i = 0;i < d.length; ++i){
    //console.log(d[i]) 
    for (j=0;j<guntype.length;j++){
  if (d[i]['gun_type']==guntype[j]){
      s[j]=s[j]+1
            }
        }
    }
  //var data =[{'year':'','value':''}]
  //for(i=0;i<s.length;i++){
  //  data[i]['year']=year[i]
  //  data[i]['value']=s[i]
  //}
  var data = []
  for (i=0;i<s.length;i++){
      data[i] = {}
      data[i]['guntype'] = guntype[i]
      data[i]['value'] = s[i]
  }
var data1 = data.sort(function(a, b){
    return a.value - b.value;
 });
 sort_guntype=[]
 for (i=data.length-1,j=0;i>=0;i--,j++){
     sort_guntype[j] = data[i].guntype;
 }
  console.log(sort_guntype)
  console.log(data[1].guntype)
  x.domain(sort_guntype);
  y.domain([0, 18000]);

  svg2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .attr("y",0)
      .attr("x",9)
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");
  svg2.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Count");

  svg2.selectAll(".bar")
    .data(data1)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.guntype); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .on('mouseover', tip2.show)
      .on('mouseout', tip2.hide)

  //console.log(typeof(data))
}
)
