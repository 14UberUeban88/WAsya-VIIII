// Первый промис: проверка уровня пользователя (1 секунда)
function checkUserLevel(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === 100) {
        resolve({ id: 100, level: 5 });
      } else {
        reject(new Error("Пользователь не найден"));
      }
    }, 1000);
  });
}

// Второй промис: получение списка достижений (1 секунда, успех 80%)
function checkUserAchievements() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() < 0.80; // 80% вероятность успеха
      if (isSuccess) {
        resolve(['Медаль за старание', 'Сертификат']);
      } else {
        reject(new Error("Достижения недоступны"));
      }
    }, 1000);
  });
}

// Главная асинхронная функция загрузки прогресса
async function loadUserProgress(userId) {
  try {
    // 1. Загружаем и проверяем уровень пользователя
    const userProgress = await checkUserLevel(userId);
    console.log(`Пользователь ${userProgress.id}, уровень: ${userProgress.level}`);

    // 2. Загружаем список достижений
    const achievements = await checkUserAchievements();
    // Объединяем элементы массива в строку через запятую с пробелом
    const achievementsString = achievements.join(', ');
    console.log(`Достижения: ${achievementsString}`);

    // 3. Выводим итоговое сообщение при успешном выполнении обоих этапов
    console.log(`Итог: Пользователь ${userProgress.id}, уровень: ${userProgress.level}, достижения: ${achievementsString}`);

  } catch (error) {
    // Блок catch перехватывает ошибку с любого из двух этапов await
    console.log(`Ошибка: ${error.message}`);
  }
}

// Примеры использования функции для проверки:

// Пример 1: Успешный запуск (если повезет с 80% вероятностью для достижений)
loadUserProgress(100);

// Пример 2: Заведомая ошибка «Пользователь не найден» (id не равен 100)
// loadUserProgress(55);
