# API Documentation

## 登入
- **URL**: `/login`
- **Method**: `POST`
- **說明**: 處理使用者的登入請求。
- **Body 參數**:
  - `username`: String, 必填
  - `password`: String, 必填
- **成功回應**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "access_token": "your_access_token",
      "user": {
        "id": 1,
        "username": "user_username",
        "name": "user_name",
        "course": "optional_for_students",
        "group": "optional_for_students"
      }
    }
    ```
- **錯誤回應**:
  - **Code**: 401 Unauthorized
  - **Content**:
    ```json
    { "message": "Invalid username or password." }
    ```

## 取得使用者資料
- **URL**: `/user`
- **Method**: `GET`
- **說明**: 透過 JWT token 取得當前登入使用者的資訊。
- **Headers**:
  - `Authorization`: Bearer Token
- **成功回應**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "user": {
        "id": 1,
        "username": "user_username",
        "name": "user_name"
      }
    }
    ```
- **錯誤回應**:
  - **Code**: 404 Not Found
  - **Content**:
    ```json
    { "message": "User not found." }
    ```

## 更新使用者資料
- **URL**: `/user`
- **Method**: `PUT`
- **說明**: 更新當前登入使用者的資訊。
- **Headers**:
  - `Authorization`: Bearer Token
- **Body 參數**:
  - 可包含 `password` 以更改密碼
- **成功回應**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "user": {
        "id": 1,
        "username": "user_username",
        "name": "user_name"
      }
    }
    ```
- **錯誤回應**:
  - **Code**: 404 Not Found
  - **Content**:
    ```json
    { "message": "User not found." }
    ```

## 刪除學生
- **URL**: `/students/<student_id>`
- **Method**: `DELETE`
- **說明**: 刪除特定學生。
- **Headers**:
  - `Authorization`: Bearer Token
- **成功回應**:
  - **Code**: 200
  - **Content**:
    ```json
    { "message": "Student with ID {student_id} has been deleted." }
    ```
- **錯誤回應**:
  - **Code**: 404 Not Found
  - **Content**:
    ```json
    { "message": "Student not found." }
    ```

## 查詢教師課堂
- **URL**: `/courses`
- **Method**: `GET`
- **說明**: 列出所有非封存的課程，僅限老師。
- **Headers**:
  - `Authorization`: Bearer Token
- **成功回應**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "courses": [
        {
          "id": 1,
          "name": "course_name",
          "teacher_id": 1
        }
      ]
    }
    ```
- **錯誤回應**:
  - **Code**: 404 Not Found
  - **Content**:
    ```json
    { "message": "Teacher not found." }
    ```

## 上傳檔案
- **URL**: `/api/upload`
- **Method**: `POST`
- **說明**: 允許使用者上傳檔案。
- **FormData**:
  - `file`: File, 必填
- **成功回應**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "message": "File uploaded successfully",
      "filename": "uploaded_filename.pdf"
    }
    ```
- **錯誤回應**:
  - **Code**: 400 Bad Request
  - **Content**:
    ```json
    { "error": "No file part" }
    ```

這份 API 文件涵蓋了登入、取得和更新使用者資訊、檔案上傳等功能，適合開發者在使用 API 時參考。您可以根據實際情況進行調整或擴充此文件。
