import _ from 'lodash';
import { ISource } from '../../../stores/video.store';

export const filesToSources = async (files: FileList) => {
  const sources: ISource[] = [];
  const loaderElement = document.getElementById('loader');
  if (loaderElement) {
    for (const file of Object.values(files)) {
      const source = {
        id: _.uniqueId(),
        mimeType: file.type,
        url: URL.createObjectURL(file),
      } as ISource;
      const videoElement = document.createElement('video');
      videoElement.setAttribute('style', 'display:none');
      videoElement.src = source.url;
      loaderElement.appendChild(videoElement);
      await new Promise<void>((resolve) => {
        videoElement.onloadedmetadata = (e) => {
          source.duration = videoElement.duration;
          resolve();
        };
      });
      sources.push(source);
    }
  }
  return sources;
};
