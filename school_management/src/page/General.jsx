import TopBar from "../Component/topBar";
import SideNav from "../Component/sideNav";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AssignmentCard from "../Component/Teacher/asssignmentCard";
import QuizCard from "../Component/Teacher/quizCard";

// Sample Student Data (moved directly into this file)
const studentData = [
  { id: 1, name: "Pory Morokot", email: "pory.m@school.edu", status: "Active" },
  { id: 2, name: "Sokha Mean", email: "sokha.m@school.edu", status: "Active" },
  {
    id: 3,
    name: "Dara Sovann",
    email: "dara.s@school.edu",
    status: "Inactive",
  },
];

const handleDelete = (id) => {
  setStudentData((prev) => prev.filter((s) => s.id !== id));
};
// --- Sub-component for the tab navigation ---
const TabItem = ({ label, isActive, onClick }) => {
  const activeClasses = "text-blue-600 font-bold border-b-2 border-blue-600";
  const inactiveClasses = "text-gray-600 hover:text-blue-600";

  return (
    <div
      className={`mr-6 pb-2 cursor-pointer transition duration-150 ${
        isActive ? activeClasses : inactiveClasses
      }`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

const General = () => {
  // State to track the active tab. Default to 'Posts'.
  const [activeTab, setActiveTab] = useState("Posts");
  const location = useLocation();
  const navigate = useNavigate();
  const classData = location.state?.classData;
  const [currentClass, setCurrentClass] = useState(classData || null);

  useEffect(() => {
    if (classData) {
      // Reload class data from localStorage to get updated assignments/quizzes
      const classes = JSON.parse(localStorage.getItem("classes")) || [];
      const updatedClass = classes.find((c) => c.id === classData.id);
      if (updatedClass) {
        setCurrentClass(updatedClass);
      }
    }
  }, [classData]);

  const handleDeleteAssignment = (assignmentId) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      const classes = JSON.parse(localStorage.getItem("classes")) || [];
      const updatedClasses = classes.map((c) => {
        if (c.id === currentClass.id) {
          return {
            ...c,
            assignments: c.assignments.filter((a) => a.id !== assignmentId),
          };
        }
        return c;
      });
      localStorage.setItem("classes", JSON.stringify(updatedClasses));
      setCurrentClass({
        ...currentClass,
        assignments: currentClass.assignments.filter(
          (a) => a.id !== assignmentId
        ),
      });
    }
  };

  const handleDeleteQuiz = (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      const classes = JSON.parse(localStorage.getItem("classes")) || [];
      const updatedClasses = classes.map((c) => {
        if (c.id === currentClass.id) {
          return {
            ...c,
            quizzes: c.quizzes.filter((q) => q.id !== quizId),
          };
        }
        return c;
      });
      localStorage.setItem("classes", JSON.stringify(updatedClasses));
      setCurrentClass({
        ...currentClass,
        quizzes: currentClass.quizzes.filter((q) => q.id !== quizId),
      });
    }
  };

  const handleViewAssignmentResponses = (assignment) => {
    navigate("/assignment-responses", { state: { assignment } });
  };

  const handleViewQuizResponses = (quiz) => {
    navigate("/quiz-responses", { state: { quiz } });
  };

  // --- Content Renderers ---

  // Renders the Posts section content
  const renderPosts = () => {
    if (!currentClass) {
      return (
        <div className="text-center py-10 text-red-500">
          <p className="text-lg mb-2">Error: No class data available</p>
          <p className="text-sm">Please navigate back to the class list</p>
          <button
            onClick={() => navigate("/homePage")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Classes
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Add Assignment/Quiz buttons */}

        {/* Display assignments and quizzes */}
        {currentClass?.assignments?.length === 0 &&
        currentClass?.quizzes?.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg mb-2">No assignments or quizzes yet</p>
            <p className="text-sm">
              Please create your first assignment or quiz
            </p>
          </div>
        ) : (
          <>
            {currentClass?.assignments?.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                date={new Date(assignment.createdAt).toLocaleDateString()}
                title={assignment.title}
                due={assignment.dueDate}
                possibleScore={assignment.possibleScore}
                onDelete={() => handleDeleteAssignment(assignment.id)}
                onViewResponses={() =>
                  handleViewAssignmentResponses(assignment)
                }
              />
            ))}
            {currentClass?.quizzes?.map((quiz) => (
              <QuizCard
                key={quiz.id}
                date={new Date(quiz.createdAt).toLocaleDateString()}
                title={quiz.title}
                due={quiz.dueDate}
                possibleScore={quiz.possibleScore}
                onDelete={() => handleDeleteQuiz(quiz.id)}
                onViewResponses={() => handleViewQuizResponses(quiz)}
              />
            ))}
          </>
        )}
      </div>
    );
  };

  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = () => {
    const classLink = `${window.location.origin}/join-class/${currentClass?.id}`;
    navigator.clipboard.writeText(classLink).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  // Renders the Students Roster section content
  const renderStudents = () => (
    <div className="max-w-5xl mx-auto bg-white rounded-lg p-6 shadow-md border border-blue-100">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Student
      </h2>

      {/* Class Link Section */}
      <div className="mb-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Class Join Link
        </h3>
        <div className="flex items-center gap-3">
          <input
            type="text"
            readOnly
            value={`${window.location.origin}/join-class/${currentClass?.id}`}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:outline-none"
          />
          <button
            onClick={handleCopyLink}
            className={`px-6 py-2 rounded-lg font-semibold transition duration-200 ${
              copySuccess
                ? "bg-green-600 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {copySuccess ? "✓ Copied!" : "Copy Link"}
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Share this link with students to let them join your class.
        </p>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              kick out
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {studentData.map((student) => (
            <tr
              key={student.id}
              className="hover:bg-gray-50 transition duration-100"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {student.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {student.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  onClick={() => {
                    handleDelete(student.id);
                  }}
                >
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ff0000"
                    stroke="#ff0000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fill="#ff0000"
                        d="M199 103v50h-78v30h270v-30h-78v-50H199zm18 18h78v32h-78v-32zm-79.002 80l30.106 286h175.794l30.104-286H137.998zm62.338 13.38l.64 8.98 16 224 .643 8.976-17.956 1.283-.64-8.98-16-224-.643-8.976 17.956-1.283zm111.328 0l17.955 1.284-.643 8.977-16 224-.64 8.98-17.956-1.284.643-8.977 16-224 .64-8.98zM247 215h18v242h-18V215z"
                      ></path>
                    </g>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <TopBar></TopBar>
      <div className="flex">
        <SideNav></SideNav>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {/* Class Info Header */}
          {currentClass && (
            <div className="bg-blue-100 rounded-lg p-4 mb-6 border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {currentClass.name}
              </h2>
              <div className="flex gap-6 text-sm text-gray-700">
                <span className="font-semibold">
                  Status:{" "}
                  <span className={currentClass.statusColor}>
                    {currentClass.status}
                  </span>
                </span>
                <span className="font-semibold">
                  Students: {currentClass.students}
                </span>
                <span className="font-semibold">
                  Created: {currentClass.date}
                </span>
              </div>
            </div>
          )}

          {/* Tab Navigation (Posts / Students) */}
          <div className="flex border-b border-gray-300 mb-6 max-w-5xl mx-auto">
            <TabItem
              label="Posts"
              isActive={activeTab === "Posts"}
              onClick={() => setActiveTab("Posts")}
            />
            <TabItem
              label="Students"
              isActive={activeTab === "Students"}
              onClick={() => setActiveTab("Students")}
            />
          </div>

          {/* Conditionally Render Content */}
          {activeTab === "Posts" && renderPosts()}
          {activeTab === "Students" && renderStudents()}
        </main>
      </div>
    </div>
  );
};

export default General;
