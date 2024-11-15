import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "1ut3w7",
  e2e: {
    baseUrl: "http://localhost:3000",
    env: {
      apiUrl: "http://localhost:5000", // 本地測試 URL
      testTeacher: {
        username: "neokent",
        password: "securepassword1",
        name: "劑博聞",
      },
      testStudent: {
        username: "41275006H",
        password: "studentpass1",
        name: "無待錚",
      },
    },
    specPattern: "cypress/tests/**/*.spec.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
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
      // implement node event listeners here
    },
  },
});
