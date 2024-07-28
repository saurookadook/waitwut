import React, { useContext } from 'react';

import { DispatchContext } from 'common/contexts';
import { closeMenuDrawer } from 'store/actions';
import { StyledNavLink, ChildLinkWrapper } from './styled';

const MenuNavLink = ({
    depth,
    navLink,
    parentPath,
}: {
    depth: number;
    key?: string;
    navLink: NavLinkItem;
    parentPath?: string;
}): React.ReactElement => {
    const dispatch = useContext(DispatchContext);

    const fullPath = navLink.fullPath || `${parentPath || ''}/${navLink.slug}`;
    const { children, label, slug } = navLink || {};

    return (
        <>
            <StyledNavLink to={fullPath} onClick={() => closeMenuDrawer({ dispatch })}>
                <span>{label}</span>
            </StyledNavLink>

            {(children || []).length > 0 && (
                <ChildLinkWrapper style={{ marginLeft: `${(depth + 1) * 1}em` }}>
                    {(children || []).map((childNavLink, childIndex) => {
                        return (
                            <MenuNavLink
                                depth={depth + 1}
                                key={`${childIndex}:${slug}`}
                                navLink={childNavLink}
                                parentPath={fullPath}
                            />
                        );
                    })}
                </ChildLinkWrapper>
            )}
        </>
    );
};

export default MenuNavLink;
