import { Platform } from 'react-native';
import {API_URL_ANDROID, API_URL_ANDROID_EMULATOR, API_URL_IOS, API_URL_IOS_SIMULATOR, ENV} from '@env';

/**
 * Manual Emulator/Simulator Detection
 * No external libraries required - uses Platform API
 */
class EmulatorDetector {
  /**
   * Check if running on iOS Simulator
   * iOS simulators run on Mac's x86_64 or arm64 architecture
   */
  static isIOSSimulator() {
    if (Platform.OS !== 'ios') return false;
    
    // In iOS, we can check using Platform constants
    // Simulators typically don't have certain hardware capabilities
    //const { systemName, brand, model } = Platform.constants;
    const { systemName } = Platform.constants;

    // Check for simulator-specific indicators
    // Note: This is not 100% reliable without native modules
    return __DEV__ && Platform.OS === 'ios';
  }

  /**
   * Check if running on Android Emulator
   * Android emulators have specific brand/model signatures
   */
  static isAndroidEmulator() {
    if (Platform.OS !== 'android') return false;
    
    const { Brand, Model, Manufacturer } = Platform.constants;
    
    // Common Android emulator signatures
    const emulatorIndicators = {
      brands: ['generic', 'google', 'android'],
      models: [
        'sdk',
        'emulator',
        'android sdk built for x86',
        'sdk_gphone',
        'google_sdk',
        'droid4x',
        'genymotion',
        'adt',
      ],
      manufacturers: ['genymotion', 'google', 'generic'],
    };
    
    const brandLower = (Brand || '').toLowerCase();
    const modelLower = (Model || '').toLowerCase();
    const manufacturerLower = (Manufacturer || '').toLowerCase();
    
    // Check if any emulator indicator matches
    const isBrandMatch = emulatorIndicators.brands.some(brand =>
      brandLower.includes(brand)
    );
    
    const isModelMatch = emulatorIndicators.models.some(model =>
      modelLower.includes(model)
    );
    
    const isManufacturerMatch = emulatorIndicators.manufacturers.some(manufacturer =>
      manufacturerLower.includes(manufacturer)
    );
    
    return isBrandMatch || isModelMatch || isManufacturerMatch;
  }

  /**
   * Check if running on any emulator/simulator
   */
  static isEmulator() {
    return this.isIOSSimulator() || this.isAndroidEmulator();
  }

  /**
   * Get device type as string
   */
  static getDeviceType() {
    if (this.isIOSSimulator()) return 'iOS Simulator';
    if (this.isAndroidEmulator()) return 'Android Emulator';
    return 'Real Device';
  }

  /**
   * Get comprehensive device information
   */
  static getDeviceInfo() {
    const isEmulator = this.isEmulator();
    
    return {
      platform: Platform.OS,
      version: Platform.Version,
      isEmulator,
      deviceType: this.getDeviceType(),
      isIOSSimulator: this.isIOSSimulator(),
      isAndroidEmulator: this.isAndroidEmulator(),
      isDevelopment: __DEV__,
      constants: {
        ...Platform.constants,
      },
    };
  }

  /**
   * Check if running on real device
   */
  static isRealDevice() {
    return !this.isEmulator();
  }

  /**
   * Get appropriate API URL based on device type
   */
  static getAPIUrl(config: {
    androidEmulatorUrl?: string;
    iosSimulatorUrl?: string;
    realDeviceUrl?: string;
    productionUrl?: string;
  } = {}) {
    const {
      androidEmulatorUrl = API_URL_ANDROID_EMULATOR,
      iosSimulatorUrl = API_URL_IOS_SIMULATOR,
      realDeviceUrl = API_URL_ANDROID,
      productionUrl = 'https://api.production.com',
    } = config;

    if (!__DEV__) {
      return productionUrl;
    }

    if (this.isAndroidEmulator()) {
      return androidEmulatorUrl;
    }

    if (this.isIOSSimulator()) {
      return iosSimulatorUrl;
    }

    // Real device in development mode
    return realDeviceUrl;
  }

  /**
   * Log device information to console
   */
  static logDeviceInfo() {
    const info = this.getDeviceInfo();
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📱 DEVICE INFORMATION');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Platform: ${info.platform}`);
    console.log(`Version: ${info.version}`);
    console.log(`Device Type: ${info.deviceType}`);
    console.log(`Is Emulator: ${info.isEmulator ? 'YES' : 'NO'}`);
    console.log(`Development Mode: ${info.isDevelopment ? 'YES' : 'NO'}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (Platform.OS === 'android') {
      console.log(`Brand: ${Platform.constants.Brand}`);
      console.log(`Model: ${Platform.constants.Model}`);
      console.log(`Manufacturer: ${Platform.constants.Manufacturer}`);
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }
}

export default EmulatorDetector;