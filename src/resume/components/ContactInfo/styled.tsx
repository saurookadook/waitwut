import styled from 'styled-components';

import { resumeTheme } from 'themes/index';

const InfoContainer = styled.div`
    font-family: 'Arial Black', Arial, Helvetica, sans-serif;
    font-size: 1.5rem;
    margin: 1rem 0;

    & a,
    & a:hover {
        text-decoration: underline;
    }
`;

const infoItemHeight = '2.625rem';

const InfoItem = styled.span`
    display: inline-block;
    height: ${infoItemHeight};

    & > a,
    & > a:visited {
        color: ${resumeTheme.psTextInverseHex};
        display: block;
        height: ${infoItemHeight};
        line-height: 2;
        width: 100%;
    }

    & > a:hover:not(::after) {
        /* TODO: Make this fancier :) */
        text-decoration: underline;
        transform: scale(1.02);
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

export { InfoContainer, InfoItem };
