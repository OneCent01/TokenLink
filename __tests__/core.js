const { createTokenStore } =  require('../token_link.js')
const fs = require('fs')
// INSTANTIATION

const tests = {
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

	},
	"Creation: create tokens": () => {
		const tokenStore = createTokenStore()

		const numberToken = tokenStore.createToken(10) // number
		const arrayToken = tokenStore.createToken([1, 2, 3]) // array
		const objectToken = tokenStore.createToken({id: 'terry'}) // object
		const stringToken = tokenStore.createToken('elephants') // string

		const tokenStoreTokens = tokenStore.getTokens()

		expect(tokenStoreTokens.length).toBe(4)

		expect(typeof tokenStore.getTokenVal(numberToken)).toBe('number')
		expect(Array.isArray(tokenStore.getTokenVal(arrayToken))).toBe(true)
		expect(typeof tokenStore.getTokenVal(objectToken)).toBe('object')
		expect(typeof tokenStore.getTokenVal(stringToken)).toBe('string')

	}
}

Object.keys(tests).forEach(testName => test(testName, tests[testName]))

// fs.writeFile('results', `true, true`,)
// // SETTINGS

// test('Setter: setTokenVal', () => {

// })

// test('Setter: setTokens', () => {

// })

// test('Setter: setTokenCounter', () => {

// })

// test('Setter: updateId', () => {

// })

// // GETTING

// test('Getter: getTokenVal', () => {
	
// })

// test('Getter: getId', () => {
	
// })

// test('Getter: getTokens', () => {
	
// })

// test('Getter: getStore', () => {
	
// })

// test('Getter: getTokenCounter', () => {
	
// })


// // CLEARING

// test('Clearing: clearToken', () => {
	
// })

// test('Clearing: clearTokens', () => {
	
// })
