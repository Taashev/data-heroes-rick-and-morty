class CharacterRepository {
	constructor(client) {
		this.tableName = 'characters';
		this.client = client;
	}

	async createTable() {
		try {
			await this.client.query(
				`CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id SERIAL PRIMARY KEY,
        name TEXT,
        data JSONB
      );`,
			);

			console.log(`Таблица "${this.tableName}" успешно создана`);
		} catch (err) {
			throw new Error(
				`ошибка создании таблицы "${this.tableName}": ` + err?.message,
			);
		}
	}

	async addCharacters(characters) {
		const values = [];

		const placeholders = characters
			.map((character, i) => {
				const index = i * 2;

				values.push(character.name, character);

				return `($${index + 1}, $${index + 2})`;
			})
			.join(', ');

		try {
			await this.client.query(
				`INSERT INTO ${this.tableName} (name, data) VALUES ${placeholders};`,
				values,
			);

			console.log(`Персонажи успешно добавлены в таблицу "${this.tableName}"`);
		} catch (err) {
			console.error(
				`ошибка при добавлении персонажей в таблицу "${this.tableName}":`,
				err.message,
			);
		}
	}

	async getAllCharacters() {
		try {
			const characters = await this.client.query(
				`SELECT * FROM ${this.tableName};`,
			);

			return characters.rows;
		} catch (err) {
			console.error(
				`ошибка при получении персонажей из таблицы "${this.tableName}":`,
				err.message,
			);
			return [];
		}
	}
}

module.exports = {
	CharacterRepository,
};
