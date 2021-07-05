import { Dayjs } from 'dayjs';

import { ArtistsI } from 'lib/types/api/artists';
import { ProductI } from 'lib/types/api/product';

export type EventCardProps = {
  imgUrl: string;
  title: string;
  description: string;
  date: string;
  id: number | string;
  slug: string;
  artists: ArtistsI[];
  products: ProductI[];
};

export type ProductCardCartProps = {
  title: string;
  description: string;
  id: number | string;
  price?: string;
};

export type MessageI = {
  text: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  sendedAt: Dayjs;
  sender: string;
  company: string;
  uid: string | number;
  displayName: string;
};

export type UserChatI = {
  displayName: string;
  uid: string;
  createdAt: Date;
  company: string;
};

export type ComplementaryMaterialProps = {
  event: string;
  author: string;
  date: string;
  url: string;
};
