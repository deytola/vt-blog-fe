import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as api from "../api";
import { LoginType, SignupType, UserType } from "@/types/auth.types";
import { RootState } from "../store";
import Cookies from "js-cookie";

const setCookies = ({ name, data }: { name: string; data: any }) => {
    Cookies.set(name, JSON.stringify(data), {
        httpOnly: false,
        secure: true,
        domain: process.env.NEXT_PUBLIC_TL_DOMAIN,
        sameSite: "none",
        path: "/",
    });
};

export const login = createAsyncThunk(
    "/login",
    async (
        { payload, handleSuccess }: { payload: LoginType; handleSuccess: any },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.login(payload);
            handleSuccess();
            setCookies({ name: "user", data: response.data });
            toast.success("Signed in successfully", {
                onClose: () => window.location.reload(),
            });
            return response.data;
        } catch (err: any) {
            toast.error(err.response.data.message);
            return rejectWithValue(err);
        }
    }
);

export const signup = createAsyncThunk(
    "/signup",
    async (
        { payload, handleSuccess }: { payload: SignupType; handleSuccess: any },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.signup(payload);
            handleSuccess();
            setCookies({ name: "user", data: response.data });
            toast.success("Signed up successfully", {
                onClose: () => window.location.reload(),
            });
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
    if (Cookies.get("user")) {
        return JSON.parse(Cookies.get("user") || "");
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
            state.user = null;
            Cookies.remove("user", {
                path: "/",
                domain: process.env.NEXT_PUBLIC_TL_DOMAIN,
            });
            window.location.reload();
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.login_loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.login_loading = false;
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
