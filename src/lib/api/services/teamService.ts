import { generateId, formatDate } from '../utils';
import type { ApiTeamMember, CreateTeamMemberRequest, UpdateTeamMemberRequest } from '../types';

// Хранилище членов команды в памяти (в production использовать базу данных)
let teamMembersStore: ApiTeamMember[] = [
	{
		id: 'tm1',
		name: 'Алексей Петров',
		role: 'Frontend Developer',
		bio: 'Опытный разработчик с 5-летним стажем в веб-разработке. Специализируется на React и Vue.js.',
		skills: ['JavaScript', 'TypeScript', 'React', 'Vue.js', 'CSS'],
		avatar: '/images/team/alexey.jpg',
		createdAt: formatDate(new Date('2023-01-15')),
		updatedAt: formatDate(new Date('2023-01-15'))
	},
	{
		id: 'tm2',
		name: 'Мария Иванова',
		role: 'Backend Developer',
		bio: 'Эксперт в области backend-разработки. Работает с Node.js, Python и базами данных.',
		skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Docker'],
		avatar: '/images/team/maria.jpg',
		createdAt: formatDate(new Date('2023-02-20')),
		updatedAt: formatDate(new Date('2023-02-20'))
	},
	{
		id: 'tm3',
		name: 'Дмитрий Сидоров',
		role: 'UI/UX Designer',
		bio: 'Креативный дизайнер с опытом создания интерфейсов для веб и мобильных приложений.',
		skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Prototyping'],
		avatar: '/images/team/dmitry.jpg',
		createdAt: formatDate(new Date('2023-03-10')),
		updatedAt: formatDate(new Date('2023-03-10'))
	}
];

// Получение всех членов команды
export async function getAllTeamMembers(limit?: number, offset?: number): Promise<ApiTeamMember[]> {
	let members = [...teamMembersStore];
	
	// Пагинация
	if (limit) {
		const startIndex = offset || 0;
		members = members.slice(startIndex, startIndex + limit);
	}
	
	return members;
}

// Получение члена команды по ID
export async function getTeamMemberById(id: string): Promise<ApiTeamMember | null> {
	const member = teamMembersStore.find(m => m.id === id);
	return member || null;
}

// Создание нового члена команды
export async function createTeamMember(data: CreateTeamMemberRequest): Promise<ApiTeamMember> {
	const newMember: ApiTeamMember = {
		id: generateId(),
		...data,
		createdAt: formatDate(new Date()),
		updatedAt: formatDate(new Date())
	};
	
	teamMembersStore.push(newMember);
	return newMember;
}

// Обновление члена команды
export async function updateTeamMember(id: string, data: UpdateTeamMemberRequest): Promise<ApiTeamMember | null> {
	const index = teamMembersStore.findIndex(m => m.id === id);
	
	if (index === -1) {
		return null;
	}
	
	const updatedMember = {
		...teamMembersStore[index],
		...data,
		updatedAt: formatDate(new Date())
	};
	
	teamMembersStore[index] = updatedMember;
	return updatedMember;
}

// Удаление члена команды
export async function deleteTeamMember(id: string): Promise<boolean> {
	const index = teamMembersStore.findIndex(m => m.id === id);
	
	if (index === -1) {
		return false;
	}
	
	teamMembersStore.splice(index, 1);
	return true;
}

// Получение количества членов команды
export async function getTeamMemberCount(): Promise<number> {
	return teamMembersStore.length;
}

// Поиск членов команды по навыкам
export async function getTeamMembersBySkills(skills: string[]): Promise<ApiTeamMember[]> {
	return teamMembersStore.filter(member => 
		skills.some(skill => 
			member.skills.some(memberSkill => 
				memberSkill.toLowerCase().includes(skill.toLowerCase())
			)
		)
	);
}