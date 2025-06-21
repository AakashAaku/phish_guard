# PhishGuard Installation Guide

## 🚀 Quick Start

### For Users (Browser Extension)

#### Chrome/Chromium Installation

1. **Download or Clone the Extension**
   ```bash
   git clone <repository-url>
   cd phishguard-extension
   ```

2. **Open Chrome Extensions Page**
   - Navigate to `chrome://extensions/`
   - Or click Menu (⋮) → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle "Developer mode" in the top right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the `phishguard-extension` folder
   - The extension should now appear in your extensions list

5. **Verify Installation**
   - Look for the PhishGuard icon in your browser toolbar
   - Visit any website to see the protection indicator
   - Click the extension icon to access the popup

#### Firefox Installation

1. **Prepare Extension for Firefox**
   ```bash
   # Navigate to extension directory
   cd phishguard-extension
   
   # Create a zip file of all extension files
   zip -r phishguard-firefox.zip . -x "*.git*" "node_modules/*" "src/*" "*.md"
   ```

2. **Install in Firefox**
   - Open Firefox and navigate to `about:debugging`
   - Click "This Firefox"
   - Click "Load Temporary Add-on"
   - Select the `phishguard-firefox.zip` file

#### Edge Installation

1. **Open Edge Extensions Page**
   - Navigate to `edge://extensions/`
   - Enable "Developer mode"

2. **Load Extension**
   - Click "Load unpacked"
   - Select the extension folder
   - Confirm installation

### For Developers (Development Setup)

#### Prerequisites
- Node.js 16+ and npm
- Git
- Chrome/Chromium browser
- Code editor (VS Code recommended)

#### Development Installation

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd phishguard-extension
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Load Extension in Browser**
   ```bash
   # The extension files are ready to load
   npm run build:extension
   ```

4. **Load in Chrome**
   - Open `chrome://extensions/`
   - Enable Developer mode
   - Click "Load unpacked"
   - Select the project root directory

5. **Start React Development (Optional)**
   ```bash
   # For the web dashboard
   npm run dev
   ```

#### Development Workflow

1. **Make Changes**
   - Edit extension files (background.js, popup/, options/, etc.)
   - Modify React dashboard (src/ directory)

2. **Reload Extension**
   - Go to `chrome://extensions/`
   - Click refresh icon on PhishGuard extension
   - Or press Ctrl+R on the extensions page

3. **Debug Extension**
   - **Background Script**: Right-click extension → "Inspect views: background page"
   - **Popup**: Right-click extension icon → "Inspect popup"
   - **Options**: Right-click extension → "Options" → F12
   - **Content Script**: Use DevTools on any webpage

## 🔧 Configuration

### Extension Permissions

The extension requires these permissions:
- `activeTab` - Access current tab information
- `tabs` - Monitor tab changes for protection
- `storage` - Save settings and whitelist
- `webRequest` - Analyze network requests
- `declarativeNetRequest` - Block malicious requests

### Initial Setup

After installation:

1. **Configure Protection Level**
   - Right-click extension icon → Options
   - Choose: Permissive, Moderate (recommended), or Strict

2. **Enable Detection Methods**
   - Threat Database: ✅ (recommended)
   - Heuristic Analysis: ✅ (recommended)
   - Form Protection: ✅ (recommended)

3. **Add Trusted Sites**
   - Visit trusted websites
   - Click extension icon → "Add to Whitelist"
   - Or manage in Options → Trusted Sites

## 🧪 Testing Installation

### Verify Extension Works

1. **Check Extension Status**
   - Extension icon appears in toolbar
   - Green "Protected by PhishGuard" indicator on websites
   - Popup shows current protection status

2. **Test Protection Features**
   ```bash
   # Test URLs (safe for testing)
   http://example.com  # Should show HTTP warning
   https://google.com  # Should show as safe
   ```

3. **Test Settings**
   - Open Options page
   - Change protection level
   - Add/remove whitelist entries
   - Check statistics display

### Common Installation Issues

#### Extension Not Loading
**Problem**: Extension doesn't appear after loading
**Solutions**:
- Ensure all files are in the correct directory structure
- Check manifest.json is valid
- Reload the extensions page
- Check browser console for errors

#### Permissions Denied
**Problem**: Extension can't access required permissions
**Solutions**:
- Manually grant permissions in chrome://extensions/
- Check if running in incognito mode
- Verify manifest.json permissions are correct

#### Content Script Not Working
**Problem**: No protection indicator on websites
**Solutions**:
- Refresh browser tabs after installation
- Check if content script files exist
- Verify content_scripts in manifest.json

## 📱 Platform-Specific Notes

### Chrome/Chromium
- Full feature support
- Best performance and compatibility
- Recommended for development

### Firefox
- Requires manifest v2 compatibility
- Some API differences may need adjustment
- Test thoroughly before deployment

### Edge
- Similar to Chrome (Chromium-based)
- Full compatibility expected
- May require minor adjustments

### Safari
- Requires significant modifications
- Different extension architecture
- Not currently supported

## 🔄 Updates and Maintenance

### Updating the Extension

#### For Users
1. **Automatic Updates** (when published to store)
   - Extensions update automatically
   - Check chrome://extensions/ for update status

2. **Manual Updates** (developer mode)
   - Download new version
   - Replace old files
   - Reload extension in browser

#### For Developers
1. **Pull Latest Changes**
   ```bash
   git pull origin main
   npm install  # If dependencies changed
   ```

2. **Reload Extension**
   - Refresh extension in browser
   - Test new features
   - Update version in manifest.json

### Backup and Restore

#### Export Settings
1. Open PhishGuard Options
2. Click "Export Data"
3. Save JSON file with settings and whitelist

#### Import Settings
1. Reinstall extension
2. Open Options
3. Use import feature (if available) or manually reconfigure

## 🆘 Troubleshooting

### Installation Problems

#### "Package is invalid" Error
- Check manifest.json syntax
- Ensure all required files exist
- Verify file permissions

#### Extension Crashes
- Check browser console for errors
- Disable other extensions temporarily
- Clear browser cache and data

#### Performance Issues
- Reduce detection sensitivity
- Clear extension storage
- Update browser to latest version

### Getting Help

#### Self-Help
1. Check this installation guide
2. Review the User Manual
3. Test with minimal configuration
4. Clear browser data and retry

#### Support Channels
- **GitHub Issues**: Technical problems and bugs
- **Email**: support@phishguard.com
- **Documentation**: Comprehensive guides
- **Community**: User forums and discussions

## 📋 Checklist

### Pre-Installation
- [ ] Browser supports extensions (Chrome/Firefox/Edge)
- [ ] Developer mode can be enabled
- [ ] Sufficient disk space available
- [ ] Internet connection for updates

### Post-Installation
- [ ] Extension icon visible in toolbar
- [ ] Protection indicator appears on websites
- [ ] Popup opens and shows statistics
- [ ] Options page accessible and functional
- [ ] Settings save and persist
- [ ] Whitelist functionality works
- [ ] Threat detection active

### Development Setup
- [ ] Node.js and npm installed
- [ ] Repository cloned successfully
- [ ] Dependencies installed
- [ ] Extension loads in browser
- [ ] Development tools accessible
- [ ] Hot reload working (for React dashboard)

---

**Need more help?** Check our [User Manual](USER_MANUAL.md) or [Developer Documentation](README.md)