const fs = require('fs');

// Определяем базовый путь в зависимости от среды
const basePath = process.env.GITHUB_PAGES ? '/saraylo_app_web' : '';

const enhancedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Saraylo Developer Studio</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    
    <link rel="icon" href="${basePath}/favicon.png" />
    
    <!-- Используем абсолютные пути для GitHub Pages -->
    <link rel="modulepreload" href="${basePath}/_app/immutable/entry/start.CR_ZpI9r.js">
    <link rel="modulepreload" href="${basePath}/_app/immutable/chunks/CDRVZyl4.js">
    <link rel="modulepreload" href="${basePath}/_app/immutable/chunks/D6D-lzwe.js">
    <link rel="modulepreload" href="${basePath}/_app/immutable/chunks/BUApaBEI.js">
    <link rel="modulepreload" href="${basePath}/_app/immutable/entry/app.D7sLei-a.js">
    <link rel="modulepreload" href="${basePath}/_app/immutable/chunks/CSMTX6pb.js">
    <link rel="modulepreload" href="${basePath}/_app/immutable/chunks/Db2X8iEw.js">
    <link rel="modulepreload" href="${basePath}/_app/immutable/chunks/C-Gqmohk.js">
    
    <style>
        body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #ffffff;
            color: #333;
        }
        
        .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .loading-content {
            text-align: center;
            background: white;
            padding: 2rem;
            border-radius: 16px;
            box-shadow: 0 12px 40px rgba(0,0,0,0.15);
            max-width: 450px;
            width: 90%;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1.5rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .error-message {
            background: #fff5f5;
            border: 1px solid #fed7d7;
            color: #c53030;
            padding: 1.5rem;
            border-radius: 12px;
            margin-top: 1.5rem;
            display: none;
        }
        
        .retry-button {
            background: #667eea;
            color: white;
            border: none;
            padding: 0.875rem 1.75rem;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 1.25rem;
            font-size: 1.1rem;
        }
        
        .retry-button:hover {
            background: #5a67d8;
        }
        
        .debug-info {
            margin-top: 1rem;
            font-size: 0.875rem;
            color: #718096;
            text-align: left;
        }
        
        .debug-item {
            margin: 0.5rem 0;
            padding: 0.5rem;
            background: #f7fafc;
            border-radius: 6px;
        }
    </style>
</head>
<body>
    <div id="app">
        <div class="loading-container">
            <div class="loading-content">
                <div class="spinner"></div>
                <h2>Загрузка приложения</h2>
                <p>Пожалуйста, подождите...</p>
                
                <div class="debug-info">
                    <div class="debug-item">
                        <strong>Путь:</strong> <span id="current-path">Определение...</span>
                    </div>
                    <div class="debug-item">
                        <strong>Base Path:</strong> <span id="base-path">${basePath}</span>
                    </div>
                    <div class="debug-item">
                        <strong>Origin:</strong> <span id="origin-url">Определение...</span>
                    </div>
                </div>
                
                <div id="error-message" class="error-message">
                    <strong>Ошибка загрузки:</strong>
                    <div id="error-details"></div>
                    <button class="retry-button" onclick="retryLoad()">Повторить попытку</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Инициализация отладочной информации
        document.getElementById('current-path').textContent = window.location.pathname;
        document.getElementById('origin-url').textContent = window.location.origin;
        
        // Расширенная обработка ошибок
        window.onerror = function(message, source, lineno, colno, error) {
            console.error('Глобальная ошибка:', { message, source, lineno, colno, error });
            showError('JavaScript Error: ' + (error?.message || message));
            return true;
        };
        
        window.addEventListener('unhandledrejection', function(event) {
            console.error('Необработанное отклонение промиса:', event.reason);
            showError('Promise Error: ' + (event.reason?.message || 'Unknown error'));
            event.preventDefault();
        });
        
        function showError(message) {
            const errorDiv = document.getElementById('error-message');
            const errorDetails = document.getElementById('error-details');
            errorDetails.innerHTML = \`<pre>\${message}</pre>\`;
            errorDiv.style.display = 'block';
            document.querySelector('.spinner').style.display = 'none';
            document.querySelector('h2').textContent = 'Ошибка загрузки';
            document.querySelector('p').textContent = 'Не удалось загрузить приложение';
        }
        
        function retryLoad() {
            location.reload();
        }
        
        // Проверка поддержки браузера
        if (!window.Promise || !window.fetch) {
            showError('Ваш браузер не поддерживает необходимые технологии. Пожалуйста, обновите браузер.');
        } else {
            console.log('Проверка поддержки браузера пройдена');
            
            // Используем правильные пути для GitHub Pages
            const basePath = '${basePath}';
            
            Promise.all([
                import(basePath + '/_app/immutable/entry/start.CR_ZpI9r.js').catch(err => {
                    throw new Error('Не удалось загрузить start модуль: ' + err.message);
                }),
                import(basePath + '/_app/immutable/entry/app.D7sLei-a.js').catch(err => {
                    throw new Error('Не удалось загрузить app модуль: ' + err.message);
                })
            ])
            .then(([kit, app]) => {
                console.log('Модули загружены успешно');
                try {
                    const element = document.getElementById('app');
                    kit.start(app, element);
                    console.log('Приложение запущено успешно');
                } catch (error) {
                    throw new Error('Ошибка запуска приложения: ' + error.message);
                }
            })
            .catch(error => {
                console.error('Ошибка загрузки приложения:', error);
                showError(error.message);
            });
        }
    </script>
</body>
</html>`;

// Ensure build directory exists
if (!fs.existsSync('build')) {
    fs.mkdirSync('build', { recursive: true });
}

// Write the enhanced index.html file
fs.writeFileSync('build/enhanced-index.html', enhancedHtml);
console.log('Enhanced index.html created successfully with base path:', basePath);