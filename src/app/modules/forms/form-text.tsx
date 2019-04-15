import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { PADDING_L } from '../../../constants/styles/styles';
import { formInputStyles } from '../../../constants/styles/styles-common-rules';

import { ISheet } from '../../../models/root';
import { ITextOptions, TextOutput } from './form.models';

const sheet: ISheet = {
  field: formInputStyles.field,
  fieldDisabled: formInputStyles.fieldDisabled,
  label: formInputStyles.label,
  textArea: {
    minHeight: 150,
    padding: PADDING_L,
    resize: 'vertical',
  },
  wrapper: formInputStyles.wrapper,
};

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  options: ITextOptions;
  onChange: (value: TextOutput) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const unstyledText = ({ classes, className, options, onChange, onFocus }: IOwnProps) => {
  const onChangeProxy = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <label htmlFor={options.id} data-type={options.type} className={classnames(classes.wrapper, className)}>
      <span className={classes.label}>
        <span>{options.label}</span>
      </span>

      <input
        id={options.id}
        name={options.id}
        type={options.type}
        className={classnames(classes.field, options.className, options.isDisabled ? classes.fieldDisabled : undefined)}
        placeholder={options.placeholder}
        disabled={options.isDisabled}
        required={options.isRequired}
        defaultValue={options.defaultValue}
        value={options.value}
        onChange={onChangeProxy}
        onFocus={onFocus}
        autoComplete="off"
      />

      {options.error && <span className={classes.error}>{options.error}</span>}
    </label>
  );
};

const Text = injectSheet(sheet)(unstyledText);

export default Text;
