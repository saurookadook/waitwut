import React, { MouseEventHandler, useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import {
    GenericHeading, // <- to force formatting
    GenericContainer,
    LocationText,
    NameAndLocationWrapper,
    ToggleIcon,
} from '../../components';
import { themeColors } from '../../../../themes';
import {
    VolunteerItemContainer, // <- to force formatting
    OrganizationName,
    VolunteerItemDetailWrapper,
} from './styled';

interface VolunteerItemProps {
    volunteerRecord: VolunteerRecord;
}

const VolunteerItem = ({ volunteerRecord }: VolunteerItemProps): React.ReactElement => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleToggleOnClick = (): void => setIsCollapsed(!isCollapsed);

    const { organization, roles } = volunteerRecord;

    return (
        <VolunteerItemContainer className={`${isCollapsed ? 'collapsed' : 'expanded'}`}>
            <NameAndLocationWrapper>
                <ToggleIcon onClick={handleToggleOnClick as MouseEventHandler}>
                    {isCollapsed ? <ExpandLess /> : <ExpandMore />}
                </ToggleIcon>
                <OrganizationName onClick={handleToggleOnClick as MouseEventHandler}>
                    {organization.name}
                </OrganizationName>
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
