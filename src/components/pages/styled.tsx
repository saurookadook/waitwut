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

export { HeadingAccent, ParagraphLines, PageItem, Description };
