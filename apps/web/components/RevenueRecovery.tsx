'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WEEKLY_DATA = [
  { day: 'Lun', waste: 95, recovered: 52, campaigns: 1 },
  { day: 'Mar', waste: 120, recovered: 71, campaigns: 2 },
  { day: 'Mer', waste: 80, recovered: 58, campaigns: 1 },
  { day: 'Gio', waste: 140, recovered: 98, campaigns: 2 },
  { day: 'Ven', waste: 170, recovered: 112, campaigns: 3 },
  { day: 'Sab', waste: 200, recovered: 145, campaigns: 3 },
  { day: 'Dom', waste: 110, recovered: 79, campaigns: 2 },
];

const MONTHLY_STATS = [
  { label: 'Revenue Recovered', value: '€1,847', color: 'text-green-600' },
  { label: 'Waste Prevented', value: '68.2 kg', color: 'text-blue-600' },
  { label: 'Campaigns Sent', value: '42', color: 'text-purple-600' },
  { label: 'Avg Recovery Rate', value: '67.4%', color: 'text-orange-600' },
];

export default function RevenueRecovery() {
  const totalWaste = WEEKLY_DATA.reduce((s, d) => s + d.waste, 0);
  const totalRecovered = WEEKLY_DATA.reduce((s, d) => s + d.recovered, 0);
  const recoveryRate = ((totalRecovered / totalWaste) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-gray-900">Revenue Recovery</h3>
          <p className="text-xs text-gray-500 mt-0.5">Ultimi 7 giorni</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">€{totalRecovered}</div>
          <div className="text-xs text-gray-500">{recoveryRate}% recovery rate</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={WEEKLY_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="wasteGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="recoveredGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(value: number, name: string) => [
                `€${value}`,
                name === 'waste' ? 'Spreco potenziale' : 'Recuperato',
              ]}
            />
            <Area type="monotone" dataKey="waste" stroke="#ef4444" fill="url(#wasteGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="recovered" stroke="#22c55e" fill="url(#recoveredGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-100">
        {MONTHLY_STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
