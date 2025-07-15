import { todosDB } from '$lib/server/api/api';
export const load = async () => {
	return {
		db: todosDB.db
	};
};

export const actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		todosDB.delete(formData);
	},
	add: async ({ request }) => {
		const formData = await request.formData();
		todosDB.add(formData);
	},
	toggle: async ({ request }) => {
		const formData = await request.formData();
		todosDB.toggle(formData);
	}
};
