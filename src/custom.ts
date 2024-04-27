export type Talent = {
	id: number;
	name_en: string;
	name_jp: string;
	gen: string;
	fanmark: string;
};

export type InAppNotification = {
	type: 'info' | 'error';
	message: string;
};
