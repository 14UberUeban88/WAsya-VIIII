"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = updateUserProfile;
// Исходный профиль пользователя для обновления
const initialProfile = {
    id: 1,
    name: "Иван Иванов",
    email: "ivan@example.com",
    age: 25,
    isActive: true
};
// Функция обновления профиля с применением Partial, Required и Readonly
function updateUserProfile(updates) {
    // Слияние исходных данных и обновлений
    const mergedProfile = Object.assign(Object.assign({}, initialProfile), updates);
    // Проверка и приведение поля age к типу number
    const finalAge = mergedProfile.age !== undefined ? mergedProfile.age : 0;
    // Формирование итогового профиля
    const updatedProfile = {
        id: mergedProfile.id,
        name: mergedProfile.name,
        email: mergedProfile.email,
        age: finalAge,
        isActive: mergedProfile.isActive
    };
    return updatedProfile;
}
// Вывод исходного профиля в консоль
console.log("--- Исходный профиль ---");
console.log(initialProfile);
// Передача частичных данных для обновления
const profileUpdates = {
    name: "Иван Петров",
    age: 26
};
// Получение обновленного профиля
const newProfile = updateUserProfile(profileUpdates);
// Вывод обновленного профиля в консоль
console.log("\n--- Обновлённый профиль (Readonly & Required) ---");
console.log(newProfile);
// Создание объекта на основе типа UserBasicInfo
const basicInfo = {
    id: newProfile.id,
    name: newProfile.name,
    email: newProfile.email
};
// Вывод базовой информации в консоль
console.log("\n--- Временная базовая информация (Pick) ---");
console.log(basicInfo);
