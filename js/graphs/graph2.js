var data = [
  {name: "USA", value: 60},
  {name: "UK", value: 20},
  {name: "Canada", value: 30},
  {name: "Maxico", value: 15},
  {name: "Japan", value: 10},
];
var text = "";

var width = 200;
var height = 200;
var thickness = 40;
var duration = 750;
var padding = 10;
var opacity = .8;
var opacityHover = 1;
var otherOpacityOnHover = .8;
var tooltipMargin = 13;

var radius = Math.min(width-padding, height-padding) / 2;
var color = d3.scale.ordinal(d3.schemeCategory10);

var svg5 = d3.select(".graph2")
.append('svg')
.attr('class', 'pie')
.attr('width', width)
.attr('height', height);

var g = svg5.append('g')
.attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

var arc = d3.svg.arc()
.innerRadius(0)
.outerRadius(radius);

var pie = d3.layout.pie()
.value(function(d) { return d.value; })
.sort(null);

var path = g.selectAll('path')
  .data(pie(data))
  .enter()
  .append("g")  
  .append('path')
  .attr('d', arc)
  .attr('fill', (d,i) => color(i))
  .style('opacity', opacity)
  .style('stroke', 'white')
  .on("mouseover", function(d) {
      d3.selectAll('path')
        .style("opacity", otherOpacityOnHover);
      d3.select(this) 
        .style("opacity", opacityHover);

      let g = d3.select("svg")
        .style("cursor", "pointer")
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);
 
      g.append("text")
        .attr("class", "name-text")
        .text(`${d.data.name} (${d.data.value})`)
        .attr('text-anchor', 'middle');
    
      let text = g.select("text");
      let bbox = text.node().getBBox();
      let padding = 2;
      g.insert("rect", "text")
        .attr("x", bbox.x - padding)
        .attr("y", bbox.y - padding)
        .attr("width", bbox.width + (padding*2))
        .attr("height", bbox.height + (padding*2))
        .style("fill", "white")
        .style("opacity", 0.75);
    })
  .on("mousemove", function(d) {
        let mousePosition = d3.mouse(this);
        let x = mousePosition[0] + width/2;
        let y = mousePosition[1] + height/2 - tooltipMargin;
    
        let text = d3.select('.tooltip text');
        let bbox = text.node().getBBox();
        if(x - bbox.width/2 < 0) {
          x = bbox.width/2;
        }
        else if(width - x - bbox.width/2 < 0) {
          x = width - bbox.width/2;
        }
    
        if(y - bbox.height/2 < 0) {
          y = bbox.height + tooltipMargin * 2;
        }
        else if(height - y - bbox.height/2 < 0) {
          y = height - bbox.height/2;
        }
    
        d3.select('.tooltip')
          .style("opacity", 1)
          .attr('transform',`translate(${x}, ${y})`);
    })
  .on("mouseout", function(d) {   
      d3.select("svg")
        .style("cursor", "none")  
        .select(".tooltip").remove();
    d3.selectAll('path')
        .style("opacity", opacity);
    })
  .on("touchstart", function(d) {
      d3.select("svg")
        .style("cursor", "none");    
  })
  .each(function(d, i) { this._current = i; });
// var pie = new d3pie("graph2", {
//     "size": {
//         "canvasWidth": 590,
//         "pieOuterRadius": "90%"
//     },
//     "data": {
//         "sortOrder": "value-desc",
//         "content": [
//             {
//                 "label": "Other Guns",
//                 "value": 150,
//                 "color": "#2484c1"
//             },
//             {
//                 "label": "Rifles",
//                 "value": 50,
//                 "color": "#0c6197"
//             },
//             {
//                 "label": "Shotguns",
//                 "value": 75,
//                 "color": "#4daa4b"
//             },
//             {
//                 "label": "Handguns",
//                 "value": 400,
//                 "color": "#90c469"
//             },
//             {
//                 "label": "",
//                 "value": null,
//                 "color": "#efefef"
//             }
//         ]
//     },
//     "labels": {
//         "outer": {
//             "pieDistance": 32
//         },
//         "inner": {
//             "hideWhenLessThanPercentage": 3
//         },
//         "mainLabel": {
//             "fontSize": 11
//         },
//         "percentage": {
//             "color": "#ffffff",
//             "decimalPlaces": 0
//         },
//         "value": {
//             "color": "#adadad",
//             "fontSize": 11
//         },
//         "lines": {
//             "enabled": true
//         },
//         "truncation": {
//             "enabled": true
//         }
//     },
//     "tooltips": {
//         "enabled": true,
//         "type": "placeholder",
//         "string": "{label}: {value}, {percentage}%",
//         "styles": {
//             "fadeInSpeed": 439
//         }
//     },
//     "effects": {
//         "pullOutSegmentOnClick": {
//             "effect": "linear",
//             "speed": 400,
//             "size": 8
//         }
//     },
//     "misc": {
//         "gradient": {
//             "enabled": true,
//             "percentage": 100
//         }
//     }
// });