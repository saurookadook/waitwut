import styled from 'styled-components';

import { themeColors } from 'themes';

const FooterContainer = styled.div`
    background-color: ${(props) => {
        if (props.theme.backgroundColorRgb) {
            const { r, g, b } = props.theme?.backgroundColorRgb || {};
            return `rgb(${r} ${g} ${b} / 0.65)`;
        } else {
            return props.theme.backgroundColor;
        }
    }};
    box-shadow: 0 -1px 5px ${themeColors.graphite};
    color: ${(props) => props.theme?.color};
    /* margin: 0 12vw 2em; */
    height: 5rem;
    padding: 1rem 0;
    position: relative;
    width: 100vw;
    z-index: 1000001 !important;
`;

const GatsbyWrapper = styled.div`
    align-items: center;
    display: flex;
    font-size: 1.5rem;
    justify-content: center;
    /* padding-left: 0; */
`;

export { FooterContainer, GatsbyWrapper };
