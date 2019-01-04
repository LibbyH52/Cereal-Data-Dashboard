$(document).ready(function() {
 $(".navbar-nav li a").click(function(event) {
            if (!$(this).parent().hasClass('navbar-toggler'))
                $(".navbar-nav li a").addClass("collapse");
 });
});
