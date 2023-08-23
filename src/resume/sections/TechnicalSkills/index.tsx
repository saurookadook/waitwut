import React from 'react';
import styled from 'styled-components';

import { GenericHeading, GenericContainer } from 'resume/components';
import { resumeTheme } from 'themes/index';

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
                padding: '1rem 10vw',
            }}
        >
            <GenericHeading>{heading}</GenericHeading>
            <SkillsList>{skillsAsCsv}</SkillsList>
        </GenericContainer>
    );
};

export default TechnicalSkills;
