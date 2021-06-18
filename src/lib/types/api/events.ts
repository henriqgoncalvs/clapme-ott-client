import { ArtistsI } from 'lib/types/api/artists';
import { ProductI } from 'lib/types/api/product';

export type EventI = {
  id: number | string;
  banner: string;
  title: string;
  company_id: number;
  description: string;
  is_active: boolean;
  is_highlight: boolean;
  url_player: string;
  is_coming_soon: boolean;
  premiere_date: string;
  premiere_hour: string;
  live_duration: string;
  banner_video: string;
  og_title: string;
  og_description: string;
  og_url: string;
  artists: ArtistsI[];
  products: ProductI[];
};
