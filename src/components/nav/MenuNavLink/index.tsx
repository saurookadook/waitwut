import React from 'react';

import { StyledNavLink, ChildLinkWrapper } from './styled';

const MenuNavLink = ({ depth, navLink, parentPath }: MenuNavLinkProps): React.ReactElement => {
    const fullPath = `${parentPath || ''}/${navLink.slug}`;
    const { children, label, slug } = navLink || {}

    return (
        <>
            <StyledNavLink to={fullPath}>
                <span>
                    {label}
                </span>
            </StyledNavLink>

            {(children || []).length > 0 ? (
                <ChildLinkWrapper style={{ marginLeft: `${(depth + 1) * 1}em` }}>
                    {(children || []).map((childNavLink, childIndex) => (
                        <MenuNavLink
                            depth={depth + 1}
                            key={`${childIndex}:${slug}`}
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
