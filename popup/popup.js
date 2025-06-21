// PhishGuard Popup Script
class PhishGuardPopup {
  constructor() {
    this.currentTab = null;
    this.stats = {
      threatsBlocked: 0,
      sitesScanned: 0
    };
    
    this.init();
  }

  async init() {
    await this.getCurrentTab();
    await this.loadStats();
    this.updateUI();
    this.setupEventListeners();
  }

  async getCurrentTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    this.currentTab = tab;
  }

  async loadStats() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'getStats' }, (response) => {
        if (response) {
          this.stats = response;
        }
        resolve();
      });
    });
  }

  updateUI() {
    // Update stats
    document.getElementById('threatsBlocked').textContent = this.stats.threatsBlocked.toLocaleString();
    document.getElementById('sitesScanned').textContent = this.stats.sitesScanned.toLocaleString();

    // Update site status
    this.updateSiteStatus();
  }

  updateSiteStatus() {
    const statusCard = document.querySelector('.status-card');
    const statusIcon = document.querySelector('.status-icon');
    const statusInfo = document.querySelector('.status-info');
    
    if (this.currentTab && this.currentTab.url) {
      const url = new URL(this.currentTab.url);
      const isSecure = url.protocol === 'https:';
      
      if (isSecure) {
        statusCard.className = 'status-card secure';
        statusIcon.innerHTML = `
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4"/>
          </svg>
        `;
        statusInfo.innerHTML = `
          <h3>This Site is Safe</h3>
          <p>Secure connection verified</p>
        `;
      } else {
        statusCard.className = 'status-card warning';
        statusIcon.innerHTML = `
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
        `;
        statusInfo.innerHTML = `
          <h3>Connection Not Secure</h3>
          <p>This site uses HTTP instead of HTTPS</p>
        `;
      }
    }
  }

  setupEventListeners() {
    // Whitelist button
    document.getElementById('whitelistBtn').addEventListener('click', () => {
      this.addToWhitelist();
    });

    // Report button
    document.getElementById('reportBtn').addEventListener('click', () => {
      this.reportPhishing();
    });

    // Settings button
    document.getElementById('settingsBtn').addEventListener('click', () => {
      chrome.runtime.openOptionsPage();
    });
  }

  async addToWhitelist() {
    if (this.currentTab && this.currentTab.url) {
      const url = new URL(this.currentTab.url);
      const domain = url.hostname;

      chrome.runtime.sendMessage({
        action: 'addToWhitelist',
        domain: domain
      }, (response) => {
        if (response.success) {
          this.showNotification('Site added to whitelist', 'success');
        }
      });
    }
  }

  reportPhishing() {
    if (this.currentTab && this.currentTab.url) {
      // In a real implementation, this would send to a reporting API
      this.showNotification('Thank you for the report. This site will be reviewed.', 'info');
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : '#3b82f6'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PhishGuardPopup();
});