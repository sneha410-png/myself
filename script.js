// Typing effect for the span with class "typing-text"
const typed = new Typed('.typing-text', {
    strings: ['Frontend Developer', 'Web Designer', 'UI/UX Designer'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

// Select all sections and nav links
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let header = document.querySelector('.header');

// Get elements for mobile menu
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu (if menuIcon exists)
if (menuIcon) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('fa-x'); // Changes icon to 'X'
        navbar.classList.toggle('active'); // Activates mobile nav menu
    };
}


// Get elements for animations
let homeContent = document.querySelector('.home-content');
let homeImg = document.querySelector('.home-img');
let aboutHeading = document.querySelector('.about .heading');
let aboutImg = document.querySelector('.about-img');
let aboutContent = document.querySelector('.about-content');
let servicesHeading = document.querySelector('.services .heading');
let servicesBoxes = document.querySelectorAll('.services-box');
let skillsHeading = document.querySelector('.skills .heading');
let technicalSkillsColumn = document.querySelector('.technical-skills');
let professionalSkillsColumn = document.querySelector('.professional-skills');
let radialBars = document.querySelectorAll('.radial-bar');
let projectsHeading = document.querySelector('.projects .heading');
let projectBoxes = document.querySelectorAll('.projects-box');
let contactHeading = document.querySelector('.contact .heading');
let contactInfo = document.querySelector('.contact-info');
let contactForm = document.querySelector('.contact-form');


// Function to trigger animations for specific elements
function triggerAnimations() {
    // Header sticky
    header.classList.toggle('sticky', window.scrollY > 50);

    // Section and Nav Link active state
    sections.forEach(sec => {
        let top = window.scrollY;
        // Trigger when section is 40% into view from the top (or 60% from bottom of viewport)
        let offset = sec.offsetTop - (window.innerHeight * 0.4);
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        // Check if the current section is in the viewport
        if (top >= offset && top < offset + height) {
            // Remove 'active' from all links first
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            // Add 'active' to the current section's link
            const currentNavLink = document.querySelector('header nav a[href*=' + id + ']');
            if (currentNavLink) {
                currentNavLink.classList.add('active');
            }

            // Trigger section-specific animations when in view
            if (id === 'home') {
                homeContent?.classList.add('animate');
                homeImg?.classList.add('animate__zoomIn');
            } else if (id === 'about') {
                aboutHeading?.classList.add('animate');
                aboutImg?.classList.add('animate__zoomIn');
                aboutContent?.classList.add('animate');
            } else if (id === 'services') {
                servicesHeading?.classList.add('animate');
                servicesBoxes.forEach((box, index) => {
                    // Only add 'animate' if it's not already present to avoid re-triggering
                    if (box && !box.classList.contains('animate')) {
                        box.style.transitionDelay = `${index * 0.15}s`;
                        box.classList.add('animate');
                    }
                });
            } else if (id === 'skills') {
                skillsHeading?.classList.add('animate');
                
                // Add animate-left/right to skill columns
                technicalSkillsColumn?.classList.add('animate-left');
                professionalSkillsColumn?.classList.add('animate-right');

                // Trigger technical skill bar animations (widths)
                document.querySelectorAll('.skill-bar .bar span').forEach(span => {
                    const skillPercentageElement = span.parentElement.previousElementSibling?.querySelector('span');
                    if (skillPercentageElement && span.style.width === '0%') { // Only animate if not already set (initial width is 0%)
                        const width = skillPercentageElement.textContent; // e.g., "90%"
                        span.style.width = width;
                    }
                });

                // Trigger radial bar animations
                radialBars.forEach((bar, index) => {
                    if (bar && !bar.classList.contains('animate')) { // Only animate if not already present
                        bar.style.setProperty('--delay', `${index * 0.15}s`); // Set staggered delay
                        bar.classList.add('animate'); // Trigger CSS animation for container

                        const progressCircle = bar.querySelector('.progress');
                        if (progressCircle) {
                            // The radius 'r' of the circle is 46.5 (half of 93, if the SVG viewbox allows this and it's center at 50,50 within 100x100)
                            // For a 100px width/height SVG and circle cx/cy=50, r=46.5 means stroke-width is 3.5 each side (100 - 46.5*2)/2 = 3.5.
                            // However, if the circle's radius is relative to its container, and the container is 110px.
                            // The actual radius should be (container_size - stroke_width) / 2
                            // For 110px container and stroke-width 8, radius = (110 - 8) / 2 = 51.
                            // Circumference = 2 * PI * r = 2 * PI * 51 = 320.44.
                            // Let's use the 'r' value from the SVG directly: r="46.5". Circumference is 2 * PI * 46.5 = 292.16
                            // This value (292.16) is already correctly set in the CSS as `stroke-dasharray`.
                            const circumference = 2 * Math.PI * 46.5; 
                            const dataProgress = parseFloat(progressCircle.dataset.progress);
                            const offset = circumference - (dataProgress / 100) * circumference;
                            progressCircle.style.strokeDashoffset = offset;
                            progressCircle.style.opacity = 1; // Make the progress circle visible
                        }
                    }
                });

            } else if (id === 'projects') {
                projectsHeading?.classList.add('animate');
                projectBoxes.forEach((box, index) => {
                    if (box && !box.classList.contains('animate')) {
                        box.style.transitionDelay = `${index * 0.15}s`;
                        box.classList.add('animate');
                    }
                });
            } else if (id === 'contact') {
                contactHeading?.classList.add('animate');
                if (contactInfo && !contactInfo.classList.contains('animate')) {
                    contactInfo.classList.add('animate');
                }
                if (contactForm && !contactForm.classList.contains('animate')) {
                    contactForm.classList.add('animate');
                }
            }
        }
        // If you want animations to re-trigger on scroll back up and down,
        // you would add an 'else' block here to remove the 'animate' classes.
        // For a portfolio, usually, they animate once they enter view.
    });
}

// Initial call and attach to scroll event
document.addEventListener('DOMContentLoaded', () => {
    // Initial animations for elements in the first view (e.g., home section)
    // The home section elements already have initial animations in CSS (logo, home-content, home-img)
    // For consistency with other sections, you can uncomment these if you want JS to manage their initial visibility:
    // homeContent?.classList.add('animate');
    // homeImg?.classList.add('animate__zoomIn');

    // Trigger animations for elements currently in view on page load
    triggerAnimations(); 
});
window.addEventListener('scroll', triggerAnimations);
const circumference = 2 * Math.PI * 46.5; // Based on r="46.5" in HTML
const dataProgress = parseFloat(progressCircle.dataset.progress);
const offset = circumference - (dataProgress / 100) * circumference;
progressCircle.style.strokeDashoffset = offset;
progressCircle.style.opacity = 1; // Make the progress circle visible