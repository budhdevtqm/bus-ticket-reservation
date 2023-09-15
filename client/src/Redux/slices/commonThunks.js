import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, headerConfig } from "../../config";

export const handleCreate = createAsyncThunk("/create", async (data, { rejectWithValue }) => {
  const { path, values } = data;
  try {
    const response = await axios.post(`${BASE_URL}${path}`, values, headerConfig);
    console.log(response, "response handleCreate");
    return response;
  } catch (error) {
    console.log(error, "handleCreate error");
    return rejectWithValue(error.response.data.message);
  }
});

export const handleDelete = createAsyncThunk("/delete", async (path, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${BASE_URL}${path}`, headerConfig);
    console.log(response, "response handleDelete");
    return response;
  } catch (error) {
    console.log(error, "----error handleDelete");
    return rejectWithValue(error.response.data.message);
  }
});

export const handleUpdate = createAsyncThunk("/update", async (data, { rejectWithValue }) => {
  const { path, values } = data;
  try {
    const response = await axios.put(`${BASE_URL}${path}`, values, headerConfig);
    console.log(response, "----update-response");
    return response.data;
  } catch (error) {
    console.log(error, "handleUpdate    error");
    return rejectWithValue(error);
  }
});

export const handleFetch = createAsyncThunk("/fetch", async (path, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}${path}`, headerConfig);
    return response.data;
  } catch (error) {
    console.log(error, "--er");
    return rejectWithValue(error);
  }
});
