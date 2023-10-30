import React, { useContext } from 'react';
import { Link } from 'gatsby';
import styled, { useTheme } from 'styled-components';

import { PageMapContext } from 'common/contexts';

const HeadingAccent = styled.span`
    color: #663399;
    font-size: 0.75em;
`;

const ParagraphLines = styled.span`
    display: block;
`;

const PageItem = styled.li`
    color: ${(props) => props.color};
    margin-bottom: 1em;
`;

const Description = styled.p`
    color: #232129;
    line-height: 1.25;
    margin-top: 10px;
    margin-bottom: 0px;
`;

const IndexPage = (): React.ReactElement => {
    const theme = useTheme();
    const pageMapContext = useContext(PageMapContext);

    return (
        <main>
            <h1>
                Has this ever happened to you?
                <br />
                <HeadingAccent>
                    {`You start to write something and think, "Oh 💩, how do you write that thing in <blank> again!?"`}
                </HeadingAccent>
            </h1>
            <p>
                <ParagraphLines>
                    Well, this little site is dedicated to helping you through those kind of moments. 🤓
                </ParagraphLines>
                <ParagraphLines>CHECK IT OUUUUTTTTTTTT</ParagraphLines>
            </p>
            <ul className="link-list">
                {(pageMapContext?.pageMap || []).map((pageData) => {
                    const { color, description, sectionSlug, title } = pageData;
                    return (
                        <PageItem key={sectionSlug} color={`${color || theme.color}`}>
                            <span>
                                <Link className="basic-link" to={`/${sectionSlug}`}>
                                    {title}
                                </Link>
                                {description ? <Description>{description}</Description> : null}
                            </span>
                        </PageItem>
                    );
                })}
            </ul>
        </main>
    );
};

export default IndexPage;
