import React from 'react';
import { MdDelete } from 'react-icons/md';
import { useCurrentTab } from '../../../../../hooks/useCurrentTab';
import { useVideosStore } from '../../../../../stores/videos.store';
import { S } from './Partitions.styled';

type Props = { wrapperWidth: number; containerHeight: number };

const Partitions = ({ wrapperWidth, containerHeight }: Props) => {
  const tab = useCurrentTab();
  const { updateTab } = useVideosStore();

  return (
    <S.Container>
      {wrapperWidth && containerHeight && tab && tab.partitions
        ? tab.partitions.map((partition) => {
            const { start } = partition;
            const startPos = (start / tab.duration) * wrapperWidth;
            const endPos = (partition.end / tab.duration) * wrapperWidth;
            const connectorWidth = endPos - startPos;
            return (
              Boolean(startPos) &&
              Boolean(endPos) &&
              Boolean(connectorWidth) && (
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
                    {!partition.fromTranscript && (
                      <button
                        className='px-2 py-2 bg-[#2a2438] hover:bg-[#4f245f] hover:rounded-lg rounded-lg disabled:bg-transparent disabled:text-gray-600 z-30'
                        title='Delete'
                        onClick={() => {
                          updateTab({
                            partitions: [...tab.partitions].filter(
                              (partition) => partition.start !== start,
                            ),
                          });
                        }}
                        disabled={
                          tab.videoId === null || tab.selectorStart === 0 || tab.selectorEnd === 0
                        }
                      >
                        <MdDelete size='25' />
                      </button>
                    )}
                  </S.Connector>
                  <S.PartitionSection
                    style={{
                      height: containerHeight,
                      left: endPos,
                    }}
                  />
                </React.Fragment>
              )
            );
          })
        : null}
    </S.Container>
  );
};

export default Partitions;
