import instance from 'core/api/instance';

export const get = async (token?: string) =>
  instance.authorized(token).get(`/client/product`);

export const purchase = async (id: string, token?: string) =>
  instance.authorized(token).post(`/client/purchase/${id}`);

export const boughtProducts = async (token?: string) =>
  instance.authorized(token).get(`/client/purchase`);
