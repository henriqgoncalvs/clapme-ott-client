import { ArtistsI } from 'lib/types/api/artists';

export type EventCardProps = {
  imgUrl: string;
  title: string;
  description: string;
  date: string;
  id: number | string;
  artists: ArtistsI[];
  productId: number | string;
};

export type EventCardCartProps = {
  productId: number | string;
  imgUrl: string;
  title: string;
  description: string;
  id: number | string;
  date: string;
};
