const awsS3Sync = require("@akud/aws-s3-sync-by-hash")

;(async () => {
  const label = "s3 sync by hash"
  console.log(label)
  console.time(label)
  try {
    await awsS3Sync({
      bucket: "d-horiyama-study-blog",
      root: "public",
      delete: true,
    })
  } finally {
    console.timeEnd(label)
  }
})()
