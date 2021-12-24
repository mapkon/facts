

(() => {
    const assert = require('assert').strict
    const { run } = require('../../src/utils/run')
    const { assertAndLog } = require('../utils/assertive')
    const { ARE_FRIENDS, ARE_FIENDS, HAS_FIENDS } = require('../../artifacts/queryExamples')

    console.log(' ================= RUNNING RUN API TESTS =================')

    const testThatRunDoesNotReturnNull = () => {
        assertAndLog(assert.notEqual(run(`INPUT ${ARE_FIENDS} (_, *)`), null))
    }

    const testThatRunDoesNotReturnUndefined = () => {
        assertAndLog(assert.notEqual(run(`INPUT ${ARE_FIENDS}(^, _)`), undefined))
    }

    const testThatRunInputsTheDataThatIsQueryable = () => {
        const abstractQuery = `${ARE_FIENDS} (neil, mark)`
        run(`INPUT ${abstractQuery}`)
        const queryRes = run(`QUERY ${abstractQuery}`)
        assertAndLog(assert.equal(true, queryRes))
    }

    const testThatRunReturnsTrueForExistentFactsWithNoSpaceBetweenParams = () => {
        const queryRes = run(`QUERY ${ARE_FIENDS} (neil,mark)`)
        assertAndLog(assert.equal(true, queryRes))
    }

    const testThatRunReturnsFalseForNonExistentFacts = () => {
        const queryRes = run(`QUERY ${ARE_FIENDS} (neil, biden)`)
        assertAndLog(assert.equal(false, queryRes))
    }

    const testThatVariableCaptureXDoesNotReturnNull = () => {
        const abstractQuery = `${HAS_FIENDS} (neil, mark)`
        run(`INPUT ${abstractQuery}`)
        const queryRes = run(`QUERY ${HAS_FIENDS} (X, neil)`)
        assertAndLog(assert.notEqual(null, queryRes))
    }

    const testThatVariableCaptureXDoesNotReturnUndefined = () => {
        const queryRes = run(`QUERY ${HAS_FIENDS} (X, mark)`)
        assertAndLog(assert.notEqual(void 0, queryRes))
    }

    const testThatVariableCaptureXReturnsValues = () => {
        const queryRes = run(`QUERY ${HAS_FIENDS} (X, mark)`)
        assertAndLog(assert.equal('X: neil', queryRes.join(',').trim()))
    }

    const testThatVariableCaptureXReturnsInverseValue = () => {
        const queryRes = run(`QUERY ${HAS_FIENDS} (X, neil)`)
        assertAndLog(assert.equal('X: mark', queryRes.join(', ').trim()))
    }

    const testThatDoubleVariableCaptureDoesNotReturnNull = () => {
        const abstractQuery = `${ARE_FRIENDS} (neil, mark)`
        run(`INPUT ${abstractQuery}`)
        const queryRes = run(`QUERY ${ARE_FRIENDS} (X, Y)`)
        assertAndLog(assert.notEqual(null, queryRes))
    }

    const testThatDoubleVariableCaptureDoesNotReturnUndefined = () => {
        const queryRes = run(`QUERY ${ARE_FRIENDS} (X, Y)`)
        assertAndLog(assert.notEqual(void 0, queryRes))
    }

    const testThatDoubleVariableCaptureReturnsValues = () => {
        const queryRes = run(`QUERY ${ARE_FRIENDS} (X, Y)`)[0]
        assertAndLog(assert.equal('X: neil, Y: mark', queryRes))
    }

    const testThatDoubleVariableCaptureReturnsValuesForMultiplePairs = () => {
        run(`INPUT ${ARE_FRIENDS} (alex, sam)`)
        const queryRes = run(`QUERY ${ARE_FRIENDS} (X, Y)`)
        assertAndLog(assert.equal('X: neil, Y: mark, X: alex, Y: sam', queryRes.join(', ')))
    }

    const testThatDoubleVariableCaptureReturnsValuesForDiscreetPairs = () => {
        run(`INPUT loves (garfield, lasagna)`)
        const queryRes = run(`QUERY loves (garfield, FavoriteFood)`)
        assertAndLog(assert.equal('FavoriteFood: lasagna', queryRes.join(', ')))
    }

    const testThatDoubleVariableCaptureReturnsValuesForDiscreetVariableCapture = () => {
        run(`INPUT is_a_cat (lucy)`)
        const queryRes = run(`QUERY is_a_cat (X)`)
        assertAndLog(assert.equal('X: lucy', queryRes.join(', ')))
    }

    const testThatTripleVariableCaptureReturnsCapturedValues = () => {
        run(`INPUT make_a_triple (3, 4, 5)`)
        const queryRes = run(`QUERY make_a_triple (X, 4, Y)`)
        assertAndLog(assert.equal('X: 3, Y: 5', queryRes.join(', ')))
    }

    const testThatDoubleVariableCaptureReturnsValuesForSameVariable = () => {
        run('INPUT are_friends (sam, sam)')
        const queryRes = run(`QUERY ${ARE_FRIENDS} (Y, Y)`)[0]
        assertAndLog(assert.equal(queryRes, 'Y: sam'))
    }

    const testThatTripleVariableCaptureReturnsFalseForNonCapturedValues = () => {
        run(`INPUT make_a_triple (5, 12, 13)`)
        const queryRes = run(`QUERY make_a_triple (X, X, Y)`)
        assertAndLog(assert.equal(false, queryRes.join(', ')))
    }

    // Run fixtures
    testThatRunDoesNotReturnNull()
    testThatRunDoesNotReturnUndefined()
    testThatRunInputsTheDataThatIsQueryable()
    testThatRunReturnsFalseForNonExistentFacts()
    // single variable capture
    testThatVariableCaptureXDoesNotReturnNull()
    testThatVariableCaptureXReturnsValues()
    testThatVariableCaptureXReturnsInverseValue()
    testThatVariableCaptureXDoesNotReturnUndefined()
    testThatRunReturnsTrueForExistentFactsWithNoSpaceBetweenParams()
    // Double
    testThatDoubleVariableCaptureDoesNotReturnNull()
    testThatDoubleVariableCaptureDoesNotReturnUndefined()
    testThatDoubleVariableCaptureReturnsValues()
    testThatDoubleVariableCaptureReturnsValuesForMultiplePairs();
    testThatDoubleVariableCaptureReturnsValuesForDiscreetPairs()
    testThatDoubleVariableCaptureReturnsValuesForDiscreetVariableCapture()
    testThatTripleVariableCaptureReturnsCapturedValues()
    testThatDoubleVariableCaptureReturnsValuesForSameVariable()
    // testThatTripleVariableCaptureReturnsFalseForNonCapturedValues()

})()