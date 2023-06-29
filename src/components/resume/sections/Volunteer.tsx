import React, { useState } from 'react';
import styled from 'styled-components';

import { GenericHeading, GenericContainer, LocationText, NameAndLocationWrapper } from '../components';
import { themeColors } from '../../../themes';

const VolunteerItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
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
    }
`;

const OrganizationName = styled.h3`
    margin-bottom: 0;
    transition: all 300ms ease-in;
    z-index: 1;

    &:hover {
        cursor: pointer;
    }
`;

const VolunteerItemDetailWrapper = styled.div`
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
    }
`;

interface VolunteerItemProps {
    volunteerRecord: VolunteerRecord;
}

const VolunteerItem = ({ volunteerRecord }: VolunteerItemProps): React.ReactElement => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const { organization, roles } = volunteerRecord;

    return (
        <VolunteerItemContainer className={`${isCollapsed ? 'collapsed' : 'expanded'}`}>
            <NameAndLocationWrapper>
                <OrganizationName onClick={() => setIsCollapsed(!isCollapsed)}>{organization.name}</OrganizationName>
                <LocationText className={`${isCollapsed ? 'hidden' : 'visible'}`}>
                    {organization.location.city}, {organization.location.state}
                </LocationText>
            </NameAndLocationWrapper>
            <VolunteerItemDetailWrapper className={`${isCollapsed ? 'hidden' : 'visible'}`}>
                {roles.map(
                    (role, i): React.ReactElement => (
                        <span key={`role-item-${i}`}>
                            <b>{role.title}</b> :: <i>{`${role.startDate} - ${role.endDate}`}</i>
                        </span>
                    ),
                )}
            </VolunteerItemDetailWrapper>
        </VolunteerItemContainer>
    );
};

const Volunteer = ({ heading, data }: SectionComponentProps): React.ReactElement => {
    return (
        <GenericContainer
            overrides={{
                backgroundColor: themeColors.operatorAqua,
                color: themeColors.blackHex,
                padding: '2em 10vw',
            }}
        >
            <GenericHeading overrides={{ paddingBottom: '0.25em' }}>{heading}</GenericHeading>
            {data.map((record, i) => (
                <VolunteerItem key={`volunteer-item-${i}`} volunteerRecord={record} />
            ))}
        </GenericContainer>
    );
};

export default Volunteer;
