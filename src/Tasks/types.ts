export enum CATEGORY {
	TESTING_TASK = 'testing_task',
	PRODUCT_REQUEST = 'product_request',
	REFACTOR = 'refactor',
	DEV_TASK = 'dev_task',
	DESIGN_REQUEST = 'design_request',
	MISC = 'miscellaneous'
};

export type Task = {
	createdAt: Date;
	updatedAt: Date;
	id: string;
	isComplete: boolean;
	description: string;
	category: CATEGORY;
}; 