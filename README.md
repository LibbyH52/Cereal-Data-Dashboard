# Cereal Data Dashboard Milestone 2 Project
This project was created as an End of Module Project for the Code Institute. The option I chose 
was to build a data dashboard visualising a dataset containing details of seven breakfast
cereal manufacturers in the USA. It was built using the DC, D3, Crossfilter and Queue libraries. 

## UX
My dashboard attempts to achieve its goal by displaying the charts in an easily digestible layout. There
is also a navbar at the top which contains links to the various sections within the dashboard. It is also
possible to navigate through the site using the mousepad or arrow keys on a laptop or desktop. The site
provides information for users regrading nutritional content of the various cereals broken down by manufacturer.
The charts can be filtered based on manufacturer and also use the select menu at the top to find out 
more about their favourite cereal.

##### User Stories
* As someone who eats cereal for breakfast, I would like to visit this site to find out which manufacturer's
products contain the most calories.

* As someone who usually skips breakfast, I would like to visit this site to find out more about the 
potential products available to me.

* As someone who has cereal for breakfast, I would like to visit this site to find out more about the 
average nutritional content of some popular cereal brands.

* As someone who normally eats toast for breakfast, I would like to visit this site to find out about 
alternative options available to me.

* As someone who usually eats Corn Flakes for breakfast, I want to visit this site to find out more about 
its nutritional content
 
#### Wireframes
* Desktop Dashboard ![Desktop](/wireframes/desktopView.jpg/)
* Mobile Dashboard ![Mobile](/wireframes/mobileView.jpg/)

## Features

#### Existing Features
This Dashboard is a Single Page Application with a navbar at the top which allows the user to navigate to 
the chart of their choice. The first feature that the user arrives at is a select menu which allows them
to choose their favourite cereal and filter the charts based on that result.
There is also a pie chart which looks at the number of products each manufacturer has, beside this is
a bar chart looking at the average calorie content, next there are six row charts detailing the
average protein, fibre, carbohydrate, sodium, fat and sugar contained in the cereals.
Unfiltered each bar, row and segment of the charts represent a particular manufaturer. The charts can be 
filtered by clicking on the relevant section of the chart or selecting a manufacturer in the
pie chart legend. 
The final chart is a scatter plot looking at the correlation between serving size and calorie content of
each cereal. By hovering over a particular do the user is given information regarding cereal name, its calorie
content, serving size of the cereal and the name of the manufacturer that produces it. 

#### Features Left to Implement

## Technologies Used
* HTML5
* CSS3
* Bootstrap
* JavaScript / jQuery, for interactivity
* DC , D3, Crossfilter, Queue

## Testing
I validated my HTML using the W3C validator. I received no errors or warnings.
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

The instructions stated that charts using d3 are designed for desktop and large screen viewing and 
only our containers are expected to be responsive. For this reason, my focus was on tablet screens and above.
I tried to make sure that the containers as responsive as possible.................
I examined my dashboard in both firefox and chrome on the following devices: 

iPad
iPad Mini
iPad pro
Kindle Fire HDX
Laptop with HiDPI screen
Laptop with MDPI screen
Laptop with touch
1080p Full HD Television

I checked that the charts filtered correctly, the select menu worked as it should and, that the navigation links were 
functional. The only small issue I had was getting the tooltip to appear on the scatter plot points when the device
was in responsive mode. I have noticed this on other sites too and couldn't find a solution.

## Deployment
This site has been deployed via GitHub.

## Credits

#### Content
The dataset I used for analysis was obtained from [kaggle.com](https://www.kaggle.com/crawford/80-cereals/)
The full names of the breakfast cereal manufacturers were obtained from
[here](https://www.kaggle.com/jeandsantos/breakfast-cereals-data-analysis-and-clustering)
The code for rotating the text on my bar chart I got from [JS fiddle](https://jsfiddle.net/geotheory/mvhtqu17/)
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


