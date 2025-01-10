
// Navbar JS//

//Scroll Change Navbar Color

window.addEventListener('scroll', function () {
    var navbar = document.getElementById('navbar');
    var catalogue = document.querySelector('.catalogue');
    var catalogueTop = catalogue.getBoundingClientRect().top;
  
    // Slide the navbar up when the catalogue section reaches the top of the viewport
    if (catalogueTop <= 0) {
      navbar.classList.add('navbar-hidden');
    } else {
      navbar.classList.remove('navbar-hidden');
    }
  
    // Change navbar color to yellow when scroll is past the second section
    var section2 = document.getElementById('section2');
    var section2Top = section2.offsetTop;
    
    if (window.scrollY > section2Top - 50) {
      navbar.classList.add('bg-warning');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('bg-warning');
      navbar.classList.add('bg-transparent');
    }
  });
  
  
    
// Navbar JS//

// Filter Tag JS //

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.col-xl-3');
    let activeFilters = [];

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tag = button.getAttribute('data-tag');

            // Toggle the active state of the button and update activeFilters
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                activeFilters = activeFilters.filter(filter => filter !== tag);
            } else {
                button.classList.add('active');
                activeFilters.push(tag);
            }

            // Update the gallery based on active filters
            filterGallery(activeFilters);
        });
    });

    function filterGallery(filters) {
        items.forEach(item => {
            const itemTags = item.getAttribute('data-tag').split(/[\s,]+/); // Split by space or comma
            const matches = filters.some(filter => itemTags.includes(filter));

            // Show the item if it matches any active filter or if no filters are selected
            if (filters.length === 0 || matches) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
});

// Filter Tag JS //




