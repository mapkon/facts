

(() => {
    const assert = require('assert').strict;
    const { assertTrue, assertAndLog } = require('../utils/assertive');
    const { trackFact } = require('../../src/api/input');
    const { IS_A_YOUNG, IS_A_SHITLOAD } = require('../../artifacts/queryExamples');
    const { INPUT_TAG, extractCommand, validate, isInputQuery } = require('../../src/utils/queryUtils');

    console.log(' ================= RUNNING INPUT API TESTS =================')

    const createInputTag = query =>
        `${INPUT_TAG} ${query}`;

    const testThatInputIsInvalid = query => {
        assertTrue(!validate(query));
    }

    const testThatInputIsValid = query => {
        assertTrue(validate(createInputTag(query)));
    }

    const testThatInputStartWithInCorrectTag = query => {
        const TAG = extractCommand(query);
        assertAndLog(assert(TAG !== INPUT_TAG));
    }

    const testThatInputStartWithCorrectTag = query => {
        const TAG = extractCommand(createInputTag(query));
        assertAndLog(assert(TAG === INPUT_TAG));
    }

    const testThatInputWithLessStringsThanTagValidatesWell = query => {
        const TAG = extractCommand(query);
        assertAndLog(assert(TAG !== INPUT_TAG));
    }

    const testThatIsInputQueryReturnsFalseForIncorrectInput = query => {
        assertTrue(!isInputQuery(query));
    }

    const testThatIsInputQueryReturnsTrueForCorrectInput = query => {
        assertTrue(isInputQuery(query));
    }

    const testThatTrackFactReturnsTrueForCorrectInput = (query, params) => {
        assertTrue(trackFact(query, params));
    }

    // Run fixtures
    testThatInputIsValid(IS_A_SHITLOAD)
    testThatInputIsInvalid(IS_A_YOUNG);
    testThatInputStartWithCorrectTag(IS_A_SHITLOAD);
    testThatInputStartWithInCorrectTag(IS_A_SHITLOAD);
    testThatInputWithLessStringsThanTagValidatesWell('is_a');
    testThatIsInputQueryReturnsFalseForIncorrectInput(IS_A_SHITLOAD);
    testThatIsInputQueryReturnsTrueForCorrectInput(createInputTag(IS_A_SHITLOAD));
    testThatTrackFactReturnsTrueForCorrectInput(createInputTag(IS_A_YOUNG), 'zac');
    testThatTrackFactReturnsTrueForCorrectInput(createInputTag(IS_A_SHITLOAD), ['zac', 'lubega']);

})()