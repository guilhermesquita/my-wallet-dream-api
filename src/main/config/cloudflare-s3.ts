import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3'

export const r2 = new S3Client({
  endpoint: process.env.URL_BUCKET as string,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID as string,
    secretAccessKey: process.env.SECRET_ACCESS_KEY as string
  },
  forcePathStyle: true,
  region: 'auto'
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const deleteObjectCommand = (params: {
  Bucket: string
  Key: string
}) => {
  const deleteObject = new DeleteObjectCommand(params)
  return deleteObject
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const putObjectCommand = (params: {
  Bucket: string
  Key: string
  Body: Buffer
  ContentType: string
}) => {
  const command = new PutObjectCommand(params)
  return command
}
