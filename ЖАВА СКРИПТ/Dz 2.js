const firstInput = prompt("Введите первое число:");
const secondInput = prompt("Введите второе число:");

// Преобразуем введенные значения в числа
const x = Number(firstInput);
const y = Number(secondInput);

// Проверяем корректность ввода (на буквы, пустые строки и деление на ноль)
if (Number.isNaN(x) || firstInput.trim() === "" || 
    Number.isNaN(y) || secondInput.trim() === "") {
    alert("Ошибка: Одно или оба введенных значения не являются числами.");
} else if (y === 0) {
    alert("Ошибка: Деление на ноль невозможно.");
} else {
    // Находим остаток от деления
    const remainder = x % y;

    // Проверяем делимость без остатка
    if (remainder === 0) {
        alert(`Число ${x} делится на ${y} без остатка.`);
    } else {
        alert(`Число ${x} не делится на ${y}. Остаток: ${remainder}.`);
    }
}
