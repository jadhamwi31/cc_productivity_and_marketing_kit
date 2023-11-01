#!/bin/bash

STORAGE_PATH=$1
VIDEO_ID=$2
CUT_START=$3
CUT_END=$4
NEW_VIDEO_ID=$5

cd $STORAGE_PATH
echo $PATH
ffmpeg -i $VIDEO_ID.mp4 -ss 0 -to $CUT_START "$VIDEO_ID.part1.mp4"
ffmpeg -i $VIDEO_ID.mp4 -ss $CUT_END "$VIDEO_ID.part2.mp4"
echo "file $VIDEO_ID.part1.mp4" >>input.txt
echo "file $VIDEO_ID.part2.mp4" >>input.txt
ffmpeg -f concat -i input.txt -c copy "$NEW_VIDEO_ID.mp4"
rm -rf *.part*.mp4
rm *.txt
