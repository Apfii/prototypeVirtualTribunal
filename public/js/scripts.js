window.onload = function() {
    setupSlider1();
    setupSlider2();
};

// Slider 1
// ======================================================================

function setupSlider1() {

    // Default values
    var SLIDER_SIZE = 5;
    var TOTAL_ITEMS = 8;
    var INDEX = 0;

    // Slider
    var slider = {
        e: null,
        x: 0,
        isHovered: false,
        isScrollForward: null
    };

    // Get element
    slider.e = document.getElementById("test-slider-1");
    var item_width = slider.e.children[0].children[0].offsetWidth;

    // Get triggers
    var prev = slider.e.parentElement.children[0];
    var next = slider.e.parentElement.children[1];

    // Define translation function
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
    
    // Attach events
    prev.onmouseenter = function() {
        slider.isHovered = true;
        slider.isScrollForward = false;
        translateSlider(slider);
    };
    next.onmouseenter = function() {
        slider.isHovered = true;
        slider.isScrollForward = true;
        translateSlider(slider);
    };
    next.onmouseleave = prev.onmouseleave = function() {
        slider.isHovered = false;
    };
}

// Slider 2
// ======================================================================

function setupSlider2() {

    // Slider
    var slider = {
        e: null,
        x: 0,
        isDragging: false,
        mouseStartDragX: null
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


    // Get element
    slider.e = document.getElementById("test-slider-2");

    // Define translation function
    var interval;
    var dragSlider = function(slider, event) {
        interval = setInterval(function(){
            if(slider.isDragging) {
                var offsetX = slider.mouseStartDragX - event.clientX;
                slider.e.style = "transform: translateX(-"+offsetX+"px)";
            } else {
                clearInterval(interval);
            } 
        }, 50)
    }
    
    // Attach events
    slider.e.ondrag = function(event) {
        slider.isDragging = true;
        slider.mouseStartDragX = event.clientX;
        dragSlider(slider, event);
    };
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

