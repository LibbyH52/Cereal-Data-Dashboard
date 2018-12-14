//code for graphs and pie charts to go here
queue()
    .defer(d3.csv, "assets/data/cereal.csv")
    .await(makeGraphs);
    
var mfrColors = d3.scale.ordinal()
                .domain(["A", "G", "K", "N", "P", "Q", "R"])
                .range(["#f3babc", "#bad0af", "#ec838a", "#488f31", "#de425b","#f1f1f1", "#83af70"]);
  
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
    show_manufacturer(ndx);
    show_nutrition_per_product(ndx);
    carbs_per_product(ndx);
    protein_per_product(ndx);
    sugar_per_product(ndx);
    fat_per_product(ndx);
    sodium_per_product(ndx);
    serving_size_calorie_correlation(ndx);
 
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
        .height(700)
        .margins({top: 30, right: 20, bottom: 10, left: 10})
        .dimension(manfacturer_dim)
        .group(average_calorie_per_product)
        .valueAccessor(function(d) {
            return d.value.average;
        })
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Manufacturer")
        .yAxis().ticks(6);
}
function show_manufacturer(ndx){
        var dim = ndx.dimension(dc.pluck("mfr"));
        var group = dim.group();
        
         dc.pieChart("#products_per_manufacturer")
                .height(350)
                .radius(175)
                .innerRadius(100)
                .transitionDuration(1500)
                .colors(mfrColors)
                .dimension(dim)
                .group(group)
                .legend(dc.legend().x(10).y(20).itemHeight(40).gap(10))
}
function show_nutrition_per_product(ndx){
      var fiber_dim = ndx.dimension(dc.pluck("mfr"));
        var fiber_group =fiber_dim.group().reduce(function(p, v) {
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
    
    console.log(fiber_dim.groupAll());
    
    dc.rowChart("#fiber_content")
         .width(550)
        .height(300)
        .dimension(fiber_dim)
        .colors(mfrColors)
        .group(fiber_group)
         .valueAccessor(function(d) {
                    return d.value.average;
        })
        .xAxis().ticks(5);
}

function protein_per_product(ndx){
      var protein_dim = ndx.dimension(dc.pluck("mfr"));
        var protein_group =protein_dim.group().reduce(function(p, v) {
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
    
    console.log(protein_dim.groupAll());
    
    dc.rowChart("#protein_content")
         .width(550)
        .height(300)
        .dimension(protein_dim)
        .group(protein_group)
         .valueAccessor(function(d) {
                    return d.value.average;
        })
        .colors(mfrColors)
        .xAxis().ticks(4);
}
function carbs_per_product(ndx){
      var carbs_dim = ndx.dimension(dc.pluck("mfr"));
        var carbs_group =carbs_dim.group().reduce(function(p, v) {
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
    
    console.log(carbs_dim.groupAll());
    
    dc.rowChart("#carb_content")
         .width(550)
        .height(300)
        .dimension(carbs_dim)
        .group(carbs_group)
        .colors(mfrColors)
         .valueAccessor(function(d) {
                    return d.value.average;
        })
        .xAxis().ticks(4);
}
function sugar_per_product(ndx){
      var sugar_dim = ndx.dimension(dc.pluck("mfr"));
        var sugar_group = sugar_dim.group().reduce(function(p, v) {
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
    
    console.log(sugar_dim.groupAll());
    
    dc.rowChart("#sugar_content")
        .width(550)
        .height(300)
        .dimension(sugar_dim)
        .group(sugar_group)
        .colors(mfrColors)
         .valueAccessor(function(d) {
                    return d.value.average;
        })
        .xAxis().ticks(4);
}
function sodium_per_product(ndx){
      var sodium_dim = ndx.dimension(dc.pluck("mfr"));
        var sodium_group = sodium_dim.group().reduce(function(p, v) {
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
    
    console.log(sodium_dim.groupAll());
    
    dc.rowChart("#sodium_content")
         .width(550)
        .height(300)
        .dimension(sodium_dim)
        .group(sodium_group)
        .colors(mfrColors)
         .valueAccessor(function(d) {
                    return d.value.average;
        })
        .xAxis().ticks(4);
}
function fat_per_product(ndx){
      var fat_dim = ndx.dimension(dc.pluck("mfr"));
        var fat_group = fat_dim.group().reduce(function(p, v) {
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
    
    console.log(fat_dim.groupAll());
    
    dc.rowChart("#fat_content")
        .width(550)
        .height(300)
        .dimension(fat_dim)
        .group(fat_group)
        .colors(mfrColors)
         .valueAccessor(function(d) {
                    return d.value.average;
        })
        .xAxis().ticks(4);
}
//weight of serving size (oz) to calorie correlation
function serving_size_calorie_correlation(ndx){
    var serving_dim = ndx.dimension(dc.pluck("cups"));
    
    var min_serving = serving_dim.bottom(1)[0].cups;
    var max_serving = serving_dim.top(1)[0].cups;
    
    var calorie_dim = ndx.dimension(function(d){
        return [d.cups, d.calories];
    })
    
    var calorie_group = calorie_dim.group().reduceSum(dc.pluck("calories"));
    console.log(calorie_group.all());
    
    dc.scatterPlot("#serving_size_calorie_correlation")
            .width(800)
            .height(400)
            .x(d3.scale.linear().domain([min_serving, max_serving]))
            .brushOn(false)
            .symbolSize(8)
            .clipPadding(10)
            .yAxisLabel("calories")
            .title(function(d){
               return "There is " +d.key[1];
            })
            .dimension(calorie_dim)
            .group(calorie_group)
}