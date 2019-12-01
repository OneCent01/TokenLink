# TokenLink

TokenLink is a JavaScript library for managing tokens. 

The core function, createTokenStore, is essentially a simple factory for instantiating key-value stores with extended functionality. 

## Installation

Use the package manager npm to install TokenLink!

```bash
npm install TokenLink
```

## Example Usage

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


## Available methods

#### createTokenStore([id])
* @args
    * id(optional): identifier to use as the base for creating token strings. Defaults to a random 

Core method for instantiating TokenLink objects. Returns a reference to the created TokenLink object. 

```javascript
// tokens generated will use the given ID or a randomly generated 6-character string appended with the count 
const tokenStore = TokenLink.createTokenStore('client')
```

#### createToken([val])
* @args: 
    * val(optional): value to associate with the token. Defaults to null. 

Generates a token, sets it on the store with the given value or a null by default. 

```javascript
const newToken = tokenStore.createToken()
```

#### setTokenVal(val[, token])
* @args
    * val: value to associate with the token
    * token(optional): token associated with the given value. Defaults to the last created token. 

Sets the value of a token in the store. Returns true if succeeded. 

```javascript
const tokenStore = TokenLink.createTokenStore()

const newToken = tokenStore.createToken()

tokenStore.setTokenVal('data', newToken)
```

#### getTokenVal(token)
* @args
    * token: token to look up in the tokenStore. 

Looks up and returns the value of a given token in the store. 

```javascript
const tokenStore = TokenLink.createTokenStore()

const newToken = tokenStore.createToken()

tokenStore.setTokenVal('data', newToken)

console.log(tokenStore.getTokenVal(newToken)) 
// output: 'data'
```

#### getTokens()
* @args
    * NO ARGS 

Gets every token currently in the tokenStore and return it as an array.

```javascript
const tokenStore = TokenLink.createTokenStore()

const newToken = tokenStore.createToken()

tokenStore.setTokenVal('data', newToken)

console.log(tokenStore.getTokens()) 
// output: [<newToken STRING>]
```

#### clearTokens()
* @args
    * NO ARGS

Reinitialized token store state, deleting all tokens and their associated values. Token state reinitialized empty. Returns true if succeeded. 

```javascript
const tokenStore = TokenLink.createTokenStore()

const newToken = tokenStore.createToken()

tokenStore.setTokenVal('data', newToken)

console.log(tokenStore.getTokens()) 
// output: [<newToken STRING>] array with the one set token

// remove all tokens and associated values
tokenStore.clearTokens() 

console.log(tokenStore.getTokens()) 
// output: [] (empty array)
```

#### clearToken(token)
* @args
    * token: token to lookup and clear

Sets the value of the given token to null in the internal tokenState, erasing any previously associated data.

```javascript
const tokenStore = TokenLink.createTokenStore()

const newToken = tokenStore.createToken()

tokenStore.setTokenVal('data', newToken)

console.log(tokenStore.getTokens()) 
// output: [<newToken STRING>] array with the one set token

// remove specified token and associated value
tokenStore.clearToken(newToken) 

console.log(tokenStore.getTokens()) 
// output: [] (empty array)
```

#### setTokens(tokens)
* @args
    * tokens: object with only strings as values to add to the tokenStore. 

Adds the given tokens to the internal tokenStore object, updating the token generation counter to the larger of (a) the new number of tokens in the store or (b) the largest trailing number in the updated store. 

```javascript
const tokenStore = TokenLink.createTokenStore()

tokenStore.setTokens({
	client1: 'client1_secret',
	client2: 'client2_secret',
	.
	.
	.
})

console.log(tokenStore.getTokens()) 
// output: [client1, client2, ...]
```

#### getStore()
* @args
    * NO ARGS 

Retuns a copy of the internal tokenStore object. 
```javascript
const tokenStore = TokenLink.createTokenStore()

tokenStore.setTokens({
	client1: 'client1_secret',
	client2: 'client2_secret',
	.
	.
	.
})

console.log(tokenStore.getStore())
// output: {client1: 'client1_secret', client2: 'client2_secret', ...}
```

#### setTokenCounter(counterVal)
* @args
    * counterVal: integer at which to set the internal tokenCounter variable

Allows for setting of the counter number trailing every newly created token. 

```javascript
const tokenStore = TokenLink.createTokenStore('client')

tokenStore.setTokenCounter(10)

tokenStore.createToken()
tokenStore.createToken()

console.log(tokenStore.getTokens()) 
// output: [client10, client11]
```

#### updateId(newId[, counterVal])
* @args
    * newId: string leading every generated token string
    * counterVal(optional): 

Updates the identifier used to generate tokens when createToken is called. Uses the given id if it's valid, otherwise it generates a random 6-character base64 string to use. 

```javascript
const tokenStore = TokenLink.createTokenStore('client')

tokenStore.createToken()
tokenStore.updateId('connections')
tokenStore.createToken()

console.log(tokenStore.getTokens()) 
// output: [client0, connections1]
```


## Thank you! 

Feel free to contact me with any questions or comments at jmpenney22@gmail.com. 

Pull requests are encouraged! 