/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

 /****
  
        * CODE IS LINT-FREE \\\^^^^^_^^^^^///
  
  ****/

'use strict'

const docElm = document.documentElement,

    secs = document.getElementsByTagName('section'),

    ul = document.getElementById('navbar__list'),

    pageHeader = document.getElementsByClassName('page__header')[0];


/**
 * End Global Variables
 * Start Helper Functions
 *
 */


let addClass = function (className) { // Using  declaration function/function expression because, arrow functions resolve 'this'  to enclosing lexical scope
                                     // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
                                     // changing function's scope

    let classList = this.className ? this.className : '';

    if (classList.indexOf(className) === -1) {

        classList += ' ' + className;

        this.className = classList.trim();


    }
},

    removeClass = function (className) { // Using  declaration function/Function Expression  because, arrow functions resolve 'this'  to enclosing lexical scope
                                        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

        let classList = this.className ? this.className : '';

        if (classList.indexOf(className) !== -1) { //stop here if className doesn't contain the required className

            let classArray = classList.split(/\s+/), //split based on regex, at least one space seperates classNames 

                pos = classArray.indexOf(classArray);

            classArray.splice(pos, 1, '');

            classList = classArray.join(' ');

            this.className = classList;


        }


    },


    getComputedHeight = (elm) => {

        if (elm === undefined) return 0; //avoiding any unnecessary calculation if element parameter is undefined

        return parseFloat(getComputedStyle(elm).height); // parseFloat converts string to a float stripping off the px unit
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat

    },

    getElmRect = (elm) =>{
       
        let elmRect = elm.getBoundingClientRect(), // returns the size (width, height) of the element and its position (top, bottom)relative to viewport!

        elmHeight = getComputedHeight(elm),
        
        docElmY = docElm.scrollTop,


            // this to get a fixed top value of the section in the document.
            //(0, 0) is moved to the topmost of the document instead of the topmost of the viewport

            elmCoors = {
                top: elmRect.top + docElmY,
                bttm: elmRect.top + docElmY + elmHeight
            };

            return elmCoors;

    },

    /**
     * End Helper Functions
     * Begin Main Functions
     *
     */


    // build the nav


    // Add class 'active' to section when near top of viewport


    // Scroll to anchor ID using scrollTO event



        // Inspired by https://medium.com/talk-like/detecting-if-an-element-is-in-the-viewport-jquery-a6a4405a3ea2
        // code adapted to my special use
    isLoadedInViewport = (elm) => {

            let winHeight = window.innerHeight,

            docElmY = docElm.scrollTop,

            elmHeight = getComputedHeight(elm),

            elmCoors = getElmRect(elm),

            //When scrollTop is used on the root element (the <html> element), the scrollY of the window is returned
           // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop
          
            winCoors = {
                top: docElmY,
                bttm: docElmY + winHeight
            }; 



        return winCoors.top <= elmCoors.top && winCoors.bttm + elmHeight / 2 >= elmCoors.bttm || // element loaded in the viewport, or its half is visible
           
            winCoors.top < elmCoors.bttm && winCoors.top > elmCoors.top;  // a part of element is still visible in the viewport

    },

    createMenu = (elms) => {


        let liElems = '';

        for (let i = 0; i < elms.length; i++) { // we can use Array.prototype.forEach.call instead to change the 'this' reference of forEach to be 'this' of HMTLCollection
                                                 // as we did for addClass and removeClass
            liElems += `<li><a href="#${secs[i].id}"  data-link ="${secs[i].id}">  ${secs[i].getAttribute('data-nav')}  </a></li>`;
        }

        return liElems;
    };

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active


(function () {


    ul.innerHTML = createMenu(secs);


    let timeoutId = null;

    timeoutId = setTimeout(() => pageHeader.style.visibility = 'hidden', 20000); // page header disappears after 5000 ms, 5s
    
    pageHeader.addEventListener('click', function(e){ //event delegation to the parent node

          e.preventDefault();

          docElm.style.scrollBehavior = 'smooth';

          if(e.target.nodeName.toLowerCase() === 'a') {

           

             for (let k = 0; k < secs.length; k++){

                 
                  

                if(e.target.dataset.link === secs[k].id) {

                 
                   
                secs[k].scrollIntoView(true);
                
                secs[k].scrollIntoView(false);
                //   let elmRect = getElmRect(secs[k])

                //   console.log(elmRect.top);

                //    window.scroll(0, elmRect.top);
                }
 
             }

           
          }

    });


    document.addEventListener('scroll', () => {


        let nbOfSecs = secs.length;

        pageHeader.style.visibility = 'visible';


        clearTimeout(timeoutId);


        for (let i = 0; i < nbOfSecs; i++) {

            if (isLoadedInViewport(secs[i])) {


                addClass.call(secs[i], 'active');
                addClass.call(document.querySelector(`li > [href="#${secs[i].id}"]`).parentElement, 'active');


                for (let j = 0; j < nbOfSecs; j++) {

                    if (j !== i) { // this check is necessary, because isLoadedInViewport could return true for both current and next sections, or current and previousone
                        // to make sure, if scrolling down next will have 'active' class, otherwise, previous get 'active'
                        // this behaviour is due to the fact we want smooth scrolling transition from one section to the other, 
                        // thus we visualize background moving from one menu  to the other


                        removeClass.call(secs[j], 'active');
                        removeClass.call(document.querySelector(`li > [href="#${secs[j].id}"]`).parentElement, 'active');


                    }


                }


            } else { // to remove 'active' class for others to which isLoadedInViewport returns false if any


                removeClass.call(secs[i], 'active');
                removeClass.call(document.querySelector(`li > [href="#${secs[i].id}"]`).parentElement, 'active');
            }

            if (getComputedStyle(pageHeader).display === 'block') { // only on small device, otherwise, display: flex;


                if (secs[i].className.indexOf('active') !== -1) {

                    let pageHeaderScH = pageHeader.scrollHeight;

                    pageHeader.scrollTop = pageHeaderScH * i / nbOfSecs; // make the menu bar scroll to the highlighted section 1 to 5;

                }

            }
        }


        timeoutId = setTimeout(() => pageHeader.style.visibility = 'hidden', 20000);


    });

})();