const core = require('@actions/core')

const main = async () => {
  const resultsPath = core.getInput('resultPath')
  const codeceptInput = core.getInput('codeceptInput') || undefined
  let results
  if (codeceptInput) {
    results = handleCodeceptOutput(resultsPath)
    console.log(results)
  }
  results.forEach((suite) => {
    if (suite.failedTests.length > 0) {
      core.setFailed(`${suite.title} - ${suite.failedTests.length} test(s) failed: \n${suite.failedTests.join('\n')}`)
    }
    if (suite.failedHooks.length > 0) {
      core.setFailed(`${suite.title} - ${suite.failedHooks.length} hook(s) failed: \n${suite.failedHooks.join('\n')}`)
    }
  })
}

main().catch((err) => core.setFailed(err.message))

function handleCodeceptOutput (reportPath) {
  const results = require(reportPath).results[0].suites
  console.log(results)
  const output = []
  results.forEach((suite) => {
    const suiteOutput = { title: suite.title, failedTests: [], failedHooks: [] }
    suite.beforeHooks.forEach((hook) => {
      if (hook.fail) suiteOutput.failedHooks.push(`${hook.title}\n${hook.err.message}\n`)
    })
    suite.afterHooks.forEach((hook) => {
      if (hook.fail) suiteOutput.failedHooks.push(`${hook.title}\n${hook.err.message}\n`)
    })
    suite.tests.forEach((test) => {
      if (test.fail) suiteOutput.failedTests.push(`${test.title}\n${test.err.message}\n`)
    })
    output.push(suiteOutput)
  })
  return output
}
