import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, BarChart3, Globe, Users, Zap } from 'lucide-react';

interface Stats {
  threatsBlocked: number;
  sitesScanned: number;
  lastUpdate: number;
}

function App() {
  const [stats, setStats] = useState<Stats>({
    threatsBlocked: 1247,
    sitesScanned: 15632,
    lastUpdate: Date.now()
  });

  const [isExtensionInstalled, setIsExtensionInstalled] = useState(false);

  useEffect(() => {
    // Check if running as extension
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id) {
      setIsExtensionInstalled(true);
      // Load real stats from extension
      chrome.runtime.sendMessage({ action: 'getStats' }, (response) => {
        if (response) {
          setStats(response);
        }
      });
    }
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Real-time Protection",
      description: "Advanced AI-powered threat detection analyzes every website you visit in real-time."
    },
    {
      icon: AlertTriangle,
      title: "Multi-layer Security",
      description: "Combines threat databases, heuristic analysis, and behavioral patterns for comprehensive protection."
    },
    {
      icon: CheckCircle,
      title: "Smart Whitelisting",
      description: "Intelligent whitelist management learns from your browsing habits and trusted sites."
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Comprehensive statistics and insights about your browsing security and threat landscape."
    }
  ];

  const threatTypes = [
    { name: "Phishing Sites", count: 892, color: "bg-red-500" },
    { name: "Malware Domains", count: 234, color: "bg-orange-500" },
    { name: "Suspicious URLs", count: 121, color: "bg-yellow-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">PhishGuard</h1>
                <p className="text-blue-200">Advanced Phishing Protection</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isExtensionInstalled ? (
                <div className="flex items-center space-x-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-lg">
                  <CheckCircle className="h-5 w-5" />
                  <span>Extension Active</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-lg">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Install Extension</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Protect Yourself from
            <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent"> Phishing Attacks</span>
          </h2>
          <p className="text-xl text-blue-200 mb-12 max-w-3xl mx-auto">
            PhishGuard uses advanced AI and threat intelligence to protect you from malicious websites, 
            phishing attempts, and online scams in real-time.
          </p>
          
          {!isExtensionInstalled && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto mb-12">
              <h3 className="text-2xl font-bold text-white mb-4">Quick Installation Guide</h3>
              <div className="text-left space-y-4 text-blue-200">
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  <p>Open Chrome and navigate to <code className="bg-black/30 px-2 py-1 rounded">chrome://extensions/</code></p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  <p>Enable "Developer mode" using the toggle in the top right</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                  <p>Click "Load unpacked" and select the PhishGuard extension folder</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                  <p>The extension will appear in your toolbar - you're protected!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl p-8 border border-green-500/30">
              <div className="flex items-center justify-between mb-4">
                <Shield className="h-12 w-12 text-green-400" />
                <span className="text-3xl font-bold text-white">{stats.threatsBlocked.toLocaleString()}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Threats Blocked</h3>
              <p className="text-green-200">Malicious sites prevented from harming users</p>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-2xl p-8 border border-blue-500/30">
              <div className="flex items-center justify-between mb-4">
                <Globe className="h-12 w-12 text-blue-400" />
                <span className="text-3xl font-bold text-white">{stats.sitesScanned.toLocaleString()}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Sites Scanned</h3>
              <p className="text-blue-200">Websites analyzed for potential threats</p>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30">
              <div className="flex items-center justify-between mb-4">
                <Users className="h-12 w-12 text-purple-400" />
                <span className="text-3xl font-bold text-white">50K+</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Protected Users</h3>
              <p className="text-purple-200">People staying safe with PhishGuard</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Advanced Protection Features</h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Comprehensive security tools designed to keep you safe from the latest online threats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-blue-200 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Threat Analytics */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Threat Landscape</h2>
            <p className="text-blue-200">Recent threats blocked by PhishGuard</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="space-y-6">
              {threatTypes.map((threat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${threat.color}`}></div>
                    <span className="text-white font-medium">{threat.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${threat.color}`}
                        style={{ width: `${(threat.count / 1247) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-blue-200 font-mono">{threat.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-3xl p-12 border border-blue-500/30">
            <Zap className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Stay Protected?</h2>
            <p className="text-xl text-blue-200 mb-8">
              Join thousands of users who trust PhishGuard to keep them safe online
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  const browser = {
                    isChrome: /chrome/i.test(navigator.userAgent) && /Google/i.test(navigator.vendor),
                    isFirefox: /firefox/i.test(navigator.userAgent),
                    isEdge: /edg/i.test(navigator.userAgent),
                    isSafari: /safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent)
                  };

                  let storeUrl = '';
                  if (browser.isChrome) {
                    storeUrl = 'https://chrome.google.com/webstore/detail/phishguard';
                  } else if (browser.isFirefox) {
                    storeUrl = 'https://addons.mozilla.org/firefox/addon/phishguard';
                  } else if (browser.isEdge) {
                    storeUrl = 'https://microsoftedge.microsoft.com/addons/detail/phishguard';
                  } else if (browser.isSafari) {
                    storeUrl = 'https://apps.apple.com/app/phishguard-safari';
                  }

                  if (storeUrl) {
                    window.open(storeUrl, '_blank');
                  }
                }} 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
              >
                Install Extension
              </button>
              <button 
                onClick={() => window.open('/documentation', '_blank')}
                className="bg-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30"
              >
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md border-t border-white/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">PhishGuard</h3>
                <p className="text-blue-200 text-sm">Advanced Phishing Protection</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-blue-200">
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <span className="text-sm">v1.0.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;