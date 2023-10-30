import Shapes from '../../components/Dashboard/GraphicEditor/Shapes';
import React, { useState, useEffect } from 'react';
import { Stage, Layer, Text, Image, Rect } from 'react-konva';


export default function GraphicEditor() {
  return (
    <div className='flex justify-between'>
      <div>
        <Shapes />
      </div>
      <div className='flex   items-center'></div>
      <div>
        <Shapes />
      </div>
    </div>
  );
}
