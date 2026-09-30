// Глобальный массив для хранения пользователей
const users = [];

// Функция для добавления нового пользователя
function addUser(name, age) {
  // Проверка валидности данных: имя должно быть строкой, а возраст — числом больше 0
  if (typeof name !== "string" || name.trim() === "") {
    console.log("Ошибка: Имя должно быть непустой строкой.");
    return;
  }
  if (typeof age !== "number" || age <= 0 || isNaN(age)) {
    console.log("Ошибка: Возраст должен быть положительным числом.");
    return;
  }

  // Проверяем, существует ли уже пользователь с таким именем
  // Используем метод find, который ищет совпадение в массиве
  let exists = users.find(function(user) {
    return user.name.toLowerCase() === name.toLowerCase();
  });

  if (exists) {
    console.log("Ошибка: Пользователь с именем " + name + " уже существует.");
    return;
  }

  // Если всё хорошо, добавляем объект пользователя в глобальный массив
  users.push({ name: name, age: age });
}

// Функция для удаления пользователя по имени
function removeUser(name) {
  // Ищем индекс пользователя с таким именем в массиве
  let index = users.findIndex(function(user) {
    return user.name.toLowerCase() === name.toLowerCase();
  });

  // Если index равен -1, значит пользователь не найден
  if (index === -1) {
    console.log("Ошибка: Пользователь " + name + " не найден для удаления.");
    return;
  }

  // Удаляем 1 элемент по найденному индексу
  users.splice(index, 1);
}

// Функция для вывода информации о конкретном пользователе
function getUserInfo(name) {
  // Ищем пользователя в массиве
  let foundUser = users.find(function(user) {
    return user.name.toLowerCase() === name.toLowerCase();
  });

  // Если не нашли, выводим ошибку
  if (!foundUser) {
    console.log("Пользователь " + name + " не найден");
    return;
  }

  // Выводим информацию по шаблону из задания
  console.log("Имя: " + foundUser.name + ", Возраст: " + foundUser.age);
}

// --- Проверка работы программы (Пример взаимодействия из задания) ---

addUser("Анна", 25);   
addUser("Иван", 30);   

getUserInfo("Анна");  // Выведет: Имя: Анна, Возраст: 25   

removeUser("Иван");   
getUserInfo("Иван");  // Выведет: Пользователь Иван не найден   

addUser("Анна", 28);  // Выведет: Ошибка: Пользователь с именем Анна уже существует 

console.log("\n--- Тест обработки некорректных данных ---");
addUser("", 20);      // Ошибка имени
addUser("Олег", -5);  // Ошибка возраста
addUser("Олег", "25"); // Ошибка типа возраста (строка вместо числа)
