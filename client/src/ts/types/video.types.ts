export type Chunk = { timestamp: [number, number]; text: string };

export type Transcript = {
  text: string;
  chunks: Chunk[];
};
