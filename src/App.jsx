import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authservice from "../Appwrite/auth";
import { login, logout } from "../store/authSlice";
import { Header, Footer } from "./components/export";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authservice
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-gray-100">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-opacity-75"></div>
        </div>
      ) : (
        <>
          <Header />
          <main className="flex-grow container mx-auto px-6 py-8">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;