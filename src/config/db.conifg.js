const fs = require('fs');
const { join } = require('path');

const { PG_HOST, PG_PORT, PG_NAME, PG_USER, PG_PASSWORD, PG_CERT_BASE64 } =
	process.env;

const certContent = Buffer.from(PG_CERT_BASE64, 'base64').toString('utf-8');

const certPath = join(__dirname, '../../root.crt');

fs.writeFileSync(certPath, certContent);

const ssl_cert = fs.readFileSync('./root.crt').toString();

const pgConfig = {
	connectionString: `postgres://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_NAME}`,
	ssl: {
		rejectUnauthorized: true,
		ca: ssl_cert,
	},
};

module.exports = {
	pgConfig,
};
