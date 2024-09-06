import multer from 'multer'
import path from 'path'

const dest = path.resolve(__dirname, '..', '..', 'temp', 'uploads')
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fileFilter = (_req, file: Express.Multer.File, callback) => {
  const allowedMimes = ['image/jpeg', 'image/Pjpeg', 'image/png', 'image/gif']
  if (allowedMimes.includes(file.mimetype)) {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

export const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, dest)
  },
  filename: (_req, file, callback) => {
    const time = new Date().getTime
    callback(null, `${time}_${file.originalname}`)
  }
})

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  dest,
  fileFilter
})
