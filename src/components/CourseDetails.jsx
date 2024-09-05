import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import { ref, get, child } from "firebase/database";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [syllabusExpanded, setSyllabusExpanded] = useState(false);

  useEffect(() => {
    async function fetchCourseDetails() {
      const dbRef = ref(database);
      try {
        const snapshot = await get(child(dbRef, `/courses/${id - 1}`));
        if (snapshot.exists()) {
          setCourse(snapshot.val());
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
    fetchCourseDetails();
  }, [id]);

  if (!course) {
    return <p>Loading course details...</p>;
  }

  return (
    <div className="bg-gray-500 text-white p-6">
      <h1 className="text-2xl mb-4">{course.name}</h1>
      <p>
        <strong>Instructor:</strong> {course.instructor}
      </p>
      <p>
        <strong>Description:</strong> {course.description}
      </p>
      <p>
        <strong>Enrollment Status:</strong> {course.enrollmentStatus}
      </p>
      <p>
        <strong>Duration:</strong> {course.duration}
      </p>
      <p>
        <strong>Schedule:</strong> {course.schedule}
      </p>
      <p>
        <strong>Location:</strong> {course.location}
      </p>
      <p>
        <strong>Pre-requisites:</strong> {course.prerequisites}
      </p>

      <img
        src={course.thumbnail}
        alt={`${course.name} thumbnail`}
        className="w-fit h-32 object-cover rounded-lg my-4"
      />

      <div className="mt-4">
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => setSyllabusExpanded(!syllabusExpanded)}
        >
          {syllabusExpanded ? "Hide Syllabus" : "Show Syllabus"}
        </button>
        {syllabusExpanded && (
          <div className="mt-4">
            <h2 className="text-xl">Syllabus</h2>
            <ul className="list-disc pl-6">
              {course.syllabus.map((item, index) => (
                <li key={index}>
                  <p>
                    <strong>Week {item.week}:</strong> {item.topic}
                  </p>
                  <p>{item.content}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
