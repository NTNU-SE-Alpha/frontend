import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../Components/Button';
import ButtonIcon from '../Components/ButtonIcon';
import MediaRecord from '../Components/MediaRecord';
import { Reorder, motion } from 'framer-motion';
import { Type } from 'lucide-react';

const ChatContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #ffffff;

  .chat-room {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.25rem;
    /* background: #5D5D5D; */
    border: teal solid 2px;
    margin: 30px 30px 30px 130px;
    border-radius: 30px;
    ul.tabs {
      display: flex;
      gap: 10px;
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    .chat-box-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      background: #ffffff;
      border-radius: 30px;
      gap: 0.75rem;
      padding: 1rem;
      overflow-y: auto;
      div {
        display: flex;
        flex-direction: column;
        .👀 {
          align-self: flex-end;
        }
      }
      .🤖 {
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
      background: teal;
      border-radius: 30px;
      /* border: #5d5d5d solid 2px; */
      margin-top: 1rem;
      padding: 0 0 0 0.75rem;
      color: #fff;
      input {
        flex: 1;
        font-size: 16px;
        width: 100%;
        padding: 15px;
        border-radius: 30px;
        border: none;
        outline: none;
        background-color: inherit;
        &::placeholder {
          color: rgba(255, 255, 255, 0.75);
        }
      }
      button.上 {
        margin-right: 0.75rem;
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
  const [tabs, setTabs] = useState();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    // 定義一個函式來獲取對話列表
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          return;
        }
        const response = await axios.get('http://127.0.0.1:5000/list_conversations', {
          headers: {
            Authorization: `Bearer ${token}`, // 添加 Authorization 標頭
          },
        });
        const { conversations } = response.data;
        setConversations(conversations);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, []); // 空陣列代表只在第一次渲染時執行
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
  };
  return (
    <ChatContainer>
      <section className="chat-room">
        <Reorder.Group
          as="ul"
          axis="x"
          onReorder={setTabs}
          className="tabs"
          values={conversations}
        >
          {conversations.map((item) => (
            <Reorder.Item key={item.uuid} value={item}>
              <Button>{item.summary}</Button>
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <motion.div
          className="chat-box-container"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Button className="chat 👀">跌倒除了 fall down還有其他說法嗎</Button>
          <Button className="chat 白 🤖">
            「跌倒」除了用 fall down 表示，還有其他說法可以根據情境使用： Trip -
            通常表示「被絆倒」，比如 "She tripped over a rock." Stumble -
            比較像是「踉蹌、絆了一下」，但未必完全跌倒，例如 "He stumbled on the
            stairs." 這些說法可以根據情境選擇最貼切的用法！
          </Button>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              <Button key={index} className="chat 👀">
                {message.text}
              </Button>
            </motion.div>
          ))}
        </motion.div>
        {/* <ButtonIcon>
          <Type/>
          </ButtonIcon> */}
        <MediaRecord />
        <form id="textInput" onSubmit={handleSubmit}>
          <input
            value={inputText}
            type="text"
            placeholder="開始討論吧..."
            onChange={handleInputChange}
          ></input>
          <ButtonIcon className="上" type="submit">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="icon-2xl"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
                fill="currentColor"
              ></path>
            </svg>
          </ButtonIcon>
        </form>
      </section>
    </ChatContainer>
  );
};

export default Chat;
