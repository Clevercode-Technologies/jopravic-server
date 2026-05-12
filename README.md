# JOPRAVIC CDI Backend Server

Node/Express API for handling form submissions and email notifications via ZeptoMail.

## Features

- ✅ Contact form handling with email confirmations
- ✅ Donation intent forms with bank account details
- ✅ Newsletter subscription management
- ✅ ZeptoMail integration for transactional emails
- ✅ Rate limiting and security headers
- ✅ Input validation with Zod
- ✅ Admin notification system

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
# Edit .env with your credentials
```

Required environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `ZEPTOMAIL_API_KEY` | Your ZeptoMail API key | Yes |
| `FROM_EMAIL` | Sender email (default: info@jopravic.com.ng) | No |
| `REPLY_TO_EMAIL` | Reply-to address | No |
| `ADMIN_EMAIL` | Admin notification email | No |
| `CORS_ORIGINS` | Allowed frontend origins | No |
| `PORT` | Server port (default: 3001) | No |

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Health Check
```
GET /health
```

### Form Configuration
```
GET /api/forms/config
```

### Contact Form
```
POST /api/forms/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Partnership Inquiry",
  "message": "I would like to partner with JOPRAVIC..."
}
```

### Donation Form
```
POST /api/forms/donate
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "amount": "₦100,000",
  "project": "Education Support",
  "message": "I want to support education programs"
}
```

### Newsletter Subscription
```
POST /api/forms/newsletter
Content-Type: application/json

{
  "name": "Subscriber Name",
  "email": "subscriber@example.com"
}
```

## ZeptoMail Setup

1. Sign up at [ZeptoMail](https://zeptomail.com)
2. Add and verify your domain `jopravic.com.ng`
3. Generate an API key
4. Add the API key to your `.env` file

## Frontend Integration

Update your React forms to submit to the backend:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const response = await fetch('/api/forms/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  
  const result = await response.json();
  
  if (result.success) {
    // Show success message
  } else {
    // Show error message
  }
};
```

## Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3001
CORS_ORIGINS=https://jopravic.com.ng,https://www.jopravic.com.ng
ZEPTOMAIL_API_KEY=your_live_api_key
FROM_EMAIL=info@jopravic.com.ng
REPLY_TO_EMAIL=info@jopravic.com.ng
ADMIN_EMAIL=info@jopravic.com.ng
```

### PM2 Configuration

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'jopravic-server',
    script: './dist/server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

## License

Private - JOPRAVIC Centre for Development Initiative
