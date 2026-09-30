// Создаем исходный объект книги с начальными полями
let libraryBook = {
  title: "Преступление и наказание",
  author: "Ф. М. Достоевский",
  genre: "Роман",
  year: 1866,
  available: true
};

// 1. Добавляем новое поле rating (оценка читателей)
libraryBook.rating = 4.8;

// 2. Изменяем значение поля available на противоположное
// Оператор ! (НЕ) превращает true в false (и наоборот)
libraryBook.available = !libraryBook.available;

// 3. Удаляем поле genre с помощью оператора delete
delete libraryBook.genre;

// Выводим финальный объект в консоль для проверки результата
console.log(libraryBook);
