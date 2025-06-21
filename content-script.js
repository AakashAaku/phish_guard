// PhishGuard Content Script
class PhishGuardContent {
  constructor() {
    this.init();
  }

  init() {
    this.injectProtectionIndicator();
    this.scanPageContent();
    this.setupFormProtection();
  }

  injectProtectionIndicator() {
    // Create floating protection indicator
    const indicator = document.createElement('div');
    indicator.id = 'phishguard-indicator';
    indicator.innerHTML = `
      <div class="phishguard-indicator">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          <path d="M9 12l2 2 4-4" stroke="white" stroke-width="2" fill="none"/>
        </svg>
        <span>Protected by PhishGuard</span>
      </div>
    `;
    
    document.body.appendChild(indicator);
  }

  async scanPageContent() {
    const suspiciousElements = document.querySelectorAll('input[type="password"], input[type="email"]');
    
    if (suspiciousElements.length > 0) {
      const currentDomain = window.location.hostname;
      
      // Check if this looks like a legitimate login page
      const legitimateDomains = ['google.com', 'facebook.com', 'amazon.com', 'paypal.com', 'microsoft.com'];
      const isLegitimate = legitimateDomains.some(domain => currentDomain.includes(domain));
      
      if (!isLegitimate && this.hasPhishingIndicators()) {
        this.showPhishingWarning();
      }
    }
  }

  hasPhishingIndicators() {
    const title = document.title.toLowerCase();
    const bodyText = document.body.textContent.toLowerCase();
    
    const phishingKeywords = [
      'verify your account',
      'suspend',
      'urgent action required',
      'click here immediately',
      'confirm your identity',
      'security alert'
    ];
    
    return phishingKeywords.some(keyword => 
      title.includes(keyword) || bodyText.includes(keyword)
    );
  }

  showPhishingWarning() {
    const warning = document.createElement('div');
    warning.id = 'phishguard-warning';
    warning.innerHTML = `
      <div class="phishguard-warning">
        <div class="warning-content">
          <div class="warning-icon">⚠️</div>
          <div class="warning-text">
            <h3>Potential Phishing Site Detected</h3>
            <p>This site may be attempting to steal your personal information.</p>
            <div class="warning-actions">
              <button id="leave-site" class="btn-danger">Leave This Site</button>
              <button id="ignore-warning" class="btn-secondary">I Understand the Risk</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(warning);
    
    document.getElementById('leave-site').addEventListener('click', () => {
      window.history.back();
    });
    
    document.getElementById('ignore-warning').addEventListener('click', () => {
      warning.remove();
    });
  }

  setupFormProtection() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      const passwordFields = form.querySelectorAll('input[type="password"]');
      
      if (passwordFields.length > 0) {
        form.addEventListener('submit', (e) => {
          if (!this.isSecureContext()) {
            e.preventDefault();
            this.showInsecureFormWarning();
          }
        });
      }
    });
  }

  isSecureContext() {
    return window.location.protocol === 'https:' || 
           window.location.hostname === 'localhost' ||
           window.location.hostname === '127.0.0.1';
  }

  showInsecureFormWarning() {
    alert('⚠️ PhishGuard Warning: This form is not secure. Your password may be intercepted.');
  }
}

// Initialize content script
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new PhishGuardContent());
} else {
  new PhishGuardContent();
}