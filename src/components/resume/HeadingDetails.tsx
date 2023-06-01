import React from 'react';
import { ContactInfo } from '../resume'

interface HeadingData {
    firstName: string
    lastName: string
    contactInfo: ContactInfo
    introBlurb: string
}

interface HeadingDetailsProps {
    headingData: HeadingData
}

const HeadingDetails = ({ headingData }: HeadingDetailsProps): React.ReactElement => {
    // const { phone, email, sites } = headingData.contactInfo;
    return (
        <header>
            <h1>{headingData.firstName} {headingData.lastName}</h1>
            <ContactInfo {...headingData.contactInfo} />
            <p>{headingData.introBlurb}</p>
        </header>
    )
}

export default HeadingDetails;
