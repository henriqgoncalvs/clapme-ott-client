import { ArtistsI } from 'lib/types/api/artists';

export type EventCardProps = {
  imgUrl: string;
  title: string;
  description: string;
  date: string;
  id: string | number;
  artists: ArtistsI[];
};

export type EventCardCartProps = {
  imgUrl: string;
  title: string;
  description: string;
  date: string;
};

export type LoginFormProps = {
  email: string;
  password: string;
};
