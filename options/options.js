// PhishGuard Options Script
class PhishGuardOptions {
  constructor() {
    this.settings = {
      protectionLevel: 'moderate',
      enableThreatDB: true,
      enableHeuristics: true,
      enableFormProtection: true
    };
    this.whitelist = [];
    this.stats = {
      threatsBlocked: 0,
      sitesScanned: 0
    };
    
    this.init();
  }

  async init() {
    await this.loadSettings();
    this.updateUI();
    this.setupEventListeners();
  }

  async loadSettings() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'getSettings' }, (response) => {
        if (response) {
          this.settings = { ...this.settings, ...response };
        }
        resolve();
      });
    });
  }

  async loadWhitelist() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'getWhitelist' }, (response) => {
        if (response) {
          this.whitelist = response;
        }
        resolve();
      });
    });
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

  async updateUI() {
    // Update protection level radio buttons
    const protectionRadios = document.querySelectorAll('input[name="protectionLevel"]');
    protectionRadios.forEach(radio => {
      radio.checked = radio.value === this.settings.protectionLevel;
    });

    // Update detection method toggles
    document.getElementById('enableThreatDB').checked = this.settings.enableThreatDB;
    document.getElementById('enableHeuristics').checked = this.settings.enableHeuristics;
    document.getElementById('enableFormProtection').checked = this.settings.enableFormProtection;

    // Load and display whitelist
    await this.loadWhitelist();
    this.renderWhitelist();

    // Load and display stats
    await this.loadStats();
    this.renderStats();
  }

  renderWhitelist() {
    const container = document.getElementById('whitelistItems');
    
    if (this.whitelist.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p>No trusted sites added yet.</p>
          <p class="text-muted">Add domains above to exclude them from scanning.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.whitelist.map(domain => `
      <div class="whitelist-item">
        <span class="whitelist-domain">${domain}</span>
        <button class="remove-btn" data-domain="${domain}">Remove</button>
      </div>
    `).join('');

    // Add event listeners to remove buttons
    container.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const domain = e.target.dataset.domain;
        this.removeFromWhitelist(domain);
      });
    });
  }

  renderStats() {
    document.getElementById('totalThreatsBlocked').textContent = this.stats.threatsBlocked.toLocaleString();
    document.getElementById('totalSitesScanned').textContent = this.stats.sitesScanned.toLocaleString();
    document.getElementById('whitelistCount').textContent = this.whitelist.length.toString();
  }

  setupEventListeners() {
    // Protection level changes
    const protectionRadios = document.querySelectorAll('input[name="protectionLevel"]');
    protectionRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.checked) {
          this.settings.protectionLevel = radio.value;
          this.saveSettings();
        }
      });
    });

    // Detection method toggles
    document.getElementById('enableThreatDB').addEventListener('change', (e) => {
      this.settings.enableThreatDB = e.target.checked;
      this.saveSettings();
    });

    document.getElementById('enableHeuristics').addEventListener('change', (e) => {
      this.settings.enableHeuristics = e.target.checked;
      this.saveSettings();
    });

    document.getElementById('enableFormProtection').addEventListener('change', (e) => {
      this.settings.enableFormProtection = e.target.checked;
      this.saveSettings();
    });

    // Whitelist management
    document.getElementById('addWhitelistBtn').addEventListener('click', () => {
      this.addToWhitelist();
    });

    document.getElementById('whitelistInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addToWhitelist();
      }
    });

    // Statistics actions
    document.getElementById('resetStatsBtn').addEventListener('click', () => {
      this.resetStats();
    });

    document.getElementById('exportDataBtn').addEventListener('click', () => {
      this.exportData();
    });
  }

  async saveSettings() {
    chrome.runtime.sendMessage({
      action: 'updateSettings',
      settings: this.settings
    }, (response) => {
      if (response.success) {
        this.showNotification('Settings saved successfully', 'success');
      }
    });
  }

  addToWhitelist() {
    const input = document.getElementById('whitelistInput');
    const domain = input.value.trim().toLowerCase();

    if (!domain) {
      this.showNotification('Please enter a domain', 'error');
      return;
    }

    // Basic domain validation
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(domain)) {
      this.showNotification('Please enter a valid domain', 'error');
      return;
    }

    if (this.whitelist.includes(domain)) {
      this.showNotification('Domain already in whitelist', 'warning');
      return;
    }

    chrome.runtime.sendMessage({
      action: 'addToWhitelist',
      domain: domain
    }, (response) => {
      if (response.success) {
        this.whitelist.push(domain);
        this.renderWhitelist();
        this.renderStats();
        input.value = '';
        this.showNotification(`${domain} added to whitelist`, 'success');
      }
    });
  }

  removeFromWhitelist(domain) {
    chrome.runtime.sendMessage({
      action: 'removeFromWhitelist',
      domain: domain
    }, (response) => {
      if (response.success) {
        this.whitelist = this.whitelist.filter(d => d !== domain);
        this.renderWhitelist();
        this.renderStats();
        this.showNotification(`${domain} removed from whitelist`, 'success');
      }
    });
  }

  resetStats() {
    if (confirm('Are you sure you want to reset all statistics? This action cannot be undone.')) {
      // Reset stats in background script
      chrome.runtime.sendMessage({
        action: 'resetStats'
      }, (response) => {
        this.stats = {
          threatsBlocked: 0,
          sitesScanned: 0
        };
        this.renderStats();
        this.showNotification('Statistics reset successfully', 'success');
      });
    }
  }

  exportData() {
    const data = {
      settings: this.settings,
      whitelist: this.whitelist,
      stats: this.stats,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `phishguard-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showNotification('Data exported successfully', 'success');
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span>${message}</span>
        <button class="notification-close">×</button>
      </div>
    `;

    // Styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${this.getNotificationColor(type)};
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      animation: slideInNotification 0.3s ease-out;
      max-width: 400px;
    `;

    // Add styles for notification content and close button
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInNotification {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
      }
      .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.8;
        transition: opacity 0.2s ease;
      }
      .notification-close:hover {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Add close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.remove();
      style.remove();
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
        style.remove();
      }
    }, 5000);
  }

  getNotificationColor(type) {
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    };
    return colors[type] || colors.info;
  }
}

// Initialize options page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PhishGuardOptions();
});