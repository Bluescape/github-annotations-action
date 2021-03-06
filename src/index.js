const core = require('@actions/core')
const path = require('path')

const main = async () => {
  const resultsPath = path.resolve(core.getInput('report_path'))
  const reportType = core.getInput('report_type') || undefined
  let results
  if (reportType === 'codeceptjs') {
    results = handleCodeceptOutput(resultsPath)
    results.forEach((suite) => {
      if (suite.failedTests.length > 0) {
        core.setFailed(`${suite.title} - ${suite.failedTests.length} test(s) failed: \n${suite.failedTests.join('\n')}`)
      }
      if (suite.failedHooks.length > 0) {
        core.setFailed(`${suite.title} - ${suite.failedHooks.length} hook(s) failed: \n${suite.failedHooks.join('\n')}`)
      }
    })
  } else {
    core.setFailed('Report type not set!')
  }
}

function handleCodeceptOutput (reportPath) {
  const results = require(reportPath).results[0].suites
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

main().catch((err) => core.setFailed(err.message))
