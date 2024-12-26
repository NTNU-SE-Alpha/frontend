import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
// Dropdown items fetched from backend
const dropdownWeeks = [
  '113-1學期 第三週',
  '113-1學期 第四週',
  '113-1學期 第五週',
];

const feedbackdata = [
  {
    name: '王小明',
    feedback:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
    feedback2:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
  },
  {
    name: '張嘉欣',
    feedback:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
    feedback2:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
  },
  {
    name: '王子豪',
    feedback:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
    feedback2:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
  },
  {
    name: '陳志明',
    feedback:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
    feedback2:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
  },
  {
    name: '王明',
    feedback:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
    feedback2:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
  },
  {
    name: '張欣',
    feedback:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
    feedback2:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
  },
  {
    name: '王豪',
    feedback:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
    feedback2:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
  },
  {
    name: '志明',
    feedback:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
    feedback2:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
  },
  {
    name: '小明',
    feedback:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
    feedback2:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
  },
  {
    name: '嘉欣',
    feedback:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
    feedback2:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
  },
  {
    name: '子豪',
    feedback:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
    feedback2:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
  },
  {
    name: '陳明',
    feedback:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
    feedback2:
      '春風和煦，陽光灑滿大地，綠葉搖曳生姿，鳥兒在樹間歌唱，河水靜靜流淌，彷彿訴說著大自然的秘密。一切都如此生機盎然，讓人心生愉悅，沉浸在這片祥和之中，感受生命的美好與無限可能。',
  },
];
const groupfeedbackdata = [
  {
    group: 1,
    namelist: ['王小明', '張嘉欣', '王子豪', '陳志明'],
    feedbacklist: [
      { section: '認識需求理論', feedback: '你們對需求理論有不錯的理解背景' },
      {
        section: '生存需求',
        feedback: '某些人的生存需求可能不是基本需求，而是其他需求',
      },
      { section: '成長需求', feedback: '成長需求是人類的共同需求' },
      { section: '認識需求理論', feedback: '你們對需求理論有不錯的理解背景' },
      {
        section: '生存需求',
        feedback: '某些人的生存需求可能不是基本需求，而是其他需求',
      },
      { section: '成長需求', feedback: '成長需求是人類的共同需求' },
    ],
  },
  {
    group: 2,
    namelist: ['李小華', '周文強', '林美芳', '陳浩天'],
    feedbacklist: [
      { section: '認識需求理論', feedback: '對需求理論的概念分析很有深度' },
      {
        section: '生存需求',
        feedback: '生存需求的表現形式可能依文化差異有所不同',
      },
      { section: '成長需求', feedback: '成長需求驅動了許多創造性的行為' },
      { section: '認識需求理論', feedback: '你們對需求理論有不錯的理解背景' },
      {
        section: '生存需求',
        feedback: '某些人的生存需求可能不是基本需求，而是其他需求',
      },
      { section: '成長需求', feedback: '成長需求是人類的共同需求' },
    ],
  },
  {
    group: 3,
    namelist: ['趙偉強', '林若蘭', '楊子琪', '方志豪'],
    feedbacklist: [
      { section: '認識需求理論', feedback: '你們展現了對需求理論的深刻洞察力' },
      { section: '生存需求', feedback: '對生存需求的解釋切合實際' },
      { section: '成長需求', feedback: '成長需求與個人價值密切相關' },
      { section: '認識需求理論', feedback: '你們對需求理論有不錯的理解背景' },
      {
        section: '生存需求',
        feedback: '某些人的生存需求可能不是基本需求，而是其他需求',
      },
      { section: '成長需求', feedback: '成長需求是人類的共同需求' },
    ],
  },
  {
    group: 4,
    namelist: ['陳建國', '胡詠琪', '劉子瑋', '黃俊傑'],
    feedbacklist: [
      {
        section: '認識需求理論',
        feedback: '對需求理論的描述展現了良好的邏輯性',
      },
      { section: '生存需求', feedback: '生存需求可能與當前的社會情況有關' },
      { section: '成長需求', feedback: '成長需求能夠激發個人的潛能' },
      { section: '認識需求理論', feedback: '你們對需求理論有不錯的理解背景' },
      {
        section: '生存需求',
        feedback: '某些人的生存需求可能不是基本需求，而是其他需求',
      },
      { section: '成長需求', feedback: '成長需求是人類的共同需求' },
    ],
  },
  {
    group: 3,
    namelist: ['趙偉強', '林若蘭', '楊子琪', '方志豪'],
    feedbacklist: [
      { section: '認識需求理論', feedback: '你們展現了對需求理論的深刻洞察力' },
      { section: '生存需求', feedback: '對生存需求的解釋切合實際' },
      { section: '成長需求', feedback: '成長需求與個人價值密切相關' },
      { section: '認識需求理論', feedback: '你們對需求理論有不錯的理解背景' },
      {
        section: '生存需求',
        feedback: '某些人的生存需求可能不是基本需求，而是其他需求',
      },
      { section: '成長需求', feedback: '成長需求是人類的共同需求' },
    ],
  },
  {
    group: 4,
    namelist: ['陳建國', '胡詠琪', '劉子瑋', '黃俊傑'],
    feedbacklist: [
      {
        section: '認識需求理論',
        feedback: '對需求理論的描述展現了良好的邏輯性',
      },
      { section: '生存需求', feedback: '生存需求可能與當前的社會情況有關' },
      { section: '成長需求', feedback: '成長需求能夠激發個人的潛能' },
      { section: '認識需求理論', feedback: '你們對需求理論有不錯的理解背景' },
      {
        section: '生存需求',
        feedback: '某些人的生存需求可能不是基本需求，而是其他需求',
      },
      { section: '成長需求', feedback: '成長需求是人類的共同需求' },
    ],
  },
  {
    group: 3,
    namelist: ['趙偉強', '林若蘭', '楊子琪', '方志豪'],
    feedbacklist: [
      { section: '認識需求理論', feedback: '你們展現了對需求理論的深刻洞察力' },
      { section: '生存需求', feedback: '對生存需求的解釋切合實際' },
      { section: '成長需求', feedback: '成長需求與個人價值密切相關' },
      { section: '認識需求理論', feedback: '你們對需求理論有不錯的理解背景' },
      {
        section: '生存需求',
        feedback: '某些人的生存需求可能不是基本需求，而是其他需求',
      },
      { section: '成長需求', feedback: '成長需求是人類的共同需求' },
    ],
  },
  {
    group: 4,
    namelist: ['陳建國', '胡詠琪', '劉子瑋', '黃俊傑'],
    feedbacklist: [
      {
        section: '認識需求理論',
        feedback: '對需求理論的描述展現了良好的邏輯性',
      },
      { section: '生存需求', feedback: '生存需求可能與當前的社會情況有關' },
      { section: '成長需求', feedback: '成長需求能夠激發個人的潛能' },
      { section: '認識需求理論', feedback: '你們對需求理論有不錯的理解背景' },
      {
        section: '生存需求',
        feedback: '某些人的生存需求可能不是基本需求，而是其他需求',
      },
      { section: '成長需求', feedback: '成長需求是人類的共同需求' },
    ],
  },
  {
    group: 3,
    namelist: ['趙偉強', '林若蘭', '楊子琪', '方志豪'],
    feedbacklist: [
      { section: '認識需求理論', feedback: '你們展現了對需求理論的深刻洞察力' },
      { section: '生存需求', feedback: '對生存需求的解釋切合實際' },
      { section: '成長需求', feedback: '成長需求與個人價值密切相關' },
      { section: '認識需求理論', feedback: '你們對需求理論有不錯的理解背景' },
      {
        section: '生存需求',
        feedback: '某些人的生存需求可能不是基本需求，而是其他需求',
      },
      { section: '成長需求', feedback: '成長需求是人類的共同需求' },
    ],
  },
  {
    group: 4,
    namelist: ['陳建國', '胡詠琪', '劉子瑋', '黃俊傑'],
    feedbacklist: [
      {
        section: '認識需求理論',
        feedback: '對需求理論的描述展現了良好的邏輯性',
      },
      { section: '生存需求', feedback: '生存需求可能與當前的社會情況有關' },
      { section: '成長需求', feedback: '成長需求能夠激發個人的潛能' },
      { section: '認識需求理論', feedback: '你們對需求理論有不錯的理解背景' },
      {
        section: '生存需求',
        feedback: '某些人的生存需求可能不是基本需求，而是其他需求',
      },
      { section: '成長需求', feedback: '成長需求是人類的共同需求' },
    ],
  },
];

// Styled Components
const Mainpage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const SearchField = styled.div`
  margin-top: 1.2rem;
  display: flex;
  justify-content: space-around;
  background-color: rgba(0, 76, 76, 0.6);
  padding: 0.8rem 1rem;
  margin-left: 5vw;
  width: 16rem;
  border-radius: 25px;
  position: relative; /* Needed for absolute positioning of DropdownMenu */
`;

const ButtonBox = styled.button`
  background-color: #ffffff;
  color: #000000;
  font-size: 1rem;
  border: none;
  border-radius: 20px;
  padding: 0.3rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #53a7ba;
    color: #ffffff;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 80%; /* Align below the button */
  left: 0;
  margin-top: 5px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1000;
  width: 100%; /* Match button width */
  display: ${({ visible }) =>
    visible ? 'flex' : 'none'}; /* Control visibility */
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

const FeedBackBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  background-color: inherit;
  width: 100vw;
  height: 90vh;
  border-radius: 20px;
  padding-left: 14vw;
  margin-top: 1rem;

  /* Add these properties */
  justify-content: ${(props) => (props.isScrolling ? 'flex-start' : 'center')};
  padding-bottom: ${(props) => (props.isScrolling ? '0' : '6rem')};
  overflow-y: auto; /* Enable vertical scrolling when content overflows */
  max-height: 90vh; /* Ensure consistent max height */

  /* Optional: Add custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  & > div {
    margin-right: 3vw;
    margin-bottom: 2rem;
  }

  & > div:last-child {
    margin-bottom: 0;
  }
`;
const FeedBackDialog = styled.div`
  color: #000000;
  background: linear-gradient(
    180deg,
    rgba(178, 216, 216, 0.7),
    rgba(102, 178, 178, 0.6),
    rgba(0, 128, 128, 0.5),
    rgba(0, 102, 102, 0.7),
    rgba(0, 76, 76, 0.7)
  );
  border-radius: 20px;
  padding: 1rem;
  font-size: 1.3rem;
  width: ${(props) => (props.isSingle ? '42vw' : '25vw')};
  & > div {
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
  & > div:last-child {
    margin-bottom: 1rem;
  }
  h2 {
    font-size: 1.3rem;
    font-weight: normal;
    padding-left: 1rem;
    margin: 0;
  }
  div {
    padding: 0.5rem 2rem;
    background-color: #ffffff;
    font-size: 1rem;
    border-radius: 20px;
    color: inherit;
  }
`;
const TableContainer = styled.div`
  display: flex;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  margin-top: 1rem;
  padding-left: 5vw;
`;

const ScrollableTable = styled.div`
  flex: 1;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
  }
`;

const ScrollableInnerTable = styled.table`
  min-width: 80vw; /* Ensure enough width for horizontal scroll */
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 0.4rem;
  text-align: center;
  background-color: #22577a;
  position: sticky;
  top: 0;
  height: 5rem;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1.3rem;
    height: 3rem;
    border-radius: 20px;
    background-color: ${(props) => (props.isHead ? 'inherit' : '#ffffff')};
    width: ${(props) => (props.isHead ? '6vw' : 'auto')};
  }
`;

const Td = styled.td`
  padding: 1rem 1.3rem;
  text-align: ${(props) => (props.isHead ? 'center' : 'left')};
  border: 1px solid #ccc;
  white-space: nowrap; /* Prevent text wrapping */
`;

const RowPlatte = ['#99babe', '#bee3db', '#faf9f9', '#ffd6ba'];
const TableRow = styled.tr`
  & > td:first-child {
    // group
    background-color: #007d87;
    font-weight: bold;
    color: #fff;
  }
  &:nth-child(4n + 2) {
    background-color: ${RowPlatte[0]};
  }
  &:nth-child(4n + 3) {
    background-color: ${RowPlatte[1]};
  }
  &:nth-child(4n + 4) {
    background-color: ${RowPlatte[2]};
  }
  &:nth-child(4n + 5) {
    background-color: ${RowPlatte[3]};
  }
`;
const Feedback = ({ params }) => {
  const [person, setPerson] = useState('個人');
  const [userType, setUserType] = useState('教師');
  const [userName, setUserName] = useState('王小明');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('113-1學期 第三週');

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectWeek = (week) => {
    setSelectedWeek(week);
    setDropdownVisible(false); // Close dropdown after selection
  };

  const changeType = () => {
    setPerson(person === '個人' ? '團體' : '個人');
  };

  const personRenderContent = () => {
    console.log(
      'Rendering person content, userType:',
      userType,
      'userName:',
      userName
    );
    if (userType === '學生') {
      for (let i = 0; i < feedbackdata.length; i++) {
        if (feedbackdata[i].name === userName) {
          return (
            <FeedBackBox>
              <FeedBackDialog isSingle>
                <h2>回饋</h2>
                <div>{feedbackdata[i].feedback}</div>
                <h2>重點延伸思考方式以及建議</h2>
                <div>{feedbackdata[i].feedback2}</div>
              </FeedBackDialog>
            </FeedBackBox>
          );
        }
      }
    } else {
      return (
        <FeedBackBox isScrolling>
          {feedbackdata.map((feed, index) => (
            <FeedBackDialog key={index}>
              <h2>{feed.name}</h2>
              <div>{feed.feedback}</div>
            </FeedBackDialog>
          ))}
        </FeedBackBox>
      );
    }
  };
  const groupRenderContent = () => {
    console.log(
      'Rendering group content, userType:',
      userType,
      'userName:',
      userName
    );
    if (userType === '學生') {
      for (let i = 0; i < groupfeedbackdata.length; i++) {
        if (groupfeedbackdata[i].namelist.includes(userName)) {
          return (
            <FeedBackBox isScrolling>
              <div>第 {groupfeedbackdata[i].group} 組</div>
              <div>組員 : {groupfeedbackdata[i].namelist}</div>
              {groupfeedbackdata[i].feedbacklist.map((feed, index) => (
                <FeedBackDialog key={index}>
                  {feed.section}
                  <div>{feed.feedback}</div>
                </FeedBackDialog>
              ))}
            </FeedBackBox>
          );
        }
      }
    } else {
      return (
        <TableContainer>
          <ScrollableTable>
            <ScrollableInnerTable>
              <thead>
                <tr>
                  <Th isHead>
                    <div></div>
                  </Th>
                  {groupfeedbackdata[0].feedbacklist.map((feed, index) => (
                    <Th key={index}>
                      <div>{feed.section}</div>
                    </Th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {groupfeedbackdata.map((group, index) => (
                  <TableRow key={index}>
                    <Td isHead>第 {group.group} 組</Td>
                    {group.feedbacklist.map((feed, index) => (
                      <Td key={index}>{feed.feedback}</Td>
                    ))}
                  </TableRow>
                ))}
              </tbody>
            </ScrollableInnerTable>
          </ScrollableTable>
        </TableContainer>
      );
    }
  };
  return (
    <Mainpage>
      <SearchField>
        {/* Dropdown Wrapper for Button and Menu */}
        <DropdownWrapper
          onMouseEnter={() => setDropdownVisible(true)}
          onMouseLeave={() => setDropdownVisible(false)}
        >
          <ButtonBox>{selectedWeek}</ButtonBox>
          <DropdownMenu visible={dropdownVisible}>
            {dropdownWeeks.map((week) => (
              <div key={week} onClick={() => selectWeek(week)}>
                {week}
              </div>
            ))}
          </DropdownMenu>
        </DropdownWrapper>
        <ButtonBox onClick={changeType}>{person}</ButtonBox>
      </SearchField>
      {console.log('Current person state:', person)}
      {person === '個人' ? personRenderContent() : groupRenderContent()}
    </Mainpage>
  );
};

export default Feedback;
