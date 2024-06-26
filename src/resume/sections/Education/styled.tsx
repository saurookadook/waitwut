import styled from 'styled-components';

import { minWidth600 } from 'styles/mq';

const EducationItemContainer = styled.div`
    /* all but last child */
    &:nth-last-child(n + 2) {
        margin-bottom: 2rem;
    }

    & .name-and-location-wrapper {
        align-items: flex-start;
        flex-direction: column;
        margin-bottom: 0.5rem;

        & i {
            align-self: flex-start;
            margin-left: 0;
        }
    }

    ${minWidth600} {
        &:nth-child(2n + 1) {
            padding-right: 7.5rem;
        }

        & .name-and-location-wrapper {
            align-items: flex-end;
            flex-direction: row;

            & i {
                align-self: center;
                /* line-height: 2.5rem; */
                margin-left: 1rem;
            }
        }
    }
`;

export { EducationItemContainer };
