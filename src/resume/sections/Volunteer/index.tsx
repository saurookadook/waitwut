import React, { MouseEventHandler, useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import {
    GenericHeading, // force formatting
    GenericContainer,
    LocationText,
    NameAndLocationWrapper,
    ToggleIcon,
} from 'resume/styled';
import { themeColors } from 'themes/index';
import { collapsedOrExpanded } from 'utils/index';
import {
    VolunteerItemContainer, // force formatting
    OrganizationName,
    VolunteerItemDetailWrapper,
} from './styled';

const VolunteerItem = ({
    volunteerRecord, // force formatting
}: {
    volunteerRecord: VolunteerRecord;
}): React.ReactElement => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const handleToggleOnClick = (): void => setIsCollapsed(!isCollapsed);

    const { organization, roles } = volunteerRecord;

    return (
        <VolunteerItemContainer className={collapsedOrExpanded(isCollapsed)}>
            <NameAndLocationWrapper>
                <ToggleIcon onClick={handleToggleOnClick as MouseEventHandler}>
                    {isCollapsed ? <ExpandLess /> : <ExpandMore />}
                </ToggleIcon>
                <OrganizationName onClick={handleToggleOnClick as MouseEventHandler}>
                    {organization.name}
                </OrganizationName>
                <LocationText className="togglable">
                    {organization.location.city}, {organization.location.state}
                </LocationText>
            </NameAndLocationWrapper>
            <VolunteerItemDetailWrapper className="togglable">
                {roles.map(
                    (role, i): React.ReactElement => (
                        <span className="role-item" key={`role-item-${i}`}>
                            <b>{role.title}</b>{' '}
                            <span className="role-item-dates">
                                :: <i>{`${role.startDate} - ${role.endDate}`}</i>
                            </span>
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
