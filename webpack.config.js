const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
  const isDev = env.mode === 'development';
  return {

    mode: env.mode,
    
    devtool: isDev ? 'source-map' : false,

    resolve:{
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        "@": path.resolve(__dirname, 'src')
      }
    },

    cache: {
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, '.webpack-cache'),
      buildDependencies: {
        config: [__filename],
      }
    },

    devServer: {
      historyApiFallback: true,
      static: {
        directory: path.resolve(__dirname, 'public'),
        publicPath: '/',
      },
      hot: true,
      open: true,
      watchFiles: ['src/**/*'],
    },

    entry: path.resolve(__dirname, 'src/main'),

    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.[contenthash].js',
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.module\.s[ac]ss$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader ,
            {
              loader: 'css-loader',
              options: {
                url:false,
                modules: {
                  namedExport: false,
                  localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:6]',
                },
                sourceMap: isDev
              }
            },

            'sass-loader'
          ]
        },

        {
          test: /\.s[ac]ss$/i,
          exclude: /\.module\.s[ac]ss$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader ,
            'css-loader',
            'sass-loader'
          ]
        },

        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader'
        },

        {
          test: /\.(png|jpe?g|gif|webp|svg)$/i, // Для изображений
          type: 'asset/resource', // Или asset/inline или asset, если нужно другое поведение
        },
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'),
        filename: 'index.html'
      }),
      !isDev && new MiniCssExtractPlugin({
        filename: 'styles.[contenthash].css'
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public/img', to: 'img' }
        ]
      }),
      !isDev && new BundleAnalyzerPlugin({
        analyzerMode: 'json',
        generateStatsFile: true,
        statsFilename: 'stats.json' // сохранит в корне проекта
      })
    ].filter(Boolean),

    optimization: {
      usedExports: true,
      minimize: !isDev,
      minimizer: [ !isDev && new CssMinimizerWebpackPlugin() ].filter(Boolean)
    }
  }
}