import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ButtonIcon from '../Components/ButtonIcon';
import styled from 'styled-components';
import axios from 'axios';

const FileUpload = styled.div`
  .box {
    display: flex;
    flex-direction: column;
    justify-content: center; /* Align horizontally */
    align-items: center; /* Align vertically */
    height: 100vh; /* Full height of the viewport */
    border-radius: 5px;
  }
`;

const UploadFile = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const selectedFile = watch('file'); // 監視 file input 的變化

  const onSubmit = async (data) => {
    if (!data.file || data.file.length === 0) return;

    const file = data.file[0];
    if (file.type !== 'application/pdf') {
      alert('目前只支援 PDF 檔案');
      return;
    }

    const url = 'http://localhost:5000/api/upload'; // 設定你的上傳 URL
    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });

      setUploadStatus('檔案上傳成功！');
      setUploadedFileName(response.data.filename); // 假設伺服器回應中的 filename 是這樣命名的
    } catch (error) {
      alert('檔案上傳失敗');
      console.error(error);
      setUploadStatus('檔案上傳失敗');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <FileUpload>
      <div className="box">
        <h1>上傳 PDF</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 使用 react-hook-form 的 register 註冊 input */}
          <input
            type="file"
            id="fileElem"
            accept="application/pdf"
            {...register('file', { required: true })}
            style={{ display: 'none' }}
          />
          <label className="button" htmlFor="fileElem">
            選擇檔案
          </label>

          {errors.file && <div style={{ color: 'red' }}>請選擇檔案</div>}

          <button
            type="submit"
            disabled={!selectedFile || isUploading}
            style={{ marginTop: '1rem' }}
          >
            上傳檔案
          </button>
        </form>

        {uploadProgress > 0 && <div>上傳進度：{uploadProgress}%</div>}

        <div>{uploadStatus}</div>

        {uploadedFileName && (
          <div>
            <a
              href={`/uploads/${uploadedFileName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {uploadedFileName}
            </a>
          </div>
        )}
      </div>
    </FileUpload>
  );
};

export default UploadFile;
