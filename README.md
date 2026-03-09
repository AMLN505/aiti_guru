# Aiti Guru

Веб-приложение на React с таблицей продуктов, авторизацией и серверной пагинацией/сортировкой/поиском.

## Технологии

| Категория     | Технология                                                                                                            |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| Фреймворк     | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)                                        |
| Сборщик       | [Vite](https://vitejs.dev/)                                                                                           |
| UI-библиотека | [Ant Design 6](https://ant.design/)                                                                                   |
| Состояние     | [MobX 6](https://mobx.js.org/) + [mobx-react-lite](https://github.com/mobxjs/mobx/tree/main/packages/mobx-react-lite) |
| Роутинг       | [React Router DOM 7](https://reactrouter.com/)                                                                        |
| HTTP-клиент   | [Axios](https://axios-http.com/)                                                                                      |
| Валидация     | [Zod](https://zod.dev/)                                                                                               |
| Стили         | [Less](https://lesscss.org/) (CSS Modules)                                                                            |
| Прогресс-бар  | [NProgress](https://ricostacruz.com/nprogress/)                                                                       |
| Архитектура   | [Feature-Sliced Design (FSD)](https://feature-sliced.design/)                                                         |
| Линтер        | [ESLint](https://eslint.org/) (flat config)                                                                           |
| Форматтер     | [Prettier](https://prettier.io/)                                                                                      |
| Git-хуки      | [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged)                |

## Требования

- Node.js >= 18
- npm >= 9

## Установка и запуск

```bash
# Установить зависимости
npm install

# Запустить в режиме разработки
npm run dev
```

Приложение откроется на [http://localhost:5173](http://localhost:5173).

## Скрипты

| Команда                | Описание                     |
| ---------------------- | ---------------------------- |
| `npm run dev`          | Запуск dev-сервера           |
| `npm run build`        | Сборка для продакшена        |
| `npm run preview`      | Превью собранного приложения |
| `npm run lint`         | Проверка ESLint              |
| `npm run lint:fix`     | Автофикс ESLint              |
| `npm run format`       | Форматирование Prettier      |
| `npm run format:check` | Проверка форматирования      |

## Переменные окружения

Создай файл `.env.local` в корне проекта:

```env
VITE_API_URL=https://dummyjson.com
```

По умолчанию используется `https://dummyjson.com`.

## Структура проекта (FSD)

```
src/
├── app/          # Инициализация: роутер, сторы, провайдеры, стили
├── pages/        # Страницы: auth, home
├── features/     # Фичи: auth, product-create
├── entities/     # Сущности: product
└── shared/       # Общее: api-клиент, конфиг, типы
```

## Тестовый аккаунт

Используется публичный API [dummyjson.com](https://dummyjson.com/docs/auth):

- **Логин:** `emilys`
- **Пароль:** `emilyspass`
