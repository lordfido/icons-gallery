import * as React from 'react';
import injectSheet from 'react-jss';

import { PADDING_M, PADDING_S, PADDING_XXL } from '../../../constants/styles/styles';
import { GREY_DARK } from '../../../constants/styles/styles-colors';
import { FONT_L, FONT_M } from '../../../constants/styles/styles-fonts';

import { ISheet } from '../../../models/root';

const sheet: ISheet = {
  content: {
    color: GREY_DARK,
    fontSize: FONT_M,
  },
  title: {
    fontSize: FONT_L,
    letterSpacing: '0.17px',
    lineHeight: '24px',
    margin: `${PADDING_M}px 0 ${PADDING_S}px`,
  },
  wrapper: {
    marginBottom: PADDING_XXL,
    textAlign: 'left',
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  content: React.ReactNode;
  title: string;
}

const UnstyledIconSection = ({ classes, content, title }: IOwnProps) => (
  <div className={classes.wrapper}>
    <h2 className={classes.title}>{title}</h2>
    <div className={classes.content}>{content}</div>
  </div>
);

const IconSection = injectSheet(sheet)(UnstyledIconSection);

export default IconSection;
