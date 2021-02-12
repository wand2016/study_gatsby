#!/bin/bash

set -eu

# 手元のpublic/のMD5一覧を用意
find public/ -type f -print0 | xargs -0 md5sum | awk '{ print $2,$1 }' | sort > md5list_new

# s3にMD5一覧を取りにいく。なければ空
aws s3 cp s3://d-horiyama-study-blog/md5list ./md5list || touch ./md5list

# S3上のもののMD5一覧とFULL OUTER JOIN
# MD5相違のものを探す
join  -t ' ' -a 1 -a 2 -j 1 md5list_new md5list | grep -v -E '\S+ (\S*) \1' | cut -f 1 -d ' ' | head -n 10 > paths_to_sync

# 100個を超えていたら問答無用でsync
# s3側が空の場合もこっち
if [ $(cat paths_to_sync | wc -l) -gt 100 ]; then
    aws s3 sync public/ s3://d-horiyama-study-blog/ --exact-timestamps --delete
# それ以下なら --include 指定
else
    includes=' '
    while read line
    do
        includes="$includes --include=$line"
    done < paths_to_sync

    aws s3 sync public/ s3://d-horiyama-study-blog/ --exact-timestamps --delete $includes
fi

# MD5ハッシュリストもアップロードして終了
aws s3 cp ./md5list_new s3://d-horiyama-study-blog/md5list
