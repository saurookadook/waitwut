export const toTitleCase = (string: string): string => {
    return string.replace(/[A-Z]\w*?(?=[A-Z]|$)/gm, (match, ...args) => {
        const offsetIndex = typeof args.at(-1) === "object" ? args.at(-3) : args.at(-2);
        return offsetIndex === 0 ? `${match}` : ` ${match}`;
    });
};

export const toKebabCase = (string: string): string => {
    return string.trim().replace(/\s+/gim, '-');
}
