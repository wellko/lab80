export interface categories {
	id: string;
	description: string;
	name: string;
}

export type categoriesData = Omit<categories, 'description'>

export type categoriesWithOutId = Omit<categories, 'id'>

export interface place {
	id: string;
	description: string;
	name: string;
}

export type placeWithOutID = Omit<place, 'id'>

export type placeData = Omit<place, 'description'>

export interface items {
	id: string;
	description: string;
	name: string;
	category_id: string;
	place_id: string;
	photo: string | null;
}