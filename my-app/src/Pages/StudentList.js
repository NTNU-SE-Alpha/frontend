import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { marked, use } from 'marked';
import { set, useForm } from 'react-hook-form';
import Button from '../Components/Button';
const HomeStyle = styled.div`
  margin-top: 1rem;
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
  }
  div {
    table {
      /* width: 100%; */
      border-collapse: collapse;
      text-align: center;
      margin: 20px 0;

      tr {
        &.bg-gray-50 {
          background-color: #dffdff;
        }
        &.bg-white {
          background-color: #fff;
        }
        th {
          background-color: #f4f4f4;
          font-weight: bold;
        }
        td {
        }
      }

      th,
      td {
        padding: 10px;
        border: 1px solid #ddd;
        input {
          padding: 0 0.5rem;
          text-align: center;
          width: 100px;
          border: none;
          background: inherit;
          &:focus {
            border-radius: 0.5rem;
          }
        }
      }
      form {
        button.blank {
          padding: 0 0.5rem;
          background: inherit;
          width: 100%;
          border: none;
          border-radius: 0.5rem;
          &:hover {
            cursor: pointer;
            background-color: #f4f4f4;
          }
        }
      }
    }
  }
`;

const studentList = `
| 學號/姓名       | 角色                  | 分組      |
|----------------|-----------------------|----------|
| 60315017e Pei | 學生                  | 沒有群組 |
| stu01 stu01    | 學生                  | 沒有群組 |
| stu02 stu02    | 學生                  | A        |
| stu03 stu03    | 學生                  | A        |
| stu04 stu04    | 學生                  | B        |
| stu05 stu05    | 學生                  | B        |
| stu06 stu06    | 學生                  | 沒有群組 |
| stu06 stu06    | 學生                  | 沒有群組 |
| stu06 stu06    | 學生                  | 沒有群組 |
| stu06 stu06    | 學生                  | 沒有群組 |
| stu06 stu06    | 學生                  | 沒有群組 |
| stu06 stu06    | 學生                  | 沒有群組 |
| stu07 stu07    | 學生                  | 沒有群組 |
| stu08 stu08    | 教學助理 (權限同教師) | 沒有群組 |
| tea01_ac tea01_name | 教師               | 沒有群組 |
| tea02 tea02    | 教師                  | 沒有群組 |
| wenwyltw WYL   | 教師                  | 沒有群組 |
`;

const students = [
  { id: '60315017e', name: 'Pei', role: '學生', group: '沒有群組' },
  { id: 'stu01', name: 'stu01', role: '學生', group: '沒有群組' },
  { id: 'stu02', name: 'stu02', role: '學生', group: 'A' },
  { id: 'stu03', name: 'stu03', role: '學生', group: 'A' },
  { id: 'stu04', name: 'stu04', role: '學生', group: 'B' },
  { id: 'stu05', name: 'stu05', role: '學生', group: 'B' },
  { id: 'stu06', name: 'stu06', role: '學生', group: '沒有群組' },
  { id: 'stu07', name: 'stu07', role: '學生', group: '沒有群組' },
  {
    id: 'stu08',
    name: 'stu08',
    role: '教學助理 (權限同教師)',
    group: '沒有群組',
  },
  { id: 'tea01_ac', name: 'tea01_name', role: '教師', group: '沒有群組' },
  { id: 'tea02', name: 'tea02', role: '教師', group: '沒有群組' },
  { id: 'wenwyltw', name: 'WYL', role: '教師', group: '沒有群組' },
];

const StudentList = () => {
  const [group, setgroup] = useState({});
  const [editIndex, seteditIndex] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, index) => {
    const { inputText } = data;
    setgroup((prev) => ({
      ...prev,
      [index]: inputText,
    }));
    console.log(inputText);
  };
  const handleButtonClick = (index) => {
    seteditIndex(index);
  };
  const handleInputChange = (e, index) => {
    const { value } = e.target;
    console.log(value);
    setgroup((prev) => ({
      ...prev,
      [index]: value,
    }));
  };
  useEffect(() => {}, []);
  return (
    <div>
      <HomeStyle>
        <p className="title">學生列表</p>
        <div className="flex">
          <div className="markdown-body">
            <div
              dangerouslySetInnerHTML={{
                __html: marked(studentList || ''),
              }}
            />
          </div>

          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th>學號/姓名</th>
                <th>角色</th>
                <th>分組</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className="px-4 py-2 border-b">
                    {student.id} {student.name}
                  </td>
                  <td className="px-4 py-2 border-b">{student.role}</td>
                  <td className="px-4 py-2 border-b">
                    <form onSubmit={handleSubmit(onSubmit, index)}>
                      {editIndex === index ? (
                        <input
                          type="text"
                          value={group[index]}
                          onChange={(e) => handleInputChange(e, index)}
                          onBlur={() => seteditIndex(null)}
                          autoFocus
                          {...register('inputText', {
                            required: '這是必填欄位',
                          })}
                          list="group"
                          id={`ice-cream-choice-${index}`}
                          name={`ice-cream-choice-${index}`}
                        />
                      ) : (
                        <button
                          className="白 blank"
                          onClick={() => handleButtonClick(index)}
                          title="雙擊以編輯"
                        >
                          {group[index] || student.group}
                        </button>
                      )}

                      <datalist id="group">
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                        <option value="None"></option>
                      </datalist>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </HomeStyle>
    </div>
  );
};

export default StudentList;
