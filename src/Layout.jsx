
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Chatbot from "./Chatbot";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {


useEffect(() => {
  fetch("http://localhost:5000/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      page: window.location.pathname
    })
  });
}, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f6ec]">
      <Navbar />

      <main>
        <Outlet />
      </main>

      {/* Floating Chatbot */}
      <Chatbot />

<div   >
        <Footer />

</div>
    </div>
  );
};

export default Layout;
