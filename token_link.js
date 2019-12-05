const crypto = require('crypto')

const createTokenStore = (options={}) => {
	const { id, store } = options

	const createValidId = id => (
		id && typeof id === 'string' 
			? id 
			: crypto.randomBytes(6 * 6).toString('base64').slice(0, 6)
	)

	const freshTokenCounter = (tokenStore) => {
		const tokensCount = Object.keys(tokenStore).length + 1
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

		return maxNum
	}

	const defaultTokenStore = (
		store && typeof store === 'object' && !Array.isArray(store) 
		? store 
		: {}
	)

	const storeState = {
		id: createValidId(id),
		store: defaultTokenStore,
		created: freshTokenCounter(defaultTokenStore)
	}


	const setTokenCounter = counterVal => {storeState.created = Math.floor(counterVal)}

	const setTokenVal = (val, token=`${storeState.id}${storeState.created}`) => {
		if(storeState.store.hasOwnProperty(token)) {
			storeState.store[token] = val
			return true
		} else {
			return 'ERROR: token not found in store'
		}
	}
	
	return {
		createToken: (val) => {
			const newToken = `${storeState.id}${storeState.created++}`
			storeState.store[newToken] = val !== undefined ? val : null
			return newToken
		},
		setTokenVal,
		getTokenVal: token => {
			if(storeState.store.hasOwnProperty(token)) {
				return storeState.store[token]
			} else {
				return 'ERROR: token not found in store'
			}
		},
		getId: () => storeState.id,
		getTokens: () => Object.keys(storeState.store),
		clearToken: token => {
			storeState.store = Object.keys(storeState.store).filter(t => t !== token).reduce((newStore, token) => {
				newStore[token] = storeState.store[token]
				return newStore
			}, {})
		},
		clearTokens: () => {
			storeState.store = {}
			setTokenCounter(0)
			return true
		},
		setTokens: (tokens) => {
			if(
				tokens 
				&& typeof tokens === 'object' 
			) {
				if(Array.isArray(tokens)) {
					tokens.forEach(token => {
						storeState.store[token] = null
					})
				} else {
					storeState.store = {
						...storeState.store,
						...tokens
					}
				}

				setTokenCounter(
					freshTokenCounter(storeState.store)
				)

				return true
			} else {
				return 'ERROR: invalid tokens format'
			}
		},
		getStore: () => ({...storeState.store}),
		setTokenCounter,
		getTokenCounter: () => storeState.created,
		updateId: (newId, counterVal) => {
			storeState.id = createValidId(newId)
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