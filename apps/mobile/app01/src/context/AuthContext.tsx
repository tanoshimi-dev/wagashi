import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService, { LoginRequest, RegisterRequest, ApiError
 } from '../services/AuthService';

interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  email_verified_at?: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  emailVerify: (email: string, code: string) => Promise<void>;
  emailVerifyResend: (email: string) => Promise<void>;
  loginBaas: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // Import your navigation param list type
  // import { AuthStackParamList } from '../navigation/types'; // adjust path as needed
  // import { StackNavigationProp } from '@react-navigation/stack';

  // Example type, replace with your actual param list


  // Load stored auth data on app start
  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
      const storedUser = await AsyncStorage.getItem(USER_KEY);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to load stored auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginRequest): Promise<void> => {
    try {
      const response = await authService.login(credentials);
      //const response = await authService.loginBaas(credentials.email, credentials.password);
      console.log('Login successful: response', response);


      // if (response.success && response.data) {
      if (response && response.token && response.user) {
        // const { user: userData, token: authToken, refreshToken } = response.data;
        //const { user: userData, token: authToken } = response.data;
        const userData = response.user;
        const authToken = response.token;
        
        console.log('JSON.stringify: userData', JSON.stringify(userData));
        // Store auth data
        await AsyncStorage.setItem(TOKEN_KEY, authToken);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
        
        // if (refreshToken) {
        //   await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        // }

        // Update state
        setUser(userData);
        setToken(authToken);

        
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Login failed');
    }
  };

  const register = async (userData: RegisterRequest): Promise<void> => {
    try {
      const response = await authService.register(userData);
      
      console.log('AuthContext Response:', response);

      if (response.status === "success" && response.data) {
        // const { user: newUser, token: authToken, refreshToken } = response.data;
        const { user: newUser, token: authToken } = response.data;
        
        // Store auth data
        await AsyncStorage.setItem(TOKEN_KEY, authToken);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));
        
        // if (refreshToken) {
        //   await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        // }

        // Update state
        
        setUser(newUser);
        setToken(authToken);

        //navigation.navigate('EmailVerification', { email: newUser.email });

      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Registration failed');
    }
  };

  const logout = async (): Promise<void> => {

    console.log('Logging out user:', user);
    
    try {
      // Call backend logout if token exists
      if (token) {
        console.log('Logging out user token:', token);
        try {
          await authService.logout(token);
        } catch (error) {
          console.warn('Backend logout failed:', error);
          // Continue with local logout even if backend fails
        }
      }

      // Clear local storage
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY, REFRESH_TOKEN_KEY]);
      
      // Clear state
      setUser(null);
      setToken(null);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      throw new Error('Logout failed');
    }
  };

  const emailVerifyResend = async (email: string): Promise<void> => {
    // Implement email verification logic here
    const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
    console.log('Using stored token for email verify resend:', storedToken);
    console.log('Resending email verification to:', email);

    try {
      const response = await authService.emailVerifyResend(email, storedToken || '');

      console.log('AuthContext Response:', response);

      if (response.status === "success" ) {
        // const { user: newUser, token: authToken, refreshToken } = response.data;
        // const { user: newUser, token: authToken } = response.data;
        
        // // Store auth data
        // await AsyncStorage.setItem(TOKEN_KEY, authToken);
        // await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));
        

        // setUser(newUser);
        // setToken(authToken);

//        navigation.navigate('EmailVerification', { email });

      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Registration failed');
    }
  };

  const emailVerify = async (email: string,code: string): Promise<void> => {
    // Implement email verification logic here
    console.log('Verifying email with code:', code);
    try {
      const response = await authService.emailVerify(email, code);

      console.log('AuthContext Response:', response);

      if (response.status === "success" && response.data) {
        // const { user: newUser, token: authToken, refreshToken } = response.data;
        const { user: newUser, token: authToken } = response.data;
        
        // Store auth data
        await AsyncStorage.setItem(TOKEN_KEY, authToken);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));
        

        setUser(newUser);
        setToken(authToken);

        // navigation.navigate('Home');

      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Registration failed');
    }
  };

  const loginBaas = async (email: string, password: string): Promise<void> => {
    try {
      //const response = await authService.login(credentials);
      const response = await authService.signInFirebase(email, password);
      console.log('Login Baas successful: response', response);


      // if (response.success && response.data) {
      if (response && response.idToken && response.user) {
        // const { user: userData, token: authToken, refreshToken } = response.data;
        //const { user: userData, token: authToken } = response.data;
        const userData = response.user;
        const authToken = response.idToken;
        
        console.log('JSON.stringify: userData', JSON.stringify(userData));
        // Store auth data
        await AsyncStorage.setItem(TOKEN_KEY, authToken);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
        
        // if (refreshToken) {
        //   await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        // }

        // Update state
        setUser(userData);
        setToken(authToken);

        
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Login failed');
    }
  };


  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    logout,
    register,
    emailVerify,
    emailVerifyResend,
    loginBaas,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};