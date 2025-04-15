import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';

const rules = [
  {
    title: 'Game Setup',
    content: 'Place the game board in the center. Each player chooses their piece and starts at the beginning.',
  },
  {
    title: 'Turn Structure',
    content: 'On your turn, draw a card and attempt to translate the phrase. If incorrect, draw a punishment card.',
  },
  {
    title: 'Joker Cards',
    content: 'When drawing a Joker, visit this website to spin the wheel 4 times. You must accept one of the punishments shown.',
  },
  {
    title: 'Winning the Game',
    content: 'First player to reach the finish line wins! But beware of punishment cards sending you backwards.',
  },
];

export default function Rulebook() {
  const [expandedRule, setExpandedRule] = useState(null);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-red-500">Game Rules</h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          <Download size={20} />
          Download PDF
        </button>
      </div>

      <div className="space-y-4">
        {rules.map((rule, index) => (
          <div
            key={index}
            className="bg-black/30 rounded-lg overflow-hidden"
          >
            <button
              className="w-full px-6 py-4 flex justify-between items-center text-left"
              onClick={() => setExpandedRule(expandedRule === index ? null : index)}
            >
              <span className="font-bold">{rule.title}</span>
              {expandedRule === index ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            {expandedRule === index && (
              <div className="px-6 pb-4 text-gray-300">
                {rule.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}