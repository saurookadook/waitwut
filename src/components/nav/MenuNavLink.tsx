import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import icons from '../icons';

const StyledNavLink = styled(Link)`
    align-items: center;
    color: ${(props) => props?.theme?.color};
    display: flex;
    flex-direction: row;
    font-size: 1.25rem;
    margin-bottom: 0.5em;
    padding-left: 1em;
    text-align: left;
    text-decoration: none;


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
        max-width: 200px;
    }
`;

const ChildLinkWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const MenuNavLink = ({ depth, navLink, parentPath }: MenuNavLinkArgs): React.ReactElement => {
    const fullPath = `${parentPath || ''}/${navLink.slug}`;
    const { children, iconName, label, slug } = navLink || {}
    const iconComponent = (): React.ReactElement | undefined => {
        if (iconName && typeof icons[iconName] === "function") {
            return icons[iconName]()
        }
    };

    console.log({ icons, iconName, navLink });

    return (
        <>
            <StyledNavLink to={fullPath}>
                {iconComponent() || null}
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
