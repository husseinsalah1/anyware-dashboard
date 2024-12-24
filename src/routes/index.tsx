import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import PreventRoute from "./PreventRoute";
import PrivateRoute from "./PrivateRoute";
import Quizzes from "../pages/teacher/quizzes";
import QuizDetail from "../pages/teacher/quizzes/QuizDetails";
import UpdateQuiz from "../pages/teacher/quizzes/UpdateQuiz";
import Announcements from "../pages/teacher/announcements";
import UpdateAnnouncement from "../pages/teacher/announcements/UpdateAnnouncement";
import Dashboard from "../pages/user/dashboard";
import AddQuiz from "../pages/teacher/quizzes/AddQuize";
import AddAnnouncement from "../pages/teacher/announcements/AddAnouncement";
import StartQuiz from "../pages/user/StartQuiz";
import Result from "../pages/user/StartQuiz/Result";

const AllRoutes = () => {
  return (
    <>
      <Suspense>
        <Routes>
          <Route element={<PreventRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/quizzes/:id" element={<QuizDetail />} />
            <Route path="/quizzes/update/:id" element={<UpdateQuiz />} />
            <Route path="/quizzes/create" element={<AddQuiz />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/announcements/create" element={<AddAnnouncement />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/start-quiz/:id" element={<StartQuiz />} />
            <Route path="/quiz-results" element={<Result />} />
            <Route
              path="/announcements/update/:id"
              element={<UpdateAnnouncement />}
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default AllRoutes;
