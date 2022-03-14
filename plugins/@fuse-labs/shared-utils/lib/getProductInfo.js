export default function getProductInfo(vendorId, productId) {
  if (!vendorId)
    throw new Error('No vendor ID provided')
  let vendorDef = VENDOR_NAMES_AND_PRODUCTS[vendorId.toUpperCase()]
  if (!vendorDef) return null
  if (!productId) return null
  return {
    vendorName: vendorDef.name,
    productName: vendorDef.products[productId.toUpperCase()]
  }
}

const VENDOR_NAMES_AND_PRODUCTS = {
  '2341': {
    name: 'Arduino',
    products: {
      '0001': 'Uno',
      '0010': 'Mega 2560',
      '0036': 'Leonardo Bootloader',
      '003B': 'Serial Adapter',
      '003D': 'Due Programming Port',
      '003E': 'Due',
      '003F': 'Mega ADK',
      '0042': 'Mega 2560 R3',
      '0043': 'Uno R3',
      '0044': 'Mega ADK R3',
      '0045': 'Serial R3',
      '0049': 'ISP',
      '8036': 'Leonardo',
      '8038': 'Robot Control Board',
      '8039': 'Robot Motor Board'
    }
  },
  '1A86': {
    name: 'QinHeng Electronics',
    products: {
      '7523': 'CH340 serial converter'
    }
  }
}