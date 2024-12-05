import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employeeSlice.js";
import salariesSlice from './salariesSlice.js'

const store = configureStore({
    reducer: {
        'employees': employeeSlice,
    'salaries': salariesSlice
    }
})

export default store;