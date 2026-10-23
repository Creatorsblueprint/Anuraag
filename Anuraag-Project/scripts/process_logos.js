import fs from 'fs';
import zlib from 'zlib';

function createCrcTable() {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    table[n] = c;
  }
  return table;
}
const crcTable = createCrcTable();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function decodePngRawRgba(filepath) {
  const buf = fs.readFileSync(filepath);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);

  let pos = 8;
  const idats = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IDAT') {
      idats.push(buf.slice(pos + 8, pos + 8 + len));
    }
    pos += 8 + len + 4;
  }
  const decompressed = zlib.inflateSync(Buffer.concat(idats));
  const scanlineLen = width * 4 + 1;
  const rawRgba = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    const srcRow = y * scanlineLen + 1;
    const dstRow = y * width * 4;
    decompressed.copy(rawRgba, dstRow, srcRow, srcRow + width * 4);
  }

  return { width, height, rawRgba };
}

function encodePngRawRgba(width, height, rawRgba) {
  const scanlineLen = width * 4 + 1;
  const scanlines = Buffer.alloc(height * scanlineLen);

  for (let y = 0; y < height; y++) {
    scanlines[y * scanlineLen] = 0; // Filter 0
    const srcRow = y * width * 4;
    const dstRow = y * scanlineLen + 1;
    rawRgba.copy(scanlines, dstRow, srcRow, srcRow + width * 4);
  }

  const compressed = zlib.deflateSync(scanlines, { level: 9 });

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // bit depth 8
  ihdrData.writeUInt8(6, 9); // RGBA
  ihdrData.writeUInt8(0, 10);
  ihdrData.writeUInt8(0, 11);
  ihdrData.writeUInt8(0, 12);

  const ihdr = makeChunk('IHDR', ihdrData);
  const idat = makeChunk('IDAT', compressed);
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

// -------------------------------------------------------------
// 1. Process name_logo.PNG -> name_logo_white.png (with trimming)
// -------------------------------------------------------------
console.log('Processing name_logo.PNG...');
const nameLogo = decodePngRawRgba('public/logos/name_logo.PNG');

// Find bounding box
let minX = nameLogo.width, maxX = 0, minY = nameLogo.height, maxY = 0;
for (let y = 0; y < nameLogo.height; y++) {
  for (let x = 0; x < nameLogo.width; x++) {
    const idx = (y * nameLogo.width + x) * 4;
    const alpha = nameLogo.rawRgba[idx + 3];
    if (alpha > 10) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

// Add padding of 20px
const pad = 24;
const cropX = Math.max(0, minX - pad);
const cropY = Math.max(0, minY - pad);
const cropW = Math.min(nameLogo.width - cropX, (maxX - minX) + pad * 2);
const cropH = Math.min(nameLogo.height - cropY, (maxY - minY) + pad * 2);

console.log(`Bounding box: [${minX}, ${minY}] to [${maxX}, ${maxY}], cropped size: ${cropW}x${cropH}`);

const trimmedWhite = Buffer.alloc(cropW * cropH * 4);
for (let y = 0; y < cropH; y++) {
  for (let x = 0; x < cropW; x++) {
    const srcIdx = ((cropY + y) * nameLogo.width + (cropX + x)) * 4;
    const dstIdx = (y * cropW + x) * 4;
    const alpha = nameLogo.rawRgba[srcIdx + 3];

    // White text (255, 255, 255) with original antialiased alpha
    trimmedWhite[dstIdx] = 255;
    trimmedWhite[dstIdx + 1] = 255;
    trimmedWhite[dstIdx + 2] = 255;
    trimmedWhite[dstIdx + 3] = alpha;
  }
}

fs.writeFileSync('public/logos/name_logo_white.png', encodePngRawRgba(cropW, cropH, trimmedWhite));
console.log('Created public/logos/name_logo_white.png');

// Also create uncropped full-resolution white version
const fullWhite = Buffer.alloc(nameLogo.width * nameLogo.height * 4);
for (let i = 0; i < nameLogo.width * nameLogo.height; i++) {
  const idx = i * 4;
  fullWhite[idx] = 255;
  fullWhite[idx + 1] = 255;
  fullWhite[idx + 2] = 255;
  fullWhite[idx + 3] = nameLogo.rawRgba[idx + 3];
}
fs.writeFileSync('public/logos/name_logo_white_full.png', encodePngRawRgba(nameLogo.width, nameLogo.height, fullWhite));
console.log('Created public/logos/name_logo_white_full.png');

// -------------------------------------------------------------
// 2. Process inital_logo.PNG -> initial_logo_circle.png
//    White circle background with black initial logo in center
// -------------------------------------------------------------
console.log('Processing inital_logo.PNG into circular badge...');
const initLogo = decodePngRawRgba('public/logos/inital_logo.PNG');

// Find bounding box of inital_logo
let iMinX = initLogo.width, iMaxX = 0, iMinY = initLogo.height, iMaxY = 0;
for (let y = 0; y < initLogo.height; y++) {
  for (let x = 0; x < initLogo.width; x++) {
    const idx = (y * initLogo.width + x) * 4;
    const alpha = initLogo.rawRgba[idx + 3];
    if (alpha > 10) {
      if (x < iMinX) iMinX = x;
      if (x > iMaxX) iMaxX = x;
      if (y < iMinY) iMinY = y;
      if (y > iMaxY) iMaxY = y;
    }
  }
}
const iW = iMaxX - iMinX;
const iH = iMaxY - iMinY;
console.log(`inital_logo bounds: ${iW}x${iH}`);

// Target size 512x512
const size = 512;
const circleCanvas = Buffer.alloc(size * size * 4);

const cx = size / 2;
const cy = size / 2;
const radius = size * 0.48; // Leave a tiny 2% edge margin

// Max dimension inside circle with 24% breathing room
const maxTargetDim = size * 0.62;
const scale = Math.min(maxTargetDim / iW, maxTargetDim / iH);
const scaledW = iW * scale;
const scaledH = iH * scale;
const targetStartX = cx - scaledW / 2;
const targetStartY = cy - scaledH / 2;

// Draw circle and supersample for ultra smooth edges
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    const idx = (y * size + x) * 4;
    const dx = x + 0.5 - cx;
    const dy = y + 0.5 - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Antialiased circle edge
    let circleAlpha = 0;
    if (dist <= radius - 0.75) {
      circleAlpha = 1;
    } else if (dist <= radius + 0.75) {
      circleAlpha = (radius + 0.75 - dist) / 1.5;
    }

    if (circleAlpha > 0) {
      // Start with pure white circle
      let r = 255;
      let g = 255;
      let b = 255;
      let a = circleAlpha;

      // Check if inside logo bounding area
      if (x >= targetStartX && x < targetStartX + scaledW &&
          y >= targetStartY && y < targetStartY + scaledH) {
        // Map back to original image
        const origX = iMinX + (x - targetStartX) / scale;
        const origY = iMinY + (y - targetStartY) / scale;
        const oX = Math.floor(origX);
        const oY = Math.floor(origY);

        if (oX >= 0 && oX < initLogo.width && oY >= 0 && oY < initLogo.height) {
          // Bilinear interpolation for smooth scaling
          const fx = origX - oX;
          const fy = origY - oY;
          const oX1 = Math.min(initLogo.width - 1, oX + 1);
          const oY1 = Math.min(initLogo.height - 1, oY + 1);

          const a00 = initLogo.rawRgba[(oY * initLogo.width + oX) * 4 + 3];
          const a10 = initLogo.rawRgba[(oY * initLogo.width + oX1) * 4 + 3];
          const a01 = initLogo.rawRgba[(oY1 * initLogo.width + oX) * 4 + 3];
          const a11 = initLogo.rawRgba[(oY1 * initLogo.width + oX1) * 4 + 3];

          const logoAlpha = ((a00 * (1 - fx) + a10 * fx) * (1 - fy) + (a01 * (1 - fx) + a11 * fx) * fy) / 255;

          // Blend black logo (0, 0, 0) over white background (255, 255, 255)
          const colorVal = Math.round(255 * (1 - logoAlpha));
          r = colorVal;
          g = colorVal;
          b = colorVal;
        }
      }

      circleCanvas[idx] = r;
      circleCanvas[idx + 1] = g;
      circleCanvas[idx + 2] = b;
      circleCanvas[idx + 3] = Math.round(a * 255);
    }
  }
}

const circlePng = encodePngRawRgba(size, size, circleCanvas);
fs.writeFileSync('public/logos/inital_logo_circle.png', circlePng);
fs.writeFileSync('public/favicon.png', circlePng);
fs.writeFileSync('public/apple-touch-icon.png', circlePng);
console.log('Created public/logos/inital_logo_circle.png, public/favicon.png, public/apple-touch-icon.png');
