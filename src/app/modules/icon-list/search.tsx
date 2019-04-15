import * as React from 'react';
import injectSheet from 'react-jss';

import Buttons from '../../components/buttons';
import { GRID, LIST, ViewMode } from './list-item';
import SearchField from './searchField';

import { PADDING_XXXL } from '../../../constants/styles/styles';
import { WHITE } from '../../../constants/styles/styles-colors';
import { HEADER } from '../../../constants/styles/styles-zindex';

import { ISheet } from '../../../models/root';
import { IFieldOutput } from '../forms/form.models';

const sheet: ISheet = {
  searchPanel: {
    backgroundColor: WHITE,
    margin: `${PADDING_XXXL}px auto`,
    position: 'sticky',
    top: -1,
    zIndex: HEADER,
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  handleFilterChange: (e: IFieldOutput) => void;
  handleViewModeChange: (viewMode: ViewMode) => void;
  iconsCount: number;
}

const UnstyledSearch = ({ classes, handleFilterChange, handleViewModeChange, iconsCount }: IOwnProps) => (
  <>
    <div className={classes.searchPanel}>
      <SearchField
        options={{
          id: 'icons-search',
          label: iconsCount.toString(),
          onChange: handleFilterChange,
          placeholder: `Search ${iconsCount} icons`,
          type: 'text',
        }}
      />
    </div>

    <Buttons
      options={[
        {
          customIcon: <i className="material-icons">view_list</i>,
          id: 'list',
          onClick: () => {
            handleViewModeChange(LIST);
          },
          type: 'button',
        },
        {
          customIcon: <i className="material-icons">view_module</i>,
          id: 'grid',
          onClick: () => {
            handleViewModeChange(GRID);
          },
          type: 'button',
        },
      ]}
    />
  </>
);

const Search = injectSheet(sheet)(UnstyledSearch);

export default Search;
