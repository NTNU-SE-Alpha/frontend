import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../Components/Button';
import ButtonIcon from '../Components/ButtonIcon';
import MediaRecord from '../Components/MediaRecord';
import { Reorder, motion } from 'framer-motion';
import { ArrowUp, Loader } from 'lucide-react';
import { marked } from 'marked';
import Loading from '../Components/Loading';
import { useForm } from 'react-hook-form';

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
    /* width: 100%; */
    /* background: #5D5D5D; */
    border: teal solid 2px;
    margin: 30px 30px 30px 130px;
    border-radius: 30px;
    ul.tabs {
      display: flex;
      flex-wrap: nowrap;
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
  const token = localStorage.getItem('token');

  const { uuid: routeUuid } = useParams();
  const [uuid, setUuid] = useState(routeUuid || '');
  const [navigateToUuid, setNavigateToUuid] = useState(null);

  // const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [chatSummary, setChatSummary] = useState([]);
  // react hook form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { inputText } = data;
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, sender: 'user' },
      { text: 'loading', sender: 'assistant' },
    ]);
    console.log(messages);
    let currentUuid = uuid;
    if (!currentUuid) {
      currentUuid = await getUUID();
      if (!currentUuid) {
        console.error('Failed to start conversation.');
        return;
      }
    }
    reset();

    await AIChating(currentUuid, inputText);
  };

  console.log(watch('example'));

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
      setChatSummary(conversations.map((item) => item.summary));
      console.log(chatSummary);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  }, [token]);
  const getUUID = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/start_conversation',
        // {
        //   course_id: '1',
        //   course_section_id: '1',
        // },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { uuid: newUuid } = response.data;
      setUuid(newUuid);
      // navigate(`/chat/${newUuid}`);
      // setNavigateToUuid(newUuid);
      // setNavigateToUuid(null);
      await fetchConversations();
      reset();
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  };
  const getHisory = useCallback(
    async (uuid) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/conversation/${uuid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { history } = response.data;
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
    if (!uuid) {
      getUUID();
    } else {
      getHisory(uuid);
    }
    fetchConversations();
  }, [uuid, fetchConversations, getHisory]);

  const AIChating = async (uuid, userInput) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/chat/${uuid}`,
        {
          file_id: '1',
          user_input: userInput,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { answer } = response.data;
      setMessages((prevMessages) => {
        // 移除最後的 loading 訊息
        const updatedMessages = prevMessages.filter(
          (msg) => msg.text !== 'loading'
        );
        return [
          ...updatedMessages,
          { text: answer, sender: 'assistant' }, // 添加伺服器回應
        ];
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const navigate = useNavigate();
  // if (navigateToUuid) {
  //   navigate(`/chat/${navigateToUuid}`);
  //   setNavigateToUuid(null);
  //   fetchConversations();
  //   reset();
  // }
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
            conversations.map((item) => (
              <Reorder.Item key={item.uuid} value={item}>
                <a href={`/chat/${item.uuid}`}>
                  <Button className="🎨">{item.summary}</Button>
                </a>
              </Reorder.Item>
            ))
          ) : (
            <Button className="🎨">
              <Loader></Loader>
            </Button>
          )}
        </Reorder.Group>
        <motion.div className="chat-box-container">
          {messages.map((message, index) => (
            <>
              {message.text === 'loading' ? (
                <div>
                  <Loading />
                </div>
              ) : message.sender === 'user' ? (
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
                      <div
                        dangerouslySetInnerHTML={{
                          __html: marked(message.text || ''),
                        }}
                      />
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
        {/* <MediaRecord /> */}
        {/* <form>
          <input
            type="file"
            id="fileElem"
            accept="application/pdf"
            style={{ display: 'none' }}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </form> */}
        <form id="textInput" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('inputText', { required: true })}
            type="text"
            placeholder="開始討論吧..."
          />
          {errors.inputText && <span>請輸入討論內容！</span>}
          <ButtonIcon className="上" type="submit">
            <ArrowUp />
          </ButtonIcon>
        </form>
      </section>
    </ChatContainer>
  );
};

export default Chat;
