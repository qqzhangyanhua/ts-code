const path = require('path');

module.exports={
    entry: './ast/test.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    }
}