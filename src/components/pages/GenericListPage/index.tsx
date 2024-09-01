import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { Typography } from '@mui/material';

import { defaultTheme } from 'themes';
import { SheetContentContainer, SheetLineItem, SheetLineItemLink, StyledUl } from './styled';

const GenericListPage = ({
    nodes, // force formatting
}: {
    nodes: NodeFromQuery[];
}): React.ReactElement => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <SheetContentContainer>
                {(nodes || []).length > 0 ? (
                    <StyledUl>
                        {nodes.map((node: NodeFromQuery, index: number): React.ReactElement => {
                            const { fullPath, sectionSlug, title } = node.frontmatter;
                            return (
                                <SheetLineItem key={`${sectionSlug}-link-${index}`}>
                                    <SheetLineItemLink to={fullPath}>{title}</SheetLineItemLink>
                                </SheetLineItem>
                            );
                        })}
                    </StyledUl>
                ) : (
                    <Typography variant="h2">{`Some day, I'll have content 🙂`}</Typography>
                )}
            </SheetContentContainer>
        </ThemeProvider>
    );
};

export default GenericListPage;
