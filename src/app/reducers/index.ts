// Import reducers
import * as iconsSelectors from './icons';

import { createRootReducer, IRootState } from '../../models/root';

// Declare root reducer
const rootReducer = createRootReducer();

// Custom selectors
export const getIcons = ({ icons }: IRootState) => iconsSelectors.getIcons(icons);
export const getFilteredIcons = ({ icons }: IRootState) => iconsSelectors.getFilteredIcons(icons);
export const getSelectedIcon = ({ icons }: IRootState) => iconsSelectors.getSelectedIcon(icons);
export const getAvailableBrands = ({ icons }: IRootState) => iconsSelectors.getAvailableBrands(icons);

export default rootReducer;
