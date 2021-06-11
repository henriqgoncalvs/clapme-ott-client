import instance from 'core/api/instance';

export const showEvent = async (id?: string | string[], token?: string) =>
  instance.authorized(token).get(`/client/event/${id}`);

export const events = async (token?: string) =>
  instance.authorized(token).get('/client/event');

export const nextEvents = async (token?: string) =>
  instance.authorized(token).get('/client/next-events');
