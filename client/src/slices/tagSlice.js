import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPassagesByTag = createAsyncThunk(
  "tags/fetchPassagesByTag",
  async (tag) => {
    const response = await fetch(`http://localhost:3000/tags/${tag}`);
    return response.json();
  }
);

const tagsSlice = createSlice({
  name: "tags",
  initialState: { passages: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPassagesByTag.fulfilled, (state, action) => {
      state.passages = action.payload;
    });
  },
});

export default tagsSlice.reducer;
