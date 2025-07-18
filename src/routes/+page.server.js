import { todosDB } from '$lib/server/api/api';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	return {
		db: todosDB.db
	};
};

export const actions = {
	add: async ({ request }) => {
		const formData = await request.formData();
		try {
			await todosDB.add(formData);
		} catch (error) {
			return fail(500, { error: error instanceof Error ? error.message : 'Unknown error' });
		}
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		try {
			await todosDB.delete(formData);
		} catch (error) {
			return fail(500, { error: error instanceof Error ? error.message : 'Unknown error' });
		}
	},
	toggle: async ({ request }) => {
		const formData = await request.formData();
		try {
			await todosDB.toggle(formData);
		} catch (error) {
			return fail(500, { error: error instanceof Error ? error.message : 'Unknown error' });
		}
	}
};
