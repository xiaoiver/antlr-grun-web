import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
  outputPath: './docs',
  publicPath: '/antlr-grun-web/',
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: { webpackChunkName: true },
      title: 'antlr-grun-web',
      dll: true,
      
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
}

export default config;
