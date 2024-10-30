import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
const ChatContainer = styled.div`

  display: flex;
  height: 100vh;
  background: #FFFFFF;

  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    background: #5D5D5D;
    margin: 30px 0px 30px 20px;
    border-radius: 50px;

    .Chatimage {
      width: 70px;
      height: 70px;
      border: none;
      border-radius: 50%;
      background: white;
      cursor: pointer;
      margin-top: 30px;
    }

    button img {
        width: 70px;
        height: 70px;
    }
  }


  .right {
    flex: 9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: #5D5D5D;
    margin: 30px 30px 30px 130px;
    border-radius: 30px;

    .chat-box {
      flex: 9;
      display: flex;
      flex-direction: row;
      width: 80%;
      height: 100%;
      background: #D9D9D9;
      border-radius: 30px;
    }

    form#textInput {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 80%;
      height: 100%;
      background: #FFFFFF;
      border-radius: 30px;
      margin: 20px 0px 0px 0px;

      input {
        flex: 1;
        font-size: 16px;
        width: 100%;
        padding: 15px;
        border-radius: 30px;
        border: none;
        outline: none;
      }
    }
    form#upload {
      margin-left: 0.75rem;
      width: 2rem;
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        border-radius: 0.5rem;
        background-color: rgba(0, 0, 0, 0.1);
      }
      label{
        &:hover{
          cursor: pointer;
        }
      }
      svg{
      }
    }
  }
`;

const Chat = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFiles = (files) => {
    const file = files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setUploadStatus(`已選擇檔案: ${file.name}`);
      setUploadedFileName('');
      startUpload();
    } else {
      alert('目前只支援 PDF 檔案');
    }
  };
  const startUpload = () => {
    if (!selectedFile) return;

    const url = 'http://localhost:5000/api/upload'; // 設定你的上傳 URL
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percent);
        },
    })
    .then(response => {
        setUploadStatus('File uploaded successfully!');
        setUploadedFileName(response.data.filename); // 假設伺服器回應中的 filename 是這樣命名的
    })
    .catch(error => {
        alert('Error uploading the file.');
        console.log(error);
    });
  };
  return (
    <ChatContainer>
        {/*
        <section className='left'>
          <button className='Chatimage'> 
            <img src="./images/ntnulogo.png"></img>
          </button>
        </section-->
        */}
        <section className='right'>
          <div className='chat-box'></div>
          <form id='textInput'>
            <form id='upload'>
              <input
                type="file"
                id="fileElem"
                accept="application/pdf"
                style={{ display: 'none' }}
                onChange={(e) => handleFiles(e.target.files)}
              />
              <label class="button" for="fileElem">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 7C9 4.23858 11.2386 2 14 2C16.7614 2 19 4.23858 19 7V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9C5 8.44772 5.44772 8 6 8C6.55228 8 7 8.44772 7 9V15C7 17.7614 9.23858 20 12 20C14.7614 20 17 17.7614 17 15V7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15V7Z" fill="currentColor"></path></svg>
              </label>
              {/* <button>選擇檔案</button> */}
            </form>
            <input type="text" placeholder="開始討論吧..."></input>
          </form>
        </section>
    </ChatContainer>
  )
}
  
  export default Chat