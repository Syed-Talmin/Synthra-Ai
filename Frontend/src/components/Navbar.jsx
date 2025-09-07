import { LogOut } from "lucide-react";
import LogoutPopup from "./LogoutPopup.jsx";
import { useState } from "react";
import axios from "../axios/axiosInstance";

export default function Navbar() {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

    const onConfirm = async () => {
      await axios.post("/auth/logout");
      localStorage.removeItem("token");
      window.location.reload();

      setShowLogoutPopup(false);
    }
    const onCencel = () => {
      setShowLogoutPopup(false);
    }
  return (
    <nav className="w-full absolute top-0 left-0 z-50 bg-transparent backdrop-blur-sm">
      {showLogoutPopup && <LogoutPopup onConfirm={onConfirm} onCancel={onCencel} />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Company Name */}
          <div className="text-xl text-white uppercase font-bold">
            Synthra
          </div>

          {/* Logout Icon */}
          <div onClick={() => setShowLogoutPopup(true)} className="cursor-pointer text-white hover:text-red-400 transition">
            <LogOut size={22} strokeWidth={2} />
          </div>
        </div>
      </div>
    </nav>
  );
}
