const { createTokenStore } =  require('../token_link.js')
const fs = require('fs')
// INSTANTIATION

const instnatiationTests = {
	"Insantiation: token store type": () => {
		let tokenStore = createTokenStore()
		let tokenStoreState = tokenStore.getStore()

		expect(typeof tokenStoreState).toBe('object')
		expect(Array.isArray(tokenStoreState)).toBe(false)
	},
	"Instantiation: ID default": () => {
		const tokenStore = createTokenStore({id: 'connection'})
		const tokenStoreId = tokenStore.getId()

		expect(typeof tokenStoreId).toBe('string')
		expect(tokenStoreId).toBe('connection')
	},
	"Instantiation: default store": () => {
		const testDefaultStore = {connection1: null, connection2: null}
		const tokenStore = createTokenStore({store: testDefaultStore})
		const tokenStoreState = tokenStore.getStore()

		expect(JSON.stringify(tokenStoreState)).toBe(JSON.stringify(testDefaultStore))
		expect(tokenStore.getTokenCounter()).toBe(3)
	},
	"Instantiation: default store and ID": () => {
		const testDefaultStore = {connection1: null, connection2: null}
		const tokenStore = createTokenStore({id: 'connection', store: testDefaultStore})

		tokenStore.createToken()
		const tokenStoreTokens = tokenStore.getTokens()

		expect(tokenStoreTokens.length).toBe(3)
		expect(tokenStoreTokens.includes('connection3')).toBe(true)
	}
}

const tokenCreationTests = {
	"Creation: token with number data": () => {
		const tokenStore = createTokenStore()

		const numberToken = tokenStore.createToken(10) // number

		expect(typeof tokenStore.getTokenVal(numberToken)).toBe('number')
	},
	"Creation: token with array data": () => {
		const tokenStore = createTokenStore()

		const arrayToken = tokenStore.createToken([1, 2, 3]) // array

		expect(Array.isArray(tokenStore.getTokenVal(arrayToken))).toBe(true)
	},
	"Creation: token with object data": () => {
		const tokenStore = createTokenStore()

		const objectToken = tokenStore.createToken({id: 'terry'}) // object

		expect(typeof tokenStore.getTokenVal(objectToken)).toBe('object')
	},
	"Creation: token with string data": () => {
		const tokenStore = createTokenStore()

		const stringToken = tokenStore.createToken('elephants') // string

		expect(typeof tokenStore.getTokenVal(stringToken)).toBe('string')
	}
}

const setterTests = {
	"Setter: setTokenVal": () => {
		const tokenStore = createTokenStore()

		const newToken = tokenStore.createToken()

		expect(tokenStore.setTokenVal('data', newToken)).toBe(true)
		expect(tokenStore.getTokenVal(newToken)).toBe('data')
	},
	"Setter: setTokenCounter": () => {
		const newCounterVal = 20

		const tokenStore = createTokenStore({id: 'connection'})

		expect(tokenStore.setTokenCounter(newCounterVal)).toBe(true)


		expect(tokenStore.getTokenCounter()).toBe(newCounterVal)

		tokenStore.createToken()

		expect(tokenStore.getTokens().includes('connection20')).toBe(true)
	},
	"Setter: updateId": () => {
		const tokenStore = createTokenStore({id: 'connection'})
		tokenStore.updateId('client')

		tokenStore.createToken()

		expect(tokenStore.getTokens().includes('client1')).toBe(true)
	},
	"Setter: setTokens array": () => {
		const tokenStore = createTokenStore()

		tokenStore.setTokens(['crazy_token_name', 'pew-pew', 'bling50'])
		console.log('tokenStore.getTokens(): ', tokenStore.getTokens())
		expect(tokenStore.getTokens().includes('crazy_token_name')).toBe(true)
		expect(tokenStore.getTokens().includes('pew-pew')).toBe(true)
		expect(tokenStore.getTokens().includes('bling50')).toBe(true)
		console.log('tokenStore.getTokenCounter(): ', tokenStore.getTokenCounter())
		expect(tokenStore.getTokenCounter()).toBe(51)
	},
	"Setter: setTokens object": () => {
		const tokenStore = createTokenStore()

		expect(tokenStore.setTokens({
			'crazy_token_name': 10, 
			'pew-pew': ['lol'], 
			'bling50': {desc: 'totally a JWT'}
		})).toBe(true)

		expect(tokenStore.getTokens().includes('crazy_token_name')).toBe(true)
		expect(tokenStore.getTokens().includes('pew-pew')).toBe(true)
		expect(tokenStore.getTokens().includes('bling50')).toBe(true)

		expect(tokenStore.getTokenCounter()).toBe(51)

		expect(tokenStore.getTokenVal('crazy_token_name')).toBe(10)
		expect(tokenStore.getTokenVal('pew-pew')[0]).toBe('lol')
		expect(tokenStore.getTokenVal('bling50').desc).toBe('totally a JWT')
	}
}

const getterTests = {
	"Getter: getTokenVal": () => {
		const tokenStore = createTokenStore()

		expect(tokenStore.setTokens({
			'crazy_token_name': 10, 
			'pew-pew': ['lol'], 
			'bling50': {desc: 'totally a JWT'}
		})).toBe(true)

		expect(tokenStore.getTokens().includes('crazy_token_name')).toBe(true)
		expect(tokenStore.getTokens().includes('pew-pew')).toBe(true)
		expect(tokenStore.getTokens().includes('bling50')).toBe(true)

		expect(tokenStore.getTokenCounter()).toBe(51)

		expect(tokenStore.getTokenVal('crazy_token_name')).toBe(10)
		expect(tokenStore.getTokenVal('pew-pew')[0]).toBe('lol')
		expect(tokenStore.getTokenVal('bling50').desc).toBe('totally a JWT')
	},
	"Getter: getId": () => {
		const tokenStore = createTokenStore({id: 'connection'})
		expect(tokenStore.updateId('client')).toBe(true)

		expect(tokenStore.getId()).toBe('client')
	},
	"Getter: getTokens": () => {
		const tokens = ['crazy_token_name', 'pew-pew', 'bling50']
		
		const tokenStore = createTokenStore()

		expect(tokenStore.setTokens(tokens)).toBe(true)

		expect(tokenStore.getTokens().every(token => tokens.includes(token))).toBe(true)
	},
	"Getter: getStore": () => {
		const defaultState = {key1: 'val1', key2: 2}
		const tokenStore = createTokenStore({store: defaultState})
		expect(JSON.stringify(tokenStore.getStore()) === JSON.stringify(defaultState)).toBe(true)
	},
	"Getter: getTokenCounter": () => {
		const tokenStore = createTokenStore()
		expect(tokenStore.setTokenCounter(42)).toBe(true)
		expect(tokenStore.getTokenCounter()).toBe(42)
	}
}

const clearTests = {
	"Clearing: clearToken": () => {
		const defaultState = {key1: 'val1', key2: 2}
		const tokenStore = createTokenStore({store: defaultState})

		expect(JSON.stringify(tokenStore.getStore()) === JSON.stringify(defaultState)).toBe(true)
		
		expect(tokenStore.getTokens().includes('key1')).toBe(true)
		
		tokenStore.clearToken('key1')

		expect(JSON.stringify(tokenStore.getStore()) !== JSON.stringify(defaultState)).toBe(true)
		
		expect(tokenStore.getTokens().includes('key1')).toBe(false)
		expect(tokenStore.getTokens().includes('key2')).toBe(true)
	},
	"Clearing: clearTokens": () => {
		const defaultState = {key1: 'val1', key2: 2}
		const tokenStore = createTokenStore({store: defaultState})
		
		expect(JSON.stringify(tokenStore.getStore()) === JSON.stringify(defaultState)).toBe(true)
		
		expect(tokenStore.getTokens().includes('key1')).toBe(true)
		
		tokenStore.clearTokens(['key1', 'key2'])

		expect(JSON.stringify(tokenStore.getStore()) !== JSON.stringify(defaultState)).toBe(true)
		
		expect(tokenStore.getTokens().includes('key1')).toBe(false)
		expect(tokenStore.getTokens().includes('key2')).toBe(false)
	}
}

const tests = {
	...instnatiationTests,
	...tokenCreationTests,
	...setterTests,
	...getterTests,
	...clearTests
}

Object.keys(tests).forEach(testName => test(testName, tests[testName]))