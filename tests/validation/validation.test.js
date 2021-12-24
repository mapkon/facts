

(() => {
    const assert = require('assert').strict
    const { assertTrue, assertAndLog } = require('../utils/assertive')
    const { validate, run } = require('../../src/validation/validation')
    const { HAS_FRIENDS, ARE_FIENDS, HAS_FIENDS } = require('../../artifacts/queryExamples')

    console.log(' ================= RUNNING VALIDATION API TESTS =================')

    const yieldValidation = gen => gen.next().value

    const testThatValidInputPassesValidation = query => {
        assertTrue(yieldValidation(validate(query)))
    }

    const testThatInvalidInputFailsValidation = query =>
        assertTrue(!yieldValidation(validate(query)))

    const testThatInvalidInputFailsValidationWithoutParams = query => {
        const value = validate(query)
        assertTrue(!value.next().value)
        assertAndLog(assert.deepEqual(value.next().value,
            `Malformed query: The query is missing the PARAMETERS. The format is <COMMAND (INPUT || QUERY) ::QUERY:: (PARAM, ...). You entered: ${query}`))
    }

    const testThatValidInputPassesValidationForQuery = query =>
        assertTrue(yieldValidation(validate(query)))

    // Run fixtures
    testThatInvalidInputFailsValidation(ARE_FIENDS)
    testThatValidInputPassesValidation(`INPUT ${HAS_FRIENDS} (neil, chris)`)
    testThatValidInputPassesValidationForQuery(`QUERY ${HAS_FIENDS} (neil)`)
    testThatInvalidInputFailsValidationWithoutParams(`QUERY ${HAS_FIENDS} ()`)
    testThatInvalidInputFailsValidationWithoutParams(`INPUT ${HAS_FIENDS} (greg`)
    testThatInvalidInputFailsValidationWithoutParams(`QUERY ${HAS_FIENDS} keathley)`)

})()