const runTests = require('./utils/run.test')
const inputTests = require('./api/input.test')
const queryTests = require('./api/query.test')
const storeTests = require('./store/store.test')
const utilTests = require('./utils/queryUtils.test')
const validationTests = require('./validation/validation.test');

(() => {
    [inputTests, queryTests, storeTests, utilTests, validationTests, runTests].forEach(
        test => {
            if (typeof test === 'function')
                test()
        }
    );
    console.log(' ================= DONE RUNNING TESTS =================')
})()