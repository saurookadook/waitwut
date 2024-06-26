import React from 'react';
import styled from 'styled-components';

import { HeadingDetails } from 'resume/components/';
import { AbstractSection } from 'resume/sections/';
import { headingDetails, sections } from 'resume/data';

const StyledResume = styled.main`
    overflow: hidden;
`;

const Resume = (): React.ReactElement => {
    return (
        <StyledResume>
            <HeadingDetails headingData={headingDetails} />
            {sections.map((section, i): React.ReactElement => {
                const key = Object.keys(section)[0];
                return (
                    <AbstractSection // force formatting
                        key={`${key}-${i}`}
                        sectionKey={key}
                        sectionData={section[key]}
                    />
                );
            })}
        </StyledResume>
    );
};

export default Resume;
