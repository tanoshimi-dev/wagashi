import {Platform} from 'react-native';

const MAIN_URL = 'https://george-fx.github.io/mesio-api/';

export const GET_DISHES = `${MAIN_URL}dishes.json`;
export const GET_REVIEWS = `${MAIN_URL}reviews.json`;
export const GET_PROMOCODES = `${MAIN_URL}promocodes.json`;

import EmulatorDetector from '../constants/EmulatorDetector';


const SWEETS_URL = EmulatorDetector.getAPIUrl();
// 物理デバイスから（ローカルPC内の）dockerコンテナへのアドレスは？？
// PCでifconfigで表示されたen0のinetアドレス。（PC ゲートウェイ 192.168.0.1）
// スマホのゲートウェイアドレス（スマホゲートウェイ 192.168.0.1）
//const SWEETS_URL = 'http://192.168.0.154:10011';
//const SWEETS_URL = 'http://localhost:10011/';
//const SWEETS_URL = 'http://10.0.2.2:10011/';
//const SWEETS_URL = 'http://192.168.0.246:10011';

export const GET_SWEETS = `${SWEETS_URL}/api/products`;
export const GET_SWEETS_DETAIL = `${SWEETS_URL}/api/product`;
export const GET_CATEGORIES = `${SWEETS_URL}/api/categories`;
export const GET_ANNOUNCEMENTS = `${SWEETS_URL}/api/announcements`;
export const GET_ANNOUNCEMENT = `${SWEETS_URL}/api/announcement`;

export const URLS = {
  MAIN_URL,
  GET_DISHES,
  GET_REVIEWS,
  GET_PROMOCODES,
  
  GET_SWEETS,
  GET_SWEETS_DETAIL,
  GET_CATEGORIES,
  GET_ANNOUNCEMENTS,
  GET_ANNOUNCEMENT,
};
