import AWS from 'aws-sdk'

export const r2 = new AWS.S3({
  endpoint: new AWS.Endpoint(process.env.URL_BUCKET as string),
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  s3ForcePathStyle: true,
  signatureVersion: 'v4'
})
