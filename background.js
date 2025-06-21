// PhishGuard Background Service Worker
class PhishGuard {
  constructor() {
    this.threatDatabase = [];
    this.protectionStats = {
      threatsBlocked: 0,
      sitesScanned: 0,
      lastUpdate: Date.now()
    };
    this.settings = {
      protectionLevel: 'moderate',
      enableHeuristics: true,
      enableThreatDB: true,
      autoUpdate: true
    };
    this.whitelist = new Set();
    
    this.init();
  }

  async init() {
    await this.loadSettings();
    await this.loadThreatDatabase();
    this.setupEventListeners();
    this.startThreatUpdater();
  }

  async loadSettings() {
    const result = await chrome.storage.sync.get(['settings', 'whitelist', 'stats']);
    if (result.settings) this.settings = { ...this.settings, ...result.settings };
    if (result.whitelist) this.whitelist = new Set(result.whitelist);
    if (result.stats) this.protectionStats = { ...this.protectionStats, ...result.stats };
  }

  async saveSettings() {
    await chrome.storage.sync.set({
      settings: this.settings,
      whitelist: Array.from(this.whitelist),
      stats: this.protectionStats
    });
  }

  async loadThreatDatabase() {
    // Simulated threat database - in production, this would fetch from a real API
    this.threatDatabase = [
      { domain: 'paypaI.com', type: 'typosquatting', risk: 'high' },
      { domain: 'amazon-security.com', type: 'impersonation', risk: 'high' },
      { domain: 'apple-verification.net', type: 'impersonation', risk: 'high' },
      { domain: 'microsoft-support.org', type: 'impersonation', risk: 'high' },
      { pattern: /secure.*\.tk$/, type: 'suspicious-tld', risk: 'medium' },
      { pattern: /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/, type: 'ip-direct', risk: 'medium' },
      { pattern: /bit\.ly|tinyurl|shorturl/, type: 'url-shortener', risk: 'low' }
    ];
  }

  setupEventListeners() {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === 'loading' && tab.url) {
        this.scanUrl(tab.url, tabId);
      }
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      this.handleMessage(request, sender, sendResponse);
      return true;
    });
  }

  async scanUrl(url, tabId) {
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname;
      
      // Skip whitelisted domains
      if (this.whitelist.has(domain)) return;
      
      this.protectionStats.sitesScanned++;
      
      const threatLevel = await this.analyzeThreat(urlObj);
      
      if (threatLevel.risk === 'high' || 
          (threatLevel.risk === 'medium' && this.settings.protectionLevel === 'strict')) {
        
        this.protectionStats.threatsBlocked++;
        await this.saveSettings();
        
        // Block the page
        await this.blockPage(tabId, threatLevel);
      }
      
    } catch (error) {
      console.error('Error scanning URL:', error);
    }
  }

  async analyzeThreat(urlObj) {
    const threats = [];
    
    if (this.settings.enableThreatDB) {
      // Check against threat database
      for (const threat of this.threatDatabase) {
        if (threat.domain && urlObj.hostname.includes(threat.domain)) {
          threats.push(threat);
        } else if (threat.pattern && threat.pattern.test(urlObj.href)) {
          threats.push(threat);
        }
      }
    }
    
    if (this.settings.enableHeuristics) {
      // Heuristic analysis
      const heuristicThreats = this.runHeuristicAnalysis(urlObj);
      threats.push(...heuristicThreats);
    }
    
    // Determine overall risk level
    const highRiskThreats = threats.filter(t => t.risk === 'high');
    const mediumRiskThreats = threats.filter(t => t.risk === 'medium');
    
    if (highRiskThreats.length > 0) {
      return { risk: 'high', threats, primary: highRiskThreats[0] };
    } else if (mediumRiskThreats.length > 0) {
      return { risk: 'medium', threats, primary: mediumRiskThreats[0] };
    } else if (threats.length > 0) {
      return { risk: 'low', threats, primary: threats[0] };
    }
    
    return { risk: 'none', threats: [] };
  }

  runHeuristicAnalysis(urlObj) {
    const threats = [];
    const domain = urlObj.hostname;
    const path = urlObj.pathname;
    
    // Suspicious domain patterns
    if (domain.includes('secure') && domain.includes('login')) {
      threats.push({ type: 'suspicious-keywords', risk: 'medium' });
    }
    
    // Long subdomain chains
    if (domain.split('.').length > 4) {
      threats.push({ type: 'suspicious-subdomain', risk: 'medium' });
    }
    
    // Suspicious TLDs
    const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf'];
    if (suspiciousTlds.some(tld => domain.endsWith(tld))) {
      threats.push({ type: 'suspicious-tld', risk: 'medium' });
    }
    
    // URL encoding suspicion
    if (urlObj.href.includes('%') && urlObj.href.split('%').length > 3) {
      threats.push({ type: 'excessive-encoding', risk: 'low' });
    }
    
    return threats;
  }

  async blockPage(tabId, threatLevel) {
    const blockPageUrl = chrome.runtime.getURL('blocked/blocked.html') + 
      `?url=${encodeURIComponent(threatLevel.url)}&threat=${encodeURIComponent(JSON.stringify(threatLevel))}`;
    
    await chrome.tabs.update(tabId, { url: blockPageUrl });
  }

  handleMessage(request, sender, sendResponse) {
    switch (request.action) {
      case 'getStats':
        sendResponse(this.protectionStats);
        break;
      case 'getSettings':
        sendResponse(this.settings);
        break;
      case 'updateSettings':
        this.settings = { ...this.settings, ...request.settings };
        this.saveSettings();
        sendResponse({ success: true });
        break;
      case 'addToWhitelist':
        this.whitelist.add(request.domain);
        this.saveSettings();
        sendResponse({ success: true });
        break;
      case 'removeFromWhitelist':
        this.whitelist.delete(request.domain);
        this.saveSettings();
        sendResponse({ success: true });
        break;
      case 'getWhitelist':
        sendResponse(Array.from(this.whitelist));
        break;
    }
  }

  startThreatUpdater() {
    // Update threat database every hour
    setInterval(async () => {
      if (this.settings.autoUpdate) {
        await this.loadThreatDatabase();
      }
    }, 3600000);
  }
}

// Initialize PhishGuard
const phishGuard = new PhishGuard();