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

const IndexPage = () => {
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
            <img
                alt="Gatsby G Logo"
                src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E"
            />
        </main>
    );
};

export default IndexPage;
