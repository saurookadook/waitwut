import React from 'react';

import { PageContentWrapper } from 'components/pages/styled';
import { PageTitle, MarkdownContent } from './styled';

const GenericMarkdownPage = ({
    iconComponent,
    pageHtml,
    title,
    ...props
}: GenericMarkdownPageProps) => {
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
