import instance from 'core/api/instance';

export const events = async (token?: string) =>
  instance.authorized(token).get('/client/event');

export const nextEvents = async (token?: string) =>
  instance.authorized(token).get('/client/next-events');
