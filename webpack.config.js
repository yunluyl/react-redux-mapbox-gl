var path = require('path');
var webpack = require('webpack');

module.exports =
    {
        debug : true,
        bail : true,
        cache : true,
        devtool : 'sourcemap',
        entry :
        {
            'bundle' : './test/app.jsx'
        },
        output :
        {
            path : __dirname + '/test/public',
            filename : '[name].js'
        },
        node :
        {
            fs: "empty"
        },
        plugins :
        [
            new webpack.DefinePlugin(
            {
                'process.env.NODE_ENV' : '"development"'
            }),
        ],
        module :
        {
            loaders :
            [
                {
                    test : /\.jsx$/,
                    loader : 'babel',
                }
            ]
        }
    }