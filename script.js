// ==========================
// MOBILE NAV TOGGLE
// ==========================

const navToggle = document.getElementById("nav-toggle");
const navLinksList = document.getElementById("nav-links");

if (navToggle && navLinksList) {

    navToggle.addEventListener("click", () => {

        const isOpen = navLinksList.classList.toggle("open");

        navToggle.setAttribute("aria-expanded", isOpen);

    });

}

// ==========================
// SMOOTH SCROLL NAVIGATION
// ==========================

const links = document.querySelectorAll("nav a");

links.forEach(link => {

    link.addEventListener("click", function(e){

        const href = this.getAttribute("href");

        if(href && href.startsWith("#")){

            e.preventDefault();

            const target = document.querySelector(href);

            if(target){

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

            // Close mobile menu after clicking a link
            if (navLinksList && navLinksList.classList.contains("open")) {

                navLinksList.classList.remove("open");
                navToggle.setAttribute("aria-expanded", false);

            }

        }

    });

});


// ==========================
// SCROLL PROGRESS BAR
// ==========================

window.addEventListener("scroll", () => {

    const progressBar =
    document.getElementById("progress-bar");

    if(progressBar){

        let scrollTop =
        document.documentElement.scrollTop;

        let scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

        let progress =
        (scrollTop / scrollHeight) * 100;

        progressBar.style.width =
        progress + "%";
    }

});


// ==========================
// REVEAL ANIMATION
// ==========================

const reveals =
document.querySelectorAll(".reveal");

function revealSections(){

    reveals.forEach(section => {

        const sectionTop =
        section.getBoundingClientRect().top;

        const screenHeight =
        window.innerHeight;

        if(sectionTop < screenHeight - 100){

            section.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    revealSections
);

revealSections();


// ==========================
// TYPING EFFECT
// ==========================

const typingElement = document.getElementById("typing");

if (typingElement) {

    const words = [
        "Web Developer",
        "Programmer",
        "Designer",
        "CSIT Student"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingElement.textContent =
                currentWord.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentWord.length) {

                deleting = true;
                setTimeout(typeEffect, 1500);
                return;

            }

        } else {

            typingElement.textContent =
                currentWord.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                deleting = false;
                wordIndex++;

                if (wordIndex >= words.length) {
                    wordIndex = 0;
                }

            }

        }

        setTimeout(typeEffect, deleting ? 60 : 120);
    }

    typeEffect();

}

// ==========================
// LOADING SCREEN
// ==========================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("loader-hidden");

    }, 1200);

});

// ==========================
// ANIMATED COUNTERS
// ==========================

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = +counter.getAttribute("data-target");

            let count = 0;
            const speed = 40;

            const updateCounter = () => {

                const increment = Math.ceil(target / speed);

                if (count < target) {

                    count += increment;

                    if (count > target) {
                        count = target;
                    }

                    if (target === 100) {
                        counter.innerText = count + "%";
                    } else {
                        counter.innerText = count + "+";
                    }

                    requestAnimationFrame(updateCounter);

                }

            };

            updateCounter();

            observer.unobserve(counter);

        }

    });

}, {
    threshold: 0.6
});

counters.forEach(counter => {
    observer.observe(counter);
});

// ==========================
// SKILL PROGRESS
// ==========================

const skills = document.querySelectorAll(".skill-card");

const title = document.getElementById("progress-title");
const percent = document.getElementById("progress-percent");
const fill = document.getElementById("progress-fill");
const icon = document.getElementById("progress-icon");
const description = document.getElementById("progress-description");

const skillData = {

    HTML5:{
        level:95,
        icon:"fab fa-html5",
        description:"Semantic HTML, Forms, Accessibility, Responsive Structure."
    },

    CSS3:{
        level:90,
        icon:"fab fa-css3-alt",
        description:"Flexbox, Grid, Animations, Responsive Design."
    },

    JavaScript:{
        level:85,
        icon:"fab fa-js",
        description:"DOM, ES6+, Fetch API, Async/Await."
    },

    PHP:{
        level:80,
        icon:"fab fa-php",
        description:"CRUD, Sessions, Authentication, Backend."
    },

    MySQL:{
        level:80,
        icon:"fas fa-database",
        description:"SQL Queries, Database Design, CRUD."
    },

    "C++":{
        level:75,
        icon:"fas fa-code",
        description:"OOP, STL, Algorithms, Problem Solving."
    },

    Git:{
        level:80,
        icon:"fab fa-git-alt",
        description:"Version Control, Branching, Collaboration."
    },

    GitHub:{
        level:85,
        icon:"fab fa-github",
        description:"Repositories, Pull Requests, Team Workflow."
    },

    Bootstrap:{
        level:80,
        icon:"fab fa-bootstrap",
        description:"Responsive Layouts, Components, Utilities."
    },

    "Data Structures & Algorithms":{
        level:70,
        icon:"fas fa-code-branch",
        description:"Arrays, Linked Lists, Trees, Sorting, Searching."
    }

};

function activateSkill(card){

    skills.forEach(c => {
        c.classList.remove("active");
        c.setAttribute("aria-pressed", "false");
    });

    card.classList.add("active");
    card.setAttribute("aria-pressed", "true");

    const skill = card.dataset.skill;

    const data = skillData[skill];

    title.textContent = skill;

    percent.textContent = data.level + "%";

    description.textContent = data.description;

    icon.className = data.icon;

    fill.style.width = "0";

    setTimeout(()=>{

        fill.style.width = data.level + "%";

    },100);

}

skills.forEach(card=>{

    card.addEventListener("click", () => activateSkill(card));

    // Keyboard accessibility (Enter / Space)
    card.addEventListener("keydown", (e) => {

        if (e.key === "Enter" || e.key === " ") {

            e.preventDefault();
            activateSkill(card);

        }

    });

});

// ==========================
// CONTACT FORM SUBMISSION
// ==========================

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        formStatus.textContent = "Sending...";

        try {

            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {

                formStatus.textContent = "Thanks! Your message has been sent.";
                contactForm.reset();

            } else {

                formStatus.textContent = "Something went wrong. Please email me directly.";

            }

        } catch (err) {

            formStatus.textContent = "Something went wrong. Please email me directly.";

        }

    });
    

}
/* =========================================
   CUSTOM MOUSE CURSOR
========================================= */

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {

    let mouseX = 0;
    let mouseY = 0;

    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        // Small dot follows immediately
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth movement for outer ring
    function animateCursor() {

        outlineX += (mouseX - outlineX) * 0.30;
        outlineY += (mouseY - outlineY) * 0.30;

        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();


    // Elements that should make the cursor grow
    const hoverElements = document.querySelectorAll(
        "a, button, .project-card, input, textarea, .skill-card, .social-link"
    );

    hoverElements.forEach((element) => {

        element.addEventListener("mouseenter", () => {
            cursorOutline.classList.add("cursor-hover");
        });

        element.addEventListener("mouseleave", () => {
            cursorOutline.classList.remove("cursor-hover");
        });
    });


    // Click effect
    document.addEventListener("mousedown", () => {
        cursorOutline.classList.add("cursor-click");
    });

    document.addEventListener("mouseup", () => {
        cursorOutline.classList.remove("cursor-click");
    });
}
/* =========================
   BACK TO TOP
========================= */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });
}

/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                revealObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {
    revealObserver.observe(element);
});