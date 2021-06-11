export type User = {
  name: string;
  email: string;
  phone: string;
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
  company_id: number;
};

export type UpdateUser = {
  id: string;
  body: {
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
    cpf?: string;
    phone?: string;
    company_id?: number;
  };
};
