import chalk from 'chalk';
import { writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';

const OPENAPI_URL = new URL('https://app.reflag.com/openapi.json');
const OUTPUT_OPENAPI_PATH = path.join(process.cwd(), 'nodes', 'ReflagAPI', 'gen', 'openapi.json');
const PACKAGE_JSON_PATH = path.join(process.cwd(), 'package.json');

export default async function sync() {
	try {
		console.log(chalk.green('Syncing Reflag OpenAPI spec'));
		const response = await fetch(OPENAPI_URL, {
			method: 'GET',
		});

		const spec = await response.json();
		const version = spec.info.version;

		console.log(chalk.green('Writing OpenAPI spec to gen/openapi.json'));
		await writeFile(OUTPUT_OPENAPI_PATH, JSON.stringify(spec, null, 2));

		console.log(chalk.green(`Updating package.json version to '${version}'`));
		const packageJson = JSON.parse(await readFile(PACKAGE_JSON_PATH, 'utf-8'));
		await writeFile(
			PACKAGE_JSON_PATH,
			JSON.stringify(
				{
					...packageJson,
					version,
				},
				null,
				2,
			),
		);
	} catch (error) {
		console.error(chalk.red('Error syncing Reflag OpenAPI spec and package.json version'));
		console.error(error);
	}
}

sync();
