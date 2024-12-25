import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { marked } from 'marked';
import styled from 'styled-components';
import Button from '../Components/Button';
import { ChevronDown } from 'lucide-react';
import { set } from 'react-hook-form';
const Container = styled.div`
  margin-left: 120px;
  margin-right: 1.5rem;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    li {
      padding-bottom: 0.5rem;
      margin-bottom: 0.5rem;
      border-bottom: 1px solid #d1d9e0b3;
    }
    a {
      font-size: 1.25rem;
      text-decoration: none;
      color: #f76b15;
    }
    p.title {
      font-size: 1.25rem;
      color: #f76b15;
      margin-bottom: 1rem;
    }
  }
`;
const DropdownWrapper = styled.div`
  position: relative;
  button.change {
    display: inline-flex;
    align-items: center;
    svg {
      margin-left: 0.25rem;
    }
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 5px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1000;
  width: 100%; /* Match button width */
  /* display: none; */
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  flex-direction: column;
  border: 1px solid #ccc;

  div {
    color: #000000;
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

export default function Settings() {
  const markdownText = `
  # 設定
  `;
  const dropdownRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const selectRoleAction = (role) => {
    setSelectRole(role);
    setDropdownVisible(false);
  };

  const [dropdownRole, setDropdownRole] = useState(['學生', '老師']);
  const [selectRole, setSelectRole] = useState('老師');
  const markdownContent = marked(markdownText);

  useEffect(() => {
    // Handle outside click
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  return (
    <Container>
      <div className="markdown-body">
        <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
      </div>
      <div>
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{
            type: 'spring',
            duration: 0.3,
            stiffness: 200,
          }}
        >
          <ul>
            <li>
              <a href="/update-password">更新密碼</a>
            </li>
            <li>
              <a href="/update-profile">更新個人資料</a>
            </li>
            <li>
              <a href="/delete-account">刪除帳號</a>
            </li>
            <li>
              <p className="title">切換身份</p>

              <DropdownWrapper
                ref={dropdownRef}
                // onMouseEnter={() => setDropdownVisible(true)}
                // onMouseLeave={() => setDropdownVisible(false)}
              >
                <Button
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                  className="change"
                >
                  {selectRole}
                  <ChevronDown />
                </Button>
                <DropdownMenu visible={dropdownVisible}>
                  {dropdownRole.map((role) => (
                    <div key={role} onClick={() => selectRoleAction(role)}>
                      {role}
                    </div>
                  ))}
                </DropdownMenu>
              </DropdownWrapper>
            </li>
          </ul>
        </motion.div>
      </div>
    </Container>
  );
}
