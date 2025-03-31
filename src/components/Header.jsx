import React from "react";
import { Container, Logo, LogoutBtn } from "./export";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
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

          {/* Navigation Items */}
          <ul className="flex ml-auto space-x-4 ">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className="px-4 py-2 text-sm font-medium duration-200 hover:bg-indigo-700 hover:text-white rounded-full bg-indigo-500 text-gray-100"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;