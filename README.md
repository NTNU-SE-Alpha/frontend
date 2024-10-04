# react-app-website-frontend
[toc]


## React Environment

step 1. 請先確認電腦有安裝 node.js

```
node --version
```

> 注意：**未安裝者請自行google: `nodejs download`**

<br/>

step 2. 請先在 Vscode 下載 Extension:    
[Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass)  
- 下載完後，開啟 `.scss` 的檔案，右下角會有 Watching Sass，點一下會開始編譯程式碼
- 會在資料夾自動產生 `.css` 檔

<br/>

step 3. 啟動指令    
在`frontend`資料夾下    
```
cd my-app
npm install 
npm start
```

之後會在預設瀏覽器開啟網頁，即完成環境架設。

> 注意：請務必按照順序執行！

## HTML 
- 要寫的 html 會放在 `App.js` 的 `div` 標籤裡面，div container 純粹用來包住 `html` 。

如下：

```js
const Login = () => {
    return (
        <div>
            <html code here>
        </div>
    );
}
```

## CSS文件
- 方法一：採用style component寫法，範例請參考`Login.js`文件：
```js
import styled from 'styled-components';
```
```js
const LoginContainer = styled.div`
  /* css or scss code here */
`;
```


- 方法二：在`my-app/src/Styles`資料夾新增scss文件，檔名開頭務必為"_"

例如：`_login.scss`

然後在`style.scss`檔案最下方新增
```scss
@import 'login';
```

> 如果不清楚scss和css的差異，可以參考[SCSS 入門](https://hackmd.io/@Heidi-Liu/sass-css-preprocessor)
## img
- 圖片請加在`frontend/my-app/public/images`
- 引用方式：
```html
<img src='images/loginbg.png' alt='pic' />
```

## Page 新增
continue...
