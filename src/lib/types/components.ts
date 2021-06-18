import { ArtistsI } from 'lib/types/api/artists';
import { ProductI } from 'lib/types/api/product';

export type EventCardProps = {
  imgUrl: string;
  title: string;
  description: string;
  date: string;
  id: number | string;
  artists: ArtistsI[];
  products: ProductI[];
};

export type ProductCardCartProps = {
  title: string;
  description: string;
  id: number | string;
  price: string;
};
