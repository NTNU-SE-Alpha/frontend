describe("測試 /user API", () => {
  const testUser = Cypress.env("testTeacher");

  it("應成功獲取使用者資料 (GET /user)", () => {
    cy.intercept("POST", `${Cypress.env("apiUrl")}/login`).as("loginRequest");
    cy.login(testUser.username, testUser.password);
    cy.wait("@loginRequest").then(() => {
      cy.window().then((win) => {
        const token = win.localStorage.getItem("token"); // 假設 Token 存在 localStorage 中，鍵為 "token"
        expect(token).to.exist; // 確保 Token 存在
        cy.log(`JWT Token: ${token}`);
        cy.request({
          method: "GET",
          url: `${Cypress.env("apiUrl")}/user`, // API 路徑
          headers: {
            Authorization: `Bearer ${token}`, // 帶入 JWT Token
          },
        }).then((response) => {
          expect(response.status).to.eq(200); // 驗證狀態碼
          expect(response.body).to.have.property("user"); // 確認回應有使用者資訊
          expect(response.body.user).to.have.property("id"); // 驗證 ID
          expect(response.body.user).to.have.property("name", testUser.name); // 驗證名稱
          expect(response.body.user).to.have.property(
            "username",
            testUser.username
          ); // 驗證帳號
        });
      });
    });
  });

  it("應成功更新密碼，並確認舊密碼無法登入", () => {
    const newPassword = "newSecurePassword123";
    const oldPassword = testUser.password;
    cy.intercept("POST", `${Cypress.env("apiUrl")}/login`).as("loginRequest");
    cy.login(testUser.username, testUser.password);
    cy.wait("@loginRequest").then(() => {
      cy.window().then((win) => {
        const token = win.localStorage.getItem("token"); // 假設 Token 存在 localStorage 中，鍵為 "token"
        expect(token).to.exist; // 確保 Token 存在
        cy.log(`JWT Token: ${token}`);
        // 發送 PUT 請求更新密碼
        cy.request({
          method: "PUT",
          url: `${Cypress.env("apiUrl")}/user`,
          headers: {
            Authorization: `Bearer ${token}`, // 使用取得的 JWT Token
          },
          body: {
            password: newPassword,
          },
        }).then((response) => {
          // 驗證更新請求是否成功
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("user"); // 確認回應有使用者資訊
          expect(response.body.user).to.have.property("id"); // 驗證 ID
          expect(response.body.user).to.have.property("name", testUser.name); // 驗證名稱
          expect(response.body.user).to.have.property(
            "username",
            testUser.username
          ); // 驗證帳號
        });
      });
    });

    // 確認能用新密碼登入
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      body: {
        username: Cypress.env("testTeacher").username,
        password: newPassword,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("access_token"); // 應返回新的 Token
    });

    // 確認舊密碼無效
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      body: {
        username: testUser.username,
        password: oldPassword, // 原密碼
      },
      failOnStatusCode: false, // 確保不因錯誤中止測試
    }).then((response) => {
      expect(response.status).to.eq(401); // 應返回未授權錯誤
      expect(response.body.message).to.eq("Invalid username or password.");
    });

    // 改回原密碼
    cy.window().then((win) => {
      const token = win.localStorage.getItem("token"); // 假設 Token 存在 localStorage 中，鍵為 "token"
      expect(token).to.exist; // 確保 Token 存在
      cy.log(`JWT Token: ${token}`);
      // 發送 PUT 請求更新密碼
      cy.request({
        method: "PUT",
        url: `${Cypress.env("apiUrl")}/user`,
        headers: {
          Authorization: `Bearer ${token}`, // 使用取得的 JWT Token
        },
        body: {
          password: oldPassword,
        },
      }).then((response) => {
        // 驗證更新請求是否成功
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("user"); // 確認回應有使用者資訊
        expect(response.body.user).to.have.property("id"); // 驗證 ID
        expect(response.body.user).to.have.property("name", testUser.name); // 驗證名稱
        expect(response.body.user).to.have.property(
          "username",
          testUser.username
        ); // 驗證帳號
      });
    });

    // 確認能用舊密碼登入
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      body: {
        username: Cypress.env("testTeacher").username,
        password: oldPassword,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("access_token"); // 應返回新的 Token
    });

    // 確認新密碼無效
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      body: {
        username: testUser.username,
        password: newPassword, // 新密碼
      },
      failOnStatusCode: false, // 確保不因錯誤中止測試
    }).then((response) => {
      expect(response.status).to.eq(401); // 應返回未授權錯誤
      expect(response.body.message).to.eq("Invalid username or password.");
    });
  });
});
