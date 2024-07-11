import React, { useContext, useState } from 'react';

import { DispatchContext } from 'common/contexts';
import { closeMenuDrawer } from 'store/actions';
import { LinkGroupWrapper, StyledNavLink, ChildLinkGroupWrapper } from './styled';

/**
 * @notes Maybe {@link https://mui.com/material-ui/react-list/|MUI's List component} would be better?
 */
const MenuNavLinkGroup = ({
    depth,
    navLink,
    parentPath,
}: {
    depth: number;
    key?: string;
    navLink: NavLinkItem;
    parentPath?: string;
}): React.ReactElement => {
    // TODO: implement some kind of system for expanding/collapsing items
    const [isClosed, setIsOpen] = useState(depth > 1);
    const dispatch = useContext(DispatchContext);

    const fullPath = navLink.fullPath || `${parentPath || ''}/${navLink.slug}`;
    const { children, label, slug } = navLink || {};

    return (
        <LinkGroupWrapper>
            <StyledNavLink to={fullPath} onClick={() => closeMenuDrawer({ dispatch })}>
                <span>{label}</span>
            </StyledNavLink>

            {(children || []).length > 0 && (
                <ChildLinkGroupWrapper
                // style={{ marginLeft: `${(depth + 1) * 1}em` }}
                >
                    {(children || []).map((childNavLink, childIndex) => (
                        <MenuNavLinkGroup
                            depth={depth + 1}
                            key={`${childIndex}:${slug}`}
                            navLink={childNavLink}
                            parentPath={fullPath}
                        />
                    ))}
                </ChildLinkGroupWrapper>
            )}
        </LinkGroupWrapper>
    );
};

export default MenuNavLinkGroup;
