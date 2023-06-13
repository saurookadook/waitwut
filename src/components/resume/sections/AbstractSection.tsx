import React from 'react';
import * as sections from '../sections';
import { toTitleCase } from '../../../utils';

interface AbstractSectionProps {
    sectionKey: string;
    sectionData: any;
}

const componentNameFromSectionKey = (sectionKey: string): string => {
    switch (sectionKey) {
        case 'Education':
            return 'Education';
        case 'EmploymentHistory':
            return 'Employment';
        case 'TechnicalProjects':
            return 'TechnicalProjects';
        case 'TechnicalSkills':
            return 'TechnicalSkills';
        case 'VolunteerWork':
            return 'Volunteer';
        default:
            // because the type can't correctly be inferred otherwise?
            return '';
    }
};

const AbstractSection = ({ sectionKey, sectionData }: AbstractSectionProps): React.ReactElement => {
    const componentName = componentNameFromSectionKey(sectionKey);
    // const SectionComponent = await import(`./${componentName}.tsx`)
    const SectionComponent = (sections as Record<string, any>)[componentName];

    return (
        <section>
            <SectionComponent heading={toTitleCase(sectionKey)} data={sectionData} />
        </section>
    );
};

export default AbstractSection;
