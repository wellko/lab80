export interface categories {
	id: string;
	description: string;
	name: string;
}

export type categoriesWithOutId = Omit<categories, 'id'>

export interface place {
	id: string;
	description: string;
	name: string;
}

export type placeWithOutID = Omit<place, 'id'>

export interface items {
	id: string;
	description: string;
	name: string;
	category_id: string;
	place_id: string;
	photo: string | null;
}