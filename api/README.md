# 🚀 API Service Architecture

Modern ve ölçeklenebilir API servis yapısı.

## 📦 Gerekli Paketler

Aşağıdaki komutları çalıştırarak gerekli paketleri yükleyin:

```bash
npm install axios @react-native-async-storage/async-storage
```

## 📁 Yapı

```
api/
├── client.ts              # Ana API client (Axios wrapper)
├── interceptors.ts        # Request/Response interceptors
├── error-handler.ts       # Merkezi hata yönetimi
├── storage.ts            # Token ve user data storage
├── types/
│   └── index.ts          # TypeScript tipleri
├── services/
│   ├── auth.service.ts   # Auth servisleri
│   ├── user.service.ts   # User servisleri
│   └── index.ts          # Servis export
└── index.ts              # Ana export
```

## 🔧 Özellikler

### ✅ Implement Edilenler:

1. **Type-Safe API Client**
   - Generic tip desteği
   - Axios wrapper ile clean API
   - Request/Response interceptors

2. **Auth Service**
   - Login, Register, Logout
   - Token yönetimi (access + refresh)
   - Forgot/Reset password
   - Email verification

3. **User Service**
   - Profil yönetimi
   - Profil resmi upload
   - Account silme

4. **Error Handling**
   - Merkezi hata yönetimi
   - Custom ApiException class
   - User-friendly error messages
   - HTTP status code handling

5. **Storage Management**
   - Token storage (access + refresh)
   - User data caching
   - Secure storage operations

6. **Interceptors**
   - Auto token injection
   - Token refresh on 401
   - Request/Response logging (dev mode)
   - Error transformation

## 📖 Kullanım Örnekleri

### 1. Login

\`\`\`typescript
import { authService } from "@/api";

try {
  const result = await authService.login({
    email: "user@example.com",
    password: "password123"
  });
  
  console.log("User:", result.user);
  console.log("Token:", result.token);
} catch (error) {
  console.error("Login error:", error);
}
\`\`\`

### 2. Register

\`\`\`typescript
import { authService } from "@/api";

try {
  const result = await authService.register({
    name: "John",
    surname: "Doe",
    email: "john@example.com",
    password: "password123",
    confirmPassword: "password123",
    agreedToTerms: true
  });
  
  console.log("Registered:", result.user);
} catch (error) {
  console.error("Register error:", error);
}
\`\`\`

### 3. Get User Profile

\`\`\`typescript
import { userService } from "@/api";

try {
  const user = await userService.getProfile();
  console.log("Profile:", user);
} catch (error) {
  console.error("Profile error:", error);
}
\`\`\`

### 4. Upload Profile Image

\`\`\`typescript
import { userService } from "@/api";

try {
  const imageUrl = await userService.uploadProfileImage(imageUri);
  console.log("Uploaded:", imageUrl);
} catch (error) {
  console.error("Upload error:", error);
}
\`\`\`

### 5. Logout

\`\`\`typescript
import { authService } from "@/api";

try {
  await authService.logout();
  // Navigate to login screen
} catch (error) {
  console.error("Logout error:", error);
}
\`\`\`

### 6. Error Handling

\`\`\`typescript
import { authService, ApiException, getErrorMessage } from "@/api";

try {
  await authService.login(credentials);
} catch (error) {
  if (error instanceof ApiException) {
    const message = getErrorMessage(error);
    Alert.alert("Error", message);
  }
}
\`\`\`

## 🔐 Token Management

Token'lar otomatik olarak yönetilir:

- **Auto-injection:** Her istekte token otomatik eklenir
- **Auto-refresh:** 401 durumunda token yenilenir
- **Auto-clear:** Refresh başarısız olursa storage temizlenir

## 🎯 Backend Entegrasyonu

Backend'inizin şu formatta response dönmesi beklenir:

\`\`\`typescript
// Success response
{
  "success": true,
  "data": { /* your data */ },
  "message": "Optional message"
}

// Error response
{
  "success": false,
  "error": "Error message",
  "message": "Optional detailed message",
  "statusCode": 400
}
\`\`\`

## 📝 API Endpoints (Backend'de implement edilmesi gerekenler)

### Auth Endpoints:
- `POST /auth/login` - Login
- `POST /auth/register` - Register
- `POST /auth/logout` - Logout
- `GET /auth/me` - Get current user
- `POST /auth/refresh` - Refresh token
- `POST /auth/forgot-password` - Forgot password
- `POST /auth/reset-password` - Reset password
- `POST /auth/change-password` - Change password
- `POST /auth/verify-email` - Verify email
- `POST /auth/resend-verification` - Resend verification

### User Endpoints:
- `GET /users/profile` - Get profile
- `PUT /users/profile` - Update profile
- `POST /users/profile/image` - Upload profile image
- `DELETE /users/account` - Delete account

## 🔄 Next Steps

1. **Install packages:**
   \`\`\`bash
   npm install axios @react-native-async-storage/async-storage
   \`\`\`

2. **Update storage.ts:**
   - Remove in-memory fallback
   - Uncomment real AsyncStorage import

3. **Configure API URL:**
   - Update `config/index.ts` with your API URL
   - Add to `.env` file

4. **Integrate with screens:**
   - Use authService in login/register screens
   - Add loading states
   - Add error handling

5. **Add authentication context:**
   - Create AuthContext for global state
   - Persist authentication state
   - Handle auto-login

## 🎨 TypeScript Support

Tüm servisler tam TypeScript desteği ile gelir:
- Request tipleri
- Response tipleri  
- Error tipleri
- Generic support

## 📚 Best Practices

1. Always use try-catch
2. Handle errors gracefully
3. Show user-friendly messages
4. Log errors in development
5. Clear sensitive data on logout
6. Validate before API calls
7. Use loading states
8. Implement retry logic for failed requests

## 🐛 Debug

Development modunda tüm API istekleri console'a loglanır:

```
📤 API Request: { method: "POST", url: "/auth/login", data: {...} }
📥 API Response: { status: 200, data: {...} }
❌ API Error: { status: 400, message: "..." }
```

## 🔗 İlgili Dosyalar

- Backend: `ai-diet-assist-backend/src/auth/`
- Frontend Config: `config/index.ts`
- Components: `app/(auth)/login.tsx`, `app/(auth)/register.tsx`

