import instance from 'core/api/instance';
import { Login } from 'lib/types/api/auth';
import { RegisterUser } from 'lib/types/api/user';

export const login = async (body: Login) =>
  instance.unauthorized().post(`/login`, body);

export const register = async (body: RegisterUser) =>
  instance.unauthorized().post(`/register`, body);
