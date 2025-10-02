import chalk from 'chalk';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const OPENAPI_URL = new URL('https://app.reflag.com/openapi.json');
const OUTPUT_DIR = path.join(process.cwd(), 'nodes', 'ReflagAPI', 'gen');

export default async function sync() {
	try {
		console.log(chalk.green('Syncing Reflag OpenAPI spec'));
		const response = await fetch(OPENAPI_URL, {
			method: 'GET',
		});

		const spec = await response.json();

		console.log(chalk.green('Writing OpenAPI spec to gen/openapi.json'));
		await writeFile(path.join(OUTPUT_DIR, 'openapi.json'), JSON.stringify(spec, null, 2));
	} catch (error) {
		console.error(chalk.red('Error syncing Reflag OpenAPI spec'));
		console.error(error);
	}
}

sync();
