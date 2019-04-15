import * as React from 'react';

import Space from './space';

interface IOwnProps {
  options: {
    customIcon?: React.ReactElement<{}>;
    iconLast?: boolean;
    label?: string;
  };
}

const TouchableContent = ({ options: { customIcon, iconLast, label } }: IOwnProps) => {
  if (customIcon) {
    return (
      <span>
        {!iconLast && customIcon}
        {!iconLast && label && <Space />}
        {label}
        {iconLast && label && <Space />}
        {iconLast && customIcon}
      </span>
    );
  }

  return <span>{label}</span>;
};

export default TouchableContent;
