// set the dimensions and margins of the graph
import { selection, transition } from "d3";
import scrollama from "scrollama";  
require("d3");

var scroller = scrollama();
var main = document.querySelector("main");
var scrolly = main.querySelector("#scrolly");
var sticky = scrolly.querySelector(".sticky-thing");
var article = scrolly.querySelector("article");
var steps = article.querySelectorAll(".step");
var length1=0;
var length2=0;
var length3=0;
var length4=0;
var rindex=0;
var dontset=1;

var margin = {top: 20, right: 30, bottom: 45, left: 30};
var width = 800 - margin.left - margin.right;
var height = 650 - margin.top - margin.bottom;



function resize(){
    d3.select(".sticky-thing").selectAll("*").exit().remove();
    d3.select(".sticky-thing").selectAll("svg").remove();
    buildGraph("https://gist.githubusercontent.com/apark2020/89f61375723fb6e5727abcf966b2fd55/raw/618dcf61f4d67506a83a8f8b21bd80b37971e860/endowment-data.csv");
}


function buildGraph(datalink){
    
   if(window.innerWidth<900){
    width=window.innerWidth-100;
   } 
   else{
    width=800;
   }

    // append the svg object to the body of the page
    var svg = d3.select(".sticky-thing")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    //Read the data
    d3.csv(datalink,
    function(data) {
    
        var sliced1 = data.slice(0,5);
        var sliced2 = data.slice(4,6);
        var sliced3 = data.slice(5,11);
        var sliced4 = data.slice(10,12);
    
    
        // Add X axis --> it is a date format
      var x = d3.scaleLinear()
        .domain([2011,2022])
        .range([ 0, width ]);
      svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    
        // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, 16])
        .range([ height, 0]);
      svg.append("g")
        .attr("class", "yAxis")
        .call(d3.axisLeft(y).tickValues([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]));
    
    //gridlines
    d3.selectAll("g.yAxis g.tick")
        .append("line")
        .attr("class", "gridline")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", width)
        .attr("y2", 0)
        .style("stroke","#919191")
        .style("opacity",0.4)
        .style("stroke-width",1);
    
    d3.selectAll("g.xAxis g.tick")
        .append("line")
        .attr("class", "gridline")
        .attr("x1", 0)
        .attr("y1", -height)
        .attr("x2", 0)
        .attr("y2", 0)
        .style("stroke","#919191")
        .style("opacity",0.4)
        .style("stroke-width",1);


        // Add the line
     svg.append("path")
          .datum(sliced1)
          .attr("fill", "none")
          .attr("class","first")
          .attr("stroke", "#78d3e0")
          .attr("stroke-width", 2.5)
          .attr("d", d3.line()
            //.curve(d3.curveMonotoneX)
            .x(function(d) { return x(d.year) })
            .y(function(d) { return y(d.endowment) })
            )
        
    length1 = d3.select(".sticky-thing").select("path:nth-child(3)").node().getTotalLength();
            d3.select(".first")
             .attr("stroke-dashoffset", length1)
             .attr("stroke-dasharray", length1)
       
       
    
        svg.append("path")
          .datum(sliced2)
          .attr("fill", "none")
          .attr("class","second")
          .attr("stroke", "#e31c0e")
          .attr("stroke-width", 2.5)
          .attr("d", d3.line()
            //.curve(d3.curveMonotoneX)
            .x(function(d) { return x(d.year) })
            .y(function(d) { return y(d.endowment) })
            )
        length2 = d3.select(".sticky-thing").select("path:nth-child(4)").node().getTotalLength();

        d3.select(".second")
      .attr("stroke-dashoffset", length2)
      .attr("stroke-dasharray", length2)
        
        svg.append("path")
          .datum(sliced3)
          .attr("fill", "none")
          .attr("class","third")
          .attr("stroke", "#78d3e0")
          .attr("stroke-width", 2.5)
          .attr("d", d3.line()
            //.curve(d3.curveMonotoneX)
            .x(function(d) { return x(d.year) })
            .y(function(d) { return y(d.endowment) })
            )
        length3= d3.select(".sticky-thing").select("path:nth-child(5)").node().getTotalLength();
    
        d3.select(".third")
            .attr("stroke-dashoffset", length3)
            .attr("stroke-dasharray", length3);

        svg.append("path")
            .datum(sliced4)
            .attr("fill", "none")
            .attr("class","fourth")
            .attr("stroke", "#e31c0e")
            .attr("stroke-width", 2.5)
            .attr("d", d3.line()
              //.curve(d3.curveMonotoneX)
              .x(function(d) { return x(d.year) })
              .y(function(d) { return y(d.endowment) })
            )

        length4= d3.select(".sticky-thing").select("path:nth-child(6)").node().getTotalLength();
    
        d3.select(".fourth")
                .attr("stroke-dashoffset", length4)
                .attr("stroke-dasharray", length4);

        svg.append("g")
          .selectAll("dot")
          .data(data)
          .enter()
          .append("circle")
            .attr("class", "myCircle")
            .attr("cx", function(d) { return x(d.year) } )
            .attr("cy", function(d) { return y(d.endowment) } )
            .attr("class", function(d) { return "year"+d.year } )
            .attr("r", 4)
            .attr("opacity",0)
            .attr("fill","#78d3e0");
            
        //arrow markers
        svg.append("svg:defs").selectAll("marker")
            .data(["end"])      // Different link/path types can be defined here
            .enter().append("svg:marker")    // This section adds in the arrows
            .attr("id", String)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 0)
            .attr("refY", 0)
            .attr("markerWidth", 5)
            .attr("markerHeight", 5)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5");

        //axes labels
        svg.append("text")
            .attr("class", "xlabel")
            .attr("x", x(2016))
            .attr("y", y(-1.22))
            .text("Year");

        svg.append("text")
            .attr("class", "ylabel")
            .attr("text-anchor", "end")
            .attr("x", x(2012.9))
            .attr("y", y(16.2))
            .text("Billions of dollars");

        //arrow lines
      svg.append("line")
            .attr("id","arrow1")
            .attr("x1",x(2015))
            .attr("y1",y(7.8))
            .attr("x2",x(2015.3))
            .attr("y2",y(8.9))
            .attr("stroke","black")  
            .attr("stroke-width",2) 
            .attr("marker-end", "url(#end)")
            .attr("opacity", 0);

    svg.append("line")
            .attr("id","arrow2")
            .attr("x1",x(2021.4))
            .attr("y1",y(12.4))
            .attr("x2",x(2021.4))
            .attr("y2",y(13.4))
            .attr("stroke","black")  
            .attr("stroke-width",2) 
            .attr("marker-end", "url(#end)")
            .attr("opacity", 0);

        //annotations
    svg.append("text")  
        .attr("class", "anno")
        .attr("id", "anno1")
        .attr("x", x(2014.2 ))
        .attr("y", y(7.4))
        .text("6.3% decrease")
        .attr("opacity", 0);

        svg.append("text")
            .attr("class", "anno")
            .attr("id", "anno2")
            .attr("x", x(2020.7 ))
            .attr("y", y(12.0))
            .text("7.6% decrease")
            .attr("opacity", 0);
        
      d3.selectAll(".year2016,.year2022")
      .attr("stroke","#e31c0e")
      .attr("fill","#e31c0e");
    })
  }

  function animate(name,length,dots,duration){
    d3.select(name)
    .attr("opacity",1)
    .attr("stroke-dashoffset", length)
    .attr("stroke-dasharray", length)
    .transition()
    .duration(duration)
    .attr("stroke-dashoffset", 0);
    d3.selectAll(dots)
    .transition()
    .duration(duration)
    .attr("opacity",1);
}


function wipePrev(strings,dots){
d3.selectAll(strings)
    .transition()
    .duration(100)
    .attr("opacity",0);
  
  d3.selectAll(dots)
    .transition()
    .duration(100)
    .attr("opacity",0);
  }

function handleStepEnter(response,rindex=-1){
  rindex=response.index;
  var el = response.element;
  console.log(rindex);

    if(response.index==0){
      d3.select(".year2011")
      .transition()
      .duration(100)
      .attr("opacity","1");  
    }
    if(response.index==0){
      wipePrev(".first,.second,.third,.fourth",".year2012,.year2013,.year2014,.year2015,.year2016,.year2017,.year2018,.year2019,.year2020,.year2021,.year2022");
      
    }
    if(response.index==1){
      wipePrev(".first,.second,.third,.fourth",".year2011,.year2012,.year2013,.year2014,.year2015,.year2016,.year2017,.year2018,.year2019,.year2020,.year2021,.year2022");
      animate(".first",length1,".year2011,.year2012,.year2013,.year2014,.year2015",2500);
    }
    if(response.index==2){
      wipePrev(".second,.third,.fourth",".year2016,.year2017,.year2018,.year2019,.year2020,.year2021,.year2022,#arrow1,#anno1");
      animate(".second",length2,".year2016",1000);
    }
    if(response.index==3){
      wipePrev(".third,.fourth",".year2017,.year2018,.year2019,.year2020,.year2021,.year2022");
      d3.selectAll("#arrow1,#anno1")
      .transition()
      .duration(500)
      .attr("opacity",1);
    }
    if(response.index==4){
      wipePrev(".third,.fourth",".year2017,.year2018,.year2019,.year2020,.year2021,.year2022");
      animate(".third",length3,".year2017,.year2018,.year2019,.year2020,.year2021",2500);
    }
    if(response.index==5){
      wipePrev(".fourth",".year2022,#arrow2,#anno2");
      animate(".fourth",length4,".year2022",2000);
    }
    if(response.index==6){
      d3.selectAll("#arrow2,#anno2")
      .transition()
      .duration(500)
      .attr("opacity",1);
    }
    steps.forEach(step => step.classList.remove('is-active'));
    el.classList.add('is-active');
  
}



function init() {
  buildGraph("https://gist.githubusercontent.com/apark2020/89f61375723fb6e5727abcf966b2fd55/raw/618dcf61f4d67506a83a8f8b21bd80b37971e860/endowment-data.csv");
  scroller
  .setup({
      step: "#scrolly article .step",
      offset: 0.5,
      debug: false
  })
  .onStepEnter(handleStepEnter);

  // setup resize event
  window.addEventListener("resize", scroller.resize);
  window.addEventListener("resize", resize);
}

init();



