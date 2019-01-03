//code for graphs and pie charts to go here
queue()
    .defer(d3.csv, "assets/data/cereal.csv")
    .await(makeGraphs);

//adds an individual colour to each manufacturer
var mfrColors = d3.scale.ordinal()
    .domain(["A", "G", "K", "N", "P", "Q", "R"])
    .range(["#003f5c", "#374c80", "#7a5195", "#bc5090", "#ef5675", "#ff764a", "#ffa600"])

function makeGraphs(error, cerealData) {
    var ndx = crossfilter(cerealData);
    cerealData.forEach(function(d) {
        d.calories = parseInt(d.calories);
        d.protein = parseInt(d.protein);
        d.carbo = parseInt(d.carbo);
        d.fiber = parseInt(d.fiber);
        d.weight = parseInt(d.weight);
        d.fat = parseInt(d.fat);
        d.sugars = parseInt(d.sugars);
        d.sodium = parseInt(d.sodium);
    })
    //full manufacturer names (dataset just contains letters)
    cerealData.forEach(function(d) {
        if (d.mfr == "K") {
            d.mfr = "Kellogg's"
        }
        else if (d.mfr == "G") {
            d.mfr = "General Mills"
        }
        else if (d.mfr == "P") {
            d.mfr = "Post"
        }
        else if (d.mfr == "Q") {
            d.mfr = "Quaker Oats"
        }
        else if (d.mfr == "R") {
            d.mfr = "Ralston Purina"
        }
        else if (d.mfr == "A") {
            d.mfr = "American Home Food Products"
        }
        else if (d.mfr == "N") {
            d.mfr = "Nabisco"
        }

    })

    showCalorieContent(ndx)
    showManufacturer(ndx);
    showFiberPerProduct(ndx);
    carbsPerProduct(ndx);
    proteinPerProduct(ndx);
    fatPerProduct(ndx);
    sodiumPerProduct(ndx);
    sugarPerProduct(ndx);
    servingSizeCalorieCorrelation(ndx);
    showCerealSelector(ndx);
    dc.renderAll();
}
//to add some responsiveness to charts
 var width = $(".chart").offsetWidth;
 
//allows users to select their own cereal preference
function showCerealSelector(ndx) {
    nameDim = ndx.dimension(dc.pluck("name"));
    nameGroup = nameDim.group();

    var name = dc.selectMenu("#cerealSelector")
    name
        .dimension(nameDim)
        .group(nameGroup)
        .title(function(d) {
            return d.key;
        })
}
//Bar Chart examing average calorie content by manufacturer
function showCalorieContent(ndx) {

    var manfacturerDim = ndx.dimension(dc.pluck("mfr"));
    var averageCaloriePerProduct = manfacturerDim.group().reduce(
        function(p, v) {
            p.count++;
            p.total += v.calories;
            p.average = p.total / p.count;
            return p;
        },
        //remove an entry
        function(p, v) {
            p.count--;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
            }
            else {
                p.total -= v.calories;
                p.average = p.total / p.count;
            }
            return p;
        },
        //initialise values
        function() {
            return { count: 0, total: 0, average: 0 }
        }
    );
    
    //var width = $("#calorieContent").offsetWidth;
    dc.barChart("#calorieContent")
        .width(width)
        .height(400)
        //.margins({ top: 10, right: 30, bottom: 10, left: 30 })
        .transitionDuration(2000)
        .dimension(manfacturerDim)
        .group(averageCaloriePerProduct)
        .valueAccessor(function(d) {
            return d.value.average;
        })
        .colors(mfrColors)
        .colorAccessor(function(d) {
            return d.key
        })
        .barPadding(.3)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .yAxis().ticks(10);
}
// Pie Chart looking at breakdown of market share by manufacturer
function showManufacturer(ndx) {
    var manufacturerDim = ndx.dimension(dc.pluck("mfr"));
    var manufacturerGroup = manufacturerDim.group();
    var radius = $("#productsPerManufacturer").offsetWidth;
  
    dc.pieChart("#productsPerManufacturer")
        .height(340)
        .radius(170)
        .innerRadius(120)
        .transitionDuration(1500)
        .colors(mfrColors)
        .colorAccessor(function(d) {
            return d.key
        })
        .dimension(manufacturerDim)
        .group(manufacturerGroup)
        .legend(dc.legend().x(0).y(10).itemHeight(40).gap(10))
        .label(function(d) {
            return d.value;
        })
}
//row charts examining nutiritonal content by manufacturer

function showFiberPerProduct(ndx) {
    var fiberDim = ndx.dimension(dc.pluck("mfr"));
    var fiberGroup = fiberDim.group().reduce(function(p, v) {
            p.count++;
            p.total += v.fiber;
            p.average = p.total / p.count;
            return p;
        },
        //remove an entry
        function(p, v) {
            p.count--;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
            }
            else {
                p.total -= v.fiber;
                p.average = p.total / p.count;
            }
            return p;
        },
        //initialise values
        function() {
            return { count: 0, total: 0, average: 0 }
        });
    //code to draw row chart 
    dc.rowChart("#fiberContent")
        .width(400)
        .height(250)
        //.margins({ top: 20, right: 40, bottom: 40, left: 10})
        .useViewBoxResizing(true)
        .dimension(fiberDim)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(mfrColors)
        .group(fiberGroup)
        .valueAccessor(function(d) {
            return d.value.average;
        })
        .elasticX(true)
        .xAxis().ticks(5);
}

function proteinPerProduct(ndx) {
    var proteinDim = ndx.dimension(dc.pluck("mfr"));
    var proteinGroup = proteinDim.group().reduce(function(p, v) {
            p.count++;
            p.total += v.protein;
            p.average = p.total / p.count;
            return p;
        },
        //remove an entry
        function(p, v) {
            p.count--;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
            }
            else {
                p.total -= v.protein;
                p.average = p.total / p.count;
            }
            return p;
        },
        //initialise values
        function() {
            return { count: 0, total: 0, average: 0 }
        });


    //code to draw row chart
    dc.rowChart("#proteinContent")
        .width(400)
        .height(250)
        .useViewBoxResizing(true)
        //.margins({ top: 20, right: 40, bottom: 40, left: 10})
        .dimension(proteinDim)
        .group(proteinGroup)
        .valueAccessor(function(d) {
            return d.value.average;
        })
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(mfrColors)
        .elasticX(true)
        .xAxis().ticks(4);
}

function carbsPerProduct(ndx) {
    var carbsDim = ndx.dimension(dc.pluck("mfr"));
    var carbsGroup = carbsDim.group().reduce(function(p, v) {
            p.count++;
            p.total += v.carbo;
            p.average = p.total / p.count;
            return p;
        },
        //remove an entry
        function(p, v) {
            p.count--;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
            }
            else {
                p.total -= v.carbo;
                p.average = p.total / p.count;
            }
            return p;
        },
        //initialise values
        function() {
            return { count: 0, total: 0, average: 0 }
        });


    //code to draw row chart 
    dc.rowChart("#carbContent")
        .width(400)
        .height(250)
        .useViewBoxResizing(true)
        //.margins({ top: 20, right: 40, bottom: 40, left: 10})
        .dimension(carbsDim)
        .group(carbsGroup)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(mfrColors)
        .valueAccessor(function(d) {
            return d.value.average;
        })
        .elasticX(true)
        .xAxis().ticks(4);
}

function sodiumPerProduct(ndx) {
    var sodiumDim = ndx.dimension(dc.pluck("mfr"));
    var sodiumGroup = sodiumDim.group().reduce(function(p, v) {
            p.count++;
            p.total += v.sodium;
            p.average = p.total / p.count;
            return p;
        },
        //remove an entry
        function(p, v) {
            p.count--;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
            }
            else {
                p.total -= v.sodium;
                p.average = p.total / p.count;
            }
            return p;
        },
        //initialise values
        function() {
            return { count: 0, total: 0, average: 0 }
        });

    dc.rowChart("#sodiumContent")
        .width(400)
        .height(250)
        .useViewBoxResizing(true)
        //.margins({ top: 20, right: 40, bottom: 40, left: 10})
        .dimension(sodiumDim)
        .group(sodiumGroup)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(mfrColors)
        .valueAccessor(function(d) {
            return d.value.average;
        })
        .elasticX(true)
        .xAxis().ticks(4);
}

function fatPerProduct(ndx) {
    var fatDim = ndx.dimension(dc.pluck("mfr"));
    var fatGroup = fatDim.group().reduce(function(p, v) {
            p.count++;
            p.total += v.fat;
            p.average = p.total / p.count;
            return p;
        },
        //remove an entry
        function(p, v) {
            p.count--;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
            }
            else {
                p.total -= v.fat;
                p.average = p.total / p.count;
            }
            return p;
        },
        //initialise values
        function() {
            return { count: 0, total: 0, average: 0 }
        });


    //code to draw row chart 
    dc.rowChart("#fatContent")
        .width(400)
        .height(250)
        .useViewBoxResizing(true)
        //.margins({ top: 20, right: 40, bottom: 40, left: 10})
        .dimension(fatDim)
        .group(fatGroup)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(mfrColors)
        .valueAccessor(function(d) {
            return d.value.average;
        })
        .elasticX(true)
        .xAxis().ticks(4);
}

function sugarPerProduct(ndx) {
    var sugarDim = ndx.dimension(dc.pluck("mfr"));
    var sugarGroup = sugarDim.group().reduce(function(p, v) {
            p.count++;
            p.total += v.sugars;
            p.average = p.total / p.count;
            return p;
        },
        //remove an entry
        function(p, v) {
            p.count--;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
            }
            else {
                p.total -= v.sugars;
                p.average = p.total / p.count;
            }
            return p;
        },
        //initialise values
        function() {
            return { count: 0, total: 0, average: 0 }
        });


    dc.rowChart("#sugarContent")
        .width(400)
        .height(250)
        .useViewBoxResizing(true)
        //.margins({ top: 20, right: 40, bottom: 40, left: 10})
        .dimension(sugarDim)
        .group(sugarGroup)
        .colorAccessor(function(d) {
            return d.key;
        })
        .colors(mfrColors)
        .valueAccessor(function(d) {
            return d.value.average;
        })
        .elasticX(true)
        .xAxis().ticks(4);
}
//end of nutrition row charts

//weight of serving size (cups) to calorie correlation
function servingSizeCalorieCorrelation(ndx) {
    var servingDim = ndx.dimension(dc.pluck("cups"));

    var minServing = servingDim.bottom(1)[0].cups;
    var maxServing = servingDim.top(1)[0].cups;


    var calorieDim = ndx.dimension(function(d) {
        return [d.cups, d.calories, d.name, d.mfr];
    })

    var calorieGroup = calorieDim.group();
    console.log(calorieGroup.all());
    
    dc.scatterPlot("#servingSizeCalorieCorrelation")
        .width(550)
        .height(400)
        .transitionDuration(200)
        .x(d3.scale.linear().domain([0, maxServing]))
        .xAxisLabel("Serving Size in Cups")
        .brushOn(false)
        .symbolSize(8)
        .clipPadding(30)
        .yAxisLabel("Calories")
        .title(function(d) {
            return "There are " + d.key[1] + " calories in " + d.key[0] + " cup(s) of " + d.key[2];
        })
        .colors(mfrColors)
        .colorAccessor(function(d) {
            return d.key[3];
        })
        .dimension(calorieDim)
        //.margins({ top: 20, right: 10, bottom: 40, left: 40 })
        .useViewBoxResizing(true)
        .group(calorieGroup)
        .xAxis().ticks(10)
}

d3.select('#resetButton')
    .on('click', function() {
      dc.filterAll();
  		dc.redrawAll();

      dc.filterAll();
      dc.redrawAll();
});