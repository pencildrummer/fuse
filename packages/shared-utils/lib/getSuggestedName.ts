import getProductInfo from "./getProductInfo";

export default function getSuggestedName(
  vendorId: string,
  productId: string
): string {
  if (vendorId) {
    let productInfo = getProductInfo(vendorId, productId);
    if (productInfo) {
      return [productInfo.vendorName, productInfo.productName].join(" ");
    }
  }
  return "";
}
