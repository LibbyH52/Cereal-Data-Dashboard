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
    })
    
    displayCereals(ndx);
    show_manufacturer(ndx);
    show_nutrition_per_product(ndx);
    carbs_per_product(ndx);
    protein_per_product(ndx);
   // serving_size_calorie_correlation(ndx)
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
        .width(400)
        .height(600)
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
        //focuses on one graph
        //use the ndx variable to create our dimension
        var dim = ndx.dimension(dc.pluck("mfr"));
        var group = dim.group();
        
         dc.pieChart("#products_per_manufacturer")
                .height(400)
                .radius(200)
                .innerRadius(100)
                .transitionDuration(1500)
                .colors(mfrColors)
                .dimension(dim)
                .group(group)
                .legend(dc.legend().x(50).y(20).itemHeight(40).gap(10))
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
        .width(400)
        .height(175)
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
        .width(500)
        .height(175)
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
        .width(500)
        .height(175)
        .dimension(carbs_dim)
        .group(carbs_group)
        .colors(mfrColors)
         .valueAccessor(function(d) {
                    return d.value.average;
        })
        .xAxis().ticks(4);
}
//weight of serving size (oz) to calorie correlation
