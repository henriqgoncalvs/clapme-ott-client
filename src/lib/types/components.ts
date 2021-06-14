import { ArtistsI } from 'lib/types/api/artists';

export type EventCardProps = {
  imgUrl: string;
  title: string;
  description: string;
  date: string;
  id: string;
  artists: ArtistsI[];
  productId: string;
};

export type EventCardCartProps = {
  productId: string;
  imgUrl: string;
  title: string;
  description: string;
  id: string;
  date: string;
};

export type LoginFormProps = {
  email: string;
  password: string;
};
