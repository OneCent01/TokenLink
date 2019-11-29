# TokenL

TokenLink is a JavaScript library for managing tokens.

## Installation

Use the package manager npm to install TokenLink!

```bash
npm install TokenLink
```

## Usage

```javascript
const TokenLink = require('TokenLink')

const tokenStore = TokenLink.createTokenStore()

const newToken = tokenStore.createToken()

const tokenAssociatedData = 'secret_key'

tokenStore.setTokenVal(
	tokenAssociatedData
	// token(optional); by default sets val to the last created token
) 

```