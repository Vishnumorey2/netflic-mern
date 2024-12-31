import {create} from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'

export const useAuthUser = create((set) => ({
    user: null,
    isSignup: false,
    isCheckingAuth:true,
    isLoggingout: false,
    isLoggingin: false,
    signup: async (credentials) => {
        set({isSignup:true});
        try{
            const response = await axios.post("/api/v1/auth/signup", credentials);
            set({user: response.data.user,isSignup:false});
            toast.success("Account created successfully");
        }catch(err){
            toast.error(err.response.data.message || "Signup failed");
            set({isSignup:false,user: null});
        }  
    },
    login: async (credentials) => {
        set({isLoggingin: true});
        try {
            const response = await axios.post("/api/v1/auth/login", credentials);
            set({user: response.data.user,isLoggingin: false});
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Login failed");
            set({isLoggingin: false,user: null});
        }
    },
    logout: async () => {
        set({isLoggingout: true});
        try {
            await axios.post("/api/v1/auth/logout");
            set({user: null,isLoggingout: false});
            toast.success("Logged out successfully");
        } catch (error) {
            set({isLoggingout: false});
            toast.error(error.response.data.message || "Logout failed");
        }
    },
    authCheck: async () => {
        set({isCheckingAuth:true});
        console.log("inside authUser.js authCheck fun");
        try{
            //here iam getting error response 
            console.log("Request sent with cookies:", document.cookie);
            const response = await axios.get("http://localhost:5000/api/v1/auth/authCheck",{withCredentials:true});
            console.log("authCheck response: ", response.data.user);
            set({user: response.data.user,isCheckingAuth:false});
        }catch (err){
            set({user: null,isCheckingAuth:false});
            console.log("err",err.message);
        }
    },
}));