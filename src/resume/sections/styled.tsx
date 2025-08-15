const collapsedStyles = `
    max-height: 0;
    opacity: 0;
    /* transition:
      background-color 500ms,
      color 500ms,
      flex 500ms,
      height 500ms,
      max-height 500ms 200ms,
      opacity 250ms; */

    transition: all 500ms;
    transition-timing-function: ease-in;
`;

const expandedStyles = `
    max-height: 100%;
    opacity: 1;
    /* transition:
      background-color 300ms,
      color 300ms,
      flex 300ms,
      height 300ms,
      max-height 300ms,
      opacity 300ms; */

    transition: all 300ms;
    transition-timing-function: ease-in;
`;

export { collapsedStyles, expandedStyles };
