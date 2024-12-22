import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../slice/quiz.slice";
import authReducer from "../slice/auth.slice";
import announcementReducer from "../slice/announcement.slice";
const store = configureStore({
  reducer: {
    quizzes: quizReducer, // Add the quiz reducer to the store
    announcements: announcementReducer, // Add the announcement reducer to the store
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // Enable devTools only in development
});

export type RootState = ReturnType<typeof store.getState>; // Root state type
export type AppDispatch = typeof store.dispatch; // App dispatch type

export default store;
