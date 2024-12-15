document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("table-form");
  const tableContainer = document.getElementById("table-container");
  const saveButton = document.getElementById("save-settings");
  const loadButton = document.getElementById("load-settings");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const days = parseInt(formData.get("days"), 10);
    const lessons = parseInt(formData.get("lessons"), 10);
    const language = formData.get("language");

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    const daysHeader = document.createElement("th");
    daysHeader.textContent = language === "ru" ? "День" : "Day";
    headerRow.appendChild(daysHeader);

    for (let i = 1; i <= lessons; i++) {
      const lessonHeader = document.createElement("th");
      lessonHeader.textContent =
        language === "ru" ? `Урок ${i}` : `Lesson ${i}`;
      headerRow.appendChild(lessonHeader);
    }
    table.appendChild(headerRow);

    for (let i = 1; i <= days; i++) {
      const row = document.createElement("tr");
      const dayCell = document.createElement("td");
      dayCell.textContent = `${i}`;
      row.appendChild(dayCell);

      for (let j = 1; j <= lessons; j++) {
        const cell = document.createElement("td");
        cell.textContent = "-";
        row.appendChild(cell);
      }
      table.appendChild(row);
    }

    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
  });

  
  saveButton.addEventListener("click", () => {
    const formData = new FormData(form);
    const settings = {
      days: formData.get("days"),
      lessons: formData.get("lessons"),
      language: formData.get("language"),
    };
    localStorage.setItem("tableSettings", JSON.stringify(settings));
    alert("Настройки сохранены!");
  });


  loadButton.addEventListener("click", () => {
    const savedSettings = localStorage.getItem("tableSettings");
    if (savedSettings) {
      const { days, lessons, language } = JSON.parse(savedSettings);
      form.days.value = days;
      form.lessons.value = lessons;
      form.language.value = language;
      alert("Настройки загружены!");
    } else {
      alert("Настройки не найдены!");
    }
  });
});
