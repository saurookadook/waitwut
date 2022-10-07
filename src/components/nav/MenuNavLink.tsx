import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const StyledNavLink = styled(Link)`
    color: ${(props) => props?.theme?.color};
    font-size: 1.5rem;
    padding: 0 1em;
    text-align: left;
    text-decoration: none;
`;

const ChildLinkWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const MenuNavLink = ({ depth, navLink, parentPath }: MenuNavLinkArgs): React.ReactElement => {
    const fullPath = `${parentPath || ''}/${navLink.slug}`;
    return (
        <>
            <StyledNavLink to={fullPath}>{navLink.label}</StyledNavLink>
            {(navLink.children || []).length > 0 ? (
                <ChildLinkWrapper style={{ marginLeft: `${(depth + 1) * 1}em` }}>
                    {(navLink.children || []).map((childNavLink, childIndex) => (
                        <MenuNavLink
                            depth={depth + 1}
                            key={`${childIndex}:${navLink.slug}`}
                            navLink={childNavLink}
                            parentPath={fullPath}
                        />
                    ))}
                </ChildLinkWrapper>
            ) : null}
        </>
    );
};

export default MenuNavLink;
