import React from 'react';
import styled from 'styled-components';

import { ContactInfo } from 'resume/components';
import { resumeTheme } from 'themes/index';

const StyledHeader = styled.header`
    background-color: ${resumeTheme.psSuccessTextWeakHex};
    padding-bottom: 2rem;
    text-align: center;
`;

const StyledNameHeading = styled.h1``;

const StyledContactInfo = styled(ContactInfo)``;

const StyledIntroBlurb = styled.p`
    font-size: 1.5rem;
    margin: 0 10vw;
    text-align: left;
`;

interface HeadingDetailsProps {
    headingData: HeadingData;
}

const HeadingDetails = ({ headingData }: HeadingDetailsProps): React.ReactElement => {
    return (
        <StyledHeader>
            <StyledNameHeading>
                {headingData.firstName} {headingData.lastName}
            </StyledNameHeading>
            <StyledContactInfo {...headingData.contactInfo} />
            <StyledIntroBlurb>{headingData.introBlurb}</StyledIntroBlurb>
        </StyledHeader>
    );
};

export default HeadingDetails;
