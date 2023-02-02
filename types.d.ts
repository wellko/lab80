export interface categories {
	id: number;
	description: string;
	name: string;
}

export type categoriesWithOutId = Omit<categories, 'id'>