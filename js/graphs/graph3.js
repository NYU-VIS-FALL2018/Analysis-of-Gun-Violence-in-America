d3.csv("../Final_data.csv", function(error,d) {
d3.json("../states.json", function(state) {
    //console.log(state[0]);
    //console.log(d[0])
    d.total_people_infected = +d.total_people_infected
    var total_infected_by_state = d3.nest()
      .key(function (d){return d.state;})
      .rollup(function (v){return d3.sum(v, function(d){return d.total_people_infected;});})
      .entries(d);
    //console.log(JSON.stringify(total_infected_by_state))
    //console.log(total_infected_by_state[1].key)
    for (i=0;i<total_infected_by_state.length;i++){
        for (j=0;j<state.length;j++){
            if((total_infected_by_state[i].key).toLowerCase() == (state[j].name).toLowerCase()){
                total_infected_by_state[i].key = state[j].abbreviation
            }
        }
    }
    //console.log(total_infected_by_state)
    //console.log(total_infected_by_state.PA)
    var data1 ={}
    for (var i = 0; i < total_infected_by_state.length; i++) {
      var datum = total_infected_by_state[i];
      data1[datum.key] = {};
      data1[datum.key]["values"] = datum.values;
      if (datum.values > 15000){
        data1[datum.key]["fillKey"] = 'Heavy Republican';
      }
      else if (datum.values < 15000 && datum.values > 8000){
      data1[datum.key]["fillKey"] = 'Light Republican';
      }
      else if (datum.values < 8000 && datum.values > 2000){
        data1[datum.key]["fillKey"] = 'Light Democrat';
        }
    else if (datum.values < 2000 && datum.values > 1000){
        data1[datum.key]["fillKey"] = 'Heavy Democrat';
        }
      else {
        data1[datum.key]["fillKey"] = 'Democrat';
      }
      }
    console.log(data1)
    var election = new Datamap({
        scope: "usa",
        element: document.getElementById('graph3'),
        geographyConfig: {
          highlightBorderColor: '#bada55',
         popupTemplate: function(geography, data1) {
            //console.log(data)
            //console.log(data1)
            return '<div class="hoverinfo">' + geography.properties.name + ' Victims:' +  data1.values + ' '
          },
          highlightBorderWidth: 3
        },
      
        fills: {
        'Republican': '#CC4731',
        'Democrat': '#306596',
        'Heavy Democrat': '#667FAF',
        'Light Democrat': '#A9C0DE',
        'Heavy Republican': '#CA5E5B',
        'Light Republican': '#EAA9A8',
        defaultFill: '#EDDC4E'
      },data:data1
        });
        election.labels();
  });
  }
  )