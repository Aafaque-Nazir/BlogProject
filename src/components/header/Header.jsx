import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../export";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for hamburger

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="py-4 shadow-lg bg-gradient-to-r from-indigo-900 via-gray-900 to-black text-white backdrop-blur-md">
      <Container>
        <nav className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="mr-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Hamburger Menu Button (Mobile) */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Navigation Items (Desktop) */}
          <ul className="hidden md:flex ml-auto space-x-8">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      className="px-4 py-2 text-sm font-medium duration-200 hover:bg-indigo-700 hover:text-white rounded-full bg-indigo-500 text-gray-100"
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 bg-gray-800 rounded-lg p-4">
            <ul className="space-y-4">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        className="w-full text-left px-4 py-2 text-sm font-medium duration-200 hover:bg-indigo-700 hover:text-white rounded-lg bg-indigo-500 text-gray-100"
                        onClick={() => {
                          navigate(item.slug);
                          setMenuOpen(false);
                        }}
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
