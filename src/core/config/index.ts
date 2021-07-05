export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME;
export const COMPANY_TOKEN = process.env.COMPANY_TOKEN;

export const ACCESS_TOKEN = `_${COMPANY_NAME}_ott_access`;
export const REFRESH_TOKEN = `_${COMPANY_NAME}_ott_refresh`;
export const CART_COOKIES = `_${COMPANY_NAME}_ott_cart`;

export const FIREBASE_USERS_ONLINE_COLLECTION =
  process.env.NEXT_PUBLIC_FIREBASE_USERS_ONLINE_COLLECTION || '';
