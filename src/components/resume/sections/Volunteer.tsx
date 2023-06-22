import React from 'react';
import styled from 'styled-components';
import { themeColors } from '../../../themes';

const NameAndLocationWrapper = styled.div`
    align-items: flex-end;
    display: flex;
    flex-direction: row;

    & i {
        margin-left: 1em;
    }
`;

const OrganizationName = styled.h3`
    margin-bottom: 0;
`;

const VolunteerItemDetailWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

interface VolunteerItemProps {
    volunteerRecord: VolunteerRecord;
}

const VolunteerItem = ({ volunteerRecord }: VolunteerItemProps): React.ReactElement => {
    const { organization, roles } = volunteerRecord;

    return (
        <div>
            <NameAndLocationWrapper>
                <OrganizationName>{organization.name}</OrganizationName>
                <i>
                    {organization.location.city}, {organization.location.state}
                </i>
            </NameAndLocationWrapper>
            <VolunteerItemDetailWrapper>
                {roles.map(
                    (role, i): React.ReactElement => (
                        <span key={`role-item-${i}`}>
                            <b>{role.title}</b> :: <i>{`${role.startDate} - ${role.endDate}`}</i>
                        </span>
                    ),
                )}
            </VolunteerItemDetailWrapper>
        </div>
    );
};

const VolunteerHeading = styled.h2`
    padding-bottom: 0.25em;
`;

const VolunteerContainer = styled.div`
    background-color: ${themeColors.operatorAqua};
    color: ${themeColors.blackHex};
    padding: 2em 10vw;
`;

const Volunteer = ({ heading, data }: SectionComponentProps): React.ReactElement => {
    return (
        <VolunteerContainer>
            <VolunteerHeading>{heading}</VolunteerHeading>
            {data.map((record, i) => (
                <VolunteerItem key={`volunteer-item-${i}`} volunteerRecord={record} />
            ))}
        </VolunteerContainer>
    );
};

export default Volunteer;
