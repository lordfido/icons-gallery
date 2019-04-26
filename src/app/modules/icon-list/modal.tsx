import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { capitalize } from '../../utils/strings';
import { replaceSize } from '../../utils/svg';

import { IButtonProps } from '../../components/button';
import Buttons from '../../components/buttons';
import Label from '../../components/label';
import Link from '../../components/link';
import Field from '../forms/field';
import DynamicSVG from './dynamic-svg';
import ModalSection from './modal-section';

import {
  changeIconBackground,
  changeIconForeground,
  changeIconSize,
  showIconLimits,
} from '../../../constants/features';
import { BORDER_RADIUS_BIG, ellipsis, HEADER_SIZE, PADDING_S, PADDING_XXXL } from '../../../constants/styles/styles';
import { BLACK, GREY_DARK_2 } from '../../../constants/styles/styles-colors';
import { FONT_L, TEXT_WHITE } from '../../../constants/styles/styles-fonts';
import { MOBILE_XXL } from '../../../constants/styles/styles-media-queries';
import { MODAL_BACKDROP_BAKGROUND, MODAL_BACKGROUND } from '../../../constants/styles/styles-skin';
import { MODAL, MODAL_BACKDROP } from '../../../constants/styles/styles-zindex';

import { IIcon } from '../../../models/icons';
import { ISheet } from '../../../models/root';
import { IFieldOutput } from '../forms/form.models';

const TRANSPARENT_BACKGROUND =
  'linear-gradient(45deg, #CCC 25%, transparent 25%), linear-gradient(-45deg, #CCC 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #CCC 75%), linear-gradient(-45deg, transparent 75%, #CCC 75%)';

const MAX_HEIGHT = '85vh';
const SIDEBAR_WIDTH = 298;

const sheet: ISheet = {
  backdrop: {
    backgroundColor: MODAL_BACKDROP_BAKGROUND,
    height: '100%',
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: MODAL_BACKDROP,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    [MOBILE_XXL]: {
      flex: 1,
    },
  },
  button: {
    lineHeight: 1.5,
    width: '33.33%',
  },
  content: {
    backgroundColor: MODAL_BACKGROUND,
    border: `1px solid ${BLACK}`,
    borderRadius: BORDER_RADIUS_BIG,
    maxHeight: MAX_HEIGHT,
    maxWidth: `calc(${MAX_HEIGHT} + ${SIDEBAR_WIDTH}px)`,
    overflow: 'hidden',
    overflowY: 'auto',
    textAlign: 'center',
    width: '85vw',
    zIndex: MODAL,

    [MOBILE_XXL]: {
      display: 'flex',
      overflow: 'hidden',
    },
  },
  fullWidth: {
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    backgroundColor: GREY_DARK_2,
    display: 'flex',
    height: HEADER_SIZE,
    padding: PADDING_XXXL,
    textAlign: 'left',
    width: '100%',
  },
  icon: {
    border: '2px solid transparent',
    margin: '0 auto',
    maxHeight: 256,
    maxWidth: 256,
    width: '100%',
  },
  iconPreview: {
    borderBottom: '2px solid transparent',
    borderLeft: '2px solid transparent',
    display: 'flex',
    height: ({ iconSize }) => parseInt(iconSize, 10) + 2,
    position: 'absolute',
    right: 0,
    top: 0,
    width: ({ iconSize }) => parseInt(iconSize, 10) + 2,
  },
  // tslint:disable:object-literal-sort-keys
  iconLimits: {
    borderColor: 'blue',
  },
  preview: {
    backgroundImage: TRANSPARENT_BACKGROUND,
    backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px',
    backgroundSize: '10px 10px',
    padding: PADDING_XXXL,
    position: 'relative',
    width: '100%',

    [MOBILE_XXL]: {
      alignItems: 'center',
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
    },
  },
  sidebar: {
    padding: PADDING_XXXL,
    width: '100%',

    [MOBILE_XXL]: {
      maxWidth: SIDEBAR_WIDTH,
      overflowY: 'auto',
    },
  },
  tag: {
    display: 'inline-block',
    margin: PADDING_S,
  },
  title: {
    ...ellipsis,
    color: TEXT_WHITE,
    fontSize: FONT_L,
    letterSpacing: '0.17px',
    lineHeight: '24px',
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: MODAL,
  },
};

interface IIconLink {
  icon: IIcon;
  background: string;
  foreground: string;
  size: string;
}

const getIconLink = ({ icon, background, foreground, size }: IIconLink) => {
  let url = `${location.origin}/?fileName=${icon.fileName}&brand=${icon.brand}&size=${size || icon.size}`;

  if (background) {
    url += `&background=${background.replace('#', '')}`;
  }

  if (foreground) {
    url += `&foreground=${foreground.replace('#', '')}`;
  }

  return url;
};

interface IOwnProps {
  availableBrands: string[];
  background: string;
  classes: { [key: string]: string };
  foreground: string;
  handleDownloadPng: () => void;
  handleUnselectIcon: () => void;
  handleUpdateBackground: (c: string) => void;
  handleUpdateForeground: (c: string) => void;
  handleUpdateIconBrand: (c: IFieldOutput) => void;
  handleUpdateIconMargins: (e: IFieldOutput) => void;
  handleUpdateIconSize: (e: IFieldOutput) => void;
  icon: IIcon;
  iconSize: string;
  pdf?: IIcon;
  template: string;
  viewIconLimits: boolean;
}

const UnstyledIconDetailsView = ({
  availableBrands,
  background,
  classes,
  foreground,
  handleDownloadPng,
  handleUnselectIcon,
  handleUpdateBackground,
  handleUpdateForeground,
  handleUpdateIconBrand,
  handleUpdateIconMargins,
  handleUpdateIconSize,
  icon,
  iconSize,
  pdf,
  template,
  viewIconLimits,
}: IOwnProps) => {
  const downloadSvgLink = `data:application/octet-stream;charset=utf-8;base64,${btoa(
    unescape(encodeURIComponent(template))
  )}`;

  const downloadLinks: IButtonProps[] = [
    {
      className: classes.button,
      download: `${icon.fileName}.svg`,
      id: `download-${icon.brand}-${icon.fileName}-svg`,
      label: 'SVG',
      to: downloadSvgLink,
      type: 'button',
    },
    {
      className: classes.button,
      id: `download-${icon.brand}-${icon.fileName}-png`,
      label: 'PNG',
      onClick: handleDownloadPng,
      type: 'button',
    },
  ];

  if (pdf) {
    downloadLinks.push({
      className: classes.button,
      id: `download-${icon.brand}-${icon.fileName}-pdf`,
      isExternal: true,
      label: 'PDF',
      to: pdf.image,
      type: 'button',
    });
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.backdrop} onClick={handleUnselectIcon} />
      <div className={classes.content}>
        <div className={classes.body}>
          <div className={classes.header}>
            <h1 className={classes.title}>{icon.fileName}.svg</h1>
          </div>
          <div className={classes.preview} style={{ background }}>
            <DynamicSVG
              className={classnames(classes.iconPreview, { [classes.iconLimits]: showIconLimits && viewIconLimits })}
              template={template}
            />
            <DynamicSVG
              className={classnames(classes.icon, { [classes.iconLimits]: showIconLimits && viewIconLimits })}
              template={replaceSize(template, iconSize, '100%')}
            />
          </div>
        </div>

        <div className={classes.sidebar}>
          <ModalSection
            title="Brand"
            content={
              availableBrands.length > 1 ? (
                <Field
                  className={classes.fullWidth}
                  options={{
                    defaultValue: [icon.brand],
                    id: 'brand-selector',
                    onChange: handleUpdateIconBrand,
                    options: availableBrands.map(brandName => ({
                      id: brandName,
                      label: brandName,
                      value: brandName,
                    })),
                    type: 'dropdown',
                  }}
                />
              ) : (
                <p>{icon.brand}</p>
              )
            }
          />

          <ModalSection
            title="Size"
            content={
              changeIconSize ? (
                <Field
                  className={classes.fullWidth}
                  options={{
                    defaultValue: [iconSize],
                    id: 'size',
                    onChange: handleUpdateIconSize,
                    options: [
                      {
                        id: 'size-12',
                        label: '12px',
                        value: '12px',
                      },
                      {
                        id: 'size-24',
                        label: '24px',
                        value: '24px',
                      },
                      {
                        id: 'size-36',
                        label: '36px',
                        value: '36px',
                      },
                      {
                        id: 'size-48',
                        label: '48px',
                        value: '48px',
                      },
                    ],
                    type: 'dropdown',
                  }}
                />
              ) : (
                icon.size
              )
            }
          />

          {icon.color && <ModalSection title="Color" content={<Label background={icon.color}>{icon.color}</Label>} />}

          <ModalSection
            title="Tags"
            content={
              <>
                {icon.tags.map(tag => (
                  <Label key={tag} className={classes.tag}>
                    {capitalize(tag)}
                  </Label>
                ))}
              </>
            }
          />

          {changeIconBackground && (
            <ModalSection
              title="ArtBoard"
              content={
                <>
                  <input
                    type="color"
                    defaultValue={background}
                    onChange={event => {
                      const { value } = event.target;
                      handleUpdateBackground(value);
                    }}
                  />{' '}
                  {background && background !== '' && (
                    <Link
                      options={{
                        id: 'clear-backgrounud',
                        label: 'Clear',
                        onClick: () => handleUpdateBackground(''),
                      }}
                    />
                  )}
                </>
              }
            />
          )}

          {changeIconForeground && (
            <ModalSection
              title="Fills"
              content={
                <>
                  <input
                    type="color"
                    defaultValue={foreground}
                    onChange={event => {
                      const { value } = event.target;
                      handleUpdateForeground(value);
                    }}
                  />{' '}
                  {foreground && foreground !== '' && (
                    <Link
                      options={{
                        id: 'clear-backgrounud',
                        label: 'Clear',
                        onClick: () => handleUpdateForeground(''),
                      }}
                    />
                  )}
                </>
              }
            />
          )}

          {showIconLimits && (
            <ModalSection
              title="Options"
              content={
                <>
                  <Field
                    className={classes.fullWidth}
                    options={{
                      defaultChecked: viewIconLimits,
                      id: 'show-icon-limits',
                      label: 'Show icon limits',
                      onChange: handleUpdateIconMargins,
                      type: 'switch',
                    }}
                  />
                </>
              }
            />
          )}

          <ModalSection
            title="Downloads"
            content={<Buttons align="center" className={classes.fullWidth} options={downloadLinks} />}
          />

          <ModalSection
            title="Share"
            content={
              <>
                <Field
                  className={classes.fullWidth}
                  options={{
                    id: 'icon-link',
                    type: 'text' as 'text',
                    value: `${getIconLink({ icon, background, foreground, size: iconSize })}`,
                  }}
                />
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

const IconDetailsView = injectSheet(sheet)(UnstyledIconDetailsView);

export default IconDetailsView;
