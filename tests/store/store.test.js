(() => {
    const assert = require('assert').strict;
    const { assertTrue, assertAndLog } = require('../utils/assertive');
    const { save, contains, containsParams, retrieve } = require('../../src/store/store');
    const { IS_A_SHITLOAD, IS_A_YOUNG, IS_A_CAT, ARE_FRIENDS } = require('../../artifacts/queryExamples');

    const seedData = () => {
        save(`${IS_A_CAT}`, 'Audrey');
        save(`${IS_A_YOUNG}`, ['neil', 'greg']);
        save(`${ARE_FRIENDS}`, ['Aaron', 'Audrey']);
        save(`${IS_A_SHITLOAD}`, ['zac', 'lubega']);
    };

    const testThatStoreCanSave = query => {
        assertTrue(save(query, 'mosze'))
    };

    const testThatStoreContainsPersistedValue = query => {
        assertTrue(contains(query))
    };

    const testThatStoreContainsPersistedValueWithParams = (query, param) => {
        save(query, param)
        assertTrue(containsParams(query, param))
    };

    const testThatStoreDoesNotContainPersistedValueWithParams = (query, param) => {
        assertTrue(!containsParams(query, param))
    };

    const testThatStoreDoesNotContainPersistedValueWithParamsForArray = (query, param) => {
        assertTrue(!containsParams(query, param))
    };

    const testThatRetrieveReturnsEmptyObjectForNonExistingKey = (query) => {
        const res = retrieve(query);
        assertAndLog(assert.ok(res !== null));
    }

    const testThatStoreContainsPersistedMultValueWithParams = (query, params) => {
        save(query, params)
        assertTrue(containsParams(query, params))
    }

    // set up
    seedData();

    console.log(' ================= STORE TESTS =================')

    testThatStoreCanSave(IS_A_SHITLOAD);
    testThatStoreContainsPersistedValue(IS_A_SHITLOAD);
    testThatRetrieveReturnsEmptyObjectForNonExistingKey(IS_A_CAT);
    testThatStoreContainsPersistedValueWithParams(IS_A_CAT, 'Zac');
    testThatStoreDoesNotContainPersistedValueWithParams(IS_A_SHITLOAD, 'Onapwata');
    testThatStoreContainsPersistedMultValueWithParams(ARE_FRIENDS, ['zac', 'lubega']);
    testThatStoreDoesNotContainPersistedValueWithParamsForArray(ARE_FRIENDS, ['-Zac', '_']);
})()