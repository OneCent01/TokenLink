class MyCustomReporter {
	constructor(globalConfig, options) {
	  this._globalConfig = globalConfig
	  this._options = options
	}

	onTestResult(_, testResult) {
		const results = testResult.testResults.reduce((results, result) => {
			const target = result.status === 'passed' ? results.success : results.fail
			target.count++
			target.names.push(result.title)

			return results
		}, {
			success: {count: 0, names: []}, 
			fail: {count: 0, names: []}
		})

		console.log('results: ', results)
	}
}

module.exports = MyCustomReporter