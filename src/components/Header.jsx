import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="bg-purple-500 py-6">
        <ul className="flex items-center justify-center gap-14 text-white">
          <li>
            <Link to="/" className="font-semibold text-xl">
              Courses
            </Link>
          </li>
          <li>
            <Link to="/student-dashboard" className="font-semibold text-xl">
              {" "}
              {/* Correct path */}
              Students
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
