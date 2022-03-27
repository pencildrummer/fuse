import getProductInfo from './getProductInfo.js'

export default function getSuggestedName(vendorId, productId) {
  if (vendorId) {
    let productInfo = getProductInfo(vendorId, productId)
    if (productInfo) {
      return [productInfo.vendorName, productInfo.productName].join(' ')
    }
  }
  return ''
}