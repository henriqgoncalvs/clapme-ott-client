import { BoughtProducts } from './api/product';

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
  is_company_admin: boolean;
  user_company: string;
  boughtProducts: BoughtProducts[];
};

export type UpdateUserPass = {
  password?: string;
  password_confirmation?: string;
};
