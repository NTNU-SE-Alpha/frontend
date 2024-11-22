import { useReactMediaRecorder } from 'react-media-recorder';
import { LiveAudioVisualizer } from 'react-audio-visualize';
import ButtonIcon from '../Components/ButtonIcon';
import { Mic, MicOff } from 'lucide-react';
import React, { useState } from 'react';

const RecordView = () => {
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
    <div>
      <p>{status}</p>

      {(status === 'idle' || status === 'stopped') && (
        <ButtonIcon onClick={startRecording}>
          <Mic />
        </ButtonIcon>
      )}

      {status === 'recording' && (
        <ButtonIcon onClick={stopRecording}>
          <MicOff />
        </ButtonIcon>
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
      {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
    </div>
  );
};

export default RecordView;
