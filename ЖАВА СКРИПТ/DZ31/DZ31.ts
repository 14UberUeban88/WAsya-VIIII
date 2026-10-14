// Сигнатура перегрузки 1: принимает только массив задач
function formatTasks(tasks: string[]): string;

// Сигнатура перегрузки 2: принимает массив задач и категорию
function formatTasks(tasks: string[], category: string): string;

// Единая реализация функции, совместимая с обеими сигнатурами
function formatTasks(tasks: string[], category?: string): string {
    // Объединяем элементы массива через запятую и пробел
    const joinedTasks = tasks.join(', ');
    
    // Если категория передана, добавляем её в качестве заголовка
    if (category) {
        return category + ': ' + joinedTasks;
    }
    
    // Если категории нет, возвращаем только объединенные задачи
    return joinedTasks;
}

// Примеры использования (Вывод результатов)

const myTasks = ['Купить молоко', 'Помыть окно', 'Позвонить врачу'];

// Вызов 1: только список задач
const result1 = formatTasks(myTasks);
console.log('Задачи: ' + result1); 
// Вывод: Задачи: Купить молоко, Помыть окно, Позвонить врачу

// Вызов 2: список задач и категория
const result2 = formatTasks(myTasks, 'Дом');
console.log('Задачи: ' + result2); 
// Вывод: Задачи: Дом: Купить молоко, Помыть окно, Позвонить врачу


// Проверка строгой типизации (Эксперимент с ошибкой)

const numbersArray =;

// Если раскомментировать строку ниже, TypeScript выдаст ошибку компиляции:
// Argument of type 'number[]' is not assignable to parameter of type 'string[]'.
// formatTasks(numbersArray);
