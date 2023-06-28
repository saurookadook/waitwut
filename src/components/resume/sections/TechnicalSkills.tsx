import React from 'react';
import styled from 'styled-components';

import { GenericHeading, GenericContainer } from '../components';
import { resumeTheme } from '../../../themes';

const TechnicalSkills = ({ heading, data }: SectionComponentProps): React.ReactElement => {
    const skillsAsCsv = data.join(', ');
    return (
        <GenericContainer overrides={{ bgColor: resumeTheme.psWarningTextMediumHex, padding: '1em 10vw' }}>
            <GenericHeading>{heading}</GenericHeading>
            <p>{skillsAsCsv}</p>
        </GenericContainer>
    );
};

export default TechnicalSkills;
