import React, { useEffect, useRef } from 'react';
import { Circle, Transformer } from 'react-konva';

interface CusProps {
  shapeProps: any;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newProps: any) => void;
}

const CustomCircle: React.FC<CusProps> = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected) {
      if (trRef.current) {
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [isSelected]);

  return (
    <>
      <Circle
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          if (shapeRef.current) {
            const node = shapeRef.current;

            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              // set minimal value
              raduis: Math.max(5, node.width()),
            });
          }
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default CustomCircle;
