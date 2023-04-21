import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./fetaures/auth/authSlice"
import BlogReducer from "./fetaures/BlogSlice"
import serviceReducer from "./fetaures/ServiceSlice"
import teamReducer from "./fetaures/TeamSlice"
import AboutReducer from "./fetaures/AboutSlice"
import CareerReducer from "./fetaures/CareerSlice"
import FaqReducer from "./fetaures/FaqSlice"
import InquiryReducer from "./fetaures/InquirySlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: BlogReducer,
    service: serviceReducer,
    team: teamReducer,
    about: AboutReducer,
    career: CareerReducer,
    faq: FaqReducer,
    inquiry: InquiryReducer,
  },
})
