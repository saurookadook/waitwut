import { createContext } from 'react';

import { pageMap } from '../constants';

// interface PagesBySectionSlug {
//     [key: string]: Record<string, unknown>
// }

// const pagesBySectionSlug = pageMap.reduce((acc, curr) => {
//     acc[curr.sectionSlug] = curr;
//     return acc;
// }, {} as PagesBySectionSlug);

export const PageMapContext = createContext({ pageMap });
