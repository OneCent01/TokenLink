const fs = require('fs')

class MyCustomReporter {
	constructor(globalConfig, options) {
	  this._globalConfig = globalConfig
	  this._options = options
	}

	onTestResult(_, res) {
		const results = res.testResults.reduce((results, result) => {
			const target = (
				result.status === 'passed' 
					? results.success 
					: results.fail
			)

			target.count++
			target.names.push(result.title)

			return results
		}, {
			success: {count: 0, names: []}, 
			fail: {count: 0, names: []}
		})

		// Hook in README file modification with fs 
		// depending on the successs or failure of the tests
	}
}

module.exports = MyCustomReporter