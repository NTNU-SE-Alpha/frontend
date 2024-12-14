import { useReactMediaRecorder } from 'react-media-recorder';
import { LiveAudioVisualizer } from 'react-audio-visualize';
import ButtonIcon from './ButtonIcon';
import { Mic, MicOff } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const MediaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  button {
    color: white;
  }
  .rec_container {
    display: flex;
    align-items: center;

    .red_circle {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: red;
      margin: 0 0.5rem;
    }
  }
`;

const MediaRecord = () => {
  const [mediaStream, setMediaStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      onStart: async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setMediaStream(stream);
        setIsRecording(true);
      },
      onStop: () => {
        if (mediaStream) {
          mediaStream.getTracks().forEach((track) => track.stop());
        }
        setMediaStream(null);
        setIsRecording(false);
      },
    });

  return (
    <MediaContainer>
      {status === 'idle' || status === 'stopped' ? (
        <ButtonIcon onClick={startRecording}>
          <Mic />
        </ButtonIcon>
      ) : (
        <ButtonIcon onClick={stopRecording}>
          <MicOff />
        </ButtonIcon>
      )}

      {status === 'recording' && (
        <div className="rec_container">
          <motion.div
            className="red_circle"
            animate={{
              type: 'spring',
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              times: [0, 0.5, 1],
              repeat: Infinity,
              repeatDelay: 0.5,
              repeatType: 'loop',
            }}
          />
          <p>{status}</p>
        </div>
      )}
      {/* 
      {isRecording && mediaStream && (
        <LiveAudioVisualizer
          mediaStream={mediaStream}
          width={300}
          height={100}
          backgroundColor="#000"
          barColor="#00ff00"
        />
      )} */}

      {/* 錄製完成後的音頻播放 */}
      {(status === 'idle' || status === 'stopped') && mediaBlobUrl && (
        <audio src={mediaBlobUrl} controls />
      )}
    </MediaContainer>
  );
};

export default MediaRecord;
