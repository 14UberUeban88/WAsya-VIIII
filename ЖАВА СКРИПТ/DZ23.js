// Имитация первого промиса: проверка существования заказа (0.5 сек)
function checkOrder(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof orderId === 'number' && orderId >= 1 && orderId <= 1000) {
        resolve(`Заказ ${orderId} найден`);
      } else {
        reject(new Error("Заказ не найден"));
      }
    }, 500);
  });
}

// Имитация второго промиса: проверка доступности товара (0.8 сек, успех 90%)
function checkProduct() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isAvailable = Math.random() < 0.90; // 90% вероятность успеха
      if (isAvailable) {
        resolve({ product: "Ноутбук", price: 50000 });
      } else {
        reject(new Error("Товар отсутствует на складе"));
      }
    }, 800);
  });
}

// Имитация третьего промиса: расчет доставки (0.3 сек, успех 95%)
function calculateDelivery() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() < 0.95; // 95% вероятность успеха
      if (isSuccess) {
        resolve(1000);
      } else {
        reject(new Error("Не удалось рассчитать стоимость доставки"));
      }
    }, 300);
  });
}

// Главная асинхронная функция обработки заказа
async function processOrder(orderId) {
  try {
    // 1. Проверяем заказ
    const orderStatus = await checkOrder(orderId);
    console.log(orderStatus);

    // 2. Проверяем доступность товара
    const productInfo = await checkProduct();
    console.log(`Товар: ${productInfo.product}, Цена: ${productInfo.price}`);

    // 3. Рассчитываем доставку
    const deliveryCost = await calculateDelivery();
    console.log(`Доставка: ${deliveryCost}`);

    // Итоговый расчет при успешном выполнении всех этапов
    const totalCost = productInfo.price + deliveryCost;
    console.log(`Итог: ${productInfo.product} за ${totalCost}`);

  } catch (error) {
    // Единый блок catch перехватывает ошибку на любом из этапов await
    console.log(`Ошибка: ${error.message}`);
  }
}

// Примеры вызова функции для проверки:

// Пример 1: Успешный заказ (если повезет с вероятностью) или случайная ошибка товара/доставки
processOrder(500);

// Пример 2: Заведомая ошибка валидации (id вне диапазона от 1 до 1000)
// processOrder(2000);
