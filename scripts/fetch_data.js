document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.querySelector('.projects');
    const preloader = document.querySelector('.preloader');

    const renderProjects = (projects) => {
        projects.forEach((project) => {
            const projectCard = document.createElement('article');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-card__content">
                    <p>${"Проект " + project.id}</p>
                    <p>${project.body}</p>
                </div>
                <div class="project-card__icon">
                    <span class="material-icons-outlined">search</span>
                </div>
            `;
            projectsContainer.appendChild(projectCard);
        });
    };

    const loadProjects = async () => {
        try {
            projectsContainer.classList.add('loading');
            projectsContainer.classList.remove('loaded');

            preloader.style.display = 'block';
            await new Promise((resolve) => setTimeout(resolve, 4000));

            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if (!response.ok) throw new Error('Ошибка сети');

            const data = await response.json();
            const filteredData = data.filter(getRandomFilter());
            renderProjects(filteredData);

            projectsContainer.classList.remove('loading');
            projectsContainer.classList.add('loaded');
        } catch (error) {
            projectsContainer.innerHTML = `<div class="error">Что-то пошло не так: ${error.message}</div>`;
        } finally {
            preloader.style.display = 'none';
        }
    };

    loadProjects();
});

const getRandomFilter = () => (Math.random() > 0.5 ? (item) => item.id >= 50 : (item) => item.id < 50);

