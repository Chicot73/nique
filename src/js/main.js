

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

    let body = document.querySelector("body");
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
            // let classes = document.querySelector(".classes__dummy");
            let station01 = restaurant.getBoundingClientRect().top;
            let station01out = restaurantSpan.getBoundingClientRect().bottom;
            let station02 = menu.getBoundingClientRect().top;
            // let station03 = classes.getBoundingClientRect().top;
            let station02out = dinner.getBoundingClientRect().bottom;
            let station02out2 = drinks.getBoundingClientRect().bottom;

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

            } else if (lastScrollTop > top) {

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
    //timesIcons.addEventListener("mouseout" || "click", function () { setTimeout(quitTimes, 500) });



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



    //Прокрутка до меню

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

    //let f1000 = throttle(scrollHandler, 750);
    //let f2000 = throttle(letSticky, 150);
    //это подключение с аргументами: что подрубать и время в мс

    //window.addEventListener("scroll", f1000);
    //body.addEventListener("scroll", f2000);

    let menu = document.querySelector(".menu");

    /* function scrollHandler() {
        function getCoords(menu) {
            let box = menu.getBoundingClientRect();
 
            return {
                top: box.top + window.scrollY  //расстояние от верха экрана до верха эл-та + пройденная прокрутка от верха страницы
            }
        }
 
        let coords = getCoords(menu);
        let scrl = window.scrollY;
        //let scrl = document.body.scrollTop; //пройденная прокрутка от верха страницы
        let counter = 0;
 
 
        // window.onwheel = function (e) {
        //     // if (e.deltaY < 0) { };
        //     if (e.deltaY > 0) {
        //         if (scrl >= coords.top - 900) {
        //             let GoToMenu = setTimeout(function () {
        //                 window.scrollTo({
        //                     top: coords.top,
        //                     behavior: 'smooth',
        //                 });
        //                 // window.removeEventListener("scroll", f1000);
        //                 // clearTimeout(GoToMenu, 1);
        //             }, 1)
        //         }
        //     }
        // }
 
        // window.onwheel = function (e) {
 
        //     if (e.deltaY < 0) {
        //         counter++;
        //         if (counter == 1) {
        //             document.getElementById('restaurant').scrollIntoView({
        //                 block: 'start',
        //                 behavior: 'smooth'
        //             })
        //             // window.removeEventListener("scroll", f1000);
        //         };
        //         if (counter == 2) {
        //             document.body.scrollIntoView({
        //                 block: 'start',
        //                 behavior: 'smooth'
        //             })
        //             window.removeEventListener("scroll", f1000);
        //         };
        //     }
        // }
 
        if (scrl >= coords.top - 900) {
            console.log('yes');
            window.scrollTo({
                top: coords.top,
                behavior: 'smooth',
            });
            window.removeEventListener("scroll", f1000);
            scrl = undefined;
            coords.top = undefined;
        }
 
 
 
 
 
 
        // let scrollMax;
        // window.onscroll = function () {
        //     scrollMax = 50;
        //     let scrl = window.scrollY;
        //     scrl > 50 ? (stop = scrollMax)
        //         : ('')
        // }, history.scrollRestoration = "manual";
    }; */

    // let menuSticky = document.querySelector(".menuup");
    // let counter = 0;
    // function letSticky() {
    /* function getCoords(menuSticky) {
 
        let box = menuSticky.getBoundingClientRect();
        return {
            top: box.top + body.scrollTop
        }
    }
    let coords = getCoords(menuSticky);
    let scrl = body.scrollTop;
    console.log(scrl + ' --and-- ' + coords.top);
 
    if (counter >= 1) {
        if (scrl < 1300) {
            if (menuSticky.classList.contains('menuup__sticky')) {
                menuSticky.classList.remove('menuup__sticky');
            }
            document.querySelector('.partition').style.height = 7.2 + 'rem';
            counter == 0;
        }
    }
 
    if (scrl >= coords.top - 166) {
        counter++;
 
        menuSticky.classList.add('menuup__sticky');
        document.querySelector('.partition').style.height = 14.6 + 'rem';
 
    } */
    // }

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













