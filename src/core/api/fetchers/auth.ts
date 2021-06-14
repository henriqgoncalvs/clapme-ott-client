import instance from 'core/api/instance';
import { Login } from 'lib/types/api/auth';
import { ForgotPass, RegisterUser, ResetPass } from 'lib/types/api/user';

export const login = async (body: Login) =>
  instance.unauthorized().post(`/login`, body);

export const register = async (body: RegisterUser) =>
  instance.unauthorized().post(`/register`, body);

export const forgotPass = async (body: ForgotPass) =>
  instance.unauthorized().post(`/forgot-password`, body);

export const resetPass = async (body: ResetPass) =>
  instance.unauthorized().post(`/reset-password`, body);
