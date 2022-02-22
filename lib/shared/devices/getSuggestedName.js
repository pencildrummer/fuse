import getProductInfo from './getProductInfo'

export default function getSuggestedName(device) {
  if (device.vendorId) {
    let productInfo = getProductInfo(device.vendorId, device.productId)
    if (productInfo) {
      return [productInfo.vendorName, productInfo.productName].join(' ')
    }
  }
  return ''
}