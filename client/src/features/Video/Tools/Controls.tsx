import React, { useRef } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { LiaRedoSolid, LiaUndoSolid } from 'react-icons/lia';
import { useCurrentTab } from '../../../hooks/useCurrentTab';
import { useVideosStore } from '../../../stores/videos.store';
import { EnVideoPlayback } from '../../../ts/enums/video.enums';
type Props = {};

const Controls = (props: Props) => {
  const { uploadFile, playback, setPlayback, undo, redo } = useVideosStore();
  const uploadRef = useRef<HTMLInputElement>(null);

  const uploadHandler: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (uploadRef.current && uploadRef.current.value !== '') {
      const files = e.target.files;

      if (files && files[0]) {
        uploadFile(files[0]);
      }
    }
  };

  const playbackHandler = () => {
    if (playback === EnVideoPlayback.PAUSED) {
      setPlayback(EnVideoPlayback.PLAYING);
    } else {
      setPlayback(EnVideoPlayback.PAUSED);
    }
  };

  const tab = useCurrentTab();

  return (
    <div className=' flex  '>
      <div className=' pl-10'>
        <button
          className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f] rounded-l-lg disabled:bg-transparent disabled:text-gray-600'
          onClick={undo}
          disabled={tab.undo.length === 1}
          title='Undo'
        >
          <LiaUndoSolid size='25' />
        </button>
        <button
          className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f] rounded-r-lg disabled:bg-transparent disabled:text-gray-600'
          onClick={redo}
          disabled={tab.redo.length === 1}
          title='Redo'
        >
          <LiaRedoSolid size='25' />
        </button>
      </div>
      <div className='grow  text-center'>
        <button
          className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f] rounded-lg disabled:bg-transparent disabled:text-gray-600'
          onClick={playbackHandler}
          disabled={tab.videoUrl === null}
          title={playback === EnVideoPlayback.PAUSED ? 'Play' : 'Pause'}
        >
          {playback === EnVideoPlayback.PAUSED ? <FaPlay size={25} /> : <FaPause size={25} />}
        </button>
      </div>
    </div>
  );
};

export default Controls;
