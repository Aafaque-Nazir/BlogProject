import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
  const location = useLocation();

  return (
    <footer className="relative overflow-hidden py-10 bg-gradient-to-r from-indigo-900 via-gray-900 to-black text-gray-300 border-t border-gray-700">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          {/* Logo and Copyright Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  &copy; Copyright 2023. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-400">
                Company
              </h3>
              <ul>
                {[
                  { name: "Features", path: "/" },
                  { name: "Pricing", path: "/pricing" },
                  { name: "Affiliate Program", path: "/affiliate" },
                  { name: "Press Kit", path: "/press-kit" },
                ].map((item) => (
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
                      <span
                        className={`absolute left-0 bottom-0 h-[2px] bg-indigo-400 transition-all duration-300 ${
                          location.pathname === item.path
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }`}
                      ></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Support Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-400">
                Support
              </h3>
              <ul>
                {[
                  { name: "Account", path: "/account" },
                  { name: "Help", path: "/help" },
                  { name: "Contact Us", path: "/contact" },
                  { name: "Customer Support", path: "/support" },
                ].map((item) => (
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
                      <span
                        className={`absolute left-0 bottom-0 h-[2px] bg-indigo-400 transition-all duration-300 ${
                          location.pathname === item.path
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }`}
                      ></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legal Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-400">
                Legals
              </h3>
              <ul>
                {[
                  { name: "Terms & Conditions", path: "/terms" },
                  { name: "Privacy Policy", path: "/privacy" },
                  { name: "Licensing", path: "/licensing" },
                ].map((item) => (
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
                      <span
                        className={`absolute left-0 bottom-0 h-[2px] bg-indigo-400 transition-all duration-300 ${
                          location.pathname === item.path
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }`}
                      ></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;