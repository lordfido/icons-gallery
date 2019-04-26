import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

import CustomLink from './link';
import TouchableContent from './touchable-content';

import { PADDING_S, PADDING_XL, PADDING_XXXL } from '../../constants/styles/styles';
import { FONT_M, TEXT_WHITE } from '../../constants/styles/styles-fonts';
import { BUTTON_BACKGROUND } from '../../constants/styles/styles-skin';

import { ISheet } from '../../models/root';
import { IButtonProps as ButtonProps } from '../modules/forms/form.models';

const sheet: ISheet = {
  wrapper: {
    background: BUTTON_BACKGROUND,
    border: 'none',
    borderRadius: 8,
    color: TEXT_WHITE,
    cursor: 'pointer',
    display: 'inline-block',
    fontFamily: 'inherit',
    fontSize: FONT_M,
    lineHeight: 1,
    margin: `${PADDING_S}px ${PADDING_S / 2}px`,
    maxWidth: `calc(100% - ${PADDING_S}px)`,
    padding: `${PADDING_XL}px ${PADDING_XXXL}px`,
    textAlign: 'center',
    textTransform: 'uppercase',
    verticalAlign: 'middle',

    '&, &:active, &:focus, &:hover': {
      textDecoration: 'none',
    },

    '&:focus, &:hover': {
      animation: 'button-flashing 1s linear infinite',
    },
  },
};

export type IButtonProps = ButtonProps;

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  download?: string;
  options: IButtonProps;
}

const unstyledButton = ({ classes, className, download, options }: IOwnProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const { isDisabled, onClick } = options;

    if (onClick && !isDisabled) {
      onClick(event);
    }
  };

  const buttonClasses = {
    button: classnames(classes.content, {
      [classes.contentActive]: options.isActive,
      [classes.contentDisabled]: options.isDisabled,
    }),
    wrapper: classnames(classes.wrapper, options.className, className, {
      [classes.wrapperActive]: options.isActive,
      [classes.wrapperDisabled]: options.isDisabled,
    }),
  };

  if (options.to && (options.isExternal || options.download)) {
    const { type, ...opt } = options;
    return <CustomLink options={{ ...opt, className: buttonClasses.wrapper }} buttonLike />;
  }

  if (options.to) {
    return (
      <Link id={options.id} className={buttonClasses.wrapper} to={{ pathname: options.to }} download={download}>
        <span className={buttonClasses.button}>
          <TouchableContent
            options={{
              iconLast: options.iconLast,
              label: options.label,
            }}
          />
        </span>
      </Link>
    );
  }

  const touchable = {
    customIcon: options.customIcon,
    iconLast: options.iconLast,
    label: options.label,
  };

  return (
    <button
      id={options.id}
      type={options.type}
      className={buttonClasses.wrapper}
      onClick={handleClick}
      disabled={options.isDisabled}
    >
      <span className={buttonClasses.button}>
        <TouchableContent options={touchable} />
      </span>
    </button>
  );
};

const Button = injectSheet(sheet)(unstyledButton);

export default Button;
