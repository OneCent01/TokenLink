const TokenLink = require('TokenLink')

const tokenStore = TokenLink.createTokenStore()

const newToken = tokenStore.createToken()

console.log('new token: ', newToken)