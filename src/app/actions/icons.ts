import { ActionCreator } from '../../definitions/action-creator';

import icons from '../../constants/icons';

import {
  ICONS_CREATE_LIBRARY,
  ICONS_FILTER,
  ICONS_SELECT,
  ICONS_SELECT_NEXT,
  ICONS_SELECT_PREV,
  ICONS_UNSELECT,
} from '../../constants/actionTypes';
import { IIcon } from '../../models/icons';

export const createIconsLibrary: ActionCreator = () => dispatch => {
  dispatch({
    payload: {
      collection: icons,
    },
    type: ICONS_CREATE_LIBRARY,
  });
};

export const selectIcon: ActionCreator = (icon: IIcon) => dispatch => {
  dispatch({
    payload: icon,
    type: ICONS_SELECT,
  });
};

export const selectNextIcon: ActionCreator = () => dispatch => {
  dispatch({
    type: ICONS_SELECT_NEXT,
  });
};

export const selectPrevIcon: ActionCreator = () => dispatch => {
  dispatch({
    type: ICONS_SELECT_PREV,
  });
};

export const unselectIcon: ActionCreator = () => dispatch => {
  dispatch({
    type: ICONS_UNSELECT,
  });
};

export const filterIcons: ActionCreator = (filters: string) => dispatch => {
  dispatch({
    payload: filters,
    type: ICONS_FILTER,
  });
};
