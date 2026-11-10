const USD_TO_INR = 85; // Demo rate, not live

export function convertToINR(usdPrice) {
  return usdPrice * USD_TO_INR;
}

export function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatProductPrice(usdPrice) {
  return formatINR(convertToINR(usdPrice));
}
