export type User = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  is_active: boolean;
  role: string;
  last_login: string;
  first_login: string;
  created_at: string;
  updated_at: string;
};

export type RegisterUser = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  cpf: string;
  phone: string;
  company_token: number;
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

export type UpdateUser = {
  id?: number;
  body: {
    name?: string;
    email?: string;
    cpf?: string;
    phone?: string;
    company_id?: number;
  };
};

export type UpdateUserPass = {
  id?: number;
  body: {
    password?: string;
    password_confirmation?: string;
  };
};
