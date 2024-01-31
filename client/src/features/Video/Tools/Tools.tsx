import React, { useRef } from 'react';
import { BsBodyText } from 'react-icons/bs';
import { FiSave } from 'react-icons/fi';
import { HiOutlineUpload } from 'react-icons/hi';
import { TbCut } from 'react-icons/tb';
import { useCurrentTab } from '../../../hooks/useCurrentTab';
import { EnLanguage, useVideosStore } from '../../../stores/videos.store';
import { EnVideoPlayback } from '../../../ts/enums/video.enums';
import { S } from './Tools.styled';
type Props = {};

const Tools = (props: Props) => {
  const {
    uploadFile,
    playback,
    setPlayback,
    cut,
    setEnglishLanguage,
    setArabicLanguage,
    downloadVideo,
    transcribe,
  } = useVideosStore();
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
    <S.Container>
      <div className=' bg-[#2a2438] justify-around rounded-lg  flex flex-col text-white mt-10'>
        <button
          className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f] rounded-t-lg hover:rounded-t-lg disabled:bg-transparent disabled:text-gray-600'
          onClick={() => {
            if (uploadRef.current?.value) uploadRef.current.value = '';
            uploadRef.current?.click();
          }}
          title='Upload'
        >
          <HiOutlineUpload size={25} />
        </button>

        <button
          className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f]   rounded-lg disabled:bg-transparent disabled:text-gray-600'
          disabled={tab.uploadProgress !== 100 || tab.videoUrl === null}
          onClick={downloadVideo}
          title='Save'
        >
          <FiSave size='25' />
        </button>
        <S.UploadHidden
          type='file'
          accept='video/*, audio/*'
          ref={uploadRef}
          onChange={uploadHandler}
        />

        <button
          className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f] hover:rounded-b-lg rounded-b-lg disabled:bg-transparent disabled:text-gray-600'
          onClick={cut}
          title='Cut'
          disabled={tab.videoId === null || tab.selectorStart === 0 || tab.selectorEnd === 0}
        >
          <TbCut size='25' />
        </button>
        <button
          className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f] hover:rounded-b-lg rounded-b-lg disabled:bg-transparent disabled:text-gray-600'
          disabled={tab.uploadProgress !== 100}
          onClick={transcribe}
          title='Transcribe'
        >
          <BsBodyText size='25' />
        </button>
        <button
          className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f] hover:rounded-b-lg rounded-b-lg disabled:bg-transparent disabled:text-gray-600'
          onClick={setEnglishLanguage}
          disabled={tab.language === EnLanguage.ENGLISH}
          title='English Language'
        >
          E
        </button>
        <button
          className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f] hover:rounded-b-lg rounded-b-lg disabled:bg-transparent disabled:text-gray-600'
          disabled={tab.language === EnLanguage.ARABIC}
          onClick={setArabicLanguage}
          title='Arabic Language'
        >
          A
        </button>
      </div>
    </S.Container>
  );
};

export default Tools;
