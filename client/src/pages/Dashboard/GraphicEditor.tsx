import { HexColorPicker } from 'react-colorful';

import { Stage, Layer, Text, Rect } from 'react-konva';
import React, { useState, useEffect, useRef } from 'react';
import { BsType } from 'react-icons/bs';
import { TbPhotoSearch } from 'react-icons/tb';
import { IoShapesOutline } from 'react-icons/io5';
import { BiColorFill } from 'react-icons/bi';
import { RiSettings4Line } from 'react-icons/ri';
import { TiTrash } from 'react-icons/ti';

import { RxCross2 } from 'react-icons/rx';

import { FaRegCircle, FaRegSquare, FaRegStar } from 'react-icons/fa';
import { FiSave, FiUpload } from 'react-icons/fi';
import CustomImage from '../../components/Dashboard/GraphicEditor/CustomImage';
import { toast } from 'react-toastify';
import CustomCircle from '../../components/Dashboard/GraphicEditor/CustomCircle';
import CustomRectangle from '../../components/Dashboard/GraphicEditor/CustomRectangle';
import {
  PiStackDuotone,
  PiStackFill,
  PiStackSimpleFill,
  PiStackSimpleDuotone,
} from 'react-icons/pi';
import CustomText from '../../components/Dashboard/GraphicEditor/CustomText';
type Shape = {
  x: any;
  y: any;
  fill: string;
  type: any;
  rotation: number;
  radius?: number;
  height?: number;
  width?: number;
  stroke?: any;
  strokeWidth?: number;
};
export default function GraphicEditor() {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(800);
  const [zoom, setZoom] = useState(100);
  const [backgroundColor, setBackgroundColor] = useState('#eeeeee');
  const [backgroundForm, setBackgroundForm] = useState(true);
  const [backgroundRec, setBackgroundRec] = useState(false);
  const [layerForm, setLayerForm] = useState(false);
  const [itemID, setItemID] = useState();

  useEffect(() => {
    if (shapeType == 'circle') {
      setNewCircle(true);
    }
    if (height >= 900) {
      setHeight((prevHeight) => prevHeight / 3);
    }
    if (width >= 900) {
      setWidth((prevWidth) => prevWidth / 3);
    }
  }, [height, width, backgroundRec]);

  const RemoveAllforms = () => {
    setNewShapeForm(false);
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

  const [items, setItems] = useState<any>([]);

  //Images
  const [imageURLs, setImageURLs] = useState<any>([]);
  const [onlineImages, setOnlineImages] = useState<any>([]);
  const [imageForm, setImageForm] = useState(false);
  const [selectedId, setSelectID] = useState<any>(null);
  const [search, setSearch] = useState<any>('');

  useEffect(() => {
    const searchImages = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos/?query=${search}&client_id=HMFeaCvvd8FxdLbiTD925AUjDkhhXFAaHNUX7iI0K2U&page=1&per_page=150`,
        );
        const data = await response.json();

        console.log(data);
        const images = data.results || [];

        setOnlineImages(images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    searchImages();
  }, [search]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageForm(false);
    const files = e.target.files;
    if (files) {
      const imageArray = Array.from(files).map((file, index) => {
        const reader = new FileReader();
        const image = new window.Image();

        reader.onload = (e) => {
          const imageURL = e.target?.result as string;

          image.onload = () => {
            setItems((prevItems: any) => [
              ...prevItems,
              {
                id: prevItems.length,
                image,
                x: 0,
                y: 0,
                width: image.width / 2,
                height: image.height / 2,
                type: 'image',
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
  const AddOnlineImage = (url: string): void => {
    setImageForm(false);
    const image = new Image();
    image.src = url;

    image.onload = () => {
      setItems((prevItems: any) => [
        ...prevItems,
        {
          id: prevItems.length,
          image: image,
          x: 0,
          y: 0,
          type: 'image',
        },
      ]);
    };

    image.onerror = (error) => {
      console.error('Error loading image:', error);
    };
  };

  //Text
  const [newText, setNewText] = useState('');
  const [newTextColor, setNewTextColor] = useState('');
  const [newTextSize, setNewTextSize] = useState(20);
  const [newTextFont, setNewTextFont] = useState('');
  const [textForm, setTextForm] = useState(false);

  const [updateTextForm, setUpateTextForm] = useState(false);
  const [updatedText, setUpdatedText] = useState('');
  const [updatedTextFont, setUpdatedTextFont] = useState('');
  const [updatedTextColor, setUpdatedTextColor] = useState('');
  const [updatedTextSize, setUpdatedTextSize] = useState(20);
  const [textToBeUpdated, setTextToBeUpdated] = useState<any>();

  const addText = () => {
    if (newText === '') {
      toast.error('Empty text not allowed');
    } else {
      if (newTextFont === '') {
        toast.error('Please Choose Font');
      } else {
        const text = {
          text: newText,
          x: 100,
          y: 100,
          align: 'center',
          fill: newTextColor,
          fontSize: newTextSize,
          fontFamily: newTextFont,

          type: 'text',
        };
        setUpateTextForm(false);
        setNewText('');
        setNewTextColor('#000000');
        setNewTextSize(20);
        setItems([text, ...items]);
        console.log(items);
      }
    }
  };

  //Shapes
  const [shapeType, setShapeType] = useState('circle');
  const [newShapeForm, setNewShapeForm] = useState(false);
  const [newCircle, setNewCircle] = useState(false);
  const [newStar, setNewStar] = useState(false);
  const [newRectangle, setNewRectangle] = useState(false);
  const [shapeSelect, setShapeSelect] = useState<number>();

  const [shapeWidth, setShapeWidth] = useState(1);
  const [shapeHeight, setShapeHeight] = useState(1);
  const [shapeRaduis, setShapeRaduis] = useState(1);
  const [shapeColor, setShapeColor] = useState('#000000');
  const [stroke, setStroke] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(1);

  const addShape = () => {
    const shape: Shape = {
      radius: Number(shapeRaduis),
      x: 100,
      y: 100,
      fill: shapeColor,
      type: shapeType,
      rotation: 0,
    };

    if (shapeType == 'rectangle') {
      shape.width = shapeWidth;
      shape.height = shapeHeight;
    }
    if (stroke) {
      shape.stroke = strokeColor;
      shape.strokeWidth = strokeWidth;
    }

    setItems([...items, shape]);
    setNewShapeForm(false);
    setStrokeWidth(0);
    setStrokeColor('#000000');
    setShapeRaduis(1);
    setStroke(false);
    setShapeHeight(1);
    setShapeWidth(1);
    setShapeType('circle');
    setNewRectangle(false);
    setNewStar(false);
    setNewCircle(true);
  };

  const deleteItem = (): void => {
    if (selectedId !== null) {
      setItems((prevItems: any) =>
        prevItems.filter((item: any, index: number) => index !== selectedId),
      );
      setSelectID(null);
    }
  };

  //Deselcet Funtion
  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      RemoveAllforms();
      setSelectID(null);
    }
  };
  function sendToBack(index: number) {
    console.log(items);

    setSelectID(null);

    const updatedItems = [...items];
    const [removedItem] = updatedItems.splice(index, 1);
    updatedItems.unshift(removedItem);

    setItems(updatedItems);
    setSelectID(null);
    console.log(items);
  }
  function sendBackward(index: number) {
    console.log(items);

    setSelectID(null);

    const updatedArray = [...items];
    const [removedItem] = updatedArray.splice(index, 1);
    updatedArray.splice(index - 1, 0, removedItem);

    setItems(updatedArray);
    setSelectID(null);
    console.log(updatedArray);
  }
  function bringToFront(index: number) {
    console.log(items);

    setSelectID(null);

    const updatedArray = [...items];
    const [removedItem] = updatedArray.splice(index, 1);
    updatedArray.splice(index + 1, 0, removedItem);

    setItems(updatedArray);
    setSelectID(null);
    console.log(updatedArray);
  }
  function bringForward(index: number) {
    setSelectID(null);

    const updatedArray = [...items];
    const [removedItem] = updatedArray.splice(index, 1);
    updatedArray.splice(index + 1, 0, removedItem); // Insert the removed item at the next index

    setItems(updatedArray);
    setSelectID(null);
    console.log(updatedArray);
  }

  return (
    <div className='flex justify-between pt-10'>
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

          <button
            className='px-2 py-1  hover:bg-[#4f245f] '
            onClick={() => {
              setImageForm(true);
            }}
          >
            <TbPhotoSearch size='25' />
          </button>

          <button
            className='px-2 py-1 hover:bg-[#4f245f] hover:rounded-b-lg '
            onClick={() => {
              RemoveAllforms();
              setNewShapeForm(true);
            }}
          >
            <IoShapesOutline size='25' />
          </button>
        </div>

        {imageForm && (
          <div className='bg-[#15121C] rounded-lg w-[300px] absolute h-[80vh] left-36 overflow-hidden '>
            <div className='flex-col p-2 '>
              <label
                onClick={() => {
                  setImageForm(false);
                }}
              >
                <RxCross2
                  size='25'
                  className='text-gray-500 ml-auto hover:text-white cursor-pointer'
                />
              </label>
              <label
                htmlFor='img'
                className='flex pl-2 text-gray-500 hover:text-white cursor-pointer hover:underline'
              >
                <FiUpload size='22' className='mr-2' /> Upload Image
              </label>
              <input
                id='img'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleImageChange}
              />
              <div className='mt-4'>
                <input
                  type='text'
                  className='rounded px-2 py-1 bg-[#2a2438] text-gray-500 mb-4 w-full ring-0 outline-none'
                  placeholder='Search for Image'
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <div
                  className='overflow-y-scroll relative'
                  style={{ maxHeight: 'calc(80vh - 40px)' }}
                >
                  <div className='grid grid-cols-2  gap-1'>
                    {onlineImages &&
                      onlineImages.map((img: any, index: number) => (
                        <div className='img__wrap' key={index}>
                          <img
                            key={index}
                            src={img.urls.small}
                            className=' img__img w-full h-60 object-cover hover:bg-black/20  cursor-pointer '
                            alt={`Image ${index}`}
                          />
                          <p
                            className='img__description'
                            onClick={() => {
                              AddOnlineImage(img.urls.small);
                            }}
                          >
                            Add
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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

              {items.map((item: any, index: any) => {
                switch (item.type) {
                  case 'image':
                    return (
                      <CustomImage
                        key={index}
                        shapeProps={item}
                        isSelected={index === selectedId}
                        onSelect={() => {
                          RemoveAllforms();
                          setSelectID(index);

                          console.log(index);
                          setItemID(index);
                        }}
                        onChange={(newAttrs) => {
                          const item = items.slice();
                          item[index] = newAttrs;
                          setItems(item);
                        }}
                      />
                    );
                  case 'circle':
                    return (
                      <CustomCircle
                        key={index}
                        shapeProps={item}
                        isSelected={index === selectedId}
                        onSelect={() => {
                          RemoveAllforms();
                          setSelectID(index);
                          setItemID(index);
                        }}
                        onChange={(newAttrs) => {
                          const item = items.slice();
                          item[index] = newAttrs;
                          setItems(item);
                        }}
                      />
                    );
                  case 'rectangle':
                    return (
                      <CustomRectangle
                        key={index}
                        shapeProps={item}
                        isSelected={index === selectedId}
                        onSelect={() => {
                          RemoveAllforms();
                          setSelectID(index);
                          setItemID(index);
                          console.log(index);
                        }}
                        onChange={(newAttrs) => {
                          const item = items.slice();
                          item[index] = newAttrs;
                          setItems(item);
                        }}
                      />
                    );
                  case 'text':
                    return (
                      <CustomText
                        key={index}
                        shapeProps={item}
                        isSelected={index === selectedId}
                        onSelect={() => {
                          RemoveAllforms();
                          setUpateTextForm(true);
                          setSelectID(index);
                        }}
                        onChange={(newAttrs) => {
                          const item = items.slice();
                          item[index] = newAttrs;
                          setItems(item);
                        }}
                      />
                    );
                  default:
                    return null;
                }
              })}
            </Layer>
          </Stage>
        </div>
        <div className=' absolute top-0 flex'>
          {selectedId != null ? (
            <>
              <div className='   mr-5 flex justify-around rounded-lg mt-5'>
                <button
                  className='px-2 py-1  bg-[#2a2438]    hover:bg-[#4f245f] rounded-lg hover:rounded-lg '
                  onClick={() => {
                    deleteItem();
                  }}
                >
                  <TiTrash size='25' />
                </button>
              </div>
              <div className='flex justify-around rounded-lg mt-5'>
                <button
                  className='px-2 py-1  disabled:bg-[#2a2438] disabled:text-gray-400 bg-[#4f245f] rounded-l-lg hover:rounded-l-lg '
                  onClick={() => {
                    sendToBack(selectedId);
                  }}
                  disabled={selectedId == null || selectedId == 0 ? true : false}
                >
                  <PiStackDuotone size='25' />
                </button>
                <button
                  className='px-2 py-1  disabled:bg-[#2a2438] disabled:text-gray-400 bg-[#4f245f]  '
                  onClick={() => {
                    sendBackward(selectedId);
                  }}
                  disabled={selectedId == null || selectedId == 0 ? true : false}
                >
                  <PiStackSimpleDuotone size='25' />
                </button>
                <button
                  className='px-2 py-1  disabled:bg-[#2a2438] disabled:text-gray-400   bg-[#4f245f]  '
                  onClick={() => {
                    bringForward(selectedId);
                  }}
                  disabled={selectedId == null || selectedId == items.length - 1 ? true : false}
                >
                  <PiStackSimpleFill size='25' />
                </button>
                <button
                  className='px-2 py-1  disabled:bg-[#2a2438]  disabled:text-gray-400  bg-[#4f245f] rounded-r-lg hover:rounded-r-lg '
                  onClick={() => {
                    bringToFront(selectedId);
                  }}
                  disabled={selectedId == null || selectedId == items.length - 1 ? true : false}
                >
                  <PiStackFill size='25' />
                </button>
              </div>
            </>
          ) : (
            ''
          )}{' '}
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
                <option value='' style={{ fontFamily: 'Arial' }}>
                  Choose Font Please
                </option>
                <option value='Arial' style={{ fontFamily: 'Arial' }}>
                  Arial
                </option>
                <option value='Brush Script MT' style={{ fontFamily: 'Brush Script MT' }}>
                  Brush Script MT
                </option>
                <option value='Helvetica' style={{ fontFamily: 'Helvetica' }}>
                  Helvetica
                </option>
                <option value='Georgia' style={{ fontFamily: 'Georgia' }}>
                  Georgia
                </option>
                <option value='Times New Roman' style={{ fontFamily: 'Times New Roman' }}>
                  Times New Roman
                </option>
                <option value='Courier New' style={{ fontFamily: 'Courier New' }}>
                  Courier New
                </option>
                <option value='Verdana' style={{ fontFamily: 'Verdana' }}>
                  Verdana
                </option>
                <option value='Impact' style={{ fontFamily: 'Impact' }}>
                  Impact
                </option>
                <option value='Comic Sans MS' style={{ fontFamily: 'Comic Sans MS' }}>
                  Comic Sans MS
                </option>
                <option value='Trebuchet MS' style={{ fontFamily: 'Trebuchet MS' }}>
                  Trebuchet MS
                </option>
                <option value='Arial Black' style={{ fontFamily: 'Arial Black' }}>
                  Arial Black
                </option>
                <option value='Palatino Linotype' style={{ fontFamily: 'Palatino Linotype' }}>
                  Palatino Linotype
                </option>
                <option value='Lucida Sans Unicode' style={{ fontFamily: 'Lucida Sans Unicode' }}>
                  Lucida Sans Unicode
                </option>
                <option value='Tahoma' style={{ fontFamily: 'Tahoma' }}>
                  Tahoma
                </option>
                <option value='Courier' style={{ fontFamily: 'Courier' }}>
                  Courier
                </option>
                <option value='Lucida Console' style={{ fontFamily: 'Lucida Console' }}>
                  Lucida Console
                </option>
              </select>
              <label htmlFor='' className='flex'>
                Text Size {newTextSize}
              </label>

              <input
                type='text'
                value={newTextSize}
                onChange={(e) => {
                  const regex = /^\d+(\.\d{0,2})?$/;

                  if (regex.test(e.target.value) || e.target.value === '') {
                    setNewTextSize(Number(e.target.value));
                  }
                }}
                className='rounded px-2 py-1 bg-[#2a2438]  mb-4'
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
        {newShapeForm ? (
          <div className='rounded-lg bg-[#15121c] border-[1px] border-New_Gray p-4 text-black w-[15vw] mt-5'>
            <div className='flex flex-col justify-center text-gray-500'>
              <span className=' flex '>
                <IoShapesOutline size={20} className='mr-2' /> Add Shape
              </span>
              <hr className='h-px mb-2 bg-gray-500 border-0 ' />
              <label htmlFor='' className='flex'>
                Select Shape Type
              </label>
              <div className='bg-[#2a2438]   rounded-md mb-2 p-1  flex'>
                <div
                  className={`${
                    newCircle ? 'bg-[#15121C]' : 'bg-[#2a2438]'
                  } rounded-md   cursor-pointer  flex items-center justify-center p-1 `}
                  onClick={() => {
                    setShapeType('circle');
                    setNewCircle(true);
                    setNewRectangle(false);
                    setNewStar(false);
                  }}
                >
                  <FaRegCircle size='25' />
                </div>
                <div
                  className={`${
                    newRectangle ? 'bg-[#15121C]' : 'bg-[#2a2438]'
                  } rounded-md   cursor-pointer  flex items-center justify-center p-1 `}
                  onClick={() => {
                    setShapeType('rectangle');
                    setNewCircle(false);
                    setNewStar(false);
                    setNewRectangle(true);
                  }}
                >
                  <FaRegSquare size='30' />
                </div>
                <div
                  className={`${
                    newStar ? 'bg-[#15121C]' : 'bg-[#2a2438]'
                  } rounded-md   cursor-pointer   items-center justify-center p-1 hidden`}
                  onClick={() => {
                    setShapeType('star');
                    setNewCircle(false);
                    setNewStar(true);
                    setNewRectangle(false);
                  }}
                >
                  <FaRegStar size='30' />
                </div>
              </div>
              <label htmlFor='' className='flex'>
                <span className='pt-1'>Shape Color</span>
                <input
                  className='rounded px-2 py-1 bg-[#2a2438]  mb-4 ml-2'
                  type='color'
                  value={shapeColor}
                  onChange={(e) => {
                    setShapeColor(e.target.value);
                  }}
                />
              </label>
              {shapeType == 'circle' ? (
                <>
                  <label htmlFor='' className='flex'>
                    Raduis [{shapeRaduis}]
                  </label>

                  <input
                    value={shapeRaduis}
                    type='range'
                    min='1'
                    max='150'
                    className='w-full h-1 mb-6 bg-gray-500 rounded-lg appearance-none cursor-pointer range-sm '
                    onChange={(event) => setShapeRaduis(Number(event.target.value))}
                  />
                </>
              ) : shapeType == 'rectangle' ? (
                <>
                  <label htmlFor=''>Width</label>
                  <input
                    type='text'
                    value={shapeWidth}
                    onChange={(e) => {
                      const regex = /^\d+(\.\d{0,2})?$/;

                      if (regex.test(e.target.value) || e.target.value === '') {
                        setShapeWidth(Number(e.target.value));
                      }
                    }}
                    className='rounded px-2 py-1 bg-[#2a2438]  mb-4'
                  />
                  <label htmlFor=''>Height</label>
                  <input
                    type='text'
                    value={shapeHeight}
                    onChange={(e) => {
                      const regex = /^\d+(\.\d{0,2})?$/;

                      if (regex.test(e.target.value) || e.target.value === '') {
                        setShapeHeight(Number(e.target.value));
                      }
                    }}
                    className='rounded px-2 py-1 bg-[#2a2438]  mb-4'
                  />
                </>
              ) : (
                <></>
              )}

              <label htmlFor='' className='flex mb-2'>
                <input
                  id='default-checkbox'
                  type='checkbox'
                  checked={stroke}
                  onChange={(e) => setStroke(!stroke)}
                  className='w-4 mt-[10px] h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2 '
                />
                <span className={`ml-2 mt-[6px] ${stroke ? 'no-underline' : 'line-through'}`}>
                  Stroke
                </span>
              </label>
              {stroke && (
                <>
                  <label htmlFor='' className='flex'>
                    Stroke Width [{strokeWidth}]
                  </label>

                  <input
                    value={strokeWidth}
                    type='range'
                    min='1'
                    max='30'
                    className='w-full h-1 mb-6 bg-gray-500 rounded-lg appearance-none cursor-pointer range-sm '
                    onChange={(event) => setStrokeWidth(Number(event.target.value))}
                  />
                  <label htmlFor='' className='flex'>
                    <span className='pt-1'>Stroke Color</span>
                    <input
                      className='rounded px-2 py-1 bg-[#2a2438]  mb-4 ml-2'
                      type='color'
                      value={strokeColor}
                      onChange={(e) => {
                        setStrokeColor(e.target.value);
                      }}
                    />
                  </label>
                </>
              )}

              <button
                onClick={() => {
                  addShape();
                }}
                className=' bg-[#2A2438] px-2 py-1 w-full rounded-md hover:bg-[#191521]'
              >
                Add Shape
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
