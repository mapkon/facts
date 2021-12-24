const EXIT = 'exit'
const stdin = process.openStdin()
const { run } = require('./src/utils/run')

console.log('Enter queries to interact with fact engine: \n')
// capture
stdin.addListener('data', function (d) {
    let input = d.toString().trim();
    if (input === EXIT)
        process.exit(0)
    else if (input.length > 0)
        printQueryResult(run(input))
});

const printQueryResult = res => {
    if (typeof (res) === 'boolean')
        console.log('---')
    if (Array.isArray(res)) {
        if (res[0] === 'false')
            console.log('---')
        console.log(res.join('\n'))
    } else
        console.log(res)
}