import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import ListItem, { GRID, LIST, ViewMode } from './list-item';
import ListSection from './list-section';

import { PADDING_L, PADDING_M } from '../../../constants/styles/styles';
import { MOBILE_L, MOBILE_XXL, TABLET, TABLET_L } from '../../../constants/styles/styles-media-queries';

import { IIconsCollection } from '../../../constants/icons';
import { IIcon } from '../../../models/icons';
import { ISheet } from '../../../models/root';

const sheet: ISheet = {
  icon: {
    display: 'inline-block',
    margin: PADDING_L,
    verticalAlign: 'top',
  },
  iconGrid: {
    width: `calc(100% - ${PADDING_L * 2}px)`,

    [MOBILE_L]: {
      width: `calc(50% - ${PADDING_L * 2}px)`,
    },

    [TABLET]: {
      width: `calc(33% - ${PADDING_L * 2}px)`,
    },

    [TABLET_L]: {
      width: `calc(25% - ${PADDING_L * 2}px)`,
    },
  },
  iconList: {
    width: `calc(100% - ${PADDING_L * 2}px)`,

    [MOBILE_XXL]: {
      width: `calc(50% - ${PADDING_L * 2}px)`,
    },

    [TABLET_L]: {
      width: `calc(33% - ${PADDING_L * 2}px)`,
    },
  },
  results: {
    padding: PADDING_M,
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  handleSelectIcon: (i: IIcon) => void;
  icons: IIconsCollection;
  viewMode: ViewMode;
}

const UnstyledList = ({ classes, handleSelectIcon, icons, viewMode }: IOwnProps) => {
  return (
    <div className={classes.results}>
      {Object.keys(icons)
        .filter(brandName => icons[brandName].length > 0)
        .map(brandName => (
          <ListSection key={brandName} title={brandName}>
            {icons[brandName].map(icon => (
              <ListItem
                key={`${brandName}-${icon.fileName}`}
                className={classnames(classes.icon, {
                  [classes.iconGrid]: viewMode === GRID,
                  [classes.iconList]: viewMode === LIST,
                })}
                icon={icon}
                onClick={handleSelectIcon}
                viewMode={viewMode}
              />
            ))}
          </ListSection>
        ))}
    </div>
  );
};

const List = injectSheet(sheet)(UnstyledList);

export default List;
