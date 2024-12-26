import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { set, useForm } from 'react-hook-form';
import Button from '../Components/Button';
import DropdownWrapper from '../Components/DropdownWrapper';
import { Pen, Plus, Trash2, Settings2 } from 'lucide-react';
import ButtonIcon from '../Components/ButtonIcon';
import Modal from '../Components/Modal';
import axios from 'axios';
const Container = styled.main`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  div.bar {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  div.flex {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    gap: 1.5rem;
    @media (max-width: 690px) {
      flex-direction: column;
      /* table {
        order: 2;
      } */
    }
    div.table-contianer {
      display: flex;
      flex-wrap: nowrap;
      gap: 1rem;

      table {
        margin-right: 1rem;
        /* width: 100%; */
        text-align: center;
        border-spacing: 0;
        margin: 20px 0;
        border: teal solid 2px;
        border-radius: 14px;
        tbody,
        thead {
          tr {
            &.bg-teal-50 {
              background-color: #f6f8fa;
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

        th,
        td {
          padding: 10px;
          border: 1px solid #ddd;
          input {
            padding: 0 0.5rem;
            /* text-align: center; */
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

            display: flex;
            align-items: center;
            justify-content: space-between;

            &:hover {
              cursor: pointer;
              /* background-color: #f4f4f4; */
            }

            button {
              margin-left: 0.5rem;

              svg {
                width: 20px;
                height: 20px;
              }
            }
          }
        }
      }
      div.setForm {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        form {
          div {
            display: flex;
            width: 100%;
            gap: 1rem;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;

            input,
            select {
              padding: 8px;
              border: 1px solid #ccc;
              border-radius: 0.25rem;
            }
            button {
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
  }
  [titleR] {
    position: relative;
  }

  [titleR]:hover::after {
    content: attr(titleR);
    position: absolute;

    left: 120%;
    background-color: black;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 14px;
    white-space: nowrap;
    z-index: 1000;
  }
`;

const mygroupList = ['1', '2', '3', '4', 'None'];

const StudentList = () => {
  const token = localStorage.getItem('token');

  const [group, setgroup] = useState({}); // 所有學生的分組
  const [newGroup, setNewGroup] = useState(''); // 新的分組
  const [groupList, setgroupList] = useState(mygroupList); // 組別設定的選項
  const [editIndex, seteditIndex] = useState(null); // 目前編輯的 index
  const [classes, setClasses] = useState([]); // 所在的課程
  const [students, setStudents] = useState([]); // 所有學生資料表
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
  const handleInputBlur = (studentId, index) => {};
  const handleAddGroup = (e) => {
    e.preventDefault();
    if (newGroup && !groupList.includes(newGroup)) {
      setgroupList([...groupList, newGroup]);
      setNewGroup('');
    }
  };
  const handleRemoveGroup = (group) => {
    setgroupList((prev) => prev.filter((g) => g !== group));
  };

  // 使用 DropdownWrapper Component
  const [roles, setroles] = useState([]); // 選項列表
  const [selectedRole, setSelectedRole] = useState('載入中...'); // 預設選項
  const [currentCourseId, setcuurentCourseId] = useState(''); // 目前課程 ID
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setcuurentCourseId(classes.find((course) => course.name === role).id);
  };
  /////////////////////////////

  // 使用 Modal Component
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  /////////////////////////////

  const getCourseData = async () => {
    try {
      const response = await axios.get('http://se.bitx.tw:5000/courses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { courses } = response.data;
      setClasses(courses);
      if (courses.length > 0) {
        setroles(courses.map((course) => course.name));
        setcuurentCourseId(courses[0].id); // 默認設置為第一門課程
        setSelectedRole(courses[0].name);
      }
      setcuurentCourseId(courses[0].id);
    } catch (error) {
      console.error(error);
    }
  };

  const getStudentData = async (courseId) => {
    if (!courseId) return;
    try {
      const response = await axios.get(
        `http://se.bitx.tw:5000/getStudents/${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { students } = response.data;
      console.log(students);
      setStudents(students);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  useEffect(() => {
    getCourseData();
  }, []);

  useEffect(() => {
    getStudentData(currentCourseId);
  }, [currentCourseId]);

  return (
    <Container>
      <p className="title">課程分組名單</p>
      <div className="bar">
        <DropdownWrapper
          options={roles}
          selectedOption={selectedRole}
          onOptionSelect={handleRoleSelect}
        />
        <div className="setting">
          <ButtonIcon onClick={openModal} titleR="設定分組">
            <Settings2 />
          </ButtonIcon>
        </div>
      </div>

      {/* 彈出視窗 */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex">
          <div className="setForm">
            <p className="title">設定分組</p>
            <form onSubmit={handleAddGroup}>
              <div>
                <input
                  value={newGroup}
                  type="text"
                  onChange={(e) => setNewGroup(e.target.value)}
                  placeholder="新增分組"
                />
                <Button>
                  <Plus size={20} />
                  新增分組
                </Button>
              </div>
            </form>
            <div className="table-contianer">
              <table>
                <thead>
                  <tr className="tr-title">
                    <th>學號/姓名</th>
                    <th>角色</th>
                    <th>分組</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-teal-50' : 'bg-white'}
                    >
                      <td className="px-4 py-2 border-b">
                        {student.id} {student.name}
                      </td>
                      <td className="px-4 py-2 border-b">學生</td>
                      <td className="px-4 py-2 border-b">
                        <form>
                          {editIndex === index ? (
                            <input
                              type="text"
                              value={group[index] || ''}
                              onChange={(e) => handleInputChange(e, index)}
                              onBlur={() => handleInputBlur(student.id, index)}
                              list="group"
                              id={`ice-cream-choice-${index}`}
                              name={`ice-cream-choice-${index}`}
                            />
                          ) : (
                            <button
                              className="白 blank"
                              onClick={() => handleButtonClick(index)}
                              titleR="點擊以編輯"
                            >
                              {group[index] || student.group}
                              <ButtonIcon>
                                <Pen />
                              </ButtonIcon>
                            </button>
                          )}

                          <datalist id="group">
                            {groupList.map((group, index) => (
                              <option key={index} value={group} />
                            ))}
                          </datalist>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table>
                <thead>
                  <tr>
                    <th colSpan={2}>目前分組</th>
                  </tr>
                </thead>
                <tbody>
                  {groupList.map((group, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-teal-50' : 'bg-white'}
                    >
                      <td>{group}</td>
                      <td>
                        <ButtonIcon
                          style={{ background: '#EF4444' }}
                          onClick={() => handleRemoveGroup(group)}
                        >
                          <Trash2 color="white" />
                        </ButtonIcon>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal>
    </Container>
  );
};

export default StudentList;