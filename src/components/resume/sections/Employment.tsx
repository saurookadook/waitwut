import React, { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import { themeColors, resumeTheme } from '../../../themes';

const EmploymentItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    z-index: 1;

    &:hover {
        cursor: pointer;
    }

    &.collapsed {
        flex: 0;
        max-height: auto;
        transition: all 300ms ease-out;
    }

    &.expanded {
        flex: 1;
        max-height: 100%;
        transition: all 300ms ease-in;
    }
`;

const CompanyName = styled.h3`
    z-index: 1;

    &:hover {
        cursor: pointer;
    }
`;

const ExpandableDetails = styled.div`
    /* &,
    & *:not(span) { */
    display: flex;
    flex-direction: column;
    margin: 0;
    z-index: 0;
    /* } */

    &.hidden,
    &.hidden * {
        flex: 0;
        height: 0;
        max-height: 0;
        opacity: 0;
        transition: all 300ms ease-out;
    }

    &.visible,
    &.visible * {
        flex: 1;
        height: auto;
        max-height: 100%;
        opacity: 1;
        transition: all 300ms ease-in;
    }
`;

interface EmploymentItemProps {
    employmentRecord: EmploymentRecord;
}

const EmploymentItem = ({ employmentRecord }: EmploymentItemProps): React.ReactElement => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleToggleOnClick = (): void => setIsCollapsed(!isCollapsed);

    const { company, roles, responsibilities } = employmentRecord;

    return (
        <EmploymentItemContainer
            onClick={handleToggleOnClick as MouseEventHandler}
            className={isCollapsed ? 'collapsed' : 'expanded'}
        >
            <CompanyName>{company.name}</CompanyName>
            <ExpandableDetails className={isCollapsed ? 'hidden' : 'visible'}>
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

const EmploymentContainer = styled.div`
    background-color: ${themeColors.darkerPurpleHex};
    color: ${themeColors.white};
    padding: 1em 10vw;
`;

const Employment = ({ heading, data }: SectionComponentProps): React.ReactElement => {
    return (
        <EmploymentContainer>
            <h2>{heading}</h2>
            {data.map((record, i) => (
                <EmploymentItem key={`${record.company.name}-${i}`} employmentRecord={record} />
            ))}
        </EmploymentContainer>
    );
};

export default Employment;
