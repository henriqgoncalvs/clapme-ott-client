export type User = {
  id: number;
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

export type UpdateUser = {
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  company_id?: number;
};

export type UpdateUserPass = {
  password?: string;
  password_confirmation?: string;
};
