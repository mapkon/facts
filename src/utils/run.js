const _input = require('../api/input');
const _query = require('../api/query');
const { validate } = require('../validation/validation')
const { destructureQuery, isInputQuery, isValidQuery, getQueryParams } = require('../utils/queryUtils');

const run = query => {
    const res = validate(query);
    if (res.next().value) {
        const res = destructureQuery(query)
        const params = getQueryParams(query)
        if (isInputQuery(query))
            return _input.trackFact(res[1], params)
        if (isValidQuery(query))
            return runWithContext(res[1], params)
    }
    return res.next().value
}

const runWithContext = (statement, params) => {
    const values = _query.getFactValue(statement)
    if (!values)
        return false;
    return queryWithContext(statement, params, values)
}

const queryWithContext = (statement, params, values) => {
    with (_query) {
        if (!isVariableCapture(params))
            return getNonVariableCapture(statement, params)
        // has variables
        const terms = getTerms(params)
        return values
            .reduce((acc, current, _) => {
                let value = []
                if (sameTerms(terms))
                    value = new Set(current).size == 1 ? [`${terms[0]}: ${current[0]}`] : []
                else
                    value = interlopVarAndValues(terms, params, current)
                return [...acc.filter(x => x.length), value.join(', ')]
            }, []);
    }
}

module.exports = {
    run,
}