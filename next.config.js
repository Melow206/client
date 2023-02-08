module.exports = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    NEXT_PUBLIC_MINIO_MEDIA_HOST: process.env.NEXT_PUBLIC_MINIO_MEDIA_HOST || 'http://localhost:9000/ecommerce/'
  },
}