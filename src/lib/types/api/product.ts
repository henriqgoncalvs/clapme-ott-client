import { EventI } from './events';

export type ProductI = {
  id: number | string;
  title: string;
  description: string;
  price: number;
  is_highlight: boolean;
  og_title: string;
  og_description: string;
  og_url: string;
  events: EventI[];
};

export type BoughtProducts = {
  id: number | string;
  user_id: number;
  payment_id: number;
  total_price: number;
  coupon_id: number | string;
  discount: number;
  final_price: number;
  payment_type: string;
  purchase_date: string;
  status: string;
  product: ProductI[];
};
