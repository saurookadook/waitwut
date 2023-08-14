import React, { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import {
    GenericHeading, // <- to force formatting
    GenericContainer,
    LocationText,
    NameAndLocationWrapper,
    ToggleIcon,
} from '../components';
import { themeColors, resumeTheme } from '../../../themes';
import { toKebabCase } from '../../../utils';

const EmploymentItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    padding-right: 10vw;
    padding-left: 10vw;
    z-index: 1;

    &.collapsed {
        flex: 0;
        max-height: min-content;
        /* padding: 0.5em 10vw; */
        padding-top: 0.5em;
        padding-bottom: 0.5em;
        transition: all 300ms ease-out;
    }

    &.expanded {
        flex: 1;
        max-height: 100%;
        /* padding: 1em 10vw; */
        padding-top: 1em;
        padding-bottom: 1em;
        transition: all 300ms ease-in;

        &.pluralsight {
            background-color: ${resumeTheme.psBackgroundHex};
        }

        &.salesforce {
            background-color: ${resumeTheme.salesforceBeigeBgRgb};
        }

        &.evergage {
            background-color: ${themeColors.whiteRgb};
        }

        &.upstatement {
            background-color: ${themeColors.blackRgb};
        }

        &.boston-symphony-orchestra {
            background-color: ${resumeTheme.bsoBgHex};
        }
    }
`;

const CompanyName = styled.h3`
    margin-bottom: 0;
    transition: all 300ms ease-in;
    z-index: 1;

    &:hover {
        cursor: pointer;
    }

    .expanded.pluralsight & {
        color: ${resumeTheme.psActionTextHex};
    }

    .expanded.salesforce & {
        color: ${resumeTheme.salesforceDarkBlueRgb};
    }

    .expanded.evergage & {
        color: ${resumeTheme.evergageBlueHex};
    }

    .expanded.upstatement & {
        color: ${themeColors.whiteRgb};
        font-family: 'TT Ramillas', 'GT America', Arial, Helvetica, Verdana, sans-serif;
    }

    .expanded.boston-symphony-orchestra & {
        color: ${resumeTheme.bsoTextHex};
    }
`;

const ExpandableDetails = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    z-index: 0;

    &.hidden,
    &.hidden * {
        color: transparent;
        flex: 0;
        height: 0;
        max-height: 0;
        opacity: 0;
    }

    &.visible,
    &.visible * {
        flex: 1;
        height: auto;
        max-height: 100%;
        opacity: 1;

        .pluralsight & {
            color: ${resumeTheme.psActionTextHex};
        }

        .salesforce & {
            color: ${resumeTheme.salesforceLightBlueHex};
        }

        .evergage & {
            color: ${resumeTheme.evergageGrayHex};
        }

        .upstatement & {
            color: ${themeColors.whiteRgb};
        }

        .boston-symphony-orchestra & {
            color: ${resumeTheme.bsoTextHex};
        }
    }
`;

const ExpandableDetailsItemWrapper = styled.div`
    display: flex;
    width: fit-content;

    &.location-wrapper {
        margin-bottom: 0.5em;
    }

    &.flex-column {
        flex-direction: column;
    }

    & a,
    & a:hover {
        text-decoration: underline;
    }
`;

interface EmploymentItemProps {
    employmentRecord: EmploymentRecord;
}

const EmploymentItem = ({ employmentRecord }: EmploymentItemProps): React.ReactElement => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleToggleOnClick = (): void => setIsCollapsed(!isCollapsed);

    const { company, roles, responsibilities } = employmentRecord;

    const companyNameClass = toKebabCase(company.name).toLowerCase();

    const collapsedOrExpanded = (): 'collapsed' | 'expanded' => (isCollapsed ? 'collapsed' : 'expanded');
    const hiddenOrVisible = (): 'hidden' | 'visible' => (isCollapsed ? 'hidden' : 'visible');

    return (
        <EmploymentItemContainer className={classNames(collapsedOrExpanded(), companyNameClass)}>
            <NameAndLocationWrapper>
                <ToggleIcon onClick={handleToggleOnClick as MouseEventHandler}>
                    {isCollapsed ? <ExpandLess /> : <ExpandMore />}
                </ToggleIcon>
                <CompanyName onClick={handleToggleOnClick as MouseEventHandler}>{company.name}</CompanyName>
                <LocationText className={hiddenOrVisible()}>
                    {company.location.city}, {company.location.state}
                </LocationText>
            </NameAndLocationWrapper>
            <ExpandableDetails className={hiddenOrVisible()}>
                <ExpandableDetailsItemWrapper className="flex-column">
                    {roles.map(
                        (role, i): React.ReactElement => (
                            <span key={`role-item-${i}`}>
                                <b>{role.title}</b> :: <i>{`${role.startDate} - ${role.endDate}`}</i>
                            </span>
                        ),
                    )}
                </ExpandableDetailsItemWrapper>
                {(responsibilities || []).length >= 1 ? (
                    <ExpandableDetailsItemWrapper>
                        <ul>
                            {responsibilities?.map((responsibility, j) => (
                                <li key={`responsibility-${j}`} dangerouslySetInnerHTML={{ __html: responsibility }} />
                            ))}
                        </ul>
                    </ExpandableDetailsItemWrapper>
                ) : null}
            </ExpandableDetails>
        </EmploymentItemContainer>
    );
};

const Employment = ({ heading, data }: SectionComponentProps): React.ReactElement => {
    return (
        <GenericContainer
            overrides={{
                // <- to force formatting
                backgroundColor: themeColors.darkerPurpleHex,
                color: themeColors.white,
                padding: '2em 0',
            }}
        >
            <GenericHeading overrides={{ padding: '0 10vw 0.25em' }}>{heading}</GenericHeading>
            {data.map((record, i) => (
                <EmploymentItem key={`employment-item-${i}`} employmentRecord={record} />
            ))}
        </GenericContainer>
    );
};

export default Employment;
