"use strict";
// Определение enum для статусов задачи
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["ToDo"] = "ToDo";
    TaskStatus["InProgress"] = "InProgress";
    TaskStatus["Done"] = "Done";
})(TaskStatus || (TaskStatus = {}));
// Функция для отображения информации о задаче
function displayTask(task) {
    return `Название: "${task.title}", Статус: ${task.status}, Приоритет: ${task.priority}`;
}
// Создание корректного объекта задачи с числовым приоритетом
const task1 = {
    title: "Изучить TypeScript",
    status: TaskStatus.InProgress,
    priority: 1 // Корректно: число
};
// Создание корректного объекта задачи со строковым приоритетом
const task2 = {
    title: "Написать отчет",
    status: TaskStatus.ToDo,
    priority: "Высокий" // Корректно: строка
};
// Вывод результатов работы функции displayTask в консоль
console.log(`Задача: [${displayTask(task1)}]`);
console.log(`Задача: [${displayTask(task2)}]`);
// --- ПРОВЕРКА ОШИБКИ ТИПИЗАЦИИ ---
// Если раскомментировать код ниже, TypeScript выдаст ошибку компиляции,
// так как boolean (true) не входит в union-тип (number | string) для поля priority.
/*
const invalidTask: Task = {
  title: "Некорректная задача",
  status: TaskStatus.Done,
  priority: true // ОШИБКА: Type 'boolean' is not assignable to type 'string | number'.
};
*/
