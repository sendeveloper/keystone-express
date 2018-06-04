$(document).ready(function() {
	$(".slider").diyslider({
    width: "500px", // width of the slider
    height: "300px", // height of the slider
    display: 1, // number of slides you want it to display at once
    loop: false // disable looping on slides
	}); // this is all you need!


	// use buttons to change slide
	$("#go-left").bind("click", function(){
	    // Go to the previous slide
	    $(".slider").diyslider("move", "back");
	});
	$("#go-right").bind("click", function(){
	    // Go to the previous slide
	    $(".slider").diyslider("move", "forth");
	});

})