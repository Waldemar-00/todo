// @ts-nocheck
import * as fs from 'fs/promises';
class UseTodos {
	#db;
	constructor(db) {
		this.#db = db;
	}
	get db() {
		return this.#db;
	}
	async add(formData) {
		const id = Number(formData.get('id'));
		const text = formData.get('todo');
		const done = formData.get('done') === 'true';
		console.log(done);
		this.#db.push({ id, text, done });
		await fs.writeFile('src/lib/server/db/db.json', JSON.stringify(this.#db), 'utf-8');
	}
	async delete(formData) {
		const id = Number(formData.get('id'));
		this.#db = this.#db.filter((todo) => todo.id !== id);
		await fs.writeFile('src/lib/server/db/db.json', JSON.stringify(this.#db), 'utf-8');
	}
	async toggle(formData) {
		const id = Number(formData.get('id'));
		const done = formData.get('done'); // if false - receiving NULL
		this.#db.forEach(async (todo, i) => {
			if (todo.id === id) {
				todo.done = done === 'on';
				await fs.writeFile('src/lib/server/db/db.json', JSON.stringify(this.#db), 'utf-8');
			}
		});
	}
	static async createClass() {
		let db;
		let jsonDB = '';
		try {
			jsonDB = await fs.readFile('src/lib/server/db/db.json', 'utf-8');
		} catch (error) {
			console.log('Not found db.json');
			console.log(error.message);
		}
		if (jsonDB === '') db = [{ id: 0, text: 'No todos', done: false }];
		else db = JSON.parse(jsonDB);
		return new UseTodos(db);
	}
}
export const todosDB = await UseTodos.createClass();
