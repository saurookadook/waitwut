import React from 'react';
import styled from 'styled-components';
import { resumeTheme, themeColors } from '../../../themes';

const TechnicalProjectsHeading = styled.h2`
    padding-bottom: 0.25em;
`;

const TechnicalProjectsContainer = styled.div`
    background-color: ${themeColors.stringGreen};
    color: ${themeColors.blackHex};
    padding: 2em 10vw;
`;

const TechnicalProjects = ({ heading, data }: SectionComponentProps): React.ReactElement => {
    return (
        <TechnicalProjectsContainer>
            <TechnicalProjectsHeading>{heading}</TechnicalProjectsHeading>
            <span>Under Construction 🚧</span>
            <ul>
                {data.map((record, i) => {
                    return (
                        <li key={`technical-project-${i}`}>
                            <pre>{JSON.stringify(record, null, 4)}</pre>
                        </li>
                    );
                })}
            </ul>
        </TechnicalProjectsContainer>
    );
};

export default TechnicalProjects;
