export type ProductInfo = {
  vendorName: string;
  productName: string;
};
export default function getProductInfo(
  vendorId: string,
  productId: string
): ProductInfo;
