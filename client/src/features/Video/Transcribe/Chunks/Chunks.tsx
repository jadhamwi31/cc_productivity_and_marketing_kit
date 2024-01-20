import { useCurrentTab } from '../../../../hooks/useCurrentTab';
import { useVideosStore } from '../../../../stores/videos.store';
import { Chunk } from '../../../../ts/types/video.types';
import { S } from './Chunks.styled';
import React from "react";

type Props = { chunks: Chunk[] };

const Chunks = ({ chunks }: Props) => {
  const { cutFromTo, updateTab, uncutFromTo } = useVideosStore();
  const tab = useCurrentTab();

  return (
    <S.Wrapper>
      {chunks.map((chunk) => {
        const from = chunk.timestamp[0];
        const to = chunk.timestamp[1];
        const key = [chunk.text, from, to].join(':');
        return (
          <S.Container
            $isUsed={tab.transcriptsUsed.indexOf(key) >= 0}
            onClick={() => {
              if (tab.transcriptsUsed.indexOf(key) >= 0) {
                uncutFromTo(from, to);
                updateTab({
                  ...tab,
                  transcriptsUsed: [...tab.transcriptsUsed].filter(
                    (currentKey) => currentKey !== key,
                  ),
                });
              } else {
                cutFromTo(from, to);
                updateTab({
                  ...tab,
                  transcriptsUsed: [...tab.transcriptsUsed, key],
                });
              }
            }}
            key={[chunk.text, ...chunk.timestamp].join(':')}
          >
            {chunk.text}
          </S.Container>
        );
      })}
    </S.Wrapper>
  );
};

export default Chunks;
