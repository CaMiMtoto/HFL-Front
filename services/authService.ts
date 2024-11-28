// Login API function
import {http} from "@/lib/axiosInstance";
import axios from "axios";
import RegisterResponse from "@/interfaces/RegisterResponse";

// Define the types for the request and response
interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string; // Assuming the API returns a token
    message: string;
    action: number
}

export const loginUser = (credentials: LoginRequest) => {
    const {email, password} = credentials;
    return http.post<LoginResponse>('/authenticate', {
        email,
        password,
    }).then(({data}) => {
        if (data.action === 1) {
            return data;
        } else {
            return Promise.reject(data);
        }
    });
};

// Logout API function
export const logout = async () => {
    try {
        const response = await http.post('/logout');
        // On successful logout, remove token from local storage
        localStorage.removeItem('token');
        return response.data; // Return the response data
    } catch (error) {
        // Handle error response
        if (axios.isAxiosError(error)) {
            // Axios-specific error handling
            console.error('Logout failed:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Logout failed');
        } else {
            // Generic error handling
            console.error('Unexpected error:', error);
            throw new Error('An unexpected error occurred');
        }
    }
};

// Register API function
interface RegisterRequest {
    name: string;
    email: string;
    phone: string;
}


export const registerUser = (credentials: RegisterRequest) => {
    const {email, name, phone} = credentials;
    return http.post<RegisterResponse>('/register/applicant', {
        email,
        name,
        phone,
    });
};


export function resendOtp({applicantId}: { applicantId: number }) {
    return http.post<RegisterResponse>(`/register/resend-otp`, {
        "applicantId": applicantId
    }).then(({data}) => {
        if (data.action === 1) {
            return data;
        } else {
            return Promise.reject(data);
        }
    })
}
