## Mobile Number & Password Authentication Guide

### Overview
The authentication system has been updated to include **mobile number** as a required field for all accounts, along with a standardized default password for initial setup.

### Key Changes

#### 1. **User Model Updates**
- **Added Field**: `mobileNumber` (required, unique, 10 digits)
- **Format**: Indian phone numbers (10 digits only)
- **Validation**: Automatic validation for 10-digit format
- **Uniqueness**: Each mobile number can only be registered once

```javascript
mobileNumber: {
  type: String,
  required: true,
  unique: true,
  trim: true,
  validate: {
    validator: function(v) {
      return /^[0-9]{10}$/.test(v)
    },
    message: 'Mobile number must be 10 digits'
  }
}
```

#### 2. **Authentication Routes**

##### **Register (POST /api/auth/register)**
```javascript
{
  name: "string (required)",
  email: "string (required, unique)",
  mobileNumber: "string (required, 10 digits)",
  password: "string (required)",
  role: "enum: 'admin', 'operator', 'viewer' (optional, default: 'viewer')"
}
```

**Response:**
```javascript
{
  success: true,
  data: {
    user: {
      id: "user_id",
      name: "User Name",
      email: "user@example.com",
      mobileNumber: "9876543210",
      role: "viewer"
    },
    token: "jwt_token"
  }
}
```

##### **Login (POST /api/auth/login)**
Now supports **both email and mobile number** login:

```javascript
// Option 1: Login with email
{
  email: "user@example.com",
  password: "password123"
}

// Option 2: Login with mobile number
{
  mobileNumber: "9876543210",
  password: "password123"
}
```

**Response:**
```javascript
{
  success: true,
  data: {
    user: {
      id: "user_id",
      name: "User Name",
      email: "user@example.com",
      mobileNumber: "9876543210",
      role: "viewer",
      avatar: "avatar_url"
    },
    token: "jwt_token"
  }
}
```

### Default Test Credentials

When you run the seeding script, 3 test users are created with:
- **Default Password**: `team@123` (for all users)
- **Mobile Numbers**: 9876543210, 9876543211, 9876543212

| Role | Email | Mobile | Password |
|------|-------|--------|----------|
| Admin | admin@kumbh-sava.com | 9876543210 | team@123 |
| Operator | operator@kumbh-sava.com | 9876543211 | team@123 |
| Viewer | viewer@kumbh-sava.com | 9876543212 | team@123 |

### Frontend Login Component Integration

```javascript
import { authAPI } from '../../services/api'

// Login with email
const handleEmailLogin = async (email, password) => {
  try {
    const response = await authAPI.login({ email, password })
    const { token, user } = response.data.data
    localStorage.setItem('authToken', token)
    localStorage.setItem('user', JSON.stringify(user))
    // Redirect to dashboard
  } catch (error) {
    console.error('Login failed:', error)
  }
}

// Login with mobile number
const handleMobileLogin = async (mobileNumber, password) => {
  try {
    const response = await authAPI.login({ mobileNumber, password })
    const { token, user } = response.data.data
    localStorage.setItem('authToken', token)
    localStorage.setItem('user', JSON.stringify(user))
    // Redirect to dashboard
  } catch (error) {
    console.error('Login failed:', error)
  }
}

// Registration with mobile number
const handleRegister = async (formData) => {
  try {
    const response = await authAPI.register({
      name: formData.name,
      email: formData.email,
      mobileNumber: formData.mobileNumber, // 10 digits
      password: formData.password,
      role: formData.role
    })
    const { token, user } = response.data.data
    localStorage.setItem('authToken', token)
    localStorage.setItem('user', JSON.stringify(user))
    // Redirect to dashboard
  } catch (error) {
    console.error('Registration failed:', error)
  }
}
```

### Database Seeding

#### **Seed Script Location**: `backend/seed.js`

#### **Run Seeding**:
```bash
cd backend
node seed.js
```

#### **What Gets Created**:
- ✅ 3 test users (admin, operator, viewer)
- ✅ 100 RFID events across 4 zones
- ✅ 4 sample alerts (various types)
- ✅ 3 sample notifications

#### **Output**:
```
🌱 Starting database seeding...
✅ Cleared existing data
✅ Created 3 users with password: team@123
   - Admin: admin@kumbh-sava.com / 9876543210
   - Operator: operator@kumbh-sava.com / 9876543211
   - Viewer: viewer@kumbh-sava.com / 9876543212
✅ Created 100 RFID events
✅ Created 4 alerts
✅ Created 3 notifications

🎉 Database seeding completed successfully!
```

### Backend Setup Instructions

#### **Step 1: Update Dependencies**
```bash
npm install bcryptjs jsonwebtoken
```

#### **Step 2: Update Environment Variables**
Create/update `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/kumbh-sava
JWT_SECRET=your-secret-key-here
PORT=5000
NODE_ENV=development
```

#### **Step 3: Initialize Database**
```bash
node seed.js
```

#### **Step 4: Start Backend Server**
```bash
npm run dev
```

### API Error Handling

#### **Register Errors**:
```javascript
// Missing fields
{
  success: false,
  error: "Name, email, mobile number, and password are required"
}

// Duplicate user
{
  success: false,
  error: "User already exists with this email or mobile number"
}

// Invalid mobile format
{
  success: false,
  error: "Mobile number must be 10 digits"
}
```

#### **Login Errors**:
```javascript
// Missing credentials
{
  success: false,
  error: "Email/Mobile number and password are required"
}

// Invalid credentials
{
  success: false,
  error: "Invalid credentials"
}
```

### Migration Guide (if existing users)

If you have existing users in your database, you need to add mobile numbers:

```javascript
// MongoDB migration script
db.users.updateMany({}, [
  {
    $set: {
      mobileNumber: {
        $concat: [
          { $toString: { $floor: { $multiply: [{ $random: {} }, 10000000000] } } }
        ]
      }
    }
  }
])

// Or manually for each user
db.users.updateOne(
  { _id: ObjectId("user_id") },
  { $set: { mobileNumber: "9876543210" } }
)
```

### Security Best Practices

1. **Password Requirements** (Optional Enhancement):
   - Minimum 8 characters
   - At least 1 uppercase letter
   - At least 1 number
   - At least 1 special character

2. **Mobile Number Verification**:
   - Consider OTP verification for production
   - Store verification status in database

3. **Rate Limiting**:
   - Implement rate limiting on login endpoint
   - Prevent brute force attacks

4. **Session Management**:
   - Use JWT tokens with expiration (7 days default)
   - Implement refresh token mechanism
   - Clear tokens on logout

### Frontend Registration Form Example

```jsx
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
    role: 'viewer'
  })

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, '') // Allow only digits
    if (value.length <= 10) {
      setFormData({ ...formData, mobileNumber: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.mobileNumber.length !== 10) {
      alert('Mobile number must be 10 digits')
      return
    }

    try {
      await authAPI.register(formData)
      // Handle success
    } catch (error) {
      // Handle error
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Mobile Number (10 digits)"
        value={formData.mobileNumber}
        onChange={handleMobileChange}
        maxLength="10"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <select
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      >
        <option value="viewer">Viewer</option>
        <option value="operator">Operator</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  )
}
```

### Testing with cURL

#### **Register with mobile number**:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "mobileNumber": "9876543213",
    "password": "secure@pass123",
    "role": "operator"
  }'
```

#### **Login with mobile number**:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "mobileNumber": "9876543213",
    "password": "secure@pass123"
  }'
```

#### **Login with email**:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "secure@pass123"
  }'
```

### Troubleshooting

**Q: "Mobile number must be 10 digits" error**
- Ensure you're sending exactly 10 digits
- Remove any spaces or special characters
- Check format: `9876543210` (not `+91-98765-43210`)

**Q: "User already exists with this email or mobile number"**
- The email or mobile number is already registered
- Use a different combination or reset the database

**Q: Login fails with valid credentials**
- Clear browser cache and localStorage
- Verify mobile number format (10 digits)
- Check if user account exists in database

**Q: Seed script fails**
- Ensure MongoDB is running
- Check MONGODB_URI in `.env`
- Delete existing users and try again

### Summary

✅ **Mobile Number Required**: All accounts now require a 10-digit mobile number
✅ **Dual Login**: Users can login with either email or mobile number
✅ **Default Password**: `team@123` for all seeded test accounts
✅ **Unique Constraint**: Each mobile number can only be registered once
✅ **Validation**: Automatic validation for 10-digit mobile format
✅ **Public API**: Pilgrim Dashboard uses public endpoints (no auth required)
✅ **Backward Compatible**: Email-based login still works alongside mobile login
