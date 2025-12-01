const HTTPS = 'https://';
const WSS = 'wss://';
const API_HOST = 'ya-praktikum.tech';
const API_VERSION = 'v2';
const API_BASE_URL = `${HTTPS}${API_HOST}/api/${API_VERSION}`;

export const API_WS_URL = `${WSS}${API_HOST}/ws/chats`;
export const RESOURSES_URL = `${API_BASE_URL}/resources`;

export const API_MAPPING = {
  auth: `${API_BASE_URL}/auth`,
  chats: `${API_BASE_URL}/chats`,
  user: `${API_BASE_URL}/user`,
};
