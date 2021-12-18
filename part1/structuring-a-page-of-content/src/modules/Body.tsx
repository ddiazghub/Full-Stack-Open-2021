import React from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";

let Body = (): JSX.Element => (
    <div className="body">
        <Main />
        <Sidebar />
    </div>
);

export default Body;