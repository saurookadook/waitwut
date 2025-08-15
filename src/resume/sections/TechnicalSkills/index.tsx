import React from 'react';

import { GenericHeading, GenericContainer } from 'resume/styled';
import { resumeTheme } from 'themes/index';
import { SkillsGroupWrapper, SkillsList } from './styled';

const TechnicalSkills = ({
    heading, // force formatting
    data,
}: SectionComponentProps<TechnicalSkillRecord>): React.ReactElement => {
    return (
        <GenericContainer
            overrides={{
                // force formatting
                backgroundColor: resumeTheme.psWarningTextMediumHex,
                padding: '1rem 0',
            }}
        >
            <GenericHeading>{heading}</GenericHeading>
            {data.map(({ label, skills }) => {
                const skillsAsCsv = skills.join(', ');
                return (
                    <SkillsGroupWrapper key={`tech-skills-${label}`}>
                        <h3>{label}</h3>

                        <SkillsList>{skillsAsCsv}</SkillsList>
                    </SkillsGroupWrapper>
                );
            })}
        </GenericContainer>
    );
};

export default TechnicalSkills;
