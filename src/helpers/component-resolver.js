import React from "react"

import ParagraphBlogTeaser from "../components/paragraph/paragraph-blog-teasers";
import ParagraphHeroCta from "../components/paragraph/paragraph-hero-cta";
import ParagraphImage from "../components/paragraph/paragraph-image";
import ParagraphText from "../components/paragraph/paragraph-text";

const resolve = (component) => {
    // console.log(component);

    if (component.__typename.includes(`paragraph__blog_teasers`)) {
        return (
            <ParagraphBlogTeaser />
        )
    }

    if (component.__typename.includes(`paragraph__hero_cta`)) {
        return (
            <ParagraphHeroCta 
                intro={component.field_intro}
                title={component.field_title}
                text={component.field_text}
                links={component.field_cta}
            />
        )
    }

    if (component.__typename.includes(`paragraph__image`)) {
        return (
            <ParagraphImage 
                image={component.relationships.field_image.relationships.field_media_image.localFile.childImageSharp.gatsbyImageData}
            />
        )
    }

    if (component.__typename.includes(`paragraph__text`)) {
        return (
            <ParagraphText 
                title={component.field_title}
                text={component.field_text_rich.processed}
            />
        )
    }

    return <></>
}

export const componentResolver = (data = []) => {
    const components = []

    data.forEach((component) => {
        components.push(resolve(component))
    })

    return components
}

export default componentResolver;
