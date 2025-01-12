// HOVER JS: Creates a custom cursor and updates its position on mouse movement
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');

const cursorDot = document.createElement('div');
cursorDot.classList.add('custom-cursor-dot');
cursor.appendChild(cursorDot);

document.body.appendChild(cursor);

// Throttle mousemove events to improve performance
let lastMoveTime = 0;

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastMoveTime > 16) { // Update every ~16ms (~60fps)
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        lastMoveTime = now;
    }
});

// Handles hover effects for elements with the 'hover' class
const hoverElements = document.querySelectorAll('.hover');

hoverElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
        cursor.style.width = '25px';
        cursor.style.height = '25px';
        cursor.style.backgroundColor = '#F7D148Bf';
        cursor.style.borderColor = '#F7D1483f';
        cursorDot.style.backgroundColor = '#212653';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.width = '15px';
        cursor.style.height = '15px';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.borderColor = '#212653';
        cursorDot.style.backgroundColor = '#F7D148';
    });
});

// Handles cursor color change when hovering over video elements
const videoElements = document.querySelectorAll('video');

videoElements.forEach((video) => {
    video.addEventListener('mouseenter', () => {
        cursor.style.backgroundColor = '#FFFFFF';
        cursor.style.borderColor = '#FFFFFF';
        cursorDot.style.backgroundColor = '#FFFFFF';
    });

    video.addEventListener('mouseleave', () => {
        cursor.style.backgroundColor = 'transparent';
        cursor.style.borderColor = '#212653';
        cursorDot.style.backgroundColor = '#F7D148';
    });
});

//-------------------------------------------------------------------------------------

// NAVBAR JS: Changes navbar visibility and background color based on scroll position
window.addEventListener('scroll', function () {
    var navbar = document.getElementById('navbar');
    var catalogue = document.querySelector('.catalogue');

    // Hide navbar if the catalogue section is scrolled past
    if (catalogue) {
        var catalogueTop = catalogue.getBoundingClientRect().top;
        navbar.classList.toggle('navbar-hidden', catalogueTop <= 0);
    }

    var portfolio = document.getElementById('portfolio');
    if (portfolio) {
        var portfolioTop = portfolio.getBoundingClientRect().top;
        navbar.classList.toggle('navbar-hidden', portfolioTop <= 0);
    }

    // Change navbar color when scrolled past section2
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

//-------------------------------------------------------------------------------------

// LAST VISITED LINK JS: Stores and redirects to the last visited link

document.addEventListener('DOMContentLoaded', () => {
    const currentUrl = window.location.href;
    const lastVisitedLink = localStorage.getItem('lastVisitedLink');

    // Store the current URL as the last visited link if it's part of your domain
    if (currentUrl.startsWith('https://deathiie.github.io/daphanal.github.io/')) {
        localStorage.setItem('lastVisitedLink', currentUrl);
    }

    // Redirect to the last visited link if we're on the main page and a link exists
    if (window.location.pathname === '/' && lastVisitedLink) {
        const goToLastPage = confirm("Do you want to go back to your last visited page?");
        if (goToLastPage) {
            window.location.href = lastVisitedLink;
        }
    }
});

//-------------------------------------------------------------------------------------

// CONTACT NUMBER JS: Copies the phone number to clipboard and opens dialer on mobile
function copyPhone() {
    const phoneNumber = '+6597695765';
    navigator.clipboard.writeText(phoneNumber)
        .then(() => alert('Phone number copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err));

    // Open phone dialer on mobile devices
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

// EMAIL JS: Copies the email address to clipboard and opens the default email app
function copyOrOpenEmail() {
    const email = "Daphanal.s@gmail.com";
    navigator.clipboard.writeText(email)
        .then(() => {
            alert("Email address copied to clipboard!");
            window.location.href = `mailto:${email}`;
        })
        .catch(err => console.error("Failed to copy email: ", err));
}

//-------------------------------------------------------------------------------------

// NEW TAB JS: Opens a given URL in a new tab
function openNewTab(url) {
    window.open(url, '_blank');
}
