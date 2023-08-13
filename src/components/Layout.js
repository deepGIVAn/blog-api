import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

{
  /* here we would learn about layput because we are using main element header continously okay!! */
}

const Layout = () => {
  return (
    <main>
      <Header />
      <Outlet />
      {/* It is important to use outlet above otherwise it would not show the included content in its tag */}
      {/* rest of included components goes down the header which is included in Route in App.js okay !! */}
    </main>
  );
};

export default Layout;
