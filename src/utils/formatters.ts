export const formatPrice = (price: number | null, fallbackLabel: string = "Price on request"): string => {
  if (price === null || price === undefined) {
    return fallbackLabel;
  }
  return `₹${price.toLocaleString('en-IN')}`;
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
