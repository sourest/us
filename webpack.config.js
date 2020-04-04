const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = (env = {}, args) => {

  const isProduction = env.production
  const ENV = isProduction ? 'production' : 'development'

  return {
    context: __dirname,

    mode: ENV,
    
    target: 'web',

    stats: 'errors-only',

    devtool: 'cheap-eval-source-map',

    devServer: {
      proxy: {
        '/api': 'http://localhost:3000'
      },
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      host: '0.0.0.0',
      hot: true,
      noInfo: true,
      port: 8000,
    },

    entry: './src/index.tsx',

    output: {
      path: path.resolve(__dirname, 'dist'),
      // filename: 'index.js',
      // publicPath: '/assets/',
    },
  
    resolve: {
  
      modules: [
        'node_modules',
        path.resolve(__dirname, 'src')
      ],
  
      extensions: ['.ts', '.tsx', '.js'],
  
      alias: {
      },
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: [
            path.resolve(__dirname, 'src')
          ],
          use: [
            {
              loader: 'babel-loader',
            }
          ]
        },
        {
          test: /\.css/,
          use: [
            {
              loader: 'style-loader',
              options: {
                injectType: 'styleTag',
                insert: 'head'
              }
            },
            {
              loader: 'css-loader'
            }
          ]
        },
        {
          test: /\.(png|jpg|svg|gif)$/,
          include: [
            path.resolve(__dirname, 'src')
          ],
          use: [
            {
              loader: 'url-loader',
            }
          ]
        },
      ],
    },

    performance: {
      hints: 'warning',
      maxEntrypointSize: 204800,
      // assetFilter (assetFilename) {
      //   return !(/\.(map|css)$/.test(assetFilename))
      // }
    },
  
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        filename:'index.html',
        template:'./src/index.html',
        inject:'body',
        minify:{
          removeComments: true,
          collapseWhitespace: true
        },
        inlineSource: '.css$',
      }),
      // new HTMLInlineCSSWebpackPlugin({
      //   replace: {
      //     target: '<!-- inline_css_plugin -->'
      //   }
      // })
    ],
  }
}


exports.default = config
