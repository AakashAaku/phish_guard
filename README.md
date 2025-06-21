# PhishGuard - Advanced Phishing Protection Browser Extension

![PhishGuard Logo](assets/icon.svg)

PhishGuard is a sophisticated browser extension that provides real-time protection against phishing websites using AI-powered threat detection and comprehensive threat intelligence databases.

## 🚀 Features

- **Real-time Phishing Detection**: Advanced algorithms analyze URLs and page content
- **Multi-layered Protection**: Threat database + heuristic analysis + form protection
- **Customizable Security Levels**: Strict, Moderate, or Permissive protection modes
- **Whitelist Management**: Trusted sites management with easy controls
- **Threat Analytics**: Comprehensive statistics and protection metrics
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Cross-browser Support**: Chrome, Firefox, Edge, and other Chromium-based browsers

## 📋 Table of Contents

- [Developer Setup](#developer-setup)
- [Extension Installation](#extension-installation)
- [Architecture Overview](#architecture-overview)
- [API Reference](#api-reference)
- [Testing](#testing)
- [Contributing](#contributing)
- [User Manual](#user-manual)

## 🛠 Developer Setup

### Prerequisites

- Node.js 16+ and npm
- Chrome/Chromium browser for testing
- Basic knowledge of browser extension development

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AakashAaku/phish_guard.git
   cd phishguard-extension
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build:extension
   ```

4. **Load extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked" and select the project root directory
   - The extension should now appear in your extensions list

### Development Workflow

#### For Extension Development

1. **Make changes to extension files**
   - `background.js` - Background service worker
   - `content-script.js` - Content script for page analysis
   - `popup/` - Extension popup interface
   - `options/` - Settings page
   - `blocked/` - Threat blocking page

2. **Reload extension**
   - Go to `chrome://extensions/`
   - Click the refresh icon on PhishGuard extension
   - Or use the keyboard shortcut: `Ctrl+R` on the extensions page

3. **Debug extension**
   - **Background script**: Right-click extension → "Inspect views: background page"
   - **Popup**: Right-click extension icon → "Inspect popup"
   - **Content script**: Use browser DevTools on any webpage
   - **Options page**: Right-click extension → "Options" → F12

#### For React Development (Optional Dashboard)

1. **Start development server**
   ```bash
   npm run dev
   ```

2. **Build for production**
   ```bash
   npm run build
   ```

The React app serves as an optional web dashboard for PhishGuard analytics and can be deployed separately.

### Project Structure

```
phishguard-extension/
├── manifest.json              # Extension manifest
├── background.js              # Background service worker
├── content-script.js          # Content script
├── content-styles.css         # Content script styles
├── popup/                     # Extension popup
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── options/                   # Settings page
│   ├── options.html
│   ├── options.css
│   └── options.js
├── blocked/                   # Threat blocking page
│   ├── blocked.html
│   ├── blocked.css
│   └── blocked.js
├── assets/                    # Icons and images
│   └── icon.svg
├── src/                       # React dashboard (optional)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
└── docs/                      # Documentation
    ├── USER_MANUAL.md
    └── API.md
```

## 🏗 Architecture Overview

### Core Components

1. **Background Service Worker** (`background.js`)
   - URL monitoring and threat detection
   - Threat database management
   - Settings and whitelist storage
   - Cross-component communication hub

2. **Content Script** (`content-script.js`)
   - Page content analysis
   - Form protection
   - Real-time threat warnings
   - Protection status indicator

3. **Popup Interface** (`popup/`)
   - Quick access to protection status
   - Site-specific actions (whitelist, report)
   - Real-time statistics display

4. **Options Page** (`options/`)
   - Comprehensive settings management
   - Whitelist administration
   - Protection analytics dashboard

5. **Blocked Page** (`blocked/`)
   - Threat information display
   - User safety options
   - Reporting mechanisms

### Detection Methods

1. **Threat Database Matching**
   - Known phishing domains
   - Suspicious TLD patterns
   - IP-based access detection
   - URL shortener identification

2. **Heuristic Analysis**
   - Suspicious keyword detection
   - Domain structure analysis
   - URL encoding patterns
   - Content-based indicators

3. **Form Protection**
   - Insecure form submission warnings
   - Password field monitoring
   - HTTPS requirement enforcement

## 🧪 Testing

### Manual Testing

1. **Install the extension** following the setup instructions
2. **Test threat detection**:
   - Visit known safe sites (should show green status)
   - Test with suspicious URLs (create test cases)
   - Try form submissions on HTTP sites

3. **Test UI components**:
   - Click extension icon to open popup
   - Access settings via right-click → Options
   - Test whitelist functionality

### Automated Testing

```bash
# Run extension tests (when implemented)
npm run test:extension

# Run React component tests
npm test
```

### Test Cases

Create test scenarios for:
- [ ] Threat detection accuracy
- [ ] False positive handling
- [ ] Whitelist functionality
- [ ] Settings persistence
- [ ] Cross-browser compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and patterns
- Add comments for complex logic
- Test thoroughly across different browsers
- Update documentation for new features
- Ensure responsive design for all screen sizes

## 📚 API Reference

### Background Script Messages

```javascript
// Get current statistics
chrome.runtime.sendMessage({ action: 'getStats' }, (response) => {
  console.log(response); // { threatsBlocked: 42, sitesScanned: 1337 }
});

// Update settings
chrome.runtime.sendMessage({
  action: 'updateSettings',
  settings: { protectionLevel: 'strict' }
}, (response) => {
  console.log(response.success); // true
});

// Manage whitelist
chrome.runtime.sendMessage({
  action: 'addToWhitelist',
  domain: 'example.com'
}, callback);
```

### Content Script Integration

```javascript
// Check if PhishGuard is active
if (document.getElementById('phishguard-indicator')) {
  console.log('PhishGuard is protecting this page');
}
```

## 🔧 Configuration

### Extension Permissions

The extension requires these permissions:
- `activeTab` - Access current tab information
- `tabs` - Monitor tab changes
- `storage` - Save settings and whitelist
- `webRequest` - Analyze network requests
- `declarativeNetRequest` - Block malicious requests

### Settings Options

- **Protection Level**: `permissive` | `moderate` | `strict`
- **Detection Methods**: Enable/disable specific detection techniques
- **Whitelist**: Manage trusted domains
- **Auto-updates**: Automatic threat database updates

## 🚀 Deployment

### Chrome Web Store

1. Create a developer account at [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. Prepare store assets (screenshots, descriptions, icons)
3. Upload the extension package
4. Submit for review

### Firefox Add-ons

1. Create account at [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/)
2. Package extension for Firefox
3. Submit for review

### Edge Add-ons

1. Register at [Microsoft Edge Add-ons Developer Center](https://partner.microsoft.com/dashboard/microsoftedge/)
2. Upload extension package
3. Submit for certification

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Documentation**: [Wiki](https://github.com/your-repo/wiki)
- **Email**: contact@guragaiaakash.com.np

## 🔄 Changelog

### v1.0.0 (Current)
- Initial release
- Real-time phishing detection
- Customizable protection levels
- Whitelist management
- Comprehensive analytics dashboard

---

**Made with ❤️ for a safer web**