// Система локализации для Qoder Developer Website
import { browser } from '$app/environment';

// Определение доступных языков
export const locales = {
	ru: 'Русский',
	en: 'English'
};

// Определение языка по умолчанию
export const defaultLocale = 'en';

// Функция получения текущего языка
export function getCurrentLocale(): string {
	if (browser) {
		return localStorage.getItem('locale') || 
			navigator.language.split('-')[0] || 
			defaultLocale;
	}
	return defaultLocale;
}

// Функция смены языка
export function changeLocale(newLocale: string) {
	if (locales[newLocale as keyof typeof locales]) {
		localStorage.setItem('locale', newLocale);
		window.location.reload();
	}
}

// Текстовые ресурсы
export const messages = {
	ru: {
		// Навигация
		nav: {
			home: 'Главная',
			products: 'Продукты',
			about: 'О нас',
			contact: 'Контакты'
		},
		// Главная страница
		home: {
			title: 'Добро пожаловать в пространство',
			subtitle: 'Студия разработки программного обеспечения, создающая цифровые решения, которые объединяют техническое совершенство с интуитивно понятным дизайном.',
			philosophy_title: 'Философия разработки',
			view_work: 'Просмотреть работы',
			our_philosophy: 'Наша философия',
			clean_code: 'Чистый код',
			user_centric: 'Ориентация на пользователя',
			innovation: 'Инновации',
			clean_code_desc: 'Приоритет читаемости, поддерживаемости и надежной архитектуры перед быстрыми решениями.',
			user_centric_desc: 'Проектирование интерфейсов, которые чувствуются интуитивно и взаимодействия, которые кажутся естественными.',
			innovation_desc: 'Освоение передовых технологий при сохранении практической надежности.'
		},
		// Страница продуктов
		products: {
			title: 'Наши приложения',
			subtitle: 'Коллекция специализированных программных решений, созданных для повышения производительности и оптимизации рабочих процессов на разных платформах.',
			all: 'Все приложения',
			desktop: 'Настольные',
			mobile: 'Мобильные',
			found: 'приложений найдено',
			placeholder: 'Приложения появятся в ближайшее время: Демонстрация наших последних приложений'
		},
		// Страница "О нас"
		about: {
			title: 'О студии Saraylo',
			subtitle: 'Страстная студия разработки программного обеспечения, создающая цифровые опыты, сочетающие техническое совершенство с ориентированным на человека дизайном.',
			our_story: 'Наша история',
			company_story: 'Saraylo studio родился из простой веры: отличное программное обеспечение должно казаться простым в использовании, в то же время быть надежным под капотом. То, что началось как личные проекты, решающие реальные проблемы, превратилось в студию полного цикла.',
			we_specialize: 'Мы специализируемся на создании приложений, которые не просто функционируют — они восхищают. Каждая строка кода пишется с намерением, каждый интерфейс проектируется с сочувствием, и каждый продукт строится, чтобы прослужить.',
			engineering_excellence: 'Инженерное совершенство',
			user_first_design: 'Дизайн, ориентированный на пользователя',
			continuous_learning: 'Постоянное обучение',
			engineering_desc: 'Чистый, поддерживаемый код, который выдерживает испытание временем',
			user_first_desc: 'Интерфейсы, которые предвосхищают потребности и устраняют трение',
			learning_desc: 'Оставайтесь впереди кривой через постоянную инновацию',
			development_approach: 'Подход к разработке',
			discovery_research: 'Открытие и исследование',
			discovery_desc: 'Глубокое погружение в потребности пользователей, ландшафт рынка и технические требования',
			architecture_planning: 'Архитектура и планирование',
			architecture_desc: 'Проектирование масштабируемых систем с учетом будущего роста',
			implementation: 'Реализация',
			implementation_desc: 'Создание с практиками чистого кода и непрерывным тестированием',
			refinement_launch: 'Доработка и запуск',
			refinement_desc: 'Полировка каждой детали и обеспечение безупречного пользовательского опыта',
			core_competencies: 'Ключевые компетенции',
			technology_stack: 'Технологический стек'
		},
		// Страница контактов
		contact: {
			title: 'Связаться с нами',
			subtitle: 'Есть проект в виду или хотите обсудить потенциальное сотрудничество? Свяжитесь с нами, и давайте создадим что-нибудь удивительное вместе.',
			email: 'Электронная почта',
			website: 'Веб-сайт',
			location: 'Местоположение',
			response_time: 'Время ответа',
			connect_with_us: 'Связаться с нами',
			send_message: 'Отправить сообщение',
			name_placeholder: 'Ваше полное имя',
			email_placeholder: 'ваш.адрес@example.com',
			subject_placeholder: 'Запрос проекта или общий вопрос',
			message_placeholder: 'Расскажите нам о вашем проекте, идеях или вопросах...',
			send_button: 'Отправить сообщение',
			success_message: 'Сообщение отправлено! ✅',
			sending: 'Отправка...',
			what_to_expect: 'Что ожидать',
			quick_acknowledgment: 'Быстрое подтверждение',
			quick_desc: 'Мы подтвердим получение вашего сообщения в течение 2 часов',
			detailed_response: 'Подробный ответ',
			detailed_desc: 'Полный ответ с дальнейшими шагами в течение 24 часов',
			project_discussion: 'Обсуждение проекта',
			project_desc: 'Назначить встречу для обсуждения требований и сроков'
		},
		// Компоненты
		components: {
			product_type_desktop: 'Настольный',
			product_type_mobile: 'Мобильный',
			view_details: 'Подробнее →',
			featured_applications: 'Рекомендуемые приложения',
			view_all_projects: 'Просмотреть все проекты →',
			skills_showcase: 'Демонстрация навыков',
			technology_breakdown: 'Разбор технологий'
		},
		// Общие
		common: {
			download_now: 'Скачать сейчас',
			view_other_apps: 'Просмотреть другие приложения',
			ready_get_started: 'Готовы начать?',
			download_cta: 'Скачайте {name} сегодня и почувствуйте разницу.',
			within_24_hours: 'В течение 24 часов',
			remote_worldwide: 'Russia - best country of World',
			response_within_24: 'В течение 24 часов',
			quick_ack: 'В пределах 2 часов'
		}
	},
	en: {
		// Английская версия (по умолчанию)
		nav: {
			home: 'Home',
			products: 'Products',
			about: 'About',
			contact: 'Contact'
		},
		home: {
			title: 'Welcome to space',
			subtitle: 'A passion-driven software development studio crafting digital experiences that merge technical excellence with human-centered design.',
			philosophy_title: 'Development Philosophy',
			view_work: 'View Our Work',
			our_philosophy: 'Our Philosophy',
			clean_code: 'Clean Code',
			user_centric: 'User-Centric',
			innovation: 'Innovation',
			clean_code_desc: 'Prioritizing readability, maintainability, and robust architecture over quick fixes.',
			user_centric_desc: 'Designing interfaces that anticipate needs and eliminate friction.',
			innovation_desc: 'Embracing cutting-edge technologies while maintaining practical reliability.'
		},
		products: {
			title: 'Our Applications',
			subtitle: 'A collection of purpose-built software solutions designed to enhance productivity and streamline workflows across different platforms.',
			all: 'All Applications',
			desktop: 'Desktop',
			mobile: 'Mobile',
			found: 'application(s) found',
			placeholder: 'Coming soon: Showcase of our latest applications'
		},
		about: {
			title: 'About Saraylo studio',
			subtitle: 'A passion-driven software development studio crafting digital experiences that merge technical excellence with human-centered design.',
			our_story: 'Our Story',
			company_story: 'QODER was born from a simple belief: great software should feel effortless to use while being robust under the hood. What started as personal projects solving real-world problems has evolved into a full-service development studio.',
			we_specialize: 'We specialize in creating applications that don\'t just function—they delight. Every line of code is written with intention, every interface designed with empathy, and every product built to last.',
			engineering_excellence: 'Engineering Excellence',
			user_first_design: 'User-First Design',
			continuous_learning: 'Continuous Learning',
			engineering_desc: 'Clean, maintainable code that stands the test of time',
			user_first_desc: 'Interfaces that anticipate needs and eliminate friction',
			learning_desc: 'Staying ahead of the curve through constant innovation',
			development_approach: 'Development Approach',
			discovery_research: 'Discovery & Research',
			discovery_desc: 'Deep dive into user needs, market landscape, and technical requirements',
			architecture_planning: 'Architecture & Planning',
			architecture_desc: 'Design scalable systems with future growth in mind',
			implementation: 'Implementation',
			implementation_desc: 'Build with clean code practices and continuous testing',
			refinement_launch: 'Refinement & Launch',
			refinement_desc: 'Polish every detail and ensure seamless user experience',
			core_competencies: 'Core Competencies',
			technology_stack: 'Technology Stack'
		},
		contact: {
			title: 'Get In Touch',
			subtitle: 'Have a project in mind or want to discuss potential collaboration? Reach out and let\'s create something amazing together.',
			email: 'Email',
			website: 'Website',
			location: 'Location',
			response_time: 'Response Time',
			connect_with_us: 'Connect With Us',
			send_message: 'Send a Message',
			name_placeholder: 'Your full name',
			email_placeholder: 'your.email@example.com',
			subject_placeholder: 'Project inquiry or general question',
			message_placeholder: 'Tell us about your project, ideas, or questions...',
			send_button: 'Send Message',
			success_message: 'Message Sent! ✅',
			sending: 'Sending...',
			what_to_expect: 'What to Expect',
			quick_acknowledgment: 'Quick Acknowledgment',
			quick_desc: 'We\'ll confirm receipt of your message within 2 hours',
			detailed_response: 'Detailed Response',
			detailed_desc: 'Comprehensive reply with next steps within 24 hours',
			project_discussion: 'Project Discussion',
			project_desc: 'Schedule a call to discuss requirements and timeline'
		},
		components: {
			product_type_desktop: 'Desktop',
			product_type_mobile: 'Mobile',
			view_details: 'View Details →',
			featured_applications: 'Featured Applications',
			view_all_projects: 'View all projects →',
			skills_showcase: 'Skills Showcase',
			technology_breakdown: 'Technology Breakdown'
		},
		common: {
			download_now: 'Download Now',
			view_other_apps: 'View Other Apps',
			ready_get_started: 'Ready to get started?',
			download_cta: 'Download {name} today and experience the difference.',
			within_24_hours: 'Within 24 hours',
			remote_worldwide: 'Russia - best country of World',
			response_within_24: 'Within 24 hours',
			quick_ack: 'Within 2 hours'
		}
	}
};

// Функция получения перевода
export function t(key: string, locale: string = getCurrentLocale()): string {
	const keys = key.split('.');
	let current: any = messages[locale as keyof typeof messages];
	
	for (const k of keys) {
		if (current && current[k] !== undefined) {
			current = current[k];
		} else {
			return key; // возвращаем ключ, если перевод не найден
		}
	}
	
	return current as string;
}