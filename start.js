require('babel-core/register')({
    'presets': [
        'stage-3',
        'latest-node'
    ]
});

require('babel-polyfill');

// require('./server');
// require('./server/crawler/imdb');
require('./server/crawler/check');
