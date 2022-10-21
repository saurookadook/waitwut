import * as React from "react";
import { Link } from "gatsby";
import styled from 'styled-components';

const Main = styled.main`
    color: "#232129";
    padding: "96px";
    font-family: "-apple-system, Roboto, sans-serif, serif";
`;

const Heading = styled.h1`
    margin-top: 0;
    margin-bottom: 64;
    max-width: 320;
`;

const Paragraph = styled.p`
    margin-bottom: 48;
`;

const Code = styled.code`
    background-color: #FFF4DB;
    border-radius: 4;
    color: #8A6534;
    font-size: 1.25rem;
    padding: 4;
`;

const NotFoundPage = (): React.ReactElement => {
    return (
        <Main >
            <title>Not found</title>
            <Heading>Page not found</Heading>
            <Paragraph>
                Sorry{" "}
                <span role="img" aria-label="Pensive emoji">
                    😔
                </span>{" "}
                we couldn’t find what you were looking for.
                <br />
                {(process.env || {}).NODE_ENV === "development" ? (
                    <>
                        <br />
                        Try creating a page in <Code>src/pages/</Code>.
                        <br />
                    </>
                ) : null}
                <br />
                <Link to="/">Go home</Link>.
            </Paragraph>
        </Main>
    );
};

export default NotFoundPage;
