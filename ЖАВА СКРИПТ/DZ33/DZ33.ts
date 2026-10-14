// Класс Stack с использованием дженерика T для обеспечения полной типобезопасности
export class Stack<T> {
  // Приватный массив для хранения элементов стека
  private items: T[] = [];

  // Добавляет элемент в стек
  push(item: T): void {
    this.items.push(item);
  }

  // Удаляет и возвращает верхний элемент стека
  pop(): T | undefined {
    return this.items.pop();
  }

  // Возвращает верхний элемент без его удаления
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  // Проверяет, пуст ли стек
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Возвращает количество элементов в стеке
  size(): number {
    return this.items.length;
  }
}

// Универсальная generic-функция для создания стека, как требует описание задачи
export function createStack<T>(): Stack<T> {
  return new Stack<T>();
}


// ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ (ДЛЯ ПРОВЕРКИ)


console.log("--- РАБОТА С ЧИСЛАМИ ---");
const numberStack = createStack<number>();
numberStack.push(10);
numberStack.push(20);
numberStack.push(30);

console.log(`Размер стека чисел: ${numberStack.size()}`); // 3
console.log(`Верхний элемент (peek): ${numberStack.peek()}`); // 30
console.log(`Удаляем элемент (pop): ${numberStack.pop()}`); // 30
console.log(`Новый верхний элемент: ${numberStack.peek()}`); // 20


console.log("\n--- РАБОТА СО СТРОКАМИ ---");
const stringStack = createStack<string>();
stringStack.push("Первый");
stringStack.push("Второй");

console.log(`Пуст ли стек строк?: ${stringStack.isEmpty()}`); // false
console.log(`Забираем элемент: ${stringStack.pop()}`); // Второй
console.log(`Забираем элемент: ${stringStack.pop()}`); // Первый
console.log(`Пуст ли стек теперь?: ${stringStack.isEmpty()}`); // true


console.log("\n--- РАБОТА С ПОЛЬЗОВАТЕЛЬСКИМИ ОБЪЕКТАМИ ---");
// Определяем интерфейс для пользовательского объекта
interface User {
  id: number;
  name: string;
}

const userStack = createStack<User>();
userStack.push({ id: 1, name: "Алексей" });
userStack.push({ id: 2, name: "Мария" });

const lastUser = userStack.peek();
// Благодаря TypeScript здесь работает автодополнение свойств .name и .id!
console.log(`Последний добавленный пользователь: ${lastUser?.name} (ID: ${lastUser?.id})`);
