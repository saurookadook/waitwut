import React from 'react';

import { PageContentWrapper } from 'components/pages/styled';
import { PageTitle, MarkdownContent } from './styled';

// @ts-expect-error: need to define the type for markdown-only props
const GenericMarkdownPage = ({ iconComponent, pageHtml, title, ...props }) => {
    return (
        <PageContentWrapper {...props}>
            <PageTitle>
                {iconComponent()}
                <span>{title}</span>
            </PageTitle>
            <hr />
            <MarkdownContent
                id="markdown-content" // force formatting
                dangerouslySetInnerHTML={{ __html: pageHtml }}
            />
        </PageContentWrapper>
    );
};

export default GenericMarkdownPage;
