import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { BORDER_RADIUS, PADDING_L, PADDING_S } from '../../constants/styles/styles';
import { GREY_LIGHT_3 } from '../../constants/styles/styles-colors';
import { FONT_M, TEXT_DARK, TEXT_WHITE } from '../../constants/styles/styles-fonts';

import { ISheet } from '../../models/root';

const sheet: ISheet = {
  wrapper: {
    backgroundColor: GREY_LIGHT_3,
    borderRadius: BORDER_RADIUS,
    color: TEXT_DARK,
    fontSize: FONT_M,
    letterSpacing: '0.14px',
    padding: `${PADDING_S}px ${PADDING_L}px`,
    textAlign: 'center',
    userSelect: 'text',
  },
};

interface IOwnProps {
  background?: string;
  children: React.ReactNode;
  classes: { [key: string]: string };
  className?: string;
}

const UnstyledLabel = ({ background, children, classes, className }: IOwnProps) => (
  <span
    className={classnames(classes.wrapper, className)}
    style={{ background, color: background ? TEXT_WHITE : undefined }}
  >
    {children}
  </span>
);

const Label = injectSheet(sheet)(UnstyledLabel);

export default Label;
