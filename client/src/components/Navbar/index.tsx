import React, { useState } from "react";
import { Menu, Moon, Search, LogOut, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import Cookies from "js-cookie";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("token"); // Hapus token dari cookies
    router.push("/auth/login"); // Redirect ke halaman login
  };

  return (
    <>
      <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
        {/* Search Bar */}
        <div className="flex items-center gap-8">
          {!isSidebarCollapsed ? null : (
            <button
              onClick={() =>
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
              }
            >
              <Menu className="h-8 w-8 dark:text-white"></Menu>
            </button>
          )}
          <div className="relative flex h-min w-[200px]">
            <Search className="absolute top-1/2 left-[4px] mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
            <input
              className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
              type="search"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center">
          <button
            onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
            className={
              isDarkMode
                ? `h-min w-min rounded p-2 dark:hover:bg-gray-700`
                : `h-min w-min rounded p-2 hover:bg-gray-100`
            }
          >
            {isDarkMode ? (
              <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
            ) : (
              <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
            )}
          </button>
          {/* Logout Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className={`rounded p-2 ${
              isDarkMode ? "dark:hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            <LogOut className="h-6 w-6 cursor-pointer dark:text-white" />
          </button>
          <div className="md-inline-block mr-5 ml-2 hidden min-h-[2rem] w-[0.1rem] bg-gray-200"></div>
        </div>
      </div>
      {/* Modal Konfirmasi Logout */}
      {isModalOpen && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-gray-600/50">
          <div className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Konfirmasi Logout
            </h2>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
              Apakah Anda yakin ingin logout?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  handleLogout();
                }}
                className="rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
              >
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
