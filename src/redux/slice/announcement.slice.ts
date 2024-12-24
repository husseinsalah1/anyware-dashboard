/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiService from "../../services/apiServices";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  AnnouncementState,
  IAnnouncement,
} from "../../interfaces/announcement";

const initialState: AnnouncementState = {
  announcements: [],
  announcement: null,
  loading: false,
  error: null,
};

export const fetchAnnouncements = createAsyncThunk<
  IAnnouncement[],
  void,
  { rejectValue: string }
>("announcements/fetchAnnouncements", async (_, { rejectWithValue }) => {
  try {
    const response = (await ApiService.get("/announcement/list")) as {
      result: IAnnouncement[];
    };
    return response.result;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch announcements");
  }
});

export const fetchAnnouncement = createAsyncThunk<
  IAnnouncement,
  string,
  { rejectValue: string }
>("announcements/fetchAnnouncement", async (id, { rejectWithValue }) => {
  try {
    const response = (await ApiService.get(`/announcement/get?_id=${id}`)) as {
      result: IAnnouncement;
    };
    return response.result;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch announcement");
  }
});

export const createAnnouncement = createAsyncThunk<
  IAnnouncement,
  { data: Partial<IAnnouncement> },
  { rejectValue: string }
>("announcement/createAnnouncement", async ({ data }, { rejectWithValue }) => {
  try {
    const response = (await ApiService.post(
      `/announcement/create`,
      data
    )) as IAnnouncement;
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to update announcement");
  }
});

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
      )) as IAnnouncement;

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update announcement");
    }
  }
);

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
