import { useRef } from 'react';
import Button from '../../../components/Button/Button';
import { useCurrentTab } from '../../../hooks/useCurrentTab';
import { useVideosStore } from '../../../stores/videos.store';
import { EnVideoPlayback } from '../../../ts/enums/video.enums';
import { S } from './Tools.styled';
import { HiOutlineUpload } from 'react-icons/hi';
import { FiSave } from 'react-icons/fi';
import { FaPause, FaPlay } from 'react-icons/fa';
import { TbCut } from 'react-icons/tb';
import { LiaUndoSolid, LiaRedoSolid } from 'react-icons/lia';
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
    <div className='bg-red-400 flex  '>
      <div className='bg-blue-100'>
        <button
          className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f] rounded-lg disabled:bg-transparent disabled:text-gray-600'
          onClick={undo}
          disabled={tab.undo.length === 1}
        >
          <LiaUndoSolid size='25' />
        </button>
        <button
          className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f] rounded-lg disabled:bg-transparent disabled:text-gray-600'
          onClick={redo}
          disabled={tab.redo.length === 1}
        >
          <LiaRedoSolid size='25' />
        </button>
      </div>
      <div className='grow  text-center'>
        <button
          className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f] rounded-lg disabled:bg-transparent disabled:text-gray-600'
          onClick={playbackHandler}
          disabled={tab.videoId === null}
        >
          {playback === EnVideoPlayback.PAUSED ? <FaPlay size={25} /> : <FaPause size={25} />}
        </button>
      </div>
    </div>
  );
};

export default Controls;
