import React, { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import { themeColors, resumeTheme } from '../../../themes';
import { toKebabCase } from '../../../utils';

const EmploymentItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    padding: 0 10vw;
    z-index: 1;

    &:hover {
        cursor: pointer;
    }

    &.collapsed {
        flex: 0;
        max-height: min-content;
        transition: all 300ms ease-out;
    }

    &.expanded {
        flex: 1;
        max-height: 100%;
        transition: all 300ms ease-in;

        &.salesforce {
            background-color: ${resumeTheme.salesforceBeigeBgRgb};
        }

        &.evergage {
            background-color: ${themeColors.whiteRgb};
        }

        &.upstatement {
            background-color: ${themeColors.blackRgb};
        }
    }
`;

const CompanyName = styled.h3`
    transition: all 300ms ease-in;
    z-index: 1;

    &:hover {
        cursor: pointer;
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

        .salesforce & {
            color: ${resumeTheme.salesforceLightBlueHex};
        }

        .evergage & {
            color: ${resumeTheme.evergageGrayHex};
        }

        .upstatement & {
            color: ${themeColors.whiteRgb};
        }
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

    return (
        <EmploymentItemContainer
            onClick={handleToggleOnClick as MouseEventHandler}
            className={`${isCollapsed ? 'collapsed' : 'expanded'} ${companyNameClass}`}
        >
            <CompanyName>{company.name}</CompanyName>
            <ExpandableDetails className={`${isCollapsed ? 'hidden' : 'visible'}`}>
                <div>
                    <span>
                        <b>Location:</b> {company.location.city}, {company.location.state}
                    </span>
                    <span>
                        {roles.map(
                            (role, i): React.ReactElement => (
                                <span key={`role-item-${i}`}>
                                    <b>{role.title}</b> :: <em>{`${role.startDate} - ${role.endDate}`}</em>
                                </span>
                            ),
                        )}
                    </span>
                    {responsibilities == null ? null : (
                        <span>
                            <ul>
                                {responsibilities.map((responsibility, j) => (
                                    <li key={`responsibility-${j}`}>{responsibility}</li>
                                ))}
                            </ul>
                        </span>
                    )}
                </div>
            </ExpandableDetails>
        </EmploymentItemContainer>
    );
};

const EmploymentHeading = styled.h2`
    padding: 0 10vw;
`;

const EmploymentContainer = styled.div`
    background-color: ${themeColors.darkerPurpleHex};
    color: ${themeColors.white};
    padding: 1em 0;
`;

const Employment = ({ heading, data }: SectionComponentProps): React.ReactElement => {
    return (
        <EmploymentContainer>
            <EmploymentHeading>{heading}</EmploymentHeading>
            {data.map((record, i) => (
                <EmploymentItem key={`${record.company.name}-${i}`} employmentRecord={record} />
            ))}
        </EmploymentContainer>
    );
};

export default Employment;
