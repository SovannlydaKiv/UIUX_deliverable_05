const menuIcon = document.getElementById('menuIcon');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');
const userSignedIn = document.getElementById('userSignedIn');
const userSignedOut = document.getElementById('userSignedOut');
const logoutBtn = document.getElementById('logoutBtn');
const userNameEl = document.getElementById('userName');
const userProfilePic = document.getElementById('userProfilePic');
const userProfileIcon = document.getElementById('userProfileIcon');

function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
}

function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
}

function getURLParameter(param) {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
}

function checkLoginStatus() {
    const username = getURLParameter('username');
    if (username) {
        const user = {
            username: username,
            profilePic: '/image/default-profile.png'
        };
        displayUserProfile(user);
    } else {
        displayLoginPrompt();
    }
}

function displayUserProfile(user) {
    userSignedOut.style.display = 'none';
    userSignedIn.style.display = 'flex';
    userNameEl.textContent = user.username || 'User';
    if (user.profilePic && userProfilePic) {
        userProfilePic.style.display = 'block';
        userProfileIcon.style.display = 'none';
        userProfilePic.src = user.profilePic;
    } else {
        if (userProfilePic) userProfilePic.style.display = 'none';
        userProfileIcon.style.display = 'block';
    }
}

function displayLoginPrompt() {
    userSignedIn.style.display = 'none';
    userSignedOut.style.display = 'flex';
}

function logout() {
    // Redirect to homepage without params
    window.location.href = 'homepage_all.html';
}

// Preserve username in navigation links
function updateNavigationLinks() {
    const username = getURLParameter('username');
    
    if (username) {
        // Get all links on the page
        const links = document.querySelectorAll('a[href]');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Check if this is an internal HTML link that should have username
            if (href && 
                !href.startsWith('http') && 
                !href.startsWith('#') &&
                href.includes('.html') &&
                !href.includes('login.html') && 
                !href.includes('sign_in.html')) {
                
                // Remove any existing username parameter first
                let cleanHref = href.split('?')[0];
                
                // Add the username parameter
                const newHref = cleanHref + '?username=' + encodeURIComponent(username);
                link.setAttribute('href', newHref);
            }
        });
        
        // Also update bottom nav links that use #
        const navLinks = document.querySelectorAll('.bottom-nav a, .nav-item');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === '#') {
                // Keep them on the current page with username
                const currentPage = window.location.pathname.split('/').pop() || 'homepage_all.html';
                link.setAttribute('href', currentPage + '?username=' + encodeURIComponent(username));
            }
        });
        
        // Specifically update search nav button
        const searchNavBtn = document.getElementById('searchNavBtn');
        if (searchNavBtn) {
            searchNavBtn.setAttribute('href', 'search.html?username=' + encodeURIComponent(username));
        }
    }
}

menuIcon.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);
logoutBtn.addEventListener('click', logout);

// Check login status on page load
checkLoginStatus();

// Update navigation links to preserve username
updateNavigationLinks();

// Re-run updateNavigationLinks after a short delay to catch any dynamically loaded content
setTimeout(updateNavigationLinks, 100);