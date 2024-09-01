import styled from 'styled-components';

const HeadingAccent = styled.span`
    color: #663399;
    font-size: 0.75em;
`;

const ParagraphLines = styled.span`
    display: block;
`;

const PageItem = styled.li`
    color: ${(props) => props.color};
    margin-bottom: 1em;
`;

const Description = styled.p`
    color: #232129;
    line-height: 1.25;
    margin-top: 10px;
    margin-bottom: 0px;
`;

const PageContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    & #table-of-contents {
        margin-top: 0;
    }

    & h1#table-of-contents + ul > li {
        width: fit-content;
    }

    & h1#table-of-contents + ul > li:hover {
        transform: scale(1.1);
    }
`;

export { HeadingAccent, ParagraphLines, PageItem, Description, PageContentWrapper };
