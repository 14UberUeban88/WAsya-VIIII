// Определение интерфейса профиля пользователя
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  age?: number;
  isActive: boolean;
}

// Создание типа с базовой информацией с помощью Pick
export type UserBasicInfo = Pick<UserProfile, "id" | "name" | "email">;

// Исходный профиль пользователя для обновления
const initialProfile: UserProfile = {
  id: 1,
  name: "Иван Иванов",
  email: "ivan@example.com",
  age: 25,
  isActive: true
};

// Функция обновления профиля с применением Partial, Required и Readonly
export function updateUserProfile(
  updates: Partial<UserProfile>
): Readonly<Required<UserProfile>> {
  
  // Слияние исходных данных и обновлений
  const mergedProfile = { ...initialProfile, ...updates };
  
  // Проверка и приведение поля age к типу number
  const finalAge = mergedProfile.age !== undefined ? mergedProfile.age : 0;

  // Формирование итогового профиля
  const updatedProfile: Readonly<Required<UserProfile>> = {
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
const profileUpdates: Partial<UserProfile> = {
  name: "Иван Петров",
  age: 26
};

// Получение обновленного профиля
const newProfile = updateUserProfile(profileUpdates);

// Вывод обновленного профиля в консоль
console.log("\n--- Обновлённый профиль (Readonly & Required) ---");
console.log(newProfile);

// Создание объекта на основе типа UserBasicInfo
const basicInfo: UserBasicInfo = {
  id: newProfile.id,
  name: newProfile.name,
  email: newProfile.email
};

// Вывод базовой информации в консоль
console.log("\n--- Временная базовая информация (Pick) ---");
console.log(basicInfo);
