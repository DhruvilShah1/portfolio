import React, { useState } from "react";
import {
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";
import {
  Sun,
  Moon,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/", isRoute: true },
    { name: "About", href: "/about", isRoute: true },
    { name: "Services", href: "/services", isRoute: true },
    { name: "Portfolio", href: "/portfolio", isRoute: true },
    { name: "Contact", href: "/contact", isRoute: true },
  ];

  const isActive = (link) => {
    if (link.href === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === link.href ||
      location.pathname.startsWith(`${link.href}/`)
    );
  };

  const linkClass = (active) =>
    `relative rounded-full px-4 py-2 text-sm transition duration-300
    ${
      active
        ? "text-yellow-400"
        : "text-gray-300 hover:text-yellow-400"
    }
    after:absolute after:bottom-0 after:left-1/2
    after:h-[2px] after:-translate-x-1/2
    after:bg-yellow-400 after:transition-all after:duration-300
    ${
      active
        ? "after:w-6"
        : "after:w-0 hover:after:w-6"
    }`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 z-50 w-full px-4 py-5">
      <div className="mx-auto max-w-5xl">

        {/* Main Navbar */}
        <div className="flex items-center justify-between gap-4 rounded-full border border-gray-700 bg-black px-5 py-3 text-white shadow-lg">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2"
          >
            <img
              className="h-9 w-9 rounded-full object-cover"
              src="https://img.magnific.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Dhruvil Logo"
            />

            <span className="text-lg font-semibold tracking-wide">
              Dhruvil<span className="text-yellow-400">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                end={link.href === "/"}
                className={({ isActive: active }) =>
                  linkClass(active)
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex shrink-0 items-center gap-3">

            {/* Theme Button */}
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={() => setDarkMode((prev) => !prev)}
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-gray-700 transition hover:border-yellow-400 hover:text-yellow-400 sm:flex"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Let's Talk */}
            <a
              href="mailto:your-email@example.com"
              className="hidden items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400 sm:flex"
            >
              Let's Talk
              <ArrowUpRight size={16} />
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 transition hover:border-yellow-400 hover:text-yellow-400 md:hidden"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`grid transition-all duration-300 ease-in-out md:hidden ${
            menuOpen
              ? "mt-3 grid-rows-[1fr] opacity-100"
              : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-1 rounded-3xl border border-gray-700 bg-black p-3 shadow-xl">
              {navLinks.map((link) => {
                const active = isActive(link);

                return (
                  <NavLink
                    key={link.name}
                    to={link.href}
                    end={link.href === "/"}
                    onClick={closeMenu}
                    className={() =>
                      `flex items-center justify-between rounded-xl px-4 py-3 text-sm transition ${
                        active
                          ? "bg-yellow-400/10 text-yellow-400"
                          : "text-gray-300 hover:bg-white/10 hover:text-yellow-400"
                      }`
                    }
                  >
                    {link.name}

                    {active && (
                      <span className="h-1 w-6 rounded-full bg-yellow-400" />
                    )}
                  </NavLink>
                );
              })}

              <a
                href="mailto:your-email@example.com"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-4 py-3 text-sm font-semibold text-black transition hover:bg-white"
              >
                Let's Talk
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;