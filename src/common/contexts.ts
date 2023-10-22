import React, { createContext } from 'react';

import { pageMap } from 'common/constants';

// interface PagesBySectionSlug {
//     [key: string]: Record<string, unknown>
// }

// const pagesBySectionSlug = pageMap.reduce((acc, curr) => {
//     acc[curr.sectionSlug] = curr;
//     return acc;
// }, {} as PagesBySectionSlug);
export interface HeadMeta {
    children?: React.ReactElement;
    title?: string;
}

const InitialHeadMeta: HeadMeta = {
    title: 'wait wut?',
};

export const HeadMetaContext = createContext(InitialHeadMeta);
export const PageMapContext = createContext({ pageMap });

export const StateContext = createContext<StateSlice>({});
export const DispatchContext = createContext<React.Dispatch<BaseReducerAction>>((a) => null);
