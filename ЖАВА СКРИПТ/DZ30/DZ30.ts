const bookTitle: string = "Капитанская дочка";
const bookPages: number = 256;
const isAvailable: boolean = true;
const categories: string[] = ["Классика", "Исторический роман", "Школьная программа"];

// Преобразуем булево значение в понятный текст для вывода
const statusText: string = isAvailable ? "Да" : "Нет";

// Вывод информации о книге в консоль
console.log(`Книга: ${bookTitle}, ${bookPages} стр., доступна: ${statusText}, категории: ${categories.join(", ")}`);
