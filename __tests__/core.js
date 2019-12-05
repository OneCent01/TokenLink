const { createTokenStore } =  require('../token_link.js')

// INSTANTIATION

test('Insantiation: token store type', () => {
	let tokenStore = createTokenStore()
	let tokenStoreState = tokenStore.getStore()

	expect(typeof tokenStoreState).toBe('object')
	expect(Array.isArray(tokenStoreState)).toBe(false)
})

test('Instantiation: ID default', () => {
	let tokenStore = createTokenStore()
	let tokenStoreId = tokenStore.getId()

	expect(typeof tokenStoreId).toBe('string')
	expect(tokenStoreId.length).toBe(6)
})

test('Instantiation: setting ID', () => {
	const tokenStore = createTokenStore({id: 'connection'})
	const tokenStoreId = tokenStore.getId()

	expect(typeof tokenStoreId).toBe('string')
	expect(tokenStoreId).toBe('connection')
})

test('Instantiation: default store', () => {
	const testDefaultStore = {connection1: null, connection2: null}
	const tokenStore = createTokenStore({store: testDefaultStore})
	const tokenStoreState = tokenStore.getStore()

	expect(JSON.stringify(tokenStoreState)).toBe(JSON.stringify(testDefaultStore))
	expect(tokenStore.getTokenCounter()).toBe(3)
})

test('Instantiation: default store and ID', () => {
	const testDefaultStore = {connection1: null, connection2: null}
	const tokenStore = createTokenStore({id: 'connection', store: testDefaultStore})

	tokenStore.createToken()
	const tokenStoreTokens = tokenStore.getTokens()

	expect(tokenStoreTokens.length).toBe(3)
	expect(tokenStoreTokens.includes('connection3')).toBe(true)
})

// CREATION

test('Creation: create tokens', () => {
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
})

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
