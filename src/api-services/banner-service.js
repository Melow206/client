import axiosInstance from "./axios-instance"
const transformMediaUrl = (data) => {
  data.image = process.env.NEXT_PUBLIC_MINIO_MEDIA_HOST + data.image
  return data
}

export const bannerService = {
  
  getHomeBanner1: async () => {
    const data = await axiosInstance.get(`/banner/homeBanner1`);
    return transformMediaUrl(data.data);
  },

  getHomeBanner2: async () => {
    const data = await axiosInstance.get(`/banner/homeBanner2`);
    return transformMediaUrl(data.data);
  },

  getBannerSlide: async () => {
    console.log('fetch banner data')
    const data = await axiosInstance.get(`/banner/homeSlide`);
      return data.data.map(d => transformMediaUrl(d));
  },

  getBannerProductSidebar: async () => {
    const data = await axiosInstance.get(`/banner/productSidebarBanner`);
    return transformMediaUrl(data.data);
  }
}
