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

let activeSecHeight = 0, // to store current active section height
    activeSecMinHeight = 0, // to store current active section min-height
    secsHeights = [],  // all sections' original heights
    secsMinHeights = [], //// all sections' original min-heights

    fillSectionsHeights = (secs) => {

        for(let i = 0; i < secs.length; i++){

            secsHeights [i] = getComputedHeight(secs[i]);
            
            secsMinHeights [i] = parseFloat(getComputedStyle(secs[i]).minHeight);

        }
    },

    addClass = function (className) { // Using  declaration function/function expression because, arrow functions resolve 'this'  to enclosing lexical scope
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

  // JQuery3.2.1 inspired me on writting this function
  // I made an analysis of JQuery earlier in 2020!


  // https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing

  // this adjustement are added for the sake of collapsing part

    getComputedHeight = (elm, adjust) => {  // we can use default parameter 'adjust = false', for the sake of backward compatibility we don't! 
                                            //it resolves to undefined which is == false

                                          // in case of box-sizing: border-box, element could be adjust with extrat height, margin never added
                                          // in both box models
        
        if (!elm) return 0; //elm undefined/null , avoid any unnecessary verifications
        
        let adjustement = 0,

        computed = getComputedStyle(elm);

        if(adjust){
          

            if(computed.boxSizing === 'content-box'){ //padding border not included in calculation of this box model so adding them

                // parseFloat converts string to a float stripping off the px unit
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat

                adjustement = parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom) + parseFloat(computed.borderTopWidth) + parseFloat(computed.borderBottomWidth);
            }

            adjustement += parseFloat(computed.marginTop) + parseFloat(computed.marginBottom) // margin not included in both box models
        }

      

        return parseFloat(computed.height) + adjustement; 

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
            liElems += `<li><a href="#${secs[i].id}"  data-link ="${secs[i].id}">  ${secs[i].dataset.nav}  </a></li>`;
        }

        return liElems;
    },

    insertCollapseButton = (sec)=>{ // this function inserts 'collapse me' button, different textContent added depending if collapse or not!

                                    // more advanced collapse/expand systems exist however, I need to to submit in time so I settle for this minimal one!

                                    // adv: https://github.com/GoogleChromeLabs/ui-element-samples/tree/gh-pages/animated-clip/advanced


        let currentSecHeight = getComputedHeight(sec), 
        
        button = sec.firstElementChild.firstElementChild,

        buttonH = getComputedHeight(button);


            if(button.nodeName.toLowerCase() !== 'button'){ // only insert button once, if it's not there.



                sec.firstElementChild.insertAdjacentHTML('afterbegin', ' <button class="collapseme">Collapse me!</button>')
                
                
                button = sec.firstElementChild.firstElementChild;
               
                buttonH = getComputedHeight(button);

                let    visibleHeight = getComputedHeight(document.getElementsByTagName('h2')[0], true) + buttonH; // we include height+margins of h2 element + button height

                   activeSecHeight += buttonH;//
                   
                
                
                sec.style.transition = 'height 1s';
                sec.style.height = activeSecHeight +'px';

                button.addEventListener('click', () => {

                    if(activeSecHeight  <= currentSecHeight + buttonH) { // currentSecHeight calculated before adding button, so It be smaller than activeSecHeight

                           
                        currentSecHeight = visibleHeight; // reducing height to only button height and h2 height (collapse)
                            
                        sec.style.minHeight = currentSecHeight + 'px';

                        sec.style.height = currentSecHeight + 'px';
    
                        button.textContent = `${sec.dataset.nav} collapsed, click to expand!`;

                
                    } else {  // put back the original height + button height (expand)
                        
                        currentSecHeight = activeSecHeight;
        
                        sec.style.minHeight = activeSecMinHeight +'px';
                       
                        sec.style.height = currentSecHeight +'px';

                        button.textContent = `Collapse me!`;

                       
                    }
                    
                });

            } else { 
                
                // if it's there it should be hidden, make it visible;
                // I used visibility instead of display for  sections to have  fixed heights.      

                button.style.visibility = 'visible'; // show button if section loaded in viewport

                if(activeSecHeight < activeSecHeight +buttonH) activeSecHeight += buttonH;
            }
           
 
    },

    hideCollapseButton = (sec) =>{ // hide button for inactive section if it's already there!
      
        const button = sec.firstElementChild.firstElementChild;

        if (button.nodeName.toLowerCase() === 'button') {

            button.style.visibility = 'hidden';
        }

       
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

   fillSectionsHeights(secs); // initialize arrays of heights and min heights.


    let timeoutId = null;

    timeoutId = setTimeout(() => pageHeader.style.visibility = 'hidden', 20000); // page header disappears after 5000 ms, 5s
    
    pageHeader.addEventListener('click', function(e){ //event delegation to the parent node

          e.preventDefault(); // requirements of the 1st submission

        docElm.style.scrollBehavior = 'smooth'; // requirements of the 1st submission


          if(e.target.nodeName.toLowerCase() === 'a') {

           

             for (let k = 0; k < secs.length; k++){

                 
                if(e.target.dataset.link === secs[k].id) {

                  let elmRect = getElmRect(secs[k])

                 
                    window.scroll(0, elmRect.top); // requirements of the 1st submission

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
                
              
               
                activeSecHeight = secsHeights[ i ]; // store in global var it for collpase and expand

                activeSecMinHeight = secsMinHeights[ i ]; // keeping it for collpase and expand
                
                insertCollapseButton(secs[i]);

                for (let j = 0; j < nbOfSecs; j++) {

                    if (j !== i) { // this check is necessary, because isLoadedInViewport could return true for both current and next sections, or current and previousone
                        // to make sure, if scrolling down next will have 'active' class, otherwise, previous get 'active'
                        // this behaviour is due to the fact we want smooth scrolling transition from one section to the other, 
                        // thus we visualize background moving from one menu  to the other
                      
                        hideCollapseButton(secs[j]);

                        removeClass.call(secs[j], 'active');

                        removeClass.call(document.querySelector(`li > [href="#${secs[j].id}"]`).parentElement, 'active');


                    }


                }


            } else { // to remove 'active' class for others to which isLoadedInViewport returns false if any

                hideCollapseButton(secs[i]);    

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