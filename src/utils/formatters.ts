export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatPrice(price: number, currency: 'USD' | 'EUR' | 'BTC' = 'USD'): string {
  if (currency === 'EUR') {
    return `€${new Intl.NumberFormat('de-DE').format(Math.round(price * 0.92))}`;
  }
  if (currency === 'BTC') {
    const btc = (price / 88000).toFixed(3);
    return `₿${btc}`;
  }
  return `$${new Intl.NumberFormat('en-US').format(price)}`;
}
