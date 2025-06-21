// import {BookOpen } from 'lucide-react';

// export default function Documentation() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
//       {/* Header */}
//       <section className="py-20">
//         <div className="max-w-4xl mx-auto px-4">
//           <h2 className="text-4xl font-bold text-white mb-6">
//             <BookOpen className="inline-block mr-4" />
//             PhishGuard Documentation
//           </h2>
          
//           {/* Add documentation content here */}
//         </div>
//       </section>
//     </div>
//   );
// }



import { BookOpen, Download, ShieldCheck, Settings, HelpCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Documentation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative">
      
      {/* Back button in top right */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded shadow flex items-center"
      >
        <ArrowLeft className="mr-2" size={18} />
        Back
      </button>

      {/* Header */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-6 flex items-center">
            <BookOpen className="inline-block mr-4" size={32} />
            PhishGuard Documentation
          </h2>
          <p className="text-slate-300 text-lg">
            Learn how to install, use, and troubleshoot the PhishGuard browser extension for AI-powered phishing protection.
          </p>
        </div>
      </section>

      {/* Content sections go here */}
      <section className="max-w-4xl mx-auto px-4 space-y-16 pb-20">
          {/* Installation */}
          <div>
          <h3 className="text-2xl font-semibold flex items-center mb-4">
            <Download className="mr-2" /> Installation
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-slate-200">
            <li>Download or clone the PhishGuard extension source code.</li>
            <li>Open <strong>chrome://extensions</strong> in your browser.</li>
            <li>Enable <strong>Developer Mode</strong> in the top right corner.</li>
            <li>Click <strong>"Load unpacked"</strong> and select the extension folder.</li>
            <li>Ensure the extension is enabled and visible in your browser toolbar.</li>
          </ol>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-2xl font-semibold flex items-center mb-4">
            <ShieldCheck className="mr-2" /> Features
          </h3>
          <ul className="list-disc list-inside space-y-2 text-slate-200">
            <li>Real-time phishing detection using AI-based heuristics.</li>
            <li>Automatic blocking of suspicious links and forms.</li>
            <li>Alerts on suspicious email login pages or credential stealers.</li>
            <li>Customizable allow/block list (coming soon).</li>
          </ul>
        </div>

        {/* Permissions */}
        <div>
          <h3 className="text-2xl font-semibold flex items-center mb-4">
            <Settings className="mr-2" /> Permissions Explained
          </h3>
          <ul className="list-disc list-inside space-y-2 text-slate-200">
            <li><strong>activeTab</strong> – Access the current tab content for analysis.</li>
            <li><strong>tabs</strong> – Needed to detect suspicious tab navigations.</li>
            <li><strong>declarativeNetRequest</strong> – Used to block phishing domains and suspicious URLs.</li>
            <li><strong>storage</strong> – Saves user settings locally in the browser.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-semibold flex items-center mb-4">
            <HelpCircle className="mr-2" /> Troubleshooting
          </h3>
          <ul className="list-disc list-inside space-y-2 text-slate-200">
            <li>If the extension doesn't load, make sure the folder has a valid <code>manifest.json</code>.</li>
            <li>Ensure you're using <strong>Manifest V3</strong> with compatible permissions.</li>
            <li>Check the browser console for errors (right-click the extension &gt; Inspect).</li>
            <li>Re-enable the extension or reload it via chrome://extensions.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

