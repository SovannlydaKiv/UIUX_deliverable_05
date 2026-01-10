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
            if (user.profilePic) {
                userProfilePic.style.display = 'block';
                userProfileIcon.style.display = 'none';
                userProfilePic.src = user.profilePic;
            } else {
                userProfilePic.style.display = 'none';
                userProfileIcon.style.display = 'block';
            }
        }

        function displayLoginPrompt() {
            userSignedIn.style.display = 'none';
            userSignedOut.style.display = 'flex';
        }

        function logout() {
            // Clear the username from URL by redirecting to homepage without params
            window.location.href = 'homepage_all.html';
        }

        // Preserve username in navigation links
        function updateNavigationLinks() {
            const username = getURLParameter('username');
            console.log('Updating links, username:', username);
            if (username) {
                const links = document.querySelectorAll('a[href]');
                console.log('Found', links.length, 'links');
                links.forEach(link => {
                    const href = link.getAttribute('href');
                    console.log('Checking link:', href);
                    if (href && !href.startsWith('http') && href !== '#' && !href.includes('login') && !href.includes('sign_in')) {
                        // Add username parameter to the URL
                        const separator = href.includes('?') ? '&' : '?';
                        const newHref = href + separator + 'username=' + encodeURIComponent(username);
                        link.setAttribute('href', newHref);
                        console.log('Updated to:', newHref);
                    }
                });
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