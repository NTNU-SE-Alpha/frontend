import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../Components/Button';
import ButtonIcon from '../Components/ButtonIcon';
import { motion } from 'framer-motion';
const ChatContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #FFFFFF;

  .chat-room {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.25rem;
    /* background: #5D5D5D; */
    border: #5D5D5D solid 2px;
    margin: 30px 30px 30px 130px;
    border-radius: 30px;

    .chat-box-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      background: #FFFFFF;
      border-radius: 30px;
      gap: 0.75rem;
      padding: 1rem;
      overflow-y: auto;
      div{
        display: flex;
        flex-direction: column;
        .👀{
          
          align-self: flex-end;
        }
      }
      .🤖{
        align-self: flex-start;
      }
    }

    form#textInput {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 100%;
      background: #FFFFFF;
      border-radius: 30px;
      border: #5D5D5D solid 2px;
      margin-top: 1rem;
      
      input {
        flex: 1;
        font-size: 16px;
        width: 100%;
        padding: 15px;
        border-radius: 30px;
        border: none;
        outline: none;
      }
      button{
        margin-right: 0.75rem;
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
        display: flex;
        align-items: center;
        &:hover{
          cursor: pointer;
        }
      }
      svg{
        width: 100%;
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
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (inputText.trim() !== '') {
      setMessages([...messages, { text: inputText, sender: '👀' }]);
      setInputText('');
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

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
        <section className='chat-room'>
          <motion.div className='chat-box-container'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button style="chat 👀" className='👀'>跌倒除了 fall down還有其他說法嗎</Button>
            <Button style='chat 🤖'>「跌倒」除了用 fall down 表示，還有其他說法可以根據情境使用：
                Trip - 通常表示「被絆倒」，比如 "She tripped over a rock."
                Stumble - 比較像是「踉蹌、絆了一下」，但未必完全跌倒，例如 "He stumbled on the stairs."
                這些說法可以根據情境選擇最貼切的用法！
            </Button>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', duration: 0.5 }}
              >
                <Button key={index} style="chat 👀" className="👀">
                  {message.text}
                </Button>
              </motion.div>
          ))}
          </motion.div>
          <form id='textInput' onSubmit={handleSubmit}>
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
            <input value={inputText} type="text" placeholder="開始討論吧..." onChange={handleInputChange}></input>
            <ButtonIcon className='mr-3' type="submit"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-2xl"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z" fill="currentColor"></path></svg></ButtonIcon>
          </form>
        </section>
    </ChatContainer>
  )
}
  
  export default Chat