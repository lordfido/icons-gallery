import chroma from 'chroma-js';

interface IColor {
  color: string;
  name: string;
}

const yellow: IColor = {
  color: '#F5A51C',
  name: 'yellow',
};
const lightyellow: IColor = {
  color: '#FCE1B2',
  name: 'yellow',
};
const orange: IColor = {
  color: '#FF7748',
  name: 'orange',
};
const red: IColor = {
  color: '#F04C6E',
  name: 'red',
};
const pink: IColor = {
  color: '#F04C6E',
  name: 'pink',
};
const lightpink: IColor = {
  color: '#EED5EE',
  name: 'pink',
};
const purple: IColor = {
  color: '#A54A96',
  name: 'purple',
};
const blue: IColor = {
  color: '#0098D2',
  name: 'blue',
};
const lightblue: IColor = {
  color: '#B2E5F5',
  name: 'blue',
};
const darkblue: IColor = {
  color: '#3B5998',
  name: 'blue',
};
const green: IColor = {
  color: '#5FC705',
  name: 'green',
};
const lightgreen: IColor = {
  color: '#CDEDB2',
  name: 'green',
};
const limegreen: IColor = {
  color: '#82D531',
  name: 'green',
};
const darkgreen: IColor = {
  color: '#25D366',
  name: 'green',
};
const grey: IColor = {
  color: '#EEE',
  name: 'grey',
};
const darkgrey: IColor = {
  color: '#4C4C53',
  name: 'grey',
};
const black: IColor = {
  color: 'black',
  name: 'black',
};

const colors = [
  yellow,
  lightyellow,

  orange,

  red,

  pink,
  lightpink,

  purple,

  blue,
  lightblue,
  darkblue,

  green,
  lightgreen,
  limegreen,
  darkgreen,

  grey,
  darkgrey,
  black,
];
let mostSimilarColor: IColor;

export const getMoreSimilarColor = (color: string) => {
  const sampleRGB = chroma(color).rgb();

  colors.forEach(c => {
    const mostSimilarRGB = chroma(mostSimilarColor ? mostSimilarColor.color : 'white').rgb();
    let mostSimilarColorData = 0;
    for (let i = 0; i < sampleRGB.length; i++) {
      mostSimilarColorData += (sampleRGB[i] - mostSimilarRGB[i]) * (sampleRGB[i] - mostSimilarRGB[i]);
    }

    const comparisionRGB = chroma(c.color).rgb();
    let comparisionData = 0;

    for (let i = 0; i < sampleRGB.length; i++) {
      comparisionData += (sampleRGB[i] - comparisionRGB[i]) * (sampleRGB[i] - comparisionRGB[i]);
    }

    if (Math.sqrt(mostSimilarColorData) > Math.sqrt(comparisionData)) {
      mostSimilarColor = c;
    }
  });

  return mostSimilarColor.name;
};
