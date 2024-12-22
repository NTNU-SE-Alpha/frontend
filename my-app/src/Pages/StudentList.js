import React from 'react';
import styled from 'styled-components';
import { marked } from 'marked';
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
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      margin: 20px 0;

      th,
      td {
        padding: 10px;
        border: 1px solid #ddd;
      }
      th {
        background-color: #f4f4f4;
        font-weight: bold;
      }
    }

    table {
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
                <th className="px-4 py-2 border-b">學號/姓名</th>
                <th className="px-4 py-2 border-b">角色</th>
                <th className="px-4 py-2 border-b">分組</th>
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
                  <td className="px-4 py-2 border-b">{student.email}</td>
                  <td className="px-4 py-2 border-b">{student.role}</td>
                  <td className="px-4 py-2 border-b">
                    <input
                      list="group"
                      id="ice-cream-choice"
                      name="ice-cream-choice"
                    />
                    <datalist id="group">
                      <option value="1"></option>
                      <option value="2"></option>
                      <option value="3"></option>
                      <option value="4"></option>
                      <option value="None"></option>
                    </datalist>
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
