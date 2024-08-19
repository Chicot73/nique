let timesIcon = document.getElementById("clocks");
let timesIcon2 = timesIcon.childNodes;
let timesIcons = timesIcon || timesIcon2;

function showTimes() {
    let times = document.getElementById("times");
    times.classList.remove("hidden");
    times.classList.add("active");
}

timesIcons.addEventListener("mouseover" || "click", showTimes);

function quitTimes() {
    let times = document.getElementById("times");
    times.classList.remove("active");
    times.classList.add("hidden");
}

timesIcons.addEventListener("mouseout" || "click", quitTimes);


