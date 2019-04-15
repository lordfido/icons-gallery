import qs from 'query-string';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import IconList from './modules/icon-list';

import * as routes from '../constants/appRoutes';
import { IDefaultOptions } from '../models/icons';

interface IRouteProps {
  id?: string;
  query?: string;
}

interface IRouteConfig {
  exact?: boolean;
  path: string;
  render: (routeProps: RouteComponentProps<IRouteProps>) => React.ReactNode;
}

export const HOME: IRouteConfig = {
  exact: true,
  path: routes.HOME,
  render: ({ location }) => {
    const { search } = location;
    const parsedData = qs.parse(search);
    // @ts-ignore
    const defaultOptions =
      parsedData.fileName && parsedData.brand
        ? ({
            ...parsedData,
            background: parsedData.background ? `#${parsedData.background}` : undefined,
            foreground: parsedData.foreground ? `#${parsedData.foreground}` : undefined,
          } as IDefaultOptions)
        : undefined;

    // @ts-ignore
    return <IconList defaultOptions={defaultOptions} />;
  },
};

export default [HOME];
