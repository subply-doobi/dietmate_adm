export const commaToNum = (num: number | string | undefined) => {
  if (!num) return '0';
  const n = typeof num === 'number' ? num.toString() : num;
  return n.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};
