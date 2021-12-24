// consts
const WARNING = 'The format is <COMMAND (INPUT || QUERY) ::QUERY:: (PARAM, ...)';

const malformedInputWarning = (prefix, query) =>
    `Malformed query: ${prefix || ''}${WARNING}. You entered: ${query}`

const isValid = query => {
    switch (true) {
        case /[A-Z]{5}\s\w+\s?[(].+[)]/g.test(query):
            return true;
        case /[A-Z]{5}\s\w+/g.test(query):
            return malformedInputWarning('The query is missing the PARAMETERS. ', query);
        default:
            return malformedInputWarning(null, query);
    }
}

const validate = function* (query) {
    const res = isValid(query);
    if (typeof res === 'boolean')
        yield true;
    else {
        yield false;
        yield res;
    }
    return res;
}

module.exports = {
    validate,
}