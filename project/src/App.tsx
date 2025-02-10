import React, { useState } from 'react';
import { Shield, AlertCircle, Calendar, Lock, ExternalLink, Users, CheckCircle } from 'lucide-react';
import TrustScore from './components/TrustScore';
import ReportScamModal from './components/ReportScamModal';

function App() {
  const [url, setUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [analysisResults, setAnalysisResults] = useState({
    ssl: 'N/A',
    domainAge: 'N/A',
    blacklistStatus: 'N/A',
    trustedSeller: 'N/A',
    monthlyTraffic: 'N/A'
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (url === 'https://www.nurepublic.co/') {
      setScore(85);
      setAnalysisResults({
        ssl: '✅ Valid SSL Certificate',
        domainAge: '📅 Domain Age: 2 years',
        blacklistStatus: '🛡️ Not Blacklisted',
        trustedSeller: '✅ Yes',
        monthlyTraffic: '📈 150,000+ visits/month'
      });
    } else if (url === 'https://www.pimpomstore.com/') {
      setScore(20);
      setAnalysisResults({
        ssl: '❌ Invalid SSL Certificate',
        domainAge: '⚠️ Domain Age: 1 month',
        blacklistStatus: '⚠️ Blacklisted on 2 databases',
        trustedSeller: '❌ No',
        monthlyTraffic: '📉 Less than 1,000 visits/month'
      });
    } else {
      setScore(0);
      setAnalysisResults({
        ssl: 'N/A',
        domainAge: 'N/A',
        blacklistStatus: 'N/A',
        trustedSeller: 'N/A',
        monthlyTraffic: 'N/A'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-16 pb-32">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2 text-white">
            <Shield className="w-8 h-8" />
            <span className="text-xl font-bold">CyberShield</span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            Report a Scam
          </button>
        </nav>

        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Is this website safe to shop?
            <br />
            <span className="text-blue-400">Verify in seconds!</span>
          </h1>
          <form onSubmit={handleVerify} className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL to verify..."
                className="flex-1 px-6 py-4 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors text-lg"
              >
                Verify Now
              </button>
            </div>
          </form>
        </div>
      </header>

      {/* Trust Score Section */}
      <main className="container mx-auto px-4 -mt-16">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <TrustScore score={score} />
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Website Analysis</h2>
              <p className="text-gray-600">
                {score === 0 
                  ? "Enter a URL above to analyze the website's safety."
                  : score >= 80 
                    ? "Our AI-powered analysis shows this website has a strong trust score."
                    : "Our AI-powered analysis shows this website might be unsafe."}
              </p>
            </div>
          </div>

          {/* Security Report Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Lock className="w-6 h-6 text-green-500" />
                <h3 className="text-lg font-semibold text-gray-800">SSL Status</h3>
              </div>
              <p className={`font-medium ${analysisResults.ssl.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                {analysisResults.ssl}
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-6 h-6 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800">Domain Age</h3>
              </div>
              <p className={`font-medium ${analysisResults.domainAge.includes('📅') ? 'text-blue-600' : 'text-gray-600'}`}>
                {analysisResults.domainAge}
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-green-500" />
                <h3 className="text-lg font-semibold text-gray-800">Blacklist Status</h3>
              </div>
              <p className={`font-medium ${analysisResults.blacklistStatus.includes('🛡️') ? 'text-green-600' : 'text-red-600'}`}>
                {analysisResults.blacklistStatus}
              </p>
            </div>
          </div>

          {/* Additional Analysis Section */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800">Trusted Seller</h3>
              </div>
              <p className={`font-medium ${analysisResults.trustedSeller.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                {analysisResults.trustedSeller}
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800">Monthly Traffic</h3>
              </div>
              <p className={`font-medium ${analysisResults.monthlyTraffic.includes('📈') ? 'text-green-600' : 'text-gray-600'}`}>
                {analysisResults.monthlyTraffic}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-white">
          <div className="flex space-x-6">
            <a href="#" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#" className="hover:text-blue-400 transition-colors">FAQ</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-400">
            © 2024 CyberShield. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Report Scam Modal */}
      <ReportScamModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;