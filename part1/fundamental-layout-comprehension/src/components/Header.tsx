import React from "react";

let Header = (): JSX.Element => {
  let navItems: string[] = [
    "Home",
    "Blog",
    "About us",
    "Our history",
    "Contacts"
  ]

  return (
    <div className="header">
      <div className="logo">
        My exciting website!
      </div>
      <ul className="navbar">
        {navItems.map((item) => <li><a href="">{item}</a></li>)}
      </ul>
    </div>
  );
};

export default Header;