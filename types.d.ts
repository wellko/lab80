export interface categories {
	id: string;
	description: string;
	name: string;
}

export type categoriesWithOutId = Omit<categories, 'id'>

export interface items {
	id: string;
	description: string;
	name: string;
	category_id: string;
	place_id: string;
	photo: string | null;
}