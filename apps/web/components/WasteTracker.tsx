'use client';

import { useState } from 'react';

interface WasteItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  riskLevel: 'high' | 'medium' | 'low';
  category: string;
  expiresAt: string;
}

const MOCK_ITEMS: WasteItem[] = [
  {
    id: '1',
    name: 'Tonno fresco',
    quantity: 800,
    unit: 'g',
    costPerUnit: 0.032,
    riskLevel: 'high',
    category: 'Pesce',
    expiresAt: 'Oggi 23:59',
  },
  {
    id: '2',
    name: 'Pasta fresca (tagliatelle)',
    quantity: 1200,
    unit: 'g',
    costPerUnit: 0.008,
    riskLevel: 'high',
    category: 'Pasta',
    expiresAt: 'Domani 12:00',
  },
  {
    id: '3',
    name: 'Burrata DOP',
    quantity: 4,
    unit: 'pz',
    costPerUnit: 3.5,
    riskLevel: 'medium',
    category: 'Latticini',
    expiresAt: 'Domani 18:00',
  },
  {
    id: '4',
    name: 'Basilico fresco',
    quantity: 200,
    unit: 'g',
    costPerUnit: 0.02,
    riskLevel: 'medium',
    category: 'Erbe',
    expiresAt: 'Domani 23:59',
  },
  {
    id: '5',
    name: 'Vino rosso (open bottle)',
    quantity: 2,
    unit: 'btl',
    costPerUnit: 12,
    riskLevel: 'low',
    category: 'Bevande',
    expiresAt: 'Dopodomani',
  },
];

const RISK_COLORS = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-orange-100 text-orange-700 border-orange-200',
  low: 'bg-green-100 text-green-700 border-green-200',
};

const RISK_LABELS = {
  high: '🔴 Alta',
  medium: '🟡 Media',
  low: '🟢 Bassa',
};

export default function WasteTracker() {
  const [items, setItems] = useState<WasteItem[]>(MOCK_ITEMS);
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredItems = filter === 'all' ? items : items.filter((i) => i.riskLevel === filter);

  const totalAtRisk = items
    .filter((i) => i.riskLevel === 'high')
    .reduce((sum, i) => sum + i.quantity * i.costPerUnit, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900">Waste Risk Tracker</h3>
          <span className="text-sm font-bold text-red-600">€{totalAtRisk.toFixed(2)} a rischio</span>
        </div>
        <p className="text-xs text-gray-500">Inventario aggiornato alle 15:00</p>
      </div>

      <div className="flex gap-2 px-6 py-3 border-b border-gray-100">
        {(['all', 'high', 'medium', 'low'] as const).map((level) => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === level ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {level === 'all' ? 'Tutti' : RISK_LABELS[level]}
          </button>
        ))}
      </div>

      <div className="divide-y divide-gray-50">
        {filteredItems.map((item) => (
          <div key={item.id} className="px-6 py-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-gray-900">{item.name}</div>
              <div className="text-xs text-gray-500">
                {item.quantity} {item.unit} · {item.category} · Scade: {item.expiresAt}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                €{(item.quantity * item.costPerUnit).toFixed(2)}
              </div>
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs border ${RISK_COLORS[item.riskLevel]}`}>
                {RISK_LABELS[item.riskLevel]}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-orange-50 border-t border-orange-100">
        <button className="w-full bg-orange-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors">
          🤖 Genera campagna WhatsApp per questi item
        </button>
      </div>
    </div>
  );
}
