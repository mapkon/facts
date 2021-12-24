const { retrieve, retrieveValue } = require('../../src/store/store');

const getTerms = params =>
    params.filter(x =>
        isNaN(x)
        && x[0] === x[0].toUpperCase())

const sameTerms = terms =>
    terms.length > 1
    // terms.reduce((a, b) => a === b)
    && new Set(terms).size == 1; // set.length !== terms.length?

const getFactValue = query => retrieveValue(query)

const isVariableCapture = params => getTerms(params).length

const getFact = (query, params) => {
    const fact = retrieve(query, params);
    return fact ? fact : false;
}

const getNonTerms = params => {
    const terms = getTerms(params);
    return params.filter(x => !terms.includes(x))
}

const getVarValues = (params, cand) => {
    const filteredParams = getNonTerms(params);
    return cand.filter(x => !filteredParams.includes(x))
}

const interlopVarAndValues = (terms, params, nestedValue) => {
    const capturedVars = getVarValues(params, nestedValue)
    if (capturedVars.length !== terms.length)
        return [false]
    return terms.map((x, i) => `${x}: ${capturedVars[i]}`)
}

const getNonVariableCapture = (statement, params) => {
    const fact = getFact(statement, params)
    if (Array.isArray(fact)) {
        return fact.some(f =>
            f.toString() == params.toString()
        );
    }
    return false;
}

module.exports = {
    getFact,
    getTerms,
    sameTerms,
    getNonTerms,
    getFactValue,
    getVarValues,
    isVariableCapture,
    interlopVarAndValues,
    getNonVariableCapture
};