import { HexColorPicker } from 'react-colorful';

import { Stage, Layer, Text, Image, Rect } from 'react-konva';
import React, { useState, useEffect } from 'react';
import { BsType } from 'react-icons/bs';
import { TbPhotoSearch } from 'react-icons/tb';
import { IoShapesOutline } from 'react-icons/io5';
import { BiColorFill } from 'react-icons/bi';
import { RiSettings4Line } from 'react-icons/ri';
import {
  AiOutlineZoomIn,
  AiOutlineColumnHeight,
  AiOutlineColumnWidth,
  AiOutlineZoomOut,
} from 'react-icons/ai';
import { FiSave } from 'react-icons/fi';

export default function GraphicEditor() {
  //Background
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(800);
  const [zoom, setZoom] = useState(70);
  const [backgroundColor, setBackgroundColor] = useState('#eeeeee');
  const [backgroundForm, setBackgroundForm] = useState(true);
  useEffect(() => {
    if (height > 1200 || width > 1200) {
      setZoom(30);
    }
    if (height < 1200 || width < 1200) {
      setZoom(50);
    }
    if (height < 700 || width < 700) {
      setZoom(120);
    }
  }, [height, width]);

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
          onClick={() => {
            setBackgroundForm(true);
          }}
        >
          <Layer>
            <Rect x={0} y={0} width={width} height={height} fill={backgroundColor} />
          </Layer>
        </Stage>
      </div>
      <div className='h-[95vh] mr-16'>
        {backgroundForm ? (
          <div className='rounded-lg bg-[#15121c] border-[1px] border-New_Gray p-4 text-black w-[15vw]'>
            <div className='flex flex-col justify-center text-gray-500'>
              <label htmlFor='' className='flex'>
                <AiOutlineColumnWidth size='22' className='mr-2' /> Width
              </label>
              <input
                type='text'
                value={width}
                onChange={(e) => {
                  setWidth(Number(e.target.value));
                }}
                className='rounded px-2 py-1 bg-[#2a2438] mb-4'
              />
              <label htmlFor='' className='flex'>
                <AiOutlineColumnHeight size='22' className='mr-2' /> Height
              </label>
              <input
                type='text'
                className='rounded px-2 py-1 bg-[#2a2438]  mb-4'
                value={height}
                onChange={(e) => {
                  setHeight(Number(e.target.value));
                }}
              />
              <label htmlFor='' className='flex'>
                <RiSettings4Line size='22' className='mr-2' /> Presets{' '}
              </label>

              <select
                className='rounded px-2 py-2 bg-[#2a2438]  mb-4'
                onChange={(e) => {
                  setHeight(Number(JSON.parse(e.target.value).height));
                  setWidth(Number(JSON.parse(e.target.value).width));
                }}
              >
                <option value='{"width":"800","height":"800"}'>Defualt Dimenstion</option>
                Square:1080 x 1080 Stories and Reels: 1080 x 1920
                <option value='{"width":"320","height":"320"}'>
                  Instagram Profile photo: 320 x 320
                </option>
                <option value='{"width":"1080","height":"566"}'>
                  Instagram Landscape: 1080 x 566
                </option>
                <option value='{"width":"1080","height":"1350"}'>
                  Instagram Portrait: 1080 x 1350
                </option>
                <option value='{"width":"1080","height":"1920"}'>
                  Instagram Storiey: 1080 x 1920
                </option>
                <option value='{"width":"1080","height":"1920"}'>
                  Instagram Storiey: 1080 x 1920
                </option>
                <option value='{"width":"170","height":"170"}'>Facebook Avatar: 170 x 170</option>
                <option value='{"width":"1200","height":"630"}'>
                  Facebook Landscape: 1200 x 630
                </option>
                <option value='{"width":"1200","height":"630"}'>
                  Facebook Portrait: 1200 x 630
                </option>
                <option value='{"width":"851","height":"315"}'>
                  Facebook Cover photo: 851 x 315
                </option>
                <option value='{"width":"1200","height":"1200"}'>
                  Facebook Square: 1200 x 1200
                </option>
                <option value='{"width":"1080","height":"1920"}'>
                  Facebook Story: 1080 x 1920
                </option>
                <option value='{"width":"400","height":"400"}'>X Profile photo: 400 x 400 </option>
                <option value='{"width":"1600","height":"900"}'>
                  X Profile photo: 1600 x 900{' '}
                </option>
                <option value='{"width":"1080","height":"1350"}'>X Portrait: 1080 x 1350 </option>
                <option value='{"width":"1080","height":"1080"}'>X Square: 1080 x 1080 </option>
                <option value='{"width":"1500","height":"1500"}'>
                  X Cover photo: 1500 x 1500{' '}
                </option>
              </select>

              <label htmlFor='' className='flex'>
                <BiColorFill size='22' className='mr-2' />
                Background Color
              </label>
              <HexColorPicker
                color={backgroundColor}
                onChange={setBackgroundColor}
                className='mx-auto'
              />
            </div>
          </div>
        ) : (
          <div className='w-[15vw] bg-red-200'></div>
        )}
      </div>
    </div>
  );
}
