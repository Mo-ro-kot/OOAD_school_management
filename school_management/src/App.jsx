import "./index.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Assignment from "./page/assignment";
import LoginPage from "./page/loginPage";
import HomePage from "./page/homePage";
import ProfilePage from "./page/Profile";
import General from "./page/General";
import AddAssignment from "./page/addAssignment";
import Quiz from "./page/quiz";
import AddQuiz from "./Component/Teacher/addQuiz";
import AssignmentResponses from "./page/assignmentResponses";
import QuizResponses from "./page/quizResponses";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace></Navigate>}
        ></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/homePage" element={<HomePage />}></Route>
        <Route path="/profilePage" element={<ProfilePage />}></Route>
        <Route path="/assignment" element={<Assignment />}></Route>
        <Route path="/general" element={<General />}></Route>
        <Route path="/addAssignment" element={<AddAssignment />}></Route>
        <Route path="/quiz" element={<Quiz />}></Route>
        <Route path="/addQuiz" element={<AddQuiz />}></Route>
        <Route
          path="/assignment-responses"
          element={<AssignmentResponses />}
        ></Route>
        <Route path="/quiz-responses" element={<QuizResponses />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
