import React from 'react';
import styled from 'styled-components';

import { GenericHeading, GenericContainer } from 'resume/styled';
import { minWidth600 } from 'styles/mq';
import { resumeTheme } from 'themes/index';

const SkillsList = styled.p`
    font-size: 1.5rem;

    #resume & {
        padding-right: 5vw;
        padding-left: 5vw;

        ${minWidth600} {
            padding-right: 10vw;
            padding-left: 10vw;
        }
    }
`;

const TechnicalSkills = ({ heading, data }: SectionComponentProps): React.ReactElement => {
    const skillsAsCsv = data.join(', ');
    return (
        <GenericContainer
            overrides={{
                // force formatting
                backgroundColor: resumeTheme.psWarningTextMediumHex,
                padding: '1rem 0',
            }}
        >
            <GenericHeading>{heading}</GenericHeading>
            <SkillsList>{skillsAsCsv}</SkillsList>
        </GenericContainer>
    );
};

export default TechnicalSkills;
