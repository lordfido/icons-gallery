import http from './http';

import { IIcon } from '../../models/icons';

export const downloadFileContent = (url: string) =>
  http({ url }).then(response => {
    // @ts-ignore
    const svg: string = response;

    return svg;
  });

interface IDownloadableTemplateProps {
  foreground?: string;
  icon: IIcon;
  iconSize: string;
  template: string;
}
export const getDownloadableTemplate = ({ foreground, icon, iconSize, template }: IDownloadableTemplateProps) =>
  !icon.color || !foreground
    ? replaceSize(template, icon.size, iconSize)
    : replaceSize(replaceColor(template, icon.color, foreground), icon.size, iconSize);

export const getSVGElement = (template: string) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = template;

  return wrapper.children[0];
};

export const replaceColor = (template: string, reference: string, color: string) =>
  template.replace(new RegExp(reference, 'g'), color);

export const replaceSize = (template: string, reference: string, size: string) =>
  reference
    ? template
        .replace(`width="${reference}"`, `width="${size}"`)
        .replace(`width="${reference.replace('px', '')}"`, `width="${size}"`)
        .replace(`height="${reference}"`, `height="${size}"`)
        .replace(`height="${reference.replace('px', '')}"`, `height="${size}"`)
    : '';

export const isIcon = ({ image }: IIcon) => /\.svg$/.test(image);
