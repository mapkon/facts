const { unary, variadic, tap, maybe } = require('./src/utils/util');

tap([1, 2, 3])(console.log)
//console.log(variadic(x => x)('David Gilmour'))
variadic(unary(console.log))('David Gilmour', 'Jimmy Page')
//console.log(variadic((x, y) => (x, y))('David Gilmour', 'Jimmy Hendrix'))
const func = x => console.log(x)
// 
maybe(x => console.log(x))([1, 2, 3, 4])
maybe(x => console.log(x))([1, null, 3, 4])

var x = [2012, 4, 16]
y = x
//console.log(x === y)

var unique = () => () => { }
var x = unique()
y = unique()
z = unique()
a = [x, y, z]

//console.log(a[0] === x)
//console.log(a[1] === y)
//console.log(a[2] === z)

//console.log(a[1] === a[2])

var questionable = "It's easier to express an idea in a very simple language than something that is very complicated that we " +
    "have to think about the language too. Ideas are eaiser to express in scheme without necessarily pulling in the ceremony of having to learn the language.";

(function () {
    console.log(questionable)
    if (true) {
        var questionable = 'friend'
        console.log(questionable)
    }
})

const even = num => {
    return num === 0 || !even(Math.abs(num) - 1)
}

console.log(even(-7))
console.log(even(-8))
//
even(2)
false || !even(1)
    false || !even(0)
        true
    false || !true // false
false || !false // true

even(3)
false || !even(2)
    false || !even(1)
        false || !even(0)
            true
        false || !true // false
    false || !false // true
false || !true // false
