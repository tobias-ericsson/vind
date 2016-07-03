function nextElementSibling(el) {
    do {
        el = el.nextSibling
    } while (el && el.nodeType !== 1);
    return el;
}

window.animation = {};

window.animation.onResize = function () {
    var menuNav = document.getElementById("menu-nav");
    var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    console.log("window height", height);
    menuNav.style.height = height - 160 + "px";
}

window.animation.toggleExpanded = function (element) {
    //console.log("e", element);
    var state = element.getAttribute("state");
    var nextElementSibling = element.nextElementSibling || nextElementSibling(element);
    if (state == 'minified') {
        element.setAttribute("state", "expanded");
        nextElementSibling.setAttribute("class", "visible");
    } else {
        element.setAttribute("state", "minified");
        nextElementSibling.setAttribute("class", "hidden");
    }
    console.log("toggleExpanded", nextElementSibling);
}

window.animation.onResize();

console.log('animation loaded');