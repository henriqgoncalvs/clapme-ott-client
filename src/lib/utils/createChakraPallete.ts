import { PalxPalette } from 'palx';

const parseColorLevels = (colorsArray: string[]) =>
  colorsArray.reduce((obj, current, index) => {
    if (!index) {
      return { 50: current };
    }
    return { ...obj, [index * 100]: current };
  }, {});

const createChakraPallete = (palxObject: PalxPalette) => {
  const colorPallete = Object.entries(palxObject)
    .filter((color) => typeof color[1] === 'object')
    .map((color) => {
      return { [color[0]]: parseColorLevels(color[1] as string[]) };
    })
    .reduce((obj, current) => ({ ...obj, ...current }), {});

  return colorPallete;
};

export default createChakraPallete;
