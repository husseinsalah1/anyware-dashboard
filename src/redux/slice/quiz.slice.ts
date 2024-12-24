/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ApiService from "../../services/apiServices";

// Define types for the response data
interface IQuiz {
  _id: string;
  title: string;
  description: string;
  subject: string;
  semester: string;
  totalMarks: number;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

interface QuizState {
  quizzes: IQuiz[];
  quiz: IQuiz | null;
  loading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  quizzes: [],
  quiz: null,
  loading: false,
  error: null,
};

// Fetch all quizzes
export const fetchQuizzes = createAsyncThunk<
  IQuiz[],
  void,
  { rejectValue: string }
>("quizzes/fetchQuizzes", async (_, { rejectWithValue }) => {
  try {
    const response = (await ApiService.get("/quiz/list")) as {
      result: IQuiz[];
    };
    return response.result; // Extract the result property
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch quizzes");
  }
});

// Fetch a single quiz by ID
export const fetchQuiz = createAsyncThunk<
  IQuiz,
  string,
  { rejectValue: string }
>("quizzes/fetchQuiz", async (id, { rejectWithValue }) => {
  try {
    const response = (await ApiService.get(`/quiz/get?_id=${id}`)) as {
      result: IQuiz;
    };
    return response.result; // Extract the result property
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch quiz");
  }
});

// Delete a quiz by ID
export const deleteQuiz = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("quizzes/deleteQuiz", async (id, { rejectWithValue }) => {
  try {
    await ApiService.delete(`/quiz/delete?_id=${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to delete quiz");
  }
});

// Update a quiz by ID
export const updateQuiz = createAsyncThunk<
  IQuiz,
  { id: string; data: Partial<IQuiz> },
  { rejectValue: string }
>("quizzes/updateQuiz", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = (await ApiService.put(
      `/quiz/update?_id=${id}`,
      data
    )) as IQuiz;
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to update quiz");
  }
});

// Create Quiz
export const createQuiz = createAsyncThunk<
  IQuiz,
  { data: Partial<IQuiz> },
  { rejectValue: string }
>("quizzes/createQuiz", async ({ data }, { rejectWithValue }) => {
  try {
    const response = (await ApiService.post(`/quiz/create`, data)) as IQuiz;
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to update quiz");
  }
});

const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchQuizzes.fulfilled,
        (state, action: PayloadAction<IQuiz[]>) => {
          state.loading = false;
          state.quizzes = action.payload;
        }
      )
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuiz.fulfilled, (state, action: PayloadAction<IQuiz>) => {
        state.loading = false;
        state.quiz = action.payload;
      })
      .addCase(fetchQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteQuiz.fulfilled, (state, action: PayloadAction<string>) => {
        state.quizzes = state.quizzes.filter(
          (quiz) => quiz._id !== action.payload
        );
      })
      .addCase(updateQuiz.fulfilled, (state, action: PayloadAction<IQuiz>) => {
        const index = state.quizzes.findIndex(
          (quiz) => quiz._id === action.payload._id
        );
        console.log(index);
        if (index !== -1) {
          state.quizzes[index] = action.payload;
        }
      })
      .addCase(createQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuiz.fulfilled, (state, action: PayloadAction<IQuiz>) => {
        state.loading = false;
        state.quizzes.push(action.payload);
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create quiz";
      });
  },
});

export default quizSlice.reducer;
