// Исходный массив с заказами
const orders = [ 
  { orderId: 101, price: 250 }, 
  { orderId: 102, price: 150 }, 
  { orderId: 103, price: 350 }, 
  { orderId: 104, price: 200 } 
];

// Функция пузырьковой сортировки заказов по возрастанию цены
function bubbleSortOrders(arr) {
  // Обработка ошибок: если это не массив или он пустой, ничего не делаем
  if (!Array.isArray(arr) || arr.length === 0) {
    return;
  }

  let n = arr.length;

  // Внешний цикл для количества проходов по массиву
  for (let i = 0; i < n - 1; i++) {
    // Флаг для оптимизации: были ли обмены в текущем проходе
    let swapped = false;

    // Внутренний цикл для сравнения соседних пар элементов
    // n - 1 - i нужно, чтобы не проверять уже отсортированные элементы в конце
    for (let j = 0; j < n - 1 - i; j++) {
      
      // Защита от некорректных данных: проверяем, что у обоих элементов есть цена
      // Если у какого-то элемента нет price, считаем её равной 0 (или можно пропустить)
      let priceA = arr[j] && typeof arr[j].price === 'number' ? arr[j].price : 0;
      let priceB = arr[j + 1] && typeof arr[j + 1].price === 'number' ? arr[j + 1].price : 0;

      // Если левый элемент больше правого, меняем их местами
      if (priceA > priceB) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        
        // Меняем флаг, так как обмен произошел
        swapped = true;
      }
    }

    // Оптимизация: если за целый проход по массиву обменов не было,
    // значит массив уже отсортирован, и можно досрочно выйти из цикла
    if (!swapped) {
      break;
    }
  }
}

// Функция для красивого вывода заказов в консоль
function printOrders(arr) {
  // Если массив пустой или некорректный, пишем сообщение об этом
  if (!Array.isArray(arr) || arr.length === 0) {
    console.log("Список заказов пуст.");
    return;
  }

  // Проходим по массиву и выводим каждый заказ по шаблону
  for (let i = 0; i < arr.length; i++) {
    let order = arr[i];
    // Если в объекте нет нужных полей, выводим предупреждение
    if (!order || order.orderId === undefined || order.price === undefined) {
      console.log("Ошибка: Некорректные данные заказа");
    } else {
      console.log("Номер заказа: " + order.orderId + ", Стоимость: " + order.price);
    }
  }
}

// --- Проверка работы программы ---

console.log("--- Стандартный тест ---");
bubbleSortOrders(orders); 
printOrders(orders); 

console.log("\n--- Тест с некорректными данными (без price) ---");
const brokenOrders = [
  { orderId: 201, price: 500 },
  { orderId: 202 }, // Тут нет цены
  { orderId: 203, price: 100 }
];
bubbleSortOrders(brokenOrders);
printOrders(brokenOrders);
