import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serviceUrl } from "../Service/url";

export const addSalary = createAsyncThunk(
    'salary/addSalary', 
    async(data) => {
        try {
            const response = await axios.post(`${serviceUrl}/salary/addSalary`, data, {headers: {
                'Content-Type': 'application/json'
            }})
            if(response.data.success){
                // return response.data.data;
            }
            else{
                throw new Error(response.data.message);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
)
export const getAllSalary = createAsyncThunk(
    'salary/getAllSalary', 
    async() => {
        try {
            const response = await axios.get(`${serviceUrl}/salary/getAllSalary`, {headers: {
                'Content-Type': 'application/json'
            }})
            if(response.data.success){
                return response.data.data;
            }
            else{
                throw new Error(response.data.message);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
)
export const getASalary = createAsyncThunk(
    'salary/getASalary', 
    async(id) => {
        try {
            const response = await axios.get(`${serviceUrl}/salary/getASalary/${id}`, {headers: {
                'Content-Type': 'application/json'
            }})
            if(response.data.success){
                return response.data.data;
            }
            else{
                throw new Error(response.data.message);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
)
export const updateASalary = createAsyncThunk(
    'salary/updateASalary', 
    async(data, id) => {
        try {
            const response = await axios.put(`${serviceUrl}/salary/updateASalary/${id}`, data , {headers: {
                'Content-Type': 'application/json'
            }})
            if(response.data.success){
                // return response.data.data;
            }
            else{
                throw new Error(response.data.message);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
)
export const deleteASalary = createAsyncThunk(
    'salary/deleteASalary', 
    async(data, id) => {
        try {
            const response = await axios.delete(`${serviceUrl}/salary/deleteASalary/${id}`, data , {headers: {
                'Content-Type': 'application/json'
            }})
            if(response.data.success){
                // return response.data.data;
            }
            else{
                throw new Error(response.data.message);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
)



const initialState = {
    salary: [],
}

const employeeSlice = createSlice({
    name: "salary",
    salary: [],
    initialState,
    aSalary: null,
    loading: false,
    error: null,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addSalary.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addSalary.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(addSalary.rejected, (state) => {
            state.loading = false;
        })
        .addCase(getAllSalary.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllSalary.fulfilled, (state) => {
            state.loading = false;
            state.salary = action.payload;
        })
        .addCase(getAllSalary.rejected, (state) => {
            state.loading = false;
        })
        .addCase(getASalary.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getASalary.fulfilled, (state) => {
            state.loading = false;
            state.aSalary = action.payload;
        })
        .addCase(getASalary.rejected, (state) => {
            state.loading = false;
        })
        .addCase(updateASalary.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateASalary.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(updateASalary.rejected, (state) => {
            state.loading = false;
        })
        .addCase(deleteASalary.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteASalary.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(deleteASalary.rejected, (state) => {
            state.loading = false;
        })
        
    }
})

export default employeeSlice.reducer;