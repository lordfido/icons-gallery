import * as React from 'react';
import injectSheet from 'react-jss';

import Header from './shell/header';

import { ISheet } from '../models/root';

const sheet: ISheet = {
  content: {},
  contentWrapper: {},
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'auto',
  },
};
interface IOwnProps {
  children: JSX.Element;
  classes: { [key: string]: string };
}

const unstyledAppView = ({ children, classes }: IOwnProps) => (
  <div id="app" className={classes.wrapper}>
    <Header />
    <div className={classes.contentWrapper}>
      <div className={classes.content}>{children}</div>
    </div>
  </div>
);

const AppView = injectSheet(sheet)(unstyledAppView);

export default AppView;
