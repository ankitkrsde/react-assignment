import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, get, child, update } from "firebase/database";

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    async function fetchStudentData() {
      const stuDbRef = ref(database);
      try {
        const snapshot = await get(child(stuDbRef, "/students"));
        if (snapshot.exists()) {
          const stuData = snapshot.val();
          const studentsWithCourses = Object.keys(stuData).map((studentId) => {
            const student = stuData[studentId];
            return {
              ...student,
              id: studentId, // add the id to the student object
            };
          });
          setStudentData(studentsWithCourses);
        } else {
          console.log("No student data available");
        }
      } catch (error) {
        console.log("Failed to fetch student data", error);
      }
    }

    fetchStudentData();
  }, []);

  const handleCourseCompletion = async (studentId, courseId) => {
    try {
      const studentRef = ref(database, `/students/${studentId}/courses`);
      await update(studentRef, {
        [`${courseId}/completed`]: true,
      });
      setStudentData((prevData) =>
        prevData.map((student) => {
          if (student.id === studentId) {
            return {
              ...student,
              courses: student.courses.map((course) => {
                if (course.id === courseId) {
                  return { ...course, completed: true };
                }
                return course;
              }),
            };
          }
          return student;
        })
      );
    } catch (error) {
      console.error("Failed to update course completion", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      {studentData.length > 0 ? (
        studentData.map((student) => (
          <div key={student.id} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {student.name}'s Enrolled Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {student.courses && student.courses.length > 0 ? (
                student.courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white shadow-md p-4 rounded-lg"
                  >
                    <img
                      src={course.thumbnail || "default-thumbnail.jpg"}
                      alt={`${course.name} thumbnail`}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-bold mb-2">{course.name}</h3>
                    <p className="text-gray-700 mb-2">
                      Instructor: {course.instructor}
                    </p>
                    <p className="text-gray-700 mb-2">
                      Due Date: {course.due_date}
                    </p>
                    <p className="text-gray-700 mb-2">
                      Progress: {course.progress}%
                    </p>
                    <div className="w-full bg-gray-300 rounded-full mb-2">
                      <div
                        className="bg-purple-500 text-xs font-medium text-purple-100 text-center p-0.5 leading-none rounded-full"
                        style={{ width: `${course.progress}%` }}
                      >
                        {course.progress}%
                      </div>
                    </div>
                    {!course.completed && (
                      <button
                        onClick={() =>
                          handleCourseCompletion(student.id, course.id)
                        }
                        className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4"
                      >
                        Mark as Completed
                      </button>
                    )}
                    {course.completed && (
                      <span className="block text-green-600 mt-4">
                        Course Completed
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p>No courses found for this student.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No student data available</p>
      )}
    </div>
  );
}
