import React from "react";
import Navbar from "./navbar";
import Topbar from "components/Topbar";
import Footer from "./footer";

export default function MainLayout({ children }) {
  return (
    <div className="">
      <Topbar />

      <Navbar />

      <div>{children}</div>

<Footer/>

    </div>
  );
}
