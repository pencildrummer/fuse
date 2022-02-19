import getProductInfo from './getProductInfo'

export default function getSuggestedName(device) {
  if (device.port) {
    let productInfo = getProductInfo(device.port.vendorId, device.port.productId)
    if (productInfo) {
      return [productInfo.vendorName, productInfo.productName].join(' ')
    }
  }
  return ''
}