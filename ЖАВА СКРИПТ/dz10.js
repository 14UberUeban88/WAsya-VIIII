// Функция для форматирования российского номера телефона
function formatPhoneNumber(phone) {
  // Проверяем, что передана строка, и убираем случайные пробелы по краям
  if (typeof phone !== "string") {
    return "Ошибка: неверный формат номера телефона.";
  }
  
  let cleaned = phone.trim();

  // 1. Проверяем валидность: номер должен начинаться с +7 или 8
  let startsWithPlus7 = cleaned.startsWith("+7");
  let startsWith8 = cleaned.startsWith("8");

  if (!startsWithPlus7 && !startsWith8) {
    return "Ошибка: неверный формат номера телефона.";
  }

  // 2. Выделяем только чистые цифры номера без кода страны
  let digits = "";
  if (startsWithPlus7) {
    digits = cleaned.slice(2); // Отрезаем "+7"
  } else if (startsWith8) {
    digits = cleaned.slice(1); // Отрезаем "8"
  }

  // Убеждаемся, что в оставшейся части ровно 10 цифр (код оператора + номер)
  // и что там нет посторонних символов
  if (digits.length !== 10 || isNaN(Number(digits))) {
    return "Ошибка: неверный формат номера телефона.";
  }

  // 3. Форматируем номер по шаблону: +7 XXX XXX XXXX
  let code = digits.slice(0, 3);   // Первые 3 цифры (например, 916)
  let part1 = digits.slice(3, 6);  // Следующие 3 цифры (например, 123)
  let part2 = digits.slice(6);     // Последние 4 цифры (например, 4567)

  return "+7 " + code + " " + part1 + " " + part2;
}

// --- Тестирование функции из задания ---

const phone1 = "89161234567"; 
console.log(formatPhoneNumber(phone1));  // Выведет: +7 916 123 4567 

const phone2 = "+79161234567"; 
console.log(formatPhoneNumber(phone2));  // Выведет: +7 916 123 4567 

const phone3 = "1234567890"; 
console.log(formatPhoneNumber(phone3));  // Выведет: Ошибка: неверный формат номера телефона.

// Дополнительные тесты на ошибки
console.log(formatPhoneNumber("8916123")); // Ошибка (слишком короткий)
console.log(formatPhoneNumber(null));      // Ошибка (не строка)
