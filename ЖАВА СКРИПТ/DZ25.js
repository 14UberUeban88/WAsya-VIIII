// Класс Растение
class Plant {
    constructor() {
      this.isWatered = false; // Изначально цветок не полит
    }
  
    // Метод, который вызывается при поливе
    bloom() {
      this.isWatered = true;
      console.log("Ещё цветочек\n🌸");
    }
  }
  
  // Класс Лейка
  class WateringCan {
    // Метод полива, который принимает объект растения
    water(plant) {
      // Взаимодействие классов: лейка дает команду растению цвести
      plant.bloom();
    }
  }
  
  //  Выполнение программы 
  
  // 1. Создаем один экземпляр лейки
  const myWateringCan = new WateringCan();
  
  // 2. Создаем массив из пяти одинаковых цветочков
  const garden = Array.from({ length: 5 }, () => new Plant());
  
  // 3. Обходим наш садик циклом for...of и поливаем каждый цветочек
  for (const flower of garden) {
    myWateringCan.water(flower);
  }
