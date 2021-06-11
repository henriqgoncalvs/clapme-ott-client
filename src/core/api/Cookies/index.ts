import Cookies from 'js-cookie';

import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ID } from 'core/config';

export class TokenCookies {
  getAccess() {
    return Cookies.get(ACCESS_TOKEN);
  }

  setAccess(accessToken: string) {
    return Cookies.set(ACCESS_TOKEN, accessToken);
  }

  removeAccess() {
    return Cookies.remove(ACCESS_TOKEN);
  }

  getRefresh() {
    return Cookies.get(REFRESH_TOKEN);
  }

  removeRefresh() {
    return Cookies.remove(REFRESH_TOKEN);
  }
}

export class UserIDCookies {
  get() {
    return Cookies.get(USER_ID);
  }

  set(token: string) {
    return Cookies.set(USER_ID, token);
  }

  remove() {
    return Cookies.remove(USER_ID);
  }
}
