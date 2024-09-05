import React from "react";
import { Link, Outlet } from "react-router-dom";
import { RiEBikeLine } from "react-icons/ri";
import Global from "../../Utils/Global";

export default function Component() {
  // Set sidebar width based on user role
  const sidebarWidth = Global.user.role === "MANUFACTURER" ? "20%" : "0";
  const contentWidth = Global.user.role === "MANUFACTURER" ? "80%" : "100%";

  return (
    <div className={`flex ${Global.user.role === "MANUFACTURER" ? "flex-row" : "flex-col"} w-[100vw] h-[90vh]`}>
      {Global.user.role === "MANUFACTURER" && (
        <div
          style={{ width: sidebarWidth }}
          className="h-full z-10 flex flex-col rounded-r-md bg-[#f0fdf4] border-[1.5px] border-green-600"
        >
          <div className="flex-1 overflow-auto py-4">
            <nav className="space-y-2 px-4 font-lexendDeca">
              <div className="font-medium text-[#65a30d] w-full flex text-xl justify-center font-dm-sans">Dashboard</div>
              <Link
                to="manufacturer"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[#d1fae5] hover:text-[#065f46]"
              >
                <RiEBikeLine className="h-5 w-5" />
                Add Bike
              </Link>
              <Link
                to="/track-manufacturing"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[#d1fae5] hover:text-[#065f46]"
              >
                <DollarSignIcon className="h-5 w-5" />
                Track Manufacturing
              </Link>
            </nav>
          </div>
        </div>
      )}
      <div style={{ width: contentWidth }}>
        <Outlet />
      </div>
    </div>
  );
}

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}


function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function InfoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}


function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}






function ZapIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  )
}