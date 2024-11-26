describe('針對每個課程的詳細頁面進行測試', () => {
  const apiUrl = Cypress.env('apiUrl'); // 從環境變數獲取 API 基本路徑
  const testTeacher = Cypress.env('testTeacher');
  const testStudent = Cypress.env('testStudent');
  const testUser = testTeacher;
  var token = '';
  var courses = [];

  beforeEach(() => {
    cy.login(testUser.username, testUser.password);
    // 設置 Token 到 localStorage
    cy.window().then((win) => {
      token = win.localStorage.getItem('token');
    });
  });

  it('應正確載入所有課程每一週的內容', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/courses`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      courses = response.body.courses;
      cy.log(courses.length);
      if (courses.length > 0) {
        expect(courses).to.be.an('array').and.to.have.length.greaterThan(0);

        courses.forEach((course) => {
          cy.visit(`/course/${course.id}`);
          cy.get('.markdown-body').should('contain.text', '課程公告');

          // 檢查課程的 section 是否正確渲染
          cy.request({
            method: 'GET',
            url: `${apiUrl}/getSections/${course.id}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((sectionResponse) => {
            const sections = sectionResponse.body.sections;
            expect(sections).to.be.an('array');

            // 檢查每個 section 是否渲染正確
            sections.forEach((section) => {
              cy.get('.tabs').should('contain.text', section.name);
              cy.get('.markdown-body').should('contain.text', section.name);
              // cy.get('.markdown-body').should('contain.text', section.content);
            });
          });
        });
      }
    });
  });

  it('應正確處理課程返回和編輯按鈕', () => {
    if (courses.length > 0) {
      courses.forEach((course) => {
        cy.visit(`/course/${course.id}`);
        // 測試返回按鈕
        cy.get('button.up').click();
        cy.url().should('include', '/course');
        cy.visit(`/course/${course.id}`);
        // 測試編輯按鈕
        cy.get('button.down').click();
        cy.url().should('include', '/edit');
        cy.visit(`/course/${course.id}`);
      });
    }
  });
});
