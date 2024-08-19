

/* window.addEventListener('DOMContentLoaded', () => {
 
    function throttle(func, ms) {
 
        let isThrottled = false,
            savedArgs,
            savedThis;
 
        function wrapper() {
 
            if (isThrottled) { // (2)
                savedArgs = arguments;
                savedThis = this;
                return;
            }
 
            func.apply(this, arguments); // (1)
 
            isThrottled = true;
 
            setTimeout(function () {
                isThrottled = false; // (3)
                if (savedArgs) {
                    wrapper.apply(savedThis, savedArgs);
                    savedArgs = savedThis = null;
                }
            }, ms);
        }
 
        return wrapper;
    }; //это функция для торможения срабатывания события "scroll"
 
    const f1000 = throttle(scrollHandler, 50);
    //это подключение с аргументами: что подрубать и время в мс
 
    function scrollHandler() {
 
        let downMenu = document.getElementById("downmenu");
 
        function getCoords(downMenu) {
            let box = downMenu.getBoundingClientRect();
            return {
                top: box.top - window.scrollY
            }
        }
        let coords = getCoords(downMenu);
 
        let scrl = window.scrollY || document.documentElement.scrollTop;
 
        if (scrl >= coords.top - 450) {
 
            downMenu.classList.remove("navabsolute");
            downMenu.classList.add("navfixed");
 
            // window.scrollTo({
 
            //     top: coords.top - 90,
            //     behavior: 'auto',
            // })
 
        } else {
            return;
        }
    }
 
    window.addEventListener("scroll", f1000);
}) */


window.addEventListener('DOMContentLoaded', () => {

    let mouse = document.querySelector(".mouse");
    //let oneScroll = 0;

    /* let down = function () {
        return ++oneScroll;
    } */

    let lastScrollTop = 0;

    onwheel = function (e) {

        window.onscroll = onScroll(e);
        function onScroll(e) {

            //let top = e.target.scrollTop;
            let top = window.scrollY;
            let restaurant = document.querySelector(".restaurant__dummy");
            let restaurantSpan = document.getElementById("restaurant-span");
            let menu = document.querySelector(".menu__dummy");
            let dinner = document.getElementById("dinner");
            let drinks = document.getElementById("drinks");
            let classes = document.querySelector(".classes");
            let classesOut = document.querySelector(".classes__dummy2");
            let blog = document.getElementById("blog");
            let station01 = restaurant.getBoundingClientRect().top;
            let station01out = restaurantSpan.getBoundingClientRect().bottom;
            let station02 = menu.getBoundingClientRect().top;
            let station02out = dinner.getBoundingClientRect().bottom;
            let station02out2 = drinks.getBoundingClientRect().bottom;
            let station03out = classes.getBoundingClientRect().top;
            let station03out2 = classesOut.getBoundingClientRect().top;
            let station04 = blog.getBoundingClientRect().top;


            if (lastScrollTop < top) {
                let downMenu = document.getElementById("downmenu");
                downMenu.classList.remove("hide");
                downMenu.classList.add("show");
                mouse.style.opacity = 0;
                clearInterval(mouseAnim, 1500);

                if (station01out <= 0) {
                    document.querySelector(".logo").classList.add("logo__onleft");
                }
                if (station01 <= 0) {
                    document.querySelector(".menu__img").style.display = "block";
                }
                if (station02 <= 0) {
                    document.querySelector(".menuup").classList.add("menuup__sticky");
                    document.querySelector(".menu__wrapper").style.paddingTop = 8.4 + 'rem';
                    document.getElementById("menu").classList.add("title-fixed");
                }
                if (station02out <= 0) {
                    document.getElementById("menu").classList.remove("title-fixed");
                    document.getElementById("menu").style.top = 249 + "rem";
                }
                if (station02out2 <= 0) {
                    document.querySelector(".menuup").classList.remove("menuup__sticky");
                    document.querySelector(".menu__wrapper").style.paddingTop = 0;
                    document.querySelector(".logo").classList.remove("logo__onleft");
                }
                if (station03out <= 0) {
                    document.querySelector(".menu__img").style.display = "none";
                    document.querySelector(".shop__img").style.display = "block";
                }
                if (station03out2 <= 0) {
                    document.querySelector(".logo").classList.add("logo__onleft");
                    document.querySelector(".blog__img").style.display = "block";
                }
                if (station04 <= 800) {
                    document.querySelector(".shop__img").classList.add("hide");
                }

            } else if (lastScrollTop > top) {

                if (station04 >= 800) {
                    document.querySelector(".shop__img").classList.remove("hide");
                }
                if (station03out2 >= 0) {
                    document.querySelector(".logo").classList.remove("logo__onleft");
                    document.querySelector(".blog__img").style.display = "none";
                }
                if (station03out >= 0) {
                    document.querySelector(".menu__img").style.display = "block";
                    document.querySelector(".shop__img").style.display = "none";
                }
                if (station02out2 >= 0) {
                    document.querySelector(".menuup").classList.add("menuup__sticky");
                    document.querySelector(".menu__wrapper").style.paddingTop = 8.4 + 'rem';
                    document.querySelector(".logo").classList.add("logo__onleft");
                }
                if (station02out >= 0) {
                    document.getElementById("menu").classList.add("title-fixed");
                    document.getElementById("menu").style.top = 37 + "rem";

                }
                if (station02 >= 0) {
                    document.querySelector(".menuup").classList.remove("menuup__sticky");
                    document.querySelector(".menu__wrapper").style.paddingTop = 0;
                    document.getElementById("menu").classList.remove("title-fixed");
                }
                if (station01 >= 0) {
                    document.querySelector(".menu__img").style.display = "none";
                }
                if (station01out >= 0) {
                    document.querySelector(".logo").classList.remove("logo__onleft");
                }
            }
            lastScrollTop = top <= 0 ? 0 : top;
        }
    }

    scroll = function (e) {
        onwheel(e);
        window.removeEventListener("scroll", scroll);
    }

    window.addEventListener("scroll", scroll, true);


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



    //swiper    /////////////////////////////////////////////////////////////////////////////////


    var swiper = new Swiper(".myswiper", {
        autoplay: {
            delay: 2500,
        },
        speed: 1000,
        loop: true,
        freeMode: true,
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 0,
        grabCursor: true,
        //mousewheel: true,
        //loop: true,
    });

    var swiper2 = new Swiper(".myswiper2", {
        autoplay: {
            delay: 2500,
        },
        speed: 1000,
        loop: true,
        freeMode: true,
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 0,
        grabCursor: true,
        //mousewheel: true,
        //loop: true,
    });



    /* //Прокрутка до меню

    function throttle(func, ms) {

        let isThrottled = false,
            savedArgs,
            savedThis;

        function wrapper() {

            if (isThrottled) { // (2)
                savedArgs = arguments;
                savedThis = this;
                return;
            }

            func.apply(this, arguments); // (1)

            isThrottled = true;

            setTimeout(function () {
                isThrottled = false; // (3)
                if (savedArgs) {
                    wrapper.apply(savedThis, savedArgs);
                    savedArgs = savedThis = null;
                }
            }, ms);
        }

        return wrapper;
    }; //это функция для торможения срабатывания события "scroll"
 */
    //let f1000 = throttle(scrollHandler, 750);
    //let f2000 = throttle(letSticky, 150);
    //это подключение с аргументами: что подрубать и время в мс

    //window.addEventListener("scroll", f1000);
    //body.addEventListener("scroll", f2000);


    /////анимация указателя прокрутки

    let mouseAnim = setInterval(function () {
        mouse.style.opacity = 1;
        setTimeout(function () {
            mouse.classList.add('mouse__active');
        }, 750);
        mouse.classList.remove('mouse__active');
    }, 1500)
})

// let letAnimMouse = function () {
//     mouse.classList.add('mouse__active');
// }
// let clearAnimMouse = function () {
//     mouse.classList.remove('mouse__active');
// }
// mouse.addEventListener("mouseover", letAnimMouse);
// mouse.addEventListener("mouseout", clearAnimMouse);



//меню и автоскролл /////////////////////////////////////////////////////////////////////////////////

function restaurantFn() {
    document.querySelector('.restaurant__dummy').scrollIntoView({
        block: "start",
        behavior: 'smooth'
    })
}

function menuFn() {
    document.querySelector('.menu__dummy').scrollIntoView({
        block: "start",
        behavior: 'smooth'
    });
}

function classesFn() {
    document.querySelector('.classes__dummy').scrollIntoView({
        block: "start",
        behavior: 'smooth'
    });
}

function menuup01Fn() {

    document.getElementById('starters').scrollIntoView({
        block: "start",
        behavior: 'smooth'
    })
}

function menuup02Fn() {

    document.getElementById('breakfast').scrollIntoView({
        block: "start",
        behavior: 'smooth'
    })
}

function menuup03Fn() {

    document.getElementById('dinner').scrollIntoView({
        block: "start",
        behavior: 'smooth'
    })
}

function menuup04Fn() {

    document.getElementById('drinks').scrollIntoView({
        block: "start",
        behavior: 'smooth'
    })
}













