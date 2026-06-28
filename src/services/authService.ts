import axiosInstance from "./axiosInstance";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "../types/auth";

export const authService = {
  register: async (data: RegisterRequest): Promise<void> => {
    await axiosInstance.post("/Auth/register", data);
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>("/Auth/login", data);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("firstName", response.data.firstName);
    localStorage.setItem("userId", response.data.userId.toString());

    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("userId");
  },

  isLoggedIn: (): boolean => {
    return !!localStorage.getItem("token");
  },
};