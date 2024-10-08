import styled from 'styled-components';

const PageTitle = styled.h1`
    align-items: center;
    display: flex;
    flex-direction: row;

    & > svg {
        height: 1.75em;
        margin-right: 0.25em;
        width: 1.75em;
    }

    & > span {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const MarkdownContent = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
`;

export { PageTitle, MarkdownContent };
