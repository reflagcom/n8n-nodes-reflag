import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class ReflagAPI implements ICredentialType {
	name = 'ReflagAPI';
	displayName = 'Reflag API';
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
	documentationUrl = 'https://docs.reflag.com';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
		},
		{
			displayName: 'URL',
			name: 'url',
			type: 'string',
			default: 'https://app.reflag.com/api',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.apiKey}}',
			},
		},
	};
}
