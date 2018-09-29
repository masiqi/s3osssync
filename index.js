const fs = require('fs')
const OSS = require('ali-oss')
const AWS = require('aws-sdk')

const s3 = new AWS.S3()
const client = new OSS({
  region: process.env.ALI_REGION,
  accessKeyId: process.env.ALI_KEYID,
  accessKeySecret: process.env.ALI_KEYSECRET,
  bucket: process.env.ALI_BUCKET,
  prefix: process.env.S3_PREFIX
})

var async = require('async')

exports.handler = function(event, context) {
  var obj = {
    bucket: event.Records[0].s3.bucket.name,
    key: decodeURIComponent(event.Records[0].s3.object.key),
    eventName: event.Records[0].eventName
  }

  if (obj.eventName.split(':')[0] === 'ObjectCreated') {
    async.waterfall(
      [
        function readS3(next) {
          console.log(obj.key)
          s3.getObject(
            {
              Bucket: obj.bucket,
              Key: obj.key
            },
            next
          )
        },
        function sync(response, next) {
          ;(async () => {
            await client.put(obj.key.replace(prefix, ''), response.Body)
          })()
        }
      ],
      function(err) {
        if (err) {
          console.error(err)
        } else {
          console.log('Success')
        }
        context.done()
      }
    )
  }

  if (obj.eventName.split(':')[0] === 'ObjectRemoved') {
    ;(async () => {
      await client.delete(obj.key.replace(prefix, ''))
    })()
  }
}
