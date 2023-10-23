import styled from 'styled-components';

const FooterContainer = styled.div`
    background-color: ${(props) => {
        if (props.theme.backgroundColorRgb) {
            const { r, g, b } = props.theme?.backgroundColorRgb || {};
            return `rgba(${r},${g},${b}, 0.5)`;
        } else {
            return props.theme.backgroundColor;
        }
    }};
    color: ${(props) => props.theme?.color};
    /* margin: 0 12vw 2em; */
    min-height: 5em;
    padding-top: 1em;
    position: relative;
    z-index: 1000001 !important;
`;

const GatsbyWrapper = styled.div`
    align-items: center;
    display: flex;
    font-size: 1.5em;
    justify-content: center;
    /* padding-left: 0; */
`;

export { FooterContainer, GatsbyWrapper };
