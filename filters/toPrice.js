export default function toPrice(price) {
  price = parseInt(price) || 0;
  return '￥ ' + price.toFixed(2);
}
