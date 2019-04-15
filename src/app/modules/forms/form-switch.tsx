import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { PADDING_S } from '../../../constants/styles/styles';
import { formInputStyles } from '../../../constants/styles/styles-common-rules';

import { ISheet } from '../../../models/root';
import { ISwitchOptions, SwitchOutput } from './form.models';

const sheet: ISheet = {
  field: {
    display: 'none',
  },
  label: {
    display: 'inline-block',
    fontFamily: formInputStyles.field.fontFamily,
    fontSize: formInputStyles.field.fontSize,
    lineHeight: formInputStyles.field.lineHeight,
    textAlign: formInputStyles.field.textAlign,
    width: 'calc(100% - 80px)',
  },
  optionLabel: {
    display: 'none',
    flex: 1,
    justifyContent: 'center',
  },
  optionNo: {
    ':checked ~ span > &': {
      display: 'none !important',
    },
    ':not(:checked) ~ span > &': {
      display: 'flex',
    },
  },
  optionYes: {
    ':checked ~ span > &': {
      display: 'flex',
    },
  },
  options: {
    alignItems: 'center',
    display: 'inline-flex',
    flexDirection: 'row',
    marginLeft: PADDING_S,
    textAlign: 'center',
    verticalAlign: 'top',
    width: 76,
  },
  wrapper: {
    ...formInputStyles.field,
    color: formInputStyles.wrapper.color,
    fontSize: formInputStyles.wrapper.fontSize,
    margin: formInputStyles.wrapper.margin,
    marginTop: formInputStyles.wrapper.marginTop,
    paddingBottom: 7,
    paddingTop: 7,
    textAlign: formInputStyles.wrapper.textAlign,
    width: formInputStyles.wrapper.width,

    '&:active, &focus': {
      border: formInputStyles.field.border,
      boxShadow: 'none',
    },
  },
  wrapperDisabled: formInputStyles.fieldDisabled,
};

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  options: ISwitchOptions;
  onChange: (value: SwitchOutput) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const unstyledSwitch = ({ classes, className, options, onChange, onFocus }: IOwnProps) => {
  const onChangeProxy = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label
      htmlFor={options.id}
      data-type={options.type}
      className={classnames(
        classes.wrapper,
        options.className,
        className,
        options.isDisabled ? classes.wrapperDisabled : undefined
      )}
    >
      <input
        id={options.id}
        name={options.id}
        className={classes.field}
        type="checkbox"
        required={options.isRequired}
        disabled={options.isDisabled}
        defaultChecked={!!options.defaultChecked}
        onChange={onChangeProxy}
        onFocus={onFocus}
      />

      <span className={classes.label}>{options.label}</span>

      <span className={classes.options}>
        <span className={classnames(classes.optionLabel, classes.optionNo)}>
          {options.options ? options.options[0] : 'No'}
        </span>
        <span className={classnames(classes.optionLabel, classes.optionYes)}>
          {options.options ? options.options[1] : 'Yes'}
        </span>
      </span>
    </label>
  );
};

const Switch = injectSheet(sheet)(unstyledSwitch);

export default Switch;
