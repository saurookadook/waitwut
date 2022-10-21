import React from 'react';
import styled, { useTheme } from 'styled-components';

import pageMap from '../constants/pageMap';

const ParagraphLines = styled.span`
    display: block;
`;

const IndexPage = (): React.ReactElement => {
    const theme = useTheme();

    return (
        <main>
            <title>Home Page</title>
            <h1>
                Has this ever happened to you?
                <br />
                <span className="heading-accent">
                    {`You start to write something and think, "Oh 💩, how do you write that thing in <blank> again!?"`}
                </span>
            </h1>
            <p>
                <ParagraphLines>Well, this little site is dedicated to helping you through those kind of moments. 🤓</ParagraphLines>
                <ParagraphLines>CHECK IT OUUUUTTTTTTTT</ParagraphLines>
            </p>
            <ul className="link-list">
                {pageMap.map((pageData) => {
                    const { color, description, path, title } = pageData;
                    return (
                        <li
                            key={path}
                            style={{ color: color || theme.color }}
                        >
                            <span>
                                <a
                                    className="basic-link"
                                    href={`${path}`}
                                >
                                    {title}
                                </a>
                                {description
                                    ? <p className="description">{description}</p>
                                    : null
                                }
                            </span>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
};

export default IndexPage;
