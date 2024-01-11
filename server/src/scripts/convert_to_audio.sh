#!/bin/bash
FILEPATH=$1
ffmpeg -i $FILEPATH -vn -acodec copy $FILEPATH.aac
