import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { Link as RouterLink } from 'react-router-dom';

import Label from '../../components/label';
import Link from '../../components/link';

import { HOME } from '../../../constants/appRoutes';
import { APP_REPOSITORY } from '../../../constants/branding';
import { HEADER_SIZE, PADDING_L, PAGE_MAX_WIDTH } from '../../../constants/styles/styles';
import { BLACK } from '../../../constants/styles/styles-colors';
import { FONT_XXL, TEXT_BLACK, TEXT_WHITE } from '../../../constants/styles/styles-fonts';
import { MAX_MOBILE } from '../../../constants/styles/styles-media-queries';
import { HEADER_BORDER } from '../../../constants/styles/styles-skin';

import { ISheet } from '../../../models/root';

const packageJson = require('../../../../package.json');
const APP_VERSION = packageJson.version;

const sheet: ISheet = {
  content: {
    display: 'flex',
    margin: '0 auto',
    maxWidth: PAGE_MAX_WIDTH,
  },
  highlighted: {
    fontSize: FONT_XXL,
    letterSpacing: '0.25px',
    lineHeight: '30px',
  },
  left: {
    flex: 1,
  },
  link: {
    '&, &:active, &:hover, &:focus, & > *, &:active > *, &:hover > *, &:focus > *': {
      color: TEXT_BLACK,
      textDecoration: 'none',
    },
  },
  list: {
    display: 'inline-block',
  },
  listElement: {
    display: 'inline-block',
    padding: `0 ${PADDING_L}px`,
  },
  right: {
    alignContent: 'right',
    textAlign: 'right',

    [MAX_MOBILE]: {
      display: 'none',
    },
  },
  section: {
    height: HEADER_SIZE,
    lineHeight: `${HEADER_SIZE}px`,
  },
  wrapper: {
    backgroundColor: TEXT_WHITE,
    borderBottom: `1px solid ${HEADER_BORDER}`,
    color: BLACK,
    flexShrink: 0,
    height: HEADER_SIZE,
    width: '100%',
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
}

const unstyledHeader = ({ classes }: IOwnProps) => (
  <header className={classes.wrapper}>
    <div className={classes.content}>
      <div className={classnames(classes.section, classes.left)}>
        <ul className={classes.list}>
          <li className={classes.listElement}>
            <RouterLink className={classnames(classes.link, classes.highlighted)} to={HOME}>
              Icons Gallery
            </RouterLink>
          </li>
          <li className={classes.listElement}>
            <Label>v{APP_VERSION}</Label>
          </li>
        </ul>
      </div>
      <div className={classnames(classes.section, classes.right)}>
        <ul className={classes.list}>
          <li className={classes.listElement}>
            <Link
              options={{
                className: classes.link,
                id: 'app-github',
                isExternal: true,
                label: 'Github',
                to: APP_REPOSITORY,
              }}
            />
          </li>
        </ul>
      </div>
    </div>
  </header>
);

const Header = injectSheet(sheet)(unstyledHeader);

export default Header;
