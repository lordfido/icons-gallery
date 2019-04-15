import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import Label from '../../components/label';
import Field from '../forms/field';

import { PADDING_M, PADDING_XL, PADDING_XXL, PADDING_XXXL } from '../../../constants/styles/styles';
import { GREY_LIGHT } from '../../../constants/styles/styles-colors';

import { ISheet } from '../../../models/root';
import { IGenericField } from '../forms/form.models';

const sheet: ISheet = {
  field: {
    padding: PADDING_XL,
    paddingLeft: PADDING_XXXL * 2,
    paddingRight: PADDING_XXXL * 3,
  },
  fieldWrapper: {
    margin: PADDING_M,
  },
  label: {
    position: 'absolute',
    right: PADDING_XL,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  searchIcon: {
    color: GREY_LIGHT,
    verticalAlign: 'middle',
  },
  searchIconWrapper: {
    left: PADDING_XXL,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  wrapper: {
    position: 'relative',
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  options: IGenericField;
}

const UnstyledSearchField = ({ classes, options }: IOwnProps) => {
  const { customIcon, iconLast, label, ...fieldOptions } = options;

  return (
    <div className={classes.wrapper}>
      <Field className={classes.fieldWrapper} options={{ ...fieldOptions, className: classes.field }} />
      <span className={classes.searchIconWrapper}>
        <span className={classnames(classes.searchIcon, 'material-icons')}>search</span>
      </span>
      <Label className={classes.label}>{label}</Label>
    </div>
  );
};

const SearchField = injectSheet(sheet)(UnstyledSearchField);

export default SearchField;
