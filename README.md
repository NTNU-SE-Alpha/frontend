# react-app-website-frontend

# React Environment

- 請先確認電腦有安裝 node.js

- 確定版本(確認有安裝 node.js)

```
node --version
```

指令

```
npx create-react-app my-app
```

- 安裝後約有 200MB
- 下載後，執行以下指令

```
cd my-app
npm start
```

之後會在預設瀏覽器開啟網頁，即完成環境架設。

- 所有要編輯的都方在 `src` 裡面，其他資料夾盡量不要動。

- 要寫的 html 會放在 `App.js` 的 `div` 標籤裡面，div container 純粹用來包住 `html` 。

## Problem

- 報名按鈕的位置
- CSIE 的字樣對齊
- 背景重複出現、排版

# SCSS 轉 CSS

- 先在 Vscode 下載 Extension: [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass)
- 下載完後，開啟 `.scss` 的檔案，右下角會有 Watching Sass，點一下會開始編譯程式碼
- 會在資料夾自動產生 `.css` 檔
