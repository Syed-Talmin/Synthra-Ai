import React from 'react'

const LogoutPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="w-full h-screen fixed inset-0 z-99 bg-black/50 backdrop-blur-sm">

      {/* Popup card */}
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="w-[90%] max-w-md bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl shadow-xl p-6 flex flex-col gap-6 animate-scaleIn">
          {/* Title */}
          <h1 className="text-2xl font-semibold text-white text-center">
            Are you sure you want to logout?
          </h1>
          <p className="text-gray-400 text-center text-sm">
            You’ll need to sign in again to access your account.
          </p>

          {/* Actions */}
          <div className="flex gap-4 w-full">
            <button
              onClick={onConfirm}
              className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all shadow-md hover:shadow-orange-500/40"
            >
              Yes, Logout
            </button>
            <button
              onClick={onCancel}
              className="flex-1 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium transition-all shadow-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoutPopup
