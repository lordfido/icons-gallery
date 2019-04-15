import * as React from 'react';

interface IOwnProps {
  className?: string;
  template: string;
}

const DynamicSVG = ({ className, template }: IOwnProps) => {
  let divElement: HTMLDivElement;
  const setDivElement = (element: HTMLDivElement) => {
    divElement = element;
  };

  const updateTemplateColor = () => {
    const coloredTemplate = document.createElement('div');
    coloredTemplate.innerHTML = template;
    divElement.innerHTML = '';
    divElement.appendChild(coloredTemplate);
  };

  React.useEffect(updateTemplateColor, [template]);

  return <div className={className} ref={setDivElement} />;
};

export default DynamicSVG;
