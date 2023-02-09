const path = require('path');

const moduleType = process.env.MODULE_TYPE // （umd/esm）

const outputConfig = moduleType === 'esm'
? { // esm
    filename: 'bundle.esm.js',
    path: path.resolve(__dirname, '../dist'),
    library: {
      type: 'module'
    }
  }
: { // umd
  filename: 'bundle.umd.js',
  globalObject: 'this', // 避免commonjs下出错 https://webpack.js.org/configuration/output/#outputglobalobject
  path: path.resolve(__dirname, '../dist'),
  library: {
    name: 'trans2Array',
    type: 'umd'
  }
}

module.exports = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  experiments: { // 该特性只支持 type: 'module'
    outputModule: moduleType === 'esm',
  },
  output: outputConfig,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  }
};
