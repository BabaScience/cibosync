'use client';

import { useState } from 'react';
import WasteTracker from '../../components/WasteTracker';
import RevenueRecovery from '../../components/RevenueRecovery';
import WhatsAppPreview from '../../components/WhatsAppPreview';

interface NavTab {
  id: string;
  label: string;
  icon: string;
}

const NAV_TABS: NavTab[] = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'inventory', label: 'Inventory', icon: '📦' },
  { id: 'campaigns', label: 'Campaigns', icon: '💬' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

const MOCK_STATS = [
  { label: 'Revenue Recovered Today', value: '€87', delta: '+12%', positive: true },
  { label: 'Waste Prevented (kg)', value: '4.2 kg', delta: '-31%', positive: true },
  { label: 'WhatsApp Sent', value: '48', delta: '96% delivered', positive: true },
  { label: 'Campaign Conversions', value: '67%', delta: '+5pp vs last week', positive: true },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            <div>
              <div className="font-bold text-gray-900">CiboSync</div>
              <div className="text-xs text-gray-500">Trattoria della Nonna</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-50 text-green-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center text-xs font-bold text-green-700">
              MR
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">Marco Rossi</div>
              <div className="text-xs text-gray-500">Pro Plan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Buongiorno, Marco! 👋</h1>
            <p className="text-gray-500 text-sm mt-1">Oggi l'AI ha identificato €92 di potenziale spreco</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
            <span>💬</span>
            Lancia campagna ora
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {MOCK_STATS.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="text-sm text-gray-500 mb-2">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className={`text-xs mt-1 ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>
                {stat.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Main Panels */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 gap-8">
            <div className="col-span-1">
              <WasteTracker />
            </div>
            <div className="col-span-1">
              <WhatsAppPreview />
            </div>
            <div className="col-span-2">
              <RevenueRecovery />
            </div>
          </div>
        )}

        {activeTab !== 'overview' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="text-4xl mb-4">
              {NAV_TABS.find((t) => t.id === activeTab)?.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {NAV_TABS.find((t) => t.id === activeTab)?.label} — Coming in Day 2
            </h3>
            <p className="text-gray-500 text-sm">This section is being built in the next sprint.</p>
          </div>
        )}
      </div>
    </div>
  );
}
