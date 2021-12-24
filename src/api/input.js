const { save } = require('../../src/store/store');

const trackFact = (query, params) => {
    save(query, params)
    return ''
}

const unTrackFact = (query, params) => {
    console.log('IMPLEMENT ME!')
}

module.exports = {
    trackFact,
    unTrackFact,
};