import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import Button from '../Components/Button';
import styled from 'styled-components';
import Modal from './Modal';
import axios from 'axios';

const FileUpload = styled.div`
  .title {
    font-size: 1.5rem;
    font-weight: 600;
    color: black;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* Align vertically */
  border-radius: 5px;

  .form-container {
    width: 100%;
    max-width: 28rem;
    margin-top: 2.5rem;

    .form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .input-group {
        label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #4b5563;
          margin-bottom: 0.5rem;
        }

        input[type='file'] {
          display: block;
          width: 100%;
          font-size: 0.875rem;
          color: #6b7280;
          padding: 0.5rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          background-color: #f9fafb;
          cursor: pointer;

          &:hover {
            background-color: #f3f4f6;
          }

          &::file-selector-button {
            margin-right: 1rem;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 0.375rem;
            background-color: #bff8fe;
            color: teal;
            font-weight: 600;
            cursor: pointer;

            &:hover {
              background-color: teal;
              color: #fff;
            }
          }
        }
      }

      button {
        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      .result {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 0.375rem;

        &.success {
          background-color: #d1fae5;
          color: #065f46;
        }

        &.error {
          background-color: #fee2e2;
          color: #b91c1c;
        }

        a {
          color: #1d4ed8;
          text-decoration: underline;
        }
      }
    }
  }
`;

const UploadFile = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  // react hook from
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const selectedFile = watch('file');
  //////////////////////////
  const onSubmit = async (data) => {
    if (!selectedFile) return;
    setUploading(true);
    console.log(selectedFile);
    // 只接受PDF檔案
    // if (file.type !== 'application/pdf') {
    //   alert('目前只支援 PDF 檔案');
    //   return;
    // }

    // api
    const url = '';
    const formData = new FormData();
    formData.append('file', selectedFile[0]);
    formData.append('courseId', 1);
    console.log(formData);
    setIsUploading(true);
    try {
      const response = await axios.post(
        'http://se.bitx.tw:5000/api/upload_pdf',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        }
      );
      const { filename } = response.data;
      const { message } = response.data;
      setUploadStatus('檔案上傳成功！');
      setUploadedFileName(filename);
      setResult({ success: true, url: `http://se.bitx.tw:5000/${filename}` });
    } catch (error) {
      alert('檔案上傳失敗');
      console.error(error);
      setUploadStatus('檔案上傳失敗');
      setResult({ success: false, error: error.message });
    } finally {
      setIsUploading(false);
    }
  };
  //////////////////////////

  return (
    <FileUpload>
      <p className="title">上傳檔案</p>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="input-group">
            <label htmlFor="file">選擇文件</label>
            <input
              type="file"
              id="file"
              {...register('file', { required: true })}
            />
          </div>
          <Button type="submit" disabled={!selectedFile || isUploading}>
            {isUploading ? '上傳中...' : '上傳'}
          </Button>
        </form>
        {result && (
          <div className={`result ${result.success ? 'success' : 'error'}`}>
            {result.success ? (
              <>
                <p>上傳成功！</p>
                <a href={result.url} target="_blank" rel="noopener noreferrer">
                  查看文件
                </a>
              </>
            ) : (
              <p>{result.error}</p>
            )}
          </div>
        )}
      </div>
    </FileUpload>
  );
};

export default UploadFile;
