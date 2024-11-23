import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../Components/Button';
import ButtonIcon from '../Components/ButtonIcon';
import MediaRecord from '../Components/MediaRecord';
import { Reorder, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { marked } from 'marked';

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
      /* overflow-x: auto; */
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

const Chat = ({ params }) => {
  const { uuid: routeUuid } = useParams();
  const [uuid, setUuid] = useState(routeUuid || '');
  const [navigateToUuid, setNavigateToUuid] = useState(null);

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [tabs, setTabs] = useState();
  const [conversations, setConversations] = useState([]);
  const [history, setHistory] = useState([]);
  const token = localStorage.getItem('token');

  const fetchConversations = useCallback(async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/list_conversations',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { conversations } = response.data;
      setConversations(conversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  }, [token]);
  const startConversation = useCallback(async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/start_conversation',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { uuid: newUuid } = response.data;
      setUuid(newUuid);
      setNavigateToUuid(newUuid);
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  }, [token]);
  const getHisory = useCallback(
    async (uuid) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/history/${uuid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const history = response.data.history;
        setMessages(
          history.map((msg) => ({ text: msg.message, sender: msg.sender }))
        );
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    },
    [token]
  );

  useEffect(() => {
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
    if (uuid) {
      getHisory(uuid);
    }
    fetchConversations();
  }, [uuid, fetchConversations, getHisory, token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, sender: 'user' },
    ]);
    let currentUuid = uuid;
    if (!currentUuid) {
      currentUuid = await startConversation();
      if (!currentUuid) {
        console.error('Failed to start conversation.');
        return;
      }
    }

    AIChating(currentUuid);
    setInputText('');
  };
  const AIChating = async (uuid) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/chat/${uuid}`,
        {
          user_input: inputText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { answer } = response.data;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: answer, sender: 'assistant' },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  if (navigateToUuid) {
    return <Navigate to={`/chat/${navigateToUuid}`} />;
  }
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
          {conversations.length > 0 ? (
            conversations
              .slice(-4)
              .reverse()
              .map((item) => (
                <Reorder.Item key={item.uuid} value={item}>
                  <a href={`/chat/${item.uuid}`}>
                    <Button>{item.summary}</Button>
                  </a>
                </Reorder.Item>
              ))
          ) : (
            <Button>載入中..</Button>
          )}
        </Reorder.Group>
        <motion.div
          className="chat-box-container"
        >
          {messages.map((message, index) => (
            <>
              {message.sender === 'user' ? (
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
              ) : (
                <motion.div
                  key={index}
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <Button key={index} className="chat 白 🤖">
                  <div className="markdown-body">
                    <div dangerouslySetInnerHTML={{ __html: marked(message.text || '') }} />
                  </div>
                  </Button>
                </motion.div>
              )}
            </>
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
            <ArrowUp />
          </ButtonIcon>
        </form>
      </section>
    </ChatContainer>
  );
};

export default Chat;
