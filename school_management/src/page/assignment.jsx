import TopBar from "../Component/topBar";
import SideNav from "../Component/sideNav";
import AssignmentCard from "../Component/Teacher/asssignmentCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Assignment() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const loadedAssignments = JSON.parse(
      localStorage.getItem("assignments") || "[]"
    );
    setAssignments(loadedAssignments);
  }, []);

  const handleDelete = (id) => {
    const updated = assignments.filter((a) => a.id !== id);
    setAssignments(updated);
    localStorage.setItem("assignments", JSON.stringify(updated));
  };

  const handleViewResponses = (assignment) => {
    navigate("/assignment-responses", { state: { assignment } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar></TopBar>
      <div className="flex flex-1 overflow-hidden">
        <SideNav></SideNav>
        <main className="flex-1 flex flex-col overflow-y-auto">
          <div className="bg-blue-200 h-12 font-bold flex items-center px-5 border-b-2 border-blue-300">
            Assignment
          </div>
          <div className="flex justify-end mr-10">
            {" "}
            <button
              onClick={() => {
                navigate("/addAssignment");
              }}
              className=" w-15 h-7 mt-2 px-4 py-1 text-sm font-medium text-white bg-blue-500 rounded-md transition duration-150 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              ADD
            </button>
          </div>
          <div className="flex-1 p-10 pl-20 pr-20 space-y-6">
            {assignments.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                No assignments yet. Click ADD to create one.
              </div>
            ) : (
              assignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  date={assignment.createdAt}
                  title={assignment.title}
                  due={assignment.dueDate}
                  possibleScore={assignment.possibleScore}
                  onDelete={() => handleDelete(assignment.id)}
                  onViewResponses={() => handleViewResponses(assignment)}
                />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
