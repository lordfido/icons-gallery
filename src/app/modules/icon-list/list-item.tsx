import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { BORDER_RADIUS, ellipsis, PADDING_XXL, PADDING_XXXL } from '../../../constants/styles/styles';
import { GREY_LIGHT_2 } from '../../../constants/styles/styles-colors';
import { FONT_L, TEXT_DARK_2 } from '../../../constants/styles/styles-fonts';

import { IIcon } from '../../../models/icons';
import { ISheet } from '../../../models/root';

const sheet: ISheet = {
  content: {
    ...ellipsis,
  },
  imageGrid: {
    display: 'block',
    height: 8 * 8,
    margin: '0 auto',
    marginBottom: PADDING_XXXL,
    width: 8 * 8,
  },
  imageList: {
    height: 24,
    marginRight: PADDING_XXL,
    verticalAlign: 'middle',
    width: 24,
  },
  label: {
    fontSize: FONT_L,
    letterSpacing: '0.17px',
    lineHeight: '24px',
    verticalAlign: 'middle',
  },
  wrapper: {
    backgroundColor: GREY_LIGHT_2,
    border: 'none',
    borderRadius: BORDER_RADIUS,
    color: TEXT_DARK_2,
    cursor: 'pointer',
    opacity: 0.6,
    outline: 'none',
    padding: PADDING_XXXL,
    textDecoration: 'none',
    transition: 'box-shadow 0.2s, opacity 0.2s',

    '&:hover': {
      boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.15)',
      opacity: 1,
    },
  },
  wrapperContent: {
    textAlign: 'center',
  },
  wrapperGrid: {},
  wrapperList: {
    textAlign: 'left',
  },
};

export type ViewMode = 'list' | 'grid';

export const LIST: ViewMode = 'list';
export const GRID: ViewMode = 'grid';

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  icon: IIcon;
  onClick: (icon: IIcon) => void;
  viewMode: ViewMode;
}

const UnstyledIconCard = ({ classes, className, icon, onClick, viewMode }: IOwnProps) => (
  <button
    className={classnames(classes.wrapper, className, {
      [classes.wrapperGrid]: viewMode === GRID,
      [classes.wrapperList]: viewMode === LIST,
    })}
    onClick={() => onClick(icon)}
  >
    <div className={classes.content}>
      <img
        className={classnames({
          [classes.imageGrid]: viewMode === GRID,
          [classes.imageList]: viewMode === LIST,
        })}
        src={icon.image}
      />
      <span className={classes.label}>{icon.fileName}</span>
    </div>
  </button>
);

const IconCard = injectSheet(sheet)(UnstyledIconCard);

export default IconCard;
