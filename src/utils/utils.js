export default function percentDifference(a, b) {
  return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2);
}

// export function bigFirstLetter(str) {
//   return str.charAt(0).toUppserCase() + str.substr(1);
// }
