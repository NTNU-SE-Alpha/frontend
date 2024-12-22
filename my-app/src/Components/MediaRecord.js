import { useReactMediaRecorder } from 'react-media-recorder';
import { LiveAudioVisualizer } from 'react-audio-visualize';
import ButtonIcon from './ButtonIcon';
import { Mic, MicOff, ArrowLeft, ArrowUp } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const MediaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  button {
    color: white;
    &.⬅️ {
    }
    &.⬆️ {
      /* margin-right: auto; */
    }
  }
  .rec_container {
    display: flex;
    align-items: center;
    justify-content: center;
    .red_circle {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: red;
      margin: 0 0.5rem;
    }
    p {
      color: white;
    }
  }
`;

const MediaRecord = ({ updateState }) => {
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
      <ButtonIcon onClick={updateState} className="⬅️">
        <ArrowLeft />
      </ButtonIcon>
      <div className="rec_container">
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
          <>
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
          </>
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
      </div>
      {(status === 'idle' || status === 'stopped') && mediaBlobUrl ? (
        <ButtonIcon className="⬆️">
          <ArrowUp />
        </ButtonIcon>
      ) : (
        <ButtonIcon />
      )}
    </MediaContainer>
  );
};

export default MediaRecord;
