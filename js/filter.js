const filterButtons = document.querySelectorAll('.filter-btn');
        const sections = document.querySelectorAll('.section');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                sections.forEach(section => {
                    const categories = section.getAttribute('data-category');
                    if (filterValue === 'All' || (categories && categories.includes(filterValue))) {
                        section.style.display = 'block';
                    } else if (categories) {
                        section.style.display = 'none';
                    }
                });

                document.querySelector('.content').scrollTop = 0;
            });
        });