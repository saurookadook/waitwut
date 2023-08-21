import React from 'react';

import { HeadingDetails } from 'resume/components/';
import { AbstractSection } from 'resume/sections/';
import { headingDetails, sections } from 'resume/data';

const Resume = (): React.ReactElement => {
    return (
        <main>
            <HeadingDetails headingData={headingDetails} />
            {sections.map((section, i): React.ReactElement => {
                const key = Object.keys(section)[0];
                return (
                    <AbstractSection // <- to force formatting
                        key={`${key}-${i}`}
                        sectionKey={key}
                        sectionData={section[key]}
                    />
                );
            })}
        </main>
    );
};

export default Resume;
