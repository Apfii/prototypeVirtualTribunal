
// Default values
var SLIDER_SIZE = 5;
var TOTAL_ITEMS = 8;
var INDEX = 0;

//
var item_width = null;
var interval = null;

// Slider
var slider1 = {
    e: null,
    x: 0,
    isHovered: false,
    isScrollForward: null
}

console.log(slider1)

window.onload = function() {
    slider1.e = document.getElementById("test-slider-1");

    item_width = slider1.e.children[0].children[0].offsetWidth;

    var prev1 = slider1.e.parentElement.children[0];
    var next1 = slider1.e.parentElement.children[1];
    
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
};


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
// ==========================================================================
// Overlay
// ==========================================================================
window.onload = function() {
    document.getElementById("js-expand-actions-btn").onclick = function(){
        toggleClassOnElement("-tilted",document.getElementById("js-expand-actions-btn"));
        toggleClassOnElement("is-hidden",document.getElementById("js-overlay"));
        toggleClassOnElement("is-hidden",document.getElementById("js-action-btns-container"));
    };
};

function toggleClassOnElement(cssClass, element){
    var hideClass = cssClass;

    element.classList.contains(hideClass)?
    element.classList.remove(hideClass):
    element.classList.add(hideClass);
}
