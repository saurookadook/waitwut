import React from 'react';
import styled from 'styled-components';

import { GenericHeading, GenericContainer } from '../../components';
import { resumeTheme } from '../../../../themes';

const SkillsList = styled.p`
    font-size: 1.5rem;
`;

const TechnicalSkills = ({ heading, data }: SectionComponentProps): React.ReactElement => {
    const skillsAsCsv = data.join(', ');
    return (
        <GenericContainer
            overrides={{
                // <- to force formatting
                backgroundColor: resumeTheme.psWarningTextMediumHex,
                padding: '1em 10vw',
            }}
        >
            <GenericHeading>{heading}</GenericHeading>
            <SkillsList>{skillsAsCsv}</SkillsList>
        </GenericContainer>
    );
};

export default TechnicalSkills;
