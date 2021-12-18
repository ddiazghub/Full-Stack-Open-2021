import React from "react";

let ImageAnchor = (props: {img: string, href: string, alt?: string}): JSX.Element => (
    <a href={props.href}>
        <img src={props.img} alt={props.alt ? props.alt : ""} />
    </a>
);

export default ImageAnchor;