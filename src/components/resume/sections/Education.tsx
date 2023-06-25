import React from 'react';
import styled from 'styled-components';
import { themeColors } from '../../../themes';

const EducationHeading = styled.h2`
    padding-bottom: 0.25em;
`;

const EducationContainer = styled.div`
    background-color: ${themeColors.plBlue};
    color: ${themeColors.white};
    padding: 2em 10vw;
`;

const Education = ({ heading, data }: SectionComponentProps): React.ReactElement => {
    return (
        <EducationContainer>
            <EducationHeading>{heading}</EducationHeading>
            <span>Under Construction 🚧</span>
            <ul>
                {data.map((record, i) => {
                    return (
                        <li key={`education-record-${i}`}>
                            <pre>{JSON.stringify(record, null, 4)}</pre>
                        </li>
                    );
                })}
            </ul>
        </EducationContainer>
    );
};

export default Education;
