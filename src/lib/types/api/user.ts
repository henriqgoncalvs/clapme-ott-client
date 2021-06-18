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

export type UpdateUser = {
  id?: string | number;
  body: {
    name?: string;
    email?: string;
    cpf?: string;
    phone?: string;
  };
};

export type UpdateUserPass = {
  id?: number;
  body: {
    password?: string;
    password_confirmation?: string;
  };
};
