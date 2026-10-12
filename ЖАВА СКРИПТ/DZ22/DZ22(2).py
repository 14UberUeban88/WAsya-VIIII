import asyncio
import random

# База данных доступных городов для имитации сервера
weather_database = {
    "Москва": {"temp": 15, "condition": "солнечно"},
    "Санкт-Петербург": {"temp": 12, "condition": "пасмурно"},
    "Казань": {"temp": 14, "condition": "ясно"}
}

# Асинхронная функция-имитатор запроса к серверу для одного города
async def fetch_city_weather(city):
    # Генерируем случайное время от 0.5 до 2.0 секунд
    delay = random.uniform(0.5, 2.0)
    await asyncio.sleep(delay)
    
    if city in weather_database:
        # Если город найден, возвращаем словарь с данными
        return {"city": city, **weather_database[city]}
    else:
        # Если города нет в базе — выбрасываем исключение
        raise ValueError("Город не найден")

# Главная асинхронная функция для обработки списка городов
async def get_weather_for_cities(cities):
    # Создаем список асинхронных задач для каждого города
    tasks = [fetch_city_weather(city) for city in cities]
    
    # return_exceptions=True работает как Promise.allSettled: 
    # функция ждет всех, а вместо падения программы возвращает объекты ошибок в списке результатов
    results = await asyncio.gather(*tasks, return_exceptions=True)
    
    # Перебираем результаты в соответствии с исходным списком городов
    for index, result in enumerate(results):
        current_city = cities[index]
        
        # Проверяем, является ли результат ошибкой (исключением)
        if isinstance(result, Exception):
            print(f"Гогород не найден {current_city}")
        else:
            print(f"{result['city']}: {result['temp']}°C, солнечно")

# Запуск первой задачи
# Самара вызовет ошибку, так как ее нет в нашей базе данных
asyncio.run(get_weather_for_cities(['Москва', 'Санкт-Петербург', 'Самара', 'Казань']))
