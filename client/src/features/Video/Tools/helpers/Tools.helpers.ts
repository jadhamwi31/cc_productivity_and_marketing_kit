import { ISource, SourceType } from '../../../../stores/videos.store';
import { v4 as uuidv4 } from 'uuid';
export const createSources = async (files: FileList): Promise<ISource[]> => {
  const sources: ISource[] = [];
  for (const file of Object.values(files)) {
    const url = URL.createObjectURL(file);
    const duration = await (async function () {
      const videoElement = document.createElement('video');
      videoElement.src = url;
      videoElement.load();
      return new Promise<number>((resolve) => {
        videoElement.onloadedmetadata = () => {
          resolve(videoElement.duration);
        };
      });
    })();
    const type = file.type.split('/')[0] as SourceType;
    sources.push({
      type,
      name: file.name,
      url,
      duration,
      id: uuidv4(),
    });
  }

  return sources;
};
