#!/bin/bash

STORAGE_PATH=$1
VIDEO_ID=$2
NEW_VIDEO_ID=$3
PARTITIONS=("${@:4}")

cd "$STORAGE_PATH"

PART=1
for ((y = 0; y < ${#PARTITIONS[@]} - 1; y += 2)); do
    START="${PARTITIONS[$y]}"
    END="${PARTITIONS[$((y + 1))]}"
    OUTPUT="$VIDEO_ID.part$PART.mp4"
    echo $START
    echo $END
    ffmpeg -i "$VIDEO_ID" -ss "$START" -to "$END" -c:v libx264 -c:a aac "$OUTPUT"
    echo "file $OUTPUT" >>input.txt
    PART=$((PART + 1))
done

ffmpeg -f concat -i input.txt -c:v libx264 -c:a aac "$NEW_VIDEO_ID.mp4"

# Cleanup
rm -rf $VIDEO_ID.part*
rm input.txt
