import React from 'react';
import styled from 'styled-components';
import { resumeTheme } from '../../../themes';

const StyledDiv = styled.div`
    background-color: ${resumeTheme.psWarningTextMediumHex};
    padding: 1em 10vw;
`;

const TechnicalSkills = ({ heading, data }: SectionComponentProps): React.ReactElement => {
    const skillsAsCsv = data.join(', ');
    return (
        <StyledDiv>
            <h2>{heading}</h2>
            {/* <span>Under Construction 🚧</span> */}
            <p>{skillsAsCsv}</p>
        </StyledDiv>
    );
};

export default TechnicalSkills;
