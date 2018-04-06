
// Default values
var SLIDER_SIZE = 5;
var TOTAL_ITEMS = 8;
var INDEX = 0;

//
var item_width = null;

// Slider
var slider1 = {
    e: null,
    x: 0,
    isHovered: false,
    isScrollForward: null
};

window.onload = function() {
    setupSlider1();
    setupSlider2();
};

// Slider 1
// ======================================================================

function setupSlider1() {

    slider1.e = document.getElementById("test-slider-1");
    item_width = slider1.e.children[0].children[0].offsetWidth;

    var prev1 = slider1.e.parentElement.children[0];
    var next1 = slider1.e.parentElement.children[1];

    var interval;
    var translateSlider = function(slider) {
        interval = setInterval(function(){
            if(slider.isHovered) {
                slider.x += slider.isScrollForward ? 5 : -5;
                if(slider.x < 0) slider.x = 0;
                else if(slider.x > item_width*(TOTAL_ITEMS-SLIDER_SIZE)-item_width*0.33) slider.x = item_width*(TOTAL_ITEMS-SLIDER_SIZE)-item_width*0.33;
                slider.e.style = "transform: translateX(-"+slider.x+"px)";
            } else clearInterval(interval);
        }, 10)
    }
    
    prev1.onmouseenter = function() {
        slider1.isHovered = true;
        slider1.isScrollForward = false;
        translateSlider(slider1);
    };

    next1.onmouseenter = function() {
        slider1.isHovered = true;
        slider1.isScrollForward = true;
        translateSlider(slider1);
    };

    next1.onmouseleave = prev1.onmouseleave = function() {
        slider1.isHovered = false;
    };
}

// Slider 2
// ======================================================================

function setupSlider2() {

}