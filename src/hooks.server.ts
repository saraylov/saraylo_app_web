import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';

// Определяем доступные языки
const SUPPORTED_LOCALES = ['en', 'ru'];

// Извлекаем язык из заголовков запроса
const getLocale = (request: Request): string => {
	const header = request.headers.get('accept-language');
	if (header) {
		const locale = header.split(',')[0]?.split('-')[0];
		if (locale && SUPPORTED_LOCALES.includes(locale)) {
			return locale;
		}
	}
	return 'en'; // язык по умолчанию
};

// Хук для определения языка
const localizationHandle: Handle = async ({ event, resolve }) => {
	// Получаем язык из заголовка Accept-Language или используем 'en' по умолчанию
	const locale = getLocale(event.request);
	
	// Добавляем язык в объект события для дальнейшего использования
	(event.locals as any).locale = locale;
	
	// Устанавливаем язык в заголовки ответа
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('%lang%', locale);
		}
	});
	
	return response;
};

export const handle = sequence(localizationHandle);