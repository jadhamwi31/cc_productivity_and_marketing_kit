import React, { useMemo } from 'react';
import { useCurrentTab } from '../../../../../hooks/useCurrentTab';
import { S } from './Partitions.styled';

type Props = { wrapperWidth: number; containerHeight: number };

const Partitions = ({ wrapperWidth, containerHeight }: Props) => {
  const tab = useCurrentTab();

  return (
    <S.Container>
      {tab.partitions.map((partition) => {
        const { start, end } = partition;
        const startPos = (start / tab.duration) * wrapperWidth;
        const endPos = (partition.end / tab.duration) * wrapperWidth;
        const connectorWidth = endPos - startPos;
        return (
          <>
            <S.PartitionSection
              style={{
                height: containerHeight,
                left: startPos,
              }}
            />
            <S.Connector
              style={{
                height: containerHeight,
                left: startPos,
                width: connectorWidth,
              }}
            />
            <S.PartitionSection
              style={{
                height: containerHeight,
                left: endPos,
              }}
            />
          </>
        );
      })}
    </S.Container>
  );
};

export default Partitions;
