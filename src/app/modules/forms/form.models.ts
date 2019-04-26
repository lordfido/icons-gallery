import { IButtonProps } from '../../components/button';

export type types =
  // Button
  | 'button'

  // Switch
  | 'switch'

  // Dropdowns
  | 'dropdown'
  | 'multi'

  // Text
  | 'email'
  | 'number'
  | 'password'
  | 'text';

interface ICommonProps {
  type: types;
  id: string;
  updateId?: string;

  className?: string;
  label?: string;
  customIcon?: React.ReactElement<{}>;
  iconLast?: boolean;

  isRequired?: boolean;
  isSubmitted?: boolean;
  isDisabled?: boolean;
  isAlwaysDisabled?: boolean;
  isAlwaysEnabled?: boolean;
  isDiactivatable?: boolean;

  onFocus?: (params?: any) => void;
}

export interface IButtonProps extends ICommonProps {
  isActive?: boolean;
  isExternal?: boolean;
  download?: string;
  onClick?: (params?: any) => void;
  to?: string;
  type: 'button';
}

interface ICommonFieldProps extends ICommonProps {
  onChange?: (params: { id: string; value: GenericOutput }) => void;
}

export interface IDropdownOptions extends ICommonFieldProps {
  colourStyles?: any;
  error?: string;
  isMulti?: boolean;
  menuPlacement?: 'auto' | 'bottom' | 'top';
  placeholder?: string;
  defaultValue?: string[];
  options: IOption[];
  type: 'dropdown' | 'multi';
}

export interface IOption {
  id: string;
  label: string;
  value: string;
}

export interface ISwitchOptions extends ICommonFieldProps {
  defaultChecked?: boolean | void;
  isChecked?: boolean;
  options?: [string, string];
  type: 'switch';
}

export interface ITextOptions extends ICommonFieldProps {
  defaultValue?: string;
  error?: string;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
  type: 'email' | 'number' | 'password' | 'text';
  value?: string;
}

export type IGenericField = IButtonProps | IDropdownOptions | ISwitchOptions | ITextOptions;

export type SwitchOutput = boolean;
export type DropdownOutput = IOption | void;
export type MultiOutput = IOption[] | void;
export type TextOutput = string;

export type GenericOutput = DropdownOutput | MultiOutput | SwitchOutput | TextOutput;

export interface IFieldOutput {
  id: string;
  value: GenericOutput;
}
