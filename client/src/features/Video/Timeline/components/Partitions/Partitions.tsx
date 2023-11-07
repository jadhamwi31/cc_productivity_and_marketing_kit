import React, { useMemo } from 'react';
import { useCurrentTab } from '../../../../../hooks/useCurrentTab';
import { S } from './Partitions.styled';
import { useVideosStore } from '../../../../../stores/videos.store';

type Props = { wrapperWidth: number; containerHeight: number };

const Partitions = ({ wrapperWidth, containerHeight }: Props) => {
  const tab = useCurrentTab();
  const { updateTab } = useVideosStore();
  return (
    <S.Container>
      {tab.partitions.map((partition) => {
        const { start } = partition;
        const startPos = (start / tab.duration) * wrapperWidth;
        const endPos = (partition.end / tab.duration) * wrapperWidth;
        const connectorWidth = endPos - startPos;
        return (
          <React.Fragment key={start}>
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
            >
              <div
                onClick={() => {
                  updateTab({
                    partitions: [...tab.partitions].filter(
                      (partition) => partition.start !== start,
                    ),
                  });
                }}
              >
                Remove
              </div>
            </S.Connector>
            <S.PartitionSection
              style={{
                height: containerHeight,
                left: endPos,
              }}
            />
          </React.Fragment>
        );
      })}
    </S.Container>
  );
};

export default Partitions;
