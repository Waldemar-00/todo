import { todosDB } from '$lib/server/api/api';
export const load = async () => {
	return {
		db: todosDB.db
	};
};

export const actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		try {
			todosDB.delete(formData);
		} catch (error) {
			if (error instanceof Error) console.log(error.message);
		}
	},
	add: async ({ request }) => {
		const formData = await request.formData();
		try {
			todosDB.add(formData);
		} catch (error) {
			if (error instanceof Error) console.log(error.message);
		}
	},
	toggle: async ({ request }) => {
		const formData = await request.formData();
		try {
			todosDB.toggle(formData);
		} catch (error) {
			if (error instanceof Error) console.log(error.message);
		}
	}
};
