import React, { useRef } from 'react';
import { BsBodyText } from 'react-icons/bs';
import { FiSave } from 'react-icons/fi';
import { HiOutlineDownload, HiOutlineUpload } from 'react-icons/hi';
import { RiEnglishInput } from 'react-icons/ri';
import { TbCut } from 'react-icons/tb';

import { MdOutlineSimCardDownload } from 'react-icons/md';

import { useCurrentTab } from '../../../hooks/useCurrentTab';
import { EnLanguage, useVideosStore } from '../../../stores/videos.store';
import { S } from './Tools.styled';
type Props = {};

const Tools = (props: Props) => {
  const {
    uploadFile,
    cut,
    setEnglishLanguage,
    setArabicLanguage,
    downloadVideo,
    transcribe,
    saveTab,
    importSavedTab,
  } = useVideosStore();
  const videoUploadRef = useRef<HTMLInputElement>(null);
  const importRef = useRef<HTMLInputElement>(null);

  const videoUploadHandler: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (videoUploadRef.current && videoUploadRef.current.value !== '') {
      const files = e.target.files;

      if (files && files[0]) {
        uploadFile(files[0]);
      }
    }
  };

  const importHandler: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (importRef.current && importRef.current.value !== '') {
      const files = e.target.files;

      if (files && files[0]) {
        importSavedTab(files[0]);
      }
    }
  };

  const tab = useCurrentTab();

  return (
    <S.Container>
      <div className=' bg-[#2a2438] justify-around rounded-lg  flex flex-col text-white mt-10'>
        <button
          className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f] rounded-t-lg hover:rounded-t-lg disabled:bg-transparent disabled:text-gray-600'
          onClick={() => {
            if (videoUploadRef.current?.value) videoUploadRef.current.value = '';
            videoUploadRef.current?.click();
          }}
          title='Upload'
        >
          <MdOutlineSimCardDownload size={25} />
        </button>

        <button
          className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f]   rounded-lg disabled:bg-transparent disabled:text-gray-600'
          disabled={tab.uploadProgress !== 100 || tab.videoUrl === null || tab.downloading}
          onClick={downloadVideo}
          title='Save'
        >
          <FiSave size='25' />
        </button>
        <S.UploadHidden type='file' ref={videoUploadRef} onChange={videoUploadHandler} />

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
          className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f] disabled:bg-transparent disabled:text-gray-600'
          onClick={setEnglishLanguage}
          disabled={tab.language === EnLanguage.ENGLISH}
          title='English Language'
        >
          <RiEnglishInput size={25} />
        </button>
        <button
          className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f] g disabled:bg-transparent disabled:text-gray-600 text-xl'
          disabled={tab.language === EnLanguage.ARABIC}
          onClick={setArabicLanguage}
          title='Arabic Language'
        >
          Ar
        </button>
        <button
          className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f]  disabled:bg-transparent disabled:text-gray-600'
          onClick={saveTab}
          disabled={Boolean(!tab.videoId)}
          title='Export'
        >
          <HiOutlineUpload size={25} />
        </button>
        <button
          className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f] hover:rounded-b-lg rounded-b-lg disabled:bg-transparent disabled:text-gray-600'
          onClick={() => {
            if (importRef.current?.value) importRef.current.value = '';
            importRef.current?.click();
          }}
          title='Import'
        >
          <HiOutlineDownload size='25' />
        </button>
        <S.UploadHidden type='file' accept='text/json' ref={importRef} onChange={importHandler} />
      </div>
    </S.Container>
  );
};

export default Tools;
