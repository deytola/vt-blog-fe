import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as api from "../api";
import { LoginType, SignupType, UserType } from "@/types/auth.types";
import { RootState } from "../store";

export const login = createAsyncThunk(
    "/login",
    async ({ payload }: { payload: LoginType }, { rejectWithValue }) => {
        try {
            const response = await api.login(payload);
            toast.success("Signed in successfully");
            return response.data;
        } catch (err: any) {
            toast.error(err.response.data.message);
            return rejectWithValue(err);
        }
    }
);

export const signup = createAsyncThunk(
    "/signup",
    async ({ payload }: { payload: SignupType }, { rejectWithValue }) => {
        try {
            const response = await api.signup(payload);
            toast.success("Signed up successfully");
            return response.data;
        } catch (err: any) {
            toast.error(err.response.data.message);
            return rejectWithValue(err);
        }
    }
);

//RETURN USER OBJECT IF LOGGED IN
export const authenticatedUser = () => {
    if (typeof window === "undefined") {
        return false;
    }
    if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user") || "").user;
    }
    return false;
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null as UserType | null,
        login_loading: false,
        signup_loading: false,
    },

    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem("user");
            window.location.reload();
            state.user = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.login_loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.login_loading = false;
                localStorage.setItem("user", JSON.stringify({ ...action.payload }));
                state.user = action.payload?.user;
            })
            .addCase(login.rejected, (state) => {
                state.login_loading = false;
            });

        builder
            .addCase(signup.pending, (state) => {
                state.signup_loading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.signup_loading = false;
                localStorage.setItem("user", JSON.stringify({ ...action.payload }));
                state.user = action.payload?.user;
            })
            .addCase(signup.rejected, (state) => {
                state.signup_loading = false;
            });
    },
});

export const authSelector = (state: RootState) => state.auth;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
