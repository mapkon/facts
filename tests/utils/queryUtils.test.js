

(() => {
    const assert = require('assert').strict;
    const { assertAndLog, assertTrue } = require('./assertive');
    const { extractCommand, destructureQuery } = require('../../src/utils/queryUtils');
    const { INPUT_TAG, QUERY_TAG, createQueryTag } = require('../../src/utils/queryUtils');
    const { IS_A_YOUNG, IS_A_SHITLOAD, IS_A_CAT, ARE_FIENDS } = require('../../artifacts/queryExamples');

    const testThatExtractCommandDoesNotReturnNull = query => {
        assertAndLog(assert.notEqual(null, extractCommand(createQueryTag(INPUT_TAG, query))));
    }

    const testThatExtractCommandDoesNotReturnundefined = query => {
        assertAndLog(assert.notEqual(undefined, extractCommand(createQueryTag(QUERY_TAG, query))));
    }

    const testThatExtractCommandReturnsProperCommand = query => {
        const command = extractCommand(createQueryTag(INPUT_TAG, query));
        assertTrue(command === INPUT_TAG)
    }

    const testThatExtractCommandReturnsProperCommandForQuery = query => {
        const command = extractCommand(createQueryTag(QUERY_TAG, query));
        assertTrue(command === QUERY_TAG)
    }

    const testThatExtractQueryParamsDoesNotReturnNull = () => {
        const params = destructureQuery(`INPUT ${IS_A_SHITLOAD} (neil)`);
        assert.notDeepEqual(null, params);
    }

    const testThatExtractQueryParamsDoesNotReturnUndefined = () => {
        const params = destructureQuery(`QUERY ${IS_A_SHITLOAD} (neil)`);
        assert.notDeepEqual(undefined, params);
    }

    const testThatExtractQueryParamsReturnsProperDestructure = () => {
        const params = destructureQuery(`INPUT ${IS_A_CAT} (minty)`);
        assertAndLog(assert.strictEqual('INPUT', params[0]));
        assertAndLog(assert.strictEqual(IS_A_CAT, params[1]));
        assertAndLog(assert.strictEqual('minty', params[2]));
    }

    const testThatExtractQueryParamsReturnsProperDestructureForQuery = () => {
        const params = destructureQuery(`QUERY ${IS_A_CAT} (minty)`);
        assertAndLog(assert.strictEqual('QUERY', params[0]));
        assertAndLog(assert.strictEqual(IS_A_CAT, params[1]));
        assertAndLog(assert.strictEqual('minty', params[2]));
    }

    const testThatExtractQueryParamsReturnsProperDestructureWithParams = () => {
        const params = destructureQuery(`INPUT ${ARE_FIENDS} (neil, gollum)`);
        assertAndLog(assert.strictEqual('INPUT', params[0]));
        assertAndLog(assert.strictEqual(ARE_FIENDS, params[1]));
        assertAndLog(assert.strictEqual('neil, gollum', params[2]));
    }


    console.log(' ================= RUNNING QUERY UTIL TESTS =================')

    testThatExtractCommandReturnsProperCommand(IS_A_YOUNG);
    testThatExtractCommandDoesNotReturnNull(IS_A_SHITLOAD);
    testThatExtractCommandDoesNotReturnundefined(IS_A_SHITLOAD);
    testThatExtractCommandReturnsProperCommandForQuery(IS_A_YOUNG);
    // extract query COMMAND = STATEMENT = PARAMS
    testThatExtractQueryParamsDoesNotReturnNull()
    testThatExtractQueryParamsDoesNotReturnUndefined()
    testThatExtractQueryParamsReturnsProperDestructure()
    testThatExtractQueryParamsReturnsProperDestructureForQuery()
    testThatExtractQueryParamsReturnsProperDestructureWithParams()
})()