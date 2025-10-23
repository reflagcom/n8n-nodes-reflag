import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import packageJson from '../../package.json';
import { properties } from './gen/properties';

const version = packageJson.version;
const majorVersion = parseInt(version.split('.')[0]);

export class Reflag implements INodeType {
  description: INodeTypeDescription = {
    name: 'reflag',
    displayName: 'Reflag',
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
        name: 'reflagApi',
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
