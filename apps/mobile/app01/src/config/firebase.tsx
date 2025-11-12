import auth from '@react-native-firebase/auth';
import { Platform } from 'react-native';

// Firebase 設定を確認
export const initializeFirebase = async () => {
  try {
    console.log('🔥 Initializing Firebase...');
    console.log('📱 Platform:', Platform.OS);
    
    // Firebase が正しく初期化されているか確認
    const app = auth().app;
    console.log('✅ Firebase App Name:', app.name);
    console.log('✅ Firebase App Options:', app.options);
    
    return true;
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
    return false;
  }
};

// Firebase 認証状態をチェック
export const checkFirebaseAuth = () => {
  const currentUser = auth().currentUser;
  console.log('👤 Current Firebase User:', currentUser?.email || 'Not logged in');
  return currentUser;
};