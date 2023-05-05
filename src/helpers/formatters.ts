export const formatNumber = (val: number, min = 0, max = 6) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  }).format(val);
};
