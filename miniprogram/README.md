# Vehicle Dispatch - WeChat Mini Program

This is the WeChat Mini Program frontend for the Vehicle Dispatch system, designed for drivers to manage their assignments and availability.

## Features

- **OTP Authentication**: Secure email-based login with one-time password
- **Home Dashboard**: View available assignments and driver status
- **Assignments Management**: Browse available jobs and manage accepted assignments
- **Assignment History**: Track completed and past assignments
- **Driver Profile**: View and manage driver information

## Tech Stack

- **Framework**: WeChat Mini Program Native
- **Backend API**: GraphQL (NestJS backend)
- **State Management**: WeChat Storage API
- **Styling**: WXSS (WeChat Style Sheets)

## Project Structure

```
miniprogram/
├── pages/              # All page components
│   ├── login/          # Login page with OTP verification
│   ├── home/           # Home dashboard
│   ├── assignments/    # Assignments list and management
│   ├── history/        # Assignment history
│   └── profile/        # Driver profile
├── utils/              # Utility functions
│   ├── api.js          # GraphQL API calls
│   └── util.js         # Helper functions
├── images/             # Tab bar icons and images
├── app.js              # App entry point
├── app.json            # App configuration
├── app.wxss            # Global styles
└── project.config.json # WeChat DevTools configuration
```

## Getting Started

### Prerequisites

1. Install [WeChat DevTools](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. Backend server running (see `/backend` directory)

### Development Setup

1. **Open in WeChat DevTools**:
   - Open WeChat Developer Tools
   - Click "Import Project"
   - Select the `miniprogram` directory
   - Use AppID: `touristappid` (for development without registration)

2. **Configure API Endpoint**:
   Edit `app.js` to set your backend URL:
   ```javascript
   globalData: {
     apiUrl: 'http://localhost:3000/graphql' // Development
     // apiUrl: 'https://your-domain.com/graphql' // Production
   }
   ```

3. **Disable Domain Verification** (Development Only):
   - In WeChat DevTools: Details → Local Settings
   - Enable: "Do not verify valid domains, TLS versions, and HTTPS certificates"

4. **Add Tab Bar Icons**:
   - Place required icons in the `images/` directory
   - See `images/README.md` for icon specifications
   - Or temporarily remove the `tabBar` section in `app.json`

### Testing on Real Device

1. **Using Local Network**:
   ```bash
   # Start backend with network access
   cd ../backend
   npm run start:dev
   # Backend will be available at http://YOUR_LOCAL_IP:3000
   ```

2. **Update API URL** in `app.js`:
   ```javascript
   apiUrl: 'http://192.168.1.100:3000/graphql' // Your Mac's local IP
   ```

3. **Scan QR Code** in WeChat DevTools to preview on phone

### Using ngrok for Remote Testing

```bash
# Install ngrok
brew install ngrok

# Start tunnel
ngrok http 3000

# Update apiUrl in app.js with the ngrok URL
# Example: https://abc123.ngrok.io/graphql
```

## API Integration

The Mini Program communicates with the NestJS backend via GraphQL:

### Authentication Flow

1. User enters email → `sendOtp` mutation
2. User enters OTP code → `verifyOtp` mutation
3. Store JWT token → Use for subsequent requests

### Available API Methods

```javascript
// Authentication
api.auth.sendOtp(email)
api.auth.verifyOtp(email, code)

// Driver Profile
api.driver.getProfile()
api.driver.updateProfile(data)

// Assignments
api.assignment.getAvailable()
api.assignment.getMyAssignments()
api.assignment.respondToAssignment(id, response)
api.assignment.getHistory()

// Availability
api.availability.getSlots()
api.availability.addSlot(startTime, endTime)
api.availability.removeSlot(slotId)
```

## Important Notes

### Development Environment

- ✅ HTTP requests allowed (with domain verification disabled)
- ✅ Local network testing supported
- ✅ Hot reload enabled in DevTools

### Production Requirements

- ❌ HTTPS required (HTTP not allowed in production)
- ❌ Domain must be whitelisted in WeChat Mini Program admin panel
- ❌ Valid SSL certificate required
- ✅ ICP filing required for China deployment

## Deployment Checklist

Before publishing to production:

- [ ] Update `apiUrl` to production HTTPS endpoint
- [ ] Add server domain to WeChat Mini Program whitelist
- [ ] Upload all required tab bar icons
- [ ] Test on multiple devices
- [ ] Configure proper AppID (not `touristappid`)
- [ ] Submit for WeChat review

## Configuration Files

### app.json
- Defines pages, tab bar, and global window settings
- Update navigation bar title and colors here

### project.config.json
- WeChat DevTools project settings
- Update `appid` before production deployment

## Troubleshooting

### "Request failed" errors
- Check if backend is running
- Verify `apiUrl` in `app.js` is correct
- Ensure domain verification is disabled (development)

### Tab bar icons not showing
- Add required PNG icons to `images/` directory
- Or temporarily remove `tabBar` from `app.json`

### Cannot login
- Verify backend GraphQL endpoint is accessible
- Check browser console in DevTools for errors
- Ensure OTP service is configured in backend

## Related Documentation

- [WeChat Mini Program Docs](https://developers.weixin.qq.com/miniprogram/en/dev/framework/)
- [Backend API Documentation](../backend/README.md)
- [Project Setup Guide](../SETUP.md)

## License

MIT
