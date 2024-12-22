import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import PreventRoute from "./PreventRoute";
import PrivateRoute from "./PrivateRoute";
import Quizzes from "../pages/quizzes";
import QuizDetail from "../pages/quizzes/QuizDetails";
import UpdateQuiz from "../pages/quizzes/UpdateQuiz";
import Announcements from "../pages/announcements";
import UpdateAnnouncement from "../pages/announcements/UpdateAnnouncement";

const AllRoutes = () => {
  return (
    <>
      <Suspense>
        <Routes>
          <Route element={<PreventRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={"Hello from my app"} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/quizzes/:id" element={<QuizDetail />} />
            <Route path="/quizzes/update/:id" element={<UpdateQuiz />} />
            <Route path="/announcements" element={<Announcements />} />
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
