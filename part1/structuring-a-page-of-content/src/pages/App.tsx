import React from "react";
import dove from "../assets/dove.png";
import "../styles/App.css";
import Header from "../modules/Header";
import NavbarItemData from "../shared/interfaces/NavbarItemData";
import Body from "../modules/Body";
import Footer from "../modules/Footer";

let App = (): JSX.Element => {
  let items: NavbarItemData[] = [
    { text: "Home", href: "#" },
    { text: "Get started", href: "#" },
    { text: "Photos", href:"#" },
    { text: "Gear", href:"#" },
    { text: "Forum", href:"#" }
  ];

  return (
    <>
      <Header title="BIRDWATCHING" logo={dove} navbarItems={items} />
      <Body />
      <Footer />
    </>
  );
};

export default App;
