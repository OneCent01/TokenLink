const crypto = require('crypto')

const createTokenStore = (id) => {
	const createValidId = id => (
		id && typeof id === 'string' 
			? id 
			: crypto.randomBytes(6 * 6).toString('base64').slice(0, 6)
	)
	let identifier = createValidId(id)
	let created = 0

	// private store only accessible through the publicly 
	// exposed methods in the return
	let tokenStore = {}

	const areValidTokens = tokens => Object.values(tokens).every(val => (
		val === undefined 
		|| val === null 
		|| typeof val === 'string'
	))

	const setTokenCounter = counterVal => {created = Math.floor(counterVal)}

	const setTokenVal = (val, token=`${identifier}${created}`) => {
		if(tokenStore.hasOwnProperty(token)) {
			tokenStore[token] = val
			return true
		} else {
			return 'ERROR: token not found in store'
		}
	}
	
	return {
		createToken: (val) => {
			const newToken = `${identifier}${created++}`
			tokenStore[newToken] = val !== undefined ? val : null
			return newToken
		},
		setTokenVal,
		getTokenVal: token => {
			if(tokenStore.hasOwnProperty(token)) {
				return tokenStore[token]
			} else {
				return 'ERROR: token not found in store'
			}
		},
		getTokens: () => Object.keys(tokenStore),
		clearToken: token => {
			tokenStore = Object.keys(tokenStore).filter(t => t !== token).reduce((newStore, token) => {
				newStore[token] = tokenStore[token]
				return newStore
			}, {})
		},
		clearTokens: () => {
			tokenStore = {}
			setTokenCounter(0)
			return true
		},
		setTokens: (tokens) => {
			if(
				tokens 
				&& typeof tokens === 'object' 
				&& !Array.isArray(tokens)
				&& Object.keys(tokens).length
				&& areValidTokens(tokens)
			) {
				tokenStore = {
					...tokenStore,
					...tokens
				}
				const tokensCount = Object.keys(tokenStore).length
				const maxNum = Object.keys(tokenStore).reduce((max, token) => {
					let endFound = false
					
					const numbers = token.split('').reverse().reduce((final, char) => {
						if(!endFound && typeof +char === 'number') {
							final.push(char)
						} else {
							endFound = true
						}
						return final
					}, [])
					
					const number = +(numbers.reverse().join(''))
					if(number+1 > max) {
						max = number+1
					}
					
					return max
				}, tokensCount)

				setTokenCounter(maxNum)

				return true
			} else {
				return 'ERROR: invalid tokens format'
			}
		},
		getStore: () => ({...tokenStore}),
		setTokenCounter,
		updateId: (newId, counterVal) => {
			identifier = createValidId(newId)
			if(
				counterVal !== undefined 
				&& typeof counterVal === 'number'
			) {
				setTokenCounter(counterVal)
			}
		}
	}
}

module.exports = {createTokenStore}