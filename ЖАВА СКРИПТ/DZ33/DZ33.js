"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
exports.createStack = createStack;
// Класс Stack с использованием дженерика T для обеспечения полной типобезопасности
class Stack {
    constructor() {
        // Приватный массив для хранения элементов стека
        this.items = [];
    }
    // Добавляет элемент в стек
    push(item) {
        this.items.push(item);
    }
    // Удаляет и возвращает верхний элемент стека
    pop() {
        return this.items.pop();
    }
    // Возвращает верхний элемент без его удаления
    peek() {
        return this.items[this.items.length - 1];
    }
    // Проверяет, пуст ли стек
    isEmpty() {
        return this.items.length === 0;
    }
    // Возвращает количество элементов в стеке
    size() {
        return this.items.length;
    }
}
exports.Stack = Stack;
// Универсальная generic-функция для создания стека, как требует описание задачи
function createStack() {
    return new Stack();
}
// ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ (ДЛЯ ПРОВЕРКИ)
console.log("--- РАБОТА С ЧИСЛАМИ ---");
const numberStack = createStack();
numberStack.push(10);
numberStack.push(20);
numberStack.push(30);
console.log(`Размер стека чисел: ${numberStack.size()}`); // 3
console.log(`Верхний элемент (peek): ${numberStack.peek()}`); // 30
console.log(`Удаляем элемент (pop): ${numberStack.pop()}`); // 30
console.log(`Новый верхний элемент: ${numberStack.peek()}`); // 20
console.log("\n--- РАБОТА СО СТРОКАМИ ---");
const stringStack = createStack();
stringStack.push("Первый");
stringStack.push("Второй");
console.log(`Пуст ли стек строк?: ${stringStack.isEmpty()}`); // false
console.log(`Забираем элемент: ${stringStack.pop()}`); // Второй
console.log(`Забираем элемент: ${stringStack.pop()}`); // Первый
console.log(`Пуст ли стек теперь?: ${stringStack.isEmpty()}`); // true
console.log("\n--- РАБОТА С ПОЛЬЗОВАТЕЛЬСКИМИ ОБЪЕКТАМИ ---");
const userStack = createStack();
userStack.push({ id: 1, name: "Алексей" });
userStack.push({ id: 2, name: "Мария" });
const lastUser = userStack.peek();
// Благодаря TypeScript здесь работает автодополнение свойств .name и .id!
console.log(`Последний добавленный пользователь: ${lastUser === null || lastUser === void 0 ? void 0 : lastUser.name} (ID: ${lastUser === null || lastUser === void 0 ? void 0 : lastUser.id})`);
