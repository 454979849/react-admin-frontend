/* craco.config.js */
const CracoLess = require('craco-less');
const CracoAntDesign = require('craco-antd');
const path = require('path');

module.exports = {
  plugins: [
    // 针对Less的相关配置（如module样式）
    {
      plugin: CracoLess,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modules: true
          },
        },
        modifyLessRule: function () {
          return {
            test: /\.less$/,
            exclude: [
              /node_modules/,
            ],
            use: [{
                loader: 'style-loader'
              },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[local]_[hash:base64:5]',
                    mode: (resourcePath) => {
                      if (/global.less$/i.test(resourcePath)) {
                        return "global";
                      }
                      return "local";
                    }
                  },
                },
              },
              {
                loader: 'less-loader',
              },
            ],
          };
        },
      },
    },
    // `Ant Design`相关配置
    {
      plugin: CracoAntDesign,
      options: {
        customizeThemeLessPath: path.join(
          __dirname,
          'src/antd.customize.less',
        ),
      },
    },
  ],

  webpack: {
    // 别名
    alias: {
      "~": path.resolve("src"),
    },
  },
  devServer: {
    port: 3000,
    proxy: {
      '/api/': {
        target: 'http://localhost:9000',
      }
    }
  },
};