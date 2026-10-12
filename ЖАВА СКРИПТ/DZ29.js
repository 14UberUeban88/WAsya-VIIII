class Vehicle {
  // Конструктор с базовой валидацией входных данных
  constructor(name, speed) {
    if (typeof name !== 'string' || name.trim() === '') {
      throw new Error("Имя транспортного средства должно быть непустой строкой");
    }
    if (typeof speed !== 'number' || speed < 0 || Number.isNaN(speed)) {
      throw new Error("Скорость должна быть положительным числом");
    }

    this.name = name;
    this.speed = speed;
  }

  // Метод выводит информацию о текущей скорости объекта
  showSpeed() {
    console.log(`Транспортное средство: ${this.name}, его скорость: ${this.speed} км/ч`);
  }

  // Статический метод для сравнения скорости двух транспортных средств
  static compareSpeed(vehicle1, vehicle2) {
    // Проверка, что оба аргумента являются экземплярами класса Vehicle (или имеют свойство speed)
    if (!vehicle1 || !vehicle2 || typeof vehicle1.speed !== 'number' || typeof vehicle2.speed !== 'number') {
      console.log("Ошибка: Переданы некорректные объекты для сравнения");
      return;
    }

    if (vehicle1.speed > vehicle2.speed) {
      console.log(`${vehicle1.name} быстрее, чем ${vehicle2.name}`);
    } else if (vehicle1.speed < vehicle2.speed) {
      console.log(`${vehicle2.name} быстрее, чем ${vehicle1.name}`);
    } else {
      console.log(`Скорости у ${vehicle1.name} и ${vehicle2.name} одинаковые`);
    }
  }
}

// === ДЕМОНСТРАЦИЯ И ПРОВЕРКА РАБОТЫ ===

try {
  // Создание объектов
  const car = new Vehicle("Машина", 120);
  const bicycle = new Vehicle("Велосипед", 25);
  const plane = new Vehicle("Самолет", 800);

  // 1. Проверка базовых методов и статического сравнения
  car.showSpeed();
  bicycle.showSpeed();
  Vehicle.compareSpeed(car, bicycle); // Выведет: Машина быстрее, чем Велосипед

  console.log("\n--- Работа с изменением контекста (call) ---");
  // 2. Использование call: вызываем метод car в контексте обычного подходящего объекта (duck typing)
  const fakeVehicle = { name: "Самодельный карт", speed: 60 };
  car.showSpeed.call(fakeVehicle); // Выведет: Транспортное средство: Самодельный карт, его скорость: 60 км/ч

  console.log("\n--- Каррирование с помощью bind ---");
  // 3. Каррирование статического метода с помощью bind. 
  // Фиксируем первый аргумент (plane), создавая специализированную функцию для сравнения с самолетом.
  const compareWithPlane = Vehicle.compareSpeed.bind(null, plane);

  // Теперь вызываем новую функцию, передавая только второй аргумент
  compareWithPlane(car); // Выведет: Самолет быстрее, чем Машина

} catch (error) {
  console.log(`Произошла ошибка при создании или обработке: ${error.message}`);
}
