window.onload = function() {
    burgerMenu();
    setupActionBtn()
    //setupSlider1();
    setupSlider2();
    document.ondrag = function() { return false; }
    document.ondragstart = function() { return false; }
};



// Burger Menu
// ======================================================================

function burgerMenu() {
    
    var navOpened = false;
    var burger = document.getElementsByClassName("mobile-header__burger")[0];
    var mainNav = document.getElementsByClassName("nav-main")[0];
    burger.onclick = function() {
        navOpened = !navOpened;
        var navClassName = mainNav.className.split(" ")[0]
        mainNav.className = navClassName + " " + (navOpened ? "-nav-opened" : "-nav-closed");
    }
}

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
    var initSlider = function(id) {
        var element = document.getElementById(id);  // Get element
        var items = element.children[0].children;   // Get links

        // Create slider object
        return {
            e: element,
            width: element.offsetWidth,
            itemWidth: items[0].offsetWidth,
            nbItems: items.length,
            
            currOffset: 0,
            savedOffset: 0,
            startDragX: null,
            maxOffset: items[0].offsetWidth * items.length - element.offsetWidth,

            isDragged: false,
            isDragOver: true
        };
    }

    // Slider
    var slider = initSlider("test-slider-2");

    // 
    // https://www.w3schools.com/howto/howto_js_draggable.asp
    var onDragHandler = function(event) {
        event = event || window.event;
        this.startDragX = event.clientX;
        document.onmousemove = elementDrag.bind(slider);
        document.onmouseup = closeDragElement.bind(slider);
    }

    // 
    var elementDrag = function(event) {
        event = event || window.event;
        // calculate the new cursor position:
        this.currOffset = this.savedOffset + this.startDragX - event.clientX;
        this.currOffset = this.currOffset > this.maxOffset 
            ? this.maxOffset 
            : this.currOffset < 0 
                ? 0 : this.currOffset;
        this.e.style = "transform: translateX(-"+this.currOffset+"px);";
    }

    var closeDragElement = function() {
        this.savedOffset = this.currOffset;
        document.onmouseup = null;
        document.onmousemove = null;
    }

    // 
    slider.e.onmousedown = onDragHandler.bind(slider);



/*
    // Define translation function
    var interval;
    var initSlider = function(slider, event) {
        interval = setInterval(function(){
            if(slider.isDragging) {
                var offsetX = slider.mouseStartDragX - event.clientX;
                slider.e.style = "transform: translateX(-"+offsetX+"px)";
            } else {
                clearInterval(interval);
            } 
        }, 500)
    }
    
    // Attach events
    slider.e.ondragstart = function() {
        slider.isDragging = true;
        slider.mouseStartDragX = event.clientX;
    }

    slider.e.ondragend = function() {
        slider.isDragging = false;
        slider.mouseStartDragX = null;
    }

    slider.e.onmousedown = function(event) {
        initSlider(slider, event);
    };*/
}

// ==========================================================================
// Quick Action Menu
// ==========================================================================

function setupActionBtn() {
    var expandActionBtn = document.getElementById("js-expand-actions-btn");
    var overlay = document.getElementById("js-overlay");
    var menuIsOpenned = false;

    expandActionBtn.onclick = overlay.onclick = function(){
        menuIsOpenned = !menuIsOpenned;
        toggleClassOnElement("-menu-opened", expandActionBtn);
        toggleClassOnElement("-menu-closed", overlay);

        var actions = Array.from(document.getElementsByClassName('quick-actions__action'));
        if(menuIsOpenned) actions.reverse();
        for(var i=0;i<actions.length ;i++)
        {   
            window.setTimeout(function(){
                if(menuIsOpenned){
                    this.classList.remove("-menu-closed");
                }
                else{
                    this.classList.add("-menu-closed");
                }
            }.bind(actions[i]),100*i);
        }   
    };
}

// ==========================================================================
// Utilities
// ==========================================================================
function toggleClassOnElement(className, element){
    element.classList.contains(className)?
        element.classList.remove(className):
        element.classList.add(className);
}
