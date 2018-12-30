# Cereal Data Dashboard Milestone 2 Project
This project was created as an End of Module Projecgt for the Code Institute. The option I chose to do 
was to build a data dashboard visualising a dataset containing details of seven breakfast
cereal manufacturers in the USA. It was built using the DC, D3, Crossfilter and Queue libraries. 

## UX
My dashboard attempts to achieve its goal by displaying the charts in an easily digestable layout. There
is also a navbar at the top which contains links to the various sections within the dashboard. The site
provides information for users regrading nutritional content of the various cereals, broken down by manufacturer.
The user can filter the charts based on manufacturer and also use the select menu at the top to find out more
about their favourite cereal.


##### User Stories
* As someone who eats cereal for breakfast, I would like to visit this site to find out which manufacturer's products
contain the most calories.

* As someone who usually skips breakfast, I would like to visit this site to find out more about the potential products
available to me.

* As someone who has cereal for breakfast, I would like to visit this site to find out more about the average nutritional
content of some popular cereal brands.

* As someone who normally eats toast for breakfast, I would like to visit this site to find out about alternative
options available to me.

* As someone who usually eats Corn Flakes for breakfast, I want to visit this site to find out more about its nutritional
content
 
#### Wireframes
* Desktop Dashboard ![Desktop](/wireframes/desktopView.jpg/)
* Mobile Dashboard ![Mobile](/wireframes/mobileView.jpg/)

## Features

#### Existing Features
This Dashboard is a Single Page Application with a navbar at the top which allows the user to navigate to 
the chart of their choice. The first feature that the user arrives at is a select menu which allows them
to choose their favourite cereal and filter the charts based on the result.
The Dashboard contains a pie chart which looks at the number of products each manufacturer has, beside this is
a bar chart looking at the average calorie content, next their are six row charts detailing the
average protein, fibre, carbohydrate, sodium fat and sugar contained in the cereals broken down by manufacturer.
Unfiltered each bar, row and segment of the charts represent a particular manufaturer. The charts can be 
filtered by manufacturer by clicking on the relevant section of the chart or selecting a manufacturer in the
pie chart legend. 
The final chart is a scatter plot looking at the correlation between serving size and calorie content of
each cereal. Hovering over a particular dot in the scatter plot displays the serving size, number of calories
and cereal name.

#### Features Left to Implement

## Technologies Used
* HTML5
* CSS3
* Bootstrap
* JavaScript / jQuery, for interactivity
* DC , D3, Crossfilter, Queue

## Testing
I validated my HTML using the W3 validator. I received no errors or warnings.
My CSS file was checked using the W3C CSS Validation service I received no errors or warnings 
<p>
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img style="border:0;width:88px;height:31px"
            src="http://jigsaw.w3.org/css-validator/images/vcss"
            alt="Valid CSS!" />
    </a>
<a href="http://jigsaw.w3.org/css-validator/check/referer">
    <img style="border:0;width:88px;height:31px"
        src="http://jigsaw.w3.org/css-validator/images/vcss-blue"
        alt="Valid CSS!" />
    </a>
</p>


## Deployment


## Credits

#### Content
The full names of the breakfast cereal manufacturers were obtained from
[here](https://www.kaggle.com/jeandsantos/breakfast-cereals-data-analysis-and-clustering)
The code for rotating the text on my bar chart I got from [JS fiddle](https://jsfiddle.net/geotheory/mvhtqu17/)
The dataset I used for analysis was obtained from [kaggle.com](https://www.kaggle.com/crawford/80-cereals/)
I got the code for my navbar from [bootswatch](https://bootswatch.com/pulse/). The only change I made was to
remove the 'expand' class as I wanted a collapsed navbar on all screen sizes
CSS code for removing the tick marks on the bar chart was taken from the fourth answer (Andrew) [here](https://github.com/c3js/c3/issues/876)
The colour scheme for my charts, borders, header and footer was gotten from 
[here](https://learnui.design/tools/data-color-picker.html#palette)
The JavaScript code to collapse the Hamburger menu was copied from [here:](https://stackoverflow.com/a/32336582)
#### Media
The cereal image in my Navabr I got from [pixabay](https://pixabay.com/en/cereal-breakfast-milk-bowl-healthy-32149/)
#### Acknowledgements
My layout was inspired by [the following data visualisation](http://amberonrails.com/cereal-visualization/)
and by the Code Institute's Data Visualisation Mini Project.


