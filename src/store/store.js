const store = new Map();
const save = (key, params = []) => {
    const _params = Array.isArray(params) ? params.map(x => x.trim()) : [params.toString().trim()];
    if (contains(key)) {
        let currentValue = store.get(key);
        currentValue.push(params)
        return store.set(key, currentValue)
    }
    let value = [_params];
    return store.set(key, value)
};

const contains = (key) => {
    return store.has(key);
}

const retrieveValue = (key) => {
    return store.get(key);
}

const retrieve = (key, params) => {
    const value = containsParams(key, params)
    if (value)
        return store.get(key)
    return Object.create(null);
}

const containsParams = (key, params = []) => {
    const value = store.get(key)
    if (value)
        return value.some(v => v.toString() === params.toString())
    return false;
}

module.exports = {
    save,
    contains,
    retrieve,
    retrieveValue,
    containsParams,
}