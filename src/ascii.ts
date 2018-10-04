const chars = ['@', '%', '#', '?', '=', '+', '-', ';', ',', '.', ' '];

function getLuminance(r: number, g: number, b: number): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getLuminanceArray(imageData: ImageData): number[] {
  const arr: number[] = [];
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const pixelLuminance = getLuminance(data[i], data[i + 1], data[i + 2]);
    arr.push(pixelLuminance);
  }

  return arr;
}

function getChars(luminanceArray: number[]) {
  const step = Math.ceil(255 / chars.length);
  const charArray: string[] = [];

  for (let i = 0; i < luminanceArray.length; i++) {
    for (let j = 0; j < chars.length; j++) {
      if (luminanceArray[i] < j * step + step) {
        charArray.push(chars[j]);
        break;
      }
    }
  }

  return charArray;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = function() {
      resolve(img);
    };

    img.src = src;
  });
}

export async function convertToAscii(src: string): Promise<string> {
  const img = await loadImage(src);
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Unable to get canvas context');
  }

  context.drawImage(img, 0, 0);
  const imageData = context.getImageData(0, 0, img.width, img.height);
  const luminanceArray = getLuminanceArray(imageData);
  const chars = getChars(luminanceArray);
  let str = '';
  for (let i = 0; i < chars.length; i++) {
    str += chars[i];

    if (i % img.width === 0) {
      str += '\n';
    }
  }

  return str;
}
