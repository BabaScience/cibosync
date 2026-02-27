'use client';

import { useState } from 'react';

interface Message {
  id: string;
  type: 'outbound' | 'inbound';
  text: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

const SAMPLE_CONVERSATIONS: Message[][] = [
  [
    {
      id: '1',
      type: 'outbound',
      text: '🐟 Ciao Giulia! Stasera abbiamo del tonno fresco fantastico che non vogliamo sprecare.\n\nTartare di tonno per 2 → €8 invece di €22\n⏳ Solo 5 porzioni, offerta fino alle 19:30',
      time: '16:32',
      status: 'read',
    },
    { id: '2', type: 'inbound', text: 'Perfetto! Prenoto 1 porzione per stasera alle 20:00 🎉', time: '16:45' },
    { id: '3', type: 'outbound', text: '✅ Prenotazione confermata! Vi aspettiamo alle 20:00. A stasera! 🍽️', time: '16:46', status: 'read' },
  ],
  [
    {
      id: '4',
      type: 'outbound',
      text: '🍝 Ciao Marco! Oggi abbiamo 800g di tagliatelle fresche fatte questa mattina.\n\nTagliatelle al ragù per 4 → €24 invece di €52\n⏳ Offerta valida fino alle 20:00',
      time: '16:30',
      status: 'read',
    },
    { id: '5', type: 'inbound', text: 'Ottimo! Siamo in 3, possiamo fare 3 porzioni?', time: '16:38' },
    { id: '6', type: 'outbound', text: 'Assolutamente! 3 porzioni prenotate per voi 👍 A che ora arrivate?', time: '16:39', status: 'delivered' },
  ],
];

export default function WhatsAppPreview() {
  const [activeConv, setActiveConv] = useState(0);

  const messages = SAMPLE_CONVERSATIONS[activeConv];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-1">WhatsApp Preview</h3>
        <div className="flex gap-2">
          {SAMPLE_CONVERSATIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveConv(i)}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                activeConv === i ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Conv {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* WhatsApp UI */}
      <div className="bg-[#e5ddd5] p-4 min-h-64">
        {/* Header */}
        <div className="bg-[#075e54] -mx-4 -mt-4 px-4 py-3 flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm">🍽️</div>
          <div>
            <div className="text-white text-sm font-medium">Trattoria della Nonna</div>
            <div className="text-green-300 text-xs">online</div>
          </div>
        </div>

        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.type === 'outbound' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                  msg.type === 'outbound'
                    ? 'bg-[#dcf8c6] rounded-br-none'
                    : 'bg-white rounded-bl-none'
                }`}
              >
                <p className="text-gray-800 whitespace-pre-line">{msg.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-xs text-gray-400">{msg.time}</span>
                  {msg.status === 'read' && <span className="text-xs text-blue-500">✓✓</span>}
                  {msg.status === 'delivered' && <span className="text-xs text-gray-400">✓✓</span>}
                  {msg.status === 'sent' && <span className="text-xs text-gray-400">✓</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
