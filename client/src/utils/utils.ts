export const formatTimestamp = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
export const timestampToDuration = (timestamp: string) => {
  const [minutes, seconds] = timestamp.split(':').map((num) => Number(num));
  return minutes * 60 + seconds;
};

export const cleanupCall = () => {
  return fetch('/videos', { method: 'DELETE', keepalive: true });
};
