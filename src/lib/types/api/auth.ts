export type Login = {
  email: string;
  password: string;
};

export type RegisterUser = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  cpf: string;
  phone: string;
  company_token?: string;
};

export type ForgotPass = {
  email: string;
};

export type ResetPass = {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
};

export type VerifyEmail = {
  code: string | string[] | undefined;
};
