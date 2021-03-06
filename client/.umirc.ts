import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  antd: {},
  proxy: {
    '/api': {
      'target': 'http://localhost:3000/',
      'changeOrigin': true,
    },
    '/upload': {
      'target': 'http://localhost:3000/',
      'changeOrigin': true,
    },
  },
  outputPath: '../server/public/client'
});
