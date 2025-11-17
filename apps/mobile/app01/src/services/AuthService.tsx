import EmulatorDetector from '../constants/EmulatorDetector';
import auth from '@react-native-firebase/auth';

const BASE_URL = EmulatorDetector.getAPIUrl();
const API_BASE_URL = `${BASE_URL}/api/mobile`; 

console.log(`API_BASE_URL: ${API_BASE_URL}`);
//const API_BASE_URL = 'http://192.168.0.154:10011/api/mobile/user';

  // 物理デバイスから（ローカルPC内の）dockerコンテナへのアドレスは？？
  // PCでipconfigで表示されたeen0のinetアドレス。（PC ゲートウェイ 192.168.0.1）
  // スマホのゲートウェイアドレス（スマホゲートウェイ 192.168.0.1）
  // 同じネットワークにないとダメ
  // final String baseUrl =
  //     'http://192.168.0.154:11131/api'; // Replace with your local machine's IP address

  //final String baseUrl = 'http://localhost:11131/api';
  //final String baseUrl = 'http://172.20.0.5:11131/api';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// export interface RegisterResponse {
//   success: boolean;
//   data?: {
//     user: {
//       id: number;
//       email: string;
//       name: string;
//       avatar?: string;
//     };
//     token: string;
//     refreshToken?: string;
//   };
//   message?: string;
// }

export interface RegisterResponse {
  success: boolean;
  status: string;
  data?: {
    user: {
      id: number;
      email: string;
      name: string;
      avatar?: string;
    };
    token: string;
    refreshToken?: string;
  };
  message?: string;
}


export interface LoginRequest {
  email: string;
  password: string;
}

// export interface LoginResponse {
//   success: boolean;
//   data?: {
//     user: {
//       id: number;
//       email: string;
//       name: string;
//       avatar?: string;
//     };
//     token: string;
//     refreshToken?: string;
//   };
//   message?: string;
// }

export interface LoginResponse {
  user: {
    id: number;
    email: string;
    name: string;
    avatar?: string;
  };
  token: string;
  message?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

class AuthService {
  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });


      const data = await response.json();
      console.log('AuthService Response:', response);

      if (!response.ok) {
        throw {
          message: data.message || 'An error occurred',
          statusCode: response.status,
        } as ApiError;
      }

      return data;
    } catch (error) {
      if (error instanceof TypeError) {
        // Network error
        throw {
          message: 'Network error. Please check your connection.',
          statusCode: 0,
        } as ApiError;
      }
      throw error;
    }
  }

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    return this.makeRequest('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.makeRequest('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout(token: string): Promise<void> {
    return this.makeRequest('/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }


  async emailVerifyResend(email: string, token: string): Promise<{ message: string }> {
    return this.makeRequest('/email/verification-notification', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });
  }

  async emailVerify(email: string, code: string): Promise<{ message: string }> {
    return this.makeRequest('/email/verify', {
      method: 'POST',
      body: JSON.stringify({ email, verification_code: code }),
    });
  }


  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    return this.makeRequest('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    return this.makeRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    return this.makeRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    });
  }




  async signInFirebase(email: string, password: string): Promise<any> {
    try {
      
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password
      );
      
      console.log('Firebase User Credential:', userCredential);

      // Check if email is verified
      // if (!userCredential.user.emailVerified) {
      //   return {
      //     success: false,
      //     message: 'Please verify your email first',
      //     needsVerification: true
      //   };
      // }
      
      // Get ID token to send to Laravel backend
      const idToken = await userCredential.user.getIdToken();
      
      return {
        success: true,
        user: userCredential.user,
        idToken
      };      

      // Navigation will happen automatically via AuthContext
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Invalid credentials. Please try again.';
      if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = String((error as { message?: string }).message) || errorMessage;
      }
    
    } finally {
      
    }

    

  }

  async registerFirebaseUser(email: string, password: string): Promise<any> {
    try {
      
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      
      console.log('Firebase User Credential:', userCredential);

      // Get ID token to send to Laravel backend
      const idToken = await userCredential.user.getIdToken();
      
      return {
        success: true,
        user: userCredential.user,
        idToken
      };      

      // Navigation will happen automatically via AuthContext
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Invalid credentials. Please try again.';
      if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = String((error as { message?: string }).message) || errorMessage;
      }
    
    } finally {
      
    }

  }

}

export default new AuthService();