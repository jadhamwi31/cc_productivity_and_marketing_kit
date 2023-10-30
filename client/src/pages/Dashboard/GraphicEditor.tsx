import { HexColorPicker } from 'react-colorful';

import { Stage, Layer, Text, Image, Rect } from 'react-konva';
import React, { useState, useEffect } from 'react';
import { BsType } from 'react-icons/bs';
import { TbPhotoSearch } from 'react-icons/tb';
import { IoShapesOutline } from 'react-icons/io5';
import { BiColorFill } from 'react-icons/bi';
import {
  AiOutlineZoomIn,
  AiOutlineColumnHeight,
  AiOutlineColumnWidth,
  AiOutlineZoomOut,
} from 'react-icons/ai';
import { FiSave } from 'react-icons/fi';

import Shapes from '../../components/Dashboard/GraphicEditor/Shapes';

export default function GraphicEditor() {
  //Background
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(800);
  const [zoom, setZoom] = useState(70);
  const [backgroundColor, setBackgroundColor] = useState('#eeeeee');

  return (
    <div className='flex justify-between'>
      <div className=' h-[95vh] w-[5vw] flex flex-col items-center justify-center'>
        <button className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f] rounded-lg'>
          <FiSave size='25' />
        </button>
        <div className=' bg-[#2a2438] justify-around rounded-lg  flex flex-col text-white mt-10'>
          <button className='px-2 py-1 hover:bg-[#4f245f] hover:rounded-t-lg '>
            <BsType size='25' />
          </button>
          <button className='px-2 py-1  hover:bg-[#4f245f] '>
            <TbPhotoSearch size='25' />
          </button>
          <button className='px-2 py-1 hover:bg-[#4f245f] hover:rounded-b-lg '>
            <IoShapesOutline size='25' />
          </button>
        </div>
        <div className=' justify-around flex flex-col text-white mt-10'>
          <button
            className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f] rounded-lg  '
            onClick={() => setZoom((prevZoom) => prevZoom + 5)}
          >
            <AiOutlineZoomIn size='25' />
          </button>
          <p className='text-gray-400  text-center'>{zoom}%</p>

          <button
            className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f] rounded-lg  '
            onClick={() => setZoom((prevZoom) => prevZoom - 5)}
          >
            <AiOutlineZoomOut size='25' />
          </button>
        </div>
      </div>
      <div className='flex-col flex   items-center  justify-center ' style={{ zoom: `${zoom}%` }}>
        <Stage
          width={width}
          height={height}
          style={{
            borderRadius: '25px',
            overflow: 'hidden',
            boxShadow: ' 0px 0px 10px 10px rgba(38,38,38,0.6)',
          }}
        >
          <Layer>
            <Rect x={0} y={0} width={width} height={height} fill={backgroundColor} />
          </Layer>
        </Stage>
      </div>
      <div className='h-[95vh] mr-16'>
        <div className='rounded-lg bg-[#15121c] border-[1px] border-New_Gray p-4 text-black'>
          <div className='flex flex-col justify-center text-gray-500'>
            <label htmlFor='' className='flex'>
              <AiOutlineColumnWidth size='22' className='mr-2' /> Width
            </label>
            <input type='text' className='rounded px-2 py-1 bg-[#2a2438] mb-4' />
            <label htmlFor='' className='flex'>
              <AiOutlineColumnHeight size='22' className='mr-2' /> Height
            </label>{' '}
            <input type='text' className='rounded px-2 py-1 bg-[#2a2438]  mb-4' />
            <label htmlFor='' className='flex'>
              <BiColorFill size='22' className='mr-2' />
              Background Color
            </label>
            <HexColorPicker color={backgroundColor} onChange={setBackgroundColor} />
          </div>
        </div>
      </div>
    </div>
  );
}
