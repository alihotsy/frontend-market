import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthResponse, BadRegister, LoginBadCredentials, InvalidJWT } from '../../../interfaces/auth.interface';
import { AuthUser, States } from "../../../interfaces/redux-auth.interface";



const initialState:AuthUser = {
        authState: States.Checking,
        user: null,
        token: null,
        errors:null,
}

export const authSlice = createSlice({
    name:'auth',
    initialState: initialState,
    reducers: {

        checkingCredentials: (state) => {
          state.authState = States.Checking;
        
        },

        login: (state, action: PayloadAction<AuthResponse>) => {
          state.authState = States.Authenticated;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.errors = null;

        },

        logout: (state,action:PayloadAction<BadRegister | LoginBadCredentials | InvalidJWT | null>) => {
          state.authState = States.NotAuthenticated;
          state.user = null;
          state.token = null;
          state.errors = action.payload;
        }



    }

})

export const { checkingCredentials, login, logout } = authSlice.actions;
