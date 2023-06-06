import React from 'react';
import styled from 'styled-components';

const TechnicalSkills = ({ heading, data }: SectionComponentProps): React.ReactElement => {
    const skillsAsCsv = data.join(', ');
    return (
        <div>
            <h2>{heading}</h2>
            {/* <span>Under Construction 🚧</span> */}
            <p>{skillsAsCsv}</p>
        </div>
    );
};

export default TechnicalSkills;
