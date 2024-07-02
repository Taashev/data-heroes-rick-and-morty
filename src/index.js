'use strict';

require('dotenv').config();

const pg = require('pg');

const { BASE_URL } = require('./utils/constants');
const { pgConfig } = require('./config/db.conifg');
const { API } = require('./utils/api');
const { CharacterRepository } = require('./repository/character.repository');

(async function start() {
	const pgClient = new pg.Client(pgConfig);

	try {
		await pgClient.connect();

		const characterRepository = new CharacterRepository(pgClient);

		await characterRepository.createTable();

		const apiRM = new API(BASE_URL);

		const responseCharacter = await apiRM.getCharacter().catch((err) => {
			throw new Error(err.message);
		});

		await characterRepository.addCharacters(responseCharacter.results);
	} catch (err) {
		throw new Error(err?.message);
	} finally {
		await pgClient.end();
	}
})();
