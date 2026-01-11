#!/bin/bash
# Скрипт для создания SPA-совместимой структуры для GitHub Pages

# Копируем index.html как основной файл 404.html
cp build/index.html build/404.html

# Создаем символические ссылки или копии для всех маршрутов
# Это позволит GitHub Pages находить файлы по их путям
cp build/index.html build/about/index.html
cp build/index.html build/products/index.html
cp build/index.html build/contact/index.html