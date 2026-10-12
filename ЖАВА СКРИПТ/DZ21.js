async function fetchUserPosts(userId) {
  // Переменные для итогового вывода, доступные во всей функции
  let userName = "";
  let postsCount = 0;

  try {
    // 1. Первый запрос: Получение данных пользователя
    let userResponse;
    try {
      userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    } catch (networkError) {
      // Перехватываем ошибку, если запрос не дошел до сервера
      console.log(`Ошибка сети: ${networkError.message}`);
      return;
    }

    // Проверяем статус ответа пользователя
    if (userResponse.status === 404) {
      console.log("Ошибка: Пользователь не найден.");
      return;
    } else if (!userResponse.ok) {
      console.log(`Ошибка сервера: Статус ${userResponse.status}`);
      return;
    }

    // Десериализуем данные пользователя
    const userData = await userResponse.json();
    userName = userData.name;
    console.log(`Пользователь: ${userData.name}, email: ${userData.email}.`);


    // 2. Второй запрос: Получение постов пользователя
    let postsResponse;
    try {
      postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    } catch (networkError) {
      // Перехватываем ошибку сети для второго запроса
      console.log(`Ошибка сети: ${networkError.message}`);
      return;
    }

    // Проверяем статус ответа постов (должен быть строго 200)
    if (postsResponse.status !== 200) {
      console.log("Ошибка: Не удалось загрузить посты.");
      return;
    }

    // Десериализуем данные постов и считаем их количество
    const postsData = await postsResponse.json();
    postsCount = postsData.length;
    console.log(`Количество постов: ${postsCount}.`);


    // 3. Вывод итогового сообщения при успешном выполнении обоих запросов
    console.log(`Данные пользователя: ${userName}, постов: ${postsCount}.`);

  } catch (generalError) {
    // Защитный блок на случай непредвиденных ошибок (например, сбой парсинга JSON)
    console.log(`Непредвиденная ошибка: ${generalError.message}`);
  }
}

// Примеры использования функции для проверки:

// Пример 1: Успешный запрос (id существующего пользователя от 1 до 10)
fetchUserPosts(1);

// Пример 2: Ошибка 404 (пользователя с id 99 не существует на сервере)
// fetchUserPosts(99);
