import React, { useContext } from 'react';

import { DispatchContext } from 'common/contexts';
import { closeMenuDrawer } from 'store/actions';
import {
    LinkGroupWrapper, // force formatting
    StyledNavLink,
    ChildLinkGroupWrapper,
    ChildLinkGroupDetails,
    ChildLinkGroupSummary,
} from './styled';

const CollapsibleNavLinkGroup = ({
    depth,
    dispatch,
    fullPath,
    navLink,
}: React.PropsWithChildren & {
    depth: number;
    dispatch: React.Dispatch<BaseReducerAction>;
    fullPath: string;
    navLink: NavLinkItem;
}) => {
    return (
        <ChildLinkGroupDetails open={depth === 0}>
            <ChildLinkGroupSummary>
                <StyledNavLink to={fullPath} onClick={() => closeMenuDrawer({ dispatch })}>
                    <span>{navLink.label}</span>
                </StyledNavLink>
            </ChildLinkGroupSummary>

            {(navLink.children || []).length > 0 && (
                <ChildLinkGroupWrapper
                // style={{ marginLeft: `${(depth + 1) * 1}em` }}
                >
                    {(navLink.children || []).map((childNavLink, childIndex) => {
                        return (
                            <MenuNavLinkGroup
                                depth={depth + 1}
                                key={`${childIndex}:${navLink.slug}`}
                                navLink={childNavLink}
                                parentPath={fullPath}
                            />
                        );
                    })}
                </ChildLinkGroupWrapper>
            )}
        </ChildLinkGroupDetails>
    );
};

/**
 * @notes Maybe {@link https://mui.com/material-ui/react-list/|MUI's List component} would be better?
 */
const MenuNavLinkGroup = ({
    depth,
    navLink,
    parentPath,
}: React.PropsWithChildren & {
    depth: number;
    navLink: NavLinkItem;
    parentPath?: string;
}): React.ReactElement => {
    const dispatch = useContext(DispatchContext);

    const fullPath = navLink.fullPath || `${parentPath || ''}/${navLink.slug}`;

    return (
        <LinkGroupWrapper>
            {(navLink.children || []).length > 0 ? (
                <CollapsibleNavLinkGroup depth={depth} dispatch={dispatch} fullPath={fullPath} navLink={navLink} />
            ) : (
                <StyledNavLink to={fullPath} onClick={() => closeMenuDrawer({ dispatch })}>
                    <span>{navLink.label}</span>
                </StyledNavLink>
            )}
        </LinkGroupWrapper>
    );
};

export default MenuNavLinkGroup;
