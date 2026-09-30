// Находим нашу большую кнопку запуска на странице
const clearButton = document.getElementById("clear-btn");

// Вешаем на нее событие клика
clearButton.addEventListener("click", function() {
  
  // 1. Выбираем все поля ввода по имени тега
  const inputElements = document.querySelectorAll("input");

  // 2. Перебираем список циклом for...of
  for (const input of inputElements) {
    // 3. Устанавливаем значение в пустую строку
    input.value = "";
  }
  
});
