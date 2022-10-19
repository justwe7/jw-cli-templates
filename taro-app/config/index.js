const resolve = (...file) => require('path').resolve(__dirname, ...file)

const config = {
  projectName: 'taro-app',
  date: '2022-10-18',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  compiler: 'webpack5',
  cache: {
    enable: true // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  sass: {
    resource: [
      resolve('../src/styles/mixins.scss') // 全局scss
    ]
  },
  mini: {
    webpackChain (chain) {
      // 软链
      chain.resolve.alias
        .set('@', resolve('../src'))

      if (process.env.NODE_ENV === 'development') {
        // 开发环境eslint autofix
        chain
          .plugin('ESLintPlugin')
          .use(require('eslint-webpack-plugin'), [{
            cache: true,
            emitWarning: true,
            extensions: ['js', 'ts', 'tsx', 'jsx'],
            failOnError: false,
            fix: true
          }])

        chain
          .plugin('StylelintPlugin')
          .use(require('stylelint-webpack-plugin'), [{
            cache: true,
            fix: true,
            // failOnError: false,
            extensions: ['scss', 'vue', 'css']
          }])
      }
    },
    miniCssExtractPluginOption: {
      ignoreOrder: true, // 关闭css提取顺序问题的警告
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
