(() => {
    const assert = require('assert').strict;
    const { trackFact } = require('../../src/api/input');
    const { getFact, getTerms } = require('../../src/api/query');
    const { assertTrue, assertAndLog } = require('../utils/assertive');
    const { IS_A_YOUNG, IS_A_SHITLOAD, ARE_FRIENDS } = require('../../artifacts/queryExamples');
    const { INPUT_TAG, QUERY_TAG, isValidQuery, validate,  } = require('../../src/utils/queryUtils');

    const seedData = () => {
        trackFact(IS_A_YOUNG, ['neil', 'greg']);
        trackFact(IS_A_SHITLOAD, ['zac', 'lubega']);
    };

    const testThatInputIsInvalid = query => {
        assertTrue(!validate(query));
    }

    const testThatGetFactDoesNotReturnNull = () => {
        assertAndLog(assert.notEqual(null, getFact(`${IS_A_YOUNG} (neil)`)))
    }

    const testThatGetFactDoesNotReturnUndefined = () => {
        assertAndLog(assert.notEqual(null, getFact(`${IS_A_YOUNG} (greg)`)))
    }

    const testThatGetFactReturnsTrueForExistingRelationship = () => {
        assertTrue(getFact(IS_A_YOUNG, ['neil', 'greg']));
    }

    const testThatIsQueryReturnsTrueForProperQuery = () => {
        assertTrue(isValidQuery(`${QUERY_TAG} ${IS_A_YOUNG} (neil)`));
    }

    const testThatIsQueryReturnsFalseForInvalidrQuery = () => {
        assertTrue(!isValidQuery((`${INPUT_TAG} ${IS_A_YOUNG} (neil)`)));
    }

    const testThatGetFactReturnsFalseForNonExistingRelationship = () => {
        assertAndLog(assert.deepEqual(Object.create(null), getFact(ARE_FRIENDS, ['neil', 'trump'])));
    }

    // get terms
    const testThatGetTermsDoesNotReturnNullForEmptyArray = () => {
        assertAndLog(assert.notEqual(null, getTerms([])))
    }

    const testThatGetTermsDoesNotReturnNullForValidInput = () => {
        assertAndLog(assert.notEqual(null, getTerms(['X'])))
    }

    const testThatGetTermsReturnsTermsForSingleValidInput = () => {
        assertAndLog(assert.deepEqual(['X'], getTerms(['X'])))
    }

    const testThatGetTermsReturnsTermsForDoubleValidInput = () => {
        assertAndLog(assert.deepEqual(['X', 'Y'], getTerms(['X', 'Y'])))
    }

    const testThatGetTermsReturnsTermsForVariedTerms = () => {
        assertAndLog(assert.deepEqual(['Y', 'Flav', 'G'], getTerms(['Y', '1', 'flavour', 'Flav', 'G'])))
    }

    // setup
    seedData();

    console.log(' ================= RUNNING QUERY API TESTS =================')

    testThatInputIsInvalid(IS_A_YOUNG);
    testThatGetFactDoesNotReturnNull();
    testThatGetFactDoesNotReturnUndefined();
    testThatIsQueryReturnsTrueForProperQuery();
    testThatIsQueryReturnsFalseForInvalidrQuery();
    testThatGetFactReturnsTrueForExistingRelationship();
    testThatGetFactReturnsFalseForNonExistingRelationship();
    // terms
    testThatGetTermsDoesNotReturnNullForEmptyArray()
    testThatGetTermsDoesNotReturnNullForValidInput()
    testThatGetTermsReturnsTermsForSingleValidInput()
    testThatGetTermsReturnsTermsForDoubleValidInput()
    testThatGetTermsReturnsTermsForDoubleValidInput()
    testThatGetTermsReturnsTermsForVariedTerms()
})();