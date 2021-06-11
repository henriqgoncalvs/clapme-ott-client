export type User = {
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
