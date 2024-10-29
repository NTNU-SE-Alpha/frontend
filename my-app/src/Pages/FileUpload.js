import React, { useState } from 'react';
// import styled from 'styled-components';
import axios from 'axios';


const UploadFile = () => {
  
  const [selectedFile, setSelectedFile] = useState(null);
  // const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  // const [isUploading, setIsUploading] = useState(false);

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

    axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percent);
        },
    })
    .then(response => {
        setUploadStatus('File uploaded successfully!');
        setUploadedFileName(response.data.filename); // 假設伺服器回應中的 filename 是這樣命名的
    })
    .catch(error => {
        alert('Error uploading the file.');
        console.log(error);
    });
};


  return (
    <div>
      <h1>上傳pdf</h1>
        <form>
          <input
            type="file"
            id="fileElem"
            accept="application/pdf"
            style={{ display: 'none' }}
            onChange={(e) => handleFiles(e.target.files)}
          />
          <label class="button" for="fileElem">選擇檔案</label>
          {/* <button>選擇檔案</button> */}
        </form>
        <button
          display = {!selectedFile ? 'block' : 'none'}
          disabled={!selectedFile || isUploading}
          onClick={startUpload}
        >
          上傳檔案
        </button>
      <div>{uploadStatus}</div>
      {uploadedFileName && (
        <div>
          <a href={`/uploads/${uploadedFileName}`}>
            {uploadedFileName}
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
