// Определение enum для статусов задачи
enum TaskStatus {
  ToDo = "ToDo",
  InProgress = "InProgress",
  Done = "Done"
}

// Определение интерфейса Task с использованием Union-типа для priority (число или строка)
interface Task {
  title: string;
  status: TaskStatus;
  priority: number | string; // Union тип: принимает либо число, либо строку
}

// Функция для отображения информации о задаче
function displayTask(task: Task): string {
  return `Название: "${task.title}", Статус: ${task.status}, Приоритет: ${task.priority}`;
}

// Создание корректного объекта задачи с числовым приоритетом
const task1: Task = {
  title: "Изучить TypeScript",
  status: TaskStatus.InProgress,
  priority: 1 // Корректно: число
};

// Создание корректного объекта задачи со строковым приоритетом
const task2: Task = {
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
