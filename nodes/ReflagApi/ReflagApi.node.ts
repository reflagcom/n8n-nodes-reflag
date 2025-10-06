import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { N8NPropertiesBuilder, N8NPropertiesBuilderConfig } from '@devlikeapro/n8n-openapi-node';
import openapiSpec from './gen/openapi.json';
import packageJson from '../../package.json';

const config: N8NPropertiesBuilderConfig = {};
const parser = new N8NPropertiesBuilder(openapiSpec, config);
const properties = parser.build();
const version = packageJson.version;
const majorVersion = parseInt(version.split('.')[0]);

export class ReflagApi implements INodeType {
	description: INodeTypeDescription = {
		name: 'reflagApi',
		displayName: 'Reflag Api',
		icon: {
			light: 'file:reflag-light.svg',
			dark: 'file:reflag-dark.svg',
		},
		group: ['transform'],
		version: majorVersion,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Automate your feature flagging through the Reflag API',
		defaults: {
			name: 'Reflag',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'ReflagApi',
				required: true,
			},
		],
		requestDefaults: {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'reflag-sdk-version': `n8n/${version}`,
			},
			baseURL: '={{$credentials.url}}',
		},
		properties,
	};
}
