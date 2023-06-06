import React from 'react';
import styled from 'styled-components';
import { resumeTheme } from '../../themes';

const InfoItem = styled.span`
    display: inline-block;

    &:hover {
        /* TODO: Make this fancier :) */
        text-decoration: underline;
        transform: scale(1.02);
    }

    & > a,
    & > a:visited {
        color: ${resumeTheme.psTextInverseHex};
    }

    &:not(:last-child) {
        margin-right: 1rem;

        a::after {
            background-color: #000000;
            content: '\\0020';
            display: inline-block;
            height: 2rem;
            left: 0.5rem;
            position: relative;
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
        <p>
            <InfoItem>
                <a href={`tel:+1-${phone}`} target="_blank" rel="noreferrer">
                    {phone}
                </a>
            </InfoItem>
            <InfoItem>
                <a href={`mailto:${email}`} target="_blank" rel="noreferrer">
                    {email}
                </a>
            </InfoItem>
            {sites.map((site, i) => (
                <InfoItem key={`${site.type}-${i}`}>
                    <SiteLink siteData={site} />
                </InfoItem>
            ))}
        </p>
    );
};

export default ContactInfo;
