// Функция для генерации всех перестановок строки
function getPermutations(str) {
  // Обработка крайних случаев: если это не строка, возвращаем пустой массив
  if (typeof str !== "string") {
    return [];
  }

  // Базовый случай рекурсии: если строка пустая или из 1 символа, возвращаем её в массиве
  if (str.length <= 1) {
    return [str];
  }

  // Коллекция для хранения уникальных перестановок (чтобы избежать дубликатов)
  let result = new Set();

  // Рекурсивный случай: перебираем каждый символ в строке
  for (let i = 0; i < str.length; i++) {
    // Выбираем один символ, который будем фиксировать на текущем шаге
    let currentLetter = str[i];

    // Вырезаем этот символ из строки, чтобы получить оставшуюся часть
    // Соединяем всё, что было ДО текущего символа, и всё, что ПОСЛЕ него
    let remainingLetters = str.slice(0, i) + str.slice(i + 1);

    // Рекурсивно вызываем функцию для оставшихся символов
    let subPermutations = getPermutations(remainingLetters);

    // Объединяем зафиксированный символ с каждой из полученных подперестановок
    for (let j = 0; j < subPermutations.length; j++) {
      let combined = currentLetter + subPermutations[j];
      // Добавляем готовую перестановку в наш Set
      result.add(combined);
    }
  }

  // Превращаем Set обратно в массив и возвращаем результат
  return Array.from(result);
}

// --- Проверка работы программы ---

console.log("--- Тест со строкой 'abc' ---");
const test1 = "abc";
console.log("Входная строка:", test1);
console.log("Все перестановки:", getPermutations(test1));
console.log("Количество перестановок (должно быть 6):", getPermutations(test1).length);

console.log("\n--- Тест на крайние случаи (0 и 1 символ) ---");
console.log("Пустая строка:", getPermutations("")); // Ожидаем [""]
console.log("Один символ:", getPermutations("a"));  // Ожидаем ["a"]

console.log("\n--- Тест со строкой с повторяющимися символами 'aab' ---");
const test2 = "aab";
console.log("Входная строка:", test2);
console.log("Все уникальные перестановки:", getPermutations(test2)); // Ожидаем 3 варианта вместо 6
