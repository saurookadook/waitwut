import React from 'react';
import styled from 'styled-components';

import {
    GenericContainer,
    GenericHeading,
    GenericGridContainer,
    LocationText,
    NameAndLocationWrapper,
} from 'resume/styled';
import { themeColors } from 'themes/index';
import { EducationItemContainer } from './styled';

const InstitutionName = styled.h3`
    margin-bottom: 0%;
`;

const EducationItem = ({
    educationRecord, // force formatting
}: {
    educationRecord: EducationRecord;
}): React.ReactElement => {
    const { certification, completionText, institution, location } = educationRecord;
    return (
        <EducationItemContainer>
            <NameAndLocationWrapper>
                <InstitutionName>{institution}</InstitutionName>
                {!!location && ( // force formatting
                    <LocationText>{`${location.city}, ${location.state}`}</LocationText>
                )}
            </NameAndLocationWrapper>
            <p>{completionText}</p>
            <p>{certification}</p>
        </EducationItemContainer>
    );
};

const Education = ({ heading, data }: SectionComponentProps): React.ReactElement => {
    return (
        <GenericContainer
            overrides={{
                // force formatting
                backgroundColor: themeColors.plBlue,
                color: themeColors.white,
            }}
        >
            <GenericHeading overrides={{ paddingBottom: '0.25em' }}>{heading}</GenericHeading>
            <GenericGridContainer>
                {data.map((record, i) => (
                    <EducationItem key={`education-record-${i}`} educationRecord={record} />
                ))}
            </GenericGridContainer>
        </GenericContainer>
    );
};

export default Education;
