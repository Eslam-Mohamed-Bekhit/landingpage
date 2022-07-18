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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

// Get section container.
const sectionContainer = document.querySelector("main");

// Get all sections nodes ,use "let" to can reassign it. 
let AllSections = document.querySelectorAll("main section");

// Get Navbar container 
let navbarContainer = document.getElementById("navbar__list");


// Get button top. 
const buttonGoTop = document.getElementById("top");

// Get button add new section.
const buttonAddNewSection = document.getElementById("add__section");

/*  Boolean variable , Use "let" to can reassign it,
Use to control stop and allow addActiveClasses function while browseer scrolling  */
let allowAddClasses = true;
// Varibale declaration for setTimeOut function which settime to hide the navbar.
let cancelHide;


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * @class 
 * @name Sections
 * Create new Section
 * @method addNewSection           
 * TO DO : Create and add section.
 * @method checkSectionOnViewport 
 * @return Boolean vlaue true || false
 * @param {HTMLElement} el  section to check.
 * TO DO : Check if section on viewbort .
 * @method addSectionActiveClass 
 * @param {HTMLElement} el active section. 
 * TO DO : Add class to active section.
 */

// Start Class Sections
class Sections {

    /** Create section and add it to the DOM */
    addNewSection() {
        sectionContainer.insertAdjacentHTML('beforeend',
            `<section id="section${AllSections.length + 1}" data-nav="Section ${AllSections.length + 1}">
        <div class="landing__container">
          <h2>Section ${AllSections.length + 1}</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

          <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
        </div>
      </section>`
        );
        AllSections = document.querySelectorAll("main section"); // Assign variable after add new section.
        AllSections[AllSections.length - 1].scrollIntoView();
    }
    /** Check section on viewport */
    checkSectionOnViewport(el) {
        if (el.getBoundingClientRect().y < ( // Check section enter by 30% of viewport at least.
            window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        ) * 0.45 &&
            el.getBoundingClientRect().y > (// And checktop of section  not far of viewport by 30% of viewport at most.
                window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            ) * -0.55) {
            return true; // Retrun true if the section on the viewport
        } else {
            return false; // Retrun false if the section on the viewport
        }
    }
    /** Add active class to section */
    addSectionActiveClass(el) {
        // Remove active class from last active secion .
        document.querySelector(".your-active-class").classList.remove("your-active-class");
        // Add active class for active section.
        el.classList.add("your-active-class");

    }
}
// End Class Sections.









/**
 * @class 
 * @name Tabs
 * Create new Tabs.
 * @method createTab
 * @param {Number} sectionIdNumber Must be equal section length.
 * @return {HTMLElement}
 * TO DO : 'li' & 'a' with attribute 'href' &  'dataset'  for section id.
 * @method addNewTab 
 * TO DO : Add tab to Dom.
 * @method addTabsForExistSections
 * TO DO : Add tabs for exist sections on window load.
 * @method addTabActiveClass
 * @param {HTMLElement} el Must be anchor which reference for active section.
 * TO DO : Add active class for the tab, which reference for active section.
 */

// Start Class Tabs 
class Tabs {
    /** Create new tab */
    createTab(sectionIdNumber) {
        return `<li><a href='#section${sectionIdNumber}'  
        class='menu__link' data-section-id='section${sectionIdNumber}'>
        Section ${sectionIdNumber}</a></li>`;
    }
    /** Add the tab to the Dom */
    addNewTab() {
        navbarContainer.insertAdjacentHTML('beforeend',
            // Pass length of sections as argument to make this tab reference for the last section.
            this.createTab(AllSections.length));

    }
    /** Add tabs if there sections already on the page*/
    addTabsForExistSections() {
        // loob on the sections length
        for (let i = 0; i < AllSections.length; i++) {
            // Create and add tab for every section
            navbarContainer.insertAdjacentHTML('beforeend',
                this.createTab(i + 1));
        }
    }
    /** Add active class FOR tab*/
    addTabActiveClass(el) {
        // Remove active class from last active tab
        // Useing '?' (Optional Chaining)to check if there is element has active class to avoid error if return null 
        document.querySelector(".active__link")?.classList.remove("active__link");
        // Add active class for the tab 
        el.classList.add("active__link");
    }
}
//End Class Tabs.


/**
 * @instance 
 * @name tab - From  Tabs class.
 */
const tab = new Tabs();


/**
 * @instance 
 * @name section - From Sections Class
 */
const section = new Sections();

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/




/**
 * @function goToTopDisplay
 * TO DO : Dispaly to ButtonGoUp element when window scroll by 60% from clientHeight view else hidden
 */

function goToTopDisplay() {
    if (window.scrollY > // 
        (window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight) * 0.6) {
        buttonGoTop.classList.add('on') // Add class to the element to display blook.
    } else {
        buttonGoTop.classList.remove('on') // Remove class 'on' to make the element display none again. 

    }
}



/**
 * @function goToTop
 * TO DO : Make the page scroll to up at coord x = 0 and y = 0.
 */

function goToTop() {
    window.scrollTo(0, 0); // Send page to up.

}




// build the nav
/**
 * @function addNewSectionAndTab
 * TO DO : New section and tab.
 */

function addNewSectionAndTab() {
    // use method addNewSection for instance section to build new section.
    section.addNewSection(); 
    // use method addNewTab for instance tab to build new tab.
    tab.addNewTab();

}




// build the nav


/**
 * @function addTabsForExistSections
 * TO DO : Check  if there is any static section to make dynamic taps for them use it on windew load.
 */
function addTabsForExistSections() {
    if (AllSections.length) { // Check if there is.
        tab.addTabsForExistSections();
    }

}




/**
 * @function addActiveClasses
 * TO DO : Add active classes for both of section and 
 * @param {HTMLElement} theSection - the Section which take active section class.
 * @param {HTMLElement} theTab - the  tab -anchor- which take active tab class.
 */

function addActiveClasses(theSection, theTab) {
    if (theSection) {// Check if the sections not null or undefined 
        section.addSectionActiveClass(theSection); // Use method addSectionActiveClass for section instance from Section Class.
        tab.addTabActiveClass(theTab); // Use method addTabActiveClass for tab instance from Tabs Class.
    }
}


// Scroll to anchor ID using scrollTO event


/**
 * @function addActiveClassesOnclick
 * TO DO : Add active class for both of (the target anchor in navbar) and (the section which anchor reference to it.).
 * Add dynamic hash.
 * scroll to anchor ID useing scrollto or scrollInteView()
 * @param {Event} e - Pass Event on click to can get the target .
 */
function addActiveClassesOnclick(e) {
    if (e.target.dataset.sectionId) {
        let scrollTimeOut;
        // Scroll to anchor ID using scrollTO event
        e.preventDefault();
        scrollTo(0, document.getElementById(e.target.dataset.sectionId).offsetTop);
        //Add dynamic hash.
        window.location.hash = document.getElementById(e.target.dataset.sectionId).dataset.nav;
        //  to stop addactivecalses while window auto scrolling.
        allowAddClasses = false;
        navbarContainer.style.pointerEvents = 'none';
        // Pass the section and the tab target to addActiveClasses function.
        addActiveClasses(document.getElementById(e.target.dataset.sectionId), e.target);
        // Set time scrolling to the section.
        clearTimeout(scrollTimeOut);
         scrollTimeOut = setTimeout(() => {
            // allow user for click in navbar  again.
            navbarContainer.style.pointerEvents = 'auto';
            // Assign variable to allow addactivecalses while scrolling again.  
            allowAddClasses = true;
        }, 550);
    }
}





// Add class 'active' to section when near top of viewport

/**
 * @function addActiveClassesOnScroll
 * TO DO : Add active Class for both of the section and reference anchor while scrolling if the section in viewport.
 */
function addActiveClassesOnScroll() {
    // Check if allowAddClasses value is true.
    if (allowAddClasses) {
        // Loop in all sections.
        AllSections.forEach(el => {
            // Check if this section in the viewoport.
            if (section.checkSectionOnViewport(el)) {
                // Add active classes for section and tab.
                addActiveClasses(el, document.querySelector(`[data-section-id=${el.id}]`))
                window.location.hash = el.dataset.nav;

            }
        })
    }
}






/**
 * @function hideNavbar
 * TO DO : hide navbarContainer element with translate it out of view area,
 * use clearTimeOut to can set new one,
 * use setTimeOut() to determine the time need before hide the element navbarContainer,
 * 
 */

function hideNavbar() {
    // Make sure to clear settimeout before settimeout again and reset navbarContainer value.
    showNavbar();
    // SettimeOut by 1000 ms and hide the navbarconatier with translate
    cancelHide = setTimeout(() => {
        navbarContainer.style.transform = 'translateY(-100%)';
    }, 1000);

}
/**
 * @funcrion showNavbar
 * TO DO : show navbar again , with ClearTimeOut , and reset navbarContainer element style.
 */

function showNavbar() {
    // clear for setTimeOut();.
    if (cancelHide) { clearTimeout(cancelHide); }
    // Reset style.
    navbarContainer.style = '';
}






/**
 * @function addCollapsibleSpans
 * TO DO :  Add spans for sections header.
 * @param {Event} e - the event ,when click on the sections. 
 */


function addCollapsibleSpans() {
    // Loop on all section
    AllSections.forEach((el, index) => {
        if (!el.children[0].children[0].classList.contains('active__header')) {
            // Declaration variable.
            let direction;
            //Assign value left if index odd and right if index even to control the float direction.
            direction = index % 2 ? "left" : "right";
            //Add span to  the section header.
            el.children[0].children[0].insertAdjacentHTML(
                'beforeend',
                `<span 
                    class="collapsiblese" 
                    style='color: #b9df08;cursor:pointer; float:${direction}'> -  
                </span>`);
            // Add class for the section headers.
            el.children[0].children[0].classList.add('active__header');
        }
    })
}



/**
 * @function collapsibleSection
 * TO DO :  check span has class (collapsiblese or expand),
 * if has collapsiblese class =>
 *  - change textContent (+) 
 *  - dispaly none for all two (Pargraph) in the section,
 *  - and change viewHeght to 30Vh.
 * but if has expand class =>
 *  - change textContent (-) 
 *  - dispaly block for all two (Pargraph) in the section,
 *  - and reset  viewHeght value.
 * @param {Event} e - the event ,when click on the sections. 
 */

function collapsibleSection(e) {
    // Assign variables.
    let spanAdded = e.target ;
    let firstPargraph = e.target.parentElement?.nextElementSibling;
    let secondPragraph = e.target.parentElement?.nextElementSibling?.nextElementSibling;
    let containerSection = e.target.parentElement?.parentElement?.parentElement ;
    // Check condution for classes.
    if (spanAdded.classList.contains('collapsiblese')) {
        spanAdded.textContent = '+';
        //Dispaly none for 2 pargraph in the section.
        firstPargraph.style.display = 'none';
        secondPragraph.style.display = 'none';
        //Make section height 30vh.
        containerSection.setAttribute('style', "min-height:30vh;");
        //Toggle clases remve collapsiblese and add expand.
        spanAdded.classList.remove('collapsiblese');
        spanAdded.classList.add('expand');
    } else if (spanAdded.classList.contains('expand')) {
        spanAdded.textContent = '-';
        firstPargraph.style.display = 'block';
        secondPragraph.style.display = 'block';
        containerSection.setAttribute('style', "");
        spanAdded.classList.add('collapsiblese');
        spanAdded.classList.remove('expand');
        // Add active class for the section and tab reference when expand this section.
        addActiveClasses(containerSection, document.querySelector(`[data-section-id = ${containerSection.id}`))
        // insert in view of this section.
        containerSection.scrollIntoView();
    }
}








/**
 * End Main Functions
 * Begin Events
 *
*/


/**
 * @event load
 * TO DO : Build navbar menu tabs  dynamic if the page start with some of static sections,
 *  Invoke addTabsForExistSections function on load
 *  invoke addNewSectionAndTab to add one dynamic sectio and to start with four sections .
 *  invoke goToUp() to prevent scroll auto to new dynamic section nymber 4.
 *  invoke addCollapsibleSpans() to add spans to section Headers .
 */
window.addEventListener('load',
    () => {
        addTabsForExistSections();
        addNewSectionAndTab();
        goToTop();
        addCollapsibleSpans();
    }
);





// Build menu 
// Scroll to section on link click
/**
 * @event click
 * TO DO : Build new section and new tab in the navbar  menu when click on buttonAddNewSection element,
 * invoke addNewSectionAndTab().
 * Scroll to section on link click.
 * invoke addCollapsibleSpans() to add span to the new section header.
 */



buttonAddNewSection.addEventListener('click',  () => {
    addNewSectionAndTab();
    addCollapsibleSpans();

}

);










/**
 * @event click
 * TO DO : page go up when click on buttonGoTop Element , invoke goToTop().
 */
buttonGoTop.addEventListener('click', goToTop); 


// Set sections as active


/**
 * @event scroll
 * TO DO : Display and hidden button to up , 
 *  and add active classes to section and anchor tab invoke goToTopDisplay() and addActiveClassesOnScroll().
 *  Set sections as active.
 */
window.addEventListener('scroll', () => {
    // Invoke buttonGoTop function on scroll.
    goToTopDisplay();
    // Invoke addActiveClassesOnScroll function on scroll.
    addActiveClassesOnScroll();
    // Invoke addActiveClassesOnScroll function on scroll.
    hideNavbar();
}
);

// Set sections as active
/**
 * @event click
 * To Do : Add active clases for section refernce  and tab on click on the tab, 
 * invoke addActiveClassesOnclick().
 *  Set sections as active.
 */
navbarContainer.addEventListener('click', addActiveClassesOnclick);

/**
 * @event mouseover
 * TO DO : Show the navigation and prevent hide it while user use mouseOver on it.
 */
navbarContainer.addEventListener("mouseover", showNavbar);

/**
 * @event mouseleave
 * TO DO : hide the navigation bar while the user leave with mouse out of navbar.
 */
navbarContainer.addEventListener("mouseleave", hideNavbar);



/**
 * @event mouseover
 * TO DO : Show the navigation bar while the user is using to move the mouse into position before hiding,
 */
navbarContainer.parentElement.addEventListener("mouseover", showNavbar);



/**
 * @event scroll
 * TO DO : Show the navigation bar while page in top position. 
 */
window.addEventListener("scroll", () => { if (window.scrollY === 0) showNavbar(); });


/**
 * @event click
 * TO DO : collapsible to sections 
 */

sectionContainer.addEventListener("click", collapsibleSection);
