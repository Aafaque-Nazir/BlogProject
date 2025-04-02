import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
  const location = useLocation();

  return (
    <footer className="relative overflow-hidden py-10 bg-gradient-to-r from-indigo-900 via-gray-900 to-black text-gray-300 border-t border-gray-700">
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center md:text-left">
        <div className="flex flex-wrap justify-center md:justify-between -m-6">
          {/* Logo and Copyright Section */}
          <div className="w-full md:w-1/2 lg:w-5/12 p-6 flex flex-col items-center md:items-start">
            <Logo width="100px" />
            <p className="text-sm text-gray-400 mt-4">&copy; 2025. All Rights Reserved by Aafaque.</p>
          </div>

          {/* Footer Links */}
          {[ 
            { title: "Company", links: [
                { name: "Features", path: "/" },
                { name: "Pricing", path: "/pricing" },
                { name: "Affiliate Program", path: "/affiliate" },
                { name: "Press Kit", path: "/press-kit" }
              ]},
            { title: "Support", links: [
                { name: "Account", path: "/account" },
                { name: "Help", path: "/help" },
                { name: "Contact Us", path: "/contact" },
                { name: "Customer Support", path: "/support" }
              ]},
            { title: "Legals", links: [
                { name: "Terms & Conditions", path: "/terms" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Licensing", path: "/licensing" }
              ]}
          ].map((section) => (
            <div key={section.title} className="w-full md:w-1/2 lg:w-1/4 p-6 text-center md:text-left">
              <h3 className="text-xs font-semibold uppercase text-gray-400 mb-6">
                {section.title}
              </h3>
              <ul>
                {section.links.map((item) => (
                  <li key={item.name} className="mb-4">
                    <Link
                      to={item.path}
                      className={`text-base font-medium relative group ${
                        location.pathname === item.path
                          ? "text-indigo-400"
                          : "text-gray-300 hover:text-indigo-400"
                      }`}
                    >
                      {item.name}
                      <span className={`absolute left-1/2 transform -translate-x-1/2 bottom-0 h-[2px] bg-indigo-400 transition-all duration-300 ${
                        location.pathname === item.path
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
