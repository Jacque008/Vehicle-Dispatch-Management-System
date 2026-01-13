# WeChat Mini Program Setup Guide

This guide will help you set up and run the Vehicle Dispatch WeChat Mini Program on your local Mac.

## Step 1: Install WeChat DevTools

1. Download WeChat DevTools from: https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
2. Install the application
3. Open WeChat DevTools

## Step 2: Import the Project

1. Click **"Import Project"** (导入项目)
2. **Project Directory**: Select the `miniprogram` folder
   - Path: `/Users/jiechen/Vehicle_Dispatch/miniprogram`
3. **AppID**: Enter `touristappid` (for testing without registration)
   - This allows development without a registered WeChat account
4. Click **"Import"**

## Step 3: Configure Local Development

### Enable Local Testing

In WeChat DevTools:
1. Click **"Details"** (详情) in the top right
2. Go to **"Local Settings"** (本地设置)
3. Enable these options:
   - ✅ **"Do not verify valid domains, web-view domains, TLS versions and HTTPS certificates"**
   - ✅ **"Enable hot reload"**

### Configure Backend URL

The Mini Program is already configured to use `http://localhost:3000/graphql` for development.

If your backend is running on a different port or IP, edit `app.js`:

```javascript
globalData: {
  apiUrl: 'http://localhost:3000/graphql' // Change this
}
```

## Step 4: Start the Backend

Make sure your backend is running:

```bash
# In a separate terminal
cd /Users/jiechen/Vehicle_Dispatch/backend
npm run start:dev
```

The backend should be running on `http://localhost:3000`.

## Step 5: Run the Mini Program

1. In WeChat DevTools, click **"Compile"** (编译) or press `⌘+B`
2. The Mini Program should load in the simulator
3. You should see the login page

## Step 6: Test the Application

### Login Flow

1. Enter an email address
2. Click "Send Verification Code"
3. Check your terminal/backend logs for the OTP code
4. Enter the 6-digit code
5. Click "Verify & Login"

## Testing on Real Device

### Option 1: Using Local Network IP

1. Find your Mac's local IP:
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   # Example output: inet 192.168.1.100
   ```

2. Update `app.js`:
   ```javascript
   apiUrl: 'http://192.168.1.100:3000/graphql'
   ```

3. Make sure your backend listens on all interfaces:
   ```typescript
   // backend/src/main.ts
   await app.listen(3000, '0.0.0.0');
   ```

4. In WeChat DevTools, click **"Preview"** (预览)
5. Scan the QR code with WeChat on your phone
6. Make sure your phone is on the same WiFi network

### Option 2: Using ngrok (Recommended for remote testing)

1. Install ngrok:
   ```bash
   brew install ngrok
   ```

2. Start ngrok:
   ```bash
   ngrok http 3000
   ```

3. Copy the HTTPS URL from ngrok (e.g., `https://abc123.ngrok.io`)

4. Update `app.js`:
   ```javascript
   apiUrl: 'https://abc123.ngrok.io/graphql'
   ```

5. Test in WeChat DevTools or scan QR code for phone testing

## Troubleshooting

### Tab Bar Icons Missing

The tab bar requires icons in the `images/` directory. You have two options:

**Option 1: Add placeholder icons**
Create simple 64x64px PNG files with the required names (see `images/README.md`)

**Option 2: Temporarily disable tab bar**
Edit `app.json` and comment out the `tabBar` section:
```json
{
  "pages": [...],
  "window": {...}
  // "tabBar": {...}
}
```

### Request Failed Errors

Check:
- ✅ Backend is running on port 3000
- ✅ `apiUrl` in `app.js` is correct
- ✅ Domain verification is disabled in DevTools settings
- ✅ No CORS issues (backend should allow requests)

### Cannot Connect on Phone

Check:
- ✅ Phone and Mac are on same WiFi
- ✅ Using Mac's local IP address, not localhost
- ✅ Mac firewall allows incoming connections on port 3000
- ✅ Backend is listening on `0.0.0.0`, not just `localhost`

### OTP Not Working

Check:
- ✅ Backend OTP service is configured
- ✅ Check backend console logs for OTP codes
- ✅ OTP hasn't expired (default: 10 minutes)

## Next Steps

### For Production Deployment

1. **Register WeChat Mini Program account**:
   - Go to https://mp.weixin.qq.com
   - Register a Mini Program account (requires business license for full features)
   - Get your official AppID

2. **Configure production backend**:
   - Deploy backend to a server with HTTPS
   - Update `apiUrl` in `app.js` to production URL

3. **Add server domain to whitelist**:
   - In WeChat Mini Program admin: Settings → Development Settings → Server Domain
   - Add your backend domain (must be HTTPS)

4. **Upload code**:
   - In WeChat DevTools: Click **"Upload"** (上传)
   - Submit for review in WeChat Mini Program admin panel

5. **Add real tab bar icons**:
   - Create or download proper icons (64x64px PNG)
   - Place in `images/` directory

## Useful Commands

```bash
# View backend logs
cd ../backend && npm run start:dev

# Check local IP
ifconfig | grep "inet " | grep -v 127.0.0.1

# Start ngrok tunnel
ngrok http 3000

# Test backend GraphQL endpoint
curl http://localhost:3000/graphql
```

## Resources

- [WeChat Mini Program Documentation](https://developers.weixin.qq.com/miniprogram/en/dev/framework/)
- [WeChat DevTools Download](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- [GraphQL API Docs](../backend/README.md)

## Support

For issues or questions:
1. Check backend logs for errors
2. Check WeChat DevTools console for frontend errors
3. Refer to the main project README and documentation
