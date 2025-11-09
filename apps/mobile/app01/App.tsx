import {store} from './src/store';
import {Provider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigation/StackNavigator';
import {AuthStackNavigator} from './src/navigation/AuthStackNavigator';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

import { AuthProvider, useAuth } from './src/context/AuthContext';
import EmulatorDetector from './src/constants/EmulatorDetector';

function AppContent() {

  // Simple check
  const isEmulator = EmulatorDetector.isEmulator();
  console.log('Running on emulator:', isEmulator);
  
  // Platform-specific check
  const isAndroidEmulator = EmulatorDetector.isAndroidEmulator();
  const isIOSSimulator = EmulatorDetector.isIOSSimulator();
  
  // Get device type
  const deviceType = EmulatorDetector.getDeviceType();
  console.log('Device type:', deviceType);
    
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer key={isAuthenticated ? 'main' : 'auth'}>
      {!isAuthenticated ? (
        <AuthStackNavigator />
      ) : (
        <StackNavigator />
      )}
    </NavigationContainer>
  );
}

function App() {

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AuthProvider>
          {/* <NavigationContainer>
            <StackNavigator />
          </NavigationContainer> */}

            <AppContent/>
          </AuthProvider>

        </Provider>
      </QueryClientProvider>
      <FlashMessage position="top" />
    </SafeAreaProvider>
  );
}

export default App;
