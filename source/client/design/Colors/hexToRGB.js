export default function hexToRGB(hex) {
  if (hex[0] === "#") {
    hex = hex.slice(1);
  }

  if (hex.length === 3) {
    hex = hex + hex;
  }

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
}
