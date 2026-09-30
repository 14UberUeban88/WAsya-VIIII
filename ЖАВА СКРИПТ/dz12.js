// 1. Создаем объекты "Место работы"
const job1 = {
  place: "ООО Вектор",
  position: "Младший кадровик",
  year_start: 2020,
  year_end: 2022
};

const job2 = {
  place: "АО Технолоджис",
  position: "Ведущий специалист по кадрам",
  year_start: 2022,
  year_end: 2024
};

// Замораживаем объекты мест работы, чтобы прошлый опыт сотрудника нельзя было изменить
Object.freeze(job1);
Object.freeze(job2);

// 2. Создаем основной объект «Человек»
const employee = {};

// Используем Object.defineProperty для создания базовых анкетных полей
// Флаг enumerable: true делает поля видимыми в Object.keys() и циклах for...in
Object.defineProperty(employee, "lastName", {
  value: "Иванов",
  writable: false,      // Запрещает перезаписывать значение
  configurable: false,  // Запрещает удалять поле или менять его настройки
  enumerable: true      // Видно в Object.keys()
});

Object.defineProperty(employee, "firstName", {
  value: "Иван",
  writable: false,
  configurable: false,
  enumerable: true
});

Object.defineProperty(employee, "middleName", {
  value: "Иванович",
  writable: false,
  configurable: false,
  enumerable: true
});

// Добавляем массив мест работы
employee.work = [job1, job2];

// Замораживаем верхний уровень объекта сотрудника
Object.freeze(employee);


// --- Проверка работы защиты и вывод результатов ---

console.log("--- Список полей через Object.keys ---");
// Поля видны, так как мы указали enumerable: true
console.log(Object.keys(employee)); 

console.log("\n--- Информация о сотруднике ---");
console.log("Фамилия:", employee.lastName);
console.log("Места работы:", employee.work);

console.log("\n--- Проверка защиты (попытка изменений) ---");
// Пробуем изменить фамилию (в строгом режиме Node.js это вызовет ошибку, в обычном — просто проигнорируется)
employee.lastName = "Петров"; 
console.log("Фамилия после попытки изменить:", employee.lastName); // Останется "Иванов"

// Пробуем изменить должность в прошлом месте работы
employee.work[0].position = "Директор";
console.log("Должность после попытки изменить:", employee.work[0].position); // Останется "Младший кадровик"
