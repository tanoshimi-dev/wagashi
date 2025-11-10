import {Platform} from 'react-native';

const MAIN_URL = 'https://george-fx.github.io/mesio-api/';

export const GET_DISHES = `${MAIN_URL}dishes.json`;
export const GET_REVIEWS = `${MAIN_URL}reviews.json`;
export const GET_PROMOCODES = `${MAIN_URL}promocodes.json`;

import EmulatorDetector from '../constants/EmulatorDetector';
  
// Platform-specific check
const isEmulator = EmulatorDetector.isEmulator();
const isAndroidEmulator = EmulatorDetector.isAndroidEmulator();
const isIOSSimulator = EmulatorDetector.isIOSSimulator();

// Platform-specific backend URLs
const getBackendUrl = () => {
  if (isEmulator) {
    if (isIOSSimulator) {
      return 'http://localhost:10011/'; // iOS simulator
    } else if (isAndroidEmulator) {
      return 'http://192.168.0.154:10011/'; // Android emulator
      //return 'http://10.0.2.2:10011/'; // Android emulator
    }

  } else {
    if (Platform.OS === 'ios') {
      return 'http://192.168.0.154:10011/'; // iOS physical device
    } else if (Platform.OS === 'android') {
      return 'http://10.0.2.2:10011/'; // Android physical device
    }
  }
  return 'http://localhost:10011/'; // Default
};


const SWEETS_URL = getBackendUrl();
//const SWEETS_URL = 'http://localhost:10011/';
//const SWEETS_URL = 'http://10.0.2.2:10011/';

export const GET_SWEETS = `${SWEETS_URL}api/products`;
export const GET_SWEETS_DETAIL = `${SWEETS_URL}api/product`;
export const GET_CATEGORIES = `${SWEETS_URL}api/categories`;
export const GET_ANNOUNCEMENTS = `${SWEETS_URL}api/announcements`;
export const GET_ANNOUNCEMENT = `${SWEETS_URL}api/announcement`;

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
