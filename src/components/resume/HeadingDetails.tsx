import React from 'react';
import styled from 'styled-components';
import { ContactInfo } from '../resume';
import { resumeTheme } from '../../themes';

const StyledHeader = styled.header`
    background-color: ${resumeTheme.psSuccessTextWeakHex};
    padding-bottom: 2rem;
    text-align: center;
`;

const StyledNameHeading = styled.h1``;

const StyledContactInfo = styled(ContactInfo)``;

const StyledIntroBlurb = styled.p`
    margin: 0 10vw;
    text-align: left;
`;

interface HeadingDetailsProps {
    headingData: HeadingData;
}

const HeadingDetails = ({ headingData }: HeadingDetailsProps): React.ReactElement => {
    // const { phone, email, sites } = headingData.contactInfo;
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
