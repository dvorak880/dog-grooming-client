export interface LoginRequest {
    username: string;
    password: string;
  }
  
  export interface RegisterRequest {
    username: string;
    password: string;
    firstName: string;
  }
  
  export interface AuthResponse {
    userId: number;
    firstName: string;
    token: string;
  }