// Identity combinator
const I = function (x) { return x };
// Kestrel combinator
const K = function (x) { return function (y) { return x } }; // inverted comma op
// Bluebird combinator
const B = (function (a, b) {
    return function (c) {
        return a(b(c))
    }
});

const same = function (value) {
    return (function (copy) {
        let res = copy === value;
        return (function (evaluatedValue) {
            return evaluatedValue;
        })(res)
    })(value)
}

const maybe = function (fn) {
    return function () {
        const valid = Array.from(arguments).flat(1).every(x => {
            return x !== null && x !== void 0
        });
        if (!valid) return Object.create(null)
        return fn.apply(this, arguments)
    }
}

// K combinator
const tap = value => fn => {
    if (fn === void 0)
        return curried
    else curried(fn)

    function curried(fn) {
        if (typeof (fn) === 'function')
            fn(value)
        return value
    }
}

const unary = function (fn) {
    if (fn.length == 1)
        return fn
    else return function (x) {
        return fn.call(this, x);
    }
}

let __slice = Array.prototype.slice;
const variadic = fn => {
    let fnLength = fn.length;
    if (fnLength < 1)
        return fn
    else if (fnLength === 1)
        return function () { return fn.call(this, __slice.call(arguments, 0)) }
    else {
        return function () {
            let numOfArgs = arguments.length,
                namedArgs = __slice.call(arguments, 0, fnLength - 1),
                numberOfMissingNamedArgs = Math.max(fnLength - numOfArgs - 1, 0),
                argPadding = new Array(numberOfMissingNamedArgs),
                variadicArgs = __slice.call(arguments, fn.length - 1);
            return fn.apply(
                this, namedArgs
                    .concat(argPadding)
                    .concat([variadicArgs]));
        }
    }
}

module.exports = {
    I,
    K,
    B,
    tap,
    maybe,
    same,
    unary,
    variadic
}