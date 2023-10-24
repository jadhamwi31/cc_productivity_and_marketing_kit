export const formatTimestamp = (timestamp: string) => {
  const [minutes, seconds] = timestamp.split(':');
  if (minutes !== '00') {
    return `${Number(minutes)}m`;
  } else {
    return `${Number(seconds)}s`;
  }
};

export const durationToTimestamp = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
