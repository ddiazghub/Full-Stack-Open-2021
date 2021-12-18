import React from "react";
import Navbar from "../components/Navbar";
import NavbarItemData from "../shared/interfaces/NavbarItemData";

let Header = (props: {title: string, logo: string, navbarItems: NavbarItemData[]}): JSX.Element => (
    <div className="header">
        <img src={props.logo} alt="A simple dove logo" />
        <h1>{props.title}</h1>
        <Navbar items={props.navbarItems} />
    </div>
);

export default Header;