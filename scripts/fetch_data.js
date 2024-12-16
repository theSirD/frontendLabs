document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.querySelector(".projects");

  // Настроим опции для Spin.js
  const opts = {
    lines: 9, // Количество линий
    length: 19, // Длина линии
    width: 8, // Толщина линии
    radius: 20, // Радиус
    scale: 1, // Масштаб
    corners: 1, // Скругление углов
    speed: 1, // Скорость вращения
    rotate: 0, // Смещение вращения
    animation: "spinner-line-fade-quick", // Анимация линии
    direction: 1, // 1: по часовой стрелке
    color: "#3498db", // Цвет линий
    fadeColor: "transparent", // Цвет затухания
  };

  const spinnerTarget = document.createElement("div");
  spinnerTarget.className = "spinner-container";
  projectsContainer.appendChild(spinnerTarget);
  const spinner = new Spinner(opts).spin(spinnerTarget);

  const renderProjects = (projects) => {
    projects.forEach((project) => {
      const projectCard = document.createElement("article");
      projectCard.className = "project-card";
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
      projectsContainer.classList.add("loading");
      projectsContainer.classList.remove("loaded");

      await new Promise((resolve) => setTimeout(resolve, 4000));

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        Swal.fire({
            title: "Ошибка сети", // Заголовок уведомления
            icon: "error", // Иконка ошибки
            confirmButtonText: "Ок", // Текст на кнопке подтверждения
            confirmButtonColor: "#e74c3c", // Цвет кнопки подтверждения (красный для ошибки)
          });
      }

      const data = await response.json();
      const filteredData = data.filter(getRandomFilter());
      renderProjects(filteredData);

      projectsContainer.classList.remove("loading");
      projectsContainer.classList.add("loaded");
    } catch (error) {
      Swal.fire({
        title: "Не удалось получить данные", // Заголовок уведомления
        icon: "error", // Иконка ошибки
        confirmButtonText: "Ок", // Текст на кнопке подтверждения
        confirmButtonColor: "#e74c3c", // Цвет кнопки подтверждения (красный для ошибки)
      });
    } finally {
      // Останавливаем spinner и скрываем контейнер с ним
      spinner.stop();
      spinnerTarget.style.display = "none";
    }
  };

  loadProjects();
});

const getRandomFilter = () =>
  Math.random() > 0.5 ? (item) => item.id >= 50 : (item) => item.id < 50;
