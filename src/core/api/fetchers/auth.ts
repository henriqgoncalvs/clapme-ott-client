import instance from 'core/api/instance';
import { Login } from 'lib/types/api/auth';

export const login = async (body: Login) =>
  instance.unauthorized().post(`/login`, body);
