import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serviceUrl } from "../Service/url";

export const addEmployees = createAsyncThunk(
    'employees/addEmployees', 
    async(data) => {
        try {
            const response = await axios.post(`${serviceUrl}/employees/addEmployees`, data, {headers: {
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
export const getEmployees = createAsyncThunk(
    'employees/getEmployees', 
    async() => {
        try {
            const response = await axios.get(`${serviceUrl}/employees/getEmployees`, {headers: {
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
export const getAnEmployees = createAsyncThunk(
    'employees/getAnEmployees', 
    async(email) => {
        try {
            const response = await axios.get(`${serviceUrl}/employees/getAnEmployee/${email}`, {headers: {
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
export const updateAnEmployee = createAsyncThunk(
    'employees/updateAnEmployee', 
    async(data, email) => {
        try {
            const response = await axios.put(`${serviceUrl}/employees/updateEmployee/${email}`, data, {headers: {
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
export const deleteAnEmployee = createAsyncThunk(
    'employees/deleteAnEmployee', 
    async(email) => {
        try {
            const response = await axios.delete(`${serviceUrl}/employees/deleteAnEmployee/${email}`, {headers: {
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
    employees: [],
}

const employeeSlice = createSlice({
    name: "employees",
    employees: [],
    initialState,
    singleEmploye: null,
    loading: false,
    error: null,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addEmployees.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addEmployees.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(addEmployees.rejected, (state) => {
            state.loading = false;
        })
        .addCase(getEmployees.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getEmployees.fulfilled, (state) => {
            state.loading = false;
            state.employees = action.payload;
        })
        .addCase(getEmployees.rejected, (state) => {
            state.loading = false;
        })
        .addCase(getAnEmployees.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAnEmployees.fulfilled, (state) => {
            state.loading = false;
            state.singleEmploye = action.payload;
        })
        .addCase(getAnEmployees.rejected, (state) => {
            state.loading = false;
        })
        .addCase(updateAnEmployee.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateAnEmployee.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(updateAnEmployee.rejected, (state) => {
            state.loading = false;
        })
        .addCase(deleteAnEmployee.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteAnEmployee.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(deleteAnEmployee.rejected, (state) => {
            state.loading = false;
        })
    }
})

export default employeeSlice.reducer;