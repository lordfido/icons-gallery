import { AnyAction } from 'redux';

import { IconsActionType } from '../constants/actionTypes';
import { IIconsCollection } from '../constants/icons';

export interface IIcon {
  brand: string;
  color?: string;
  fileName: string;
  image: string;
  size: string;
  tags: string[];
}

export interface IDefaultOptions {
  brand: string;
  background?: string;
  fileName: string;
  foreground?: string;
  size?: string;
}

export interface IIconsAction extends AnyAction {
  type: IconsActionType;
}

export interface IIconsState {
  collection: IIconsCollection;
  filters?: string;
  selected?: IIcon;
}

export const iconsInitialState: IIconsState = {
  collection: {},
  filters: undefined,
  selected: undefined,
};
