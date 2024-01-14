import React from 'react';
import styled from 'styled-components';

const StyledLinkWrapper = styled.a``;

export const LinkWrapper = ({ ...props }): React.ReactElement => {
    return <StyledLinkWrapper {...props}>{props.children}</StyledLinkWrapper>;
};

export const ExternalLinkWrapper = ({ ...props }): React.ReactElement => {
    return (
        <LinkWrapper {...props} target="_blank" rel="noreferrer">
            {props.children}
        </LinkWrapper>
    );
};

export default {
    LinkWrapper,
    ExternalLinkWrapper,
};
