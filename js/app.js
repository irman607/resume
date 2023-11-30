// Scripts
window.addEventListener('DOMContentLoaded', event => {

    // Build dynamic navigation
    const dynamicNav = document.getElementById('dynamicNav');

    // Define the sections you want to include in the navigation
    const sections = ['about', 'experience', 'education', 'skills'];
    sections.forEach(sectionId => {
        // Create a new list item
        const listItem = document.createElement('li');
        listItem.classList.add('nav-item');

        // Create a new link
        const link = document.createElement('a');
        link.classList.add('nav-link', 'js-scroll-trigger');
        link.href = `#${sectionId}`;
        link.textContent = sectionId.charAt(0).toUpperCase() + sectionId.slice(1); // Capitalize the first letter

        // Append the link to the list item, and list item to the dynamicNav
        listItem.appendChild(link);
        dynamicNav.appendChild(listItem);
    });

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );

    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', (event) => {
            // Prevent default link behavior
            event.preventDefault();

            // Get the target section ID from the href attribute
            const targetSectionId = responsiveNavItem.getAttribute('href').substring(1);

            // Scroll to the target section smoothly
            document.getElementById(targetSectionId).scrollIntoView({
                behavior: 'smooth'
            });

            // Collapse the responsive navbar
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Highlight the active section while scrolling
    document.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 50 && rect.bottom >= 50) {
                const sectionId = section.getAttribute('id');
                const correspondingNavItem = document.querySelector(`#navbarResponsive a[href="#${sectionId}"]`);
                if (correspondingNavItem) {
                    responsiveNavItems.forEach(item => item.classList.remove('active'));
                    correspondingNavItem.classList.add('active');
                }
            }
        });
    });
});