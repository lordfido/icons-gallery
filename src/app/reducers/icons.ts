import searchEngine from '../utils/search-engine';

import {
  ICONS_CREATE_LIBRARY,
  ICONS_FILTER,
  ICONS_SELECT,
  ICONS_SELECT_NEXT,
  ICONS_SELECT_PREV,
  ICONS_UNSELECT,
} from '../../constants/actionTypes';

import { IIconsCollection } from '../../constants/icons';
import { iconsInitialState, IIcon, IIconsAction, IIconsState } from '../../models/icons';

const getIconIndex = (collection: IIconsCollection, icon: IIcon) =>
  collection[icon.brand].findIndex(i => i.fileName === icon.fileName);

const getNextIcon = (collection: IIconsCollection, icon: IIcon) => {
  const brandCollection = collection[icon.brand];
  const iconIndex = getIconIndex(collection, icon);
  const nextIconIndex = iconIndex < brandCollection.length - 1 ? iconIndex + 1 : 0;

  return collection[icon.brand][nextIconIndex];
};

const getPrevIcon = (collection: IIconsCollection, icon: IIcon) => {
  const brandCollection = collection[icon.brand];
  const iconIndex = getIconIndex(collection, icon);
  const prevIconIndex = iconIndex > 0 ? iconIndex - 1 : brandCollection.length - 1;

  return collection[icon.brand][prevIconIndex];
};

const reducer = (state = iconsInitialState, action: IIconsAction) => {
  const filteredCollection = getFilteredIcons(state);

  switch (action.type) {
    case ICONS_CREATE_LIBRARY:
      return {
        ...state,
        collection: action.payload.collection,
      };

    case ICONS_SELECT:
      const { brand, fileName } = action.payload as IIcon;
      const selected = state.collection[brand].find(i => i.fileName === fileName);

      return {
        ...state,
        selected,
      };

    case ICONS_SELECT_NEXT:
      return {
        ...state,
        selected: state.selected ? getNextIcon(filteredCollection, state.selected) : undefined,
      };

    case ICONS_SELECT_PREV:
      return {
        ...state,
        selected: state.selected ? getPrevIcon(filteredCollection, state.selected) : undefined,
      };

    case ICONS_UNSELECT:
      return {
        ...state,
        selected: undefined,
      };

    case ICONS_FILTER:
      return {
        ...state,
        filters: action.payload,
      };

    default:
      return state;
  }
};

export const getIcons = (state: IIconsState) => state.collection;
export const getFilteredIcons = (state: IIconsState) => searchEngine(state.collection, state.filters || '');
export const getSelectedIcon = (state: IIconsState) => state.selected;
export const getAvailableBrands = (state: IIconsState) => (fileName: string) => {
  const availableBrands: string[] = [];

  Object.keys(state.collection).forEach(brandName => {
    const brand = state.collection[brandName];
    const icon = brand.find(i => i.fileName === fileName);

    if (icon) {
      availableBrands.push(brandName);
    }
  });

  return availableBrands;
};

export default reducer;
