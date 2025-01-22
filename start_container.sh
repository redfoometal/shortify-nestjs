#!/bin/bash

# Задаем имена файлов
ENV_FILE=".env"
ENV_EXAMPLE_FILE=".env.example"

# Проверяем, существует ли .env файл
if [ ! -f "$ENV_FILE" ]; then
    echo ".env не найден! Используется .env.example для создания .env"
    cp "$ENV_EXAMPLE_FILE" "$ENV_FILE" 
fi


# Считываем переменные окружения из файла .env (или .env.example, если .env нет)
if [ -f "$ENV_FILE" ]; then
    source "$ENV_FILE"
else
    echo "Ошибка: ни .env, ни .env.example не найдены!"
    exit 1
fi

# Проверяем, задана ли переменная NODE_ENV
if [ -z "$NODE_ENV" ]; then
    echo "Ошибка: переменная NODE_ENV не задана в $ENV_FILE!"
    exit 1
fi

start() {
    echo "Запуск API-контейнера в режиме $NODE_ENV..."
    
    # Передаем файл .env или .env.example в docker compose
    docker compose --env-file "$ENV_FILE" up --build -d
    if [ $? -eq 0 ]; then
        echo "API-контейнер успешно запущен в режиме $NODE_ENV!"
    else
        echo "Ошибка при запуске API-контейнера!"
        exit 1
    fi
}

# Основной процесс
echo "Запуск процесса..."

start

echo "Все сервисы успешно запущены!"
