import sharp from "sharp";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#0f172a"/>
  <text x="50" y="68" font-size="60" text-anchor="middle" fill="white">💬</text>
</svg>`;

const svgBuffer = Buffer.from(svg);

await sharp(svgBuffer).resize(192, 192).png().toFile("public/icon-192.png");
await sharp(svgBuffer).resize(512, 512).png().toFile("public/icon-512.png");

console.log("Icons generated!");