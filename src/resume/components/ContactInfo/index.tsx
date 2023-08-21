import React from 'react';
import styled from 'styled-components';
import { resumeTheme } from 'themes/index';

const InfoContainer = styled.div`
    font-size: 1.5rem;
    margin: 1rem 0;
`;

const infoItemHeight = '2.625rem';

const InfoItem = styled.span`
    display: inline-block;
    height: ${infoItemHeight};

    &:hover {
        /* TODO: Make this fancier :) */
        text-decoration: underline;
        transform: scale(1.02);
    }

    & > a,
    & > a:visited {
        color: ${resumeTheme.psTextInverseHex};
        display: block;
        height: ${infoItemHeight};
        line-height: 2;
        width: 100%;
    }

    &:not(:last-child) {
        margin-right: 2rem;

        a::after {
            background-color: #000000;
            content: '\\0020';
            display: inline-block;
            height: 2rem;
            /* left: 0.5rem; */
            position: relative;
            right: -1rem;
            top: 0.4rem;
            width: 3px;
        }
    }
`;

interface SiteLinkProps {
    siteData: Site;
}

const SiteLink = ({ siteData }: SiteLinkProps): React.ReactElement => {
    return (
        <a href={siteData.url} target="_blank" rel="noreferrer">
            {siteData.displayText}
        </a>
    );
};

const ContactInfo = ({ phone, email, sites }: ContactInfo): React.ReactElement => {
    return (
        <InfoContainer>
            {phone != null && (
                <InfoItem>
                    <a href={`tel:+1-${phone}`} target="_blank" rel="noreferrer">
                        {phone}
                    </a>
                </InfoItem>
            )}
            {email != null && (
                <InfoItem>
                    <a href={`mailto:${email}`} target="_blank" rel="noreferrer">
                        {email}
                    </a>
                </InfoItem>
            )}
            {sites.map((site, i) => (
                <InfoItem key={`${site.type}-${i}`}>
                    <SiteLink siteData={site} />
                </InfoItem>
            ))}
        </InfoContainer>
    );
};

export default ContactInfo;
