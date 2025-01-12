

// HOVER JS
// Create a custom cursor element
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');

// Create the small dot in the middle
const cursorDot = document.createElement('div');
cursorDot.classList.add('custom-cursor-dot');
cursor.appendChild(cursorDot);

document.body.appendChild(cursor);

// Update cursor position on mousemove
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Add event listeners for hover effect on elements with 'hover' class
const hoverElements = document.querySelectorAll('.hover');

hoverElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
        cursor.style.width = '25px';
        cursor.style.height = '25px';
        cursor.style.backgroundColor = '#F7D148Bf';   // Fill the cursor with yellow
        cursor.style.borderColor = '#F7D1483f';       // Change border to yellow
        cursorDot.style.backgroundColor = '#212653';  // Change dot color to dark blue
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.width = '15px';
        cursor.style.height = '15px';
        cursor.style.backgroundColor = 'transparent'; // Remove the fill
        cursor.style.borderColor = '#212653';         // Revert border to blue
        cursorDot.style.backgroundColor = '#F7D148';  // Revert dot color to yellow
    });
});

// Add event listeners for video elements to change cursor color to white
const videoElements = document.querySelectorAll('video');

videoElements.forEach((video) => {
    video.addEventListener('mouseenter', () => {
        cursor.style.backgroundColor = '#FFFFFF';      // Fill cursor with white
        cursor.style.borderColor = '#FFFFFF';          // Change border to white
        cursorDot.style.backgroundColor = '#FFFFFF';   // Change dot color to white
    });

    video.addEventListener('mouseleave', () => {
        cursor.style.backgroundColor = 'transparent'; // Remove fill when leaving video
        cursor.style.borderColor = '#212653';         // Revert border to blue
        cursorDot.style.backgroundColor = '#F7D148';  // Revert dot color to yellow
    });
});


//-------------------------------------------------------------------------------------


// NAVBAR JS

// Scroll Change Navbar Color
window.addEventListener('scroll', function () {
  var navbar = document.getElementById('navbar');

  // Check for catalogue section (index.html)
  var catalogue = document.querySelector('.catalogue');
  if (catalogue) {
      var catalogueTop = catalogue.getBoundingClientRect().top;
      if (catalogueTop <= 0) {
          navbar.classList.add('navbar-hidden');
      } else {
          navbar.classList.remove('navbar-hidden');
      }
  }

  // Check for portfolio section (work.html)
  var portfolio = document.getElementById('portfolio');
  if (portfolio) {
      var portfolioTop = portfolio.getBoundingClientRect().top;
      if (portfolioTop <= 0) {
          navbar.classList.add('navbar-hidden');
      } else {
          navbar.classList.remove('navbar-hidden');
      }
  }

  // Change navbar color to yellow when scroll is past the second section
  var section2 = document.getElementById('section2');
  if (section2) {
      var section2Top = section2.offsetTop;
      if (window.scrollY > section2Top - 50) {
          navbar.classList.add('bg-warning');
          navbar.classList.remove('bg-transparent');
      } else {
          navbar.classList.remove('bg-warning');
          navbar.classList.add('bg-transparent');
      }
  }
});





// NAVBAR JS

//-------------------------------------------------------------------------------------

// Filter Tag JS
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');
  let activeFilters = [];

  // Check URL for tag query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const initialTag = urlParams.get('tag');

  if (initialTag) {
      // Simulate a click on the corresponding filter button
      const initialButton = Array.from(filterButtons).find(button => button.getAttribute('data-tag') === initialTag);
      if (initialButton) {
          initialButton.classList.add('active');
          activeFilters.push(initialTag);
          filterGallery(activeFilters);
      }
  }

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

//-------------------------------------------------------------------------------------

// Contact Number JS

function copyPhone() {
  const phoneNumber = '+6597695765'; // Your phone number here

  // Copy to clipboard
  navigator.clipboard.writeText(phoneNumber)
      .then(() => {
          alert('Phone number copied to clipboard!');
      })
      .catch(err => {
          console.error('Failed to copy: ', err);
      });

  // Open phone dialer on mobile
  if (/Mobi|Android/i.test(navigator.userAgent)) {
      window.location.href = `tel:${phoneNumber}`;
  }
}

// EMAIL JS

function copyOrOpenEmail() {
  const email = "Daphanal.s@gmail.com";

  // Copy email to clipboard
  navigator.clipboard.writeText(email).then(() => {
    alert("Email address copied to clipboard!");

    // Open the default email app after copying
    window.location.href = `mailto:${email}`;
  }).catch(err => {
    console.error("Failed to copy email: ", err);
  });
}


//-------------------------------------------------------------------------------------

// NEW TAB JS

function openNewTab(url) {
  window.open(url, '_blank'); // Opens the link in a new tab
}

//-------------------------------------------------------------------------------------

// Last-selected JS

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

      // Save active filters in local storage
      localStorage.setItem('lastSelectedTags', JSON.stringify(activeFilters));

      // Update the gallery based on active filters
      filterGallery(activeFilters);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const lastSelectedTags = localStorage.getItem('lastSelectedTags');
  
  if (lastSelectedTags) {
      const tags = JSON.parse(lastSelectedTags).join(',');
      window.location.href = `works.html?tag=${tags}`;
  } else {
      window.location.href = 'works.html'; // Default redirect if no tags are stored
  }
});