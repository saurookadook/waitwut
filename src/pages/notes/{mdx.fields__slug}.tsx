import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { compile, run } from '@mdx-js/mdx';
// import type { MDXModule } from '@mdx-js/mdx/lib/run';
import { MDXProvider } from '@mdx-js/react';
import * as runtime from 'react/jsx-runtime';
// import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from 'styled-components';

import icons from 'components/icons';
import { MDXRendererWrapper } from 'components/pages/styled';

const DocTitle = styled.h1`
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

const NotePage = ({ children, data, ...props }: BaseMdxProps & { pageResources: any }): React.ReactElement => {
    const [mdxModule, setMdxModule] = useState();
    const { iconComponentName, title } = data?.mdx?.frontmatter || {};
    console.groupCollapsed(`NotePage: ${title}`);
    console.log(' - children: ', children);
    console.log(' - data: ', data);
    console.log(' - props: ', props);
    console.groupEnd();

    const iconComponent = (): React.ReactElement | undefined => {
        if (iconComponentName && typeof icons[iconComponentName] === 'function') {
            return icons[iconComponentName]({});
        }
    };

    useEffect(() => {
        if (data.mdx.body != null) {
            (async function () {
                const compiledMdxContent = String(
                    await compile(data.mdx.body, {
                        outputFormat: 'function-body',
                        providerImportSource: '@mdx-js/react',
                    }),
                );
                // @ts-expect-error: `runtime` types are currently broken
                setMdxModule(await run(compiledMdxContent, { ...runtime, baseUrl: import.meta.url }));
            })();
        }
    }, [data.mdx.body]);

    // @ts-expect-error: can't import the necessary types :]
    const Content = mdxModule ? mdxModule.default : React.Fragment;

    return (
        <MDXRendererWrapper id="sheet-page-content">
            <DocTitle>
                {iconComponent()}
                <span>{title}</span>
            </DocTitle>
            <hr />
            {/* <MDXRenderer>{data.mdx.body}</MDXRenderer> */}
            <MDXProvider>
                {/* {children || data.mdx.body} */}
                <Content />
            </MDXProvider>
        </MDXRendererWrapper>
    );
};

export const query = graphql`
    query ($id: String) {
        mdx(id: { eq: $id }) {
            frontmatter {
                date(formatString: "MMMM D, YYYY")
                iconComponentName
                title
            }
            body
        }
    }
`;

export default NotePage;
