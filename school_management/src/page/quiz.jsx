import TopBar from "../Component/topBar";
import SideNav from "../Component/sideNav";
import QuizCard from "../Component/Teacher/quizCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Quiz() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = () => {
    const storedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    setQuizzes(storedQuizzes);
  };

  const handleDelete = (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== quizId);
      localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
      setQuizzes(updatedQuizzes);
    }
  };

  const handleViewResponses = (quiz) => {
    navigate("/quiz-responses", { state: { quiz } });
  };
  return (
    <div>
      <TopBar></TopBar>
      <div className="flex ">
        <SideNav></SideNav>
        <main className="flex-1 flex flex-col overflow-y-auto">
          <div className="bg-blue-200 h-12 font-bold flex items-center px-5 border-b-2 border-blue-300">
            Quiz
          </div>
          <div className="flex justify-end mr-10">
            <button
              onClick={() => {
                navigate("/addQuiz");
              }}
              className=" w-15 h-7 mt-2 px-4 py-1 text-sm font-medium text-white bg-blue-500 rounded-md transition duration-150 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              ADD
            </button>
          </div>
          <div className="flex-1 p-10 pl-20 pr-20 space-y-6">
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  date={new Date(quiz.createdAt).toLocaleDateString()}
                  title={quiz.title}
                  due={quiz.dueDate}
                  possibleScore={quiz.possibleScore}
                  onDelete={() => handleDelete(quiz.id)}
                  onViewResponses={() => handleViewResponses(quiz)}
                />
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                No quizzes created yet. Click ADD to create your first quiz.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
