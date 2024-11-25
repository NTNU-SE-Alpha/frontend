const { defineConfig } = require('cypress');
const cypressMochawesomeReporter = require('cypress-mochawesome-reporter/plugin');
const dotenv = require('dotenv'); // 使用 CommonJS 的 require 方式加載 dotenv
dotenv.config(); // 加載 .env 文件中的環境變數

const envConfig = {
  APPLITOOLS_API_KEY: process.env.APPLITOOLS_API_KEY || '',
  PERCY_TOKEN: process.env.PERCY_TOKEN || '',
  USE_APPLITOOLS: process.env.USE_APPLITOOLS === 'true',
  USE_PERCY: process.env.USE_PERCY === 'true',
  apiUrl: 'http://localhost:5000', // 本地測試 URL
  testTeacher: {
    username: 'neokent',
    password: 'securepassword1',
    name: '劑博聞',
    user_type: 'teacher',
  },
  testStudent: {
    username: '41275006H',
    password: 'studentpass1',
    name: '無待錚',
    user_type: 'student',
  },
  testCourse: '軟體工程',
};

module.exports = defineConfig({
  projectId: '1ut3w7',
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: envConfig,
    specPattern: 'cypress/tests/**/*.spec.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    viewportHeight: 1000,
    viewportWidth: 1280,
    defaultCommandTimeout: 4000, // 指令超時 4 秒
    pageLoadTimeout: 60000, // 頁面加載超時 1 分鐘
    retries: {
      runMode: 2,
      openMode: 0,
    },
    experimentalStudio: true,
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      cypressMochawesomeReporter(on);
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      charts: true,
      reportPageTitle: 'Cypress Test Report',
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    eyesFailCypressOnDiff: true, // 遇到視覺差異則失敗
    appliConfFile: {
      failCypressAfterAllSpecs: true, // 當所有 specs 完成後失敗
    },
  },
});
