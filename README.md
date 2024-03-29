# TokenLink

TokenLink is a NodeJS library for managing tokens on the server.

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

### All methods
```
createTokenStore
    -> createToken
    -> setTokenVal
    -> getTokenVal
    -> getId
    -> getTokens
    -> clearToken
    -> clearTokens
    -> setTokens
    -> getStore
    -> setTokenCounter
    -> getTokenCounter
    -> updateId
```

#### createTokenStore([options])
* @args
    * options(optional): object enabling initialization variables to be set on instantiation. Currently supports setting the id string used for token generation and an object to use as the default token store. 
        * id: identifier to use as the base for creating token strings. Defaults to a randomly generated 6-character string. 
        * store: object to use as the default internal store rather than an empty object. 

Core method for instantiating TokenLink objects. Returns a reference to the created TokenLink object. 

```javascript
// tokens generated will use the given ID or a randomly generated 6-character string appended with the count 
const tokenStore = TokenLink.createTokenStore({id: 'client'})
```

#### createToken([val])
* @args: 
    * val(optional): value to associate with the token. Defaults to null. 

Generates a token, sets it on the store with the given value or a null by default. Returns the generated token. 

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

Looks up and returns the value of a given token in the store. On success, returns the value set on the token. Otherwise, returns the error string `ERROR: token not found in store`. 

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

Sets the value of the given token to null in the internal tokenState, erasing any previously associated data. Returns true on success. 

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
    * tokens: object of token-value pairs or an array of tokens to add to the tokenStore. 

Adds the given tokens to the internal tokenStore object, updating the token generation counter to the larger of (a) the new number of tokens in the store or (b) the largest trailing number in the updated store. Returns true on success, otherwise returns the error string `ERROR: invalid tokens format`.

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

Allows for setting of the counter number trailing every newly created token. Returns true on success. 

```javascript
const tokenStore = TokenLink.createTokenStore({id: 'client'})

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

Updates the identifier used to generate tokens when createToken is called. Uses the given id if it's valid, otherwise it generates a random 6-character base64 string to use. Returns true on success. 

```javascript
const tokenStore = TokenLink.createTokenStore({id: 'client'})

tokenStore.createToken()
tokenStore.updateId('connections')
tokenStore.createToken()

console.log(tokenStore.getTokens()) 
// output: [client0, connections1]
```

#### getId()
* @args
    * NO ARGS

Returns the current identifier used as the base for generated token strings.

```javascript
const tokenStore = TokenLink.createTokenStore({id: 'client'})

tokenStore.updateId('connections')

console.log(tokenStore.getId()) 
// output: 'connections'
```

#### getTokenCounter()
* @args
    * NO ARGS

Returns the current internal counter variable used to create tokens. 

```javascript
const tokenStore = createTokenStore()
tokenStore.setTokenCounter(42)
console.log(tokenStore.getTokenCounter()) 
// output: 42
```

## Thank you! 

Feel free to contact me with any questions or comments at jmpenney22@gmail.com. 

Pull requests are encouraged! 

## Changelog
* 1.2.5
    * TOKEN DATA TYPE: accept a value of any type to associate with a token, rather than restricting it to a stirng. 
    * INITIALIZATION OPTIONS: instantiation now accepts on optoinal object that sets initilization values. Current supports id (random string if none) and store (empty object if none)
    * SET TOKENS: accepts an array to set tokens in the store initilized with null assocaited data or an object with key-values to add to the store. 
