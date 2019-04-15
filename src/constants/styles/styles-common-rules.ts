import { BORDER_RADIUS, PADDING_M, PADDING_S, PADDING_XL } from './styles';
import { DISABLED_BACKGROUND, DISABLED_BORDER, DISABLED_COLOR, GREY_LIGHT, WHITE } from './styles-colors';
import { FONT_L } from './styles-fonts';
import { INPUT_BORDER_COLOR, INPUT_BORDER_COLOR_FOCUSED } from './styles-skin';

import { ISheet } from '../../models/root';

// FIELDS
export const formInputStyles: ISheet = {
  field: {
    appearance: 'none',
    backgroundColor: WHITE,
    border: `1px solid ${INPUT_BORDER_COLOR}`,
    borderRadius: BORDER_RADIUS,
    color: 'inherit',
    display: 'block',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: '1.3em',
    minHeight: 38,
    outline: 'none',
    padding: `${PADDING_S}px ${PADDING_M}px`,
    textAlign: 'inherit',
    verticalAlign: 'middle',
    width: '100%',

    '&::placeholder': {
      color: GREY_LIGHT,
    },

    '&:active, &:focus': {
      border: `1px solid ${INPUT_BORDER_COLOR_FOCUSED}`,
      boxShadow: `0 0 0 1px ${INPUT_BORDER_COLOR_FOCUSED}`,
    },
  },
  fieldDisabled: {
    backgroundColor: DISABLED_BACKGROUND,
    borderColor: DISABLED_BORDER,
    color: DISABLED_COLOR,
    cursor: 'not-allowed',
  },
  label: {
    display: 'block',
    textAlign: 'inherit',
    width: '100%',
  },
  wrapper: {
    color: 'inherit',
    display: 'inline-block',
    fontSize: FONT_L,
    margin: PADDING_M,
    marginTop: PADDING_XL,
    position: 'relative',
    textAlign: 'left',
    width: `calc(100% - ${PADDING_XL}px)`,
  },
};
