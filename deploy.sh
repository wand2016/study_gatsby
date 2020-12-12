#!/bin/sh

set -eu

npm run build
aws s3 sync public/ s3://d-horiyama-study-blog/ --exact-timestamps --delete
