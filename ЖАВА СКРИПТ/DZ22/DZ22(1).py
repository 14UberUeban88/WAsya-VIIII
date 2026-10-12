import asyncio
import random

# Функция, имитирующая нестабильный сервер (случайные ошибки)
async def unstable_server_request(city):
    await asyncio.sleep(1.0)
    # Имитируем ошибку сервера с вероятностью 50%
    if random.random() < 0.5:
        raise ConnectionError("Не удалось установить соединение с сервером")
    else:
        return {"name": city, "population": 12000000}

# Функция безопасной загрузки данных с использованием try/except/finally
async def safe_load_city_data(city):
    try:
        # Пытаемся загрузить данные о городе
        data = await unstable_server_request(city)
        return data  # Возвращаем данные в случае успеха
        
    except Exception as error:
        # Если произошла любая ошибка — выводим понятное сообщение
        print(f"Ошибка при загрузке города {city}: {error}")
        return None  # Возвращаем None в случае ошибки
        
    finally:
        # Этот блок выполнится всегда, независимо от успеха или ошибки
        print('Загрузка данных завершена')

# Тестовый запуск второй задачи
async def run_test():
    print("\n--- Старт загрузки ---")
    result = await safe_load_city_data("Москва")
    print("Результат работы функции:", result)

asyncio.run(run_test())
