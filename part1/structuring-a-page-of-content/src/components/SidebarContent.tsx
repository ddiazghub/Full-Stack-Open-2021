import React from "react";
import ImageAnchor from "./ImageAnchor";
import favorite1 from "../assets/favorite-1.jpg";
import favorite1th from "../assets/favorite-1_th.jpg";
import favorite2 from "../assets/favorite-2.jpg";
import favorite2th from "../assets/favorite-2_th.jpg";
import favorite3 from "../assets/favorite-3.jpg";
import favorite3th from "../assets/favorite-3_th.jpg";
import favorite4 from "../assets/favorite-4.jpg";
import favorite4th from "../assets/favorite-4_th.jpg";

let SidebarContent = (): JSX.Element => (
    <>
        <h2>Favourite photos</h2>
        <ImageAnchor href={favorite1} img={favorite1th} alt="Small black bird, black claws, long black slender beak, links to larger version of the image" />
        <ImageAnchor href={favorite2} img={favorite2th} alt="Top half of a pretty bird with bright blue plumage on neck, light colored beak, blue headdress, links to larger version of the image" />
        <ImageAnchor href={favorite3} img={favorite3th} alt="Top half of a large bird with white plumage, very long curved narrow light colored break, links to larger version of the image" />
        <ImageAnchor href={favorite4} img={favorite4th} alt="Large bird, mostly white plumage with black plumage on back and rear, long straight white beak, links to larger version of the image" />

    </>
);

export default SidebarContent;