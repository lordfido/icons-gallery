import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { isDev, isPre } from './platforms';

import rootReducer from '../../app/reducers';

import { IRootState } from '../../models/root';

const buildStore = async (persistedStore?: IRootState | void) => {
  // @ts-ignore
  const composeEnhancers = isDev() || isPre() ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;
  // @ts-ignore
  const store = createStore(rootReducer, persistedStore || {}, composeEnhancers(applyMiddleware(thunk)));

  return store;
};

export default buildStore;
