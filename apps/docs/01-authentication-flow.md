1. User enters email/password in SignIn screen
   ↓
2. Firebase Authentication (signInWithEmailAndPassword)
   ↓
3. Get Firebase ID Token
   ↓
4. Send ID Token to Laravel backend (/api/mobile/firebase-login)
   ↓
5. Laravel verifies Firebase token
   ↓
6. Laravel finds/creates user in database
   ↓
7. Laravel creates Sanctum token
   ↓
8. Mobile app stores token + user data
   ↓
9. AuthContext updates isAuthenticated = true
   ↓
10. App.tsx switches to StackNavigator (main app)