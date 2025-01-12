// HOVER JS
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');

const cursorDot = document.createElement('div');
cursorDot.classList.add('custom-cursor-dot');
cursor.appendChild(cursorDot);

document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

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

// NAVBAR JS
window.addEventListener('scroll', function () {
    var navbar = document.getElementById('navbar');
    var catalogue = document.querySelector('.catalogue');

    if (catalogue) {
        var catalogueTop = catalogue.getBoundingClientRect().top;
        navbar.classList.toggle('navbar-hidden', catalogueTop <= 0);
    }

    var portfolio = document.getElementById('portfolio');
    if (portfolio) {
        var portfolioTop = portfolio.getBoundingClientRect().top;
        navbar.classList.toggle('navbar-hidden', portfolioTop <= 0);
    }

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

// Filter Tag JS
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');
    let activeFilters = [];

    const urlParams = new URLSearchParams(window.location.search);
    const initialTag = urlParams.get('tag');

    if (initialTag) {
        activeFilters = initialTag.split(','); // Handle multiple tags from URL
        activeFilters.forEach(tag => {
            const button = Array.from(filterButtons).find(btn => btn.getAttribute('data-tag') === tag);
            if (button) button.classList.add('active');
        });
        filterGallery(activeFilters);
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tag = button.getAttribute('data-tag');

            if (button.classList.contains('active')) {
                button.classList.remove('active');
                activeFilters = activeFilters.filter(filter => filter !== tag);
            } else {
                button.classList.add('active');
                activeFilters.push(tag);
            }

            // Update the URL to reflect the selected tags
            const queryParams = new URLSearchParams();
            if (activeFilters.length > 0) {
                queryParams.set('tag', activeFilters.join(','));
            }
            history.replaceState(null, '', `${window.location.pathname}?${queryParams.toString()}`);

            // Save active filters in local storage
            localStorage.setItem('lastSelectedTags', JSON.stringify(activeFilters));

            filterGallery(activeFilters);
        });
    });

    function filterGallery(filters) {
        items.forEach(item => {
            const itemTags = item.getAttribute('data-tag').split(/[\s,]+/);
            const matches = filters.some(filter => itemTags.includes(filter));
            item.style.display = filters.length === 0 || matches ? 'block' : 'none';
        });
    }
});

//-------------------------------------------------------------------------------------

// Contact Number JS
function copyPhone() {
    const phoneNumber = '+6597695765';
    navigator.clipboard.writeText(phoneNumber)
        .then(() => alert('Phone number copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err));

    if (/Mobi|Android/i.test(navigator.userAgent)) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

// EMAIL JS
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

// NEW TAB JS
function openNewTab(url) {
    window.open(url, '_blank');
}

//-------------------------------------------------------------------------------------

// Last-selected JS (for redirect.html)
document.addEventListener('DOMContentLoaded', () => {
    const lastSelectedTags = localStorage.getItem('lastSelectedTags');
    
    if (lastSelectedTags) {
        const tags = JSON.parse(lastSelectedTags).join(',');
        // Redirect to works.html with the saved tags in the URL
        window.location.href = `works.html?tag=${tags}`;
    } else {
        // Redirect to works.html if no tags are saved
        window.location.href = 'works.html';
    }
});
