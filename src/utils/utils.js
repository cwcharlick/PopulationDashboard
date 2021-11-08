
// the rawData is in 1000s, so 1000 actually = 1,000,000
export function valueToLabel(n) {
  const v = n.toPrecision(3);
  if (parseInt(v) === 0) return 0;
  if (v < 1000) return `${v}k`;
  if (v < 1000000) return `${v / 1000}m`;
   return `${v / 1000000}b`;
}
