const core = require('@actions/core')

const main = async () => {
  const resultsPath = core.getInput('resultPath')
  const results = require(resultsPath).results[0].suites
  results.forEach((suite) => {
    const failedTests = []
    const failedHooks = []

    suite.beforeHooks.forEach((hook) => {
      if (hook.fail) {
        failedHooks.push(`${hook.title}\n${hook.err.message}\n`)
      }
    })
    suite.tests.forEach((test) => {
      if (test.fail) {
        failedTests.push(`${test.title}\n${test.err.message}\n`)
      }
    })
    suite.afterHooks.forEach((hook) => {
      if (hook.fail) {
        failedHooks.push(`${hook.title}\n${hook.err.message}\n`)
      }
    })
    if (failedTests.length > 0) {
      core.setFailed(
        `${suite.title} - ${
          failedTests.length
        } test(s) failed: \n${failedTests.join('\n')}`
      )
    }

    if (failedHooks.length > 0) {
      core.setFailed(
        `${suite.title} - ${
          failedHooks.length
        } hook(s) failed: \n${failedHooks.join('\n')}`
      )
    }
  })
}

main().catch((err) => core.setFailed(err.message))
