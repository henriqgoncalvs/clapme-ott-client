import instance from 'core/api/instance';
import { UpdateUser } from 'lib/types/api/user';

export const updateMe = async ({ id, body }: UpdateUser) =>
  instance.unauthorized().patch(`/user/${id}`, body);

export const me = async () => instance.authorized().get('/client/user/me');
