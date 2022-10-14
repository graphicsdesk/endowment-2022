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
var lengthH= 0;
var lengthPe= 0;
var lengthY= 0;
var lengthPr= 0;
var lengthB= 0;
var lengthD= 0;
var lengthCor= 0;
var x=0;
var y=0;
var zoom = 0;
var svg=0;
var xAxis=0;
var yAxis=0;

var margin = {top: 20, right: 30, bottom: 45, left: 30};
var schoolnames = {0:"Columbia",1:"Harvard",2:"Penn",3:"Cornell",4:"Dartmouth",5:"Princeton",6:"Yale",7:"Brown"};
var schoolcolor = {Columbia:"#78d3e0",Harvard:"#A41034",Penn:"#011F5B",Cornell:"#B31B1B",Dartmouth:"#046A38",Princeton:"#FF671F",Yale:"#00356B",Brown:"#4E3629"};
var width = 800 - margin.left - margin.right;
var height = 650 - margin.top - margin.bottom;



function resize(){
    d3.select(".sticky-thing").selectAll("*").exit().remove();
    d3.select(".sticky-thing").selectAll("svg").remove();
    buildGraph("https://gist.githubusercontent.com/apark2020/1b6afd4d910b0e2f1afca4fb5af216c1/raw/2edf813b9e92e0424a1a234de6455a794ba17447/endowment-all-schools.csv");
}


function buildGraph(datalink){
    
   if(window.innerWidth<900){
    width=window.innerWidth-100;
   } 
   else{
    width=800;
   }

   
    // append the svg object to the body of the page
   svg=d3.select(".sticky-thing")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    
        // Add X axis --> it is a date format
      x = d3.scaleLinear()
        .domain([2011,2022])
        .range([ 0, width ]);
      xAxis=svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    
        // Add Y axis
      y = d3.scaleLinear()
        .domain([0, 55])
        .range([ height, 0]);
      yAxis=svg.append("g")
        .attr("class", "yAxis")
        .call(d3.axisLeft(y).tickValues([5,10,15,20,25,30,35,40,45,50,55]));
      
      
      
      

      buildRest(datalink);
    }

function buildRest(datalink){
  console.log("built");
  d3.csv(datalink,
    function(data) {

    var sliced1 = data.slice(0,5);
    var sliced2 = data.slice(4,6);
    var sliced3 = data.slice(5,11);
    var sliced4 = data.slice(10,12);
    var harvard = data.slice(12,23);
    var yale = data.slice(23,35);
    var princeton = data.slice(35,46);
    var penn = data.slice(46,58);
    var dartmouth = data.slice(58,70);
    var brown = data.slice(70,81);
    var cornell = data.slice(81,93);
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
          .attr("stroke", schoolcolor.Columbia)
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
          .attr("stroke", schoolcolor.Columbia)
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
      //dots
        svg.append("g")
          .selectAll("dot")
          .data(data)
          .enter()
          .append("circle")
            .attr("id", function(d){"circle"+d.school})
            .attr("cx", function(d) { return x(d.year) } )
            .attr("cy", function(d) { return y(d.endowment) } )
            .attr("class", function(d) { return "circle"+d.school } )
            .attr("id",function(d) {return "circle"+d.school+d.year})
            .attr("r", 4)
            .attr("opacity",function(d){if(d.school=="Columbia"){return 0;}return 1;})
            .attr("fill",function(d){return schoolcolor[d.school]})
            .attr("opacity",0);
      
            
        //other schools
        svg.append("path")
          .datum(harvard)
          .attr("fill", "none")
          .attr("class","harvard")
          .attr("stroke", schoolcolor.Harvard)
          .attr("stroke-width", 2.5)
          .attr("d", d3.line()
            //.curve(d3.curveMonotoneX)
            .x(function(d) { return x(d.year) })
            .y(function(d) { return y(d.endowment) })
            )
          .attr("opacity",1);

        svg.append("path")
            .datum(yale)
            .attr("fill", "none")
            .attr("class","yale")
            .attr("stroke", schoolcolor.Yale)
            .attr("stroke-width", 2.5)
            .attr("d", d3.line()
              //.curve(d3.curveMonotoneX)
              .x(function(d) { return x(d.year) })
              .y(function(d) { return y(d.endowment) })
              )
            .attr("opacity",1);

        svg.append("path")
          .datum(princeton)
          .attr("fill", "none")
          .attr("class","princeton")
          .attr("stroke", schoolcolor.Princeton)
          .attr("stroke-width", 2.5)
          .attr("d", d3.line()
            //.curve(d3.curveMonotoneX)
            .x(function(d) { return x(d.year) })
            .y(function(d) { return y(d.endowment) })
            )
          .attr("opacity",1);

        svg.append("path")
            .datum(brown)
            .attr("fill", "none")
            .attr("class","brown")
            .attr("stroke", schoolcolor.Brown)
            .attr("stroke-width", 2.5)
            .attr("d", d3.line()
              //.curve(d3.curveMonotoneX)
              .x(function(d) { return x(d.year) })
              .y(function(d) { return y(d.endowment) })
              )
            .attr("opacity",1);

          svg.append("path")
            .datum(penn)
            .attr("fill", "none")
            .attr("class","penn")
            .attr("stroke", schoolcolor.Penn)
            .attr("stroke-width", 2.5)
            .attr("d", d3.line()
              //.curve(d3.curveMonotoneX)
              .x(function(d) { return x(d.year) })
              .y(function(d) { return y(d.endowment) })
              )
            .attr("opacity",1);

          svg.append("path")
              .datum(dartmouth)
              .attr("fill", "none")
              .attr("class","dartmouth")
              .attr("stroke", schoolcolor.Dartmouth)
              .attr("stroke-width", 2.5)
              .attr("d", d3.line()
                //.curve(d3.curveMonotoneX)
                .x(function(d) { return x(d.year) })
                .y(function(d) { return y(d.endowment) })
                )
              .attr("opacity",1);

            svg.append("path")
                .datum(cornell)
                .attr("fill", "none")
                .attr("class","cornell")
                .attr("stroke", schoolcolor.Cornell)
                .attr("stroke-width", 2.5)
                .attr("d", d3.line()
                  //.curve(d3.curveMonotoneX)
                  .x(function(d) { return x(d.year) })
                  .y(function(d) { return y(d.endowment) })
                  )
                  .attr("opacity",1);

        lengthH= d3.select(".sticky-thing").select(".harvard").node().getTotalLength();
        lengthPe= d3.select(".sticky-thing").select(".penn").node().getTotalLength();
        lengthY= d3.select(".sticky-thing").select(".yale").node().getTotalLength();
        lengthCor= d3.select(".sticky-thing").select(".cornell").node().getTotalLength();
        lengthPr= d3.select(".sticky-thing").select(".princeton").node().getTotalLength();
        lengthB= d3.select(".sticky-thing").select(".brown").node().getTotalLength();
        lengthD= d3.select(".sticky-thing").select(".dartmouth").node().getTotalLength();
        d3.select(".harvard")
                .attr("stroke-dashoffset", lengthH)
                .attr("stroke-dasharray", lengthH);
        d3.select(".yale")
                .attr("stroke-dashoffset", lengthY)
                .attr("stroke-dasharray", lengthY);
        d3.select(".princeton")
                .attr("stroke-dashoffset", lengthPr)
                .attr("stroke-dasharray", lengthPr);
        d3.select(".penn")
                .attr("stroke-dashoffset", lengthPe)
                .attr("stroke-dasharray", lengthPe);
        d3.select(".dartmouth")
                .attr("stroke-dashoffset", lengthD)
                .attr("stroke-dasharray", lengthD);
        d3.select(".cornell")
                .attr("stroke-dashoffset", lengthCor)
                .attr("stroke-dasharray", lengthCor);
        d3.select(".brown")
                .attr("stroke-dashoffset", lengthB)
                .attr("stroke-dasharray", lengthB);


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
            .attr("y", y(-4))
            .text("Year");

        svg.append("text")
            .attr("class", "ylabel")
            .attr("text-anchor", "end")
            .attr("x", x(2012.9))
            .attr("y", y(55.8))
            .text("Billions of dollars");

        //arrow lines
      svg.append("line")
            .attr("id","arrow1")
            .attr("x1",x(2015))
            .attr("y1",y(7.9))
            .attr("x2",x(2015.3))
            .attr("y2",y(8.8))
            .attr("stroke","black")  
            .attr("stroke-width",2) 
            .attr("marker-end", "url(#end)")
            .attr("opacity", 0);

    svg.append("line")
            .attr("id","arrow2")
            .attr("x1",x(2021.4))
            .attr("y1",y(11.95))
            .attr("x2",x(2021.4))
            .attr("y2",y(12.95))
            .attr("stroke","black")  
            .attr("stroke-width",2) 
            .attr("marker-end", "url(#end)")
            .attr("opacity", 0);

        //annotations
    svg.append("text")  
        .attr("class", "anno")
        .attr("id", "anno1")
        .attr("x", x(2014.2))
        .attr("y", y(7.0))
        .text("6.3% decrease")
        .attr("opacity", 0);

        svg.append("text")
            .attr("class", "anno")
            .attr("id", "anno2")
            .attr("x", x(2020.7 ))
            .attr("y", y(11.1))
            .text("7.6% decrease")
            .attr("opacity", 0);
        
      d3.selectAll("#circleColumbia2016,#circleColumbia2022")
      .attr("stroke","#e31c0e")
      .attr("fill","#e31c0e");
       

      
    })
  }

  function animate(name,length,dots,duration){
    d3.selectAll(name)
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
//
function animateMult(names,lengths,dots,duration){
   var n = names.length;
   for(let i=0;i<n;i++){
      d3.selectAll(names[i])
        .attr("opacity",1)
        .attr("stroke-dashoffset", lengths[i])
        .attr("stroke-dasharray", lengths[i])
        .transition()
        .duration(duration)
        .attr("stroke-dashoffset", 0);
    }
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
      d3.select("#circleColumbia2011")
      .transition()
      .duration(100)
      .attr("opacity","1");  
    }
    if(response.index==0){
      wipePrev(".first,.second,.third,.fourth","#circleColumbia2012,#circleColumbia2013,#circleColumbia2014,#circleColumbia2015,#circleColumbia2016,#circleColumbia2017,#circleColumbia2018,#circleColumbia2019,#circleColumbia2020,#circleColumbia2021,#circleColumbia2022");
    }
    if(response.index==1){
      wipePrev(".first,.second,.third,.fourth","#circleColumbia2011,#circleColumbia2012,#circleColumbia2013,#circleColumbia2014,#circleColumbia2015,#circleColumbia2016,#circleColumbia2017,#circleColumbia2018,#circleColumbia2019,#circleColumbia2020,#circleColumbia2021,#circleColumbia2022");
      animate(".first",length1,"#circleColumbia2011,#circleColumbia2012,#circleColumbia2013,#circleColumbia2014,#circleColumbia2015",2500);
    }
    if(response.index==2){
      wipePrev(".second,.third,.fourth","#circleColumbia2016,#circleColumbia2017,#circleColumbia2018,#circleColumbia2019,#circleColumbia2020,#circleColumbia2021,#circleColumbia2022,#arrow1,#anno1");
      animate(".second",length2,"#circleColumbia2016",1000);
    }
    if(response.index==3){
      wipePrev(".third,.fourth","#circleColumbia2017,#circleColumbia2018,#circleColumbia2019,#circleColumbia2020,#circleColumbia2021,#circleColumbia2022");
      d3.selectAll("#arrow1,#anno1")
      .transition()
      .duration(500)
      .attr("opacity",1);
    }
    if(response.index==4){
      wipePrev(".third,.fourth","#circleColumbia2017,#circleColumbia2018,#circleColumbia2019,#circleColumbia2020,#circleColumbia2021,#circleColumbia2022");
      animate(".third",length3,"#circleColumbia2017,#circleColumbia2018,#circleColumbia2019,#circleColumbia2020,#circleColumbia2021",2500);
    }
    if(response.index==5){
      wipePrev(".fourth","#circleColumbia2022,#arrow2,#anno2");
      animate(".fourth",length4,"#circleColumbia2022",2000);
    }
    if(response.index==6){
      d3.selectAll("#arrow2,#anno2")
        .transition()
        .duration(500)
        .attr("opacity",1);
        animateMult([".harvard",".yale",".cornell",".princeton",".dartmouth",".penn",".brown"],[lengthH,lengthY,lengthCor,lengthPr,lengthD,lengthPe,lengthB],".circleHarvard,.circleYale,.circleCornell,.circlePrinceton,.circleDartmouth,.circlePenn,.circleB",2500);
    } 
    if(response.index==7){
      
    }
    steps.forEach(step => step.classList.remove('is-active'));
    el.classList.add('is-active');
  
}



function init() {
  buildGraph("https://gist.githubusercontent.com/apark2020/1b6afd4d910b0e2f1afca4fb5af216c1/raw/2edf813b9e92e0424a1a234de6455a794ba17447/endowment-all-schools.csv");
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



