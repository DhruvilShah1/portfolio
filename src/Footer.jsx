import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-black/10 mt-1 py-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-gray-800">Dhruvil Shah</span>.
          All rights reserved.
        </p>

        <p className="flex items-center gap-1.5">
          Crafted with
          <span className="text-red-500 animate-pulse">♥</span>
          and passion.
        </p>
      </div>
    </footer>
  );
};

export default Footer;