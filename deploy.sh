#!/bin/sh
npm run clean
npm run build
aws s3 sync public/ s3://d-horiyama-study-blog/
