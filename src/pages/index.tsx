import React from 'react';

import styled from 'styled-components';

const ParagraphLines = styled.span`
    display: block;
`;

// data
const links = [
    {
        text: "placeholder",
        url: "/",
        description: "TODO",
        color: "#E95800",
        // color: "#1099A8",
        // color: "#BC027F",
        // color: "#0D96F2",
        // color: "#8EB814",
        // color: "#663399",
    },
];

const IndexPage = (): React.ReactElement => {
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
                {links.map((link) => (
                    <li key={link.url} style={{ color: link.color }}>
                        <span>
                            <a
                                className="basic-link"
                                href={`${link.url}`}
                            >
                                {link.text}
                            </a>
                            <p className="description">{link.description}</p>
                        </span>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default IndexPage;
