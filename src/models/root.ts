import { CSSProperties } from 'react-jss';
import { combineReducers } from 'redux';

import iconsReducer from '../app/reducers/icons';

import { IIconsState } from './icons';

export interface IDefaultAction {
  type: string;
  payload?: any;
}

export interface IRootState {
  icons: IIconsState;
}

export const createRootReducer = () =>
  combineReducers({
    icons: iconsReducer,
  });

export interface ISheet {
  [key: string]: CSSProperties<any>;
}
