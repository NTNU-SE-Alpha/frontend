import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../Components/Button';
import ButtonIcon from '../Components/ButtonIcon';
import MediaRecord from '../Components/MediaRecord';
import { Reorder, motion } from 'framer-motion';
import {
  ArrowUp,
  Loader,
  Mic,
  CloudUpload,
  X,
  AlignJustify,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { marked } from 'marked';
import Loading from '../Components/Loading';
import { useForm } from 'react-hook-form';
import Modal from '../Components/Modal';
import FileUpload from '../Components/FileUpload';
import Dialog from '../Components/Dialog';
import DropdownWrapper from '../Components/DropdownWrapper';

///////////////////////////
const ChatContainer = styled.main`
  display: flex;
  height: 100vh;

  .chat-room {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.25rem;
    border: teal solid 2px;
    margin: 2rem 0;
    border-radius: 30px;

    div.topContainer {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0 0 0.5rem 0;
      a.title {
        text-decoration: none;
        color: black;
        font-size: 1.2rem;
        button {
          width: fit-content;
          padding: 0.5rem;
        }
      }
    }
    .chat-box-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
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
    div#Input {
      background: teal;
      width: 100%;
      border-radius: 30px;
      display: flex;
      margin-top: 1rem;
      padding: 0.75rem;
      form#textInput {
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: 100%;

        /* border: #5d5d5d solid 2px; */
        padding: 0 0 0 0.75rem;
        color: #fff;
        input {
          flex: 1;
          font-size: 16px;
          width: 100%;
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
  }
  ul.tabs {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 1rem;
    list-style-type: none;
    padding: 0;
    margin: 0;
    li {
      position: relative;
      button.delete {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(255, 0, 0, 0.5);
        padding: 0.25rem;
      }
      &:hover {
        a {
          text-decoration: none;
        }
        button {
          display: block;
        }
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

  const [mediaRecording, setMediaRecording] = useState(false);
  const [currentFileId, setCurrentFileId] = useState(1);
  const [currentDialog, setCurrentDialog] = useState('開始新對話');
  const [dropdownRole, setDropdownRole] = useState(['學生', '老師']);
  const [selectRole, setSelectRole] = useState('老師');
  // 使用 DropdownWrapper Component
  const [roles, setroles] = useState(['學生', '老師']); // 選項列表
  const [selectedRole, setSelectedRole] = useState('老師'); // 預設選項
  const [currentCourseId, setcuurentCourseId] = useState(''); // 目前課程 ID

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  /////////////////////////////

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
        'http://se.bitx.tw:5000/list_conversations',
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
        'http://se.bitx.tw:5000/start_conversation',

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
          `http://se.bitx.tw:5000/conversation/${uuid}`,
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
  // 使用 Modal Component
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  /////////////////////////////
  // 使用 Modal2 Component
  const [isModal2Open, setIsModal2Open] = useState(false);
  const openModal2 = () => setIsModal2Open(true);
  const closeModal2 = () => setIsModal2Open(false);
  /////////////////////////////
  // delete conversation
  const handleDeleteConversation = async (uuid) => {
    try {
      // 呼叫 DELETE API
      await axios.delete(`http://se.bitx.tw:5000/conversation/${uuid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setConversations((prev) => prev.filter((conv) => conv.uuid !== uuid));
      // if (uuid === routeUuid) {
      //   navigate('/chat');
      // }
      // closeModal2();
    } catch (error) {
      console.error('刪除失敗:', error);
      alert('無法刪除此對話，請稍後再試。');
    }
  };
  const updateFileId = (newFileId) => {
    setCurrentFileId(newFileId);
  };

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
      console.log(currentFileId);
      const response = await axios.post(
        `http://se.bitx.tw:5000/chat/${uuid}`,
        {
          file_id: currentFileId,
          user_input: userInput,
          course_id: 1,
          course_section_id: 1,
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
        <div className="topContainer">
          <ButtonIcon onClick={openModal2}>
            <AlignJustify />
          </ButtonIcon>
          <a href="/chat" className="title">
            <ButtonIcon>{currentDialog}</ButtonIcon>
          </a>

          <ButtonIcon>
            <ChevronRight />
          </ButtonIcon>
          {/* 選擇角色 */}
          {/* <ButtonIcon>
         <DropdownWrapper
          options={roles}
          selectedOption={selectedRole}
          onOptionSelect={handleRoleSelect}
        />
          </ButtonIcon>
          <ButtonIcon><ChevronRight/></ButtonIcon>
          <ButtonIcon>
          <DropdownWrapper
          options={roles}
          selectedOption={selectedRole}
          onOptionSelect={handleRoleSelect}
        />
          </ButtonIcon> */}
        </div>
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
                    <div className="markdown-body">
                      <div
                        style={{ color: 'white' }}
                        dangerouslySetInnerHTML={{
                          __html: marked(message.text || ''),
                        }}
                      />
                    </div>
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

        <div id="Input">
          {mediaRecording ? (
            <MediaRecord updateState={() => setMediaRecording(false)} />
          ) : (
            <>
              <ButtonIcon title="錄音" onClick={() => setMediaRecording(true)}>
                <Mic color="#fff" />
              </ButtonIcon>
              <ButtonIcon
                title="上傳檔案"
                onClick={() => {
                  openModal();
                }}
              >
                <CloudUpload color="white" />
              </ButtonIcon>
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
            </>
          )}
        </div>
      </section>
      {/* 彈出視窗 */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <FileUpload
          currentFileId={currentFileId}
          onFileIdUpdate={updateFileId}
        />
      </Modal>
      <Modal className="modal2" isOpen={isModal2Open} onClose={closeModal2}>
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
                <a
                  style={{ color: 'black', textDecoration: 'none' }}
                  href={`/chat/${item.uuid}`}
                >
                  <Dialog onDelete={handleDeleteConversation} uuid={item.uuid}>
                    {item.summary}
                  </Dialog>
                </a>
              </Reorder.Item>
            ))
          ) : (
            <Button className="🎨">
              <Loader />
            </Button>
          )}
        </Reorder.Group>
      </Modal>
    </ChatContainer>
  );
};

export default Chat;
