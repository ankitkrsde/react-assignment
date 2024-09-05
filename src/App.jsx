import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CourseList from "./components/CourseList";
import CourseDetails from "./components/CourseDetails";
import StudentDashboard from "./components/StudentDashboard";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/course-details/:id" element={<CourseDetails />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />{" "}
        {/* Correct path */}
      </Routes>
    </Router>
  );
}

export default App;
