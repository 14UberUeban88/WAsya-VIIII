function analyzeData(data) {
  // Проверяем, что на вход передан массив и он не пустой
  if (!Array.isArray(data) || data.length === 0) {
    console.log("Ошибка: Передан пустой массив или некорректные данные.");
    return;
  }

  // Создаем Set для получения уникальных значений
  // Метод trim() используется для удаления случайных пробелов, как в примере ("банан\n")
  const uniqueItems = new Set(data.map(item => typeof item === 'string' ? item.trim() : item));

  // Создаем Map для подсчета количества вхождений каждого элемента
  const statistics = new Map();

  // Переменные для поиска самого популярного товара
  let mostPopularItem = null;
  let maxCount = 0;

  // Проходим по исходному массиву для заполнения Map и поиска самого частого элемента
  for (let rawItem of data) {
    // Приводим строку к чистому виду (убираем пробелы и переносы строк)
    const item = typeof rawItem === 'string' ? rawItem.trim() : rawItem;
    
    // Получаем текущее количество для этого элемента (если его нет, берем 0)
    const currentCount = statistics.get(item) || 0;
    const newCount = currentCount + 1;
    
    // Обновляем значение в Map
    statistics.set(item, newCount);

    // Если новое количество больше максимального, обновляем самый популярный товар
    // Строгое сравнение ">" гарантирует, что при равенстве выведется первый найденный
    if (newCount > maxCount) {
      maxCount = newCount;
      mostPopularItem = item;
    }
  }

  // Выводим уникальные элементы, преобразуя Set обратно в массив и объединяя через запятую
  console.log(`Уникальные товары: ${Array.from(uniqueItems).join(', ')}`);

  // Выводим статистику повторений
  console.log("Статистика:");
  for (let [key, value] of statistics) {
    console.log(`  - ${key}: ${value}`);
  }

  // Выводим самый популярный товар
  console.log(`Самый популярный товар: ${mostPopularItem}`);
}

// Пример использования из условия:
const products = ["яблоко", "банан", "яблоко", "апельсин", "банан\n", "яблоко"];
analyzeData(products);
