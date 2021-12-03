import {
    loginFailure,
    loginStart,
    loginSuccess,
    logoutFailure,
    logoutStart,
    logoutSuccess,
    registerStart,
    registerSuccess,
    registerFailure

} from "./userRedux"
import { publicRequest, userRequest } from "../requestMethods"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try{
       const res = await publicRequest.post("/login", user)
       dispatch(loginSuccess(res.data))

    }catch(err){
        dispatch(loginFailure())
    }
}

export const register = async (dispatch, user) => {
    dispatch(registerStart())
    try {
        const res = await publicRequest.post("/users/register", user)
        dispatch(registerSuccess(res.data))
    } catch (error) {
        dispatch(registerFailure())
    }
}

export const logout = async (dispatch) => {
    dispatch(logoutStart())
    try{
       await userRequest.get("/logout")
       dispatch(logoutSuccess())

    }catch(err){
        dispatch(logoutFailure())
    }
}