function initScrollToTopButton() {
    const scrollToTopButton = document.querySelector('.scroll-to-top');

    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', function(event) {
            event.preventDefault();
            scrollToTopSmoothly();
        });
    }
}

function scrollToTopSmoothly() {
    const scrollDuration = 600;
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    const start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollBy(0, scrollStep);
        if (progress < scrollDuration) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const linkspan = document.querySelector('.linkspan');
    const footerParagraph = linkspan ? linkspan.closest('p') : null;

    console.log("DOM Content Loaded");

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            console.log("Menu toggle clicked");
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('toggle');
        });
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth >= 769) {
            console.log("Window resized to large screen");
            navLinks.classList.remove('active');
            menuToggle.classList.remove('toggle');
        }
    });

    if (linkspan && footerParagraph) {
        linkspan.addEventListener('mouseover', function() {
            this.style.color = 'white';
            footerParagraph.classList.add('change-color');
        });

        linkspan.addEventListener('mouseout', function() {
            this.style.color = '#61dced';
            footerParagraph.classList.remove('change-color');
        });
    }

    initScrollToTopButton();
});
