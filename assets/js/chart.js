//code for graphs and pie charts to go here
queue()
    .defer(d3.csv, "assets/data/cereal.csv")
    .await(makeGraphs);
    
var mfrColors = d3.scale.ordinal()
                .domain(["A", "G", "K", "N", "P", "Q", "R"])
                //.range(["#f3babc", "#488f31","#f1f1f1", "#83af70", "#ec838a", "#de425b", "#bad0af"]);
                .range(["#003f5c", "#374c80", "#7a5195", "#bc5090", "#ef5675", "#ff764a", "#ffa600"])
  
function makeGraphs(error, cerealData) {
    var ndx = crossfilter(cerealData);
    cerealData.forEach(function(d) {
        d.calories = parseInt(d.calories);
        d.protein = parseInt(d.protein);
        d.carbo = parseInt(d.carbo);
        d.sugars = parseInt(d.sugars);
        d.fiber = parseInt(d.fiber);
        d.weight = parseInt(d.weight);
        d.fat = parseInt(d.fat);
        d.sodium = parseInt(d.sodium);
    })
     cerealData.forEach(function(d) {
         if(d.mfr == "K"){
             d.mfr = "Kellogg's"
         }else  if(d.mfr == "G"){
             d.mfr = "General Mills"
         } else  if(d.mfr == "P"){
             d.mfr = "Post"
         } else  if(d.mfr == "Q"){
             d.mfr = "Quaker Oats"
         } else  if(d.mfr == "R"){
             d.mfr = "Ralston Purina"
         }else  if(d.mfr == "A"){
             d.mfr = "American Home Food Products"
         }else  if(d.mfr == "N"){
             d.mfr = "Nabisco"
         }
         
     })
     
    displayCereals(ndx);
    showManufacturer(ndx);
    showFiberPerProduct(ndx);
    carbsPerProduct(ndx);
    proteinPerProduct(ndx);
    sugarPerProduct(ndx);
    fatPerProduct(ndx);
    sodiumPerProduct(ndx);
    servingSizeCalorieCorrelation(ndx);
 
    dc.renderAll();
}

//focuses on one graph
    //use the ndx variable to create our dimension
  
//each graph going to have own function
function displayCereals(ndx) {

    var manfacturer_dim = ndx.dimension(dc.pluck("mfr"));
    //var calories = name_dim.group().reduce(adder, remover, initialiser)
    var average_calorie_per_product = manfacturer_dim.group().reduce(
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
    dc.barChart("#breakfast")
        .width(500)
        .height(600)
        .margins({top: 30, right: 20, bottom: 40, left: 30})
        .transitionDuration(1000)
        .dimension(manfacturer_dim)
        .group(average_calorie_per_product)
        .valueAccessor(function(d) {
            return d.value.average;
        })
        .barPadding(.1)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Manufacturer")
        .yAxis().ticks(6);
}
function showManufacturer(ndx){
        var dim = ndx.dimension(dc.pluck("mfr"));
        var group = dim.group();
        
         dc.pieChart("#productsPerManufacturer")
                .height(450)
                .radius(225)
                .innerRadius(125)
                .transitionDuration(1500)
                .colors(mfrColors)
                .dimension(dim)
                .group(group)
                .legend(dc.legend().x(10).y(20).itemHeight(40).gap(10))
}
function showFiberPerProduct(ndx){
      var fiberDim = ndx.dimension(dc.pluck("mfr"));
        var fiberGroup =fiberDim.group().reduce(function(p, v) {
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
    
    console.log(fiberDim.groupAll());
    
    dc.rowChart("#fiberContent")
         .width(500)
        .height(300)
        .dimension(fiberDim)
        .colors(mfrColors)
        .group(fiberGroup)
         .valueAccessor(function(d) {
                    return d.value.average;
        })
        .xAxis().ticks(5);
}

function proteinPerProduct(ndx){
      var proteinDim = ndx.dimension(dc.pluck("mfr"));
        var proteinGroup =proteinDim.group().reduce(function(p, v) {
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
    
    console.log(proteinDim.groupAll());
    
    dc.rowChart("#proteinContent")
         .width(500)
        .height(300)
        .dimension(proteinDim)
        .group(proteinGroup)
         .valueAccessor(function(d) {
                    return d.value.average;
        })
        .colors(mfrColors)
        .xAxis().ticks(4);
}
function carbsPerProduct(ndx){
      var carbsDim = ndx.dimension(dc.pluck("mfr"));
        var carbsGroup =carbsDim.group().reduce(function(p, v) {
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
    
    console.log(carbsDim.groupAll());
    
    dc.rowChart("#carbContent")
         .width(500)
        .height(300)
        .dimension(carbsDim)
        .group(carbsGroup)
        .colors(mfrColors)
         .valueAccessor(function(d) {
                    return d.value.average;
        })
        .xAxis().ticks(4);
}
function sugarPerProduct(ndx){
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
    
    console.log(sugarDim.groupAll());
    
    dc.rowChart("#sugarContent")
        .width(500)
        .height(300)
        .dimension(sugarDim)
        .group(sugarGroup)
        .colors(mfrColors)
         .valueAccessor(function(d) {
                    return d.value.average;
        })
        .xAxis().ticks(4);
}
function sodiumPerProduct(ndx){
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
    
    console.log(sodiumDim.groupAll());
    
    dc.rowChart("#sodiumContent")
         .width(500)
        .height(300)
        .dimension(sodiumDim)
        .group(sodiumGroup)
        .colors(mfrColors)
         .valueAccessor(function(d) {
                    return d.value.average;
        })
        .xAxis().ticks(4);
}
function fatPerProduct(ndx){
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
    
    console.log(fatDim.groupAll());
    
    dc.rowChart("#fatContent")
        .width(500)
        .height(300)
        .dimension(fatDim)
        .group(fatGroup)
        .colors(mfrColors)
         .valueAccessor(function(d) {
                    return d.value.average;
        })
        .xAxis().ticks(4);
}
//weight of serving size (oz) to calorie correlation
function servingSizeCalorieCorrelation(ndx){
    var servingDim = ndx.dimension(dc.pluck("cups"));
    
    var minServing = servingDim.bottom(1)[0].cups;
    var maxServing = servingDim.top(1)[0].cups;
    
    var calorieDim = ndx.dimension(function(d){
        return [d.cups, d.calories, d.name];
    })
    var minCalories = calorieDim.bottom(1)[0].calories;
    var maxCalories = calorieDim.top(1)[0].calories;
    
    var calorieGroup = calorieDim.group().reduceSum(dc.pluck("calories"));
    console.log(calorieGroup.all());
    
    dc.scatterPlot("#servingSizeCalorieCorrelation")
            .width(600)
            .height(500)
            .margins({top: 40, right: 20, bottom: 40, left: 30})
            .transitionDuration(2500)
            .x(d3.scale.linear().domain([0, maxServing]))
            .xAxisLabel("Serving Size in Cups")
            .brushOn(false)
            .symbolSize(8)
            .clipPadding(20)
            .yAxisLabel("Calories")
            .title(function(d){
               return "There are " +d.key[1] + " calories in " +d.key[0]+ " cup(s) of "+ d.key[2];
            })
            .dimension(calorieDim)
            .group(calorieGroup)
            .xAxis().ticks(8);
}

