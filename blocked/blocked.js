// PhishGuard Blocked Page Script
class PhishGuardBlocked {
  constructor() {
    this.blockedUrl = '';
    this.threatInfo = null;
    
    this.init();
  }

  init() {
    this.parseUrlParams();
    this.updateUI();
    this.setupEventListeners();
  }

  parseUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    this.blockedUrl = urlParams.get('url') || 'Unknown URL';
    
    const threatParam = urlParams.get('threat');
    if (threatParam) {
      try {
        this.threatInfo = JSON.parse(decodeURIComponent(threatParam));
      } catch (error) {
        console.error('Error parsing threat info:', error);
        this.threatInfo = { risk: 'unknown', threats: [] };
      }
    }
  }

  updateUI() {
    // Update blocked URL
    document.getElementById('blockedUrl').textContent = this.blockedUrl;

    if (this.threatInfo) {
      // Update threat type
      const threatType = this.threatInfo.primary?.type || 'Unknown threat';
      document.getElementById('threatType').textContent = this.formatThreatType(threatType);

      // Update risk level
      const riskLevel = document.getElementById('riskLevel');
      riskLevel.textContent = this.threatInfo.risk.toUpperCase();
      riskLevel.className = `risk-badge ${this.threatInfo.risk}`;

      // Update threat reasons
      this.updateThreatReasons();
    }
  }

  formatThreatType(type) {
    const typeMap = {
      'typosquatting': 'Typosquatting',
      'impersonation': 'Brand Impersonation',
      'suspicious-tld': 'Suspicious Domain',
      'ip-direct': 'Direct IP Access',
      'url-shortener': 'URL Shortener',
      'suspicious-keywords': 'Suspicious Keywords',
      'suspicious-subdomain': 'Suspicious Subdomain',
      'excessive-encoding': 'Excessive URL Encoding'
    };
    
    return typeMap[type] || type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  updateThreatReasons() {
    const reasonsList = document.getElementById('threatReasons');
    const reasons = [];

    if (this.threatInfo && this.threatInfo.threats) {
      this.threatInfo.threats.forEach(threat => {
        switch (threat.type) {
          case 'typosquatting':
            reasons.push('The domain appears to be impersonating a legitimate website');
            break;
          case 'impersonation':
            reasons.push('This site may be impersonating a well-known brand or service');
            break;
          case 'suspicious-tld':
            reasons.push('The domain uses a top-level domain commonly associated with malicious sites');
            break;
          case 'ip-direct':
            reasons.push('The site is accessed directly by IP address, which is uncommon for legitimate sites');
            break;
          case 'suspicious-keywords':
            reasons.push('The URL or content contains keywords commonly used in phishing attacks');
            break;
          case 'suspicious-subdomain':
            reasons.push('The domain structure appears designed to deceive users');
            break;
          default:
            reasons.push('The site matches patterns associated with malicious activity');
        }
      });
    }

    if (reasons.length === 0) {
      reasons.push(
        'This site may be attempting to steal your personal information',
        'The URL or content matches known phishing patterns',
        'The site may impersonate a legitimate service'
      );
    }

    reasonsList.innerHTML = reasons.map(reason => `<li>${reason}</li>`).join('');
  }

  setupEventListeners() {
    // Go back button
    document.getElementById('goBackBtn').addEventListener('click', () => {
      this.goBack();
    });

    // Report false positive
    document.getElementById('reportBtn').addEventListener('click', () => {
      this.reportFalsePositive();
    });

    // Continue anyway (dangerous)
    document.getElementById('continueBtn').addEventListener('click', () => {
      this.continueAnyway();
    });

    // Help button
    document.getElementById('helpBtn').addEventListener('click', () => {
      this.showHelp();
    });

    // Settings button
    document.getElementById('settingsBtn').addEventListener('click', () => {
      chrome.runtime.openOptionsPage();
    });
  }

  goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // If no history, go to a safe page
      window.location.href = 'https://www.google.com';
    }
  }

  reportFalsePositive() {
    // In a real implementation, this would send a report to the backend
    const confirmed = confirm(
      `Are you sure "${this.blockedUrl}" is safe and was incorrectly blocked?\n\n` +
      "This will help improve PhishGuard's accuracy."
    );

    if (confirmed) {
      // Simulate reporting
      this.showNotification('Thank you for the report. This will help improve our detection accuracy.', 'success');
      
      // In a real app, you might also add the site to a temporary whitelist
      chrome.runtime.sendMessage({
        action: 'reportFalsePositive',
        url: this.blockedUrl,
        threatInfo: this.threatInfo
      });
    }
  }

  continueAnyway() {
    const confirmed = confirm(
      '⚠️ WARNING: This site has been identified as potentially dangerous.\n\n' +
      'Continuing may put your personal information at risk. Are you absolutely sure you want to proceed?'
    );

    if (confirmed) {
      const doubleConfirm = confirm(
        '🚨 FINAL WARNING: You are about to visit a site that may:\n\n' +
        '• Steal your passwords and personal information\n' +
        '• Install malware on your device\n' +
        '• Trick you into financial scams\n\n' +
        'Do you still want to continue?'
      );

      if (doubleConfirm) {
        // Log the override for security analysis
        chrome.runtime.sendMessage({
          action: 'logSecurityOverride',
          url: this.blockedUrl,
          threatInfo: this.threatInfo,
          timestamp: Date.now()
        });

        // Redirect to the original URL
        window.location.href = this.blockedUrl;
      }
    }
  }

  showHelp() {
    const helpContent = `
PhishGuard Help

What is phishing?
Phishing is a type of cyber attack where criminals create fake websites to steal your personal information, passwords, or financial details.

How does PhishGuard protect me?
• Analyzes URLs and website content in real-time
• Checks against databases of known threats
• Uses advanced algorithms to detect suspicious patterns
• Blocks access to potentially dangerous sites

What should I do if a site is blocked?
1. Go back to safety (recommended)
2. If you believe the site is legitimate, report it as a false positive
3. Never enter sensitive information on blocked sites

Need more help?
Visit our support page or contact our security team.
    `;

    alert(helpContent);
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : '#3b82f6'};
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      max-width: 400px;
      animation: slideIn 0.3s ease-out;
    `;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `;
    document.head.appendChild(style);

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
        style.remove();
      }
    }, 5000);
  }
}

// Initialize blocked page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PhishGuardBlocked();
});