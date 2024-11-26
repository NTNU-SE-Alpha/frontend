describe('課程頁面測試', () => {
  const apiUrl = Cypress.env('apiUrl');
  const testTeacher = Cypress.env('testTeacher');
  const testStudent = Cypress.env('testStudent');
  const testUser = testTeacher;

  beforeEach(() => {
    // 模擬登入並進入課程頁面
    cy.login(testUser.username, testUser.password);
  });

  it('應顯示頁面標題和基本 UI 元素', () => {
    // 確認使用者名稱是否正確顯示
    cy.contains('.markdown-body', `${testUser.username} 的課程`).should(
      'be.visible'
    );
    cy.get('.markdown-body').should(
      'contain.html',
      `<strong>${testUser.user_type}</strong>`
    );

    // 確認標籤按鈕是否存在
    cy.contains('button', '所有課程').should('be.visible');
    cy.contains('button', '最愛').should('be.visible');
    cy.contains('button', '編輯').should('be.visible');
    // 驗證頁面上正確顯示使用者資訊
  });

  it('應正確顯示所有課程', () => {
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token'); // 假設 Token 存在 localStorage 中，鍵為 "token"
      expect(token).to.exist; // 確保 Token 存在
      cy.log(`JWT Token: ${token}`);
      // 等待課程卡片渲染
      cy.get('.star_title').should('exist');

      // 從 API 中獲取課程數據
      cy.request({
        method: 'GET',
        url: `${apiUrl}/courses`, // 替換為你的 API URL
        headers: {
          Authorization: `Bearer ${token}`, // 替換為有效 Token
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body);
        const courses = response.body.courses;
        console.log(response.body);
        expect(courses).to.be.an('array');

        // 確保課程卡片數量正確
        cy.get('.star_title').should('have.length', courses.length);

        // 驗證每個課程的名稱是否顯示正確
        courses.forEach((course, index) => {
          cy.get('.star_title').eq(index).should('contain.text', course.name);
        });
      });
    });
  });

  it('應正確從後端獲取星號課程並渲染', () => {
    cy.contains('button', '最愛').click();

    cy.window().then((win) => {
      const token = win.localStorage.getItem('token'); // 獲取 Token

      cy.request({
        method: 'GET',
        url: `${apiUrl}/favorites`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        const favorites = response.body.favorites;

        // 確保收藏的課程數量正確
        cy.get('.lucide.lucide-star.true').should(
          'have.length',
          favorites.length
        );
        cy.get('.star_title').should('have.length', favorites.length); // 確保只有收藏的課程顯示

        // 驗證課程名稱
        favorites.forEach((favorite, index) => {
          cy.get('.star_title').eq(index).should('contain.text', favorite.name);
        });
      });
    });
  });
});
