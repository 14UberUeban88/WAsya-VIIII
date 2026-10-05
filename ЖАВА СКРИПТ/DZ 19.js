// 1. Создаем функцию checkQuizResult, которая принимает ответ и возвращает первый промис
function checkQuizResult(answer) {
    // Этот первый промис проверяет правильность ответа через 1 секунду
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (answer === "correct") {
                // Если ответ правильный, возвращаем объект с баллами
                resolve({ score: 10 });
            } else {
                // Если ответ не совпал, отклоняем промис с ошибкой
                reject("Неверный ответ");
            }
        }, 1000); // Задержка 1 секунда
    });
}

// 2. Функция для создания второго промиса (проверка бонуса)
function getBonusMessage() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Генерируем случайное число от 0 до 1 для проверки вероятности в 90%
            let isSuccess = Math.random() < 0.9;
            
            if (isSuccess) {
                // С вероятностью 90% возвращаем объект с бонусом
                resolve({ bonus: "Отличная работа!" });
            } else {
                // С вероятностью 10% генерируем ошибку
                reject("Бонус недоступен");
            }
        }, 1000); // Тоже задержка 1 секунда
    });
}

// ПРИМЕР ИСПОЛЬЗОВАНИЯ И ЧЕЙНИНГА (Задание 3, 4, 5)

// Передаем в функцию ответ (можно поменять на "wrong" для проверки ошибки)
let userAnswer = "correct"; 

checkQuizResult(userAnswer)
    .then((result) => {
        // Сюда попадаем, если ответ верный. Сохраняем баллы во внешнюю переменную,
        // чтобы использовать её в следующем звене .then
        let currentScore = result.score;
        
        // Запускаем и возвращаем второй промис для бонуса (это и есть чейнинг)
        return getBonusMessage().then((bonusResult) => {
            // Возвращаем общий объект с баллами и бонусом дальше по цепочке
            return { score: currentScore, bonus: bonusResult.bonus };
        });
    })
    .then((finalData) => {
        // 4. Выводим итоговый успешный результат в консоль
        console.log(`Результат: ${finalData.score} баллов, бонус: ${finalData.bonus}`);
    })
    .catch((error) => {
        // 5. Ловим любую ошибку (и от неверного ответа, и от поломки бонуса)
        console.log(`Ошибка: ${error}`);
    });
