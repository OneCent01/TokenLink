const crypto = require('crypto')

const createTokenStore = (id) => {
	const identifier = (
		id && typeof id === 'string' 
			? id 
			: crypto.randomBytes(4).toString('base64')
	)
	let created = 0
	// private store only accessible through the publicly 
	// exposed methods in the return
	const tokenStore = {}
	return {
		createToken: () => {
			const newToken = `${identifier}${created++}`
			tokenStore[newToken] = null
			return newToken
		},
		setTokenVal: (val, token=`${identifier}${created}`) => {tokenStore[token] = val},
		getTokenVal: token => tokenStore[token],
		getTokens: () => Object.keys(tokenStore),
		clearToken: token => {tokenStore[token] = null},
		clearTokens: () => {
			tokenStore = {}
			created = 0
		}
	}
}

export default createTokenStore