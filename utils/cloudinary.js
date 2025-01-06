import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
})

export const uploadImage = async (file) => {
  const buffer = await file.arrayBuffer()
  const bytes = Buffer.from(buffer)
  
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: 'whatto'
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    ).end(bytes)
  })
}