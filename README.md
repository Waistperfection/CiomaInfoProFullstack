# Django + React Web Application for File Upload and Search

## Описание

Это веб-приложение для загрузки и поиска данных, построенное на основе Django для бэкенда и React для фронтенда с использованием библиотеки React-Bootstrap. Приложение позволяет пользователю загружать файлы формата CSV или XLSX, отображать данные и искать по ним. Все упаковано в Docker Compose для удобства развертывания.

## Основные функции

1. **Форма загрузки файла**: Позволяет пользователю загружать CSV или XLSX файл.
2. **Отображение данных**: Загруженные данные отображаются в виде таблицы.
3. **Форма поиска**: Пользователь может осуществлять поиск по загруженным данным для добавления фильтра надо нажать на заголовок столбца.
4. **Отображение результатов поиска**: Строки, удовлетворяющие условиям поиска, отображаются динамически без перезагрузки страницы.

## Дополнительные функции

1. **Индикатор загрузки**: Показывается индикатор во время загрузки файла.
2. **Docker Compose**: Проект упакован в Docker и может быть запущен с помощью Docker Compose.

## Установка и запуск

### Требования

- Docker
- Docker Compose

### Установка и запуск проекта

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Запустите Docker Compose:

   ```bash
   docker compose up --build
   ```

3. Приложение будет доступно по адресу:

   ```
   http://localhost
   ```

### Остановка приложения

Чтобы остановить приложение, используйте следующую команду:

   ```bash
   docker compose down
   ```

Эта команда остановит контейнеры и удалит их.

### Технологии

- **Фронтенд**: React с использованием библиотеки React-Bootstrap.
- **Бэкенд**: Django (Python) без DRF.
- **Контейнеризация**: Docker, Docker Compose.

## Структура проекта

- `frontend/` — папка с кодом фронтенда (React).
- `backend/` — папка с кодом бэкенда (Django).
- `docker-compose.yml` — файл конфигурации Docker Compose.
