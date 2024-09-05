import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase";
import { ref, get, child } from "firebase/database";

export default function CourseList() {
  const [courseListData, setCourseListData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const dbRef = ref(database);
      try {
        const snapshot = await get(child(dbRef, "/courses"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const courses = Object.keys(data).map((key) => ({
            id: key, // Assuming key is the unique identifier
            ...data[key],
          }));
          setCourseListData(courses);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
    fetchData();
  }, []);

  const filteredCourses = courseListData.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCourseClick = (id) => {
    navigate(`/course-details/${id}`);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-500 text-black p-6">
      <div className="">
        <input
          type="text"
          placeholder="Search by course name or instructor"
          className="w-[45rem] p-2 mb-4 text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="w-[45rem] max-h-96 overflow-y-auto">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-red-200 flex flex-col items-center justify-center gap-4 border-2 border-black p-6 mb-4 cursor-pointer"
              onClick={() => handleCourseClick(course.id)}
            >
              <p>Course Name: {course.name}</p>
              <p>Instructor: {course.instructor}</p>
            </div>
          ))
        ) : (
          <p>No courses found</p>
        )}
      </div>
    </div>
  );
}
