import { HexColorPicker } from 'react-colorful';

import { Stage, Layer, Text, Image, Rect } from 'react-konva';
import React, { useState, useEffect, useRef } from 'react';
import { BsType } from 'react-icons/bs';
import { TbPhotoSearch } from 'react-icons/tb';
import { IoShapesOutline } from 'react-icons/io5';
import { BiColorFill } from 'react-icons/bi';
import { RiSettings4Line, RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineZoomIn, AiOutlineZoomOut, AiOutlinePlus } from 'react-icons/ai';
import { FaRegCircle, FaRegSquare, FaRegStar } from 'react-icons/fa';
import { FiSave } from 'react-icons/fi';
import CustomImage from '../../components/Dashboard/GraphicEditor/CustomImage';
import { toast } from 'react-toastify';
import CustomCircle from '../../components/Dashboard/GraphicEditor/CustomCircle';
import CustomRectangle from '../../components/Dashboard/GraphicEditor/CustomRectangle';
import { update } from 'lodash';
type Shape = {
  x: any;
  y: any;
  fill: string;
  type: any;
  radius?: number;
  height?: number;
  width?: number;
  stroke?: any;
  strokeWidth?: number;
};
export default function GraphicEditor() {
  //Background
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(800);
  const [zoom, setZoom] = useState(100);
  const [backgroundColor, setBackgroundColor] = useState('#eeeeee');
  const [backgroundForm, setBackgroundForm] = useState(true);
  const [backgroundRec, setBackgroundRec] = useState(false);
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

  //General
  const RemoveAllforms = () => {
    setNewShapeForm(false);
    setImageForm(false);
    setTextForm(false);
    setUpateTextForm(false);
    setUpdateShapeForm(false);
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
      setImageForm(false);
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

  const [updateShapeWidth, setUpdateShapeWidth] = useState(1);
  const [updateShapeHeight, setUpdateShapeHeight] = useState(1);
  const [updateShapeRaduis, setUpdateShapeRaduis] = useState(1);
  const [updateShapeColor, setUpdateShapeColor] = useState('#000000');

  const [updateShapeType, setUpdateShapeType] = useState('');
  const [shapeToBeUpdated, setShapeToBeUpdated] = useState('');

  const [updateShapeForm, setUpdateShapeForm] = useState(false);
  const [shapes, setShapes] = useState<any>([]);
  const [selectedShapeId, setSelectedShapeId] = useState<any>(null);

  const addShape = () => {
    const shape: Shape = {
      radius: Number(shapeRaduis),
      x: 100,
      y: 100,
      fill: shapeColor,
      type: shapeType,
    };

    if (shapeType == 'rectangle') {
      shape.width = shapeWidth;
      shape.height = shapeHeight;
    }
    if (stroke) {
      shape.stroke = strokeColor;
      shape.strokeWidth = strokeWidth;
    }

    setShapes([...shapes, shape]);
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

  const handleShapeSelect = (index: any) => {
    setShapeToBeUpdated(index);
    console.log(shapeToBeUpdated);
    setUpdateShapeForm(true);
    const updatedShapes = shapes.map((shape: any, i: any) => ({
      ...shape,
      isSelected: i === textToBeUpdated,
    }));

    setUpdateShapeType(updatedShapes[index].type);
    setUpdateShapeColor(updatedShapes[index].fill);
    setUpdateShapeRaduis(updatedShapes[index].radius);
    setUpdateShapeWidth(updatedShapes[index].width);
    setUpdateShapeHeight(updatedShapes[index].height);

    setShapeSelect(index);
  };

  const updateShape = () => {
    const updatedShapes = shapes.map((shape: any, i: any) => ({
      ...shape,
      isSelected: i === shapeToBeUpdated,
    }));

    if (updateShapeType == 'circle') {
      updatedShapes[shapeToBeUpdated].fill = updateShapeColor;
      updatedShapes[shapeToBeUpdated].radius = updateShapeRaduis;
    } else if (updateShapeType == 'rectangle') {
      updatedShapes[shapeToBeUpdated].width = updateShapeWidth;
      updatedShapes[shapeToBeUpdated].height = updateShapeHeight;
      updatedShapes[shapeToBeUpdated].fill = updateShapeColor;
    }

    setShapes(updatedShapes);
    setUpdateShapeForm(false);
  };
  const deleteShape = (): void => {
    setShapes((prevShapes: any) =>
      prevShapes.filter((shape: any) => shape.id !== shapeToBeUpdated),
    );
  };

  //Deselcet Funtion
  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
      setSelectedShapeId(null);
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

              {shapes.map((shape: any, i: any) => {
                switch (shape.type) {
                  case 'circle':
                    return (
                      <CustomCircle
                        key={i}
                        shapeProps={shape}
                        isSelected={i === selectedShapeId}
                        onSelect={() => {
                          RemoveAllforms();
                          setSelectedShapeId(i);
                          setShapeToBeUpdated(i);
                          handleShapeSelect(i);
                        }}
                        onChange={(newAttrs) => {
                          const updatedShapes = shapes.map((shape1: any) =>
                            shape1.id === i ? { ...shape1, ...newAttrs } : shape1,
                          );
                          setShapes(updatedShapes);
                        }}
                      />
                    );
                  case 'rectangle':
                    return (
                      <CustomRectangle
                        key={i}
                        shapeProps={shape}
                        isSelected={i === selectedId}
                        onSelect={() => {
                          selectShape(i);
                          RemoveAllforms();
                          setSelectedShapeId(shape.id);
                          setShapeToBeUpdated(i);
                          handleShapeSelect(i);
                        }}
                        onChange={(newAttrs) => {
                          const rects = shapes.slice();
                          rects[i] = newAttrs;
                          setShapes(rects);
                        }}
                      />
                    );
                  default:
                    return null;
                }
              })}

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
                className=' text-sm mb-2 text-red-500 px-4 w-full rounded-md hover:underline'
              >
                Delete
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
                className='w-full h-1 mb-6 bg-gray-500 rounded-lg appearance-none cursor-pointer range-sm '
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
                className='w-full h-1 mb-6 bg-gray-500 rounded-lg appearance-none cursor-pointer range-sm '
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
                  } rounded-md   cursor-pointer  flex items-center justify-center p-1 `}
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
        {updateShapeForm ? (
          <div className='rounded-lg bg-[#15121c] border-[1px] border-New_Gray p-4 text-black w-[15vw] mt-5'>
            <div className='flex flex-col justify-center text-gray-500'>
              {updateShapeType == 'circle' ? (
                <>
                  <span className=' flex '>Circle</span>
                  <hr className='h-px mb-2 bg-gray-500 border-0 ' />
                  <label htmlFor='' className='flex'>
                    <span className='pt-1'>Shape Color</span>
                    <input
                      className='rounded px-2 py-1 bg-[#2a2438]  mb-4 ml-2'
                      type='color'
                      value={updateShapeColor}
                      onChange={(e) => {
                        setUpdateShapeColor(e.target.value);
                      }}
                    />
                  </label>
                  <label htmlFor='' className='flex'>
                    Raduis [{updateShapeRaduis}]
                  </label>

                  <input
                    value={updateShapeRaduis}
                    type='range'
                    min='1'
                    max='150'
                    className='w-full h-1 mb-6 bg-gray-500 rounded-lg appearance-none cursor-pointer range-sm '
                    onChange={(event) => setUpdateShapeRaduis(Number(event.target.value))}
                  />
                </>
              ) : updateShapeType == 'rectangle' ? (
                <>
                  <span className=' flex '>Rectangle</span>
                  <hr className='h-px mb-2 bg-gray-500 border-0 ' />
                  <label htmlFor='' className='flex'>
                    <span className='pt-1'>Shape Color</span>
                    <input
                      className='rounded px-2 py-1 bg-[#2a2438]  mb-4 ml-2'
                      type='color'
                      value={updateShapeColor}
                      onChange={(e) => {
                        setUpdateShapeColor(e.target.value);
                      }}
                    />
                  </label>
                  <label htmlFor=''>Width</label>
                  <input
                    type='text'
                    value={updateShapeWidth}
                    onChange={(e) => {
                      const regex = /^\d+(\.\d{0,2})?$/;

                      if (regex.test(e.target.value) || e.target.value === '') {
                        setUpdateShapeWidth(Number(e.target.value));
                      }
                    }}
                    className='rounded px-2 py-1 bg-[#2a2438]  mb-4'
                  />
                  <label htmlFor=''>Height</label>
                  <input
                    type='text'
                    value={updateShapeHeight}
                    onChange={(e) => {
                      const regex = /^\d+(\.\d{0,2})?$/;

                      if (regex.test(e.target.value) || e.target.value === '') {
                        setUpdateShapeHeight(Number(e.target.value));
                      }
                    }}
                    className='rounded px-2 py-1 bg-[#2a2438]  mb-4'
                  />
                </>
              ) : (
                <></>
              )}
              <button
                onClick={() => {
                  deleteShape();
                }}
                className=' text-sm mb-2 text-red-500 px-4 w-full rounded-md hover:underline'
              >
                Delete
              </button>
              <button
                onClick={() => {
                  updateShape();
                }}
                className=' bg-[#2A2438] px-2 py-1 w-full rounded-md hover:bg-[#191521]'
              >
                Update Shape
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
