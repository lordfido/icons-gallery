import { readFileSync, writeFileSync } from 'fs';
import jsdom from 'jsdom';
import { join } from 'path';

import recursiveRead from './recursive-read';

import { IIcon } from '../src/models/icons';
import { getMoreSimilarColor } from './colors';

const { JSDOM } = jsdom;

const ICONS_PATH = join(__dirname, '../src/images/icons/');
const brands: string[] = [];
const icons: { [key: string]: IIcon[] } = {};

const MAP_FILE_PATH = join(__dirname, '../src/constants/icons.ts');

const lines: string[] = [];
// @ts-ignore
const writeMapFile = () => {
  lines.push("import {IIcon} from '../models/icons';");
  lines.push('');

  lines.push('export interface IIconsCollection { [brandName: string]: IIcon[] };');
  lines.push('');

  lines.push('const icons: IIconsCollection = {');

  brands.forEach(brandName => {
    lines.push(`  ${brandName}: [`);
    icons[brandName].forEach(icon => {
      lines.push('    {');
      lines.push(`      brand: '${brandName}',`);
      if (icon.color) {
        lines.push(`      color: '${icon.color}',`);
      }
      lines.push(`      fileName: '${icon.fileName}',`);
      lines.push(`      image: require("../images/icons/${icon.image}"),`);
      lines.push(`      size: '${icon.size}',`);
      lines.push(`      tags: [${icon.tags.map(t => `'${t}'`)}],`);
      lines.push('    },');
    });
    lines.push('  ],');
  });

  lines.push('};');
  lines.push('');
  lines.push('export default icons;');
  lines.push('');

  writeFileSync(MAP_FILE_PATH, lines.join('\n'));
};

const readSVGColor = (svg: SVGSVGElement | null) => {
  if (!svg) {
    return undefined;
  }

  const coloredElement = svg.querySelector(
    '[fill]:not([fill="none"]):not([fill="white"]):not([fill="black"]):not([fill="#000"]):not([fill="#000000"]):not([fill="#fff"]):not([fill="#ffffff"]):not([fill="#FFF"]):not([fill="#FFFFFF"])'
  );
  if (coloredElement) {
    const fill = coloredElement.getAttribute('fill');
    if (fill) {
      return fill;
    }
  }

  return undefined;
};

interface IMetaData {
  color?: string;
  size: string;
  tags: string[];
}

const readMetadata = (file: string): IMetaData => {
  const filePath = join(__dirname, '../', file);
  const svgContent = readFileSync(filePath);
  const dom = new JSDOM(svgContent);
  const document = dom.window.document;

  const svg = document.querySelector('svg');

  const tags = [];
  const color = readSVGColor(svg);
  let size = '24px';

  if (color) {
    const similarColor = getMoreSimilarColor(color);
    if (typeof similarColor !== 'undefined') {
      tags.push(similarColor);
    }
  }

  if (svg) {
    const width = svg.getAttribute('width');
    if (width) {
      size = `${width}${/px/.test(width) === false ? 'px' : ''}`;
    }
  }

  return { color, size, tags };
};

const readFiles = () => {
  const filePaths = recursiveRead(ICONS_PATH);

  filePaths
    .filter(path => new RegExp('.git/').test(path) === false)
    .forEach(filePath => {
      const pathName = filePath.replace('/src/images/icons/', '');
      const pathParts = pathName.replace('.svg', '').split('/');
      const pathTags = pathParts.slice(0, pathParts.length - 1);
      const brand = pathParts[0];
      const fileName = pathParts[pathParts.length - 1];
      const nameTags = fileName.replace('icn-', '').split('-');
      const metaData = readMetadata(filePath);

      if (brands.findIndex(b => b === brand) < 0) {
        brands.push(brand);
        icons[brand] = [];
      }

      // Filter duplicated elements
      const tags = [...pathTags, ...nameTags, ...metaData.tags];

      const iconData: IIcon = {
        brand: pathTags[0],
        color: metaData.color,
        fileName,
        image: `${pathName}`,
        size: metaData.size,
        tags: tags.filter((tag, index) => tags.indexOf(tag) >= index),
      };

      icons[brand].push(iconData);
    });

  writeMapFile();
};

readFiles();
