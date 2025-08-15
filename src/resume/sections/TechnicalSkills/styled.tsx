import styled from 'styled-components';

import { minWidth600 } from 'styles/mq';
import { allButLastChild } from 'styles/selectors';

const SkillsGroupWrapper = styled.div`
    padding-right: 5vw;
    padding-left: 5vw;

    &${allButLastChild} {
        margin-bottom: 0.5rem;
    }

    ${minWidth600} {
        padding-right: 10vw;
        padding-left: 10vw;
    }
`;

const SkillsList = styled.p`
    font-size: 1.5rem;

    #resume & {
        padding-right: 0rem;
        padding-left: 0rem;

        ${minWidth600} {
            padding-right: 1rem;
            padding-left: 1rem;
        }
    }
`;

export { SkillsGroupWrapper, SkillsList };
