// Login API function
import {http} from "@/lib/axiosInstance";
import axios from "axios";

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
    password: string;
    // Add any other request fields from your API
}

interface RegisterResponse {
    token: string;
    user: RegisterRequest;
}

export const register = async (credentials: RegisterRequest): Promise<RegisterResponse> => {
    const {email, password} = credentials;
    try {
        const response = await http.post<RegisterResponse>('/register', {
            email,
            password,
            // Add any other request fields from your API
        });
        return response.data; // Return the response data
    } catch (error) {
        // Handle error response
        if (axios.isAxiosError(error)) {
            // Axios-specific error handling
            console.error('Registration failed:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Registration failed');
        } else {
            // Generic error handling
            console.error('Unexpected error:', error);
            throw new Error('An unexpected error occurred');
        }
    }
};
