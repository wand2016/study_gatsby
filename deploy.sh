#!/bin/bash

set -eu

export LANG=C.UTF-8
export LC_CTYPE=C.UTF-8
export PYTHONIOENCODING=utf-8

locale

# 手元のpublic/のMD5一覧を用意
echo 'prepare md5 list for public/'
find public/ -type f -print0 | xargs -0 md5sum | awk 'BEGIN {FS="  ";OFS=","} {print $2, $1}' | sort -k 1,1 -t ',' > md5list_new

# s3にMD5一覧を取りにいく。なければ空
echo 'fetch or touch md5 list for remote/'
aws s3 cp s3://d-horiyama-study-blog/md5list ./md5list || touch ./md5list

# S3上のもののMD5一覧とFULL OUTER JOIN
# MD5相違のものを探す
echo 'full outer join'
join -t ',' -a 1 -a 2 -j 1 md5list_new md5list | grep -v -E '[^,]+,([^,]*),\1' | cut -f 1 -d ',' > paths_to_sync

paths_to_sync_count=$(cat paths_to_sync | wc -l)

# 差分なし
if [ $paths_to_sync_count -eq 0 ]; then
    echo 'noop'
# 100個を超えていたら問答無用でsync
# s3側のMD5一覧が空の場合もこっち
elif [ $paths_to_sync_count -gt 100 ]; then
    echo 'Too many files to sync. sync all.'
    aws s3 sync public/ s3://d-horiyama-study-blog/ --exact-timestamps --delete
# それ以下なら --include 指定
else
    includes=' '
    while read line
    do
        includes="$includes --include='$line'"
    done < paths_to_sync
    echo 'sync filtering with:'
    echo $includes

    aws s3 sync public/ s3://d-horiyama-study-blog/ --exact-timestamps --delete --exclude='*' $includes
fi

# MD5ハッシュリストもアップロードして終了
echo 'upload md5list'
aws s3 cp ./md5list_new s3://d-horiyama-study-blog/md5list

echo 'done'
