export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface OtpResponse {
  success: boolean;
  message: string;
}

export interface ManagerLoginInput {
  email: string;
  password: string;
}

export interface CreateManagerInput {
  email: string;
  password: string;
  name: string;
}

export interface SendOtpInput {
  email: string;
}

export interface VerifyOtpInput {
  email: string;
  code: string;
}
