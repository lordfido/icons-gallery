import { IIconsCollection } from '../../constants/icons';
import { IIcon } from '../../models/icons';

const doesAnyKeywordMatchAnyTag = (icon: IIcon, keywords: string[]) => {
  let matches = false;
  keywords.forEach(keyword => {
    icon.tags.forEach(tag => {
      if (new RegExp(keyword).test(tag.toLowerCase())) {
        matches = true;
      }
    });
  });
  return matches;
};

const doesAnyKeywordMatchColor = (icon: IIcon, keywords: string[]) => {
  let matches = false;

  if (!icon.color) {
    return false;
  }

  keywords.forEach(keyword => {
    // @ts-ignore
    if (new RegExp(`^${keyword}`).test(icon.color.toLowerCase())) {
      matches = true;
    }
  });
  return matches;
};

const doesAnyKeywordMatchSize = (icon: IIcon, keywords: string[]) => {
  let matches = false;

  keywords.forEach(keyword => {
    if (new RegExp(`^${keyword}`).test(icon.size.toLowerCase())) {
      matches = true;
    }
  });
  return matches;
};

const searchEngine = (collection: IIconsCollection, filters: string) => {
  if (!filters || filters === '') {
    return collection;
  }

  const keywords = filters
    .toLowerCase()
    .trim()
    .split(' ');
  const newIcons: IIconsCollection = {};

  Object.keys(collection).forEach(brandName => {
    newIcons[brandName] = collection[brandName].filter(
      icon =>
        doesAnyKeywordMatchAnyTag(icon, keywords) ||
        doesAnyKeywordMatchColor(icon, keywords) ||
        doesAnyKeywordMatchSize(icon, keywords)
    );
  });

  return newIcons;
};

export default searchEngine;
