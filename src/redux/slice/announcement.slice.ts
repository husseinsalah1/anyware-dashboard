/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ApiService from "../../services/apiServices";

// Define types for the response data
interface IAnnouncement {
  _id: string;
  title: string;
  description: string;
  createdBy: string;
  __v: number;
}

interface AnnouncementState {
  announcements: IAnnouncement[];
  announcement: IAnnouncement | null;
  loading: boolean;
  error: string | null;
}

const initialState: AnnouncementState = {
  announcements: [],
  announcement: null,
  loading: false,
  error: null,
};

// Fetch all announcements
export const fetchAnnouncements = createAsyncThunk<
  IAnnouncement[],
  void,
  { rejectValue: string }
>("announcements/fetchAnnouncements", async (_, { rejectWithValue }) => {
  try {
    const response = (await ApiService.get("/announcement/list")) as {
      result: IAnnouncement[];
    };
    return response.result; // Extract the result property
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch announcements");
  }
});

// Fetch a single announcement by ID
export const fetchAnnouncement = createAsyncThunk<
  IAnnouncement,
  string,
  { rejectValue: string }
>("announcements/fetchAnnouncement", async (id, { rejectWithValue }) => {
  try {
    const response = (await ApiService.get(`/announcement/get?_id=${id}`)) as {
      result: IAnnouncement;
    };
    return response.result; // Extract the result property
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch announcement");
  }
});

// Create a new announcement
export const createAnnouncement = createAsyncThunk<
  IAnnouncement,
  IAnnouncement,
  { rejectValue: string }
>(
  "announcements/createAnnouncement",
  async (announcement, { rejectWithValue }) => {
    try {
      const response = (await ApiService.post(
        "/announcement/create",
        announcement
      )) as {
        result: IAnnouncement;
      };
      return response.result; // Extract the result property
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create announcement");
    }
  }
);

// Update an announcement by ID
export const updateAnnouncement = createAsyncThunk<
  IAnnouncement,
  { id: string; data: Partial<IAnnouncement> },
  { rejectValue: string }
>(
  "announcements/updateAnnouncement",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = (await ApiService.put(
        `/announcement/update?_id=${id}`,
        data
      )) as {
        result: IAnnouncement;
      };
      return response.result; // Extract the result property
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update announcement");
    }
  }
);

// Delete an announcement by ID
export const deleteAnnouncement = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("announcements/deleteAnnouncement", async (id, { rejectWithValue }) => {
  try {
    await ApiService.delete(`/announcement/delete?_id=${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to delete announcement");
  }
});

const announcementSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAnnouncements.fulfilled,
        (state, action: PayloadAction<IAnnouncement[]>) => {
          state.loading = false;
          state.announcements = action.payload;
        }
      )
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAnnouncement.fulfilled,
        (state, action: PayloadAction<IAnnouncement>) => {
          state.loading = false;
          state.announcement = action.payload;
        }
      )
      .addCase(fetchAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        createAnnouncement.fulfilled,
        (state, action: PayloadAction<IAnnouncement>) => {
          state.announcements.push(action.payload);
        }
      )
      .addCase(
        updateAnnouncement.fulfilled,
        (state, action: PayloadAction<IAnnouncement>) => {
          const index = state.announcements.findIndex(
            (announcement) => announcement._id === action.payload._id
          );
          if (index !== -1) {
            state.announcements[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteAnnouncement.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.announcements = state.announcements.filter(
            (announcement) => announcement._id !== action.payload
          );
        }
      );
  },
});

export default announcementSlice.reducer;
