export const formatPrice = (price) =>
{if(!price)return
  return`Rp ${price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`;
}