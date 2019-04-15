import { isPre, isProduction } from '../common/utils/platforms';

export const restoreLastRoute = false;
export const cacheOnDemand = isProduction() || isPre();

export const changeIconSize = true;
export const changeIconBackground = true;
export const changeIconForeground = true;
export const showIconLimits = true;
