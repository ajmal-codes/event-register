import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./reducers/orderSlice"
import formReducer from "./reducers/formSlice"

export const store = configureStore({
    reducer:{
        order:orderReducer,
        form:formReducer
    }
})