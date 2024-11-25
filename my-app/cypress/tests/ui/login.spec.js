describe('登入頁面測試', () => {
  const apiUrl = Cypress.env('apiUrl');
  beforeEach(() => {
    cy.visit('/login');
  });

  it('應顯示登入頁面的標題', () => {
    cy.contains('h1', '登入').should('be.visible');
  });

  it('應顯示錯誤訊息 - 當電子信箱或密碼為空', () => {
    // 直接點擊登入按鈕，檢查空欄位錯誤訊息
    cy.get('.submit-btn').click();
    cy.contains('.warning', '電子信箱不得為空').should('be.visible');

    // 輸入電子信箱後再點擊登入
    cy.get('input[placeholder="電子信箱"]').type('test@example.com');
    cy.get('.submit-btn').click();
    cy.contains('.warning', '密碼不得為空').should('be.visible');
  });

  describe('登入錯誤測試 - 錯誤的電子信箱或密碼', () => {
    beforeEach(() => {
      cy.visit('/login'); // 開啟登入頁面
    });

    // 定義一個函數來驗證錯誤訊息
    function verifyErrorMailOrPassword() {
      // 攔截登入 API 請求等待 API 回應，並檢查是否返回 401 狀態碼和錯誤訊息
      cy.intercept('POST', `${apiUrl}/login`).as('loginRequest');
      cy.get('.submit-btn').click(); // 點擊登入按鈕

      cy.wait('@loginRequest').then((interception) => {
        const response = interception.response;
        expect(response.statusCode).to.eq(401);
        expect(response.body.message).to.include(
          'Invalid username or password'
        );
      });

      // 檢查頁面上的錯誤訊息
      cy.contains('.warning', 'Invalid username or password').should(
        'be.visible'
      );
    }

    it('僅錯誤的電子信箱', () => {
      cy.get('input[placeholder="電子信箱"]').type('wrong@example.com');
      cy.get('input[placeholder="密碼"]').type('correctPassword');
      verifyErrorMailOrPassword();
    });

    it('僅錯誤的密碼', () => {
      cy.get('input[placeholder="電子信箱"]').type('correct@example.com');
      cy.get('input[placeholder="密碼"]').type('wrongPassword');
      verifyErrorMailOrPassword();
    });

    it('錯誤的電子信箱和密碼', () => {
      cy.get('input[placeholder="電子信箱"]').type('wrong@example.com');
      cy.get('input[placeholder="密碼"]').type('wrongPassword');
      verifyErrorMailOrPassword();
    });
  });

  it('教師應成功登入並重定向到個人資料頁面', () => {
    cy.intercept('POST', `${apiUrl}/login`).as('loginRequest');

    // 填寫正確的帳號和密碼
    const testTeacher = Cypress.env('testTeacher');
    cy.get('input[placeholder="電子信箱"]').type(testTeacher.username);
    cy.get('input[placeholder="密碼"]').type(testTeacher.password);
    cy.get('.submit-btn').click();

    cy.wait('@loginRequest').then((interception) => {
      const response = interception.response;

      // 驗證 API 回應狀態碼是否為 200
      expect(response.statusCode).to.eq(200);

      // 驗證回應是否包含 access_token 和用戶信息
      expect(response.body).to.have.property('access_token');
      expect(response.body.user).to.have.property(
        'username',
        testTeacher.username
      ); // 檢查 username 屬性及其值

      expect(localStorage.getItem('token')).to.not.be.null;
      expect(response.body.user).to.have.property('name', testTeacher.name);
    });

    // 確認頁面跳轉到個人資料頁面
    cy.url().should('include', '/course');

    // 驗證頁面上正確顯示使用者資訊
    cy.contains('.markdown-body', `${testTeacher.username} 的課程`).should(
      'be.visible'
    );
    cy.get('.markdown-body').should(
      'contain.html',
      `<strong>${testTeacher.user_type}</strong>`
    );
  });

  it('學生應成功登入並重定向到個人資料頁面', () => {
    cy.intercept('POST', `${apiUrl}/login`).as('loginRequest');

    // 填寫正確的帳號和密碼
    const testStudent = Cypress.env('testStudent');
    cy.get('input[placeholder="電子信箱"]').type(testStudent.username);
    cy.get('input[placeholder="密碼"]').type(testStudent.password);
    cy.get('.submit-btn').click();

    cy.wait('@loginRequest').then((interception) => {
      const response = interception.response;

      // 驗證 API 回應狀態碼是否為 200
      expect(response.statusCode).to.eq(200);

      // 驗證回應是否包含 access_token 和用戶信息
      expect(response.body).to.have.property('access_token');
      expect(response.body.user).to.have.property(
        'username',
        testStudent.username
      ); // 檢查 username 屬性及其值

      expect(localStorage.getItem('token')).to.not.be.null;
      expect(response.body.user).to.have.property('name', testStudent.name);
    });

    // 確認頁面跳轉到個人資料頁面
    cy.url().should('include', '/course');

    // 驗證頁面上正確顯示使用者資訊
    cy.contains('.markdown-body', `${testStudent.username} 的課程`).should(
      'be.visible'
    );
    cy.get('.markdown-body').should(
      'contain.html',
      `<strong>${testStudent.user_type}</strong>`
    );
    cy.performVisualCheck('percy', 'Login Page');
  });
});
