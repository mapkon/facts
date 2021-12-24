const PASSED = 'Passed';
const FAILED = 'Failed';
const assert = require('assert').strict;
const UNICODE_PASS_CHECK_MARK = '0x2705';
const UNICODE_FAILED_CHECK_MARK = '0x274C';

const enhancedTestLogging = (checkmark, text) => {
    console.log(String.fromCharCode(checkmark), text);
}

const assertAndLog = (assertion, log) => {
    if (assertion) {
        return enhancedTestLogging(UNICODE_FAILED_CHECK_MARK, FAILED);
    }
    return enhancedTestLogging(UNICODE_PASS_CHECK_MARK, log || PASSED)
}

const assertTrue = assertion => {
    try {
        return assertAndLog(assert.ok(assertion), PASSED);
    } catch (ex) {
        return enhancedTestLogging(UNICODE_FAILED_CHECK_MARK, FAILED);
    }
}

module.exports = {
    assertTrue,
    assertAndLog,
}