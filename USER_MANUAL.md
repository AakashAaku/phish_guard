# PhishGuard User Manual

![PhishGuard](assets/icon.svg)

Welcome to PhishGuard! This comprehensive guide will help you get the most out of your advanced phishing protection.

## 📖 Table of Contents

1. [Getting Started](#getting-started)
2. [Understanding Protection Levels](#understanding-protection-levels)
3. [Using the Extension](#using-the-extension)
4. [Managing Settings](#managing-settings)
5. [Whitelist Management](#whitelist-management)
6. [Understanding Threats](#understanding-threats)
7. [Troubleshooting](#troubleshooting)
8. [FAQ](#frequently-asked-questions)

## 🚀 Getting Started

### Installation

1. **From Chrome Web Store** (Recommended)
   - Visit the Chrome Web Store
   - Search for "PhishGuard"
   - Click "Add to Chrome"
   - Confirm by clicking "Add extension"

2. **Manual Installation** (Developer Mode)
   - Download the extension files
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (top right toggle)
   - Click "Load unpacked" and select the extension folder

### First Launch

After installation, you'll see:
- PhishGuard icon in your browser toolbar
- A welcome notification confirming protection is active
- Green "Protected by PhishGuard" indicator on safe websites

## 🛡️ Understanding Protection Levels

PhishGuard offers three protection levels to match your security needs:

### 🟢 Permissive (Low Security)
- **Best for**: Advanced users who prefer minimal interruptions
- **Blocks**: Only confirmed high-risk phishing sites
- **False Positives**: Very rare
- **Use Case**: Users who frequently visit diverse websites and can identify threats themselves

### 🟡 Moderate (Balanced) - **Recommended**
- **Best for**: Most users seeking balanced protection
- **Blocks**: High and medium-risk threats
- **False Positives**: Occasional, easily resolved
- **Use Case**: General browsing with good protection without excessive blocking

### 🔴 Strict (Maximum Security)
- **Best for**: High-security environments or vulnerable users
- **Blocks**: All suspicious activity, including low-risk indicators
- **False Positives**: More frequent but comprehensive protection
- **Use Case**: Corporate environments, users handling sensitive data

## 🎯 Using the Extension

### Extension Popup

Click the PhishGuard icon to access:

#### Protection Status
- **Green Shield**: Current site is safe
- **Yellow Warning**: Site has security concerns
- **Red Alert**: Dangerous site detected

#### Quick Stats
- **Threats Blocked**: Total number of blocked malicious sites
- **Sites Scanned**: Total websites analyzed for threats

#### Site Actions
- **Add to Whitelist**: Trust the current website permanently
- **Report as Phishing**: Report a suspected phishing site

### Protection Indicators

#### Safe Site Indicators
- Green "Protected by PhishGuard" badge (top-right corner)
- HTTPS connection verified
- No suspicious patterns detected

#### Warning Indicators
- Yellow warning overlay for suspicious content
- HTTP connection warnings on login forms
- Suspicious keyword alerts

#### Blocked Site Page
When PhishGuard blocks a dangerous site, you'll see:
- Clear threat explanation
- Risk level assessment
- Safe navigation options
- Reporting tools

## ⚙️ Managing Settings

Access settings by right-clicking the PhishGuard icon and selecting "Options".

### Protection Configuration

#### Detection Methods
- **Threat Database**: ✅ Recommended - Checks against known phishing sites
- **Heuristic Analysis**: ✅ Recommended - Analyzes suspicious patterns
- **Form Protection**: ✅ Recommended - Warns about insecure form submissions

#### Advanced Options
- **Auto-Update**: Keeps threat database current
- **Real-time Scanning**: Continuous protection while browsing
- **Background Protection**: Monitors even when popup is closed

### Statistics Dashboard

Monitor your protection with detailed analytics:
- **Daily/Weekly/Monthly** threat statistics
- **Protection effectiveness** metrics
- **Most common threat types** encountered
- **Browsing safety score**

## 📝 Whitelist Management

### Adding Trusted Sites

**Method 1: From Popup**
1. Visit the website you want to trust
2. Click the PhishGuard icon
3. Click "Add to Whitelist"
4. Confirm the action

**Method 2: From Settings**
1. Open PhishGuard settings
2. Navigate to "Trusted Sites" section
3. Enter the domain (e.g., `example.com`)
4. Click "Add Site"

### Managing Whitelisted Sites

- **View All**: See complete list of trusted domains
- **Remove Sites**: Click "Remove" next to any domain
- **Bulk Actions**: Export/import whitelist for backup
- **Domain Validation**: Automatic format checking

### Best Practices for Whitelisting

✅ **Do Whitelist**:
- Your company's internal websites
- Frequently used legitimate services
- Sites with known false positive issues
- Development/testing environments

❌ **Don't Whitelist**:
- Sites you're unsure about
- Shortened URLs (bit.ly, tinyurl, etc.)
- Sites with suspicious characteristics
- Temporary or one-time use sites

## 🚨 Understanding Threats

### Threat Types

#### High Risk 🔴
- **Typosquatting**: Sites mimicking legitimate domains (paypaI.com vs paypal.com)
- **Brand Impersonation**: Fake versions of popular services
- **Credential Harvesting**: Sites designed to steal login information
- **Financial Scams**: Fake banking or payment sites

#### Medium Risk 🟡
- **Suspicious TLDs**: Domains using high-risk extensions (.tk, .ml, .ga)
- **IP Direct Access**: Sites accessed by IP address instead of domain
- **Suspicious Keywords**: URLs containing "secure", "verify", "urgent"
- **Long Subdomain Chains**: Overly complex domain structures

#### Low Risk 🟢
- **URL Shorteners**: Shortened links that hide destination
- **Excessive Encoding**: URLs with unusual character encoding
- **New Domains**: Recently registered domains
- **Mixed Content**: HTTPS sites loading HTTP resources

### When PhishGuard Blocks a Site

#### What You'll See
1. **Blocked Page**: Clear explanation of the threat
2. **Threat Details**: Specific reasons for blocking
3. **Risk Assessment**: Severity level and threat type
4. **Safety Options**: Ways to proceed safely

#### Your Options
1. **Go Back to Safety** (Recommended): Return to previous page
2. **Report False Positive**: If you believe the site is safe
3. **Continue Anyway**: Proceed with full awareness of risks (not recommended)

#### Safety Tips
- Never enter passwords or personal information on blocked sites
- When in doubt, contact the legitimate organization directly
- Use official apps instead of web browsers for sensitive activities
- Keep PhishGuard updated for latest protection

## 🔧 Troubleshooting

### Common Issues

#### Extension Not Working
**Symptoms**: No protection indicator, threats not blocked
**Solutions**:
1. Check if extension is enabled in `chrome://extensions/`
2. Refresh the browser tab
3. Restart your browser
4. Reinstall the extension

#### False Positives
**Symptoms**: Legitimate sites being blocked
**Solutions**:
1. Add the site to your whitelist
2. Report as false positive through the blocked page
3. Temporarily lower protection level
4. Check if site has security issues

#### Settings Not Saving
**Symptoms**: Configuration changes don't persist
**Solutions**:
1. Check browser storage permissions
2. Clear extension data and reconfigure
3. Ensure you're not in incognito mode (if extension isn't enabled for incognito)

#### Performance Issues
**Symptoms**: Slow browsing, high CPU usage
**Solutions**:
1. Disable unnecessary detection methods
2. Clear browsing data
3. Update to latest extension version
4. Check for browser updates

### Getting Help

#### Self-Help Resources
- Check this manual for solutions
- Review FAQ section below
- Test with different protection levels
- Clear browser cache and cookies

#### Contact Support
- **GitHub Issues**: Report bugs and request features
- **Email Support**: support@phishguard.com
- **Community Forum**: Connect with other users
- **Documentation**: Comprehensive guides and tutorials

## ❓ Frequently Asked Questions

### General Questions

**Q: Is PhishGuard free to use?**
A: Yes, PhishGuard is completely free with no premium features or subscriptions.

**Q: Does PhishGuard collect my browsing data?**
A: No, PhishGuard analyzes sites locally and doesn't transmit your browsing history anywhere.

**Q: Which browsers are supported?**
A: Chrome, Firefox, Edge, and other Chromium-based browsers.

**Q: How often is the threat database updated?**
A: The threat database updates automatically every hour when auto-update is enabled.

### Technical Questions

**Q: Can I use PhishGuard with other security extensions?**
A: Yes, PhishGuard is designed to work alongside other security tools.

**Q: Does PhishGuard work in incognito/private mode?**
A: Only if you enable it for incognito mode in your browser's extension settings.

**Q: How much memory does PhishGuard use?**
A: PhishGuard is optimized for minimal resource usage, typically under 10MB of RAM.

**Q: Can I export my settings and whitelist?**
A: Yes, use the "Export Data" feature in the settings page.

### Security Questions

**Q: What happens if PhishGuard fails to detect a threat?**
A: No security tool is 100% perfect. Always use good judgment and report new threats you encounter.

**Q: Can attackers bypass PhishGuard?**
A: While PhishGuard provides strong protection, determined attackers may find ways around any security measure. Stay vigilant!

**Q: Should I still be cautious with PhishGuard installed?**
A: Yes, PhishGuard enhances your security but doesn't replace good security practices.

### Troubleshooting Questions

**Q: Why is a legitimate site being blocked?**
A: This is a false positive. Add the site to your whitelist and report it to help improve our detection.

**Q: PhishGuard isn't blocking a known phishing site. Why?**
A: The site might be new or use techniques not yet in our database. Please report it!

**Q: Can I temporarily disable PhishGuard?**
A: Yes, disable the extension in your browser's extension management page.

## 📊 Understanding Your Protection Statistics

### Statistics Explained

#### Threats Blocked
- **Total Count**: Cumulative number of malicious sites blocked
- **Trend Analysis**: Daily/weekly patterns in threat encounters
- **Threat Types**: Breakdown by category (phishing, malware, etc.)

#### Sites Scanned
- **Total Analyzed**: Number of websites checked for threats
- **Clean Sites**: Percentage of safe sites visited
- **Protection Rate**: Effectiveness of threat detection

#### Protection Score
- **Safety Rating**: Overall security posture based on browsing habits
- **Risk Exposure**: Potential threats encountered
- **Improvement Suggestions**: Tips for better security

### Using Statistics for Better Security

1. **Monitor Trends**: Look for patterns in threat encounters
2. **Adjust Settings**: Modify protection levels based on your risk profile
3. **Review Habits**: Identify risky browsing behaviors
4. **Share Insights**: Help others understand common threats

## 🎯 Best Practices for Online Safety

### General Security Tips

1. **Keep Software Updated**: Browser, OS, and extensions
2. **Use Strong Passwords**: Unique passwords for each account
3. **Enable 2FA**: Two-factor authentication where available
4. **Verify URLs**: Check addresses before entering sensitive data
5. **Trust Your Instincts**: If something feels wrong, it probably is

### PhishGuard-Specific Tips

1. **Regular Review**: Check your whitelist monthly
2. **Report Threats**: Help improve protection for everyone
3. **Stay Informed**: Read about new phishing techniques
4. **Backup Settings**: Export your configuration regularly
5. **Test Protection**: Occasionally verify PhishGuard is working

### Emergency Procedures

#### If You Think You've Been Phished
1. **Don't Panic**: Quick action can minimize damage
2. **Change Passwords**: Update affected accounts immediately
3. **Check Accounts**: Review recent activity for unauthorized access
4. **Contact Banks**: Notify financial institutions if applicable
5. **Report Incident**: Help others by reporting the phishing site

#### If PhishGuard Stops Working
1. **Check Extension Status**: Ensure it's enabled and updated
2. **Restart Browser**: Simple restart often resolves issues
3. **Reinstall Extension**: Fresh installation if problems persist
4. **Use Alternative Protection**: Temporary security measures
5. **Contact Support**: Get help from our team

---

## 📞 Support and Resources

### Getting Help
- **Email**: support@phishguard.com
- **GitHub**: Report issues and contribute
- **Documentation**: Comprehensive guides and tutorials
- **Community**: Connect with other users

### Stay Updated
- **Release Notes**: New features and improvements
- **Security Alerts**: Important threat information
- **Best Practices**: Latest security recommendations
- **Community News**: User stories and tips

---

**Thank you for choosing PhishGuard! Stay safe online! 🛡️**

*Last updated: [Current Date]*
*Version: 1.0.0*