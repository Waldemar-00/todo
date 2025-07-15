// @ts-nocheck
import fs from 'fs';
class UseTodos {
	#db;
	constructor(db) {
		this.#db = db;
	}
	get db() {
		return this.#db;
	}
	async add(formData) {
		const text = formData.get('todo');
		const todo = { id: Date.now(), text, done: false };
		this.#db.push(todo);
		await fs.writeFile('src/lib/server/db/db.json', JSON.stringify(this.#db), 'utf-8', (error) => {
			if (error) console.log(error);
		});
	}
	async delete(formData) {
		const id = formData.get('id');
		this.#db = this.#db.filter((todo) => todo.id != id);
		await fs.writeFile('src/lib/server/db/db.json', JSON.stringify(this.#db), 'utf-8', (error) => {
			if (error) console.log(error);
		});
	}
	async toggle(formData) {
		const id = formData.get('id');
		const done = formData.get('done'); // if false - receiving NULL
		try {
			this.#db.forEach(async (todo, i) => {
				if (todo.id === Number(id)) {
					todo.done = done === 'on';
					await fs.writeFile(
						'src/lib/server/db/db.json',
						JSON.stringify(this.#db),
						'utf-8',
						(error) => {
							if (error) console.log(error);
						}
					);
				}
				// else throw new Error('Todo not found');
			});
		} catch (error) {
			console.log(error.message);
		}
	}
}
const db = JSON.parse(fs.readFileSync('src/lib/server/db/db.json', 'utf-8'));
export const todosDB = new UseTodos(db);
//FUCKING CURSOR!!!!!!!!!!!!!!!!!
