describe('註冊功能測試', () => {
  const apiUrl = Cypress.env('apiUrl');
  const testTeacher = Cypress.env('testTeacher');
  const testStudent = Cypress.env('testStudent');
  const testCourse = Cypress.env('testCourse');
  // before(() => {
  //   // 可選：在測試開始前確保測試用的課程存在
  //   // 假設有一個創建課程的 API 或手動在資料庫中添加
  //   cy.request({
  //     method: 'POST',
  //     url: `${apiUrl}/courses`, // 根據您的 API 調整端點
  //     body: {
  //       name: '測試課程'
  //     },
  //     failOnStatusCode: false
  //   })
  // })

  context('成功案例', () => {
    it('應該成功註冊教師', () => {
      cy.register_api({
        username: 'neokent2',
        password: '12345678',
        user_type: 'teacher',
        name: testTeacher.name,
        course: testCourse,
      }).then((response) => {
        if (response.status !== 201) {
          console.log(response.body.message);
        }
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property(
          'message',
          'User registered successfully.'
        );
      });
    });

    it('應該成功註冊學生', () => {
      cy.register_api({
        username: testStudent.username,
        password: testStudent.password,
        user_type: 'student',
        name: testStudent.name,
        course: testCourse,
        group: 1,
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property(
          'message',
          'User registered successfully.'
        );
      });
    });
  });

  context('失敗案例', () => {
    it('應該返回 400 當缺少必要欄位時', () => {
      cy.register_api({
        username: 'incomplete_user',
        password: 'password123',
        // 缺少 user_type
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property(
          'message',
          'Username, password, and user_type are required.'
        );
      });
    });

    it('應該返回 400 當用戶名已存在時', () => {
      // 嘗試使用已註冊的教師用戶名
      cy.register_api({
        username: testTeacher.username,
        password: 12345678,
        user_type: 'teacher',
        name: testTeacher.name,
        course: testCourse,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property(
          'message',
          'Username already exists.'
        );
      });
    });

    it('應該返回 400 當密碼長度不足時', () => {
      cy.register_api({
        username: 'short_password_user',
        password: '123', // 密碼長度不足
        user_type: 'student',
        name: '短密碼學生',
        course: '測試課程',
        group: 1,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property(
          'message',
          'Password must be at least 8 characters long.'
        );
      });
    });

    it('應該返回 400 當教師提供 group 時', () => {
      cy.register_api({
        username: 'invalid_teacher_group',
        password: 'validpassword',
        user_type: 'teacher',
        name: '教師有組',
        course: testCourse,
        group: 2, // 教師不應該提供 group
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property(
          'message',
          'only user_type is student have group.'
        );
      });
    });

    it('應該返回 400 當教師未提供名字時', () => {
      cy.register_api({
        username: 'teacher_no_name',
        password: 'validpassword',
        user_type: 'teacher',
        course: testCourse,
        // 缺少 name
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property(
          'message',
          'Teacher name is required.'
        );
      });
    });

    it('應該返回 400 當學生未提供課程時', () => {
      cy.register_api({
        username: 'student_no_course',
        password: 'validpassword',
        user_type: 'student',
        name: '學生無課程',
        group: 1,
        // 缺少 course
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property(
          'message',
          'Course name is required for students.'
        );
      });
    });

    it('應該返回 400 當課程不存在時', () => {
      cy.register_api({
        username: 'student_invalid_course',
        password: 'validpassword',
        user_type: 'student',
        name: '學生無效課程',
        course: '不存在的課程',
        group: 1,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message', 'Course not found.');
      });
    });

    it('應該返回 400 當用戶類型無效時', () => {
      cy.register_api({
        username: 'invalid_user_type',
        password: 'validpassword',
        user_type: 'admin', // 無效的 user_type
        name: '無效用戶類型',
        course: '測試課程',
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message', 'Invalid user type.');
      });
    });
  });

  after(() => {
    // 清理測試資料，刪除測試用的教師和學生
    // 這需要相應的 API 端點來刪除用戶，或者直接操作資料庫
    // 假設有刪除用戶的 API 端點
    // cy.request({
    //   method: 'DELETE',
    //   url: `${apiUrl}/users/${testStudent.id}`,
    //   failOnStatusCode: false,
    // });
    // cy.request({
    //   method: 'DELETE',
    //   url: `${apiUrl}/users/${Cypress.env('studentUsername')}`,
    //   failOnStatusCode: false,
    // });
    // cy.request({
    //   method: 'DELETE',
    //   url: `${apiUrl}/users/non_teacher_user`,
    //   failOnStatusCode: false,
    // });
    // // 如有需要，刪除測試用的課程
    // cy.request({
    //   method: 'DELETE',
    //   url: `${apiUrl}/courses/測試課程`,
    //   failOnStatusCode: false,
    // });
  });
});
