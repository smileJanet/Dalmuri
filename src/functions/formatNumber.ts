interface FormatOptions {
  style: 'decimal' | 'currency' | 'percent' | 'unit'
  currency: string;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
}

export const formatNumber = (
  price: number,
  format: string = 'en-IN',
  options: FormatOptions = { style: 'currency', currency: 'USD' },
): string => {
  return new Intl.NumberFormat(format, {
    style: options.style,
    currency: options.currency,
    maximumFractionDigits: options.maximumFractionDigits,
    minimumFractionDigits: options.minimumFractionDigits,
  }).format(price);
};
