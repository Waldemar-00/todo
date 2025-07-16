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
			});
		} catch (error) {
			console.log(error.message);
		}
	}
}
async function getDB() {
	let db;
	let jsonDB = '';
	try {
		jsonDB = await fs.readFileSync('src/lib/server/db/db.json', 'utf-8');
	} catch (error) {
		console.log('Not found db.json');
		console.log(error.message);
	}
	if (jsonDB === '') db = [{ id: 0, text: 'No todos', done: false }];
	else db = JSON.parse(jsonDB);
	return db;
}
const db = await getDB();
export const todosDB = new UseTodos(db);
