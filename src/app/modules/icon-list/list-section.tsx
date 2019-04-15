import * as React from 'react';
import injectSheet from 'react-jss';

import ListItem from './list-item';

import { PADDING_L } from '../../../constants/styles/styles';
import { FONT_L, TEXT_BLACK } from '../../../constants/styles/styles-fonts';
import { HEADER_BORDER } from '../../../constants/styles/styles-skin';

import { ISheet } from '../../../models/root';

const sheet: ISheet = {
  title: {
    borderBottom: `1px solid ${HEADER_BORDER}`,
    color: TEXT_BLACK,
    fontSize: FONT_L,
    letterSpacing: '0.17px',
    lineHeight: '20px',
    marginBottom: PADDING_L,
    padding: PADDING_L,
  },
};

interface IOwnProps {
  children: React.ReactElement<typeof ListItem> | Array<React.ReactElement<typeof ListItem>>;
  classes: { [key: string]: string };
  title?: string;
}

const UnstyledListSection = ({ children, classes, title }: IOwnProps) => (
  <div>
    {title && <h1 className={classes.title}>{title}</h1>}

    <div>{children}</div>
  </div>
);

const ListSection = injectSheet(sheet)(UnstyledListSection);

export default ListSection;
