// Базовый класс «Звонок»
class Call {
  // Инициализируем приватные поля класса
  #callers;
  #link;
  #start;
  #end;

  constructor(link) {
    // Базовая проверка ссылки на строку
    if (typeof link !== 'string' || link.trim() === '') {
      throw new Error("Ссылка на звонок должна быть непустой строкой");
    }
    this.#link = link;
    this.#callers = []; // Изначально список участников пуст
    this.#start = null; // Время начала не задано
    this.#end = null;   // Время окончания не задано
  }

  // Метод для добавления участников с проверкой типа данных
  set_caller(name) {
    if (typeof name !== 'string' || name.trim() === '') {
      console.log(`Ошибка добавления: Имя участника должно быть строкой. Получено: ${name}`);
      return false;
    }
    this.#callers.push(name.trim());
    return true;
  }

  // Метод начала звонка (запоминает текущее время в миллисекундах)
  start_call() {
    this.#start = Date.now();
    this.#end = null; // Сбрасываем время окончания, если звонок перезапущен
    console.log("Звонок начался...");
  }

  // Метод завершения звонка (фиксирует текущее время окончания в миллисекундах)
  end_call() {
    if (!this.#start) {
      console.log("Ошибка: Нельзя завершить звонок, который еще не был начат.");
      return;
    }
    this.#end = Date.now();
    console.log("Звонок завершен.");
  }

  // Геттер для получения продолжительности звонка (доступ только на чтение)
  get duration() {
    if (!this.#start) {
      return 0; // Звонок еще не начинался
    }
    
    // Если звонок идет прямо сейчас, считаем время до текущего момента
    const endTime = this.#end ? this.#end : Date.now();
    
    // Возвращаем разницу в секундах (миллисекунды делим на 1000)
    return Math.floor((endTime - this.#start) / 1000);
  }

  // Публичный геттер для демонстрации списка участников
  get callers() {
    return [...this.#callers];
  }
}

// Наследный класс «Созвон с отчётом»
class CallWithReport extends Call {
  constructor(link) {
    // Вызываем конструктор родительского класса
    super(link);
  }

  // Метод для вывода отчета о длительности созвона
  report() {
    const totalSeconds = this.duration;
    console.log(`Созвон длился ${totalSeconds} секунд.`);
    return `Созвон длился ${totalSeconds} секунд.`;
  }
}


// === ДЕМОНСТРАЦИЯ РАБОТЫ ПРОГРАММЫ ===

// 1. Создаем экземпляр наследного класса
const myMeeting = new CallWithReport("https://yandex.ru");

// 2. Тестируем валидацию добавления участников
myMeeting.set_caller("Алексей"); // Успешно
myMeeting.set_caller("Мария");   // Успешно
myMeeting.set_caller(12345);     // Ошибка: не строка, в массив не попадет
myMeeting.set_caller("");        // Ошибка: пустая строка, в массив не попадет

console.log("Участники созвона:", myMeeting.callers);

// 3. Запускаем звонок
myMeeting.start_call();

// 4. Имитируем паузу в 3 секунды, чтобы проверить расчет времени без кнопок на странице
setTimeout(() => {
  // Завершаем звонок через 3 секунды
  myMeeting.end_call();
  
  // Выводим отчет
  myMeeting.report(); // Выведет: "Созвон длился 3 секунд."
}, 3000);
