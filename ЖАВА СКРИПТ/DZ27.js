class Patient {
  // 1. Создаем приватные поля для имени и даты рождения
  #name;
  #birthDate;

  constructor(name, birthDateString) {
    // Валидация входного имени
    if (typeof name !== 'string' || name.trim() === '') {
      throw new Error("Имя пациента должно быть непустой строкой");
    }
    
    // Валидация входной даты
    const parsedDate = new Date(birthDateString);
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Некорректный формат даты. Используйте ГГГГ-ММ-ДД");
    }

    this.#name = name.trim();
    
    // Создаем копию даты, чтобы защитить ее от внешних изменений
    this.#birthDate = new Date(parsedDate);
  }

  // 2. Реализуем геттеры и сеттеры

  // Геттер для получения имени
  get name() {
    return this.#name;
  }

  // Сеттер для безопасного изменения имени
  set name(newName) {
    if (typeof newName === 'string' && newName.trim() !== '') {
      this.#name = newName.trim();
    } else {
      console.log("Ошибка: Новое имя должно быть непустой строкой");
    }
  }

  // Геттер для даты рождения. 
  // ВАЖНО (Пункт 3): Возвращаем новую копию объекта Date. 
  // Если вернуть оригинальный #birthDate, то снаружи можно будет сделать patient.birthDate.setFullYear(2000), 
  // что нарушило бы инкапсуляцию и приватность.
  get birthDate() {
    return new Date(this.#birthDate);
  }

  // Сеттер для безопасного изменения даты рождения целиком
  set birthDate(newDateString) {
    const parsedDate = new Date(newDateString);
    if (!isNaN(parsedDate.getTime())) {
      this.#birthDate = new Date(parsedDate);
    } else {
      console.log("Ошибка: Некорректный формат новой даты");
    }
  }

  // Динамический геттер для вычисления точного возраста (только для чтения)
  get age() {
    const today = new Date();
    
    let age = today.getFullYear() - this.#birthDate.getFullYear();
    const monthDifference = today.getMonth() - this.#birthDate.getMonth();

    // Проверяем, был ли уже день рождения в этом году.
    // Если текущий месяц меньше месяца рождения ИЛИ месяцы совпадают, но текущий день меньше дня рождения — 
    // значит, день рождения в этом году еще не наступил, и вычитаем 1 год.
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < this.#birthDate.getDate())) {
      age--;
    }

    return age;
  }
}

// === ДЕМОНСТРАЦИЯ РАБОТЫ КЛАССА ===

try {
  // Создаем объект пациента (Иван, родился 15 мая 1990 года)
  const patient1 = new Patient("Иван Петров", "1990-05-15");

  // Проверяем вывод имени и динамически вычисляемого возраста
  console.log(`Пациент: ${patient1.name}`);
  console.log(`Возраст: ${patient1.age} лет`);
  console.log(`Дата рождения: ${patient1.birthDate.toLocaleDateString()}`);

  console.log("\n--- Проверка безопасности данных ---");
  
  // Пытаемся сломать данные, изменив год внутри полученного объекта даты
  const externalDate = patient1.birthDate;
  externalDate.setFullYear(1950); // Меняем год во внешней копии
  
  // Проверяем, изменился ли возраст пациента внутри класса
  console.log(`Возраст после попытки взлома даты: ${patient1.age} лет (Данные защищены!)`);

  console.log("\n--- Работа через сеттеры ---");
  
  // Изменяем имя и дату через официальные сеттеры
  patient1.name = "Иван Сидоров";
  patient1.birthDate = "1995-10-25";
  
  console.log(`Новое имя: ${patient1.name}`);
  console.log(`Новый возраст: ${patient1.age} лет`);

} catch (error) {
  console.log(`Ошибка: ${error.message}`);
}
