const EMPTY_STRING = '';
const QUERY_TAG = 'QUERY';
const INPUT_TAG = 'INPUT';
const QUERY_PATTERN = /\w{5}\s\w+/g;
const COMMAND_TAG_LENGTH = INPUT_TAG.length;

const createQueryTag = (command, query) => {
    return `${command} ${query}`;
}

const validate = query => {
    if (!query)
        return false;
    return isInputQuery(query) && query.match(QUERY_PATTERN);
};

const isInputQuery = query => {
    return extractCommand(query) === INPUT_TAG;
};

const isValidQuery = query => {
    return extractCommand(query) === QUERY_TAG;
};

const extractQueryString = query => {
    if (!query)
        return '';
    const qry = query.match(/\s(\w+)/g);
    return qry ? qry[0] : query;
}

const extractCommand = query => {
    if (!query)
        return EMPTY_STRING;
    if (query.length < COMMAND_TAG_LENGTH)
        return EMPTY_STRING;
    return query.slice(0).slice(0, 5);
}
const destructureQuery = query => {
    let res = [];
    let matches = query.matchAll(/(\w{5})\s(\w+)\s?\((.+)\)/g)
    with (res) {
        if (matches) {
            for (const match of matches) {
                push(match[1])
                push(match[2])
                push(match[3])
            }
        }
    }
    return res;
}

const getQueryParams = (query) => {
    const res = destructureQuery(query)
    return res[2].split(',').map(x => x.trim())
}

module.exports = {
    QUERY_TAG,
    INPUT_TAG,
    QUERY_PATTERN,
    validate,
    isInputQuery,
    isValidQuery,
    extractCommand,
    createQueryTag,
    getQueryParams,
    destructureQuery,
    extractQueryString,
};