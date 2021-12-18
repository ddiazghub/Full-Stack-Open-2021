import React from "react";
import NavbarItemData from "../shared/interfaces/NavbarItemData";

let Navbar = (props: {items: NavbarItemData[]}): JSX.Element => (
    <div className="navbar">
        <ul>
            {props.items.map(item => (
                <li>
                    <a href={item.href}>{item.text}</a>
                </li>
            ))}
        </ul>
    </div>
);

export default Navbar;