export interface Product {
	id: string;
	name: string;
	description: string;
	type: 'desktop' | 'mobile';
	icon: string;
	images: string[];
	features: string[];
	technologies: string[];
	link?: string;
	releaseDate: Date;
}

export interface NavigationItem {
	id: string;
	label: string;
	path: string;
	icon?: string;
}

export interface TeamMember {
	id: string;
	name: string;
	role: string;
	bio: string;
	skills: string[];
	avatar?: string;
}