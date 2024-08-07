import styled from 'styled-components';

import { minWidth600 } from 'styles/mq';
import { resumeTheme } from 'themes/index';

const InfoContainer = styled.div`
    font-family: 'Arial Black', Arial, Helvetica, sans-serif;
    font-size: 1.5rem;
    margin: 1rem auto;
    width: min-content;

    & a,
    & a:hover {
        text-decoration: underline;
        transform: none;
    }

    ${minWidth600} {
        width: max-content;
    }
`;

const infoItemHeight = '2.625rem';

const InfoItem = styled.span`
    display: inline-flex;
    flex-direction: column;
    height: ${infoItemHeight};
    position: relative;
    width: max-content;

    & > a,
    & > a:visited {
        color: ${resumeTheme.psTextInverseHex};
        display: block;
        height: ${infoItemHeight};
        line-height: 2;
        width: 100%;
    }

    & > a:hover {
        text-decoration: underline;
        transform: scale(1.02);
    }

    ${minWidth600} {
        flex-direction: row;

        &:not(:last-child) {
            margin-right: 2rem;

            &::before {
                background-color: #000000;
                content: '\\0020';
                height: 2rem;
                /* left: 0.5rem; */
                position: absolute;
                right: -1rem;
                top: 0.5rem;
                width: 3px;
            }
        }
    }
`;

export { InfoContainer, InfoItem };
