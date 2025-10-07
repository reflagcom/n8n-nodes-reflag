import chalk from 'chalk';
import { writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { compareVersions } from 'compare-versions';

const OPENAPI_URL = new URL('https://app.reflag.com/openapi.json');
const OUTPUT_OPENAPI_PATH = path.join(process.cwd(), 'nodes', 'Reflag', 'gen', 'openapi.json');
const PACKAGE_JSON_PATH = path.join(process.cwd(), 'package.json');

export default async function sync() {
	try {
		console.log(chalk.green('Syncing Reflag OpenAPI spec'));
		const response = await fetch(OPENAPI_URL, {
			method: 'GET',
		});

		const spec = await response.json();
		const version = spec.info.version;

		const packageJson = JSON.parse(await readFile(PACKAGE_JSON_PATH, 'utf-8'));
		const isNewVersion = compareVersions(version, packageJson.version) === 1;

		if (isNewVersion) {
			console.log(
				chalk.green(`Updating package.json version from '${packageJson.version}' to '${version}'`),
			);
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

			console.log(chalk.green('Writing OpenAPI spec to gen/openapi.json'));
			await writeFile(OUTPUT_OPENAPI_PATH, JSON.stringify(spec, null, 2));
		} else {
			console.log(
				chalk.cyan(
					`Package.json version '${packageJson.version}' is the same or newer than the OpenAPI spec version. Skipping sync.`,
				),
			);
		}
	} catch (error) {
		console.error(chalk.red('Error syncing Reflag OpenAPI spec and package.json version'));
		console.error(error);
	}
}

sync();
