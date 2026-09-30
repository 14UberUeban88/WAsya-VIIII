// Исходный массив с заявками городов
const requests = [ 
  "Paris", 
  "Rome", 
  "Paris", 
  "Berlin", 
  "Berlin", 
  "Rome", 
  "Paris" 
];

// 1. Функция для получения массива уникальных городов
function getUniqueCities(arr) {
  // Если массив пустой или это не массив, возвращаем пустой массив
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }
  
  // Создаем коллекцию Set, которая автоматически убирает дубликаты,
  // и превращаем её обратно в массив с помощью Array.from()
  return Array.from(new Set(arr));
}

// 2. Функция для подсчета упоминаний каждого города
function countCities(arr) {
  // Если массив пустой или передан не массив, возвращаем пустой объект
  if (!Array.isArray(arr) || arr.length === 0) {
    return {};
  }
  
  let counts = {};
  
  // Проходим по каждому городу из массива
  for (let i = 0; i < arr.length; i++) {
    let city = arr[i];
    
    // Если город уже есть в объекте, увеличиваем счетчик, если нет — ставим 1
    if (counts[city]) {
      counts[city]++;
    } else {
      counts[city] = 1;
    }
  }
  
  return counts;
}

// 3. Функция для сортировки городов по популярности и по алфавиту
function sortCitiesByPopularity(countsObj) {
  // Если объект пустой или не передан, возвращаем пустой массив
  if (!countsObj || Object.keys(countsObj).length === 0) {
    return [];
  }
  
  // Получаем массив названий городов (ключей объекта)
  let cities = Object.keys(countsObj);
  
  // Сортируем массив по правилам
  cities.sort(function(a, b) {
    let countA = countsObj[a];
    let countB = countsObj[b];
    
    // Если количество упоминаний разное, сортируем по убыванию
    if (countB !== countA) {
      return countB - countA;
    }
    
    // Если популярность одинаковая, сортируем по алфавиту
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  
  return cities;
}

//  Проверка работы программы 

console.log("--- Тест со стандартными данными ---");
const uniqueCities = getUniqueCities(requests); 
console.log("Уникальные города:", uniqueCities); 

const cityCounts = countCities(requests); 
console.log("Количество упоминаний городов:", cityCounts); 

const sortedCities = sortCitiesByPopularity(cityCounts); 
console.log("Города по популярности:", sortedCities); 

console.log("\n--- Тест с пустым массивом ---");
const emptyRequests = [];
console.log("Уникальные (пусто):", getUniqueCities(emptyRequests));
console.log("Подсчет (пусто):", countCities(emptyRequests));
console.log("Сортировка (пусто):", sortCitiesByPopularity(countCities(emptyRequests)));
