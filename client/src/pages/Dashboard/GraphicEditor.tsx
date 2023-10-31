import { HexColorPicker } from 'react-colorful';

import { Stage, Layer, Text, Image, Rect } from 'react-konva';
import React, { useState, useEffect, useRef } from 'react';
import { BsType } from 'react-icons/bs';
import { TbPhotoSearch } from 'react-icons/tb';
import { IoShapesOutline } from 'react-icons/io5';
import { BiColorFill } from 'react-icons/bi';
import { RiSettings4Line, RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineZoomIn, AiOutlineZoomOut, AiOutlinePlus } from 'react-icons/ai';
import { FiSave } from 'react-icons/fi';
import CustomImage from '../../components/Dashboard/GraphicEditor/CustomImage';
import { toast } from 'react-toastify';

export default function GraphicEditor() {
  //Background
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(800);
  const [zoom, setZoom] = useState(100);
  const [backgroundColor, setBackgroundColor] = useState('#eeeeee');
  const [backgroundForm, setBackgroundForm] = useState(true);
  const [backgroundRec, setBackgroundRec] = useState(false);
  useEffect(() => {
    console.log(backgroundRec);
    if (height >= 900) {
      setHeight((prevHeight) => prevHeight / 3);
    }
    if (width >= 900) {
      setWidth((prevWidth) => prevWidth / 3);
    }
  }, [height, width, backgroundRec]);

  //General
  const RemoveAllforms = () => {
    setImageForm(false);
    setTextForm(false);
    setUpateTextForm(false);
  };
  const stageRef = React.useRef(null);
  function downloadURI(uri: any, name: any) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  const handleExport = () => {
    setTimeout(() => {
      setBackgroundRec(true);
    }, 1000);

    setTimeout(() => {
      if (stageRef && stageRef.current) {
        const stage = stageRef.current as any;
        const uri = stage.toDataURL();
        downloadURI(uri, 'stage.png');
      } else {
        console.error('stageRef.current is null');
      }

      setBackgroundRec(false);
    }, 1000);
  };

  //Images
  const [imageURLs, setImageURLs] = useState<any>([]);
  const [images, setImages] = useState<any>([]);
  const [imageForm, setImageForm] = useState(false);
  const [selectedId, selectShape] = useState<any>(null);
  const [selectdImageToBeDeleted, setSelectdImageToBeDeleted] = useState<any>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageArray = Array.from(files).map((file, index) => {
        const reader = new FileReader();
        const image = new window.Image();

        reader.onload = (e) => {
          const imageURL = e.target?.result as string;

          image.onload = () => {
            setImages((prevImages: any) => [
              ...prevImages,
              {
                id: prevImages.length,
                image,
                x: 0,
                y: 0,
                width: image.width / 2,
                height: image.height / 2,
              },
            ]);
          };

          image.src = imageURL;
        };

        reader.readAsDataURL(file);
        return URL.createObjectURL(file);
      });

      setImageURLs(imageArray);
    }
  };
  const handleImageSelect = (i: any) => {
    setImageForm(true);
    setSelectdImageToBeDeleted(i);
  };

  const deleteImage = (): void => {
    console.log(selectedId);
    if (selectdImageToBeDeleted !== null) {
      setImages((prevImages: any) =>
        prevImages.filter((image: any) => image.id !== selectdImageToBeDeleted),
      );
      setImageForm(false); // You may want to close the image form after deleting.
    }
  };

  //Text
  const [texts, setTexts] = useState<any>([]);
  const [newText, setNewText] = useState('');
  const [newTextColor, setNewTextColor] = useState('');
  const [newTextSize, setNewTextSize] = useState('12');
  const [newTextFont, setNewTextFont] = useState('');
  const [textForm, setTextForm] = useState(false);

  const [updateTextForm, setUpateTextForm] = useState(false);
  const [updatedText, setUpdatedText] = useState('');
  const [updatedTextFont, setUpdatedTextFont] = useState('');
  const [updatedTextColor, setUpdatedTextColor] = useState('');
  const [updatedTextSize, setUpdatedTextSize] = useState('');
  const [textToBeUpdated, setTextToBeUpdated] = useState(0);

  const addText = () => {
    if (newText === '') {
      toast.error('Empty text not allowed');
    } else {
      const text = {
        text: newText,
        x: 100,
        y: 100,
        fill: newTextColor,
        fontSize: newTextSize,
        fontFamily: newTextFont,
        draggable: true,
        isSelected: false,
      };
      setUpateTextForm(false);
      setNewText('');
      setNewTextColor('#000000');
      setNewTextSize('');
      setNewTextSize('');
      setTexts([...texts, text]);
    }
  };
  const handleTextSelect = (index: any) => {
    const updatedTexts = texts.map((text: any, i: any) => ({
      ...text,
      isSelected: i === textToBeUpdated,
    }));
    setUpdatedText(updatedTexts[index].text);
    setUpdatedTextSize(updatedTexts[index].fontSize);
    setUpdatedTextColor(updatedTexts[index].fill);
    setUpateTextForm(true);
    setTextForm(false);
    setTextToBeUpdated(index);
  };
  const updateTextAction = () => {
    const updatedTexts = texts.map((text: any, i: any) => ({
      ...text,
      isSelected: i === textToBeUpdated,
    }));
    if (updatedText === '') {
      toast.error('Empty text not allowed');
    } else {
      updatedTexts[textToBeUpdated].text = updatedText;
      updatedTexts[textToBeUpdated].fill = updatedTextColor;
      updatedTexts[textToBeUpdated].fontSize = updatedTextSize;
      updatedTexts[textToBeUpdated].fontFamily = updatedTextFont;
      setTexts(updatedTexts);
      setUpateTextForm(false);
    }
  };
  const deleteText = (): void => {
    if (selectdImageToBeDeleted !== null) {
      setTexts((prevTexts: any) => prevTexts.filter((text: any) => text.id !== textToBeUpdated));
      setUpateTextForm(false);
    }
  };
  //Deselcet Funtion
  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };
  return (
    <div className='flex justify-between'>
      <div className=' h-[95vh] w-[5vw] flex flex-col items-center justify-center'>
        <button
          className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f] rounded-lg'
          onClick={() => {
            setBackgroundRec(true);
            handleExport();
          }}
        >
          <FiSave size='25' />
        </button>
        <div className=' bg-[#2a2438] justify-around rounded-lg  flex flex-col text-white mt-10'>
          <button
            className='px-2 py-1 hover:bg-[#4f245f] hover:rounded-t-lg '
            onClick={() => {
              RemoveAllforms();
              setTextForm(true);
            }}
          >
            <BsType size='25' />
          </button>

          <label className='px-2 py-1  hover:bg-[#4f245f] ' htmlFor='img'>
            <TbPhotoSearch size='25' />
          </label>
          <input
            id='img'
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleImageChange}
          />

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
            disabled={zoom === 100}
          >
            <AiOutlineZoomOut size='25' />
          </button>
        </div>
      </div>
      <div className='flex-col flex items-center justify-center' style={{ zoom: `${zoom}%` }}>
        <div style={{ backgroundColor: backgroundColor, borderRadius: '25px' }}>
          <Stage
            ref={stageRef}
            width={width}
            height={height}
            style={{
              borderRadius: '25px',
              overflow: 'hidden',
              boxShadow: '0px 0px 10px 10px rgba(38,38,38,0.6)',
            }}
            onMouseDown={checkDeselect}
          >
            <Layer>
              {backgroundRec && (
                <Rect x={0} y={0} width={width} height={height} fill={backgroundColor} />
              )}
              {images.map((imageData: any, i: any) => (
                <CustomImage
                  key={i}
                  shapeProps={imageData}
                  isSelected={imageData.id === selectedId}
                  onSelect={() => {
                    RemoveAllforms();
                    selectShape(imageData.id);
                    handleImageSelect(i);
                  }}
                  onChange={(newAttrs) => {
                    const updatedImages = images.map((img: any) =>
                      img.id === imageData.id ? { ...img, ...newAttrs } : img,
                    );
                    setImages(updatedImages);
                  }}
                />
              ))}
              {texts.map((text: any, index: any) => (
                <React.Fragment key={index}>
                  <Text
                    {...text}
                    onMouseDown={() => {
                      RemoveAllforms();
                      handleTextSelect(index);
                    }}
                  />
                </React.Fragment>
              ))}
            </Layer>
          </Stage>
        </div>
      </div>

      <div className='h-[95vh] mr-16'>
        {backgroundForm ? (
          <div className='rounded-lg bg-[#15121c] border-[1px] border-New_Gray p-4 text-black w-[15vw]'>
            <div className='flex flex-col justify-center text-gray-500'>
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
                  Instagram Story: 1080 x 1920
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
        {imageForm ? (
          <div className='rounded-lg bg-[#15121c] border-[1px] border-New_Gray p-4 text-black w-[15vw] mt-5'>
            <div className='flex flex-col justify-center text-gray-500'>
              <span className=' flex '>
                <TbPhotoSearch size={20} className='mr-2' /> Image Settings
              </span>
              <hr className='h-px mb-2 bg-gray-500 border-0 ' />
              <button
                onClick={() => {
                  deleteImage();
                }}
                className=' bg-red-500  text-red-500 px-4 w-full rounded-md'
              >
                <span className='flex  text-white justify-center '>
                  <RiDeleteBin6Line size={20} className='mr-2 ' /> Delete
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className='w-[15vw] bg-red-200'></div>
        )}
        {updateTextForm ? (
          <div className='rounded-lg bg-[#15121c] border-[1px] border-New_Gray p-4 text-black w-[15vw] mt-5'>
            <div className='flex flex-col justify-center text-gray-500'>
              <span className=' flex font-bold'>
                <BsType size={20} className='mr-2 ' /> Update Text
              </span>
              <hr className='h-px mb-2 bg-gray-500 border-0 ' />
              <label htmlFor='' className='flex'>
                Text
              </label>
              <input
                className='rounded px-2 py-1 bg-[#2a2438]  mb-4'
                type='text'
                value={updatedText}
                onChange={(e) => {
                  setUpdatedText(e.target.value);
                }}
              />
              <label htmlFor='' className='flex'>
                Font Family
              </label>
              <select
                className='rounded px-2 py-2 bg-[#2a2438]  mb-4'
                value={updatedTextFont}
                onChange={(e) => setUpdatedTextFont(e.target.value)}
              >
                <option style={{ fontFamily: 'Arial' }}>Arial</option>
                <option style={{ fontFamily: 'Brush Script MT' }}>Brush Script MT</option>
                <option style={{ fontFamily: 'Helvetica' }}>Helvetica</option>
                <option style={{ fontFamily: 'Georgia' }}>Georgia</option>
                <option style={{ fontFamily: 'Times New Roman' }}>Times New Roman</option>
                <option style={{ fontFamily: 'Courier New' }}>Courier New</option>
                <option style={{ fontFamily: 'Verdana' }}>Verdana</option>
                <option style={{ fontFamily: 'Impact' }}>Impact</option>
                <option style={{ fontFamily: 'Comic Sans MS' }}>Comic Sans MS</option>
                <option style={{ fontFamily: 'Trebuchet MS' }}>Trebuchet MS</option>
                <option style={{ fontFamily: 'Arial Black' }}>Arial Black</option>
                <option style={{ fontFamily: 'Palatino Linotype' }}>Palatino Linotype</option>
                <option style={{ fontFamily: 'Lucida Sans Unicode' }}>Lucida Sans Unicode</option>
                <option style={{ fontFamily: 'Tahoma' }}>Tahoma</option>
                <option style={{ fontFamily: 'Courier' }}>Courier</option>
                <option style={{ fontFamily: 'Lucida Console' }}>Lucida Console</option>
              </select>
              <label htmlFor='' className='flex'>
                Text Size {updatedTextSize}
              </label>

              <input
                value={updatedTextSize}
                type='range'
                min='10'
                max='150'
                className='w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm '
                onChange={(event) => setUpdatedTextSize(event.target.value)}
              />
              <label htmlFor='' className='flex'>
                <span className='pt-1'>Text Color</span>
                <input
                  className='rounded px-2 py-1 bg-[#2a2438] ml-2  mb-4'
                  type='color'
                  value={updatedTextColor}
                  onChange={(e) => {
                    setUpdatedTextColor(e.target.value);
                  }}
                />
              </label>
              <button
                onClick={() => {
                  deleteText();
                }}
                className=' text-sm mb-2 text-red-500 px-4 w-full rounded-md hover:underline'
              >
                Delete
              </button>
              <button
                className=' bg-[#2A2438]   px-2 py-1 w-full rounded-md hover:bg-[#191521]'
                onClick={() => {
                  updateTextAction();
                }}
              >
                Update Text
              </button>
            </div>
          </div>
        ) : (
          <div className='w-[15vw] bg-red-200'></div>
        )}
        {textForm ? (
          <div className='rounded-lg bg-[#15121c] border-[1px] border-New_Gray p-4 text-black w-[15vw] mt-5'>
            <div className='flex flex-col justify-center text-gray-500'>
              <span className=' flex '>
                <BsType size={20} className='mr-2' /> Add Text
              </span>
              <hr className='h-px mb-2 bg-gray-500 border-0 ' />
              <label htmlFor='' className='flex'>
                Text
              </label>
              <input
                className='rounded px-2 py-1 bg-[#2a2438]  mb-4'
                type='text'
                value={newText}
                onChange={(e) => {
                  setNewText(e.target.value);
                }}
              />
              <label htmlFor='' className='flex'>
                Font Family
              </label>
              <select
                className='rounded px-2 py-2 bg-[#2a2438]  mb-4'
                value={newTextFont}
                onChange={(e) => setNewTextFont(e.target.value)}
              >
                <option style={{ fontFamily: 'Arial' }}>Arial</option>
                <option style={{ fontFamily: 'Brush Script MT' }}>Brush Script MT</option>
                <option style={{ fontFamily: 'Helvetica' }}>Helvetica</option>
                <option style={{ fontFamily: 'Georgia' }}>Georgia</option>
                <option style={{ fontFamily: 'Times New Roman' }}>Times New Roman</option>
                <option style={{ fontFamily: 'Courier New' }}>Courier New</option>
                <option style={{ fontFamily: 'Verdana' }}>Verdana</option>
                <option style={{ fontFamily: 'Impact' }}>Impact</option>
                <option style={{ fontFamily: 'Comic Sans MS' }}>Comic Sans MS</option>
                <option style={{ fontFamily: 'Trebuchet MS' }}>Trebuchet MS</option>
                <option style={{ fontFamily: 'Arial Black' }}>Arial Black</option>
                <option style={{ fontFamily: 'Palatino Linotype' }}>Palatino Linotype</option>
                <option style={{ fontFamily: 'Lucida Sans Unicode' }}>Lucida Sans Unicode</option>
                <option style={{ fontFamily: 'Tahoma' }}>Tahoma</option>
                <option style={{ fontFamily: 'Courier' }}>Courier</option>
                <option style={{ fontFamily: 'Lucida Console' }}>Lucida Console</option>
              </select>
              <label htmlFor='' className='flex'>
                Text Size {newTextSize}
              </label>

              <input
                value={newTextSize}
                type='range'
                min='10'
                max='150'
                className='w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm '
                onChange={(event) => setNewTextSize(event.target.value)}
              />
              <label htmlFor='' className='flex'>
                <span className='pt-1'>Text Color</span>
                <input
                  className='rounded px-2 py-1 bg-[#2a2438]  mb-4 ml-2'
                  type='color'
                  value={newTextColor}
                  onChange={(e) => {
                    setNewTextColor(e.target.value);
                  }}
                />
              </label>

              <button
                onClick={() => {
                  addText();
                }}
                className=' bg-[#2A2438] px-2 py-1 w-full rounded-md hover:bg-[#191521]'
              >
                Add Text
              </button>
            </div>
          </div>
        ) : (
          <div className='w-[15vw] bg-red-200'></div>
        )}
      </div>
    </div>
  );
}
