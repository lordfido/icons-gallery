import * as React from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
// @ts-ignore
import { saveSvgAsPng, svgAsPngUri } from 'save-svg-as-png';
import { getLocalStorage, setLocalStorage } from '../../../common/utils/localStorage';
import { downloadFileContent, getDownloadableTemplate, isIcon, replaceColor, replaceSize } from '../../utils/svg';

import List from './list';
import { ViewMode } from './list-item';
import Modal from './modal';
import Search from './search';

import { filterIcons, selectIcon, selectNextIcon, selectPrevIcon, unselectIcon } from '../../actions/icons';
import { getAvailableBrands, getFilteredIcons, getSelectedIcon } from '../../reducers';

import { PAGE_MAX_WIDTH } from '../../../constants/styles/styles';

import { IIconsCollection } from '../../../constants/icons';
import { IDefaultOptions, IIcon } from '../../../models/icons';
import { IRootState, ISheet } from '../../../models/root';
import { IFieldOutput, IOption, TextOutput } from '../forms/form.models';

// tslint:disable:no-empty
const doNothing = () => {};

const sheet: ISheet = {
  container: {
    margin: '0px auto',
    maxWidth: PAGE_MAX_WIDTH,
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  defaultOptions?: IDefaultOptions;
}

interface IStateProps {
  availableBrands: string[];
  icon: IIcon | void;
  icons: IIconsCollection;
  pdfs: IIconsCollection;
}

interface IDispatchProps {
  FilterIcons: (filters: string) => void;
  SelectIcon: (icon: IIcon) => void;
  SelectNextIcon: () => void;
  SelectPrevIcon: () => void;
  UnselectIcon: () => void;
}

type Props = IOwnProps & IStateProps & IDispatchProps;

const UnstyledIconListWrapper = ({
  availableBrands,
  classes,
  defaultOptions,
  FilterIcons,
  icon,
  icons,
  pdfs,
  SelectIcon,
  SelectNextIcon,
  SelectPrevIcon,
  UnselectIcon,
}: Props) => {
  // React Effects
  const reactToDefaultIconEffect = () => {
    if (defaultOptions && !initialized) {
      setInitialized(true);
      SelectIcon({ ...defaultOptions, image: '', size: defaultOptions.size || '', tags: [] });
    }
  };

  const reactToKeyboardEffect = () => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  };

  const reactToDownloadTemplateEffect = () => {
    if (icon) {
      downloadFileContent(icon.image).then(svg => {
        setTemplate(svg);
      });
    }
  };

  // Handlers
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case 27:
        UnselectIcon();
        break;

      case 37:
        SelectPrevIcon();
        break;

      case 39:
        SelectNextIcon();
        break;

      default:
    }
  };

  const handleFilterChange = (event: IFieldOutput) => {
    const filter = event.value as TextOutput;
    FilterIcons(filter);
  };

  const handleViewModeChange = (vm: ViewMode) => {
    setLocalStorage('viewMode', vm);
    return setViewMode(vm);
  };

  const handleSelectIcon = (i: IIcon) => {
    SelectIcon(i);
  };

  const downloadPng = !icon
    ? doNothing
    : (scale: 1 | 2 | 3) => {
        const virtualSvgWrapper = document.createElement('div');
        virtualSvgWrapper.innerHTML = getDownloadableTemplate({ foreground, icon, iconSize, template });

        const options = {
          scale: (Number(iconSize.replace('px', '')) / Number(icon.size.replace('px', ''))) * scale,
        };

        const iconName = scale === 1 ? `${icon.fileName}.png` : `${icon.fileName}@${scale}x.png`;
        saveSvgAsPng(virtualSvgWrapper.firstElementChild, iconName, options);
      };

  const handleDownloadPng = () => {
    if (template) {
      downloadPng(1);
      downloadPng(2);
      downloadPng(3);
    }
  };

  const handleUpdateIconBrand = !icon
    ? doNothing
    : (event: IFieldOutput) => {
        // @ts-ignore
        const data: IOption = event.value;
        SelectIcon({
          ...icon,
          brand: data.value,
        });
      };

  const handleUpdateIconSize = (event: IFieldOutput) => {
    // @ts-ignore
    const data: IOption = event.value;
    setIconSize(data.value);
  };

  const handleUpdateBackground = (color: string) => setBackground(color);

  const handleUpdateForeground = (color: string) => setForeground(color);

  const defaultViewIconLimits = getLocalStorage('viewIconLimits');

  const handleUpdateIconMargins = (event: IFieldOutput) => {
    setLocalStorage('viewIconLimits', event.value ? 'true' : '');
    setViewIconLimits(!!event.value);
  };

  // React States
  const defaultViewMode = getLocalStorage('viewMode');
  const defaultSize = (defaultOptions && defaultOptions.size) || (icon && icon.size) || '24px';
  const defaultBackground = (defaultOptions && defaultOptions.background) || '';
  const defaultForeground = (defaultOptions && defaultOptions.foreground) || '';
  const [initialized, setInitialized] = React.useState(false);
  const [viewMode, setViewMode] = React.useState((defaultViewMode as ViewMode) || ('list' as ViewMode));
  const [template, setTemplate] = React.useState('');
  const [iconSize, setIconSize] = React.useState(defaultSize);
  const [background, setBackground] = React.useState(defaultBackground);
  const [foreground, setForeground] = React.useState(defaultForeground);
  const [viewIconLimits, setViewIconLimits] = React.useState(
    !!(defaultViewIconLimits && defaultViewIconLimits.length > 0)
  );

  // React Effects
  React.useEffect(reactToDefaultIconEffect, [defaultOptions]);
  React.useEffect(reactToKeyboardEffect);
  React.useEffect(reactToDownloadTemplateEffect, [icon]);

  // Other stuff
  let iconsCount = 0;
  Object.keys(icons).forEach(brandName => {
    iconsCount += icons[brandName].length;
  });

  const iconPdf = icon ? pdfs[icon.brand].find(i => i.fileName === icon.fileName) : undefined;

  return (
    <div className={classes.container}>
      <Search
        handleFilterChange={handleFilterChange}
        handleViewModeChange={handleViewModeChange}
        iconsCount={iconsCount}
      />

      <List handleSelectIcon={handleSelectIcon} icons={icons} viewMode={viewMode} />

      {icon && (
        <Modal
          availableBrands={availableBrands}
          background={background}
          foreground={foreground}
          handleDownloadPng={handleDownloadPng}
          handleUnselectIcon={UnselectIcon}
          handleUpdateBackground={handleUpdateBackground}
          handleUpdateForeground={handleUpdateForeground}
          handleUpdateIconBrand={handleUpdateIconBrand}
          handleUpdateIconMargins={handleUpdateIconMargins}
          handleUpdateIconSize={handleUpdateIconSize}
          icon={icon}
          iconSize={iconSize}
          pdf={iconPdf}
          template={
            !icon.color || !foreground
              ? replaceSize(template, icon.size, iconSize)
              : replaceSize(replaceColor(template, icon.color, foreground), icon.size, iconSize)
          }
          viewIconLimits={viewIconLimits}
        />
      )}
    </div>
  );
};

const IconListWrapper = injectSheet(sheet)(UnstyledIconListWrapper);

const mapStateToProps = (state: IRootState): IStateProps => {
  const rawIcons = getFilteredIcons(state);
  const icons: IIconsCollection = {};
  const pdfs: IIconsCollection = {};
  const icon = getSelectedIcon(state);

  Object.keys(rawIcons).forEach(brandName => {
    icons[brandName] = rawIcons[brandName].filter(isIcon);
    pdfs[brandName] = rawIcons[brandName].filter(i => !isIcon(i));
  });

  return {
    availableBrands: icon ? getAvailableBrands(state)(icon.fileName) : [],
    icon,
    icons,
    pdfs,
  };
};

const mapDispatchToProps = {
  FilterIcons: filterIcons,
  SelectIcon: selectIcon,
  SelectNextIcon: selectNextIcon,
  SelectPrevIcon: selectPrevIcon,
  UnselectIcon: unselectIcon,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IconListWrapper);
