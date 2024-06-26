export const toTitleCase = (string: string): string => {
    return string.replace(/[A-Z]\w*?(?=[A-Z]|$)/gm, (match, ...args) => {
        const offsetIndex = typeof args.at(-1) === 'object' ? args.at(-3) : args.at(-2);
        return offsetIndex === 0 ? `${match}` : ` ${match}`;
    });
};

export const toKebabCase = (string: string): string => {
    return string.trim().replace(/^[A-Z]|(\s+)?([A-Z])/gm, (match, p1, p2) => {
        if (p1 == null && p2 == null) {
            return match.toLowerCase();
        }

        return p2 != null ? `-${p2.toLowerCase()}` : '-';
    });
};

// TODO: I feel like this would be nicer :)
// // @ts-ignore
// String.prototype.__proto__.toTitleCase = (string: string): string => {
//     return string.replace(/[A-Z]\w*?(?=[A-Z]|$)/gm, (match, ...args) => {
//         const offsetIndex = typeof args.at(-1) === 'object' ? args.at(-3) : args.at(-2);
//         return offsetIndex === 0 ? `${match}` : ` ${match}`;
//     });
// };

// // @ts-ignore
// String.prototype.__proto__.toKebabCase = (string: string): string => {
//     return string.trim().replace(/\s+/gim, '-');
// };

export const collapsedOrExpanded = (predicate: boolean): 'collapsed' | 'expanded' =>
    predicate ? 'collapsed' : 'expanded';

export const isResumePage = (pathUri: string): boolean => /\/resume(?=(\/)?([?&#].*$|$))/gim.test(pathUri);

export const isWindowDefined = (): boolean => typeof window !== 'undefined';
