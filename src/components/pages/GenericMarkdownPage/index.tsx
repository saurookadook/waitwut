import React from 'react';

import { PageContentWrapper } from 'components/pages/styled';
import { PageTitle } from './styled';

// @ts-expect-error: need to define the type for markdown-only props
const GenericMarkdownPage = ({ iconComponent, pageHtml, title, ...props }) => {
    return (
        <PageContentWrapper {...props}>
            <PageTitle>
                {iconComponent()}
                <span>{title}</span>
            </PageTitle>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: pageHtml }} />
        </PageContentWrapper>
    );
};

export default GenericMarkdownPage;
