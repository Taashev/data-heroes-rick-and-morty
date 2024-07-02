class API {
	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}

	async request(path = '') {
		return await fetch(this.baseUrl + path).then(async (res) => {
			if (res.ok) {
				return res.json();
			}

			const err = await res.json();

			throw new Error(err.message);
		});
	}

	async getCharacter() {
		console.log('Запрашиваем персонажей');
		return await this.request('/character');
	}
}

module.exports = { API };
