import instance from 'core/api/instance';

export const nextEvents = async () =>
  instance.authorized().get('/client/next-events');
