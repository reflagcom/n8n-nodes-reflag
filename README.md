# n8n-nodes-reflag

This is an [n8n community node npm package](https://www.npmjs.com/package/@reflag/n8n-nodes-reflag). It lets you use Reflag feature flagging service in your n8n workflows.

Reflag is a feature flag management platform with self-cleaning flags, strong type-safety, gradual rollouts, and built-in Linear integration.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Credentials

To use the Reflag node, you need to authenticate with your Reflag account using an API key.

### Prerequisites

1. Sign up for a Reflag account at [https://app.reflag.com/signup](https://app.reflag.com/signup)
2. Generate an API key from your [application settings](https://app.reflag.com/env-current/settings/org-api-access)

### Setup

1. In the Reflag node credentials, enter your API key
2. The default URL is set to `https://app.reflag.com/api` (you can change this if using a custom instance)

Some operations require additional details:
- App ID is available in settings under [General for the App](https://app.reflag.com/env-current/settings/app-general)
- Flag keys are listed in the Key column on the [Flags page](https://app.reflag.com/env-current/flags)
- Org ID you can get from the results of a Get App operation
- Env ID you can get from the results of a List Apps operation

## Compatibility

- **Minimum n8n version**: 1.0.0
- **Node.js version**: >=20.15
- **Tested with n8n versions**: 1.111.0+

## Resources

- [Reflag Homepage](https://reflag.com)
- [Reflag Documentation](https://docs.reflag.com)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
