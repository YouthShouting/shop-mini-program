// 这个接口用来管理请求接口
import request from "@/utils/request"
// 首页API
export const getIndexSwiper = () => request.get('home/swiperdata')
export const getIndexMenu = () => request.get('home/catitems')
export const getIndexFloor = () => request.get('home/floordata')
// 分类API
export const getCategories = () => request.get("categories")
// 商品API
export const getGoodsSearch = obj => request.get("goods/search", obj)
export const getGoodsDetail = obj => request.get("goods/detail", obj)
export const getGoodsQsearch = obj => request.get("goods/qsearch", obj)