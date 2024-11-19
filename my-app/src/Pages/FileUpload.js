import React, { useState } from 'react';
import ButtonIcon from '../Components/ButtonIcon';
import styled from 'styled-components';
import axios from 'axios';

const FileUpload = styled.div`

  .box {
    display: flex;
    flex-direction: column;
    justify-content: center; /* Align horizontally */
    align-items: center;   /* Align vertically */
    height: 100vh;         /* Full height of the viewport */
    border-radius: 5px;
  }
`;

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFiles = (files) => {
    const file = files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setUploadStatus(`已選擇檔案: ${file.name}`);
      setUploadedFileName('');
    } else {
      alert('目前只支援 PDF 檔案');
    }
  };

  const startUpload = () => {
    if (!selectedFile) return;

    const url = 'http://localhost:5000/api/upload'; // 設定你的上傳 URL
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      })
      .then((response) => {
        setUploadStatus('File uploaded successfully!');
        setUploadedFileName(response.data.filename); // 假設伺服器回應中的 filename 是這樣命名的
      })
      .catch((error) => {
        alert('Error uploading the file.');
        console.log(error);
      });
  };

  return (
    <div>
      <h1>上傳pdf</h1>
      {/* <form>
        <label class="button" for="fileElem">
          選擇檔案
        </label>
        <br />
        <input
          type="file"
          id="fileElem"
          accept="application/pdf"
          style={{ display: 'none' }}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </form> */}
      <form id="upload">
        <input
          type="file"
          id="fileElem"
          accept="application/pdf"
          style={{ display: 'none' }}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <ButtonIcon type="submit">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9 7C9 4.23858 11.2386 2 14 2C16.7614 2 19 4.23858 19 7V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9C5 8.44772 5.44772 8 6 8C6.55228 8 7 8.44772 7 9V15C7 17.7614 9.23858 20 12 20C14.7614 20 17 17.7614 17 15V7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15V7Z"
              fill="currentColor"
            ></path>
          </svg>
        </ButtonIcon>
      </form>
      <div>{uploadStatus}</div>
      {uploadedFileName && (
        <div>
          <a href={`/uploads/${uploadedFileName}`}>{uploadedFileName}</a>
        </div>
      )}
      <button
        display={!selectedFile ? 'block' : 'none'}
        disabled={!selectedFile || isUploading}
        onClick={startUpload}
      >
        上傳檔案
      </button>
    </div>
  );
};

export default UploadFile;
